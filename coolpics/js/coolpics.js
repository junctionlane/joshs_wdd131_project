// Menu Button

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// Gallery Images

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", (event) => {

    if (event.target.tagName === "IMG") {

        const imgSrc = event.target.src.replace("-sm", "-full");

        const modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
            <span class="close-viewer">X</span>
            <img src="${imgSrc}" alt="Large Image">
        `;

        document.body.appendChild(modal);

        // Close with X button
        modal.querySelector(".close-viewer").addEventListener("click", () => {
            modal.remove();
        });

        // Close when clicking outside image
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close with ESC key
        document.addEventListener("keydown", function escClose(e) {

            if (e.key === "Escape") {
                modal.remove();

                document.removeEventListener("keydown", escClose);
            }
        });
    }
});