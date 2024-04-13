import React, { useState } from 'react';
import '../styles/Quiz.css';
import { QuizProps } from './types';

const Quiz: React.FC<QuizProps> = ({ question, options, userAnswer, onSelectAnswer, onNext, isOptionSelected, isLastQuestion }) => {

    const handleAnswer = (answer: string) => {
        onSelectAnswer(answer);
    };

    return (
        <div className="quiz-box">
            <div className="question">{question}</div>
            <ul className="options">
                {options.map((option, index) => (
                    <li key={index} className={`option-btn ${userAnswer === option ? 'selected' : ''}`} onClick={() => handleAnswer(option)}>
                        {option}
                    </li>
                ))}
            </ul>
            <div className="row-btns">
                <button className="quiz-style next-btn" onClick={onNext} disabled={!isOptionSelected}>
                    {isLastQuestion ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Quiz;