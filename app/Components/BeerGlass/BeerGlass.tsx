import React from 'react';
import './output.css';

const BeerGlass = () => {
    const bubbles = Array.from({length: 13}, (_, i) => i);

    return (
        <div className="container mb-5">
            <div className="borderbox">
                <div className="glass">
                    <div className="inner">
                        {bubbles.map(i => (
                            <div key={i} className={`bubble bubble-${i}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export {BeerGlass}
