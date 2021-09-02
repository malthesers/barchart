"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  //Initiate loop
  loop();
});

const barchart = document.querySelector("#barchart");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const queue = [];
let counter = 0;

let opacityCounter = 0;

function loop() {
  //Add new queue count to array
  let queueSize = Math.floor(Math.random() * 32);
  queue.push(queueSize);

  //Add bar to html
  let bar = document.createElement("div");
  bar.classList.add("bar");
  bar.style.height = `${queueSize * 5}px`;
  bar.addEventListener("mouseover", displayQueueSize);
  if (counter > 0) {
    barchart.insertBefore(bar, document.querySelector(".bar"));
  } else {
    barchart.appendChild(bar);
  }

  //Remove 1 array object and 1 html element when there are more than 40
  if (queue.length > 40) {
    queue.shift();
    barchart.lastElementChild.remove();
  }

  //Increment counter by 1
  counter++;

  //Restart loop()
  setTimeout(loop, 150);

  //Increment opacityCounter and check for opacityFilter
  if (opacityCounter < 40) {
    opacityCounter++;
  }
  changeOpacity();
}

function changeOpacity() {
  document.querySelectorAll("#barchart .bar").forEach((bar) => {
    bar.style.opacity = 1.0;
  });

  numbers.forEach((number) => {
    if (opacityCounter > number) {
      document.querySelector(
        `#barchart .bar:nth-child(${number})`
      ).style.opacity = `${number * 5}%`;
    }

    if (opacityCounter > 30 + number) {
      document.querySelector(
        `#barchart .bar:nth-last-child(${number})`
      ).style.opacity = `${number * 10}%`;
    }
  });
}

function displayQueueSize() {
  document.querySelector("#display").textContent = `Queue: ${
    this.style.height.split("px")[0] / 5
  }`;
}
