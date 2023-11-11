let key = "fc64d833cc2f4873a21b42aa3a915b58";
let cardData = document.querySelector(".cardData")
const getData = async () => {
    let response = await fetch(`https://newsapi.org/v2/everything?q=currency-india&sortBy=publishedAt&pageSize=75&apiKey=${key}`);
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
    `

        divs.addEventListener("click", function () {
            window.open(article.url);
        })
    })

}
getData();
