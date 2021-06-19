import React from "react";
import aytLogo from "./footer-logo.PNG";

function Footer() {
    return (
        <div className="footer">
            <footer>
                <div className="app-footer">                   
                    <img src={aytLogo} alt="Ask Your Team Logo" className="logo" />
                    {/* <p class="horizontal-rule"> | </p>                    
                    <p class="running-text">
                        Quiz
                    </p>                     */}
                </div>
            </footer>
        </div>
    );
}

export default Footer;