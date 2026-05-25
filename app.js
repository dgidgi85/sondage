var datesSelectionnees = [];

var urlParams = new URLSearchParams(window.location.search);
var pollID = urlParams.get('id');

window.addEventListener('DOMContentLoaded', function() {

    if (pollID) {

        document.getElementById('view-create').classList.add('hidden');
        document.getElementById('view-vote').classList.remove('hidden');

        document.getElementById('poll-title').innerText =
            decodeURIComponent(urlParams.get('title'));

        var datesParam = urlParams.get('dates');

        var dates = JSON.parse(decodeURIComponent(datesParam));

        afficherChoixDates(dates);

        construireTableau(dates);
    }

});

function ajouterDate() {

    var input = document.getElementById('date-input');

    if (!input.value) {
        alert('Choisis une date');
        return;
    }

    var dateObj = new Date(input.value);

    var dateFormatee = dateObj.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    if (!datesSelectionnees.includes(dateFormatee)) {

        datesSelectionnees.push(dateFormatee);

        afficherDates();
    }

    input.value = '';
}

function afficherDates() {

    var zone = document.getElementById('dates-list');

    zone.innerHTML = '';

    datesSelectionnees.forEach(function(date, index) {

        zone.innerHTML += `
            <div class="date-item">
                <span>📅 ${date}</span>
                <span class="delete-date" onclick="supprimerDate(${index})">
                    ❌
                </span>
            </div>
        `;

    });
}

function supprimerDate(index) {

    datesSelectionnees.splice(index, 1);

    afficherDates();
}

function genererSondage() {

    var titre = document.getElementById('title').value.trim();
}
