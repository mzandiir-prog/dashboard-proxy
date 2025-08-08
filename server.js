const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

// پراکسی برای نمایش سایت‌ها
app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('URL is required');

    request({ url: targetUrl, headers: { 'User-Agent': 'Mozilla/5.0' } })
        .on('error', err => res.status(500).send(err.toString()))
        .pipe(res);
});

// فایل‌های استاتیک
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
