const API_URL = "https://script.google.com/macros/s/AKfycbx4lxEF0gkRYclo5FXrRDJAB-k46EeJI1Y_NNjw3-rzwRSAFvpYAGFK8JGJyNajEhsS/exec";

function sendData() {
  const data = {
    nom: document.getElementById("nom").value,
    prenom: document.getElementById("prenom").value,
    discord: document.getElementById("discord").value,
    minerais: document.getElementById("minerais").value
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(() => {
    document.getElementById("msg").innerText = "Ajouté avec succès !";
  });
}
function login() {
  const pass = document.getElementById("pass").value;

  if (pass === "Zeubi") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadAdmin();
  } else {
    alert("Mot de passe incorrect");
  }
}
function loadEmploye() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {

      const nom = localStorage.getItem("nom");
      const prenom = localStorage.getItem("prenom");
      const discord = localStorage.getItem("discord");

      let total = 0;

      data.forEach(e => {
        if (e.nom === nom && e.prenom === prenom && e.discord === discord) {
          total += Number(e.minerais);
        }
      });

      document.getElementById("total").innerText =
        "Total minerais : " + total;
    });
}
function classement(data) {
  let stats = {};

  data.forEach(e => {
    let key = e.nom + " " + e.prenom;

    if (!stats[key]) stats[key] = 0;

    stats[key] += Number(e.minerais);
  });

  let sorted = Object.entries(stats)
    .sort((a, b) => b[1] - a[1]);

  let html = "<h3>Classement Mineurs</h3>";

  sorted.forEach((e, i) => {
    html += `
      <p>#${i+1} ${e[0]} - ${e[1]} minerais</p>
    `;
  });

  document.getElementById("ranking").innerHTML = html;
}
// ADMIN LOAD
if (window.location.pathname.includes("admin")) {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      let table = document.getElementById("table");
      let total = 0;

      table.innerHTML = `
        <tr>
          <th>Nom</th>
          <th>Discord</th>
          <th>Minerais</th>
          <th>Salaire</th>
        </tr>
      `;

      data.forEach(e => {
        let salaire = e.minerais * 60;
        total += salaire;

        table.innerHTML += `
          <tr>
            <td>${e.nom} ${e.prenom}</td>
            <td>${e.discord}</td>
            <td>${e.minerais}</td>
            <td>${salaire}$</td>
          </tr>
        `;
      });

      document.getElementById("total").innerText =
        "Total à payer : " + total + " $";
    });
}
