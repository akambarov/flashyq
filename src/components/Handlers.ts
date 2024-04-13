import { useState, useEffect } from 'react';
import { Question } from './types';
import parseCSV from './ParseCSV';
import { generateOptions, calculateScore } from './QuizUtils';

export function useHandlers() {
    const [file, setFile] = useState<File | null>(null);
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [errorMessage, setErrorMessage] = useState<string>('');
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

    function handleFileChange(selectedFile: File | null) {
        if (selectedFile) {
            setFile(selectedFile);
            setErrorMessage('');
            setShowQuiz(false);
        } else {
            setErrorMessage('You need to upload a .csv file.');
        }
    }

    async function handleStartQuiz() {
        if (!file) {
            setErrorMessage('Please upload a .csv file before starting the quiz.');
            return;
        }

        try {
            const questions = await parseCSV(file);
            const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
            const updatedQuestions = selectedQuestions.map(question => ({
                ...question,
                options: generateOptions(questions, question.answer)
            }));
            setQuizQuestions(updatedQuestions);
            setShowQuiz(true);
            setScore(0);
            setShowAnswers(false);
        } catch (error: any) {
            setErrorMessage(error);
            setShowQuiz(false);
        }
    }

    function handleAnswer(answer: string) {
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer });
        setIsOptionSelected(true); 
    }

    function handleNext() {
        if (!isOptionSelected) {
            return; 
        }
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsOptionSelected(false); 
        } else {
            setShowQuiz(false);
            const calculatedScore = calculateScore(quizQuestions, userAnswers);
            setScore(calculatedScore);
            setShowResults(true);
        }
    }

    function handleShowAnswers() {
        setShowAnswers(true);
        setShowResults(false); 
        setShowQuiz(false);
    }

    function handleBackToResults() {
        setShowAnswers(false);
        setShowResults(true); 
    }

    function handleRetryQuiz() {
        setShowResults(false);
    //   setCurrentQuestionIndex(0);
    //   setShowQuiz(true);
    };

    function getEmoji(percentage: number) {
        if (percentage >= 85) return '😄'; // very happy
        if (percentage >= 70) return '😊'; // happy
        if (percentage >= 50 && percentage <= 60) return '😐'; // not happy not sad
        if (percentage >= 35) return '😞'; // sad
        return '😢'; // very sad
    }

    return {
        file,
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
    };
}