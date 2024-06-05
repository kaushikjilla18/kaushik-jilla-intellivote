
import { useState } from "react";
import { Link } from "react-router-dom";
import './LandingPage.scss';


const LandingPage = () => {

    // const [startPoll, setStartPoll] = useState(false);

    // const createPoll = () => {
    //     setStartPoll(true);
    // }

    return (
        <>

            <h2 className="landing-title">Welcome to [ Intellivote ]</h2>
            <h4>Your Destination for Fun and Engaging Quizzes and Polls!</h4>

            <p>Explore our diverse range of quizzes covering topics from pop culture to science, and participate in live polls to voice your opinion on trending topics.</p>
        </>
    )
}

export default LandingPage;