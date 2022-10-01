#!/usr/bin/env python
# vim: set sw=4 sts=4 et foldmethod=indent :

"""mbox_to_mysql: Import messages from mbox files to a mysql database """

# Mbox message handing is being done by mailbox module, which is a python core module.
#   However, mbox FILE handling is done internally in this file, because the
#   mailbox module does far more than we need, and takes up a lot of time to do it.
#
# Database handling is done through mysql.connector, which is not a core module;
#   Get it from https://launchpad.net/myconnpy
#
# Script changed a lot from me(Nikola Petrov(nikolavp@gmail.com)). The script
# was initially taken from
# http://andrewsinlondon.wordpress.com/2010/12/19/exporting-a-mailman-archive-to-mysql/
# and was changed to suit my own need. Some things also didn't work as the
# script was more than 2 years old and the libraries from back then
# changed(mysql especially)
__author__ = "Andrew Smith, Nikola Petrov"
__license__ = "GNU General Public License version 2"
__date__="December 2010"
__version__="0.4"

try:
  import hashlib
  from html.parser import HTMLParser
  from mailbox import mboxMessage
  import mysql.connector
  import os
  import re
  import sys
  import time
except ImportError:
  print ("Failed while importing modules")
  exit(-2)


#===================================================================


class Striptags(HTMLParser):
  '''Create a descendant class of the standard library's html parser, and
     as tags are found, strip them out.
     Replace block-level tags with two line breaks, and <br> tags with
     a single line break'''

  def __init__(self):
    HTMLParser.__init__(self)
    self.__text = []

  def handle_data(self, data):
    text = data.strip()
    if len(text) > 0:
        self.__text.append(re.sub('[ \t\r\n]+', ' ', text) + ' ')

  def handle_starttag(self, tag, attrs):
    if tag in ('p','div','pre'):
        self.__text.append('\n\n')
    elif tag == 'br':
        self.__text.append('\n')

  def handle_startendtag(self, tag, attrs):
    if tag == 'br':
        self.__text.append('\n\n')

  def text(self):
    return ''.join(self.__text).strip()


#===================================================================


def apsmbox(filename):
  ''' generator that opens an mbox file, and yields one message for each iteration'''
  inFile=True
  with open(filename, 'r', errors='replace', encoding='utf-8') as mboxfile: # , newline='' 
    buffer=[mboxfile.readline()]
    while inFile:
      line =mboxfile.readline()
      if not line: inFile=False
      if inFile and not line.startswith('From '):
        buffer.append(line)
      else:
        from_line = buffer[0].replace('\n', '')
        string=''.join(buffer[1:])  # .replace(os.linesep, '\n')
        msg = mboxMessage(string)
        msg.set_from(from_line[5:])
        if inFile: buffer=[line]
        yield msg


#===================================================================


def usage():
  print ("mbox_mysql.py: Import messages from mbox files to a mysql database\n")
  print ("%s file.mbox Database_Name Table_Name" % sys.argv[0])
  print ("Example: ./%s mailmanlist.mbox from_mailman\n" % sys.argv[0])
  exit(0)


#===================================================================


def encodeattr(msg,fld):
  '''Takes a message and a field and encodes the value of msg[fld] as an md5.
     Returns an empty string if field is empty'''
  t=msg.__getitem__(fld)
  if t is None:return ''
  return hashlib.md5(t.encode('utf-8')).hexdigest()


#===================================================================

def clean_body(body_in):
  ''' parse body_in, strip html, strip quoted text from end of message'''

  new_body = []
  body     = body_in.splitlines()

  # Get rid of quoted lines at end
  for line in body:
    line = line.lstrip()
    if line and not line.startswith('>') and not line.endswith('wrote:'):
      new_body.append(line)

  alltext = '\n'.join(new_body)
  if alltext.lower().find('<html') == -1:
    return alltext

  try:
    parser = Striptags()
    parser.feed( alltext )
    parser.close()
    return parser.text()
  except Exception as e:
    return re.sub('(]*>)+','\n',alltext)
  


#===================================================================


