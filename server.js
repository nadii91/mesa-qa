import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {products,totals,validateOrder} from './public/store.js';
export function createServer(){return http.createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
  if(pathname==='/api/products' && req.method==='GET') return json(200,products);
  if(pathname==='/api/orders' && req.method==='POST'){
    try{
      let body='';for await(const chunk of req){body+=chunk;if(body.length>10000)return json(413,{error:'Requisição muito grande.'});}
      const data=JSON.parse(body);
      const error=validateOrder(data?.cart,data?.customer);
      if(error)return json(400,{error});
      for(const [id,qty] of Object.entries(data.cart)){
        const p=products.find(p=>p.id===id);
        if(!p||!Number.isInteger(qty)||qty<1||qty>p.stock)return json(400,{error:'Produto ou quantidade inválida.'});
      }
      if(data.coupon!==undefined && typeof data.coupon!=='string') return json(400,{error:'Cupom inválido.'});
      if(data.coupon && data.coupon.trim().toUpperCase()!=='MESA10')return json(400,{error:'Cupom inválido.'});
      return json(201,{id:crypto.randomUUID(),simulated:true,...totals(data.cart,data.coupon)});
    }catch{return json(400,{error:'JSON inválido.'});}
  }
  const files={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js','/store.js':'store.js'};
  if(req.method!=='GET'||!files[pathname])return json(404,{error:'Não encontrado.'});
  try{const file=files[pathname];const content=await readFile(new URL('./public/'+file,import.meta.url));res.writeHead(200,{'Content-Type':file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html; charset=utf-8'});res.end(content);}catch{json(500,{error:'Falha ao carregar página.'});}
});}
if(process.argv[1]===fileURLToPath(import.meta.url))createServer().listen(Number(process.env.PORT)||3000,'127.0.0.1',()=>console.log('Loja disponível em http://127.0.0.1:3000'));
