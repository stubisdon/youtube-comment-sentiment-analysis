# YouTube Sentiment Analysis App

This is a to-do list for building a YouTube sentiment analysis app.

## Frontend

- [ ] Create form with input field for YouTube link
- [ ] When form is submitted, send POST request to backend with YouTube link
- [ ] When results are received, display percentage of positive and negative comments on webpage

## Backend

- [ ] When POST request is received, extract YouTube video ID from link
- [ ] Use YouTube API to fetch comments for video
- [ ] For each comment, use sentiment analysis library to determine sentiment
- [ ] Calculate percentage of positive and negative comments
- [ ] Send results back to frontend