def main():

  starttime = time.time()

  # first some sanity tests on the command-line arguments
  #sys.argv = ['mbox_to_mysql','list1.mbox','mailman','lists',] # !@!@! APS here for testing purposes only - comment out for live run

  if len(sys.argv) != 4:
    usage()
    exit(-2)
  mbox = sys.argv[1]
  db_name = sys.argv[2]
  table_name = sys.argv[3]

  if mbox[-5:] == '.mbox':
    source=mbox[:-5].lower().replace('/','').replace('-','')
  else:
    print ("Please give an mbox file.\nQuitting...")
    exit(-2)


  # mysql table creation string
  # if you change the string, you'll have to change the related entries on the mysql queries below

  create_table = """
  CREATE TABLE mailman (
  id INT NOT NULL AUTO_INCREMENT,
  sent DATETIME,
  messageid CHAR(32),
  inreplyto CHAR(32),
  subject VARCHAR(200),
  sender_email VARCHAR(100),
  sender_name VARCHAR(100),
  list VARCHAR(30),
  body LONGTEXT,
  PRIMARY KEY(id),
  UNIQUE KEY(messageid)
  );
  """

  oConfig={
    'host': '192.168.129.143',
    'user': 'root',                           # YOUR MYSQL USERNAME HERE
    'password': 'petkan',                     # YOUR MYSQL PASSWORD HERE
    'charset': 'utf8',
    'use_unicode': True,
    'get_warnings': True,
    'port': 3306,
    }

  try:
    connection = mysql.connector.Connect(**oConfig)
  except (mysql.connector.errors.OperationalError,mysql.connector.errors.ProgrammingError,TypeError) as e:
    print ("Failed to connect to db. Check the connection config. Quitting...\n")
    exit(-2)
  except (mysql.connector.errors.InterfaceError) as e:
    print ("Failed to connect to db. Check MySQL is running. Quitting...\n")
    exit(-2)

  db = connection.cursor()

  # try to create database: if it already exists, use it

  try:
    db.execute("create database if not exists {}".format(db_name))
  except (mysql.connector.errors.OperationalError) as e:
    print ("Can't create database, seems that database %s already exists. We'll use it then " % db_name)

  db.execute("use {}".format(db_name))

  # try to create table: if it already exists, use it

  try:
    #db.execute('DROP TABLE IF EXISTS {}'.format(table_name))
    db.execute(create_table)
    print ("Successfully created table {}".format(table_name))
  except (mysql.connector.errors.DatabaseError) as e:
    print ("Can't create table, seems that table %s exists. We'll use it then " % table_name)
    print(e)
  except (mysql.connector.errors.InterfaceError) as e:
    print(e)
    print ("Error when creating table")

  warnings = db.fetchwarnings()
  if warnings:
    print(warnings)

  # cycle over all the messages in the mbox file

  counter = 0
  for message in apsmbox(mbox):

    # extract from the message just the headings we want, and the body text

    #fromline = message.get_from()

    # the msg object is used to store the headings we want

    msg={}
    msg['Subject']    = message.__getitem__('Subject')
    msg['Message-ID'] = encodeattr(message,'Message-ID')
    msg['In-Reply-To']= encodeattr(message,'In-Reply-To')
    #msg['References'] = message.get_all('References')
    #print("\n"+ '_'*45 + "\n %s" % fromline)
    #print("%s" % fromline)
    fromHeader = message.__getitem__('From').replace(' at ', '@')
    email, name = fromHeader.split(' ', 1)
    name = name.replace('(', '').replace(')', '')
    parse_date(msg, message.__getitem__('Date'))


    # go find the very first message part - this should be the plaintext part, if present

    msgtext=message
    while msgtext.is_multipart and msgtext.is_multipart():
      msgtext = msgtext.get_payload(0)
    msgtext = clean_body(msgtext.get_payload())

    # got all the data we need - now stick it into the database

    try:
      print(email)
      print(name)
      db.execute("Insert into mailman values(default,%s,%s,%s,%s,%s,%s,%s,%s)", (msg['Date'],msg['Message-ID'],msg['In-Reply-To'],msg['Subject'],email,name,source,msgtext))
    except Exception as e:
      warnings = db.fetchwarnings()
      if warnings:print(warnings)
      print(e)
      #print("%s" % table_name)
      #print("%s" % msg['Date'])
      #print("%s" % msg['Message-ID'])
      #print("%s" % msg['In-Reply-To'])
      #print("%s" % msg['Subject'])
      #print("%s" % msg['From'])
      #print("%s" % source)
      #print("%s" % msgtext)

    counter = counter+1

  connection.commit()

  # finished, so now report summary information about what we've done

  print ('*'*45 + "\nCreated table %s and inserted %s emails\n" % (table_name, counter))

  db.close()
  connection.close()
  print (starttime)
  print (time.time())
  print('time was %f seconds' % (time.time()-starttime))
  exit(1)
formats = ['%a, %d %b %Y %H:%M:%S %z', '%a, %d %b %Y %H:%M:%S %z (%Z)', '%a, %d %b %Y %H:%M:%S %z', '%a, %d %b %Y %H:%M:%S']
def parse_date(msg, messageDate):
  print(messageDate)
  for format in formats:
    try:
      time_result = time.strptime(messageDate, format)
      msg['Date']=time.strftime('%Y-%m-%d %H:%M:%S', time_result)
      break
    except:
      pass

  if messageDate is None:
    msg['Date'] = None

  if 'Date' not in msg:
    # Some time zones are not recognized by the parser. Try to parse the date without that part
    messageDate, _ = messageDate.rsplit(' ', 1)
    parse_date(msg, messageDate)


#===================================================================

if __name__ == '__main__':
   main()
