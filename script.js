let incorrectAttempts = 0;
let disabledButton = null;

$(document).ready(function() {
  $('.option-btn').click(function() {
    let selectedAnswer = $(this).attr('data-answer');
    
    if (selectedAnswer === 'correct') {
      showPopup('Correct!', 'Great job! You answered correctly.', true);
    } else {
      incorrectAttempts++;
      disableButton($(this)); // Disable the incorrect button
      
      if (incorrectAttempts < 2) {
        showPopup('Incorrect!', 'Try again.', false);
      } else {
        showPopup('Incorrect!', 'The correct answer is 30,000.', true);
      }
    }
  });

  // Handle retry button
  $(document).on('click', '#retry-btn', function() {
    hidePopup();
  });

  // Handle next question button
  $(document).on('click', '#next-btn', function() {
    window.location.href = "next-question.html"; // Change this URL to the actual next question
  });
});

// Function to show popup
function showPopup(title, message, showNext) {
  $('#popup-title').text(title);
  $('#popup-message').text(message);
  
  if (showNext) {
    $('#popup-buttons').html('<button id="next-btn" class="btn btn-primary">Next Question</button>');
  } else {
    $('#popup-buttons').html('<button id="retry-btn" class="btn btn-secondary">Retry</button>');
  }
  
  $('#popup, #overlay').fadeIn(); // Show both the popup and the overlay
}

// Function to hide popup
function hidePopup() {
  $('#popup, #overlay').fadeOut(); // Hide both the popup and the overlay
}

// Function to disable the incorrect button and make it grey
function disableButton(button) {
  button.prop('disabled', true);
  button.addClass('btn-secondary').removeClass('btn-success'); // Change to grey
}
