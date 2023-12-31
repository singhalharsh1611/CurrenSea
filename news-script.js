let key = "93b45570591442caad9ff2f6bc1f9102";
let cardData = document.querySelector(".cardData");
let page = 1;

const getData = async () => {
    let response = await fetch(`https://newsapi.org/v2/everything?q=currencies&sortBy=publishedAt&pageSize=75&page=${page}&apiKey=${key}`);
    let jsonData = await response.json();
    console.log(jsonData.articles);

    jsonData.articles.forEach(function (article) {
        console.log(article);

        let divs = document.createElement("div");
        divs.classList.add("card");
        cardData.appendChild(divs);
        divs.innerHTML = `
            <img src="${article.urlToImage}" alt="">
            <h3><b>${article.title}</b></h3>
            <p>${article.description}</p>
        `;

        divs.addEventListener("click", function () {
            window.open(article.url);
        });
    });
};

getData();

