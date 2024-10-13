let incorrectAttempts = 0;
let disabledButton = null;

// Initialize the current question number and score
let currentQuestion = parseInt(window.location.pathname.split('/').pop().replace('.html', '')) || 1;
let score = parseInt(sessionStorage.getItem('score')) || 0; // Retrieve score from session storage
sessionStorage.setItem('currentQuestion', currentQuestion); // Store the current question in session storage

// Array to hold correct answers for each question
const correctAnswers = {
  1: 'Alat-alat batu dan fosil manusia purba',
  2: 'Zaman Paleolitikum hingga Neolitikum', // Replace with the actual answer
  3: 'Alat-alat dari batu',  // Replace with the actual answer
  4: 'Tulang hewan dan fosil manusia',
  5: 'Berburu dan memotong daging', // Replace with the actual answer
  // Add more questions as needed
};

// Array to hold fun facts for each question
const funFacts = {
  1: 'Alat-alat batu yang ditemukan di situs prasejarah sering kali terbuat dari bahan keras seperti batu api, yang memungkinkan manusia purba untuk membuat alat yang tajam dan tahan lama.',
  2: 'Zaman Paleolitikum dikenal sebagai "Zaman Batu Tua," di mana manusia purba mulai menggunakan alat batu untuk berburu dan mengumpulkan makanan.', // Replace with the actual fact
  3: 'Alat-alat dari batu merupakan salah satu tanda awal dari kemampuan manusia untuk menciptakan alat, yang menjadi dasar bagi perkembangan teknologi selanjutnya.', // Replace with the actual fact
  4: 'Penelitian terhadap fosil manusia purba membantu ilmuwan memahami cara hidup mereka, termasuk pola makan dan kebiasaan sosial.', // Replace with the actual fact
  5: 'Alat-alat batu digunakan untuk berburu mamalia besar seperti mamut, yang merupakan sumber makanan penting bagi manusia purba.', // Replace with the actual fact
  // Add more fun facts as needed
};

const totalQuestions = Object.keys(correctAnswers).length; // Get the total number of questions

$(document).ready(function() {
  $('.option-btn').click(function() {
    let selectedAnswer = $(this).attr('data-answer');
    
    if (selectedAnswer === 'correct') {
      score++; // Increment score for correct answer
      sessionStorage.setItem('score', score); // Store updated score
      
      // Get the fun fact for the current question
      let funFact = funFacts[currentQuestion]; 
      showPopup('Benar!', `Fun Fact: ${funFact}`, true);
    } else {
      incorrectAttempts++;
      disableButton($(this)); // Disable the incorrect button
      
      if (incorrectAttempts < 2) {
        showPopup('Salah!', 'Coba lagi.', false);
      } else {
        // Display the correct answer from the array
        let correctAnswer = correctAnswers[currentQuestion]; 
        showPopup('Salah!', `Jawaban yang benar adalah ${correctAnswer}.`, true);
      }
    }
  });

  // Handle retry button
  $(document).on('click', '#retry-btn', function() {
    hidePopup();
  });

  // Handle next question button
  $(document).on('click', '#next-btn', function() {
    currentQuestion++; // Increment the current question number
    sessionStorage.setItem('currentQuestion', currentQuestion); // Store the new question number

    // Check if the next question exists
    if (currentQuestion <= totalQuestions) {
      window.location.href = currentQuestion + '.html'; // Navigate to the next question
    } else {
      showFinalScore(); // If no next question, show final score
    }
  });
});

// Function to show final score
function showFinalScore() {
  $('#popup-title').text('Kuis selesai');
  $('#popup-message').text(`Skor akhir anda adalah : ${score} jawaban benar!`);
  $('#popup-buttons').html(`
    <button id="restart-btn" class="btn btn-primary">Bermain lagi</button>
    <button id="home-btn" class="btn btn-secondary">Kembali ke Homepage</button>
  `);
  
  $('#popup, #overlay').fadeIn(); // Show both the popup and the overlay
}

// Handle restart button
$(document).on('click', '#restart-btn', function() {
  sessionStorage.removeItem('score'); // Reset the score
  sessionStorage.setItem('currentQuestion', 1); // Reset the current question
  window.location.href = '1.html'; // Go back to the first question
});

// Handle back to homepage button
$(document).on('click', '#home-btn', function() {
  sessionStorage.removeItem('score'); // Clear the score when going back to homepage
  sessionStorage.setItem('currentQuestion', 1); // Optionally reset current question
  window.location.href = '../index.html'; // Go back to the homepage
});

// Function to show popup
function showPopup(title, message, showNext) {
  $('#popup-title').text(title);
  $('#popup-message').text(message);
  
  if (showNext) {
    $('#popup-buttons').html('<button id="next-btn" class="btn btn-primary">Selanjutnya</button>');
  } else {
    $('#popup-buttons').html('<button id="retry-btn" class="btn btn-secondary">Ulangi</button>');
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
