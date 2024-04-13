import React from 'react';
import '../styles/Main.css';
import FileUpload from './FileUpload';
import Quiz from './Quiz';
import Result from './Result';
import ShowAnswers from './ShowAnswers';
import { useHandlers } from './Handlers';

function Main() {
    const {
        errorMessage,
        showQuiz,
        score,
        quizQuestions,
        currentQuestionIndex,
        userAnswers,
        isOptionSelected,
        showAnswers,
        showResults,
        handleFileChange,
        handleStartQuiz,
        handleAnswer,
        handleNext,
        handleShowAnswers,
        handleBackToResults,
        handleRetryQuiz,
        getEmoji
    } = useHandlers();

    const scorePercentage = Math.round((score / quizQuestions.length) * 100);
    const emoji = getEmoji(scorePercentage);

    return (
        <div className="container">
            {!showQuiz && score === 0 && !showResults && !showAnswers && (
                <>
                    <FileUpload onFileChange={handleFileChange} errorMessage={errorMessage} />
                    <div className="starter-btns">
                        <button className="start-quiz-btn" onClick={handleStartQuiz}>Start Quiz</button>
                    </div>
                </>
            )}
            {showQuiz && (
                <Quiz
                    question={quizQuestions[currentQuestionIndex].question}
                    options={quizQuestions[currentQuestionIndex].options}
                    userAnswer={userAnswers[currentQuestionIndex]}
                    onSelectAnswer={(answer: string) => handleAnswer(answer)}
                    onNext={handleNext}
                    isOptionSelected={isOptionSelected}
                    isLastQuestion={currentQuestionIndex === quizQuestions.length - 1}
                />
            )}
            {showAnswers && (
                <ShowAnswers
                    quizQuestions={quizQuestions}
                    userAnswers={userAnswers}
                    onBackToResults={handleBackToResults}
                />
            )}
            {showResults && (
                <Result
                    emoji={emoji}
                    score={score}
                    totalQuestions={quizQuestions.length}
                    onResetQuiz={() => window.location.reload()}
                    onRetryQuiz={() => { handleRetryQuiz(); handleStartQuiz(); }}
                    onShowAnswers={handleShowAnswers}
                />
            )}
        </div>
    );
}

export default Main;