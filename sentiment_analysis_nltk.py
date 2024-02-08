import sys
import json
import traceback
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
nltk.download('vader_lexicon')

def analyze_sentiment(comment):
    sid = SentimentIntensityAnalyzer()
    sentiment_scores = sid.polarity_scores(comment)
    return sentiment_scores['compound']

try:
    # Read the comments from stdin
    comments = json.load(sys.stdin)

    # Analyze each comment
    sentiment_results = [{'score': analyze_sentiment(comment), 'text': comment} for comment in comments]

    # Write the sentiment results to stdout
    json.dump(sentiment_results, sys.stdout)

except Exception as e:
    # Print the error message and traceback to stderr
    print(f"An error occurred: {str(e)}", file=sys.stderr)
    traceback.print_exc(file=sys.stderr)