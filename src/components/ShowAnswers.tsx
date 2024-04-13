import React from 'react';
import '../styles/ShowAnswers.css';
import { Question } from './types';

interface Props {
    quizQuestions: Question[];
    userAnswers: { [key: number]: string };
    onBackToResults: () => void;
}

const ShowAnswers: React.FC<Props> = ({ quizQuestions, userAnswers, onBackToResults }) => {
    return (
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
                <button className="quiz-style back-btn" onClick={onBackToResults}>
                    <span className="material-symbols-outlined btn-icon">arrow_back_ios_new</span>
                    Back
                </button>
            </div>
        </div>
    );
};

export default ShowAnswers;