
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VotingPage.scss';
import axios from "axios";

function VotingPage() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState('');
    const [optionType, setOptionType] = useState('');
    const [error, setError] = useState('');


    const baseURL = 'http://localhost:5050';
    const navigate = useNavigate();

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleOptionTypeChange = (event) => {
        console.log(event.target.value);
        setOptionType(event.target.value);
    };

    const handleCreateClick = async () => {
        if (!question.trim()) {
            setError('Please enter a question.');
            return;
        }
        if (!optionType) {
            setError('Please select an option type.');
            return;
        }

        if (selectedOption === 'radio') {
            setOptions(['Yes', 'No']); // Example options for radio
        }
        // Example options for checkbox
        // else if (selectedOption === 'checkbox') {
        //     setOptions(['Definetely Yes', 'Not sure', 'No way']); 
        // }

        const newQuestion = {
            question: question,
            yes: 0,
            no: 0
        };
        try {
            const response = await axios.post(`${baseURL}/questions`, newQuestion);
            console.log(response.data);
            navigate(`/voting/${response.data[response.data.length - 1].qid}`);
            setShowResults(true);
            console.log(response);
            setShowForm(true);
            // Reset error message
            setError('');
            if (selectedOption === 'radio') {
                setOptions(['Yes', 'No']); // Example options for radio
            }
            // Example options for checkbox
            // if (selectedOption === 'checkbox') {
            //     setOptions(['Definetely Yes', 'Not sure', 'No way']); 
            // }
        } catch (error) {
            console.log(error, "Error posting the question");
        }
    };

    return (
        <div className="voting-app">
            <h2>Poll App</h2>
            {!showForm && (
                <div className='voting-container'>
                    <div className="form-group">
                        <label>Question:</label>
                        <input
                            type="text"
                            value={question}
                            onChange={handleQuestionChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Options:</label>
                        <select value={optionType} onChange={handleOptionTypeChange}>
                            <option value="">Select Option Type</option>
                            <option value="radio">Radio Button</option>
                        </select>
                    </div>
                    <div>
                        <button className="create-btn" onClick={handleCreateClick}>Create</button>
                    </div>
                </div>)}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default VotingPage;


