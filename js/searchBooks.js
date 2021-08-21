const searchForm = document.querySelector(".col-lg-7");
const searchInput = document.querySelector("input");
const parentDiv = document.querySelector(".item-container");
const pageTitle = document.querySelector(".page-title");
const loading = document.querySelector("#loading");
const HIDDEN_CLASSNAME = "hidden";

function createSearchBooks(data) {
  const container = document.createElement("div");
  container.setAttribute("class", "col-3");

  const hyperlink = document.createElement("a");
  hyperlink.setAttribute("href", "book-detail.html");

  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("class", "col-4__image");

  const img = document.createElement("img");
  img.setAttribute("src", "images/Book 4.jpg");
  img.setAttribute("alt", "Book 4");

  imageDiv.appendChild(img);

  const textDiv = document.createElement("div");
  textDiv.setAttribute("class", "col-4__text");

  const bookTitle = document.createElement("h4");
  bookTitle.innerHTML = data.title;
  const libraryCount = document.createElement("p");
  libraryCount.innerHTML = `고려대학교 도서관 소장 자료 ${data.available} 권`;

  textDiv.appendChild(bookTitle);
  textDiv.appendChild(libraryCount);

  hyperlink.appendChild(imageDiv);
  hyperlink.appendChild(textDiv);

  container.appendChild(hyperlink);
  parentDiv.appendChild(container);
}

function deleteChildren() {
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
}

const url = `http://localhost:8000/libraries/`;

function getBooks(title) {
  deleteChildren();
  pageTitle.innerHTML = "";
  loading.classList.remove(HIDDEN_CLASSNAME);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search_title: title,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          createSearchBooks(item);
        });
      }
      loading.classList.add(HIDDEN_CLASSNAME);
      pageTitle.innerHTML = `도서명 ${title} 로 검색한 결과`;
    });
}

async function submitForm(e) {
  e.preventDefault();
  getBooks(searchInput.value);
}

searchForm.addEventListener("submit", submitForm);
