import React from 'react';
import '../styles/Result.css';
import { ResultProps } from './types';

const Result: React.FC<ResultProps> = ({ emoji, score, totalQuestions, onResetQuiz, onRetryQuiz, onShowAnswers }) => {
    return (
        <div className="result-box">
            <div className="result-header">
                <p>{emoji} Your score: {score}/{totalQuestions}</p>
            </div>
            <div className="row-btns">
                <button className="quiz-style reset-btn" onClick={onResetQuiz}>
                    <span className="material-symbols-outlined btn-icon">restart_alt</span>
                    Reset Quiz
                </button>
                <button className="quiz-style retry-btn" onClick={onRetryQuiz}>
                    <span className="material-symbols-outlined btn-icon">refresh</span>
                    Retry Quiz
                </button>
                <button className="quiz-style show-answers-btn" onClick={onShowAnswers}>
                    <span className="material-symbols-outlined btn-icon">download_done</span>
                    Show Answers
                </button>
            </div>
        </div>
    );
};

export default Result;