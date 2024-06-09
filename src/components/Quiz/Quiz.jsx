import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
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
    const [message, setMessage] = useState('');
    const [questionCountLimit, setQuestionCountLimit] = useState('');
    const [questionCountInput, setQuestionCountInput] = useState('');

    const baseURL = 'http://localhost:5050/quiz';
    const navigate = useNavigate();

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
            console.log(questionCountLimit, "questionCountLimit");
            console.log(id, "id");
            setMessage('End of Questions, redirecting to home page');
            //navigate to home page
            //Navigate to results page instead
            setTimeout(() => navigate('/'), 2500);
        } else {
            try {
                const response = await axios.get(`${baseURL}/${id}`);
                setQuestions(response.data);
                setLoading(false);
                setQuestionCountId(prevCount => prevCount + 1);
                setResultText('');
                setBtnClass('');
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

        //    if( id <= questionCountLimit){
        setTimeout(() => handleClick(id), 1500);
        //    } else{
        //     setMessage('End of Questions, redirecting to home page');
        //    }
        console.log(questions.correct_answer, "correct answer")
        if (answer === questions.correct_answer) {
            setResultText('Correct');
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
                <input
                    type='text'
                    name='questionCount'
                    placeholder='Question count limit'
                    value={questionCountInput}
                    onChange={handleInputChange}
                />
                <button className="App-header__link-btn" onClick={() => handleClick(questionCountId)}>Start</button>
            </div>
        )
    }

    if (message) {
        return (
            <div>
                {message}
            </div>
        )
    }

    return (
        <>
            <div className="quiz-container">
                <h5 className="quiz-container__question">{questions.question}</h5>
                <div className="quiz-btnContainer">
                    <button onClick={(e) => handleClickOption(questionCountId, 'True')} className={`quiz-btnContainer__btn`}>True</button>
                    <button onClick={(e) => handleClickOption(questionCountId, 'False')} className={`quiz-btnContainer__btn`}>False</button>
                </div>
            </div>
            {resultText && <h5>{`Your answer is: ${resultText}`}</h5>}
        </>

    )
}

export default Quiz;