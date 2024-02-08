# YouTube Sentiment Analysis App

This is a to-do list for building a YouTube sentiment analysis app.

## General

- [x] Change the commiter name from Keroko to Stubisdon
- [x] Fix the app crash on the Heroku side (app works well locally)

## Frontend

- [x] Create form with input field for YouTube link
- [x] When form is submitted, send POST request to backend with YouTube link
- [x] When results are received, display percentage of positive and negative comments on webpage
- [ ] Add a preloader for big volumes of comments

## Backend

- [x] When POST request is received, extract YouTube video ID from link
- [x] Use YouTube API to fetch comments for video
- [x] For each comment, use sentiment analysis library to determine sentiment
- [?] Calculate percentage of positive and negative comments
- [x] Send results back to frontend
- [x] Fix Python on Heroku
- [ ] Improve false neutrals in sentiment analysis
- [ ] If self-hosted models don't work - try API model
- [ ] if successful - analyze sentiment around a person online
 
## Free vs paid

- [ ] Test the free version with 100 comments with 3-5 creators
- [ ] Ask about a paid version

- [ ] Define how much money is spent on every 1000 fetched commments

- [ ] Add Sign Up / Log in functionality
- [ ] For paid accounts, let analyze more than 100 comments
- [ ] Credits based on the number of API requests allowed