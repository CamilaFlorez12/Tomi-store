let products=[];
async function cargarProductos() {
  const contenedor = document.getElementById("shopping");
  contenedor.innerHTML="";
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");

    const productos = await respuesta.json();
    products =productos

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
const clothes=document.getElementById("icon-clothes");
const containerClothes=document.querySelector(".container-clothes");

clothes.addEventListener("click",()=>{
  if(containerClothes.style.display==="none"){
    containerClothes.style.display="flex";
  } else{
    containerClothes.style.display="none";
  }
}
)

function filterCategory(category){
  const filter=products.filter(product=>
    product.category===category);
    const container=document.getElementById("shopping");
    container.innerHTML="";
    filter.forEach(product=>{
      const tarjeta=`
       <div class="box">
          <div class="container">
            <img src="${product.image}" alt="${product.title}" class="image-products">
            <div class="list-products">
              <h3 class="name-product">${product.title}</h3>
              <p class="money-product">$${product.price}</p>
              <div class="buy-car">
                <a href="#car-shopping"><i class="ri-shopping-cart-2-line"></i></a>
              </div>
            </div>
          </div>
          </div>
      `
      container.innerHTML+=tarjeta;
    })
}
const buttonWomen=document.getElementById("button-women");
const buttonMen=document.getElementById("button-men");
const buttonjewelery=document.getElementById("button-jewelery");
const buttonElectronics=document.getElementById("button-electronics")
buttonWomen.addEventListener("click",()=>{
  filterCategory("women's clothing");
});
buttonMen.addEventListener("click",()=>{
  filterCategory("men's clothing");
})
buttonjewelery.addEventListener("click",()=>{
  filterCategory("jewelery");
})
buttonElectronics.addEventListener("click",()=>{
  filterCategory("electronics");
})

function VewProducts(products){
  const filterPrice=products.sort((a,b)=>a.price-b.price);
  const container=document.getElementById("shopping");
  container.innerHTML="";
  filterPrice.forEach(product=>{
    const tarjeta=`
      <div class="box">
          <div class="container">
            <img src="${product.image}" alt="${product.title}" class="image-products">
            <div class="list-products">
              <h3 class="name-product">${product.title}</h3>
              <p class="money-product">$${product.price}</p>
              <div class="buy-car>
                <a href="#car-shopping"><i class="ri-shopping-cart-2-line"></i></a>
              </div>
            </div>
          </div>
          </div>
    `
    container.innerHTML+=tarjeta;
  })
}
const buttonPrice=document.getElementById("price");
buttonPrice.addEventListener("click",()=>{
  VewProducts(products);
})
