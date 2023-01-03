import { menuArray } from "./data.js";

function renderMenu() {
  const menuSection = document.getElementById("menu-section");

  menuArray.forEach(function (item) {
    menuSection.innerHTML += `
      <div class="menu-item">
        <div class="menu-item-details">
          <span class="menu-item-emoji">${item.emoji}</span>
          <div>
            <h2 class="menu-item-name">${item.name}</h2>
            <p class="menu-item-ingredients">${item.ingredients}</p>
            <p class="menu-item-price">$${item.price}</p>
          </div>  
        </div>
        <button class="menu-item-btn">+</button>
      </div>
    `;
  });
}

renderMenu();
