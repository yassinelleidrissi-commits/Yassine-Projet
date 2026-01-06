// Sécurité
fetch("coachs.json")
  .then(response => response.json())
  .then(data => {
    coachs = data;
    afficherCoachs();
  })
  .catch(err => console.error("Erreur lors du chargement du JSON:", err));
if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "index.html";
}

let coachs = JSON.parse(localStorage.getItem("coachs")) || [];

const form = document.getElementById("coachForm");
const table = document.getElementById("coachTable");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const nom = document.getElementById("nom").value;
  const specialite = document.getElementById("specialite").value;
  const telephone = document.getElementById("telephone").value;

  if (id) {
    const index = coachs.findIndex(c => c.id == id);
    coachs[index] = { id, nom, specialite, telephone };
  } else {
    coachs.push({
      id: Date.now(),
      nom,
      specialite,
      telephone
    });
  }

  localStorage.setItem("coachs", JSON.stringify(coachs));
  form.reset();
  afficherCoachs();
});

function afficherCoachs() {
  table.innerHTML = "";
  coachs.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.nom}</td>
        <td>${c.specialite}</td>
        <td>${c.telephone}</td>
        <td>
          <button onclick="editCoach(${c.id})">✏️</button>
          <button onclick="deleteCoach(${c.id})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function editCoach(id) {
  const c = coachs.find(c => c.id == id);
  document.getElementById("id").value = c.id;
  document.getElementById("nom").value = c.nom;
  document.getElementById("specialite").value = c.specialite;
  document.getElementById("telephone").value = c.telephone;
}

function deleteCoach(id) {
  coachs = coachs.filter(c => c.id != id);
  localStorage.setItem("coachs", JSON.stringify(coachs));
  afficherCoachs();
}

afficherCoachs();
