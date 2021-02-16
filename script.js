const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");

    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

const btn = document.getElementById("btn-data");
btn.addEventListener("click", () => {
  // taking data from container and convert into array
  const data = document.getElementById("bottom-area").innerText.split("\n\n");
  console.log(data);
  // reset div to not rewrite
  document.querySelector(".selected").innerHTML = "";
  // adding data using loop
  for (var current = 0; current <= data.length - 1; current++) {
    const selected = document.querySelector(".selected");
    const selectedCont = document.createElement("h2");
    selectedCont.innerText = data[current];
    selected.append(selectedCont);
  }
});
