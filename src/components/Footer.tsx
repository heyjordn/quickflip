import React from "react";

function Footer(){
    return (
        <footer>
            <nav className="flex justify-center items-center py-5 max-w-6xl mx-auto">
                <div className="text-md text-center">© {new Date().getFullYear()} Made by <a href="https://heyjordn.com" rel="noopener noreferrer" target="_blank">heyjordn</a></div>
            </nav>
        </footer>
    );
}

export default Footer