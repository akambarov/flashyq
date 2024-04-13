import { Question } from './types';

export const generateOptions = (allQuestions: Question[], correctAnswer: string): string[] => {
    let options = new Set<string>([correctAnswer]);
    while (options.size < 4) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        const randomAnswer = allQuestions[randomIndex].answer;
        // ensure the random option is not empty
        if (randomAnswer) {
            options.add(randomAnswer);
        }
    }
    return Array.from(options).sort(() => 0.5 - Math.random());
};

export const calculateScore = (quizQuestions: Question[], userAnswers: { [key: number]: string }): number => {
    let correctAnswers = 0;
    quizQuestions.forEach((question, index) => {
        if (question.answer === userAnswers[index]) {
            correctAnswers++;
        }
    });
    return correctAnswers;
}; 