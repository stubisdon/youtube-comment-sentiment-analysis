import sys
import json
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
nltk.download('vader_lexicon')

def analyze_sentiment(comment):
    sid = SentimentIntensityAnalyzer()
    sentiment_scores = sid.polarity_scores(comment)
    return sentiment_scores['compound']

# Read the comments from stdin
comments = json.load(sys.stdin)

# Analyze each comment
sentiment_results = [{'score': analyze_sentiment(comment), 'text': comment} for comment in comments]

# Write the sentiment results to stdout
json.dump(sentiment_results, sys.stdout)