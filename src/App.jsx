import './App.scss';
import Header from './components/Header/Header';
import PollQuestion from './components/PollQuestion/PollQuestion';
import Quiz from './components/Quiz/Quiz';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import VotingPage from './pages/VotingPage/VotingPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/voting" element={<VotingPage />} />
        <Route path="/voting/:id" element={<PollQuestion />} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
