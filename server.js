const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/analyze', (req, res) => {
        const videoUrl = req.body.url;
        // Extract video ID from URL...
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