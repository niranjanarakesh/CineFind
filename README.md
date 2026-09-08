# CineFind – College Web Programming (Module 6)

A clean, responsive, and cinematic movie finder web application designed specifically for the **College Web Programming Module 6 Assignment: API Integration**.

---

## 📌 Assignment Overview

### Topic Selected:
**API Integration**

### Concepts Demonstrated:
1. **React**: Building a component-driven Single Page Application (SPA) using functional components and React hooks (`useState`, `useEffect`, `useCallback`).
2. **Public REST API**: Communicating with The Movie Database (TMDB) RESTful web service.
3. **HTTP GET**: Crafting standard HTTP GET requests with dynamic search queries and URL parameters.
4. **Fetch API**: Using standard browser-native `fetch()` instead of third-party libraries (no Axios).
5. **JSON Response Handling**: Parsing asynchronous JSON streams with `await response.json()`.
6. **Asynchronous JavaScript**: Utilizing modern `async/await` syntax for non-blocking asynchronous operations.
7. **Error Handling**: Graceful detection of HTTP errors (`!response.ok`), 401 unauthorized errors, network drops, and empty search results.
8. **Environment Variables**: Securing sensitive API credentials using Vite's `import.meta.env.VITE_TMDB_API_KEY` and `.env.example`.
9. **Git/GitHub**: Version control, repository structure, and `.gitignore` configuration.
10. **Vercel Deployment**: Zero-backend serverless frontend hosting on Vercel with environment variable configuration.
11. **JAMStack Architecture**: JavaScript, APIs, and Markup—100% client-side architecture without custom backend servers.

---

## 🏛️ Architecture

```text
User
  ↓
React Movie Finder
  ↓
Fetch API
  ↓
TMDB REST API
  ↓
JSON Response
  ↓
React UI
```

---

## 📁 Project Structure

```text
movie-finder/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Header, brand, navigation & favorites counter
│   │   ├── SearchBar.jsx      # Input with Enter-key submit & clear button
│   │   ├── MovieGrid.jsx      # Responsive card grid with empty state
│   │   ├── MovieCard.jsx      # Movie card: poster, title, year, rating, overview, favorite toggle
│   │   ├── MovieDetails.jsx   # Expanded view: backdrop, full synopsis, release date, genres
│   │   ├── Favorites.jsx      # Saved favorites screen & empty state
│   │   ├── Loading.jsx        # Film-reel animated loading spinner
│   │   ├── ErrorMessage.jsx   # Error banner with retry & troubleshooting guide
│   │   └── Icons.jsx          # Native SVG icons (zero external icon libraries)
│   ├── services/
│   │   └── movieApi.js        # Pure native Fetch API service for TMDB REST API
│   ├── App.jsx                # Root component managing state and localStorage
│   ├── main.jsx               # React DOM root render entry point
│   └── index.css              # Pure vanilla CSS (no Tailwind, zero CSS frameworks)
├── .env.example               # Template for TMDB API key
├── .gitignore                 # Prevents committing secrets and build artifacts
├── index.html                 # HTML entry point
├── package.json               # Minimal dependencies manifest (React, Vite)
└── README.md                  # Project documentation & viva guide
```

---

## 🔑 How to Obtain and Configure the TMDB API Key

1. Register for a free account at [The Movie Database (TMDB)](https://www.themoviedb.org/).
2. Confirm your email and navigate to **Settings** → **API**.
3. Request an API key (choose **Developer**, specify "Student Project" for educational use).
4. Copy your **API Key (v3 auth)**.
5. Create a file named `.env` in the root folder of this project:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```
6. Replace `your_api_key_here` with your actual 32-character TMDB key.

---

## 💻 Local Installation and Setup

### Prerequisites
* Node.js (version 18 or higher)
* npm (bundled with Node.js)

### Steps
```bash
# 1. Clone or extract project
cd movie-finder

# 2. Install dependencies
npm install

# 3. Create .env from template
cp .env.example .env
# (Add your VITE_TMDB_API_KEY in .env)

# 4. Run local development server
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## 🎓 Viva / Exam Q&A Guide

### Q1: How does the Fetch API work in `movieApi.js`?
```javascript
export async function searchMovies(query) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  // 1. Send asynchronous HTTP GET request
  const response = await fetch(url);

  // 2. Check if HTTP status is in the 200-299 range
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  // 3. Parse JSON response body stream
  const data = await response.json();
  return data.results;
}
```

### Q2: Why use `fetch()` instead of Axios?
* `fetch()` is a native browser API supported in all modern browsers.
* It requires zero external dependencies, reducing bundle size and keeping the application lightweight.
* It directly satisfies the Module 6 requirement for native Fetch API integration.

### Q3: How is data persisted across page refreshes without a database?
* Favorite movies are stored in `localStorage` using `localStorage.setItem('cinefind_favorites', JSON.stringify(favorites))`.
* When the app mounts, `localStorage.getItem('cinefind_favorites')` reads and parses the JSON array.

### Q4: How are environment variables handled in Vite?
* Environment variables must be prefixed with `VITE_` to be exposed to client-side code.
* Accessed securely via `import.meta.env.VITE_TMDB_API_KEY`.
* `.env` is ignored in `.gitignore` so secrets are never pushed to GitHub.

---

## 📤 Git Commands for GitHub

```bash
git init
git add .
git commit -m "Complete Module 6 API Integration project"
git branch -M main
git remote add origin https://github.com/<your-username>/movie-finder.git
git push -u origin main
```

---

## 🌐 Deployment to Vercel

1. Push the project to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New** → **Project**.
3. Import your GitHub repository.
4. In the **Environment Variables** section:
   - Key: `VITE_TMDB_API_KEY`
   - Value: `your_actual_tmdb_api_key`
5. Click **Deploy**. Vercel will build and host the live web application.
