/* Aquí pots afegir codi JavaScript si el necessites */
console.log("La pàgina principal s'ha carregat correctament.");

// --- Zoom Poster ---
const modal = document.getElementById("zoomModal");
const poster = document.getElementById("posterImage");
const zoomed = document.getElementById("zoomedImage");
const closeBtn = document.querySelector(".close-zoom");

poster.onclick = function() {
  modal.style.display = "flex";
  zoomed.src = this.src;
};

closeBtn.onclick = function() {
  modal.style.display = "none";
};

// També permet tancar fent clic fora de la imatge
modal.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
