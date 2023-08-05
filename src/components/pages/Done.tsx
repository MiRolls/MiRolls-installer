import React from 'react';
import "./global.css"
import Steps from "../Steps";


function Done() {

    const goHome = () => {
        window.location.href = "/";
    }

    return (
        <>
            <div className={"page"}>
                <Steps CompletedStep={3} step={3}></Steps>
                <img src={"/favicon.png"} className={"logo"} alt={"MiRolls Install Program"}/>
                <h1>You completed the install of MiRolls!</h1>
                <button className={"nextStep"} onClick={goHome}>Access your own website</button>
                <h4>Enjoy your own website!</h4>
                <span>It's that easy to build questionnaire website</span>
            </div>
        </>
    );
}

export default Done;