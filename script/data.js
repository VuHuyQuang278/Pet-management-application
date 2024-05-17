"use strict";

// Lấy các element
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// Lấy thông tin thú cưng trong LocalStorage
const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");

// Export dữ liệu ra file JSON
exportBtn.addEventListener("click", function () {
  // Xác nhận việc Export
  const isExport = confirm("Bạn muốn Export dữ liệu ra file?");
  if (isExport) {
    // Tạo biến file có dạng 1 đối tượng Blod và lưu dưới dạng JSON
    let file = new Blob([JSON.stringify(petArr, null, 2)], {
      type: "application/json",
    });
    saveAs(file, "petArr.json");
  }
});

// Import dữ liệu
function importFile() {
  // Thông báo khi không có file được chọn
  if (!fileInput.value.length) {
    alert("Vui lòng chọn file để Import Data");
    return;
  }

  // Tạo đối tượng dạng FileReader
  let reader = new FileReader();

  // Đọc nội dung file
  reader.readAsText(fileInput.files[0]);
  // Chạy hàm xử lý file khi load trang
  reader.onload = function handleFile(e) {
    let contentJson = e.target.result;
    if (contentJson.trim().length === 0) return;

    // Chuyển đổi thành Object trong JavaScript
    let contentToObject = JSON.parse(contentJson);
    console.log("contentToObject", contentToObject);
    contentToObject.forEach((el, i) => {
      if (validateData(el)) {
        let index = petArr.findIndex((pet) => pet.id === el.id);
        // Thêm dữ liệu vào mảng petArr
        if (index < 0) petArr.push(el);
        // Nếu trùng ID thì ghi đè dữ liệu
        else petArr[index] = el;

        // Lọc dữ liệu của breedArr
        let breedName = breedArr
          .filter((breed) => breed.type === el.type)
          .findIndex((breed) => breed.breed === el.breed);
        // Nếu có breed khác thì thêm breed vào breedArr
        if (breedName < 0) {
          breedArr.push({
            breed: el.breed,
            type: el.type,
          });
        }
      }
    });
    console.log("petArr", petArr);
    console.log("breedArr", breedArr);

    // Lưu dữ liệu vào LocalStorage
    saveToStorage("petArr", petArr);
    saveToStorage("breedArr", breedArr);
  };

  // Thông báo import file thành công
  alert("Import file thành công !");

  // Xoá dữ liệu trên form
  fileInput.value = "";
}

// Kiểm tra dữ liệu
function validateData(data) {
  let errorData =
    data.id.trim() === "" ||
    data.petName.trim() === "" ||
    data.age < 1 ||
    data.age > 15 ||
    isNaN(data.age) ||
    data.weight < 1 ||
    data.weight > 15 ||
    isNaN(data.weight);
  data.petLenght < 1 ||
    data.petLenght > 100 ||
    isNaN(data.petLenght) ||
    data.color.trim() === "" ||
    data.breed === "Select Breed" ||
    data.breed.trim() === "" ||
    data.date.trim() === "";

  return !errorData;
}

importBtn.addEventListener("click", importFile);
