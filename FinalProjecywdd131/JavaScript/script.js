// Returns a random artwork
function randomRecipe(recipes) {
    const index = Math.floor(Math.random() * recipes.length);
    return recipes[index];
}


// Saves ratings
function saveRatings() {
    localStorage.setItem(
        "ratings",
        JSON.stringify(recipes)
    );
}


// Builds the star rating
function ratingTemplate(recipe) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars += `
        <span 
            class="star"
            data-name="${recipe.name}"
            data-rating="${i}">
            ${i <= recipe.rating ? "⭐" : "☆"}
        </span>`;
    }

    return stars;
}


// Creates the leaderboard
function updateLeaderboard(){

    const board = document.querySelector("#leaderboard");

    let top = [...recipes]
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
function recipeTemplate(recipe) {

    const tags = recipe.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join("");


    return `
    <article class="recipe-card">


        ${recipe.model
        ? `
            <model-viewer
                class="project-model"
                src="${recipe.model}"
                alt="${recipe.name}"
                camera-controls
                auto-rotate>
            </model-viewer>
            `
        : `
            <img src="${recipe.image}" alt="${recipe.name}">
        `
    }


        <div class="recipe-info">

            ${tags}

            <h2>${recipe.name}</h2>


            <span class="rating">
                ${ratingTemplate(recipe)}
            </span>


            <p class="description">
                ${recipe.description}
            </p>

        </div>

    </article>
    `;
}


// Displays artwork
function renderRecipes(recipeList) {

    const container = document.querySelector("#recipe-container");

    container.innerHTML = recipeList
        .map(recipe => recipeTemplate(recipe))
        .join("");
}


// Filters artwork
function filterRecipes(query) {

    query = query.toLowerCase();

    return recipes.filter(recipe => {

        const tags = recipe.tags.join(" ").toLowerCase();

        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            tags.includes(query)
        );
    });
}


// Sort alphabetically
function sortRecipes(recipeList) {

    return recipeList.sort((a,b)=>
        a.name.localeCompare(b.name)
    );
}


// Search button
document.querySelector("#searchBtn")
    .addEventListener("click",()=>{

        const query = document.querySelector("#search").value;


        let filtered = filterRecipes(query);


        filtered = sortRecipes(filtered);


        if(filtered.length > 0){

            renderRecipes(filtered);

        } else {

            document.querySelector("#recipe-container").innerHTML =
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


        const artwork = recipes.find(
            item => item.name === name
        );


        artwork.votes = artwork.votes || 0;


        const totalScore =
            artwork.rating * artwork.votes;


        artwork.votes++;


        artwork.rating =
            (totalScore + score) / artwork.votes;


        saveRatings();


        renderRecipes([artwork]);


        updateLeaderboard();

    }

});


// Initial page load
window.addEventListener("DOMContentLoaded",()=>{


    const saved = localStorage.getItem("ratings");


    if(saved){

        recipes = JSON.parse(saved);

    }


    renderRecipes([
        randomRecipe(recipes)
    ]);


    updateLeaderboard();

});