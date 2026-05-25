const dates = [];
const params = new URLSearchParams(window.location.search);
const pollId = params.get("id");

const GITHUB_JSON = "https://raw.githubusercontent.com/dgidgi85/sondage/main/data/sondages.json";

window.onload = () => {

  if (pollId) {
    afficherVote();
  }

};

function ajouterDate() {

  const input = document.getElementById("dateInput");

  if (!input.value) return;

  const d = new Date(input.value);

  const dateTexte = d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  if (!dates.includes(dateTexte)) {
    dates.push(dateTexte);
  }

  afficherDates();

  input.value = "";
}

function afficherDates() {

  const zone = document.getElementById("datesList");

  zone.innerHTML = "";

  dates.forEach((date, index) => {

    zone.innerHTML += `
      <div class="dateItem">
        <span>${date}</span>
        <span onclick="supprimerDate(${index})">❌</span>
      </div>
    `;

  });
}

function supprimerDate(index) {

  dates.splice(index, 1);

  afficherDates();
}

function creerSondage() {

  const titre = document.getElementById("titre").value;

  if (!titre || dates.length === 0) {
    alert("Ajoute un titre et des dates");
    return;
  }

  const id = Math.random().toString(36).substring(2, 10);

  const lien = `https://dgidgi85.github.io/sondage/?id=${id}&titre=${encodeURIComponent(titre)}&dates=${encodeURIComponent(JSON.stringify(dates))}`;

  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("lienSondage").value = lien;
}
}
