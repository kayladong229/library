function Book(title, author, year, pages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = read;
}

const library = [];
const bookInfo = document.querySelector(".book-info");
const newBookBtn = document.querySelector(".show-modal");
const bookDialog = document.querySelector(".book-dialog");
const bookForm = document.getElementById("book-form");
const newTitle = document.getElementById("title");
const newAuthor = document.getElementById("author");
const newYear = document.getElementById("year");
const newPages = document.getElementById("pages");
const newRead = document.getElementById("read");

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

function addBook() {
  const newBook = new Book(
    newTitle.value,
    newAuthor.value,
    newYear.value,
    newPages.value,
    newRead.checked
  );
  console.log(newBook);
  library.push(newBook);
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  bookDialog.close();
  addBook();
  bookInfo.textContent = "";
  displayBooks();
  newTitle.value = "";
  newAuthor.value = "";
  newYear.value = "";
  newPages.value = "";
  newRead.checked = false;
});

function displayBooks() {
  for (let i = 0; i < library.length; i++) {
    const bookRow = document.createElement("tr");
    bookInfo.appendChild(bookRow);

    const bookTitle = document.createElement("td");
    bookTitle.setAttribute("class", "book-title");
    bookTitle.textContent = library[i].title;

    const bookAuthor = document.createElement("td");
    bookAuthor.setAttribute("class", "book-author");
    bookAuthor.textContent = library[i].author;

    const bookYear = document.createElement("td");
    bookYear.setAttribute("class", "book-year");
    bookYear.textContent = library[i].year;

    const bookPages = document.createElement("td");
    bookPages.setAttribute("class", "book-pages");
    bookPages.textContent = library[i].pages;

    const bookStatus = document.createElement("td");
    bookStatus.setAttribute("class", "book-status");

    const readButtonCell = document.createElement("td");
    const readButton = document.createElement("button");
    readButton.setAttribute("class", "read-button");
    readButtonCell.appendChild(readButton);

    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.textContent = "Delete";
    deleteButtonCell.appendChild(deleteButton);

    bookRow.appendChild(bookTitle);
    bookRow.appendChild(bookAuthor);
    bookRow.appendChild(bookYear);
    bookRow.appendChild(bookPages);
    bookRow.appendChild(bookStatus);
    bookRow.appendChild(readButtonCell);
    bookRow.appendChild(deleteButtonCell);

    if (library[i].read) {
      bookRow.setAttribute("class", "read");
      bookStatus.textContent = "Read";
      readButton.textContent = "Mark as unread";
    } else {
      bookStatus.textContent = "Unread";
      readButton.textContent = "Mark as read";
    }

    readButton.addEventListener("click", () => {
      bookRow.classList.toggle("read");
      if (
        bookStatus.textContent === "Read" &&
        readButton.textContent === "Mark as unread"
      ) {
        bookStatus.textContent = "Unread";
        readButton.textContent = "Mark as read";
      } else {
        bookStatus.textContent = "Read";
        readButton.textContent = "Mark as unread";
      }
    });

    deleteButton.addEventListener("click", () => {
      library.splice(i, 1);
      bookInfo.textContent = "";
      displayBooks();
    });
  }
}
