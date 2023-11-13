let key = "0867e42d37c44104949006bea1beba61";
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
            <h3>${article.title}</h3>
            <p>${article.description}</p>
        `;

        divs.addEventListener("click", function () {
            window.open(article.url);
        });
    });
};

getData();

document.querySelector("#next").addEventListener("click", function () {
    page++;
    cardData.innerHTML = "";
    getData();
});

document.querySelector("#prev").addEventListener("click", function () {
    if (page > 1) {
        page--;
        cardData.innerHTML = "";
        getData();
    }
});
