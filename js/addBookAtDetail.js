const inputForm = document.querySelector(".add-at-detail");

function addBook(e) {
  e.preventDefault();
  const bookTitle = localStorage.getItem("title");
  const bookAuthor = localStorage.getItem("author");
  const bookEdition = document.querySelector(".edition").value;
  const bookCondition = document.querySelector(".condition").value;
  const bookPrice = document.querySelector(".price").value;
  const bookContact = document.querySelector(".contact").value;
  const url = "http://localhost:8000/products/";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: bookTitle,
      author: bookAuthor,
      edition: bookEdition,
      condition: bookCondition,
      price: bookPrice,
      contact: bookContact,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("mw_temp").style.display = "none";
      alert("등록되었습니다.");
    });
}

inputForm.addEventListener("submit", addBook);
