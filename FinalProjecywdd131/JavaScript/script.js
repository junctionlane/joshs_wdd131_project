// Returns a random artwork
function randomArtwork(artworkprojects) {
    const index = Math.floor(Math.random() * artworkprojects.length);
    return artworkprojects[index];
}


// Saves ratings
function saveRatings() {
    localStorage.setItem(
        "ratings",
        JSON.stringify(artworkprojects)
    );
}


// Builds the star rating
function ratingTemplate(artwork) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars += `
        <span 
            class="star"
            data-name="${artwork.name}"
            data-rating="${i}">
            ${i <= artwork.rating ? "⭐" : "☆"}
        </span>`;
    }

    return stars;
}


// Creates the leaderboard
function updateLeaderboard(){

    const board = document.querySelector("#leaderboard");

    let top = [...artworkprojects]
        .sort((a,b)=> {
            return (b.rating * b.votes) - (a.rating * a.votes);
        })
        .slice(0,5);


    board.innerHTML = `
        <h2>🏆 Top Rated Artwork</h2>

        ${top.map(item => `
            <p>
                ${item.name}
                ${ratingTemplate(item)}
                (${item.votes || 0} votes)
            </p>
        `).join("")}
    `;
}


// Creates HTML for one artwork
function artworkTemplate(artwork) {

    const tags = artwork.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join("");


    return `
    <article class="artwork-card">


        ${artwork.model
        ? `
            <model-viewer
                class="project-model"
                src="${artwork.model}"
                alt="${artwork.name}"
                loading="lazy"
                reveal="interaction"
                camera-controls
                auto-rotate>
            </model-viewer>
            `
        : `
            <img src="${artwork.image}" alt="${artwork.name}" loading="lazy" width="500" height="400">
        `
    }


        <div class="artwork-info">

            ${tags}

            <h2>${artwork.name}</h2>


            <span class="rating">
                ${ratingTemplate(artwork)}
            </span>


            <p class="description">
                ${artwork.description}
            </p>

        </div>

    </article>
    `;
}


// Displays artwork
function renderArtwork(artList) {

    const container = document.querySelector("#artwork-container");

    container.innerHTML = artList
        .map(artwork => artworkTemplate(artwork))
        .join("");
}


// Filters artwork
function filterArtwork(query) {

    query = query.toLowerCase();

    return artworkprojects.filter(artwork => {

        const tags = artwork.tags.join(" ").toLowerCase();

        return (
            artwork.name.toLowerCase().includes(query) ||
            artwork.description.toLowerCase().includes(query) ||
            tags.includes(query)
        );
    });
}


// Sort alphabetically
function sortArtwork(artworkList) {

    return artworkList.sort((a, b)=>
        a.name.localeCompare(b.name)
    );
}


// Search button
document.querySelector("#searchBtn")
    .addEventListener("click",()=>{

        const query = document.querySelector("#search").value;


        let filtered = filterArtwork(query);


        filtered = sortArtwork(filtered);


        if(filtered.length > 0){

            renderArtwork(filtered);

        } else {

            document.querySelector("#artwork-container").innerHTML =
                "<p>No Artwork found.</p>";

        }

    });


// Star click event
document.addEventListener("click",(event)=>{


    if(event.target.classList.contains("star")){


        const name = event.target.dataset.name;

        const score = Number(
            event.target.dataset.rating
        );


        const artwork = artworkprojects.find(
            item => item.name === name
        );


        artwork.votes = artwork.votes || 0;


        const totalScore =
            artwork.rating * artwork.votes;


        artwork.votes++;


        artwork.rating =
            (totalScore + score) / artwork.votes;


        saveRatings();


        renderArtwork([artwork]);


        updateLeaderboard();

    }

});


// Initial page load
window.addEventListener("DOMContentLoaded",()=>{


    const saved = localStorage.getItem("ratings");


    if(saved){

        artworkprojects = JSON.parse(saved);

    }


    renderArtwork([
        randomArtwork(artworkprojects)
    ]);


    updateLeaderboard();

});