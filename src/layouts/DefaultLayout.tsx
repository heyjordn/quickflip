import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";


type Props= {
    children?: string | JSX.Element | JSX.Element[];
}
export class DefaultLayout extends React.Component<Props> {

    render() {
        return (
            <div className="h-screen max-w-6xl mx-auto flex flex-col w-full">
                <Navbar/>
                <div className="flex-1 w-full">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
}

