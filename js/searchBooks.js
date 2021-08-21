const searchForm = document.querySelector(".col-lg-7");
const searchInput = document.querySelector("input");
const parentDiv = document.querySelector(".item-container");
const pageTitle = document.querySelector(".page-title");
const loading = document.querySelector(".loading-image");
const HIDDEN_CLASSNAME = "hidden";

function clickBook(e) {
  const parent = e.target.parentElement.parentElement;
  const link = parent.lastChild.lastChild.innerHTML;
  const title = parent.lastChild.firstChild.innerHTML;
  const author = parent.lastChild.childNodes[3].innerHTML;
  const imgLink = parent.firstChild.firstChild.getAttribute("src");
  localStorage.setItem("link", link);
  localStorage.setItem("title", title);
  localStorage.setItem("author", author);
  localStorage.setItem("imgLink", imgLink);
}

function createSearchBooks(data) {
  const container = document.createElement("div");
  container.setAttribute("class", "col-3");
  container.classList.add("hover-div");

  const hyperlink = document.createElement("a");
  hyperlink.setAttribute("href", "book-detail.html");

  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("class", "col-4__image");

  const img = document.createElement("img");
  if (data.img_link === "No Image")
    img.setAttribute("src", "images/Book-Image-Default.png");
  else img.setAttribute("src", data.img_link);
  img.setAttribute("alt", "book-image");
  img.setAttribute("class", "book-image");

  imageDiv.appendChild(img);

  const textDiv = document.createElement("div");
  textDiv.setAttribute("class", "col-4__text");

  const bookTitle = document.createElement("h4");
  bookTitle.innerHTML = data.title;
  const libraryCount = document.createElement("p");
  libraryCount.innerHTML = `고려대학교 도서관 소장 자료 <span class="search-library-num">${data.available}</span> 권`;
  const dbCount = document.createElement("p");
  dbCount.innerHTML = `북키라웃 등록 매물 <span class="search-db-num">${data.count}</span> 권`;
  const bookLink = document.createElement("p");
  bookLink.innerHTML = data.link;
  bookLink.setAttribute("class", "hidden");

  const author = document.createElement("p");
  author.innerHTML = data.author;
  author.setAttribute("class", "hidden");

  textDiv.appendChild(bookTitle);
  textDiv.appendChild(libraryCount);
  textDiv.appendChild(dbCount);
  textDiv.appendChild(author);
  textDiv.appendChild(bookLink);

  hyperlink.appendChild(imageDiv);
  hyperlink.appendChild(textDiv);

  container.appendChild(hyperlink);
  container.addEventListener("click", clickBook);
  parentDiv.appendChild(container);
}

function deleteChildren() {
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
}

function compareResults(arr1, arr2) {
  for (let i = 0; i < arr2.length; i++) {
    arr2[i].count = 0;
  }

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i].title === arr2[j].title && arr1[i].title === arr2[j].title) {
        arr2[j].count = arr1[i].count;
        break;
      }
    }
  }

  return arr2;
}

const url = `http://localhost:8000/libraries/`;
const url2 = `http://localhost:8000/products/search/?title__contains=`;

function getBooksDB(title, library) {
  const new_title = title.replace(/ /g, "%20");
  fetch(url2 + new_title)
    .then((response) => response.json())
    .then((data) => {
      const finalRes = compareResults(data, library);
      finalRes.forEach(function (item) {
        createSearchBooks(item);
      });
    });
}

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
        getBooksDB(title, data);
      }
      loading.classList.add(HIDDEN_CLASSNAME);
      pageTitle.innerHTML = `도서명 <span class="search-title">${title}</span> 로 검색한 결과`;
    });
}

async function submitForm(e) {
  e.preventDefault();
  getBooks(searchInput.value);
}

searchForm.addEventListener("submit", submitForm);
