const wall = document.querySelector(".photo-wall");
const viewer = document.querySelector(".photo-viewer");
const fullImage = viewer.querySelector("img");

if (typeof viewer.showModal === "function") {
  wall.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    fullImage.src = link.href;
    fullImage.alt = link.querySelector("img").alt;
    viewer.showModal();
  });
  viewer.addEventListener("click", () => viewer.close());
}
