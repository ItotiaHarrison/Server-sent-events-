const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    // Set the necessary headers for SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*' // Any domain can access this endpoint. If you want to restrict this to a specific domain, you can replace * with that domain
    });

    // Send an event every 5 seconds
    const intervalId = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString('en-US', { hour12: true });
      res.write(`retry: 5000\ndata: ${timeString}\n\n`);
    }, 5000);

    // Clear interval on client disconnection
    req.on('close', () => {
      clearInterval(intervalId);
    });
  } else {
    // Respond with a 404 not found for other requests
    res.writeHead(404);
    res.end();
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('SSE server started on port 3000');
});
