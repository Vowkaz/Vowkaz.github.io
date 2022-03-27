import React from 'react';
import './index.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : '' }>
            <div className="header--logo">
                <a href="/">
                    <img src="" alt=""></img>
                </a>
            </div>
            <div className="header--user">
                <a href="">
                    <img scr="" alt=""></img>
                </a>
            </div>
        </header>
    )
}
