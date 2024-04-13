import React, { useState } from 'react';
import '../styles/Info.css';

function Info() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="info-btn" onClick={openModal}>
                <span className="material-symbols-outlined info-icon">question_mark</span>
            </button>
            <div className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="modal-content">
                    <span className="material-symbols-outlined close-btn" onClick={closeModal}>close</span>

                    The file you need to upload should be in .csv format and consist of two columns. The first column entries should be questions and the second column entries should be their corresponding answers. Here's an example:

                    <pre className="sample-csv"> 
                        Word,Meaning <br /> 
                        Aberrant,deviating from the norm <br />
                        Abstruse,difficult to understand; obscure <br />
                        Arduous,requiring strenuous effort <br />
                        Benevolent,well meaning and kindly <br />
                        Effulgent,shining brightly; radiant <br />
                        ...
                    </pre>
                    <div className="small-note">*The first row will be ignored.</div>

                    After uploading the file, click the "Start Quiz" button to begin the quiz. The quiz consists of 10 questions, which are randomly selected from the first column of the uploaded file. Each question will have 4 options, ordered randomly. One of these options will be the correct answer, and the other three will be randomly selected from the second column of the uploaded file. Upon completion of the quiz, you can view your score, see which questions you answered correctly/incorrectly, and restart the quiz.
                </div>
            </div>
        </>
    );
}

export default Info;