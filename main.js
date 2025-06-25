let products = [];
async function cargarProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");

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
function renderProducts(lista) {
  const container = document.getElementById("shopping");
  if (!container) return;
  container.innerHTML = "";
  const label=document.createElement("label");
  label.textContent="Sort by:";
  label.setAttribute("for", "order");

  const order=document.createElement("select");
  order.id="order";

  const op=document.createElement("option");
  op.value="Select"

  const op1=document.createElement("option");
  op1.value="price";
  op1.textContent="price";
  const op2=document.createElement("option");
  op2.value="name";
  op2.textContent="Name";
  order.appendChild(op)
  order.appendChild(op1);
  order.appendChild(op2);
  container.appendChild(label);
  container.appendChild(order);

order.addEventListener("change",()=>{
  const valor=order.value;
  let productsOrder=[...products];

  if(valor==="price"){
    productsOrder.sort((a,b)=>a.price-b.price);
  }else if(valor==="name"){
    productsOrder.sort((a,b)=>a.title.localeCompare(b.title));
  }
  renderProducts(productsOrder);
});

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
  actualizarContador()
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
      const existe=car.find((item)=>item.id===id);
      if (existe){
        existe.cantidad+=1
      } else{
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
      <p class="cantidad">Cantidad:${product.cantidad}</p>
      <img src="${product.image}" alt="${product.title}">
      <h3 class="name-product">${product.title}</h3>
      <p class="money-product">$${product.price}</p>
      <button class="eliminate" data-index="${index}">Delete</button>
      
    `;
      contenedor.appendChild(tarjeta);
    });
    const buttonEliminate = document.querySelectorAll(".eliminate");
    buttonEliminate.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const car = JSON.parse(localStorage.getItem("car")) || [];
        if(car[index].cantidad>1){
          car[index].cantidad-=1
        }else{
          car.splice(index, 1);
        }
        localStorage.setItem("car", JSON.stringify(car));
        renderizarCarrito();
        actualizarContador();
      });
    });
    const contenedorBuy=document.createElement("div")
    const finishBuy=document.createElement("button")
    contenedorBuy.classList.add("container-buy")
    finishBuy.classList.add("buy");
    finishBuy.textContent="Checkout"
    finishBuy.addEventListener("click", () => {
      alert("Compra Realizada")
        localStorage.removeItem("car");
        renderizarCarrito();
        actualizarContador();
    });
    contenedorBuy.appendChild(finishBuy);
    contenedor.appendChild(contenedorBuy);
    
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
    agregarfuncionboton();
    actualizarContador();
    renderizarCarrito();
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
  function VewProducts(products) {
    const container = document.getElementById("shopping");
    container.innerHTML = "";
    products.forEach((product) => {
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
    agregarfuncionboton();
    actualizarContador();
  }

})


// const buttonPrice = document.getElementById("price");
// buttonPrice.addEventListener("click", () => {
//   VewProducts(products);
// })
