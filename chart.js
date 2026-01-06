let ctxMembres = document.getElementById('chartMembres').getContext('2d');
let membres = [];

let mois = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];

// chart linéaire des membres
fetch('recette_monthly.json')
    .then(response => response.json())
    .then(data => {
        membres = data["2025"].map(item => item.totale);

        let datas = {
            labels: mois,
            datasets: [{
                label: 'Membres',
                data: membres,
                backgroundColor: '#1e90ffa4',
                borderColor: '#1e90ffff',
                borderWidth: 1
            }]
        };

        let membresChart = new Chart(ctxMembres, {
            type: 'line',
            data: datas,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Évolution des Membres'
                    }
                }
            }
        });
    })
    .catch(error => console.log('Erreur JSON : chart ' + error));
