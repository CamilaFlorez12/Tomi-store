let products = [];
let favoritos = [];
let response = "https://fakestoreapi.com/products";

const favoritosGuardados = localStorage.getItem("productsfavoritos");
if (favoritosGuardados) {
  favoritos = JSON.parse(favoritosGuardados);
}


async function cargarProductos() {
  try {
    const respuesta = await fetch(response)
    const productos = await respuesta.json();

    if (!document.body.classList.contains("category-page")) {
      products = productos;
      renderProducts(products);
      console.log("Productos cargados:", products);
    }
  } catch (error) {
    console.log("Ocurrió un error al cargar los productos", error);
  }
}

function renderProducts(lista,contenedor_id="shopping") {
  const container = document.getElementById(contenedor_id);
  if (!container) return;
  container.innerHTML = "";

  const label = document.createElement("label");
  label.textContent = "Sort by:";
  label.setAttribute("for", "order");

  const order = document.createElement("select");
  order.id = "order";

  const op = document.createElement("option");
  op.value = "Select";

  const op1 = document.createElement("option");
  op1.value = "price";
  op1.textContent = "price";

  const op2 = document.createElement("option");
  op2.value = "name";
  op2.textContent = "Name";

  order.appendChild(op);
  order.appendChild(op1);
  order.appendChild(op2);

  container.appendChild(label);
  container.appendChild(order);

  order.addEventListener("change", () => {
    const valor = order.value;
    let productsOrder = [...products];

    if (valor === "price") {
      productsOrder.sort((a, b) => a.price - b.price);
    } else if (valor === "name") {
      productsOrder.sort((a, b) => a.title.localeCompare(b.title));
    }
    renderProducts(productsOrder);
  });

  lista.forEach((product) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "box";

    const container = document.createElement("div");
    container.classList.add("container");

    const imagen = document.createElement("img");
    imagen.classList.add("image-products")
    imagen.src = product.image;
    imagen.alt = product.title;

    const price = document.createElement("p");
    price.classList.add("money-product");
    price.textContent = `$${product.price}`;

    const title = document.createElement("h3");
    title.classList.add("name-product");
    title.textContent = `${product.title}`;

    const buyCart = document.createElement("div");
    buyCart.classList.add("buy-car");

    const boton = document.createElement("button");
    boton.classList.add("add-to-cart");
    boton.setAttribute("data-id", product.id);

    const icono = document.createElement("i");
    icono.classList.add("ri-shopping-cart-2-line");


    


    boton.appendChild(icono);
    buyCart.appendChild(boton);

    const listProducts = document.createElement("div");
    listProducts.classList.add("list-products");
    listProducts.appendChild(title);
    listProducts.appendChild(price);
    listProducts.appendChild(buyCart);

    container.appendChild(imagen);
    container.appendChild(listProducts);
    tarjeta.appendChild(container);

    document.getElementById("shopping").appendChild(tarjeta);
    
  });


  agregarfuncionboton();
  actualizarContador();

}


function actualizarContador() {
  const car = JSON.parse(localStorage.getItem("car")) || [];
  const contador = document.querySelector(".contador");
  let total = 0;
  car.forEach((product) => {
    total += product.cantidad
  })
  if (contador) {
    contador.textContent = total;
  }
}

function agregarfuncionboton() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      const product = products.find((product) => product.id === id);
      let car = JSON.parse(localStorage.getItem("car")) || [];
      const existe = car.find((item) => item.id === id);

      if (existe) {
        existe.cantidad += 1;
      } else {
        car.push({ ...product, cantidad: 1 });
      }

      localStorage.setItem("car", JSON.stringify(car));
      actualizarContador();
      console.log("producto agregado:", product);
      console.log(JSON.parse(localStorage.getItem("car")));
    });
  });
}

cargarProductos().then(() => {
  const container = document.querySelectorAll(".container");
  container.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.transform = "scale(1.05)";
      item.style.transition = "transform 0.3s ease";
    });
    item.addEventListener("mouseout", () => {
      item.style.transform = "scale(1)";
    });
  });
});

if (document.body.classList.contains("category-page")) {
  const filtered = JSON.parse(localStorage.getItem("filtered")) || [];
  products = filtered;
  console.log("Productos filtrados:", products);
  renderProducts(filtered);
  actualizarContador();
}

