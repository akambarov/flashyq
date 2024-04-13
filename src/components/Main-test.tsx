import React, { useState, useEffect } from 'react';
import '../styles/Main.css';

interface Question {
    question: string;
    answer: string;
    options: string[];
}

function Main() {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [showAnswers, setShowAnswers] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);

    useEffect(() => {
        if (quizQuestions.length > 0 && showQuiz) {
            setCurrentQuestionIndex(0);
            setUserAnswers({});
        }
    }, [quizQuestions, showQuiz]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        let selectedFile: File | null = null;
        if (e.type === 'change' && (e.target as HTMLInputElement).files) {
            selectedFile = (e.target as HTMLInputElement).files![0];
        } else if (e.type === 'drop' && (e as React.DragEvent<HTMLDivElement>).dataTransfer.files) {
            selectedFile = (e as React.DragEvent<HTMLDivElement>).dataTransfer.files![0];
        }

        if (selectedFile && selectedFile.name.endsWith('.csv')) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setErrorMessage('');
            setShowQuiz(false);
        } else {
            setErrorMessage('You need to upload a .csv file.');
        }
    };

    const parse_csv = async (file: File) => {
        return new Promise<Question[]>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                const rows = text.split('\n').slice(1); // ignore the first row
                const data = rows.map((row: string) => {
                    const [question, answer] = row.split(',');
                    // remove rows with empty question or answer
                    if (question.trim() && answer.trim()) {
                        return { question, answer, options: [] };
                    }
                    return null;
                }).filter(Boolean) as Question[]; // remove undefined entries
                
                if (data.length < 10) {
                    setErrorMessage('The file doesn\'t contain enough questions.');
                    setShowQuiz(false);
                } else if (new Set(data.map(q => q.answer)).size < 4) {
                    setErrorMessage('The file doesn\'t contain enough unique answer options.');
                    setShowQuiz(false);
                } else {
                    resolve(data);
                }                
            };
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    const handleStartQuiz = async () => {
        if (!file) {
            setErrorMessage('Please upload a .csv file before starting the quiz.');
            return;
        }

        const questions = await parse_csv(file);
        const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
        const updatedQuestions = selectedQuestions.map(question => ({
            ...question,
            options: generateOptions(questions, question.answer)
        }));
        setQuizQuestions(updatedQuestions);
        setShowQuiz(true);
        setScore(0); // Reset score when starting a new quiz
        setShowAnswers(false); // Reset showAnswers state when starting a new quiz
    };

    const generateOptions = (allQuestions: Question[], correctAnswer: string): string[] => {
        let options = new Set<string>([correctAnswer]);
        while (options.size < 4) {
            const randomIndex = Math.floor(Math.random() * allQuestions.length);
            const randomAnswer = allQuestions[randomIndex].answer;
            // ensure the random answer is not empty
            if (randomAnswer) {
                options.add(randomAnswer);
            }
        }
        return Array.from(options).sort(() => 0.5 - Math.random());
    };

    const handleAnswer = (answer: string) => {
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer });
        setIsOptionSelected(true); // Set to true when an option is selected
    };

    const handleNext = () => {
        if (!isOptionSelected) {
            return; // Do nothing if no option is selected
        }
        // Proceed with the next question
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsOptionSelected(false); // Reset option selection state for the next question
        } else {
            setShowQuiz(false);
            calculateScore();
        }
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        quizQuestions.forEach((question, index) => {
            if (question.answer === userAnswers[index]) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
    };

    const handleShowAnswers = () => {
        setShowAnswers(true);
        setShowResults(false); // Hide quiz results when showing answers
    };

    const handleBackToResults = () => {
        setShowAnswers(false);
        setShowResults(true); // Show quiz results again
    };

    const getEmoji = (percentage: number) => {
        if (percentage >= 85) return '😄'; // Very happy
        if (percentage >= 70) return '😊'; // Happy
        if (percentage >= 50 && percentage <= 60) return '😐'; // Not happy not sad
        if (percentage >= 35) return '😞'; // Sad
        return '😢'; // Very sad
    };

    const scorePercentage = Math.round((score / quizQuestions.length) * 100);
    const emoji = getEmoji(scorePercentage);

    return (
        <div className="container">
            {!showQuiz && score === 0 && (
                <>
                    <div className="row-btns">
                        <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDragEnter={() => setIsDragging(true)} onDragLeave={() => setIsDragging(false)} onDrop={handleFileChange}>
                            <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
                            <button className={`upload-btn ${isDragging ? 'drag-hover' : ''}`} onClick={() => (document.querySelector('.drop-zone input[type=file]') as HTMLInputElement)?.click()}>
                                <span className="material-symbols-outlined upload-icon">upload_file</span> 
                                {fileName ? (fileName.length > 15 ? fileName.substring(0, 15) + '...' : fileName) : 'Upload .csv file'}
                            </button>
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="error-box">
                            <span className="error-message">{errorMessage}</span>
                        </div>
                    )}
                    <div className="row-btns">
                        <button className="start-quiz-btn" onClick={handleStartQuiz}>Start Quiz</button>
                    </div>
                </>
            )}
            {showQuiz && (
                <div className="quiz-box">
                    <div className="question">{quizQuestions[currentQuestionIndex].question}</div>
                    <ul className="options">
                        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                            <li key={index} className={`option-btn ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}`} onClick={() => handleAnswer(option)}>{option}</li>
                        ))}
                    </ul>
                    <div className="row-btns">
                        <button className="quiz-style next-btn" onClick={handleNext} disabled={!isOptionSelected}>{currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}</button>
                    </div>
                </div>
            )}
            {showAnswers && (
                <div className="answers-box">
                    <div className="table-area">
                        <table>
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Your Answer</th>
                                    <th>Correct Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizQuestions.map((question, index) => (
                                    <tr key={index}>
                                        <td>{question.question}</td>
                                        <td className={userAnswers[index] === question.answer ? 'correct' : 'incorrect'}>{userAnswers[index]}</td>
                                        <td>{question.answer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row-btns">
                        <button className="quiz-style back-btn" onClick={handleBackToResults}>
                            <span className="material-symbols-outlined btn-icon">arrow_back_ios_new</span>
                            Back
                        </button>
                    </div>
                </div>
            )}
            {score !== 0 && !showAnswers && (
                <div className="result-box">
                    <div className="result-header">
                        <p>{emoji} Your score: {score}/{quizQuestions.length}</p>
                    </div>
                    <div className="row-btns">
                        <button className="quiz-style reset-btn" onClick={() => window.location.reload()}>
                            <span className="material-symbols-outlined btn-icon">restart_alt</span>
                            Reset Quiz
                        </button>
                        <button className="quiz-style retry-btn" onClick={handleStartQuiz}>
                            <span className="material-symbols-outlined btn-icon">refresh</span>
                            Retry Quiz
                        </button>
                        <button className="quiz-style show-answers-btn" onClick={handleShowAnswers}>
                            <span className="material-symbols-outlined btn-icon">download_done</span>
                            Show Answers
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;