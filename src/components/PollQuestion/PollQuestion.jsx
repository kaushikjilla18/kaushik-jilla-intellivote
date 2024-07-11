import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import './PollQuestion.scss';

const PollQuestion = () => {

    const [data, setData] = useState('');
    const [notifyText, setNotifyText] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [resultText, setResultText] = useState(false);

    const params = useParams();
    const baseURL = `${process.env.REACT_APP_API_URL}/questions`;
    const navigate = useNavigate();

    useEffect(() => {
        const getQuestion = async () => {
            console.log(params.id, "params id");
            try {
                const response = await axios.get(`${baseURL}/${params.id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        }
        getQuestion();
    }, [params.id, baseURL]);

    const UpdateResult = async (id, answer) => {
        let updateResult;
        if (answer === 'Yes') {
            updateResult = "incrementYes";
        } else if (answer === 'No') {
            updateResult = "incrementNo";
        } else {
            return; // or throw an error
        }
        try {
            const requestData = { [updateResult]: true }; // Creating object with dynamic key
            const response = await axios.put(`${baseURL}/${id}`, requestData);
            setNotifyText(true);
            setResultText(true);


            //Navigate to results page instead
            setTimeout(() => navigate('/'), 3000);
            return response.data; // return response
        } catch (error) {
            console.log("Error updating result:", error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Logic to submit the answer goes here
        let answer;
        // console.log('Options:', event.target.option.value);
        if (event.target.option.value === 'Yes') {
            answer = 'Yes'
        } else if (event.target.option.value === 'No') {
            answer = 'No'
        }
        //Validate if answer has value
        if (answer) {
            UpdateResult(params.id, answer);
            setErrorText('');
        } else {
            setErrorText('Please select an answer');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="voting-form">
                <div className="voting-form__group">
                    <label className="voting-form__label">Question: {data.question}</label>
                </div>
                <div className="voting-form__option">
                    <input type="radio" name="option" value="Yes" className="voting-form__radio" />
                    <label htmlFor="option-yes" className="voting-form__label">Yes</label>
                </div>
                <div className="voting-form__option">
                    <input type="radio" name="option" value="No" className="voting-form__radio" />
                    <label htmlFor="option-no" className="voting-form__label">No</label>
                </div>
                <button className="voting-form__submit-btn" type="submit">Submit Answer</button>
            </form>
            {errorText && <div className="voting-form__error">{errorText}</div>}
            {resultText && <div className="voting-form__container">
                <div className="voting-form__results">
                    Results
                </div>
                <div className="voting-form__options">
                    <p className="voting-form__options-text">
                        Yes - 1
                    </p>
                    <p className="voting-form__options-text">
                        No - 0
                    </p>
                </div>
            </div>}
            {notifyText && <div className="voting-form__notification">
                Your answer was successfully updated. Redirecting to Home page.
            </div>
            }
        </>
    )

}

export default PollQuestion;