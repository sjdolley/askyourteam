import React from "react";
import aytLogo from "./AYT-Logo.png";

function Header() {
    return (
        <div className="header">
            <footer>
                <div className="app-header">                   
                    <img src={aytLogo} alt="Ask Your Team Logo" className="logo header-logo" />
                    <p className="horizontal-rule"> | </p>                    
                    <p className="running-text">
                        Quiz  
                    </p> 
                </div>
            </footer>
        </div>
    );
}

export default Header;