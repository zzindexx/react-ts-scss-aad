import * as React from 'react';
import './Main.scss';

export const Main: React.SFC = () => {
    return <div className="mainblock">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1 className="mb-3">Create React applications using TypeScript, SCSS and Bootstrap with Azure Active Directory authentication</h1>
                    <p className="lead mb-4">
                        Start creating applications faster and without any scaffolder
                    </p>
                    <div>
                        <a href="https://reactjs.org/" className="btn btn-lg btn-outline-secondary mb-3 mr-3" target="_blank" rel="noreferrer">Learn React.js</a>
                        <a href="https://www.typescriptlang.org/" className="btn btn-lg btn-outline-secondary mb-3 mr-3" target="_blank" rel="noreferrer">Learn TypeScript</a>
                        <a href="https://getbootstrap.com/" className="btn btn-lg btn-outline-secondary mb-3" target="_blank" rel="noreferrer">Learn Bootstrap</a>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
