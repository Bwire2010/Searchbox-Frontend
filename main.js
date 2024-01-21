document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResultsDropdown = document.getElementById('searchResultsDropdown');
    const loadingSpinner = document.getElementById('loadingSpinner');

    console.log('searchInput:', searchInput);
    console.log('searchButton:', searchButton);
    console.log('searchResultsDropdown:', searchResultsDropdown);

    searchButton.addEventListener('click', handleSearch);

    const debouncedSearch = debounce(handleSearch, 300); // Adjust the delay as needed
    searchInput.addEventListener('input', debouncedSearch);

    let timeoutId;

    function debounce(func, delay) {
        return function () {
            const context = this;
            const args = arguments;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        };
    }

    async function handleSearch() {
        const searchTerm = searchInput.value.trim();

        if (searchTerm.length === 0) {
            // Clear the dropdown if the search term is empty
            searchResultsDropdown.innerHTML = '';
            return;
        }

        // Display loading spinner
        loadingSpinner.style.display = 'block';

        // Make a request to the backend API
        fetch(`http://127.0.0.1:3000/searches?query=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Received data:', data);

                // Ensure data is an array
                if (Array.isArray(data)) {
                    // Update the dropdown with the search results
                    searchResultsDropdown.innerHTML = '';  // Clear the dropdown

                    // Append all saved searches (existing + new) to the dropdown
                    data.forEach(result => {
                        const resultItem = document.createElement('div');
                        resultItem.textContent = result.query; // Assuming 'query' is the property containing the search string
                        searchResultsDropdown.appendChild(resultItem);
                    });

                    // Hide loading spinner after displaying results
                    loadingSpinner.style.display = 'none';
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);

                // Hide loading spinner on error
                loadingSpinner.style.display = 'none';
            });
    }
});
