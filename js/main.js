function openForm() {
  document.getElementById("formContainer").style.display = "block";

  let form = document.getElementById("myForm")

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let client = document.getElementById("client");
    let commande = document.getElementById("commande");
    let montant = document.getElementById("montant");

    console.log(client.value)
    console.log(commande.value)
    console.log(montant.value)

    // runPython(client.value, commande.value, montant.value)
  });

}

function closeForm() {
  document.getElementById("formContainer").style.display = "none";
}

function runPython(client, commande, montant) {
  console.log(client)
  console.log(commande)
  console.log(montant)

  const execSync = require('child_process').execSync;

  const output = execSync('python3 ../python/main.py ${client} ${commande} ${montant}', { encoding: 'utf-8' });
  console.log('Output was:\n', output);
}
