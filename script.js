let currentAnimeList = [];
let searchHistory = [];
let watchList = [];
let suggestedData = [];

window.onload = function () {

    let h = localStorage.getItem("animeSearchHistory");
    if (h) {
        searchHistory = JSON.parse(h);
        showHistory();
        getSuggestions();
    }

    let w = localStorage.getItem("myWatchList");
    if (w) {
        watchList = JSON.parse(w);
        showWatchList();
    }
};

// SEARCH FUNCTION
function searchAnime() {

    let input = document.getElementById("searchInput");
    let query = input.value;

    if (query == "") {
        alert("Enter something bro...");
        return;
    }

    addToHistory(query);

    let resultBox = document.getElementById("animeResults");
    resultBox.innerHTML = "Loading...";

    let url = "https://api.jikan.moe/v4/anime?q=" + query;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            currentAnimeList = data.data;
            filterAndSort();

        })
        .catch(err => {
            console.log(err);
            resultBox.innerHTML = "Error...";
        });
}

// FILTER + SORT (using HOF)
function filterAndSort() {

    let genre = document.getElementById("genreFilter").value;
    let status = document.getElementById("statusFilter").value;
    let sortVal = document.getElementById("sortSelect").value;

    let filtered = currentAnimeList.filter(item => {

        let genreMatch = false;
        let statusMatch = false;

        if (status == "all" || item.status == status) {
            statusMatch = true;
        }

        if (genre == "all") {
            genreMatch = true;
        } else {
            if (item.genres) {
                genreMatch = item.genres.some(g => g.name == genre);
            }
        }

        return genreMatch && statusMatch;
    });

    // SORT
    if (sortVal == "high") {
        filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (sortVal == "low") {
        filtered.sort((a, b) => (a.score || 0) - (b.score || 0));
    }

    drawCards(filtered, "animeResults");
}

// DRAW CARDS (using map)
function drawCards(list, id) {

    let container = document.getElementById(id);

    if (list.length === 0) {
        container.innerHTML = "<p>No data found</p>";
        return;
    }

    let html = list.map(function (item) {

        let title = item.title;
        let img = item.images.jpg.image_url;
        let score = item.score ? item.score : "N/A";
        let status = item.status;
        let animeId = item.mal_id;

        return `
            <div class="card" onclick="cardClick(${animeId})">
                
                <img src="${img}" alt="${title}">
                
                <div class="card-info">
                    <h3>${title}</h3>
                    <p><b>Rating:</b> ${score}</p>
                    <p><b>Status:</b> ${status}</p>

                    <button onclick="event.stopPropagation(); addWatchlist(${animeId})">
                        Add to Watchlist
                    </button>
                </div>

            </div>
        `;

    }).join("");
    container.innerHTML = html;
}

function cardClick(id) {
    console.log("Clicked:", id);
}

function addToHistory(word) {

    if (searchHistory[0] != word) {
        searchHistory.unshift(word);
    }

    if (searchHistory.length > 5) {
        searchHistory.pop();
    }

    localStorage.setItem("animeSearchHistory", JSON.stringify(searchHistory));

    showHistory();
    getSuggestions();
}

function showHistory() {

    let ul = document.getElementById("historyList");
    ul.innerHTML = "";

    if (searchHistory.length == 0) {
        ul.innerHTML = "<li>No history</li>";
        return;
    }

    searchHistory.map(item => {

        let li = document.createElement("li");
        li.innerText = item;

        li.onclick = function () {
            document.getElementById("searchInput").value = item;
            searchAnime();
        };

        ul.appendChild(li);
    });
}

// WATCHLIST
function addWatchlist(id) {

    let already = watchList.find(x => x.id == id);

    if (already) {
        alert("Already added");
        return;
    }

    let found =
        currentAnimeList.find(x => x.mal_id == id) ||
        suggestedData.find(x => x.mal_id == id);

    if (found) {

        watchList.push({
            id: found.mal_id,
            title: found.title
        });

        localStorage.setItem("myWatchList", JSON.stringify(watchList));

        alert("Added to watchlist");
        showWatchList();
    }
}

function removeWatchlist(id) {

    watchList = watchList.filter(x => x.id != id);

    localStorage.setItem("myWatchList", JSON.stringify(watchList));
    showWatchList();
}

function showWatchList() {

    let box = document.getElementById("watchlistContainer");
    box.innerHTML = "";

    if (watchList.length == 0) {
        box.innerHTML = "<p>Empty</p>";
        return;
    }

    let html = watchList.map(w => {
        return `
        <div class="watch-item">
            <h4>${w.title}</h4>
            <button onclick="removeWatchlist(${w.id})">Remove</button>
        </div>
        `;
    }).join("");

    box.innerHTML = html;
}

// SUGGESTIONS
function getSuggestions() {

    if (searchHistory.length == 0) return;

    let word = searchHistory[0];

    let txt = document.getElementById("suggestedText");
    txt.innerText = "Because you searched: " + word;

    let url = `https://api.jikan.moe/v4/anime?q=${word}&order_by=popularity&sort=asc&limit=10`;

    fetch(url)
        .then(r => r.json())
        .then(d => {

            suggestedData = d.data;
            drawCards(suggestedData, "suggestedResults");

        })
        .catch(e => console.log(e));
}

function toggleMode() {

    let body = document.body;
    let btn = document.getElementById("themeToggle");

    body.classList.toggle("dark");

    // change icon
    if (body.classList.contains("dark")) {
        btn.innerText = "☀️";
        localStorage.setItem("mode", "dark");
    } else {
        btn.innerText = "🌙";
        localStorage.setItem("mode", "light");
    }
}