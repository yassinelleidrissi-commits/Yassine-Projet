// Sécurité
fetch("abonnements.json")
  .then(response => response.json())
  .then(data => {
    abonnements = data;
    chargerMembres();      
    afficherAbonnements(); 
  })
  .catch(err => console.error("Erreur lors du chargement du JSON:", err));
if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "index.html";
}

// Données
let abonnements = JSON.parse(localStorage.getItem("abonnements")) || [];
let membres = JSON.parse(localStorage.getItem("membres")) || [];

const form = document.getElementById("abonnementForm");
const table = document.getElementById("abonnementTable");
const membreSelect = document.getElementById("membre_id");

// Charger membres dans le select
function chargerMembres() {
  membreSelect.innerHTML = `<option value="">-- Sélectionner un membre --</option>`;
  membres.forEach(m => {
    membreSelect.innerHTML += `<option value="${m.id}">${m.nom}</option>`;
  });
}

// Soumission du formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const membre_id = document.getElementById("membre_id").value;
  const type = document.getElementById("type").value;
  const prix = document.getElementById("prix").value;
  const duree = document.getElementById("duree").value;

  if (id) {
    const index = abonnements.findIndex(a => a.id == id);
    abonnements[index] = { id, membre_id, type, prix, duree };
  } else {
    abonnements.push({
      id: Date.now(),
      membre_id,
      type,
      prix,
      duree
    });
  }

  localStorage.setItem("abonnements", JSON.stringify(abonnements));
  form.reset();
  afficherAbonnements();
});

// Affichage
function afficherAbonnements() {
  table.innerHTML = "";
  abonnements.forEach(a => {
    const membre = membres.find(m => m.id == a.membre_id);
    table.innerHTML += `
      <tr>
        <td>${membre ? membre.nom : "—"}</td>
        <td>${a.type}</td>
        <td>${a.prix}</td>
        <td>${a.duree} mois</td>
        <td>
          <button onclick="editAbonnement(${a.id})">✏️</button>
          <button onclick="deleteAbonnement(${a.id})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

// Modifier
function editAbonnement(id) {
  const a = abonnements.find(a => a.id == id);
  document.getElementById("id").value = a.id;
  document.getElementById("membre_id").value = a.membre_id;
  document.getElementById("type").value = a.type;
  document.getElementById("prix").value = a.prix;
  document.getElementById("duree").value = a.duree;
}

// Supprimer
function deleteAbonnement(id) {
  abonnements = abonnements.filter(a => a.id != id);
  localStorage.setItem("abonnements", JSON.stringify(abonnements));
  afficherAbonnements();
}

// Initialisation
chargerMembres();
afficherAbonnements();
