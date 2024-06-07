import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const Quiz = () => {

    const params = useParams();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [questionCountId, setQuestionCountId] = useState(1);

    const baseURL = 'http://localhost:5050/quiz';

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`${baseURL}/${id}`);
            setQuestions(response.data);
            setLoading(false);
            setQuestionCountId(prevCount => prevCount + 1);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    // const selectedQuestionId = questionCountId;

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
            <h5>{questions.question}</h5>
            <div>
                <button onClick={() => handleClick(questionCountId)}>True</button>
                <button>False</button>
            </div>
        </>

    )
}

export default Quiz;