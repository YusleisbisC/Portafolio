let formulario = document.getElementById("form");
let nameInput = document.getElementById("name");
let sobrenombreInput = document.getElementById("Sobrenombre"); // Corregido el ID del elemento
let emailInput = document.getElementById("email");
let submitBtn = document.getElementById("submit-btn");
let repositorios = document.getElementById("repositories");


nameInput.addEventListener("input", () => {
  let name = nameInput.value.trim();
  let nameError = document.getElementById("name-error");

  if (name === "") {
    nameError.textContent = "Digite seu nome";
    submitBtn.disabled = true;
  } else {
    nameError.textContent = "";
    submitBtn.disabled = false;
  }
});

sobrenombreInput.addEventListener("input", () => {
  let sobrenombre = sobrenombreInput.value.trim();
  let sobrenombreError = document.getElementById("Sobrenombre-error"); 

  if (sobrenombre === "") {
    sobrenombreError.textContent = "Digite seu sobrenombre";
    submitBtn.disabled = true;
  } else {
    sobrenombreError.textContent = "";
    submitBtn.disabled = false;
  }
});

emailInput.addEventListener("input", () => {
  let email = emailInput.value.trim();

  if (email === "") {
    emailInput.setCustomValidity("Por favor, ingrese su correo electrónico");
  } else if (!isValidEmail(email)) {
    emailInput.setCustomValidity("Ingrese un correo electrónico válido");
  } else {
    emailInput.setCustomValidity("");
  }
});

function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

formulario.addEventListener("submit", function (event) { 
  event.preventDefault();
});

let getApiGitHub = () => {
  fetch('https://api.github.com/users/YusleisbisC/repos')
    .then(response => response.json())
    .then(data => {
      data.forEach(repo => {
        let project = document.createElement("div");
        project.classList.add("repos");

        project.innerHTML = `
          <div>
            <h4 class="repos-title">${repo.name}</h4>
            <a target="_blank" href="${repo.html_url}" class="url">${repo.html_url}</a>
          </div>

          <div class="data-punto">
            <span class="data">${Intl.DateTimeFormat("pt-BR").format(new Date(repo.created_at))}</span>
            <div class="punto">
              <div class="circulo"></div>
              <span class="lenguaje">${repo.language}</span>
            </div>
          </div>
        `;

        repositorios.appendChild(project);
      });
    })
    .catch(error => console.log('Error de solicitud', error));
}

getApiGitHub();
