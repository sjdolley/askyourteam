import React from "react";
import aytLogo from "./footer-logo.PNG";

function Footer() {
    return (
        <div className="footer">
            <footer>
                <div class="app-footer">                   
                    <img src={aytLogo} alt="Ask Your Team Logo" class="logo" />
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