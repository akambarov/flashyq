import { Question } from './types';

const parseCSV = async (file: File): Promise<Question[]> => {
    return new Promise<Question[]>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text.split('\n').slice(1); // ignore the first row
            const data = rows.map((row: string) => {
                const [question, answer] = row.split(',');
                // remove rows with empty question/answer
                if (question.trim() && answer.trim()) {
                    return { question, answer, options: [] };
                }
                return null;
            }).filter(Boolean) as Question[]; // remove undefined entries
            
            if (data.length < 10) {
                reject('The file doesn\'t contain enough questions.');
            } else if (new Set(data.map(q => q.answer)).size < 4) {
                reject('The file doesn\'t contain enough unique answer options.');
            } else {
                resolve(data);
            }                
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};

export default parseCSV;