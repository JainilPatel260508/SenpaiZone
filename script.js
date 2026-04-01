let inputBox = document.getElementById('searchInput');
let sbtn = document.getElementById('searchBtn');
let btn = document.getElementById('allAnime');
let loaderText = document.getElementById('loading');
let resultArea = document.getElementById('results');

function getAllAnimeData() {

    loaderText.style.display = 'block';
    resultArea.innerHTML = '';

    let allAnime = [];
    let currentPage = 1;
    let totalPages = 3; 
    console.log('Fetching anime data upto 4 page...');
    console.log('This may take a while... If showing the error click the button below again');
    function fetchPage(page) {
        let apiURL = `https://api.jikan.moe/v4/anime?page=${page}&limit=25`;

        fetch(apiURL)
            .then(res => res.json())
            .then(data => {

                allAnime = allAnime.concat(data.data);

                if (page < totalPages) {
                    fetchPage(page + 1);
                } else {
                    loaderText.style.display = 'none';
                    showAnime(allAnime);
                    console.log(allAnime);
                }

            })
            .catch(err => {
                loaderText.style.display = 'none';
                resultArea.innerHTML = '<p style="color: red; text-align: center;">Something went wrong... Click the button again</p>';
                console.log('Error:', err);
            });
    }

    fetchPage(currentPage);
}

// function to show anime cards on screen
function showAnime(list) {

    if (list.length == 0) {
        resultArea.innerHTML = '<p>No results found</p>';
        return;
    }

    let outputHTML = '';  

    for (let i = 0; i < list.length; i++) {

        let item = list[i];

        let animeName = item.title;
        let animeScore;

        if (item.score) {
            animeScore = item.score;
        } else {
            animeScore = 'N/A';
        }

        let animeImg = item.images.jpg.image_url;

        outputHTML += '<div class="card">';

        outputHTML += '<img src="' + animeImg + '" alt="' + animeName + '">';

        outputHTML += '<div class="card-content">';
        outputHTML += '<div class="card-title">' + animeName + '</div>';
        outputHTML += '<div class="card-rating">Rating: ' + animeScore + '</div>';
        outputHTML += '</div>';

        outputHTML += '</div>';

    }
    resultArea.innerHTML = outputHTML;
}