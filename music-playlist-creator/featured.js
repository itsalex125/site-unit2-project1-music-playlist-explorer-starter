document.addEventListener("DOMContentLoaded", ()=>{
    const playlistSection = document.getElementById("playlist-info-featured");
    const songsSection = document.getElementById("songs-list-featured");

    const featuredPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
    const songsForPlaylist = songs.filter(song => song.playlist_id === featuredPlaylist.id);

    playlistSection.innerHTML =`
    <img src = "${featuredPlaylist.image}">
    <h2>${featuredPlaylist.playlist_name}</h2>
    <p>${featuredPlaylist.playlist_author}<p>`;

    songsForPlaylist.forEach(song => {
        const songElem = document.createElement("div");
        songElem.className = "song-details";
        songElem.innerHTML = `
        <img src = "${song.image}">
        <div class ="song-info"
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
            <p>${song.album}</p>
            <p id = "time">${song.duration}</p>
        </div>`;
        songsSection.appendChild(songElem);
    });
});
