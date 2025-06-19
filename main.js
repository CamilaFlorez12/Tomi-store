async function cargarProductos() {
    const contenedor = document.getElementById("shopping");

    try {
      const respuesta = await fetch("https://fakestoreapi.com/products");

      const productos = await respuesta.json();

      for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        const productoHTML = `
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

        contenedor.innerHTML += productoHTML;
      }

    } catch (error) {
      console.log("Ocurrió un error al cargar los productos", error);
    }
  }

  cargarProductos();
