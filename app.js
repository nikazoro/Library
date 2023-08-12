class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    publish_date = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.publish_date = publish_date;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
      console.log(this.books);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

// Library instance
const library = new Library();

// selecting of elements
const modal_show = document.querySelector(".add-book button");
const submit_form = document.querySelector("form button[type='submit']");
const library_panel = document.querySelector(".library-panel");

// Add Book Modal Button
modal_show.addEventListener("click", () => {
  document.querySelector(".modal").classList.add("active");
  document.querySelector(".overlay").classList.add("active");
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
});

// Submit Form or Add Book
submit_form.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const publish_date = document.querySelector("#published-date").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;

  const newBook = new Book(title, author, publish_date, pages, isRead);
  library.addBook(newBook);

  document.querySelector(".modal").classList.remove("active");
  document.querySelector("form").reset();
  errorMsg.classList.remove('active')
  errorMsg.textContent = ''
  render();
});

// Render Function
function render() {
  library_panel.innerHTML = "";

  library.books.forEach((book) => {
    library_panel.innerHTML += `
        <article class="book">
            <div class="book-info">
              <p class="book-title">${book.title}</p>
              <p class="book-author">By ${book.author}</p>
              <p class="book-published-date">${book.publish_date}</p>
              <p class="book-pages">${book.pages} pages</p>
            </div>
            <div class="btn-group">
              <button class="isRead btn btn-light-red">${
                book.isRead ? "Completed" : "In Progress"
              }</button>
              <button class="remove btn">Remove</button>
            </div>
          </article>
        `;
  });
}

// Book buttons event listener
const book_buttons = document
  .querySelector(".library-panel")
  .addEventListener("click", (e) => {
    const currentTarget =
      e.target.parentNode.parentNode.childNodes[1].childNodes[1];
    if (e.target.innerHTML == "Remove") {
      if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        library.removeBook(currentTarget.innerText);
    }
    if (e.target.innerHTML == "In Progress") {
      library.getBook(currentTarget.innerText).isRead = true;
    }
    if (e.target.innerHTML == "Completed") {
      library.getBook(currentTarget.innerText).isRead = false;
    }
    render();
  });


// Default Books
library.addBook(
  new Book(
    (title = "Mahabharat"),
    (author = "Ved Vyaas"),
    (publish_date = "00/00/0000"),
    (pages = "15433"),
    (isRead = false)
  )
);
library.addBook(
  new Book(
    (title = "Ramayan"),
    (author = "Valmiki"),
    (publish_date = "00/00/0000"),
    (pages = "1700"),
    (isRead = false)
  )
);
window.onload = render();

//Setting Date value to current date
const today = new Date();
document.getElementById("published-date").value = today.toISOString().substring(0, 10);


// const themeToggle = document.getElementById('theme-toggle');
// const body = document.body;

// themeToggle.addEventListener('change', () => {
//     if (themeToggle.checked) {
//         body.classList.add('dark-theme');
//     } else {
//         body.classList.remove('dark-theme');
//     }
// });
