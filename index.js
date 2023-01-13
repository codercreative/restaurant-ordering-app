import { menuArray } from "./data.js";

// Generate menu html
function getMenuHtml() {
  let menuHtml = "";

  menuArray.forEach(function (item) {
    menuHtml += `
      <div class="menu-item">
        <div class="menu-item-details">
          <span class="menu-item-emoji">${item.emoji}</span>
          <div>
            <h2 class="menu-item-name">${item.name}</h2>
            <p class="menu-item-ingredients">${item.ingredients.join(", ")}</p>
            <p class="menu-item-price">$${item.price}</p>
          </div>  
        </div>
        <button class="menu-add-item-btn">+</button>
      </div>
    `;
  });
  return menuHtml;
}

// render menu

function render() {
  document.getElementById("menu-section").innerHTML = getMenuHtml();
}
render();

// Checklist
// ✅show menu items
// add event listener to add items to cart
// add items to cart
// render all the items
// get the total price
// option to remove items
// hide order if no items present
// hide and show modal
// if no items hide pre-checkout
// add event listener to submit button
// ✅ create modal
// render modal when submit button is clicked
// make all fields required in modal state
// when pay button clicked: close modal, create thank you message with user name, return to default state
