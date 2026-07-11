// Returns a random recipe
function randomRecipe(recipes) {
    const index = Math.floor(Math.random() * recipes.length);
    return recipes[index];
}

// Builds the star rating
function ratingTemplate(rating) {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars += "⭐";
        } else {
            stars += "☆";
        }
    }

    return stars;
}


// Creates HTML for one recipe
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
        : `<img src="${recipe.image}" alt="${recipe.name}">`
    }

        <div class="recipe-info">

            ${tags}

            <h2>${recipe.name}</h2>

            <span
                class="rating"
                role="img"
                aria-label="Rating: ${recipe.rating} out of 5 stars">
                ${ratingTemplate(recipe.rating)}
            </span>

            <p class="description">
                ${recipe.description}
            </p>

        </div>

    </article>
    `;
}

// Displays recipes
function renderRecipes(recipeList) {
    const container = document.querySelector("#recipe-container");

    container.innerHTML = recipeList
        .map(recipe => recipeTemplate(recipe))
        .join("");
}

// Filters recipes
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
    return recipeList.sort((a, b) =>
        a.name.localeCompare(b.name)
    );
}

// Search button
document.querySelector("#searchBtn").addEventListener("click", () => {

    const query = document.querySelector("#search").value;

    let filtered = filterRecipes(query);

    filtered = sortRecipes(filtered);

    if (filtered.length > 0) {
        renderRecipes(filtered);
    } else {
        document.querySelector("#recipe-container").innerHTML =
            "<p>No Artwork found.</p>";
    }

});

// Initial page load
window.addEventListener("DOMContentLoaded", () => {
    renderRecipes([randomRecipe(recipes)]);
});