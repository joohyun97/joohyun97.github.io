document.addEventListener("DOMContentLoaded", function() 
{
    const params = new URLSearchParams(window.location.search);
    const bookID = params.get('bookID');

    if (!bookID) 
    {
        console.error("Book ID not provided.");
        return;
    }

    fetch(`/api/books/details/${bookID}`)
        .then(response => {
            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(book => { // Display more book information
            document.getElementById('title').textContent = book.title;
            document.getElementById('subtitle').textContent = book.subtitle;
            document.getElementById('authors').textContent = `Authors: ${book.authors}`;
            document.getElementById('categories').textContent = `Categories: ${book.categories}`;
            document.getElementById('published_year').textContent = `Published Year: ${book.published_year}`;
            document.getElementById('num_pages').textContent = `Number of Pages: ${book.num_pages}`;
            document.getElementById('average_rating').textContent = `Average Rating: ${book.average_rating}`;
            document.getElementById('ratings_count').textContent = `Ratings Count: ${book.ratings_count}`;
            document.getElementById('isbn13').textContent = `ISBN-13: ${book.isbn13}`;
            document.getElementById('isbn10').textContent = `ISBN-10: ${book.isbn10}`;

            const thumbnail = document.getElementById('thumbnail');
            thumbnail.src = book.thumbnail;
            thumbnail.alt = `${book.title} Cover`;
        })
        .catch(error => {
            console.error("Error fetching book details:", error);
        });
});
