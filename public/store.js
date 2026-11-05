export const products = [
  {id:'lamp',name:'Luminária Aurora',category:'Iluminação',price:12990,stock:8,icon:'◠',color:'#f7d8a0',description:'Uma luz suave para suas melhores ideias.'},
  {id:'notebook',name:'Caderno Horizonte',category:'Papelaria',price:3990,stock:15,icon:'▤',color:'#b4c6b0',description:'Espaço para planejar, rabiscar e criar.'},
  {id:'cup',name:'Caneca Pausa',category:'Acessórios',price:5990,stock:6,icon:'◡',color:'#e4b3a0',description:'Seu café merece um lugar especial.'},
  {id:'stand',name:'Suporte Eleva',category:'Acessórios',price:15990,stock:4,icon:'⌁',color:'#b9c9d2',description:'Mais conforto para o seu dia de trabalho.'},
  {id:'pens',name:'Kit Traço',category:'Papelaria',price:2990,stock:10,icon:'╱',color:'#d8c2df',description:'Três cores, infinitas possibilidades.'},
  {id:'clock',name:'Relógio Tempo',category:'Acessórios',price:8990,stock:0,icon:'◷',color:'#d8d4b0',description:'Um lembrete para desacelerar.'}
];
export const money = cents => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
export function normalizeCart(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};
  return Object.fromEntries(products.filter(p=>Number.isInteger(input[p.id]) && input[p.id]>0 && p.stock>0).map(p=>[p.id,Math.min(input[p.id],p.stock)]));
}
export function totals(cart, coupon='') {
  const clean=normalizeCart(cart);
  const subtotal=products.reduce((sum,p)=>sum+p.price*(clean[p.id]||0),0);
  const discount=coupon.trim().toUpperCase()==='MESA10'?Math.round(subtotal*0.1):0;
  const shipping=subtotal===0 || subtotal-discount>=20000?0:1590;
  return {subtotal,discount,shipping,total:subtotal-discount+shipping};
}
export function validateOrder(cart,customer) {
  if(!Object.keys(normalizeCart(cart)).length) return 'Adicione um produto ao carrinho.';
  if(!customer || typeof customer.name!=='string' || customer.name.trim().length<3) return 'Informe um nome com pelo menos 3 caracteres.';
  if(typeof customer.email!=='string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) return 'Informe um e-mail válido.';
  return null;
}
