let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timer = 60; // Total game time in seconds
let interval;
const questionsAnswered = []; // Array to track answered questions

const questions = [
    {
        question: "Ada berapa ribu bukit di kawasan gunung sewu?",
        image: "resources/1_13.jpg",
        options: ["30.000", "40.000", "20.000"],
        correctAnswer: "1"
    },
    {
        question: "Nama batu yang dijadikan bahan beliung adalah?",
        image: "resources/2.jpg",
        options: ["Batu Sedimen", "Batu Kapur", "Batu Rijang"],
        correctAnswer: "2"
    },
	{
        question: "Ada berapa batu yang ditemukan oleh Van Koeningswald pada tahun 1935 di Kali Baksoka?",
        image: "resources/3.jpg",
        options: ["1000", "2000", "3000"],
        correctAnswer: "2"
    },
    {
        question: "Batu yang ada di Kali Baksoka disebut dengan Istilah?",
        image: "resources/4.jpg",
        options: ["Pacitanian", "Paleolitik", "Pacitanianisme"],
        correctAnswer: "0"
    },
	{
        question: "Mbah Sayem diperkirakan hidup berapa tahun yang lalu?",
        image: "resources/5_18.jpg",
        options: ["10.000 ", "8.500", "6.000"],
        correctAnswer: "1"
    },
    {
        question: "Limbah batu yang masih digunakan untuk menguliti dan mengiris binatang buruan disebut?",
        image: "resources/6.webp",
        options: ["Serpih", "Kapak", "Perkutor"],
        correctAnswer: "0"
    },
	{
        question: "Rangka Song Keplek V termasuk ke dalam Ras?",
        image: "resources/7.jpg",
        options: ["Ras Australomelanesid", "Ras Mongolid", "Ras Melayunesoid"],
        correctAnswer: "2"
    },
    {
        question: "Situs Eponym merupakan sebutan untuk situs?",
        image: "resources/8.JPG",
        options: ["Situs yang menghasilkan batu", "Situs yang bernama sesuai dengan nama wilayah temuan", "Situs Purbakala"],
        correctAnswer: "1"
    },
	{
        question: "Fungsi dari Perkutor adalah?",
        image: "resources/9.jpg",
        options: ["Alat Pemangkas dalam pembentukan batu", "Alat untuk Beburu", "Alat untuk membuat api"],
        correctAnswer: "0"
    },
    {
        question: "Siapa yang membuat lukisan diatas?",
        image: "resources/10.jpg",
        options: ["Junghuhn", "Teuku Jacob", "Van Koeningswald"],
        correctAnswer: "0"
    },
	{
        question: "Ada berapa ribu bukit di kawasan gunung sewu?",
        image: "resources/1_13.jpg",
        options: ["30.000", "40.000", "20.000"],
        correctAnswer: "1"
    },
    {
        question: "Nama batu yang dijadikan bahan beliung adalah?",
        image: "resources/2.jpg",
        options: ["Batu Sedimen", "Batu Kapur", "Batu Rijang"],
        correctAnswer: "2"
    },
	{
        question: "Ada berapa batu yang ditemukan oleh Van Koeningswald pada tahun 1935 di Kali Baksoka?",
        image: "resources/3.jpg",
        options: ["1000", "2000", "3000"],
        correctAnswer: "2"
    },
    {
        question: "Batu yang ada di Kali Baksoka disebut dengan Istilah?",
        image: "resources/4.jpg",
        options: ["Pacitanian", "Paleolitik", "Pacitanianisme"],
        correctAnswer: "0"
    },
	{
        question: "Mbah Sayem diperkirakan hidup berapa tahun yang lalu?",
        image: "resources/5_18.jpg",
        options: ["10.000 ", "8.500", "6.000"],
        correctAnswer: "1"
    },
    {
        question: "Limbah batu yang masih digunakan untuk menguliti dan mengiris binatang buruan disebut?",
        image: "resources/6.webp",
        options: ["Serpih", "Kapak", "Perkutor"],
        correctAnswer: "0"
    },
	{
        question: "Rangka Song Keplek V termasuk ke dalam Ras?",
        image: "resources/7.jpg",
        options: ["Ras Australomelanesid", "Ras Mongolid", "Ras Melayunesoid"],
        correctAnswer: "2"
    },
    {
        question: "Situs Eponym merupakan sebutan untuk situs?",
        image: "resources/8.jpg",
        options: ["Situs yang menghasilkan batu", "Situs yang bernama sesuai dengan nama wilayah temuan", "Situs Purbakala"],
        correctAnswer: "1"
    },
	{
        question: "Fungsi dari Perkutor adalah?",
        image: "resources/9.jpg",
        options: ["Alat Pemangkas dalam pembentukan batu", "Alat untuk Beburu", "Alat untuk membuat api"],
        correctAnswer: "0"
    },
    {
        question: "Siapa yang membuat lukisan diatas?",
        image: "resources/10.jpg",
        options: ["Junghuhn", "Teuku Jacob", "Van Koeningswald"],
        correctAnswer: "0"
    },
];

const totalQuestions = questions.length;

function startTimer() {
    clearInterval(interval); // Clear any previous intervals
    timer = 60; // Reset timer for each game session
    interval = setInterval(function () {
        timer--;
        $('#timer').text('Waktu: ' + timer);
        if (timer <= 0) {
            clearInterval(interval);
            showTimeUpModal(); // Call function to show modal when time is up
        }
    }, 1000);
}

