$(document).ready(function () {
    const correctAnswers = localStorage.getItem('correctAnswers') || 0; // Get the score from localStorage
    $('#final-score').text(correctAnswers); // Display the score on the final score page
});
