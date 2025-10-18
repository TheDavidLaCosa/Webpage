// --- Zoom Poster amb drag, scroll intern i bloqueig del body ---
const modal = document.getElementById("zoomModal");
const poster = document.getElementById("posterImage");
const zoomed = document.getElementById("zoomedImage");
const closeBtn = document.querySelector(".close-zoom");

// Controls opcionals de zoom
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const resetZoomBtn = document.getElementById("resetZoomBtn");

let scale = 1;
const scaleStep = 0.2;
const maxScale = 4;
const minScale = 1;

// Obrir modal i BLOQUEJAR scroll del body
poster.onclick = function () {
  modal.style.display = "flex";
  zoomed.src = this.src;
  scale = 1;
  zoomed.style.transform = `scale(${scale})`;
  zoomed.style.transformOrigin = "center center"; // zoom centrat
  document.body.style.overflow = "hidden"; // ❌ bloqueja scroll del fons
  modal.scrollTop = 0;
  modal.scrollLeft = 0;
};

// Tancar modal i RESTABLIR scroll global
const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // ✅ reactivem scroll global
};

closeBtn.onclick = closeModal;
modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};

// ---------- Drag per moure la imatge ----------
let isDragging = false;
let startX, startY, startScrollLeft, startScrollTop;

zoomed.addEventListener("mousedown", (e) => {
  isDragging = true;
  zoomed.style.cursor = "grabbing";
  startX = e.clientX;
  startY = e.clientY;
  startScrollLeft = modal.scrollLeft;
  startScrollTop = modal.scrollTop;
  e.preventDefault();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  zoomed.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  modal.scrollLeft = startScrollLeft - dx;
  modal.scrollTop = startScrollTop - dy;
});

// ---------- Controls de zoom ----------
if (zoomInBtn && zoomOutBtn && resetZoomBtn) {
  zoomInBtn.onclick = () => {
    if (scale < maxScale) {
      scale += scaleStep;
      zoomed.style.transform = `scale(${scale})`;
      adjustZoomedContainer();
    }
  };

  zoomOutBtn.onclick = () => {
    if (scale > minScale) {
      scale -= scaleStep;
      zoomed.style.transform = `scale(${scale})`;
      adjustZoomedContainer();
    }
  };

  resetZoomBtn.onclick = () => {
    scale = 1;
    zoomed.style.transform = `scale(${scale})`;
    adjustZoomedContainer();
    modal.scrollTo({ top: 0, left: 0 });
  };
}

// 🔧 Ajust automàtic per permetre veure les vores després de fer zoom
function adjustZoomedContainer() {
  // Afegeix un marge invisible perquè es pugui fer scroll fins al límit
  const padding = 200 * (scale - 1); // 👈 augmenta amb el zoom
  zoomed.style.margin = `${padding}px`;
}
