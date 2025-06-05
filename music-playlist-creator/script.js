let modal = document.querySelector(".modal");
let img = document.querySelectorAll("#holder");
let closeBtn = document.querySelector(".close");

img.forEach(img =>{
    img.addEventListener("click", () =>{
        modal.style.display = "block";
    });
});

function openModal(clickedImage){
    img.src = clickedImage.src;
    modal.style.display = "block";
}

closeBtn.onclick = () =>{
    modal.style.display = "none";
};

modal.onclick = (e) =>{
    if(e.target === modal) modal.style.display = "none";
};

const loadPlaylist = () => {
    console.log('loading Playlist');
    const container = document.querySelector(".playlist-cards");
    for(const pl of playlists){
        const elem = createPlaylist(pl);
        container.appendChild(elem);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadPlaylist();
});

const createPlaylist=(playlist)=>{
    console.log(playlist);
    const playlistElement = document.createElement('article');
    playlistElement.className = 'playlist' ;
    playlistElement.innerHTML = `
                <img id="holder" src="/music-playlist-creator/assets/img/playlist.png" onclick = "openModal(this)">
                <article class = "text">
                <h3>${playlist.playlist_name}</h3>
                <p>${playlist.playlist_author}</p>
                <img id= "heart-holder" src="/music-playlist-creator/assets/img/heart.jpg">
                </article>`;
    return playlistElement;
}
// const createSongs=(song)=>{
//     console.log(song);
//     const 
// }