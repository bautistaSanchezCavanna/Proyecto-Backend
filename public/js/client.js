const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const btnsAdd = document.querySelectorAll('.btnAgregar');
const btnPurchase = document.getElementById('purchase');
const cart = document.getElementById('cart');
const cleanCart = document.getElementById('clean');
const btnsDelete = document.querySelectorAll('.btnsDelete');

const deleteUser = document.querySelectorAll('.btnsEliminarUser');
const adminRole = document.querySelectorAll('.rol-admin');
const userRole = document.querySelectorAll('.rol-user');


loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const info = Object.fromEntries(data);
  fetch("/api/sessions/login", {
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
  fetch("/api/sessions/register", {
    method: "post",
    body: JSON.stringify(info),
    headers: { "Content-Type": "application/json" },
  }).then((window.location.href = "http://localhost:8080/"));
  registerForm.reset();
});

deleteUser.forEach(btn => {
  btn.addEventListener('click', ()=>{
  const uid = btn.getAttribute('uid');
  
    fetch(`/api/users/${uid}`, {
      method: "delete"
    }) 
  });
});

adminRole.forEach(btn =>{
  btn.addEventListener('click', ()=>{
    const uid = btn.getAttribute('uid');
    console.log(uid);
     fetch(`/api/users/${uid}`, {
      method: "put",
      body: JSON.stringify({role: "ADMIN"}),
      headers: {
        "Content-Type": "application/json"
      }
    });   
  })
}) 

userRole.forEach(btn =>{
  btn.addEventListener('click', ()=>{
    const uid = btn.getAttribute('uid');
    console.log(uid);
     fetch(`/api/users/${uid}`, {
      method: "put",
      body: JSON.stringify({role: "USER"}),
      headers: {
        "Content-Type": "application/json"
      }
    });   
  })
}) 

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
  }).then( () => (window.location.href = "http://localhost:8080/ticket"));
});

cleanCart.addEventListener('click', ()=>{
  const cid = cart.getAttribute('cid');
   fetch(`/api/carts/${cid}/clean`, {
     method: 'put'
   });
 });


 

