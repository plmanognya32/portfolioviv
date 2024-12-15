// Get modal element and button
const modal = document.getElementById("learnMoreModal");
const learnMoreButton = document.querySelector(".cta-button");
const closeButton = document.querySelector(".close-button");

// Show modal when "Learn More" button is clicked
learnMoreButton.addEventListener("click", () => {
    modal.style.display = "flex"; // Show modal as a flex container
});

// Close modal when close button is clicked
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
