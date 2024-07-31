async function search() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const sheetDBUrl = 'https://sheetdb.io/api/v1/4pzezbprfb5nk'; // Replace with your actual SheetDB API URL

    try {
        const response = await fetch(sheetDBUrl);
        const data = await response.json();
        const rows = data;
        const results = rows.filter(row => Object.values(row).some(cell => cell.toLowerCase().includes(searchTerm)));

        displayResults(results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    const table = document.createElement('table');
    results.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    resultsDiv.appendChild(table);
}
