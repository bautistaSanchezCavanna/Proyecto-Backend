<<<<<<< HEAD
const socket = io();

const formAgregar = document.getElementById("formAgregar");
const titleInput = document.getElementById("input-title");
const descriptionInput = document.getElementById("input-description");
const priceInput = document.getElementById("input-price");
const codeInput = document.getElementById("input-code");
const categoryInput = document.getElementById("input-category");
const stockInput = document.getElementById("input-stock");
const lista = document.getElementById("containerLista");
const formEliminar = document.getElementById('formEliminar');
const idAEliminar = document.getElementById('input-idAEliminar')

formAgregar.addEventListener("submit", (event) => {
event.preventDefault();
  const title = titleInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const code = codeInput.value;
  const category = categoryInput.value;
  const stock = stockInput.value;

  const newProduct = {
    title,
    description,
    price,
    code,
    category,
    stock,
  };
  socket.emit("agregar-producto", newProduct);
});

const getHtml = (template) => template.join("\n");

const renderProduct = (product) => {
  const html = getHtml([
    '<div class="productContainer">',
    `<h2>Producto: ${product.title}</h2>`,
    "<div>",
    `<p>Descripción: ${product.description}</p>`,
    `<p>Precio: $${product.price}</p>`,
    "</div>",
    "</div>",
  ]);
  return html;
};

socket.on("render-products", (data) => {
  const product = getHtml(data.map(prod => renderProduct(prod)));
  lista.innerHTML = product;
});


formEliminar.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = idAEliminar.value;
    socket.emit('borrar-producto', +id);
    console.log(id);
});

socket.on('productos-eliminado', (data)=>{
    const product = getHtml(data.map(prod => renderProduct(prod)));
    lista.innerHTML = product;
})
=======
const socket = io();

const formAgregar = document.getElementById("formAgregar");
const titleInput = document.getElementById("input-title");
const descriptionInput = document.getElementById("input-description");
const priceInput = document.getElementById("input-price");
const codeInput = document.getElementById("input-code");
const categoryInput = document.getElementById("input-category");
const stockInput = document.getElementById("input-stock");
const lista = document.getElementById("containerLista");
const formEliminar = document.getElementById('formEliminar');
const idAEliminar = document.getElementById('input-idAEliminar')

formAgregar.addEventListener("submit", (event) => {
event.preventDefault();
  const title = titleInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const code = codeInput.value;
  const category = categoryInput.value;
  const stock = stockInput.value;

  const newProduct = {
    title,
    description,
    price,
    code,
    category,
    stock,
  };
  socket.emit("agregar-producto", newProduct);
});

const getHtml = (template) => template.join("\n");

const renderProduct = (product) => {
  const html = getHtml([
    '<div class="productContainer">',
    `<h2>Producto: ${product.title}</h2>`,
    "<div>",
    `<p>Descripción: ${product.description}</p>`,
    `<p>Precio: $${product.price}</p>`,
    "</div>",
    "</div>",
  ]);
  return html;
};

socket.on("render-products", (data) => {
  const product = getHtml(data.map(prod => renderProduct(prod)));
  lista.innerHTML = product;
});


formEliminar.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = idAEliminar.value;
    socket.emit('borrar-producto', +id);
    console.log(id);
});

socket.on('productos-eliminado', (data)=>{
    const product = getHtml(data.map(prod => renderProduct(prod)));
    lista.innerHTML = product;
})
>>>>>>> origin/main
