import sys
import json
import traceback
from textblob import TextBlob

def analyze_sentiment(comment):
    blob = TextBlob(comment)
    return blob.sentiment.polarity

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