import './Header.scss';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <header className="App-header">
            <Link to='/' className="App-header__link">
                <div className="App-logo">
                    {/* <img className="App-logo__image" src={logo} alt="logo" /> */}
                    <h1 className="App-logo__title">Intellivote</h1>
                </div>
            </Link>

            {/* <div className="App-imageContainer">
                <input className="App-imageContainer__input" text="search" placeholder="Search" />
                <img className="App-imageContainer__image" src={userImg} alt="user-pic" />
            </div> */}

            <div>


                <Link to='/voting' className="App-header__link">
                    <button className="App-header__link-btn App-header__link-btn--voting">Voting</button>
                </Link>
                <Link to='/voting' className="App-header__link">
                    <button className="App-header__link-btn">Quiz</button>
                </Link>
            </div>

            {/* <img className="App-header__image App-header__image--secondary" src={userImg} alt="upload-pic" /> */}
        </header>
    )
}

export default Header;