if (
  document.body.classList.contains("login-page") ||
  document.body.classList.contains("category-page")
) {
  const contenedor = document.getElementById("car-container");
  const car = document.querySelector(".ri-shopping-cart-2-line");
  const cloting = document.getElementById("car-container");
  const overlay = document.getElementById("overlay");

  function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("car")) || [];
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      contenedor.innerHTML = `<h2 style="text-align:center; color:white;">Your cart is empty</h2>`;
      return;
    }

    carrito.forEach((product, index) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjet");

      const text = document.createElement("p");
      text.classList.add("cantidad");
      text.textContent = `Cantidad: $${product.cantidad}`;

      const imagen = document.createElement("img");
      imagen.src = `${product.image}`;
      imagen.alt = `${product.title}`;

      const title = document.createElement("h3");
      title.classList.add("name-product");
      title.textContent = `${product.title}`;

      const text2 = document.createElement("p");
      text2.classList.add("money-product");
      text2.textContent = `$${product.price}`;

      const buttonRemove = document.createElement("button");
      buttonRemove.classList.add("eliminate");
      buttonRemove.setAttribute("data-index", `${index}`)
      buttonRemove.textContent = "Delete";

      const buttonAdd = document.createElement("button");
      buttonAdd.classList.add("add");
      buttonAdd.setAttribute("data-index", `${index}`);
      buttonAdd.textContent = "Add"

      tarjeta.appendChild(text);
      tarjeta.appendChild(imagen);
      tarjeta.appendChild(title);
      tarjeta.appendChild(text2);
      tarjeta.appendChild(buttonRemove);
      tarjeta.appendChild(buttonAdd);

      contenedor.appendChild(tarjeta);
    });

    const buttonEliminate = document.querySelectorAll(".eliminate");
    buttonEliminate.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const car = JSON.parse(localStorage.getItem("car")) || [];
        if (car[index].cantidad > 1) {
          car[index].cantidad -= 1;
        } else {
          car.splice(index, 1);
        }
        localStorage.setItem("car", JSON.stringify(car));
        renderizarCarrito();
        actualizarContador();
      });
    });

    const buttonAdd = document.querySelectorAll(".add");
    buttonAdd.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const car = JSON.parse(localStorage.getItem("car")) || [];
        if (car[index].cantidad) {
          car[index].cantidad += 1;
        }
        localStorage.setItem("car", JSON.stringify(car));
        renderizarCarrito();
        actualizarContador();
      })
    })

    const contenedorBuy = document.createElement("div");
    const finishBuy = document.createElement("button");
    contenedorBuy.classList.add("container-buy");
    finishBuy.classList.add("buy");
    finishBuy.textContent = "Checkout";
    finishBuy.addEventListener("click", () => {
      alert("Thank you for your purchase💗");
      localStorage.removeItem("car");
      renderizarCarrito();
      actualizarContador();
    });

    contenedorBuy.appendChild(finishBuy);
    contenedor.appendChild(contenedorBuy);
  }

  if (car && cloting && overlay) {
    car.addEventListener("click", () => {
      const isHidden = cloting.style.display === "none" || cloting.style.display === "";
      cloting.style.display = isHidden ? "flex" : "none";
      cloting.style.flexDirection = "column";
      overlay.style.display = isHidden ? "block" : "none";

      if (isHidden) renderizarCarrito();
    });

    overlay.addEventListener("click", () => {
      cloting.style.display = "none";
      overlay.style.display = "none";
    });
  }

  renderizarCarrito();
}



document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("login-page")) {
    const clothes = document.getElementById("icon-clothes");
    const containerClothes = document.querySelector(".container-clothes");

    clothes.addEventListener("click", () => {
      if (containerClothes.style.display === "none") {
        containerClothes.style.display = "flex";
      } else {
        containerClothes.style.display = "none";
      }
    });

    function filterCategory(category) {
      const filter = products.filter((product) => product.category === category);
      localStorage.setItem("filtered", JSON.stringify(filter));
      window.location.href = "category.html";
    }


    const searchbar = document.querySelector(".search__input");
    searchbar.addEventListener("input", () => {
      const valueInput = searchbar.value.toLowerCase();

      if (valueInput === "") {
        renderProducts(products);
      } else {
        const resultados = products.filter(product =>
          product.title.toLowerCase().includes(valueInput)
        );
        renderProducts(resultados);
      }

      actualizarContador();
    });


    const buttonWomen = document.getElementById("button-women");
    const buttonMen = document.getElementById("button-men");
    const buttonjewelery = document.getElementById("button-jewelery");
    const buttonElectronics = document.getElementById("button-electronics");

    buttonWomen.addEventListener("click", () => {
      filterCategory("women's clothing");
      agregarfuncionboton();
    });

    buttonMen.addEventListener("click", () => {
      filterCategory("men's clothing");
      agregarfuncionboton();
    });

    buttonjewelery.addEventListener("click", () => {
      filterCategory("jewelery");
      agregarfuncionboton();
    });

    buttonElectronics.addEventListener("click", () => {
      filterCategory("electronics");
      agregarfuncionboton();
    });
  }
});