function showTimeUpModal() {
    // Show the modal when time is up
    $('#timeUpModal').modal('show');
    // You can add any other logic you want to handle when time is up here
}

function showAnsweredModal() {
    // Show the modal when time is up
    $('#answeredModal').modal('show');
    // You can add any other logic you want to handle when time is up here
}

function createPagination() {
    $('#pagination').empty(); // Clear any previous pagination buttons
    questions.forEach((_, index) => {
        $('#pagination').append(
            `<button class="btn btn-outline-secondary pagination-btn unanswered" data-question-index="${index}">${index + 1}</button>`
        );
    });
}

function updatePagination() {
    console.log('Questions Answered:', questionsAnswered); // Log the state of questionsAnswered array
    $('#pagination .pagination-btn').each(function () {
        const questionIndex = $(this).data('question-index'); // Get question index from button
        const questionStatus = questionsAnswered[questionIndex]; // Check the status of this question
        console.log(`Updating Pagination for Question ${questionIndex}, Status:`, questionStatus); // Log the update process
        
        $(this).removeClass('correct incorrect unanswered active'); // Reset classes before updating them

        if (questionStatus) {
            if (questionStatus.answer == questions[questionIndex].correctAnswer) {
                $(this).css({'background-color': '#198754', 'color': 'white', 'border-color': 'green'}); // Mark as correct
            } else {
                $(this).css({'background-color': '#dc3545', 'color': 'white', 'border-color': 'red'}); // Mark as incorrect
            }
        } else {
            $(this).css({'background-color': 'white', 'color': 'grey', 'border-color': 'grey'}); // If unanswered, keep it grey
        }
    });
    $('#pagination .pagination-btn').removeClass('active');
    $(`#pagination .pagination-btn[data-question-index="${currentQuestionIndex}"]`).addClass('active'); // Highlight the active button
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    $('.card-img-top').attr('src', currentQuestion.image);
    $('.card-text').text(currentQuestion.question);

    $('#answer-options').empty(); // Clear previous options
    currentQuestion.options.forEach((option, index) => {
        $('#answer-options').append(
            `<button class="btn btn-block btn-outline-primary mb-2 answer-btn" data-answer="${index}">${option}</button>`
        );
    });
    $('#progress-bar').css('width', ((currentQuestionIndex + 1) / totalQuestions) * 100 + '%');
    $('#progress-bar').text((currentQuestionIndex + 1) + '/' + totalQuestions);
    
    $('#feedback').addClass('d-none'); // Reset feedback
    $('#answer-options .answer-btn').removeClass('btn-success btn-danger');

    if (questionsAnswered[currentQuestionIndex] !== undefined) {
        $('#answer-options .answer-btn').prop('disabled', true); // Disable buttons if already answered
        const selectedAnswer = questionsAnswered[currentQuestionIndex]?.answer;
        if (selectedAnswer !== undefined) {
            if (selectedAnswer == currentQuestion.correctAnswer) {
                $(`#answer-options .answer-btn[data-answer="${selectedAnswer}"]`).addClass('btn-success'); // Mark correct answer
            } else {
                $(`#answer-options .answer-btn[data-answer="${selectedAnswer}"]`).addClass('btn-danger'); // Mark incorrect answer
                $(`#answer-options .answer-btn[data-answer="${currentQuestion.correctAnswer}"]`).addClass('btn-success'); // Show correct answer
            }
        }
    }
    updatePagination(); // Update pagination each time a question is loaded
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    console.log('Question:', currentQuestionIndex, 'Selected Answer:', selectedAnswer, 'Correct Answer:', correctAnswer); // Log the answer check
    questionsAnswered[currentQuestionIndex] = {
        answered: true,
        answer: selectedAnswer
    };
    $('#answer-options .answer-btn').prop('disabled', true);
    if (selectedAnswer == correctAnswer) {
        correctAnswers++;
        $('#feedback').removeClass('d-none alert-danger').addClass('alert-success').text('Benar!');
        $(`#answer-options .answer-btn[data-answer="${selectedAnswer}"]`).addClass('btn-success');
    } else {
        incorrectAnswers++;
        $('#feedback').removeClass('d-none alert-success').addClass('alert-danger').text('Salah!');
        $(`#answer-options .answer-btn[data-answer="${selectedAnswer}"]`).addClass('btn-danger');
        $(`#answer-options .answer-btn[data-answer="${correctAnswer}"]`).addClass('btn-success');
    }
    $('#correct-score').text('Benar: ' + correctAnswers);
    $('#incorrect-score').text('Salah: ' + incorrectAnswers);
    $('#next-btn').prop('disabled', false);
    updatePagination();
}

$('#next-btn').click(function () {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        clearInterval(interval);
        showAnsweredModal(); // Show the modal when the quiz ends
    }
});

function endQuiz() {
    clearInterval(interval);
    localStorage.setItem('correctAnswers', correctAnswers); // Store the score
    window.location.href = "../score/score.html"; // Redirect to final score page
}


$('#prev-btn').click(function () {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

$(document).on('click', '#answer-options .answer-btn', function () {
    const selectedAnswer = $(this).data('answer');
    checkAnswer(selectedAnswer);
});

$(document).on('click', '.pagination-btn', function () {
    const questionIndex = $(this).data('question-index');
    currentQuestionIndex = questionIndex;
    loadQuestion();
});

$(document).ready(function () {
    startTimer();
    createPagination();
    loadQuestion();
});
