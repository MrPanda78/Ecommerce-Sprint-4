const search = document.getElementById('search-product');

search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const toSearch = search.value;
        window.location.href = "/search?query=" + toSearch;
    }
})