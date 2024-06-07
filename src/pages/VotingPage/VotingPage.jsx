
import React, { useState } from 'react';
import './VotingPage.scss';
import axios from "axios";

function VotingPage() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState('');

    const baseURL = 'http://localhost:5050';

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCreateClick = async () => {
        if (selectedOption === 'checkbox') {
            setOptions(['Definetely Yes', 'Not sure', 'No way']); // Example options for checkbox
        } else if (selectedOption === 'radio') {
            setOptions(['Yes', 'No']); // Example options for radio
        }

        const newQuestion = {
            question: question,
            yes: 0,
            no: 0
        };
        try {
            const response = await axios.post(`${baseURL}/questions`, newQuestion);
            setShowResults(true);
            console.log(response);
            setShowForm(true);
            if (selectedOption === 'checkbox') {
                setOptions(['Definetely Yes', 'Not sure', 'No way']); // Example options for checkbox
            } else if (selectedOption === 'radio') {
                setOptions(['Yes', 'No']); // Example options for radio
            }
            // setOptions([]); // Reset options when creating a new question
        } catch (error) {
            console.log(error);
        }
        // setShowForm(true);
        // setOptions([]); // Reset options when creating a new question
       
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Logic to submit the answer goes here
        console.log('Question:', question);
        console.log('Options:', options);
        console.log('Selected Option:', selectedOption);
        setShowResults(true);
    };

    const handleOption = (e) => {
        setResults(e.target.value);
    }

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
                            onChange={(event) => setQuestion(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Options:</label>
                        <select onChange={handleOptionChange}>
                            <option value="">Select Option Type</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Radio Button</option>
                        </select>
                    </div>
                    <div>
                        <button className="create-btn" onClick={handleCreateClick}>Create</button>
                    </div>
                </div>)}
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Question: {question}</label>
                    </div>
                    {options.length > 0 && (
                        <div className="options">
                            {options.map((option, index) => (
                                <div key={index}>
                                    {selectedOption === 'checkbox' ? (
                                        <div>
                                            <input type="checkbox" value={option} onChange={(e) => handleOption(e)} />
                                            {option}
                                        </div>
                                    ) : (
                                        <div>
                                            <input type="radio" name="option" value={option} onChange={(e) => handleOption(e)} />
                                            {option}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <button className="submit-btn" type="submit">Submit Answer</button>
                </form>
            )}
            {showResults && <h4>{`Results:${results}`}</h4>}
        </div>
    );
}

export default VotingPage;


