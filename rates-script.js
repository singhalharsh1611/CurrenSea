document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '34be67b6d5517478d8e20a6e';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.result === 'success') {
                displayRates(data.conversion_rates);
            } else {
                throw new Error(`API request failed with result: ${data.result}`);
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('result').innerHTML = 'Error fetching exchange rates.';
        });
});

function displayRates(rates) {
    const table = document.querySelector('.exchange-table');

    // Remove existing table rows (excluding the first row which is a placeholder)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Create table rows
    if (rates && Object.keys(rates).length > 0) {
        for (const [currency, rate] of Object.entries(rates)) {
            const row = table.insertRow();
            const rateCell = row.insertCell(0); 
            const currencyCell = row.insertCell(1); 

            rateCell.textContent = `${rate.toFixed(2)}`;

            currencyCell.textContent = `${currency}`;
        }
    } else {
        // If rates does not exists or invalid then show an error message
        document.getElementById('result').innerHTML = 'Error fetching exchange rates. Data is not in the expected format.';
    }
}

