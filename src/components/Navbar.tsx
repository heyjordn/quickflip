import React from "react";
import QuickFlipLogo from '../assets/images/logo.png';
import { Link } from "react-router";


type Props= {
    children?: string | JSX.Element | JSX.Element[];
}
export class Navbar extends React.Component<Props> {

    render() {
        return (
            <div className="flex justify-between items-center mb-7 py-4 border-b">
                <div>
                    <a href="/">
                        <img className="max-h-10" src={QuickFlipLogo} alt="Quick Flip Logo" />
                    </a>
                </div>
                <div className="grid grid-cols-2 space-x-2">
                    <Link to="/about">About</Link>
                    <a href="https://github.com/heyjordn/quickflip" rel="noopener noreferer" target="_blank">Github</a>
                </div>
            </div>
        )
    }
}

