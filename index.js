const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");

console.log(username);
// error function
function inputError(input, message) {
  error = input.parentElement.querySelector("#error");
  error.classList.remove("d-none");
  error.innerText = message;
}

// success function
function inputSuccess(input) {
  success = input.parentElement.querySelector("#error");
  success.classList.add("d-none");
}

// input field name funtion
function inputFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// input array funtion
function inputCheck(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value == "") {
      inputError(input, `${inputFieldName(input)} is reqired`);
    } else {
      inputSuccess(input);
    }
  });
}

// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    inputError(
      input,
      `${inputFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    inputError(
      input,
      `${inputFieldName(input)} must be less than ${max} characters`
    );
  } else {
    inputSuccess(input);
  }
}

// local storage
const tableList = JSON.parse(localStorage.getItem("tableContent")) || [];
if (tableList.length > 0) {
  let table = "";
  tableList.map((input, i) => {
    const regDate = new Date(input.regDate);
    table += `<tr>
                        <td>${i + 1}</td>
                        <td>${input.username}</td>
                        <td>${input.email}</td>
                        <td>Time: ${regDate.getHours()}:${regDate.getMinutes()}:${regDate.getSeconds()}   Date: ${regDate.getDate()} / ${regDate.getMonth()} / ${regDate.getFullYear()}</td>             
                    </tr>`;
  });
  document.querySelector("tbody").innerHTML = table;
}

// add to table
function addToTable() {
  inputCheck([username, email, password]);
  checkLength(username, 5, 15);
  checkLength(password, 3, 20);
  const input = {
    username: username.value,
    email: email.value,
    password: password.value,
    regDate: new Date(),
  };
  console.log(input);

  if (input.username != "" && input.email != "" && input.password != "") {
    tableList.push(input);
    document.querySelector("tbody").innerHTML += `<tr>
                        <td>${tableList.indexOf(input) + 1}</td>
                        <td>${input.username}</td>
                        <td>${input.email}</td>
                        <td>Time: ${input.regDate.getHours()}:${input.regDate.getMinutes()}:${input.regDate.getSeconds()}   Date: ${input.regDate.getDate()} / ${input.regDate.getMonth()} / ${input.regDate.getFullYear()}</td>             
                    </tr>`;
    username.value = "";
    email.value = "";
    password.value = "";

    localStorage.setItem("tableContent", JSON.stringify(tableList));
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToTable();
});
