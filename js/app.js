const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    
    const image = product.image;
    const rating = product.rating.rate;
    const ratingCount = product.rating.count;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product  text-light mx-1 my-2">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="text-warning">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h5 class="text-info fw-bold">Rating : ${rating} <span class="text-secondary"> Count:${ratingCount} </span>  </h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      

     
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="${product.title}">
  Details
</button>



      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const convertToFloat = parseFloat(element);
  const converted = parseFloat(convertToFloat.toFixed(2));
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertFloat = parseFloat(value);
  const convertPrice = parseFloat(convertFloat.toFixed(2));
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total;

  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", parseFloat((priceConverted * 0.2).toFixed(2)));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", parseFloat((priceConverted * 0.3).toFixed(2)));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", parseFloat((priceConverted * 0.4).toFixed(2)));
  }

  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};

