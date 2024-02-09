import sys
import json
import traceback
from transformers import pipeline

# Initialize the sentiment analysis pipeline
sentiment_analysis = pipeline('sentiment-analysis', model="distilbert-base-uncased")

def analyze_sentiment(comment):
    result = sentiment_analysis(comment)[0]
    return result['score'] if result['label'] == 'POSITIVE' else -result['score']

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