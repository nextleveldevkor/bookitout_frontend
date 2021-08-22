const title = document.querySelector(".detail-book-title");
const author = document.querySelector(".detail-book-author");
const img = document.querySelector(".detail-book-image");
const numDB = document.querySelector(".bookitout-detail-num");
const numLibary = document.querySelector(".library-detail-num");

title.innerHTML = localStorage.getItem("title");
author.innerHTML = localStorage.getItem("author");
img.setAttribute("src", localStorage.getItem("imgLink"));

function createSaleBook(item) {
  const parentDiv = document.querySelector(".bookitout-check");
  const container = document.createElement("div");
  container.setAttribute("class", "bookitout-row");

  const edition = document.createElement("h6");
  edition.innerHTML = `edition ${item.edition}`;
  const condition = document.createElement("h6");
  condition.innerHTML = `condition ${item.condition}/5`;
  const price = document.createElement("h6");
  price.innerHTML = `price ${item.price}`;
  const contact = document.createElement("h6");
  contact.innerHTML = `contact ${item.contact}`;

  container.appendChild(edition);
  container.appendChild(condition);
  container.appendChild(price);
  container.appendChild(contact);

  parentDiv.appendChild(container);
}

function createLibraryBook(item) {}

function getBookDetailDB() {
  const new_title = title.innerHTML.replace(/ /g, "%20");
  const new_author = author.innerHTML.replace(/ /g, "%20");
  const urlDB = `http://101.101.210.22:8000/products/search/details/?title=${new_title}&author=${new_author}`;

  fetch(urlDB)
    .then((response) => response.json())
    .then((data) => {
      if (data !== []) {
        numDB.innerHTML = `북키라웃 등록 매물 ${data.length}권`;
        data.forEach((item) => createSaleBook(item));
      }
    });
}

function getBookDetailLibary() {
  const urlLibrary = `http://127.0.0.1:8000/libraries/status/`;

  fetch(urlLibrary, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: localStorage.getItem("link"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      numDB.innerHTML = `고려대학교 도서관 소장 자료 ${data.length}권`;
      data.forEach((item) => createLibraryBook(item));
    });
}

getBookDetailDB();
