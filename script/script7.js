// Function to open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modals = document.getElementsByClassName("modal");
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
};
