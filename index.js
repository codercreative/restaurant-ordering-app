import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu");
const orderContainer = document.getElementById("order-container");
const orders = document.getElementById("orders");
const paymentModal = document.getElementById("payment-modal");
const modalCloseBtn = document.getElementById("close-btn");
const form = document.getElementById("form");
const thankYouMsg = document.getElementById("thank-you-msg");

const cartArr = [];

// *Display menu html
menuEl.innerHTML = displayMenuHtml(menuArray);

// *Event Listeners
// clicking on the item and adding it to order
document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    const id = e.target.dataset.id;

    const updateIndex = cartArr.findIndex((item) => item.id == id);

    if (updateIndex > -1) {
      //already in cart
      cartArr[updateIndex].quantity += 1;
    } else {
      cartArr.push({ ...menuArray[id], quantity: 1 });
    }

    // console.log(cartArr)

    orders.innerHTML = displayCartHtml(cartArr);
    orderContainer.classList.remove("hidden");
    orders.classList.remove("hidden");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.remove) {
    const removeId = e.target.dataset.remove;

    const removeIndex = cartArr.findIndex((item) => item.id == removeId);

    if (removeIndex > -1) {
      if (cartArr[removeIndex].quantity > 1) {
        cartArr[removeIndex].quantity -= 1;
      } else {
        cartArr.splice(removeIndex, 1);
      }
    }

    if (cartArr.length === 0) {
      orderContainer.classList.add("hidden");
    }
  }
  orders.innerHTML = displayCartHtml(cartArr);
});

document.addEventListener("click", function (e) {
  if (e.target.id === "complete-order-btn") {
    paymentModal.classList.remove("hidden");
  }
});

// *Menu Html

function displayMenuHtml(menu) {
  let menuHtml = "";

  menu.forEach(function (item) {
    menuHtml += `
      <div class="menu-item" id=${item.id}>
        <div class="menu-item-details">
          <span class="menu-item-emoji">${item.emoji}</span>
          <div>
            <h2 class="menu-item-name" data-name=${item.name}>${item.name}</h2>
            <p class="menu-item-ingredients">${item.ingredients.join(", ")}</p>
            <p class="menu-item-price" data-price=${item.price}>$${
      item.price
    }</p>
          </div>  
        </div>
        <button class="add-btn" data-id=${item.id}>+</button>
      </div>`;
  });
  return menuHtml;
}

// *Cart html

function displayCartHtml(cart) {
  let cartHtml = "";

  let totalPrice = 0;

  cart.forEach(function (item) {
    const itemTotal = item.price * item.quantity;
    cartHtml += `   
    <div class="all-items" id=${item.id}>
        <p class="order-name">${item.name}  (${item.quantity})</p>
        <button class="remove-btn" data-remove=${item.id}>remove</button>
        <p class="order-price">$${itemTotal}</p>
     </div>
    
         `;

    totalPrice += itemTotal;
  });

  document.getElementById("order-price").innerHTML = `$${totalPrice}`;
  return cartHtml;
}
displayCartHtml(cartArr);

// *Close payment modal option

modalCloseBtn.addEventListener("click", function () {
  paymentModal.classList.add("hidden");
});

// *️Click on Pay button (submit) and display thank you message == DOES NOT APPEAR IN VSC??
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const userName = formData.get("customer-name");

  let thankYou = ``;
  thankYou = `
      <p>Thank you, ${userName}! <br>
      Your order is on its way!</p>
      `;

  thankYouMsg.innerHTML = thankYou;

  thankYouMsg.classList.remove("hidden");
  paymentModal.classList.add("hidden");
  orderContainer.classList.add("hidden");
});
