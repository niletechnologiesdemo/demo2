const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;
const TYPES = { ".html":"text/html", ".css":"text/css", ".js":"text/javascript", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end("forbidden"); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(4178, () => console.log("serving on 4178"));
