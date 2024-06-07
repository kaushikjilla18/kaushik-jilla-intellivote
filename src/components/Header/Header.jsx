import './Header.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg'

function Header() {

    return (
        <header className="App-header">
            <Link to='/' className="App-header__link">
                <div className="App-logo">
                    <img className="App-logo__image" src={logo} alt="logo" />
                    <h1 className="App-logo__title">Intellivote</h1>
                </div>
            </Link>

            <div>
                <Link to='/voting' className="App-header__link">
                    <button className="App-header__link-btn App-header__link-btn--voting">Voting</button>
                </Link>
                <Link to='/quiz' className="App-header__link">
                    <button className="App-header__link-btn">Quiz</button>
                </Link>
            </div>
        </header>
    )
}

export default Header;