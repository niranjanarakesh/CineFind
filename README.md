# CinemaFind

A simple beginner-friendly movie search app built with React, Vite, and the TMDB REST API.

## Features

- Search for movies
- View popular movies
- View movie details
- Add/remove favorites
- Save favorites in browser `localStorage`
- Loading and error messages

## Setup

1. Install Node.js.
2. Open this project folder in a terminal.
3. Install dependencies:

```bash
npm install
```

4. Create a file named `.env` in the project root.
5. Add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_actual_tmdb_api_key
```

6. Start the app:

```bash
npm run dev
```

7. Open the local URL shown in the terminal.

## Project structure

```text
src/
├── components/
│   ├── Favorites.jsx
│   ├── MovieCard.jsx
│   ├── MovieDetails.jsx
│   ├── MovieGrid.jsx
│   ├── Navbar.jsx
│   └── SearchBar.jsx
├── services/
│   └── movieApi.js
├── App.jsx
├── index.css
└── main.jsx
```

## Main concepts demonstrated

- React components
- `useState`
- `useEffect`
- Props
- `fetch()`
- `async/await`
- REST API requests
- JSON responses
- `localStorage`
- Basic error handling

## TMDB attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.
