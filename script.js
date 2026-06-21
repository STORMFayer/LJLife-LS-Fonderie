const API_URL = "https://script.google.com/macros/s/AKfycbx4lxEF0gkRYclo5FXrRDJAB-k46EeJI1Y_NNjw3-rzwRSAFvpYAGFK8JGJyNajEhsS/exec";

console.log("script chargé OK");

// 🔵 AJOUT EMPLOYÉ
function sendData() {
  const data = {
    nom: document.getElementById("nom").value,
    prenom: document.getElementById("prenom").value,
    discord: document.getElementById("discord").value,
    minerais: document.getElementById("minerais").value
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    document.getElementById("msg").innerText = "Ajouté avec succès !";
  })
  .catch(err => {
    console.log("Erreur POST:", err);
  });
}

// 🔵 LOGIN ADMIN
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

// 🔵 CHARGER ADMIN
function loadAdmin() {
  if (!document.getElementById("table")) return;

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
        let salaire = Number(e.minerais) * 60;
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
    })
    .catch(err => console.log(err));
}