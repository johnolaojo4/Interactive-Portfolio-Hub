const movieInput = document.getElementById('movieInput');
const ratingInput = document.getElementById('ratingInput');
const movieList = document.getElementById('movieList');

// Persistence: Load from LocalStorage
let movies = JSON.parse(localStorage.getItem('movieLibrary')) || [];

function renderMovies() {
    movieList.innerHTML = "";
    
    movies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.className = "task-item";
        
        // Dynamic Star Rating Logic
        const stars = "★".repeat(movie.rating) + "☆".repeat(5 - movie.rating);

        li.innerHTML = `
            <div class="task-info">
                <span>${movie.title}</span>
                <small class="movie-date">Added on: ${movie.date}</small>
                <small class="movie-stars">${stars}</small>
            </div>
            <button class="delete-btn" onclick="deleteMovie(${index})">🗑️</button>
        `;
        movieList.appendChild(li);
    });

    localStorage.setItem('movieLibrary', JSON.stringify(movies));
}

function addMovie() {
    const title = movieInput.value.trim();
    const rating = parseInt(ratingInput.value);

    if (title === "" || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a title and a rating between 1 and 5");
        return;
    }

    // Capture Date and Time
    const now = new Date();
    const dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    movies.push({ 
        title: title, 
        rating: rating, 
        date: dateString 
    });

    movieInput.value = "";
    ratingInput.value = "";
    renderMovies();
}

function deleteMovie(index) {
    movies.splice(index, 1);
    renderMovies();
}

renderMovies();