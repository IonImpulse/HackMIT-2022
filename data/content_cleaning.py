"""Code to used to clean ISO/OSI email contents and subject line data to prepare for classification."""
import pandas as pd
import re
from textblob import TextBlob
import contractions
import numpy as np
from sklearn.utils import shuffle

import nltk
from nltk.tokenize import word_tokenize
from spellchecker import SpellChecker

import string

from nltk.corpus import wordnet

#nltk.download('stopwords')
from nltk.corpus import stopwords
#nltk.download('averaged_perceptron_tagge
# r')


from nltk.stem import WordNetLemmatizer
import ast
from NLP_preprocessing import remove_emojis


def clean_text(text):
    """Cleans text for tweet-specific terms. Inputs and outputs string."""
    # Tweet specific cleaning
    try:
        text = re.sub(r'Content[A-Za-z0-9]+', '', text) # get rid of 'Content' noise
        text = re.sub(r'https?:\/\/\S+', '', text) # Removes hyperlinks question mark --> can have 0 or 1 s's
        text = re.sub(r'\n', '', text)
        text = re.sub(r'\r', '', text)
        text = remove_emojis(text)
        
        return text
    except:
        return text


#  NLTK's word lemmatizer requires POS tags in wordnet fromat
def get_wordnet_pos(tag):
    """Convert's POS tags to wordnet's format. Only covers some tags
            INPUTS: NLTK POS tag 
            RETURNS: Wordnet POS tag"""
    if tag.startswith('J'):
        return wordnet.ADJ
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('R'):
        return wordnet.ADV
    else: 
        return wordnet.NOUN

def preprocess_df(filename = "", df = None, text_name = "text"):
    """
    Preprocessing for dataframe (tweaked copy from NLP_preprocessing). Adds new columns to dataframe. Returns new dataframe. 
    text_name and category_name are names of columns in dataframe
        INPUTS: filename (str) or df (pandas dataframe), text_name (str), category_name (str)
        RETURNS: cleaned (pandas dataframe)
    """
    if df == None:
        df = pd.read_pickle(f"{filename}.pkl")

    
    df["cleaned_tweet"] = df[text_name].apply(lambda text: clean_text(text))
    # first remove contractions
    df["no_contract"] = df["cleaned_tweet"].apply(lambda text: [contractions.fix(word) for word in text.split()])

    # turn list of contractionless words back into a singular string
    df['msg_str'] = [' '.join(map(str,list_)) for list_ in df['no_contract']]
    
    # remove punctuation
    punc = string.punctuation.replace("-","") # punctuation without "-"
    df["no_punc"] = df["msg_str"].apply(lambda s: s.translate(str.maketrans('-', ' ', punc))) # remove all punc except '-' which is replaced with a space

    # test remove all but letters (REMOVED)
    df["correct_rest"] = df["no_punc"].apply(lambda text: " ".join(re.findall("[a-zA-Z,.]+",text)) ) # get rid of rest of weird characters
    
    # make new tokenized column
    df['tokenized'] = df['correct_rest'].apply(word_tokenize)
    df["manual_correct"] = df['tokenized'].apply(last_clean)

    # make everything lowercase
    df['lower'] = df['manual_correct'].apply(lambda list_: [word.lower() for word in list_])


    stop_words = set(stopwords.words('english'))
    df['stopwords_removed'] = df['lower'].apply(lambda list_: [word for word in list_ if word not in stop_words])
    
    # lemmatization
    df['pos_tags'] = df['stopwords_removed'].apply(nltk.tag.pos_tag)

    df['wordnet_pos'] = df['pos_tags'].apply(lambda list_:[(word, get_wordnet_pos(pos_tag)) for (word, pos_tag) in list_])

    wnl = WordNetLemmatizer()

    df['lemmatized'] = df['wordnet_pos'].apply(lambda x: [wnl.lemmatize(word, tag) for word, tag in x])


    return df

def useless_clean(text):
    red_flags = ["Content-Transfer-Encoding", "Content-Type"]
    try:
        for flag in red_flags:
            if flag in str(text): 
                return ""
        
        return text
    except:
        return text



def preprocess_df(filename = None, df = None, text_name = "text"):
    """
    Preprocessing for dataframe. Adds new columns to dataframe. Returns new dataframe. 
    text_name and category_name are names of columns in dataframe
        INPUTS: filename (str) or df (pandas dataframe), text_name (str), category_name (str)
        RETURNS: cleaned (pandas dataframe)
    """
    if filename:
        df = pd.read_pickle(f"{filename}.pkl")

    
    df["cleaned_tweet"] = df[text_name].apply(lambda text: clean_text(text))
    # first remove contractions
    df["no_contract"] = df["cleaned_tweet"].apply(lambda text: [contractions.fix(word) for word in text.split()])

    # turn list of contractionless words back into a singular string
    df['msg_str'] = [' '.join(map(str,list_)) for list_ in df['no_contract']]
    
    # remove punctuation
    punc = string.punctuation.replace("-","") # punctuation without "-"
    df["no_punc"] = df["msg_str"].apply(lambda s: s.translate(str.maketrans('-', ' ', punc))) # remove all punc except '-' which is replaced with a space

    # test remove all but letters (REMOVED)
    df["correct_rest"] = df["no_punc"].apply(lambda text: " ".join(re.findall("[a-zA-Z,.]+",text)) ) # get rid of rest of weird characters
    
    # make new tokenized column
    df['tokenized'] = df['correct_rest'].apply(word_tokenize)

    # make everything lowercase
    df['lower'] = df['tokenized'].apply(lambda list_: [word.lower() for word in list_])

    # get rid of punctuation (REPLACED)
    #punc = string.punctuation
    #df['no_punc'] = df['lower'].apply(lambda list_: [word for word in list_ if word not in punc])

    # spell checking (we're not doing this rn)
    # from spellchecker import SpellChecker # microsoft text blob
    # spell = SpellChecker()

    # get rid of stop words

    stop_words = set(stopwords.words('english'))
    df['stopwords_removed'] = df['lower'].apply(lambda list_: [word for word in list_ if word not in stop_words])
    
    # lemmatization
    df['pos_tags'] = df['stopwords_removed'].apply(nltk.tag.pos_tag)

    df['wordnet_pos'] = df['pos_tags'].apply(lambda list_:[(word, get_wordnet_pos(pos_tag)) for (word, pos_tag) in list_])

    wnl = WordNetLemmatizer()

    df['lemmatized'] = df['wordnet_pos'].apply(lambda x: [wnl.lemmatize(word, tag) for word, tag in x])


    return df


df = pd.DataFrame()
df_ = pd.read_pickle("ISO_data_processed.pkl")
df_ = df_[df_["is_reply"] == False]
df_ = df_.loc[(df_["Body"].isnull() == False) | (df_["Subject"].isnull() == False)]
df_["Body"]= df_["Body"].apply(clean_text)
df_["Body"] = df_["Body"].apply(useless_clean)

df["text"] = df_["Subject"] + " " + df_["Body"]
df["label"] = df_["mm"]
df = df[df["text"].isnull() == False]
#df["text"] = df[df["text"].isnull() == False]
#df["cleaned?"] = df["text"].apply(clean_text)
#df["useless?"] = df["cleaned?"].apply(is_useless)
#df = df[df["useless?"] == False]
df = preprocess_df(df = df)
df["cleaned"] = df["lemmatized"].apply(lambda x: ' '.join(x)) # we will use this for text classification