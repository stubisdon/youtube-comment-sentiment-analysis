const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config();
const { google } = require('googleapis');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/analyze', (req, res) => {
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

    const { google } = require('googleapis');

    console.log('Loading Google API...');

    // Initialize the YouTube API client
    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY
    });

    console.log('Google API loaded. API Key is ' + process.env.YOUTUBE_API_KEY);

    // Fetch comments
    youtube.commentThreads.list({
        part: 'snippet',
        videoId: videoId,
        maxResults: 100, // Fetch up to 100 comments
    }, (err, response) => {
        if (err) {
            console.error('The API returned an error: ' + err);
            res.status(500).json({ error: 'The API returned an error: ' + err });
            return;
        }

        const comments = response.data.items.map(item => item.snippet.topLevelComment.snippet.textDisplay);

        console.log('Comments fetched. the number of comments is: ' + comments.length);

        // TODO: Analyze the comments...

        res.json({ comments: comments });
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