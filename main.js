async function cargarProductos() {
  const contenedor = document.getElementById("shopping");

  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");

    const productos = await respuesta.json();

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];

      const tarjeta = `
            <div class="box">
          <div class="container">
            <img src="${producto.image}" alt="${producto.title}" class="image-products">
            <div class="list-products">
              <h3 class="name-product">${producto.title}</h3>
              <p class="money-product">$${producto.price}</p>
              <div class="buy-car">
                <a href="#car-shopping"><i class="ri-shopping-cart-2-line"></i></a>
              </div>
            </div>
          </div>
          </div>
        `;

      contenedor.innerHTML += tarjeta;
    }

  } catch (error) {
    console.log("Ocurrió un error al cargar los productos", error);
  }

}

cargarProductos().then(() => {
  const container = document.querySelectorAll(".container");
  container.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.transform = 'scale(1.05)';
      item.style.transition = "transform 0.3s ease";
    });
    item.addEventListener("mouseout", () => {
      item.style.transform = "scale(1)";
    })

  })
});
