FROM python:3.8-slim

WORKDIR /app

# Copy just your requirements.txt first
COPY requirements.txt /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app
COPY . /app

CMD gunicorn -b :$PORT sentiment_analysis_roberta:app