import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo.svg'
import '../css/nav.css'

class Navigator extends React.Component {
    render() {
        return (
            <nav className="nav-bar">
                <div className="logo">
                    <a href="/">
                        <img src={logo} alt="logo" />
                        Valuasion
                    </a>
                </div>
                <div className="nav-bar-links">
                    <Link to="/">Home</Link>
                    <Link to="/calculator">Calculator</Link>
                    <a href="https://investingwith.us">Learn More</a>
                </div>
            </nav>
        );
    }
}

export default Navigator