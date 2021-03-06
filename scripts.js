// ↓ dont look at that pls ↓
//  DocumentObjectModel Variables ( connection variables)
const packagesDeliveredP = document.querySelector("#packages-delivered-p");
const packagesDeliveredBtn = document.querySelector("#packages-delivered-btn");
const hogCounters = document.querySelector("#hog-counters"); //hog-buttons
const hogButtons = document.querySelector("#hog-buttons");
// ↓ Game Variables ( variables used in the game duh) ↓
let packagesDelivered = 0;
let packagesIncrement = 0;
let firstHogsIncrement = 0;

const hogTypes = [];

class HogType {
  /**
   * A type of a hog, which produces the previous generation of the hog.
   * @param {string} name Name of the hog
   * @param {number} cost The cost of the hog
   */
  constructor(name) {
    this.id = hogTypes.length;
    // Initialize some stuff
    this.name = name;
    this.cost = 15 * 10 ** this.id;
    this.amount = 0;
    // Append self to body
    this.buyButton = document.createElement("button");
    this.buyButton.classList.add("hog-button");
    this.buyButton.addEventListener("click", () => this.buy());
    hogButtons.appendChild(this.buyButton);
    this.hogCounter = document.createElement("p");
    this.hogCounter.classList.add("hog-counter");
    hogCounters.appendChild(this.hogCounter);
    hogTypes.push(this);
  }
  updateUI() {
    this.buyButton.innerText = `${this.name}: ${this.cost}`;
    this.hogCounter.innerText = `${this.name}s bought: ${this.amount}`;
  }
  buy() {
    if (packagesDelivered < this.cost) return;
    packagesDelivered -= this.cost;
    this.amount++;
    this.cost = Math.round(this.cost * 1.15);
  }
  applyGains() {
    if (this.id === 0) packagesDelivered += this.amount;
    else hogTypes[this.id - 1].amount += this.amount;
  }
}

// Functions
const autoPackageDeliver = () => {
  for (const hogType of hogTypes) hogType.applyGains();
};
const updateUI = () => {
  packagesDeliveredP.innerHTML = `Packages delivered: ${packagesDelivered}`;
  for (const hogType of hogTypes) hogType.updateUI();
};
// Event listener
packagesDeliveredBtn.addEventListener("click", () => {
  packagesDelivered += 1;
});

new HogType("First Hog");
new HogType("Second Hog");
new HogType("Third Hog");
new HogType("Fourth Hog");
new HogType("Fifth Hog");
new HogType("Sixth Hog");
new HogType("Seventh Hog");
new HogType("Eighth Hog");
new HogType("1 H0G 2 rul dem aLLL!!!!!!");

// Game Loop
window.setInterval(() => {
  autoPackageDeliver();
}, 1000);

window.setInterval(() => {
  updateUI();
}, 20);
