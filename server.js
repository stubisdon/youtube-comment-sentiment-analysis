const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

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

    // Fetch comments...
    // Perform sentiment analysis...
    // Calculate percentages...
    // Send results back to frontend...
    res.json({ positive: 50, negative: 50 });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));