const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const info = Object.fromEntries(data);
  fetch("/api/users/login", {
    method: "post",
    body: JSON.stringify(info),
    headers: {'Content-Type': 'application/json'}
  }).then(()=>window.location.href = '/products');
  loginForm.reset();
})

registerForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(registerForm);
  const info = Object.fromEntries(data);
  fetch("/api/users/register", {
    method: "post",
    body: JSON.stringify(info),
    headers: {'Content-Type': 'application/json'}
  }).then(window.location.href = 'http://localhost:8080/');
  registerForm.reset();
});

const logout = () => {
  window.location.href = '/logout';
};