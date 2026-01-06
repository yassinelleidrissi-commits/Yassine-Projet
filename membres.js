fetch("membres.json")
  .then(response => response.json())
  .then(data => {
    membres = data;
    afficherMembres();
  })
   .catch(err => console.error("Erreur lors du chargement du JSON:", err));
let membres = [];

const form = document.getElementById("membreForm");
const table = document.getElementById("membreTable");

/* ===== INITIALISATION ===== */
if (localStorage.getItem("membres")) {
  // Charger depuis LocalStorage
  membres = JSON.parse(localStorage.getItem("membres"));
  afficherMembres();
} else {
  // Charger depuis JSON
  fetch("membres.json")
    .then(response => response.json())
    .then(data => {
      membres = data;
      localStorage.setItem("membres", JSON.stringify(membres));
      afficherMembres();
    })
    .catch(err => console.error("Erreur JSON:", err));
}

/* ===== AJOUT / MODIFICATION ===== */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value;

  if (id) {
    const index = membres.findIndex(m => m.id == id);
    membres[index] = { id: Number(id), nom, email, telephone };
  } else {
    membres.push({
      id: Date.now(),
      nom,
      email,
      telephone
    });
  }

  localStorage.setItem("membres", JSON.stringify(membres));
  form.reset();
  afficherMembres();
});

/* ===== AFFICHAGE ===== */
function afficherMembres() {
  table.innerHTML = "";
  membres.forEach(m => {
    table.innerHTML += `
      <tr>
        <td>${m.nom}</td>
        <td>${m.email}</td>
        <td>${m.telephone}</td>
        <td>
          <button onclick="editMembre(${m.id})">✏️</button>
          <button onclick="deleteMembre(${m.id})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

/* ===== MODIFIER ===== */
function editMembre(id) {
  const m = membres.find(m => m.id == id);
  document.getElementById("id").value = m.id;
  document.getElementById("nom").value = m.nom;
  document.getElementById("email").value = m.email;
  document.getElementById("telephone").value = m.telephone;
}

/* ===== SUPPRIMER ===== */
function deleteMembre(id) {
  membres = membres.filter(m => m.id != id);
  localStorage.setItem("membres", JSON.stringify(membres));
  afficherMembres();
}
