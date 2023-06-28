const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const addToCart = document.querySelectorAll('.btnAgregar');
const btnPurchase = document.getElementById('purchase');
const cart = document.getElementById('cart');
const cleanCart = document.getElementById('clean');
const deleteFromCart = document.querySelectorAll('.btnsDelete');
const deleteUser = document.querySelectorAll('.btnsEliminarUser');
const adminRole = document.querySelectorAll('.rol-admin');
const userRole = document.querySelectorAll('.rol-user');
const prodForm = document.getElementById("formAgregar");
const deleteProduct = document.querySelectorAll(".deleteProduct");
const inactiveUsers = document.getElementById('btnDeleteInactive');

const reload = ()=>{
  setTimeout(function() {
    location.reload();
   }, 500);
 }

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const info = Object.fromEntries(data);
  fetch("/api/sessions/login", {
    method: "post",
    body: JSON.stringify(info),
    headers: { "Content-Type": "application/json" },
  }).then( () => (window.location.href = "/home"));
  loginForm.reset();
});

registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(registerForm);
  const info = Object.fromEntries(data);
  fetch("/api/sessions/register", {
    method: "post",
    body: JSON.stringify(info),
    headers: { "Content-Type": "application/json" },
  }).then((window.location.href = "/"));
  registerForm.reset();
});

const logout = () => {
  window.location.href = "/logout";
};

deleteUser?.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const uid = btn.getAttribute('uid');
    fetch(`/api/users/${uid}`, {
      method: "delete"
    }).then(reload());
  });
});

adminRole?.forEach(btn =>{
  btn.addEventListener('click', ()=>{
    const uid = btn.getAttribute('uid');
     fetch(`/api/users/${uid}`, {
      method: "put",
      body: JSON.stringify({role: "ADMIN"}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(reload());   
  })
}) 

userRole?.forEach(btn =>{
  btn.addEventListener('click', ()=>{
    const uid = btn.getAttribute('uid');
     fetch(`/api/users/${uid}`, {
      method: "put",
      body: JSON.stringify({role: "USER"}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(reload());   
  })
}) 

addToCart?.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const pid = btn.getAttribute('pid');
  const cid = cart.getAttribute('cid');

    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "post"
    })
  });
});

deleteFromCart?.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const pid = btn.getAttribute('pid');
  const cid = cart.getAttribute('cid');
    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "delete"
    }).then(reload());
  });
});

btnPurchase?.addEventListener('click', ()=>{
 const cid = cart.getAttribute('cid');
  fetch(`/api/carts/${cid}/purchase`, {
    method: 'post'
  }).then( () => (window.location.href = "/ticket"));
});

cleanCart?.addEventListener('click', ()=>{
  const cid = cart.getAttribute('cid');
   fetch(`/api/carts/${cid}/clean`, {
     method: 'put'
   }).then(reload());
 });

prodForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(prodForm);
  const info = Object.fromEntries(data);
  console.log('done');
  fetch("/api/products/", {
    method: "post",
    body: JSON.stringify(info),
    headers: { "Content-Type": "application/json" },
  }).then(reload());
  prodForm.reset();
});

deleteProduct?.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const pid = btn.getAttribute('pid');
  console.log(pid);
    fetch(`/api/products/${pid}`, {
      method: "delete"
    }).then(reload());
  });
});

inactiveUsers?.addEventListener('click', ()=>{
  fetch('/api/users', {
    method: "delete"
  }).then(reload());
})