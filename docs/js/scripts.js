/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */

document.addEventListener("DOMContentLoaded", () => 
{
    fetchAndShowBooks(); // Initializing index.html
    document.getElementById('search-button').addEventListener('click', searchBooks); // event click button
});

// Fetch and show top 3 books by rating
function fetchAndShowBooks() 
{
    fetch('/api/books/top-rated')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(books => {
            showCards(books);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Display a book information as a card
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

// Implement for initiating a search operation
function searchBooks() 
{
    const searchType = document.getElementById("search-type").value;
    const query = document.getElementById("search-input").value;

    // Check if query is null
    if(!query || !searchType) alert("Please enter any information");
    else window.location.href = `/book-list.html?query=${encodeURIComponent(query)}&type=${encodeURIComponent(searchType)}`;
}