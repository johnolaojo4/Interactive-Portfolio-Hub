const movieInput = document.getElementById('movieInput');
const ratingInput = document.getElementById('ratingInput');
const movieList = document.getElementById('movieList');

// 1. 30 pre-loaded data items
const sampleMovies = [
    { title: "Inception", rating: 5, date: "2026-01-01 10:00" },
    { title: "The Matrix", rating: 5, date: "2026-01-01 10:05" },
    { title: "Interstellar", rating: 4, date: "2026-01-01 10:10" },
    { title: "The Dark Knight", rating: 5, date: "2026-01-01 10:15" },
    { title: "Pulp Fiction", rating: 4, date: "2026-01-01 10:20" },
    { title: "Forrest Gump", rating: 5, date: "2026-01-01 10:25" },
    { title: "The Shawshank Redemption", rating: 5, date: "2026-01-01 10:30" },
    { title: "The Godfather", rating: 5, date: "2026-01-01 10:35" },
    { title: "Fight Club", rating: 4, date: "2026-01-01 10:40" },
    { title: "Goodfellas", rating: 5, date: "2026-01-01 10:45" },
    { title: "Spirited Away", rating: 5, date: "2026-01-01 10:50" },
    { title: "Parasite", rating: 5, date: "2026-01-01 10:55" },
    { title: "The Lord of the Rings: The Return of the King", rating: 5, date: "2026-01-01 11:00" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", rating: 5, date: "2026-01-01 11:05" },
    { title: "Back to the Future", rating: 5, date: "2026-01-01 11:10" },
    { title: "Gladiator", rating: 4, date: "2026-01-01 11:15" },
    { title: "The Lion King", rating: 4, date: "2026-01-01 11:20" },
    { title: "The Prestige", rating: 4, date: "2026-01-01 11:25" },
    { title: "Memento", rating: 4, date: "2026-01-01 11:30" },
    { title: "The Departed", rating: 4, date: "2026-01-01 11:35" },
    { title: "Whiplash", rating: 5, date: "2026-01-01 11:40" },
    { title: "The Green Mile", rating: 5, date: "2026-01-01 11:45" },
    { title: "Se7en", rating: 4, date: "2026-01-01 11:50" },
    { title: "The Silence of the Lambs", rating: 5, date: "2026-01-01 11:55" },
    { title: "Saving Private Ryan", rating: 5, date: "2026-01-01 12:00" },
    { title: "City of God", rating: 5, date: "2026-01-01 12:05" },
    { title: "Life Is Beautiful", rating: 5, date: "2026-01-01 12:10" },
    { title: "The Usual Suspects", rating: 4, date: "2026-01-01 12:15" },
    { title: "Léon: The Professional", rating: 4, date: "2026-01-01 12:20" },
    { title: "American History X", rating: 4, date: "2026-01-01 12:25" }
];

let movies = JSON.parse(localStorage.getItem('movieLibrary'));

// load samples when data does not exist
if (!movies || movies.length === 0) {
    movies = sampleMovies;
    localStorage.setItem('movieLibrary', JSON.stringify(movies));
}

// 2. Filter/Search Functionality
function renderMovies(filterTerm = "") {
    movieList.innerHTML = "";
    
    const filtered = movies.filter(m => 
        m.title.toLowerCase().includes(filterTerm.toLowerCase())
    );

    filtered.forEach((movie, index) => {
        const li = document.createElement('li');
        li.className = "task-item";
        const stars = "★".repeat(movie.rating) + "☆".repeat(5 - movie.rating);

        li.innerHTML = `
            <div class="task-info">
                <span>${movie.title}</span>
                <small class="movie-stars">${stars}</small>
                <small class="movie-date">${movie.date || ''}</small>
            </div>
            <div class="actions">
                <button onclick="editMovie(${index})">✏️</button>
                <button onclick="deleteMovie(${index})">🗑️</button>
            </div>
        `;
        movieList.appendChild(li);
    });
}

// 3. Edit Functionality
function editMovie(index) {
    const newTitle = prompt("Edit Movie Title:", movies[index].title);
    if (newTitle) {
        movies[index].title = newTitle;
        saveAndRender();
    }
}

function addMovie() {
    const title = movieInput.value.trim();
    const rating = parseInt(ratingInput.value);
    const notes = document.getElementById('movieNotes').value.trim();

    if (!title || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a title and a rating (1-5)");
        return;
    }

    const now = new Date();
    const dateString = now.toISOString().replace('T', ' ').substring(0, 16);

    movies.unshift({ title, rating, date: dateString, notes });
    saveAndRender();
    
    movieInput.value = "";
    ratingInput.value = "";
    document.getElementById('movieNotes').value = "";
}

function deleteMovie(index) {
    movies.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('movieLibrary', JSON.stringify(movies));
    renderMovies();
}

// Search Listener
document.getElementById('searchInput').addEventListener('input', (e) => {
    renderMovies(e.target.value);
});

renderMovies();