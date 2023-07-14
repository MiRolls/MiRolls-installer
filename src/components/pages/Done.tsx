import React, {useState} from 'react';
import "./global.css"
import Steps from "../Steps";
import {Navigate} from "react-router-dom";



function Done() {
    const [navigate, setNavigate] = useState(<></>)

    const goHome = () => {
        setNavigate(<Navigate to={"/"}></Navigate>)
    }

    return (
        <>
            <div className={"page"}>
                <Steps CompletedStep={3} step={3}></Steps>
                <img src={"/favicon.png"} className={"logo"} alt={"MiRolls Install Program"}/>
                <h1>You completed the install of MiRolls!</h1>
                <button className={"nextStep"} onClick={goHome}></button>
                <h4>Enjoy your own website!</h4>
                <span>It's that easy to build questionnaire website</span>
                {navigate}
            </div>
        </>
    );
}

export default Done;