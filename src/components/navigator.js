import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo.svg'
import menu from '../images/menu.svg'
import '../css/nav.css'

class Navigator extends React.Component {
    constructor() {
        super()
        this.navBarLinks = React.createRef()
    }

    componentDidMount() {
        document.addEventListener("mousedown", (e) => {
            if (this.navBarLinks.current.contains(e.target)){
                return
            }
            
            this.closeMenu();
        })
    }

    openMenu = () => {
        this.navBarLinks.current.className = "nav-bar-links nav-bar-links-show"
    }

    closeMenu = () => {
        this.navBarLinks.current.className = "nav-bar-links nav-bar-links-hide"
    }

    render() {
        return (
            <nav className="nav-bar">
                <div className="logo">
                    <a href="/">
                        <img src={logo} alt="logo" />
                        Valuasion
                    </a>
                </div>

                <div className="menu">
                    <div className="menu-icon" onClick={() => this.openMenu()}>
                        <img src={menu} alt="menu" />
                    </div>
                    <div className="nav-bar-links nav-bar-links-hide" ref={this.navBarLinks}>
                        <Link to="/" onClick={() => this.closeMenu()}>Home</Link>
                        <Link to="/calculator" onClick={() => this.closeMenu()}>Calculator</Link>
                        <a href="https://investingwith.us">Learn More</a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigator