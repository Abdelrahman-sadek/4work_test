async function search() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const sheetId = 'YOUR_SHEET_ID'; // Replace with your actual Sheet ID
    const range = 'Sheet1!A1:Z1000'; // Adjust the range as needed

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rows = data.values;
        const results = rows.filter(row => row.some(cell => cell.toLowerCase().includes(searchTerm)));

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
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    resultsDiv.appendChild(table);
}
