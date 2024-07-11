import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Quiz.scss';

const Quiz = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [questionCountId, setQuestionCountId] = useState(1);
    const [resultText, setResultText] = useState('');
    // const [btnClass, setBtnClass] = useState('');
    // const [isCorrect, setIsCorrect] = useState(null);
    // const [userAnswer, setUserAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [questionCountLimit, setQuestionCountLimit] = useState('');
    const [questionCountInput, setQuestionCountInput] = useState('');
    const [optionClsName, setOptionClsName] = useState('');

    const baseURL = `${process.env.REACT_APP_API_URL}/quiz`;
    const navigate = useNavigate();

    //validation check
    const validateQuestionCountLimit = () => {
        const count = parseInt(questionCountLimit);
        return !isNaN(count) && count > 0;
    };

    const handleInputChange = (event) => {
        setQuestionCountInput(event.target.value);
        setQuestionCountLimit(event.target.value); // Set question count limit as the user types
    };

    const handleClick = async (id) => {
        if (!validateQuestionCountLimit()) {
            setMessage('Please enter a valid question count limit.');
            return;
        }

        if (Number(questionCountLimit) + 1 === Number(id)) {
            setMessage('End of Questions, redirecting to home page');
            //navigate to home page
            //Navigate to results page instead
            setTimeout(() => navigate('/'), 2500);
        } else {
            try {
                const response = await axios.get(`${baseURL}/${id}`);
                console.log(response.data,"data");
                setQuestions(response.data);
                setLoading(false);
                setQuestionCountId(prevCount => prevCount + 1);
                setResultText('');
                // setBtnClass('');
            } catch (error) {
                console.log(error, "Error getting questions");
                if (error.response?.data.message) {
                    setMessage('End of Questions, redirecting to home page');
                    //navigate to home page
                    //Navigate to results page instead
                    setTimeout(() => navigate('/'), 2500);
                }
            }
        }
    }

    const handleClickOption = (id, answer) => {
        setTimeout(() => handleClick(id), 1500);

        if (answer === questions.correct_answer) {
            setOptionClsName(questions.correct_answer);
            setResultText('Correct');
            // setIsCorrect(answer === questions.correctAnswer);
            // setUserAnswer(answer);
        } else {
            setResultText('Incorrect');
        }
    }

    if (loading) {
        return (
                <div className="quiz-hero">
                    <h3 className="quiz-hero__text">Let's dive into the pool of questions</h3>
                    <div className="quiz-start">
                        <input
                            type='text'
                            name='questionCount'
                            placeholder='Question count limit'
                            value={questionCountInput}
                            onChange={handleInputChange}
                            className="quiz-start__input"
                        />
                        <button className="quiz-start__btn" onClick={() => handleClick(questionCountId)}>Start</button>

                    </div>

                </div>
        )
    }

    if (message) {
        return (
            <div class='quiz-questionsEnd'>
                {message}
            </div>
        )
    }

    return (
        <>
            <div className="quiz-container">
                <h5 className="quiz-container__question">{questions.question}</h5>
                <div className="quiz-btnContainer">
                    <button onClick={() => handleClickOption(questionCountId, 'True')} className={`quiz-btnContainer__btn  ${optionClsName === 'True' ? 'quiz-btnContainer__btn--correct':'quiz-btnContainer__btn--incorrect'}`}>True</button>
                    <button onClick={() => handleClickOption(questionCountId, 'False')} className={`quiz-btnContainer__btn  ${optionClsName === 'True' ? 'quiz-btnContainer__btn--correct':'quiz-btnContainer__btn--incorrect'}`}>False</button>
                </div>
                {resultText && <h5 className="quiz-container__text">{`Your answer is: ${resultText}`}</h5>}
            </div>
        </>

    )
}

export default Quiz;