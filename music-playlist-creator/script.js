function openModal(clickedImage){
    let modal = document.querySelector(".playlistModal");
    let modalimg = document.querySelector
}

img.forEach(img =>{
    img.addEventListener("click", () =>{
        modal.style.display = "block";
    });
});

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
            <article class = "playlist">
                <img id="holder" src="/music-playlist-creator/assets/img/playlist.png">
                <article class = "text">
                <h3>${playlist.playlist_name}</h3>
                <p>${playlist.playlist_author}</p>
                <img id= "heart" src="/music-playlist-creator/assets/img/heart.jpg">
                </article>
            </article>`;
    return playlistElement;
}