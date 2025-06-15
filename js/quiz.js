 
class MathQuiz {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timeLeft = 300; // 5 minutes
        this.timer = null;
        this.selectedCategory = '';
    }

    // Question database
    static getQuestions(category) {
        const questionBank = {
            algebra: [
                {
                    question: "Giải phương trình: 2x + 5 = 13",
                    options: ["x = 4", "x = 3", "x = 5", "x = 6"],
                    correct: 0,
                    explanation: "2x + 5 = 13 ⟹ 2x = 8 ⟹ x = 4"
                },
                {
                    question: "Tìm tập nghiệm của bất phương trình: x - 3 > 7",
                    options: ["x > 10", "x < 10", "x > 4", "x < 4"],
                    correct: 0,
                    explanation: "x - 3 > 7 ⟹ x > 10"
                },
                {
                    question: "Cho hàm số f(x) = 2x² - 3x + 1. Tính f(2)",
                    options: ["f(2) = 3", "f(2) = 5", "f(2) = 7", "f(2) = 1"],
                    correct: 0,
                    explanation: "f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3"
                },
                {
                    question: "Phương trình x² - 5x + 6 = 0 có nghiệm là:",
                    options: ["x = 2, x = 3", "x = 1, x = 6", "x = -2, x = -3", "x = 0, x = 5"],
                    correct: 0,
                    explanation: "x² - 5x + 6 = (x-2)(x-3) = 0 ⟹ x = 2 hoặc x = 3"
                },
                {
                    question: "Tập xác định của hàm số y = √(x - 2) là:",
                    options: ["[2; +∞)", "(-∞; 2]", "(2; +∞)", "(-∞; 2)"],
                    correct: 0,
                    explanation: "Để √(x - 2) có nghĩa thì x - 2 ≥ 0 ⟹ x ≥ 2"
                }
            ],
            geometry: [
                {
                    question: "Diện tích hình tròn có bán kính 5cm là:",
                    options: ["25π cm²", "10π cm²", "15π cm²", "20π cm²"],
                    correct: 0,
                    explanation: "S = πr² = π × 5² = 25π cm²"
                },
                {
                    question: "Trong tam giác vuông, nếu hai cạnh góc vuông là 3 và 4 thì cạnh huyền là:",
                    options: ["5", "6", "7", "12"],
                    correct: 0,
                    explanation: "Theo định lý Pythagore: c² = 3² + 4² = 9 + 16 = 25 ⟹ c = 5"
                },
                {
                    question: "Thể tích hình cầu có bán kính 3cm là:",
                    options: ["36π cm³", "27π cm³", "18π cm³", "12π cm³"],
                    correct: 0,
                    explanation: "V = (4/3)πr³ = (4/3)π × 3³ = (4/3)π × 27 = 36π cm³"
                },
                {
                    question: "Chu vi hình vuông có cạnh 8cm là:",
                    options: ["32cm", "24cm", "16cm", "64cm"],
                    correct: 0,
                    explanation: "Chu vi hình vuông = 4 × cạnh = 4 × 8 = 32cm"
                },
                {
                    question: "Góc nội tiếp chắn nửa đường tròn có số đo:",
                    options: ["90°", "45°", "60°", "120°"],
                    correct: 0,
                    explanation: "Góc nội tiếp chắn nửa đường tròn luôn là góc vuông = 90°"
                }
            ],
            calculus: [
                {
                    question: "Đạo hàm của hàm số f(x) = x³ là:",
                    options: ["f'(x) = 3x²", "f'(x) = 3x", "f'(x) = x²", "f'(x) = 3x³"],
                    correct: 0,
                    explanation: "Áp dụng công thức (xⁿ)' = n.xⁿ⁻¹: (x³)' = 3x²"
                },
                {
                    question: "∫2x dx bằng:",
                    options: ["x² + C", "2x² + C", "x + C", "2x + C"],
                    correct: 0,
                    explanation: "∫2x dx = 2∫x dx = 2 × (x²/2) + C = x² + C"
                },
                {
                    question: "Giới hạn lim(x→∞) (1/x) bằng:",
                    options: ["0", "1", "∞", "-∞"],
                    correct: 0,
                    explanation: "Khi x tiến tới vô cùng, 1/x tiến tới 0"
                },
                {
                    question: "Đạo hàm của sin(x) là:",
                    options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
                    correct: 0,
                    explanation: "Công thức cơ bản: (sin x)' = cos x"
                },
                {
                    question: "Tích phân ∫₀¹ x dx bằng:",
                    options: ["1/2", "1", "2", "0"],
                    correct: 0,
                    explanation: "∫₀¹ x dx = [x²/2]₀¹ = 1²/2 - 0²/2 = 1/2"
                }
            ]
        };

        // Mix questions for mixed category
        if (category === 'mixed') {
            const allQuestions = [
                ...questionBank.algebra.slice(0, 2),
                ...questionBank.geometry.slice(0, 2),
                ...questionBank.calculus.slice(0, 1)
            ];
            return allQuestions.sort(() => Math.random() - 0.5);
        }

        return questionBank[category] || [];
    }
}

