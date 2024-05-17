"use strict";

// Lấy các element
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const findBtn = document.getElementById("find-btn");

// Lấy thông tin thú cưng trong LocalStorage và hiển thị
const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");
renderTableData(petArr);

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
          <td>${petArr[i].date}</td>`;
    // Thêm hàng vào bảng
    tableBodyEl.appendChild(row);
  }
}

// Hiển thị tất cả các breed
function renderAllBreed() {
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${breedArr[i].breed}`;
    breedInput.appendChild(option);
  }
}
renderAllBreed();

// Hiển thị danh sách Breed theo loại thú cưng
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

// Tìm kiếm thú cưng bằng cách lọc dữ liệu qua từng tiêu chí
findBtn.addEventListener("click", function () {
  let findPetArr = petArr;
  findPetArr = idInput.value
    ? findPetArr.filter((pet) => pet.id.includes(idInput.value))
    : findPetArr;
  findPetArr = nameInput.value
    ? findPetArr.filter((pet) => pet.petName.includes(nameInput.value))
    : findPetArr;
  findPetArr =
    typeInput.value !== "Select Type"
      ? findPetArr.filter((pet) => pet.type === typeInput.value)
      : findPetArr;
  findPetArr =
    breedInput.value !== "Select Breed"
      ? findPetArr.filter((pet) => pet.breed === breedInput.value)
      : findPetArr;
  findPetArr = vaccinatedInput.checked
    ? findPetArr.filter((pet) => pet.vaccinated === true)
    : findPetArr;
  // : findPetArr.filter((pet) => pet.vaccinated === false);
  findPetArr = dewormedInput.checked
    ? findPetArr.filter((pet) => pet.dewormed === true)
    : findPetArr;
  // : findPetArr.filter((pet) => pet.dewormed === false);
  findPetArr = sterilizedInput.checked
    ? findPetArr.filter((pet) => pet.sterilized === true)
    : findPetArr;
  // : findPetArr.filter((pet) => pet.sterilized === false);
  renderTableData(findPetArr);
});
