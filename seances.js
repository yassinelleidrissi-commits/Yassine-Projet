// Sécurité
fetch("seances.json")
  .then(response => response.json())
  .then(data => {
    seances = data;
    chargerCoachs();    
    afficherSeances();  
  })
  .catch(err => console.error("Erreur lors du chargement du JSON:", err));
if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "index.html";
}

// Données
let seances = JSON.parse(localStorage.getItem("seances")) || [];
let coachs = JSON.parse(localStorage.getItem("coachs")) || [];

const form = document.getElementById("seanceForm");
const table = document.getElementById("seanceTable");
const coachSelect = document.getElementById("coach_id");

// Charger les coachs dans le select
function chargerCoachs() {
  coachSelect.innerHTML = `<option value="">-- Sélectionner un coach --</option>`;
  coachs.forEach(c => {
    coachSelect.innerHTML += `<option value="${c.id}">${c.nom}</option>`;
  });
}

// Soumission du formulaire
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const nom = document.getElementById("nom").value;
  const date = document.getElementById("date").value;
  const heure = document.getElementById("heure").value;
  const coach_id = document.getElementById("coach_id").value;

  if (id) {
    const index = seances.findIndex(s => s.id == id);
    seances[index] = { id, nom, date, heure, coach_id };
  } else {
    seances.push({
      id: Date.now(),
      nom,
      date,
      heure,
      coach_id
    });
  }

  localStorage.setItem("seances", JSON.stringify(seances));
  form.reset();
  afficherSeances();
});

// Affichage
function afficherSeances() {
  table.innerHTML = "";
  seances.forEach(s => {
    const coach = coachs.find(c => c.id == s.coach_id);
    table.innerHTML += `
      <tr>
        <td>${s.nom}</td>
        <td>${s.date}</td>
        <td>${s.heure}</td>
        <td>${coach ? coach.nom : "—"}</td>
        <td>
          <button onclick="editSeance(${s.id})">✏️</button>
          <button onclick="deleteSeance(${s.id})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

// Modifier
function editSeance(id) {
  const s = seances.find(s => s.id == id);
  document.getElementById("id").value = s.id;
  document.getElementById("nom").value = s.nom;
  document.getElementById("date").value = s.date;
  document.getElementById("heure").value = s.heure;
  document.getElementById("coach_id").value = s.coach_id;
}

// Supprimer
function deleteSeance(id) {
  seances = seances.filter(s => s.id != id);
  localStorage.setItem("seances", JSON.stringify(seances));
  afficherSeances();
}

// Initialisation
chargerCoachs();
afficherSeances();
