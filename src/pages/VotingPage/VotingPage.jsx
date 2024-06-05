// import { useState } from "react";
// import Poll from '../Poll/Poll';


// const VotingPage = () => {

//     const [startPoll, setStartPoll] = useState(false);
//     const [question, setQuestion] = useState(null);
//     const [createQuestion, setCreateQuestion] = useState(false);

//     const createPoll = () => {
//         console.log("clicked");
//         setStartPoll(true);
//     }
//     const showQuestion = (e) => {
//         const que = e.target.value;
//         setQuestion(que);
//     }

//     const handleCreate = (event) => {
//         event.preventDefault();
//         console.log('question submitted')
//     }
//     return (
//         <>
//             {!startPoll ?
//                 <div>
//                     <h3>Create-a-Poll</h3>
//                     <button onClick={createPoll}>Start</button>
//                 </div>
//                 :
//                 <form type='submit'>
//                     <h3>Question</h3>
//                     {!question && <div>
//                         <input name='question' placeholder='question' onClick={showQuestion} />
//                     </div>}
//                     {question && <h3>{question}?</h3>}
//                     <select name="options" id="options">
//                         <option value="Checkbox">Checkboxes</option>
//                         <option value="radio-btn">Radio button</option>
//                         {/* <option value="opel">Opel</option>
//                         <option value="audi">Audi</option> */}
//                     </select>
//                     <input name='opt1' placeholder='opt1'/>
//                     <input name='opt2' placeholder='opt2'/>
//                     {/* <input type='radio' id='yes' name='yes' value='yes' />
//                     <label htmlFor="yes">Yes</label><br />
//                     <input type='radio' id='no' name='no' value='no' />
//                     <label htmlFor="no">No</label><br /> */}
//                     <div>
//                     <button onClick={handleCreate}>Create</button>
//                     </div>

//                 </form>
//             }
//         </>
//     )
// }

// export default VotingPage;


import React, { useState } from 'react';
import './VotingPage.scss';

function VotingPage() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCreateClick = () => {
        setShowForm(true);
        setOptions([]); // Reset options when creating a new question
        if (selectedOption === 'checkbox') {
            setOptions(['Definetely Yes', 'Not sure', 'No way']); // Example options for checkbox
        } else if (selectedOption === 'radio') {
            setOptions(['Yes', 'No']); // Example options for radio
        }
    };

    const handleSubmit = (event) => {
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
            <h1>Voting App</h1>
            {!showForm && (
                <div>
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
                                            <input type="checkbox" value={option} onChange={(e) => handleOption(e)}/>
                                            {option}
                                        </div>
                                    ) : (
                                        <div>
                                            <input type="radio" name="option" value={option} onChange={(e) => handleOption(e)}/>
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


