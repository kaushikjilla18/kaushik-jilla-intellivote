import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import './Quiz.scss';

const Quiz = () => {

    const params = useParams();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [questionCountId, setQuestionCountId] = useState(1);
    const [resultText, setResultText] = useState('');
    const [btnClass, setBtnClass] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');

    const baseURL = 'http://localhost:5050/quiz';

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`${baseURL}/${id}`);
            setQuestions(response.data);
            setLoading(false);
            setQuestionCountId(prevCount => prevCount + 1);
            setResultText('');
            setBtnClass('');
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const handleClickOption = (id, answer) => {
        setTimeout(() => handleClick(id), 2000);
        console.log(questions.correct_answer, "correct answer")
        if (answer === questions.correct_answer) {
            setResultText('Correct');
            setBtnClass('quiz-btnContainer__btn--primary');
            setIsCorrect(answer === questions.correctAnswer);
            setUserAnswer(answer);
        } else {
            setResultText('Incorrect');
        }
    }

    if (loading) {
        return (
            <div>
                <h3>Let's dive into the pool of questions</h3>
                <button className="App-header__link-btn" onClick={() => handleClick(questionCountId)}>Start</button>
            </div>
        )
    }

    return (
        <>
            <div className="quiz-container">
                <h5 className="quiz-container__question">{questions.question}</h5>
                <div className="quiz-btnContainer">
                    <button onClick={(e) => handleClickOption(questionCountId, 'True')} className={`quiz-btnContainer__btn ${isCorrect !== null && 'True' === questions.correctAnswer ? 'quiz-btnContainer__btn--primary' : isCorrect !== null && 'False' === userAnswer ? 'quiz-btnContainer__btn--incorrect' : ''}`}>True</button>
                    <button onClick={(e) => handleClickOption(questionCountId, 'False')} className={`quiz-btnContainer__btn ${isCorrect !== null && 'False' === questions.correctAnswer ? 'quiz-btnContainer__btn--primary' : isCorrect !== null && 'True' === userAnswer ? 'quiz-btnContainer__btn--incorrect' : ''}`}>False</button>
                </div>
            </div>
            {resultText && <h5>{`Your answer is: ${resultText}`}</h5>}
        </>

    )
}

export default Quiz;