const hikes = [
    {
        name: "Bechler Falls",
        stub: "bechler_falls",
        imgSrc: "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        tags: ["Caves", "Yellowstone", "Waterfall"],
        difficulty: 1,
        description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls"
    },
    {
        name: "Teton Canyon",
        stub: "teton_canyon",
        imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
        imgAlt: "Image of Teton Canyon",
        distance: "3 miles",
        tags: ["Canyon", "Tetons"],
        difficulty: 1,
        description: "Beautiful short (or long) hike through Teton Canyon."
    },
    {
        name: "Denanda Falls",
        stub: "denanda_falls",
        imgSrc: "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
        imgAlt: "Image of Denanda Falls",
        distance: "7 miles",
        tags: ["Caves", "Yellowstone", "Waterfall"],
        difficulty: 3,
        description: "Beautiful hike through Bechler meadows to Denanda Falls"
    },
    {
        name: "Coffee Pot Rapids",
        stub: "coffee_pot",
        imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
        imgAlt: "Image of Coffee Pot Rapids",
        distance: "2.2 miles",
        tags: ["Rafting"],
        difficulty: 1,
        description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids."
    },
    {
        name: "Menan Butte",
        stub: "menan_butte",
        imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
        imgAlt: "Image of Menan Butte",
        distance: "3.4 miles",
        tags: ["Volcanic", "View"],
        difficulty: 2,
        description: "A steep climb to one of the largest volcanic tuff cones in the world."
    }
];

let hikeContainer = document.querySelector('#hike-container');
let input = document.querySelector('#search');
let button = document.querySelector('button');

button.addEventListener('click', search);

input.addEventListener('keypress', handleEnter);

function handleEnter(event) {
    if (event.key === 'Enter') {
        search();
    }
}

function search() {
    let hikeQuery = input.value;

    let filteredHikes = hikes.filter(function (hike) {
        return (
            hike.name.toLowerCase().includes(hikeQuery.toLowerCase()) ||
            hike.description.toLowerCase().includes(hikeQuery.toLowerCase()) ||
            hike.tags.find(tag =>
                tag.toLowerCase().includes(hikeQuery.toLowerCase())
            )
        );
    });

    filteredHikes.sort(compareHikes);

    hikeContainer.innerHTML = '';

    filteredHikes.forEach(function (hike) {
        renderHike(hike);
    });
}

function compareHikes(a, b) {
    if (a.difficulty < b.difficulty) {
        return -1;
    } else if (a.difficulty > b.difficulty) {
        return 1;
    }
    return 0;
}

function tagTemplate(tags) {
    return tags.map(tag => `<button>${tag}</button>`).join(' ');
}

function difficultyTemplate(rating) {
    let html = `<span class="rating">Difficulty: `;

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `🥾`;
        } else {
            html += `▫️`;
        }
    }

    html += `</span>`;
    return html;
}

function hikesTemplate(hike) {
    return `
    <div class="hike-card">
      <div class="hike-content">
        <h2>${hike.name}</h2>

        <div class="hike-tags">
          ${tagTemplate(hike.tags)}
        </div>

        <p>${hike.description}</p>

        <p>${difficultyTemplate(hike.difficulty)}</p>
      </div>
    </div>
  `;
}

function renderHike(hike) {
    hikeContainer.innerHTML += hikesTemplate(hike);
}

let randomNum = Math.floor(Math.random() * hikes.length);

function init() {
    renderHike(hikes[randomNum]);
}

init();