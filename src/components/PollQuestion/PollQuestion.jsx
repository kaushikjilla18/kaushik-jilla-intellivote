import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const PollQuestion = () => {

    const [data, setData] = useState('');
    const [notifyText, setNotifyText] = useState(false);
    const params = useParams();
    const baseURL = 'http://localhost:5050/questions';
    const navigate = useNavigate();

    useEffect(() => {
        const getQuestion = async () => {
            const response = await axios.get(`${baseURL}/${params.id}`);
            setData(response.data);
        }
        getQuestion();
    }, [params.id]);

    const UpdateResult = async (id, answer) => {
        console.log(answer, ": answer");
        let updateResult;
        if (answer === 'Yes') {
            updateResult = "incrementYes";
            console.log(typeof (result), "typeof result");
        } else if (answer === 'No') {
            updateResult = "incrementNo";
        } else {
            console.log("Invalid answer:", answer);
            return; // or throw an error
        }
        try {
            const requestData = { [updateResult]: true }; // Creating object with dynamic key
            const response = await axios.put(`${baseURL}/${id}`, requestData);
            setNotifyText(true);


            //Navigate to results page instead
            setTimeout(() => navigate('/'), 2500);
            return response.data; // return response
        } catch (error) {
            console.log("Error updating result:", error);
            throw error; // rethrow the error for further handling
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
        UpdateResult(params.id, answer);
    };

    return (
        <>
            <h3>New question</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question: {data.question}</label>
                </div>
                <div>
                    <input type="radio" name="option" value="Yes" />
                    Yes
                </div>
                <div>
                    <input type="radio" name="option" value="No" />
                    No
                </div>
                <button className="submit-btn" type="submit">Submit Answer</button>
            </form>
            {notifyText && <div>
                Your answer was successfully updated. Redirecting to Home page.
            </div>
            }
        </>
    )

}

export default PollQuestion;