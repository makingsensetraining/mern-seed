import React, {PropTypes} from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="container">
            <footer>
                <img alt="MakingSense_Logo" width="200" src="http://www.redargentinait.com/imagenes/institucionales/2014-01/75-miembros-making-sense.png" />
                <p>MERN seed App <cite title="2016">{ currentYear }</cite> - Making Sense LLC Labs</p>
            </footer>
        </div>
    );
};

export default Footer;
