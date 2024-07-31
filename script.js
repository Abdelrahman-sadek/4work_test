async function search() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const publicSheetUrl = 'https://opensheet.elk.sh/1k-ousyrAw5qSigsNmIeuljkiNVe497kYjUbViB1O_k4/1'; // Replace with your actual public sheet URL

    try {
        const response = await fetch(publicSheetUrl);
        const data = await response.json();
        const results = data.filter(row => Object.values(row).some(cell => cell.toString().toLowerCase().includes(searchTerm)));

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
