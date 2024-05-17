"use strict";

// Lấy các element
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calBMIBtn = document.getElementById("calBMI-btn");

// Khởi tạo các biến
const petArr = getFromStorage("petArr") ?? [];
let healthyCheck = false;
let healthyPetArr = [];

//lấy thông tin thú cưng trong LocalStorage và hiển thị
const breedArr = getFromStorage("breedArr");
renderTableData(petArr);

// Lấy ngày tháng năm
let today = new Date();
// Định dạng ngày tháng về dạng dd/mm/yyyy
let dateTime = `${
  today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`
}/${
  today.getMonth() + 1 < 10
    ? `0${today.getMonth() + 1}`
    : `${today.getMonth() + 1}`
}/${today.getFullYear()}`;

// Xoá thú cưng
const deletePet = function (id) {
  if (confirm("Are you sure?")) {
    // Tìm vị trí của thú cưng trong mảng
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === id) {
        // Xoá thú cưng khỏi mảng
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
};

// Kiểm tra dữ liệu
const validateData = function (data) {
  // Kiểm tra ID không bị trùng
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      return false;
    }
  }
  // Kiểm tra các điều kiện khác
  if (
    data.id === "" ||
    data.petName === "" ||
    !data.age ||
    !data.weight ||
    !data.petLenght
  ) {
    alert("Please fill in pet information");
    return false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (data.petLenght < 1 || data.petLenght > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  } else return true;
};

// Hiển thị danh sách thú cưng
function renderTableData(petArr) {
  // Xoá nội dụng hiện có trong bảng
  tableBodyEl.innerHTML = "";
  // Tạo từng hàng trong bảng tương ứng với từng thú cưng
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${petArr[i].id}</th>
      <td>${petArr[i].petName}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight}</td>
      <td>${petArr[i].petLenght}</td>
      <td>${petArr[i].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
      </td>
      <td>
        <i class="bi ${
          petArr[i].vaccinated === true
            ? "bi-check-circle-fill"
            : "bi-x-circle-fill"
        }"></i>
      </td>
      <td>
        <i class="bi ${
          petArr[i].dewormed === true
            ? "bi-check-circle-fill"
            : "bi-x-circle-fill"
        }"></i>
      </td>
      <td>
        <i class="bi ${
          petArr[i].sterilized === true
            ? "bi-check-circle-fill"
            : "bi-x-circle-fill"
        }"></i>
      </td>
      <td>${petArr[i].bmi ?? "?"}</td> 
      <td>${petArr[i].date}</td>
      <td>
        <button type="button" class="btn btn-danger" onclick ="deletePet('${
          petArr[i].id
        }')">
          Delete
        </button>
      </td>`;
    // Thêm hàng vào bảng
    tableBodyEl.appendChild(row);
  }
}

// Xoá dữ liệu nhập trên form
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  lengthInput.value = "";
  weightInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

submitBtn.addEventListener("click", function () {
  // lấy thông tin thú cưng từ form
  const data = {
    id: idInput.value,
    petName: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseFloat(weightInput.value),
    petLenght: parseFloat(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: null,
    date: dateTime,
  };

  // Thêm thú cưng vào mảng petArr và lưu dữ liệu vào LocalStorage
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", petArr);
    clearInput();
    renderTableData(petArr);
  }
});

// Hiển thị thú cưng khoẻ mạnh
healthyBtn.addEventListener("click", function () {
  // Xoá nội dung hiện có trong bảng
  tableBodyEl.innerHTML = "";
  // Hiển thị danh sách thú cưng khoẻ mạnh
  if (!healthyCheck) {
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
    healthyPetArr = petArr.filter(function (pet) {
      return pet && pet.vaccinated && pet.dewormed && pet.sterilized;
    });
    renderTableData(healthyPetArr);
  }
  // Hiển thị toàn bộ thú cưng
  else {
    healthyCheck = false;
    healthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
});

// Tính chỉ số BMI
calBMIBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].petLenght ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].petLenght ** 2).toFixed(2);
  }
  saveToStorage("petArr", petArr);
  renderTableData(petArr);
});

// Hiển thị Breed trong màn hình quản lý thú cưng
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  // Trường hợp type là Dog
  if (typeInput.value === "Dog") {
    const dogBreed = breedArr.filter((breedName) => breedName.type === "Dog");
    for (let i = 0; i < dogBreed.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = `${dogBreed[i].breed}`;
      breedInput.appendChild(option);
    }
    // Trường hợp type là Cat
  } else if (typeInput.value === "Cat") {
    const catBreed = breedArr.filter((breedName) => breedName.type === "Cat");
    for (let i = 0; i < catBreed.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = `${catBreed[i].breed}`;
      breedInput.appendChild(option);
    }
  }
}
