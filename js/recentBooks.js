function createBooks(data) {
  const parentDiv = document.querySelector(".item-container");

  const container = document.createElement("div");
  container.setAttribute("class", "col-3");

  const hyperlink = document.createElement("a");
  hyperlink.setAttribute("href", "book-detail.html");

  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("class", "col-4__image");

  const img = document.createElement("img");
  img.setAttribute("src", "images/Book-Image-Default.png");
  img.setAttribute("alt", "book-image");
  img.setAttribute("class", "book-image");

  imageDiv.appendChild(img);

  const textDiv = document.createElement("div");
  textDiv.setAttribute("class", "col-4__text");

  const bookTitle = document.createElement("h4");
  bookTitle.innerHTML = data.title;
  const author = document.createElement("p");
  author.innerHTML = data.author;
  const edition = document.createElement("p");
  edition.innerHTML = `edition : ${data.edition}`;
  const condition = document.createElement("p");
  condition.innerHTML = `condition : ${data.condition}/5`;
  const price = document.createElement("p");
  price.innerHTML = data.price;
  const contact = document.createElement("p");
  contact.innerHTML = data.contact;

  textDiv.appendChild(bookTitle);
  textDiv.appendChild(author);
  textDiv.appendChild(edition);
  textDiv.appendChild(condition);
  textDiv.appendChild(price);
  textDiv.appendChild(contact);

  container.appendChild(imageDiv);
  container.appendChild(textDiv);

  parentDiv.appendChild(container);
}

function getData() {
  fetch("http://localhost:8000/products/")
    .then((response) => response.json())
    .then((data) =>
      data.results.forEach(function (item) {
        createBooks(item);
      })
    );
}

getData();
