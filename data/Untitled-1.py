"""
Description:
This file contains lots of helper functions and modules for NLP, especially preprocessing (text cleaning, getting textblob values, etc.). 
I used the online Introduction to NLP course by WomenWhoCode on youtube and github: https://github.com/WomenWhoCode/WWCodeDataScience/tree/master/Intro_to_NLP.

(Author: Kerria Pang-Naylor)
"""

# IMPORTS
import pandas as pd
import re
from textblob import TextBlob
import contractions

from sklearn.utils import shuffle

import nltk
from nltk.tokenize import word_tokenize
from spellchecker import SpellChecker

import string

from nltk.corpus import wordnet

#nltk.download('stopwords')
from nltk.corpus import stopwords
#nltk.download('averaged_perceptron_tagger')

from nltk.stem import WordNetLemmatizer
import ast

