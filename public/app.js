import {products,money,normalizeCart,totals} from './store.js';
const $=s=>document.querySelector(s);
let cart={};try{cart=normalizeCart(JSON.parse(localStorage.getItem('mesa-cart')));}catch{}
let category='Todos',coupon='',timer;
const save=()=>{try{localStorage.setItem('mesa-cart',JSON.stringify(cart));}catch{}renderCart();};
function toast(text){$('#toast').textContent=text;clearTimeout(timer);timer=setTimeout(()=>$('#toast').textContent='',2500);}
for(const name of ['Todos',...new Set(products.map(p=>p.category))]){const button=document.createElement('button');button.textContent=name;button.setAttribute('aria-pressed',String(name===category));button.onclick=()=>{category=name;document.querySelectorAll('#categories button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderProducts();};$('#categories').append(button);}
function renderProducts(){
 const query=$('#search').value.toLocaleLowerCase('pt-BR');
 const selected=products.filter(p=>(category==='Todos'||p.category===category)&&p.name.toLocaleLowerCase('pt-BR').includes(query));
 if($('#sort').value!=='default')selected.sort((a,b)=>$('#sort').value==='low'?a.price-b.price:b.price-a.price);
 $('#results').textContent=selected.length?`${selected.length} produtos para o seu espaço`:'Nenhum produto encontrado. Tente outra busca.';
 $('#products').innerHTML=selected.map(p=>`<article class="product"><div class="product-art" style="background:${p.color}"><span aria-hidden="true">${p.icon}</span><small class="badge">${p.stock?'COLEÇÃO ESSENCIAL':'ESGOTADO'}</small></div><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><strong>${money(p.price)}</strong><button data-add="${p.id}" ${p.stock?'':'disabled'} aria-label="Adicionar ${p.name}">${p.stock?'Adicionar +':'Indisponível'}</button></div></article>`).join('');
}
$('#products').onclick=e=>{const id=e.target.closest('[data-add]')?.dataset.add;if(!id)return;const p=products.find(p=>p.id===id);if((cart[id]||0)>=p.stock)return toast('Limite de estoque atingido.');cart[id]=(cart[id]||0)+1;$('#order-status').textContent='';save();toast(`${p.name} na sacola.`);};
function renderCart(){
 $('#count').textContent=Object.values(cart).reduce((a,b)=>a+b,0);
 $('#cart-items').innerHTML=Object.keys(cart).length?products.filter(p=>cart[p.id]).map(p=>`<div class="cart-row"><div>${p.name}<small>${money(p.price)} cada</small></div><button data-change="${p.id}" data-step="-1" aria-label="Diminuir ${p.name}">−</button><span>${cart[p.id]}</span><button data-change="${p.id}" data-step="1" aria-label="Aumentar ${p.name}" ${cart[p.id]>=p.stock?'disabled':''}>+</button><button data-remove="${p.id}" aria-label="Remover ${p.name}">✕</button></div>`).join(''):'<p>Sua sacola está vazia. Encontre seu favorito na coleção.</p>';
 const t=totals(cart,coupon);$('#totals').innerHTML=`<p>Subtotal <span>${money(t.subtotal)}</span></p><p>Desconto <span>− ${money(t.discount)}</span></p><p>Frete <span>${t.shipping?money(t.shipping):'Grátis'}</span></p><p>Total <strong>${money(t.total)}</strong></p>`;$('#submit-order').disabled=!Object.keys(cart).length;
}
$('#cart-items').onclick=e=>{const remove=e.target.closest('[data-remove]');const change=e.target.closest('[data-change]');if(remove)delete cart[remove.dataset.remove];if(change){const id=change.dataset.change;cart[id]+=Number(change.dataset.step);if(cart[id]<=0)delete cart[id];}save();};
$('#coupon-form').onsubmit=e=>{e.preventDefault();const value=$('#coupon').value.trim().toUpperCase();coupon=value==='MESA10'?value:'';$('#coupon-status').textContent=coupon?'Cupom aplicado: 10% de desconto.':'Cupom inválido. Use MESA10.';renderCart();};
$('#checkout').onsubmit=async e=>{e.preventDefault();$('#submit-order').disabled=true;$('#order-status').textContent='Enviando pedido…';try{const response=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cart,coupon,customer:{name:$('#name').value,email:$('#email').value}})});const data=await response.json();if(!response.ok)throw new Error(data.error);cart={};coupon='';$('#coupon').value='';$('#coupon-status').textContent='';$('#checkout').reset();save();$('#order-status').textContent=`Pedido simulado confirmado! Código ${data.id.slice(0,8)}. Total: ${money(data.total)}. Nenhuma cobrança foi realizada.`;}catch(error){$('#order-status').textContent=error.message||'Não foi possível enviar. Tente novamente.';renderCart();}};
$('#open-cart').onclick=()=>$('#cart-dialog').showModal();$('#close-cart').onclick=()=>$('#cart-dialog').close();$('#search').oninput=renderProducts;$('#sort').onchange=renderProducts;renderProducts();renderCart();
