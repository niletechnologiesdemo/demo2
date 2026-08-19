const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const T={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png',
  '.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.pdf':'application/pdf'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);
  if(p==='/')p='/index.html';
  const f=path.join(ROOT,p);
  if(!f.startsWith(ROOT)){res.writeHead(403);return res.end();}
  fs.readFile(f,(e,d)=>{
    if(e){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found: '+p);}
    res.writeHead(200,{'Content-Type':T[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(d);
  });
}).listen(8129,()=>console.log('serving '+ROOT+' on http://localhost:8129'));
