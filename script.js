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
