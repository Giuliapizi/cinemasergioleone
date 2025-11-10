// script-xml.js

// Funzione per caricare un file XML e restituire il documento XML
async function loadXMLFile(filePath) {
  const response = await fetch(filePath);
  const text = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(text, "application/xml");
}

// Funzione per creare una card HTML da dati estratti dal XML/DC o TEI
function createCard(data) {
  const card = document.createElement("div");
  card.className = "card-item";

  card.innerHTML = `
    <div class="card-body">
      <h3 class="card-title">${data.title}</h3>
      <p><strong>Autore:</strong> ${data.creator}</p>
      <p><strong>Anno:</strong> ${data.date}</p>
      <p>${data.description || ""}</p>
      <a href="${data.identifier}" target="_blank" class="btn btn-western">Vai alla fonte</a>
    </div>
  `;

  return card;
}

// Lista dei file XML da caricare (DC e TEI)
const xmlFiles = [
  "data/xml-dc-film.xml",
  "data/xml-tei-film.xml"
  // aggiungi altri file qui se necessario
];

// Contenitore dove inserire le card
const container = document.getElementById("xml-cards-container");

xmlFiles.forEach(async (file) => {
  try {
    const xml = await loadXMLFile(file);

    // Estrazione dati: supporta sia DC che TEI
    const title = xml.querySelector("dc\\:title, title")?.textContent || "Titolo non trovato";
    const creator = xml.querySelector("dc\\:creator, author")?.textContent || "Autore non trovato";
    const date = xml.querySelector("dc\\:date, date")?.textContent || "Data non trovata";
    const description = xml.querySelector("dc\\:description, div[type='descrizione'] p")?.textContent || "";

    const identifier = xml.querySelector("dc\\:identifier, idno")?.textContent || "#";

    const card = createCard({ title, creator, date, description, identifier });
    container.appendChild(card);

  } catch (error) {
    console.error("Errore caricando file XML:", file, error);
  }
});
