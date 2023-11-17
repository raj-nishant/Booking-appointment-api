// Get references to the HTML elements
const form = document.getElementById("my-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const contentDiv = document.querySelector(".content");

// Function to handle edit button click
function handleEditClick(name, email) {
  nameInput.value = name;
  emailInput.value = email;
  //   removeFromLocalStorage(name, email);
  // displayData(); // Refresh the displayed data
}

// Function to display data on the page
function displayUserData(name, email) {
  const userDiv = document.createElement("div");
  userDiv.innerHTML = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`;

  // Create a delete button for each user
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    userDiv.remove(); // Remove from the webpage
    // removeFromLocalStorage(name, email); // Remove from localStorage
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    userDiv.remove(); // Remove from the webpage
    handleEditClick(name, email);
  });

  userDiv.appendChild(deleteButton);
  userDiv.appendChild(editButton);
  contentDiv.appendChild(userDiv);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/8785b3b49c524e41b0b09d269f239802/book")
    .then((res) => {
      const userDataArray = res.data; // Assuming the data is an array of objects

      userDataArray.forEach((userData) => {
        displayUserData(userData.name, userData.email);
      });
    })
    .catch((error) => {
      document.getElementById("content").innerText = error.message;
    });
});

function postRequest(name, email) {
  axios
    .post("https://crudcrud.com/api/8785b3b49c524e41b0b09d269f239802/book", {
      name,
      email,
    })
    .then((res) => {
      displayUserData(res.data.name, res.data.email);
    })
    .catch((error) => {
      document.getElementById("content").innerText(error);
    });
}

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;

  if (name && email) {
    // displayUserData(name, email);
    postRequest(name, email);
    nameInput.value = "";
    emailInput.value = "";
  } else {
    alert("Please fill out both name and email fields.");
  }
});

// Function to load data from localStorage on page load
function loadUsersFromLocalStorage() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => displayUserData(user.name, user.email));
}
