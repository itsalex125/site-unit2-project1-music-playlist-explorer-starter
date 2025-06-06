const modal = document.querySelector("#playlistModal");
const closeBtn = document.querySelector(".close");
const featuredBtn = document.querySelector("featured-button");
const shuffleBtn = document.querySelector("#shuffle-button");

let currentSongs = [];

const loadPlaylist = () => {
    const container = document.querySelector(".playlist-cards");
    container.innerHTML = '';

    playlists.forEach(playlist => {
    const playlistElement = document.createElement('article');
    playlistElement.className = 'playlist';
    playlistElement.innerHTML = `
    <img id="holder" src="${playlist.image}" data-id="${playlist.id}" class="playlist-image">
    <article class = "text">
    <h3>${playlist.playlist_name}</h3>
    <p>${playlist.playlist_author}</p>
    <img id= "heart-holder" src="/music-playlist-creator/assets/img/bheart.jpg" class = "heart" data-liked = "false">
    <span class = "like-count">${playlist.likes}<span>
    <button id = "delete">Delete</button>
    </article>
    `;
    
    playlistElement.querySelector(".playlist-image").addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        openModal(id);
    });
    
    const deleteBtn = playlistElement.querySelector("#delete");
    deleteBtn.addEventListener("click", () =>{
        container.removeChild(playlistElement);
    });

    const heart = playlistElement.querySelector(".heart");
    const likeCount = playlistElement.querySelector(".like-count");

    heart.addEventListener("click", () => {
        let liked = heart.dataset.liked === "true";

        if(liked){
            playlist.likes--;
            heart.dataset.liked = "false";
            heart.src = "/music-playlist-creator/assets/img/bheart.jpg";
        } else {

            playlist.likes++;
            heart.dataset.liked = "true";
            heart.src = "/music-playlist-creator/assets/img/heart.jpg";
        } 
        likeCount.innerHTML = playlist.likes;
    });
    container.appendChild(playlistElement);
    });
};
//this opens the modal and populates 
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
}
//This is used to render the songs on the page
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
    let currentPlaylist = playlists;
    const featuredBtn = document.getElementById("featured-button");

    if(featuredBtn){
        featuredBtn.addEventListener("click", () => {
            window.location.href = "featured.html";
        });
    
    
    const sortSelect = document.getElementById("sort-select");
    sortSelect.addEventListener("change", (event) => {
        const value = event.target.value;
        if(value === "az"){
            currentPlaylist.sort((a,b) => a.playlist_name.localeCompare(b.playlist_name));
        }
        else if(value === "za"){
            currentPlaylist.sort((a,b) => b.playlist_name.localeCompare(a.playlist_name));
        }
        else if(value === "likes"){
            currentPlaylist.sort((a,b) => b.likes - a.likes);
        }
        else if(value === "new"){
            currentPlaylist.sort((a,b) => new Date(a.data_added) - new Date(b.data_added))
        }
        loadPlaylist(currentPlaylist);
        });
    }
});