// Global quiz instance
let quiz = null;

// Calculator variables
let calcDisplay = '0';
let calcPrevious = null;
let calcOperator = null;
let calcWaitingForNewInput = false;

// Start quiz
function startQuiz(category) {
    quiz = new MathQuiz();
    quiz.selectedCategory = category;
    quiz.questions = MathQuiz.getQuestions(category);
    quiz.currentQuestion = 0;
    quiz.score = 0;
    quiz.userAnswers = [];
    quiz.timeLeft = 300;

    // Hide selection, show quiz
    document.getElementById('quiz-selection').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';

    // Set quiz title
    const titles = {
        algebra: 'Quiz Đại Số',
        geometry: 'Quiz Hình Học', 
        calculus: 'Quiz Giải Tích',
        mixed: 'Quiz Tổng Hợp'
    };
    document.getElementById('quiz-title').textContent = titles[category];

    loadQuestion();
    startTimer();
}

// Load current question
function loadQuestion() {
    if (!quiz || quiz.currentQuestion >= quiz.questions.length) {
        endQuiz();
        return;
    }

    const question = quiz.questions[quiz.currentQuestion];
    const questionNumber = quiz.currentQuestion + 1;
    const totalQuestions = quiz.questions.length;

    // Update UI
    document.getElementById('question-counter').textContent = `${questionNumber}/${totalQuestions}`;
    document.getElementById('question-number').textContent = `Câu hỏi ${questionNumber}/${totalQuestions}`;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('progress-fill').style.width = `${(questionNumber / totalQuestions) * 100}%`;

    // Load options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option" onclick="selectOption(${index})" data-index="${index}">
            ${String.fromCharCode(65 + index)}. ${option}
        </div>
    `).join('');

    // Update navigation buttons
    document.getElementById('prev-btn').disabled = quiz.currentQuestion === 0;
    document.getElementById('next-btn').textContent = quiz.currentQuestion === totalQuestions - 1 ? 
        'Hoàn Thành' : 'Câu Tiếp';

    // Restore previous answer if exists
    if (quiz.userAnswers[quiz.currentQuestion] !== undefined) {
        const selectedOption = optionsContainer.children[quiz.userAnswers[quiz.currentQuestion]];
        selectedOption?.classList.add('selected');
    }
}

// Select option
function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    
    quiz.userAnswers[quiz.currentQuestion] = index;
}

// Navigation functions
function nextQuestion() {
    if (quiz.currentQuestion < quiz.questions.length - 1) {
        quiz.currentQuestion++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

function previousQuestion() {
    if (quiz.currentQuestion > 0) {
        quiz.currentQuestion--;
        loadQuestion();
    }
}

// Timer functions
function startTimer() {
    quiz.timer = setInterval(() => {
        quiz.timeLeft--;
        updateTimerDisplay();
        
        if (quiz.timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(quiz.timeLeft / 60);
    const seconds = quiz.timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// End quiz
function endQuiz() {
    if (quiz.timer) {
        clearInterval(quiz.timer);
    }

    // Calculate score
    quiz.score = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
        if (quiz.userAnswers[i] === quiz.questions[i].correct) {
            quiz.score++;
        }
    }

    // Show results
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';

    const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
    document.getElementById('final-score').textContent = `${quiz.score}/${quiz.questions.length}`;
    
    // Result message based on score
    let message = '';
    if (percentage >= 90) {
        message = 'Xuất sắc! 🎉';
    } else if (percentage >= 70) {
        message = 'Tốt lắm! 👏';
    } else if (percentage >= 50) {
        message = 'Cần cố gắng thêm! 💪';
    } else {
        message = 'Hãy ôn tập thêm nhé! 📚';
    }
    
    document.getElementById('result-message').textContent = message;
    document.getElementById('result-details').textContent = 
        `Bạn đã trả lời đúng ${quiz.score} trên ${quiz.questions.length} câu hỏi (${percentage}%).`;

    // Save result to localStorage
    saveQuizResult();
}

// Save quiz result
function saveQuizResult() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push({
        category: quiz.selectedCategory,
        score: quiz.score,
        total: quiz.questions.length,
        date: new Date().toISOString(),
        percentage: Math.round((quiz.score / quiz.questions.length) * 100)
    });
    localStorage.setItem('quizResults', JSON.stringify(results));
}

// Restart quiz
function restartQuiz() {
    startQuiz(quiz.selectedCategory);
}

// Back to selection
function backToSelection() {
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-selection').style.display = 'block';
    if (quiz.timer) {
        clearInterval(quiz.timer);
    }
}

// Calculator functions
function inputNumber(num) {
    const display = document.getElementById('calc-display');
    if (calcWaitingForNewInput) {
        calcDisplay = num;
        calcWaitingForNewInput = false;
    } else {
        calcDisplay = calcDisplay === '0' ? num : calcDisplay + num;
    }
    display.textContent = calcDisplay;
}

function inputOperator(op) {
    const display = document.getElementById('calc-display');
    
    if (calcPrevious !== null && !calcWaitingForNewInput) {
        calculate();
    }
    
    calcPrevious = parseFloat(calcDisplay);
    calcOperator = op;
    calcWaitingForNewInput = true;
}

function inputDecimal() {
    if (calcWaitingForNewInput) {
        calcDisplay = '0.';
        calcWaitingForNewInput = false;
    } else if (calcDisplay.indexOf('.') === -1) {
        calcDisplay += '.';
    }
    document.getElementById('calc-display').textContent = calcDisplay;
}

function calculate() {
    const display = document.getElementById('calc-display');
    const current = parseFloat(calcDisplay);
    
    if (calcPrevious !== null && calcOperator && !calcWaitingForNewInput) {
        let result;
        switch (calcOperator) {
            case '+':
                result = calcPrevious + current;
                break;
            case '-':
                result = calcPrevious - current;
                break;
            case '*':
                result = calcPrevious * current;
                break;
            case '/':
                result = current !== 0 ? calcPrevious / current : 'Error';
                break;
            default:
                return;
        }
        
        calcDisplay = result.toString();
        display.textContent = calcDisplay;
        calcPrevious = null;
        calcOperator = null;
        calcWaitingForNewInput = true;
    }
}

function clearCalculator() {
    calcDisplay = '0';
    calcPrevious = null;
    calcOperator = null;
    calcWaitingForNewInput = false;
    document.getElementById('calc-display').textContent = calcDisplay;
}

function clearEntry() {
    calcDisplay = '0';
    document.getElementById('calc-display').textContent = calcDisplay;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load any saved quiz results for display
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    console.log('Previous quiz results:', results);
});