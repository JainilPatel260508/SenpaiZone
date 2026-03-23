# SenpaiZone

### Smart Anime Intelligence Dashboard

## Description

SenpaiZone is a smart anime discovery web app that goes beyond simple search. It gathers real-time anime data from a public API and improves user experience by looking at user behavior to provide personalized recommendations, insights, and content that adapts.

## Objective

The goal of this project is to show how to use JavaScript, API integration, and UI design by creating a system that not only displays data but also learns from user interactions and improves results over time.

## Motivation

Most apps only show static data. AnimeSense aims to change this by:

* Making content interactive and personalized.
* Helping users find anime based on what they like.
* Showing how user behavior can influence smart UI choices.

## APIs Used

### Jikan API (Main)

* Offers anime data (title, rating, genres, images, etc.)
* Used for searching, filtering, and trending anime.
* URL:- https://api.jikan.moe/v4/

## Features

### Smart Search

* Search for anime by name.
* Get real-time results.

### Filtering

* Filter by genre.
* Filter by rating.
* Filter by status (airing or completed).

### Sorting

* Sort by rating.
* Sort by popularity.
* Sort by release date.

### User Behavior Tracking (Core Feature)

* Tracks user clicks and searches.
* Stores preferences using localStorage.

### Insights Dashboard

* Most searched genre.
* Most viewed anime.
* Summary of user activity.

### Personalized Recommendations

* Suggests anime based on user preferences.
* Adapts over time.

### Adaptive UI

* Reorders content based on user behavior.

### Watchlist

* Save favorite anime.
* Access later.

## Technologies Used

* HTML
* CSS
* JavaScript
* Fetch API
* LocalStorage

## Project Structure

```
anime-sense/
│── index.html
│── style.css
│── script.js
│── /assets
│── README.md
```

## How to Run

1. Clone the repository

```
git clone https://github.com/your-username/anime-sense.git
```

2. Open the project folder.

3. Open `index.html` in your browser.

## Future Enhancements

* Dark/Light mode toggle.
* Improved recommendation algorithm.
* Anime trailers integration.
* Fully responsive mobile UI.

## Key Highlight

This application doesn’t just show anime. It learns from the user and evolves to provide a smarter, personalized experience.
