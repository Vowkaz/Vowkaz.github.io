import React from 'react';
import './index.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : '' }>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt=""/>
                </a>
            </div>
            <div className="header--user">
                <a href="#">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt=""/>
                </a>
            </div>
        </header>
    )
}
