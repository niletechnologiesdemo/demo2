const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = '/Users/aadityanilesiphone/Documents/GitHub/demo2/Kumankaya';
const TYPES = { '.html':'text/html', '.png':'image/png', '.js':'text/javascript', '.css':'text/css', '.json':'application/json' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(5599, () => console.log('serving on 5599'));
