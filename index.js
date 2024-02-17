const btns = document.querySelectorAll(".add-btn");
const displayContainer = document.getElementById("selected-place-container");
const totalSection = document.getElementById("total-cost");
const grandTotalSection = document.getElementById("grand-total");
const budjetSection = document.getElementById("budget");

let count = 0;
let total = Number(totalSection.innerText);
let grandTotal = Number(grandTotalSection.innerText);
let budget = Number(budjetSection.innerText);

function addInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

for (const btn of btns) {
  btn.addEventListener("click", function () {
    count++;
    addInnerText("cart-count", count);

    const place = event.target.parentNode.childNodes[1].innerText;
    const price = event.target.parentNode.childNodes[3].childNodes[1].innerText;

    // Update budget
    budget = budget - price;

    if (budget < 0) {
      alert("Please earn more...");
      return;
    }
    budjetSection.textContent = budget;

    // display event name and value
    const li = document.createElement("li");

    const p1 = document.createElement("p");
    p1.innerText = place;

    const p2 = document.createElement("p");
    p2.innerText = price;

    li.appendChild(p1);
    li.appendChild(p2);
    displayContainer.appendChild(li);

    // update total
    total = total + Number(price);
    totalSection.innerText = total;

    // update grand total
    calcGrandTotal();

    // Set attribute as disable
    btn.setAttribute("disabled", "");
    btn.parentNode.parentNode.style.backgroundColor = "pink";
  });
}

function calcGrandTotal(category) {
  if (category === "bus") {
    grandTotal = total + 100;
  } else if (category === "train") {
    grandTotal = total - 200;
  } else if (category === "flight") {
    grandTotal = total + 500;
  } else {
    grandTotal = total;
  }
  grandTotalSection.innerText = grandTotal;
}
