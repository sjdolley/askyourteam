import React from "react";
import aytLogo from "./AYT-Logo.png";

function Header() {
    return (
        <div className="header">
            <footer>
                <div class="app-header">                   
                    <img src={aytLogo} alt="Ask Your Team Logo" class="logo header-logo" />
                    <p class="horizontal-rule"> | </p>                    
                    <p class="running-text">
                        Quiz  
                    </p> 
                </div>
            </footer>
        </div>
    );
}

export default Header;