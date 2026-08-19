const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]); if(p==='/')p='/index.html';
  const f=path.join(root,p);
  fs.readFile(f,(e,d)=>{ if(e){res.writeHead(404);return res.end('nf');}
    const t={'.html':'text/html','.js':'text/javascript','.css':'text/css'}[path.extname(f)]||'text/plain';
    res.writeHead(200,{'content-type':t}); res.end(d); });
}).listen(4178,()=>console.log('up on 4178'));
