const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    image: "Images/swampbeast.png",

    attacked() {
        this.health -= 20;

        if (this.health <= 0) {
            this.health = 0;
            alert(this.name + " has died!");
        }

        updateCard();
    },

    levelUp() {
        this.level += 1;
        updateCard();
    }
};

function updateCard() {
    document.getElementById("characterName").textContent = character.name;
    document.getElementById("characterClass").textContent = character.class;
    document.getElementById("characterLevel").textContent = character.level;
    document.getElementById("characterHealth").textContent = character.health;
}

function attackCharacter() {
    character.attacked();
}

function levelUpCharacter() {
    character.levelUp();
}

updateCard();