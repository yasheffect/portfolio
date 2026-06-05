const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`);
    
    // Default to index.html for root path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Handle query strings by ignoring them for file lookup
    filePath = filePath.split('?')[0];
    filePath = decodeURI(filePath); // Decode URL entities like %20 to spaces
    
    // Get absolute path
    const absolutePath = path.join(__dirname, filePath);
    
    // Get file extension
    const extname = path.extname(absolutePath).toLowerCase();
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(absolutePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`File not found: ${absolutePath}`);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`404 Not Found: ${filePath}`);
            } else {
                console.error(`Server error: ${err.code}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`500 Internal Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Node.js server is running securely at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop');
});
