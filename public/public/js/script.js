document.addEventListener("DOMContentLoaded", function () {
  // modal init
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);

  // form submission
  document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Get form data when submitted
    var formData = new FormData(this);
    var formObject = {};
    formData.forEach(function (value, key) {
      formObject[key] = value;
    });

    var cardContainer = document.getElementById("cards-container");
    var card = document.createElement("div");
    card.classList.add("col", "s12", "m6", "l4");
    card.innerHTML = `
   
    <div class="small card">
    <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src=${formObject.image_id} height="180px">
    </div>
        <div class="card-content">
        <span class="card-title  text-darken-4 activator grey-text">${formObject.name}</span>
       
        </div>
        <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${formObject.name}<i class="material-icons right">close</i></span>
        <p>Hello!! </p>
        <p>Thankyou for clicking me!!</p>
        <p>Have a good day!!</p>
        </div>
    </div>
 
    `;
    cardContainer.appendChild(card);
    console.log( {
      name:formObject.name,
      image_url:formObject.image_id,
      email:formObject.email
    });
    fetch("/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        name: formObject.name,
        image_url: formObject.image_id,
        email: formObject.email
      })
    })
    
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      
      })
      .catch((error) => console.error("Error:", error));

    
    var modalInstance = M.Modal.getInstance(document.getElementById("modal"));
    modalInstance.close();

    this.reset();
  });
});



function LoopTest() {
  console.log("=");
  fetch("/get-cards", {
    method: "GET",
  })
    .then(response => {
      console.log(response.ok);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
     
      return response.json();
    })
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

