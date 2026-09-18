async function fetchProducts(){
  const res = await fetch('data/products.json');
  return res.json();
}

function qs(sel){return document.querySelector(sel)}

function formatPrice(p){return '$' + p.toFixed(2)}

function renderProducts(products, container){
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="card-body">
        <h4>${p.name}</h4>
        <div class="row"><div class="category-pill">${p.category}</div><div style="flex:1"></div><div class="price">${formatPrice(p.price)}</div></div>
        <div style="margin-top:10px"><a href="#" class="btn" data-id="${p.id}">View</a></div>
      </div>`;
    container.appendChild(card);
  });
}

function openModal(product){
  const modal = qs('#modal');
  qs('#modal-img').src = product.image;
  qs('#modal-title').textContent = product.name;
  qs('#modal-desc').textContent = product.description;
  qs('#modal-price').textContent = formatPrice(product.price);
  qs('#add-to-cart').dataset.id = product.id;
  modal.classList.add('open');
}

function closeModal(){ qs('#modal').classList.remove('open') }

function getCart(){ return JSON.parse(localStorage.getItem('cart')||'{}') }
function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)) }

function addToCart(id, products){
  const cart = getCart();
  cart[id] = (cart[id]||0)+1;
  saveCart(cart);
  updateCartCount();
}

function updateCartCount(){
  const cart = getCart();
  const count = Object.values(cart).reduce((s,n)=>s+n,0);
  qs('#cart-count').textContent = count;
}

document.addEventListener('click', async (e)=>{
  if(e.target.matches('.btn[data-id]')){
    e.preventDefault();
    const id = e.target.dataset.id;
    const products = await fetchProducts();
    const p = products.find(x=>x.id===id);
    if(p) openModal(p);
  }
  if(e.target.id==='modal-close' || e.target.id==='modal'){
    closeModal();
  }
  if(e.target.id==='add-to-cart'){
    const id = e.target.dataset.id;
    const products = await fetchProducts();
    addToCart(id, products);
    closeModal();
  }
});

document.addEventListener('DOMContentLoaded', async ()=>{
  const products = await fetchProducts();
  const grid = qs('#products-grid');
  renderProducts(products, grid);
  qs('#search').addEventListener('input',(ev)=>{
    const q = ev.target.value.toLowerCase();
    const filtered = products.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));
    renderProducts(filtered, grid);
  });
  updateCartCount();
});
