document.addEventListener("DOMContentLoaded", function() 
{
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const type = params.get('type');

    // Update the search info text
    const searchInfo = document.getElementById('search-info');
    searchInfo.textContent = `Searched by ${type}: "${query}"`;
    searchInfo.className = 'search-info';
    searchAndShowBooks(query, type);
});

// Display a book looking for
function searchAndShowBooks(query, type) 
{
    fetch(`/api/books/search?query=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`)
        .then(response => response.json())
        .then(books => showCards(books))
        .catch(error => console.error('Error during search:', error));
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

    books.forEach(book => {
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
