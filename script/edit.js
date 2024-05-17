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
const formEl = document.getElementById("container-form");

// lấy thông tin thú cưng trong LocalStorage và hiển thị
const petArr = getFromStorage("petArr");
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
          <button type="button" class="btn btn-warning" onclick ="startEditPet('${
            petArr[i].id
          }')">
            Edit
          </button>
        </td>`;
    // Thêm hàng vào bảng
    tableBodyEl.appendChild(row);
  }
}

// Hiển thị danh sách Breed
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

// Kiểm tra dữ liệu
const validateData = function (data) {
  if (data.petName === "" || !data.age || !data.weight || !data.petLenght) {
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

// Tính chỉ số BMI
const calBMI = function (petArr) {
  petArr.bmi =
    petArr.type === "Dog"
      ? ((petArr.weight * 703) / petArr.petLenght ** 2).toFixed(2)
      : ((petArr.weight * 886) / petArr.petLenght ** 2).toFixed(2);
};

// Hàm chỉnh sửa thông tin thú cưng
const startEditPet = function (petId) {
  // Hiển thị form chỉnh sửa thú cưng
  formEl.classList.remove("hide");
  let editPet;
  // Tìm vị trí của thú cưng trong mảng
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === petId) {
      editPet = petArr[i];
      break;
    }
  }

  // Chỉnh sửa thông tin thú cưng
  idInput.value = petId;
  nameInput.value = editPet.petName;
  ageInput.value = editPet.age;
  typeInput.value = editPet.type;
  weightInput.value = editPet.weight;
  lengthInput.value = editPet.petLenght;
  colorInput.value = editPet.color;
  renderBreed();
  breedInput.value = editPet.breed;
  breedInput.value = `${editPet.breed}`;
  vaccinatedInput.checked = editPet.vaccinated;
  dewormedInput.checked = editPet.dewormed;
  sterilizedInput.checked = editPet.sterilized;
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

  // Thêm thú cưng vào mảng petArr
  const validate = validateData(data);
  if (validate) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === data.id) {
        petArr[i] = data;
        calBMI(petArr[i]);
        break;
      }
    }

    // Lưu dữ liệu vào LocalStorage và ẩn form chỉnh sửa thú cưng
    saveToStorage("petArr", petArr);
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});
