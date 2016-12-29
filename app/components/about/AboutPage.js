import React from 'react';

class AboutPage extends React.Component {
    render(){
        return (
            <div>
                <h1>About</h1>
                <p>This application uses Node, React, Redux, React Router and a variety of other helpful libraries</p>
                <h2>Details</h2>
                <h3>Backend Stack</h3>
                <ul>
                    <li>NodeJS</li>
                </ul>
                <h3>Frontend Stack</h3>
                <ul>
                    <li>React</li>
                    <li>Redux</li>
                </ul>

            </div>
        );
    }
}

export default AboutPage;
