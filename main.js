document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim();

        if (query.length > 0) {
            // Make a GET request to fetch search results from the backend
            fetch(`http://127.0.0.1:3000/searches?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                // Display search results (modify this part based on your data structure)
                searchResults.innerHTML = `<p>Search Results:</p><ul>${data.map(result => `<li>${result.query}</li>`).join('')}</ul>`;
            })
            .catch(error => console.error('Error fetching search results:', error));
        }
    });
});

