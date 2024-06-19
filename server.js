const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Send an initial event
    sendEvent({ message: 'Connected to SSE' });

    // Send updates every 5 seconds
    const intervalId = setInterval(() => {
        sendEvent({ message: `Current time: ${new Date().toLocaleTimeString()}` });
    }, 5000);

    // Clean up on client disconnect
    req.on('close', () => {
        clearInterval(intervalId);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
