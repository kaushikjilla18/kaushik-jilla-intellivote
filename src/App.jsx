import './App.css';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import VotingPage from './pages/VotingPage/VotingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <h1>IntelliVote</h1>
      <Routes>
        <Route path="/" element={<VotingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
