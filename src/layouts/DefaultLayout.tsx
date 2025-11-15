import React from "react";
import { Navbar } from "../components/Navbar";


type Props= {
    children?: string | JSX.Element | JSX.Element[];
}
export class DefaultLayout extends React.Component<Props> {

    render() {
        return (
            <div className="max-w-6xl mx-auto flex flex-col w-full">
                <Navbar/>
                <div className="w-full">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

