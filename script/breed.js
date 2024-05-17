"use strict";

// Lấy các element
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Hiển thị bảng dữ liệu
const renderBreedTable = function (breedArr) {
  // Xoá nội dụng hiện có trong bảng
  tableBodyEl.innerHTML = "";
  // Tạo từng hàng trong bảng tương ứng với từng breed
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th>${i + 1}</th>
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>
    <td>
        <button type="button" class="btn btn-danger" onclick ="deleteBreed('${
          breedArr[i].breed
        }')">
        Delete
      </button>
    </td>`;
    // Thêm hàng vào bảng
    tableBodyEl.appendChild(row);
  }
};

// Lấy dữ liệu Breed từ LocalStorage và hiển thị
const breedArr = getFromStorage("breedArr") ?? [];
renderBreedTable(breedArr);

// Sự kiện click của nút Submit
submitBtn.addEventListener("click", function () {
  // lấy thông tin breed từ form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  // Kiểm tra dữ liệu
  const validateData = function (data) {
    if (data.breed === "") {
      alert("Please enter a breed");
      return false;
    } else if (data.type === "") {
      alert("Please select a type");
      return false;
    } else return true;
  };

  // Thêm dữ liệu vào mảng breedArr và lưu vào LocalStorage
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    clearInput();
    renderBreedTable(breedArr);
  }
});

// Xoá dữ liệu nhập trên form
const clearInput = function () {
  breedInput.value = "";
  typeInput.value = "Select Type";
};

// Xoá dữ liệu breed
const deleteBreed = function (breed) {
  if (confirm("Are you sure?")) {
    // Tìm vị trí của breed trong mảng
    for (let i = 0; i < breedArr.length; i++) {
      if (breedArr[i].breed === breed) {
        // Xoá breed khỏi mảng
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderBreedTable(breedArr);
      }
    }
  }
};
