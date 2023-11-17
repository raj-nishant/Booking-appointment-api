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
function displayUserData(user) {
  const { name, email, _id } = user; // Destructure the user object
  const userDiv = document.createElement("div");
  userDiv.innerHTML = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`;

  // Create a delete button for each user
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteUser(_id, userDiv); // Pass the user ID to the deleteUser function
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

// Function to delete a user
function deleteUser(userId, userDiv) {
  axios
    .delete(
      `https://crudcrud.com/api/8785b3b49c524e41b0b09d269f239802/book/${userId}`
    )
    .then(() => {
      userDiv.remove(); // Remove from the webpage
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/8785b3b49c524e41b0b09d269f239802/book")
    .then((res) => {
      const userDataArray = res.data; // Assuming the data is an array of objects

      userDataArray.forEach((userData) => {
        displayUserData(userData);
      });
    })
    .catch((error) => {
      document.getElementById("content").innerText = error.message;
    });
});

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;

  if (name && email) {
    postRequest(name, email);
    nameInput.value = "";
    emailInput.value = "";
  } else {
    alert("Please fill out both name and email fields.");
  }
});

// Function to add data to CRUD API
function postRequest(name, email) {
  axios
    .post("https://crudcrud.com/api/8785b3b49c524e41b0b09d269f239802/book", {
      name,
      email,
    })
    .then((res) => {
      displayUserData(res.data);
    })
    .catch((error) => {
      console.error("Error posting user data:", error);
    });
}
