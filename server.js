const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { google } = require('googleapis');
const { spawn } = require('child_process');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/analyze', async (req, res) => {
    const videoUrl = req.body.url;
    
    let videoId;
    try {
        // Extract video ID from URL
        const url = new URL(videoUrl);
        videoId = new URLSearchParams(url.search).get('v');
    } catch (error) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    if (!videoId) {
        return res.status(400).json({ error: 'Invalid YouTube URL. The URL should be in the format: https://www.youtube.com/watch?v=videoId' });
    }

    console.log('the ID is: ' + videoId);

    console.log('Loading Google API...');

    // Initialize the YouTube API client
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY
    });

    console.log('Google API loaded. API Key is ' + process.env.YOUTUBE_API_KEY);

    // Fetch comments
    let comments = [];
    // let pageToken = null;
    // do {
        const response = await youtube.commentThreads.list({
            part: 'snippet',
            videoId: videoId,
            maxResults: 100, // Fetch up to 100 comments
            // pageToken: pageToken
        });

        comments = comments.concat(response.data.items.map(item => item.snippet.topLevelComment.snippet.textDisplay));
        // pageToken = response.data.nextPageToken;

        console.log('Fetched ' + comments.length + ' comments so far');
    // } while (pageToken);

    console.log('Comments fetched. the number of comments is: ' + comments.length);

    // Analyze the comments
    const python = spawn('python3', ['./sentiment_analysis.py']);
    python.stdin.write(JSON.stringify(comments));
    python.stdin.end();

    let sentimentResults = '';

    python.stdout.on('data', (data) => {
        sentimentResults += data.toString();
    });

    python.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: 'Failed to analyze comments' });
        }

        sentimentResults = JSON.parse(sentimentResults);

        const positiveComments = sentimentResults.filter(comment => comment.score > 0.05);
        const negativeComments = sentimentResults.filter(comment => comment.score < -0.05);
        const neutralComments = sentimentResults.filter(comment => comment.score >= -0.05 && comment.score <= 0.05);

        res.json({ positive: positiveComments, negative: negativeComments, neutral: neutralComments });
    });

    console.log('Cycle of fetch comments complete...');

    // Perform sentiment analysis...
    // Calculate percentages...
    // Send results back to frontend...
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));