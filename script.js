// script for currency exchange
const dropList = document.querySelectorAll("form select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");

const apiKey = "34be67b6d5517478d8e20a6e";

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "INR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for (let code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}


getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".icon");

exchangeIcon.addEventListener("click", () => {
    exchangeCurrencies();
});

function exchangeCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    loadFlag(fromCurrency);
    loadFlag(toCurrency);
}

function getExchangeRate() {
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
            saveConversionToLocalStorage(amountVal, fromCurrency.value, toCurrency.value, totalExRate);
        })
        .catch(() => {
            exchangeRateTxt.innerText = "Something went wrong";
        });
}


//script for history

function saveConversionToLocalStorage(amountVal, fromCurrency, toCurrency, totalExRate) {
    // Getting  conversion history from local storage
    let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

    // Adding  new conversion to the history 
    let newConversion = {
        amount: amountVal,
        fromCurrency: fromCurrency,
        
        result: totalExRate,
        toCurrency: toCurrency,
        timestamp: new Date().toLocaleString()
    };

    conversionHistory.push(newConversion);

    // Saveing the updated history back to local storage
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
}

function displayConversionHistory() {
    let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

    let historyTable = document.getElementById('historyTable');
    let historyTableBody = document.getElementById('historyTableBody');

    // Clear the table body before appending new rows
    historyTableBody.innerHTML = '';

    if (conversionHistory.length === 0) {
        // If no conversion history, show a message or handle it as needed
        let noDataMessage = document.createElement('tr');
        let noDataCell = document.createElement('td');
        noDataCell.colSpan = 5; // Set colspan to cover all columns
        noDataCell.textContent = 'No conversion history available.';
        noDataMessage.appendChild(noDataCell);
        historyTableBody.appendChild(noDataMessage);
    } else {
        // If conversion history exists, populate the table with rows
        for (let i = 0; i < conversionHistory.length; i++) {
            let row = document.createElement('tr');

            let amountCell = document.createElement('td');
            amountCell.innerText = conversionHistory[i].amount;
            row.appendChild(amountCell);

            let fromCurrencyCell = document.createElement('td');
            fromCurrencyCell.innerText = conversionHistory[i].fromCurrency;
            row.appendChild(fromCurrencyCell);

            

            let resultCell = document.createElement('td');
            resultCell.innerText = conversionHistory[i].result;
            row.appendChild(resultCell);

            let toCurrencyCell = document.createElement('td');
            toCurrencyCell.innerText = conversionHistory[i].toCurrency;
            row.appendChild(toCurrencyCell);
            
            let timestampCell = document.createElement('td');
            timestampCell.innerText = conversionHistory[i].timestamp;
            row.appendChild(timestampCell);

            historyTableBody.appendChild(row);
        }
    }
}


