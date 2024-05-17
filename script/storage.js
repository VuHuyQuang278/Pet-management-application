"use strict";

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Bổ sung animation cho Sidebar
const sidebarEl = document.getElementById("sidebar");
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});
