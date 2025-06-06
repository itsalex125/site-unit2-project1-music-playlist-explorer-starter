const modal = document.querySelector("#playlistModal");
const closeBtn = document.querySelector(".close");
const featuredBtn = document.querySelector("featured-button");
const shuffleBtn = document.querySelector("#shuffle-button");

let currentSongs = [];

const loadPlaylist = () => {
    const container = document.querySelector(".playlist-cards");

    playlists.forEach(playlist => {
    const playlistElement = document.createElement('article');
    playlistElement.className = 'playlist';
    playlistElement.innerHTML = `
    <img id="holder" src="${playlist.image}" data-id="${playlist.id}" class="playlist-image">
    <article class = "text">
    <h3>${playlist.playlist_name}</h3>
    <p>${playlist.playlist_author}</p>
    <img id= "heart-holder" src="/music-playlist-creator/assets/img/bheart.jpg" class = "heart" data-likes = "0" data-liked = "true">
    <span class = "like-count">0</span>
    </article>
    `;
    
    playlistElement.querySelector(".playlist-image").addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        openModal(id);
    });
    
    const heart = playlistElement.querySelector(".heart");
    const likeCount = playlistElement.querySelector(".like-count");

    heart.addEventListener("click", () => {
        let liked = heart.dataset.liked === "true";
        let count = parseInt(heart.dataset.likes);

        if(liked){
            console.log("like: ", count);
            count++;
            heart.dataset.liked = "true";
            heart.src = "/music-playlist-creator/assets/img/heart.jpg";
        } else {
            console.log("unlike:", count);
            heart.dataset.liked = "false";
            heart.src = "/music-playlist-creator/assets/img/bheart.jpg"; 
        } 
        heart.dataset.liked = count;
        likeCount.textContent = count;
    });
    container.appendChild(playlistElement);
    });
    
};

const openModal = (playlistId) => {
    const headerContainer = document.querySelector("#playlist-header");
    headerContainer.innerHTML = ''; 

    const songsContainer = document.querySelector("#songs-list");
    songsContainer.innerHTML = '';

    const playlist = playlists.find(p => p.id === playlistId);
    if(!playlist) return;

    const titleElement = document.createElement('article');
    titleElement.className = 'playlist-details';
    titleElement.innerHTML = `
        <img id = "cover" src = "${playlist.image}">
        <div id = "playlist-info">
        <h2>${playlist.playlist_name}</h2>
        <p>${playlist.playlist_author}</p>
        </div>
    `;
    headerContainer.appendChild(titleElement);

    currentSongs = songs.filter(song => song.playlist_id === playlistId);
    renderSongs(currentSongs);
    
    modal.style.display = "block";
};
    const renderSongs = (songsToRender) => {
        const songsContainer = document.querySelector("#songs-list");
        songsContainer.innerHTML = '';
        songsToRender.forEach(song => {
        const songElement = document.createElement('article');
        songElement.className = 'song-details';
        songElement.innerHTML = `
        <img id = "song" src = "${song.image}">
        <div id = "song-info">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
        <p>${song.album}</p>
        <p id = "time">${song.duration}</p>
        </div>`;
        songsContainer.appendChild(songElement);
    });
    };


closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if(e.target === modal) modal.style.display = "none";
};

shuffleBtn.onclick = () => {
    if(currentSongs.length === 0) return;
    const shuffled = [...currentSongs].sort(()=> Math.random() -0.5);
    renderSongs(shuffled);
};
document.addEventListener("DOMContentLoaded", () => {
    loadPlaylist();
    const featuredBtn = document.getElementById("featured-button");
    if(featuredBtn){
        featuredBtn.addEventListener("click", () => {
            window.location.href = "featured.html";
        });
    }
});

