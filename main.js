let products = [];
async function cargarProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");

    const productos = await respuesta.json();
    products = productos;
    if (!document.body.classList.contains("category-page")) {
      renderProducts(products);
      console.log("Productos cargados:", products);
    }
  } catch (error) {
    console.log("Ocurrió un error al cargar los productos", error);
  }
}
function renderProducts(lista) {
  const container = document.getElementById("shopping");
  if (!container) return;
  container.innerHTML = "";

  lista.forEach((product) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "box";
    tarjeta.innerHTML = `
      <div class="container">
      <img src="${product.image}" alt="${product.title}" class="image-products">
      <div class="list-products">
        <h3 class="name-product">${product.title}</h3>
        <p class="money-product">$${product.price}</p>
        <div class="buy-car">
        <button class="add-to-cart" data-id="${product.id}">
        <i class="ri-shopping-cart-2-line"></i>
        </button>
        </div>
        </div>
        </div>
      `;
    container.appendChild(tarjeta);
  });
  agregarfuncionboton();
}

function actualizarContador() {
  const car = JSON.parse(localStorage.getItem("car")) || [];
  const contador = document.querySelector(".contador");
  if (contador) {
    contador.textContent = car.length;
  }
}
function agregarfuncionboton() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      const product = products.find((product) => product.id === id);
      let car = JSON.parse(localStorage.getItem("car")) || [];
      car.push(product);
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
}



if (document.getElementById("car-container")) {
  const contenedor = document.getElementById("car-container");

  function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("car")) || [];
    contenedor.innerHTML = "";
    if (carrito.length === 0) {
      contenedor.innerHTML = `<h2 style="text-align:center; color:white;">No hay Productos en el carrito</h2>`;
      return;
    }
    carrito.forEach((product, index) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjet");
      tarjeta.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3 class="name-product">${product.title}</h3>
      <p class="money-product">$${product.price}</p>
      <button class="eliminate" data-index="${index}">Eliminate</button>
      <button class="buy" data-index="${index}">Buy</button>
    `;
      contenedor.appendChild(tarjeta);
    });
    const buttonEliminate = document.querySelectorAll(".eliminate");
    buttonEliminate.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const car = JSON.parse(localStorage.getItem("car")) || [];
        car.splice(index, 1);
        localStorage.setItem("car", JSON.stringify(car));
        renderizarCarrito();
        actualizarContador();
      });
    });
    const buttonBuy = document.querySelectorAll(".buy");
    buttonBuy.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const car = JSON.parse(localStorage.getItem("car")) || [];
        car.splice(index, 1);
        localStorage.setItem("car", JSON.stringify(car));
        renderizarCarrito();
        actualizarContador();
        alert("Producto comprado");
      });
    });
  }

  const car = document.querySelector(".ri-shopping-cart-2-line");
  const cloting = document.getElementById("car-container");
  car.addEventListener("click", () => {
    if (cloting.style.display === "none" || cloting.style.display === "") {
      cloting.style.display = "flex";
      cloting.style.flexDirection = "column";
      renderizarCarrito();
    } else {
      cloting.style.display = "none";
    }
  });

  renderizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
if (document.body.classList.contains("login-page")) {
  const clothes = document.getElementById("icon-clothes");
  const containerClothes = document.querySelector(".container-clothes");
  console.log(clothes);
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
    document.getElementById("shopping").innerHTML = "";
    products.forEach((product) => {
      if (product.title.toLowerCase().includes(valueInput)) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "box";
        tarjeta.innerHTML = `
      <div class="container">
      <img src="${product.image}" alt="${product.title}" class="image-products">
      <div class="list-products">
        <h3 class="name-product">${product.title}</h3>
        <p class="money-product">$${product.price}</p>
        <div class="buy-car">
        <button class="add-to-cart" data-id="${product.id}">
        <i class="ri-shopping-cart-2-line"></i>
        </button>
        </div>
        </div>
        </div>
      `;
        document.getElementById("shopping").appendChild(tarjeta);
      }
    });
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

  function VewProducts(products) {
    const filterPrice = products.sort((a, b) => a.price - b.price);
    const container = document.getElementById("shopping");
    container.innerHTML = "";
    filterPrice.forEach((product) => {
      const tarjeta = `
      <div class="box">
          <div class="container">
            <img src="${product.image}" alt="${product.title}" class="image-products">
            <div class="list-products">
              <h3 class="name-product">${product.title}</h3>
              <p class="money-product">$${product.price}</p>
              <div class="buy-car">
                <a href="#car-shopping"><button><i class="ri-shopping-cart-2-line"></i></button></a>
              </div>
            </div>
          </div>
          </div>
    `;
      container.innerHTML += tarjeta;
    });
  }
}
})
// const buttonPrice = document.getElementById("price");
// buttonPrice.addEventListener("click", () => {
//   VewProducts(products);
// })
