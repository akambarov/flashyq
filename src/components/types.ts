export interface Question {
    question: string;
    answer: string;
    options: string[];
}

export interface FileUploadProps {
    onFileChange: (file: File | null) => void;  
    errorMessage: string;
}

export interface QuizProps {
    question: string;
    options: string[];
    userAnswer: string | null;
    onSelectAnswer: (answer: string) => void;
    onNext: () => void;
    isOptionSelected: boolean;
    isLastQuestion: boolean;
}

export interface ResultProps {
    emoji: string;
    score: number;
    totalQuestions: number;
    onResetQuiz: () => void;
    onRetryQuiz: () => void;
    onShowAnswers: () => void;
}