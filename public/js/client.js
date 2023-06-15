<<<<<<< HEAD
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const btnsAdd = document.querySelectorAll('.btnAgregar');
const btnPurchase = document.getElementById('purchase');
const cart = document.getElementById('cart');
const cleanCart = document.getElementById('clean');
const btnsDelete = document.querySelectorAll('.btnsDelete');


loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const info = Object.fromEntries(data);
  fetch("/api/users/login", {
    method: "post",
    body: JSON.stringify(info),
    headers: { "Content-Type": "application/json" },
  }).then( () => (window.location.href = "/products"));
  loginForm.reset();
});

registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(registerForm);
  const info = Object.fromEntries(data);
  fetch("/api/users/register", {
    method: "post",
    body: JSON.stringify(info),
    headers: { "Content-Type": "application/json" },
  }).then((window.location.href = "http://localhost:8080/"));
  registerForm.reset();
});

btnsAdd.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const pid = btn.getAttribute('pid');
  const cid = cart.getAttribute('cid');

    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "post"
    })
  });
});

btnsDelete.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const pid = btn.getAttribute('pid');
  const cid = cart.getAttribute('cid');

    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "delete"
    })
  });
});

const logout = () => {
  window.location.href = "/logout";
};

btnPurchase.addEventListener('click', ()=>{
  console.log('click purchase');
 const cid = cart.getAttribute('cid');
  fetch(`/api/carts/${cid}/purchase`, {
    method: 'post'
  });
});

cleanCart.addEventListener('click', ()=>{
  const cid = cart.getAttribute('cid');
   fetch(`/api/carts/${cid}/clean`, {
     method: 'put'
   });
 });

 

=======
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const btnsAdd = document.querySelectorAll('.btnAgregar');
const btnPurchase = document.getElementById('purchase');
const cart = document.getElementById('cart');
const cleanCart = document.getElementById('clean');
const btnsDelete = document.querySelectorAll('.btnsDelete');


loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const info = Object.fromEntries(data);
  fetch("/api/users/login", {
    method: "post",
    body: JSON.stringify(info),
    headers: { "Content-Type": "application/json" },
  }).then( () => (window.location.href = "/products"));
  loginForm.reset();
});

registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(registerForm);
  const info = Object.fromEntries(data);
  fetch("/api/users/register", {
    method: "post",
    body: JSON.stringify(info),
    headers: { "Content-Type": "application/json" },
  }).then((window.location.href = "http://localhost:8080/"));
  registerForm.reset();
});

btnsAdd.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const pid = btn.getAttribute('pid');
  const cid = cart.getAttribute('cid');

    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "post"
    })
  });
});

btnsDelete.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const pid = btn.getAttribute('pid');
  const cid = cart.getAttribute('cid');

    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "delete"
    })
  });
});

const logout = () => {
  window.location.href = "/logout";
};

btnPurchase.addEventListener('click', ()=>{
 const cid = cart.getAttribute('cid');
  fetch(`/api/carts/${cid}/purchase`, {
    method: 'post'
  });
});

cleanCart.addEventListener('click', ()=>{
  const cid = cart.getAttribute('cid');
   fetch(`/api/carts/${cid}/clean`, {
     method: 'put'
   });
 });

 

>>>>>>> origin/main
