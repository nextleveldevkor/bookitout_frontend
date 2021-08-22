const inputFormAtSearch = document.querySelector(".add-at-search");

function addBookAtSearch(e) {
  const bookTitle = document.querySelector(".title").value;
  const bookAuthor = document.querySelector(".author").value;
  const bookEdition = document.querySelector(".edition").value;
  const bookCondition = document.querySelector(".condition").value;
  const bookPrice = document.querySelector(".price").value;
  const bookContact = document.querySelector(".contact").value;
  const url = "http://127.0.0.1:8000/products/";
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
      console.log(data);
      document.getElementById("mw_temp").style.display = "none";
      alert("등록되었습니다.");
    });
}

inputFormAtSearch.addEventListener("submit", addBookAtSearch);
