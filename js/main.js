function openForm() {
  document.getElementById("formContainer").style.display = "block";

  let form = document.getElementById("myForm")

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let client = document.getElementById("client");
    let commande = document.getElementById("commande");
    let montant = document.getElementById("montant");

    runPython(client.value, commande.value, montant.value)
  });

}

function closeForm() {
  document.getElementById("formContainer").style.display = "none";
}

function runPython(client, commande, montant) {
  console.log(client)
  console.log(commande)
  console.log(montant)
  $.ajax({
    type:'POST',
    url:'../python/main.py',
    data: {param: client}, //, commande: commande, montant: montant},
    success: callbackFunc
  })
}

function callbackFunc(response) {
  // do something with the response
  console.log(response);
}

