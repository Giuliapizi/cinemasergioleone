
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(acc => {
  acc.addEventListener('click', function() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if(panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});



// Rendi visibile solo la tab "All"
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("all").style.display = "block";
  document.querySelector(".tab button.tablinks").classList.add("active");
});

// Disattiva click sulle altre tab
function openCity(evt, tabName) {
  if (tabName !== "all") {
    return; // non fa nulla
  }

  // Altrimenti (solo all) mostra il contenuto
  document.getElementById("all").style.display = "block";
}

const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      card.style.display = (filter === "all" || card.classList.contains(filter))
        ? "block"
        : "none";
    });
  });
});
