document.addEventListener("DOMContentLoaded", function()
{
    // Initializing page num
    let currentPage = 1;
    fetchAndShowAllBooks(currentPage);

    document.getElementById('prevPage').addEventListener('click', () => 
    {
        if (currentPage > 1) 
        {
            currentPage -= 1;
            fetchAndShowAllBooks(currentPage);
            document.getElementById('currentPage').textContent = currentPage;
            window.scrollTo(0, 0); // Scroll to the top of the page
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => 
    {
        currentPage += 1;
        fetchAndShowAllBooks(currentPage);
        document.getElementById('currentPage').textContent = currentPage;
        window.scrollTo(0, 0); // Scroll to the top of the page
    });
});

// Display 10 books each page
function fetchAndShowAllBooks(page = 1) 
{
    const limit = 10; // Number of books per page
    fetch(`/api/books?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(books => showCards(books))
        .catch(error => console.error('Error fetching all books:', error));
}

// Display the book information as a card
function showCards(books) 
{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // Clear previous results

    // Check if no books were found
    if (books.length === 0) 
    {
        const noBooksMessage = document.createElement('p');
        noBooksMessage.textContent = "No books found";
        noBooksMessage.className = "no-books-found"; // Define for css style
        cardContainer.appendChild(noBooksMessage); // Display the no books message
        return;
    }

    const template = document.getElementById("book-card-template").content;

    books.forEach(book => 
        {
        const nextCard = document.importNode(template, true); // Import the template
        editCardContent(nextCard, book); // Fill the card with book details
        cardContainer.appendChild(nextCard); // Add the card to the container
    });
}

// Updating card content
function editCardContent(card, book) 
{
    card.querySelector("h2").textContent = book.title;
    card.querySelector(".subtitle").textContent = book.subtitle;
    card.querySelector(".authors").textContent = book.authors;
    card.querySelector(".average-rating").textContent = `Rating: ${book.average_rating}`;
    const cardImage = card.querySelector("img");
    cardImage.src = book.thumbnail;
    cardImage.alt = `${book.title} Cover`;

    // Click image
    const bookLink = card.querySelector(".book-link");
    bookLink.href = `book-detail.html?bookID=${book.bookID}`;
}