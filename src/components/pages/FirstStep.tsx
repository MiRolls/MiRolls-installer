import "./global.css"
import Steps from "../Steps";
import React, {useRef, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import InputBar from "../InputBar";
import mode from "../../mode";
import Dialog from "../Dialog";


export default function (){
    interface siteInfo {
        Name: string,
        Link: string,
        Logo: string,
        Icp: string,
        Lang: string,
        NeedIcp: number,
        MainColor:string

        [key: string]: string | number;
    }

    const [buttonText,setButtonText] = useState("Click To Submit")
    const [isOpacity,setIsOpacity] = useState(1)
    const [isGoNext,setIsGoNext] = useState(<></>)
    const [dialogError,setDialogError] = useState("")
    const siteName = useRef(null);
    const siteLang = useRef(null);
    const siteLogo = useRef(null);

    function submit(){
        const devMode = mode.release

        if (devMode === mode.debug){
            console.log(getData())
        }else{
            setIsOpacity(0)
            setButtonText("Submitting Data...")
            axios.post("/install/set/site",getData()).then(res=>{
                if(res.data.message === "success"){
                    setIsGoNext(<Navigate to={"/step-two"}/>)
                }else{
                    setDialogError("Server have some error,please reboot the MiRolls-Program." + res.data.error)
                }
            }).catch(err=>{
                // alert("Error! Please restart the program." + err)
                setDialogError("Server have some error,please reboot the MiRolls-Program." + err)
            })
        }
    }

    function getData():siteInfo{
        return {
            Name: (siteName.current as any).getAnswer(),
            Link: getRootUrl(),
            Logo: (siteLogo.current as any).getAnswer(),
            Icp: "A Nice Questionnaire System",
            Lang: (siteLang.current as any).getAnswer(),
            NeedIcp: 0,
            MainColor:"rgb(21, 127, 248)"
        }
    }

    function getRootUrl():string {
        const re = new RegExp(/^.*\//);
        return (re.exec(window.location.href) as string[])[0];
    }

    function onDialogClose(){
        setIsGoNext(<Navigate to={"/"}></Navigate>)
    }

    return (
        <div>
            <Dialog message={dialogError} type={"error"} title={"Error!"} onCloseToDo={onDialogClose}/>
            <div className={"page"} style={{opacity:isOpacity}}>
                <Steps step={3} CompletedStep={0} nowStep={1}></Steps>
                <h1>Enter Your Server Info</h1>
                <InputBar placeholder={"MiRolls"} question={"Your Site Name: "} ref={siteName}></InputBar>
                <InputBar placeholder={'The default theme only supports zh or en'} question={"Your Size Language: "} ref={siteLang}></InputBar>
                <InputBar placeholder={"https://github.com/fluidicon.png"} question={"Your Size Logo: "} ref={siteLogo}></InputBar>
                <span className={"tips"}>There all content correspond config.yaml</span>
                <span className={"tips"}>For advanced settings, please modify in config.yaml</span>
                <span className={"tips"}>China Internet Special Regulations Tips：注意如果你需要icp备案并挂载备案号的请在config目录下的config.yaml里修改</span>
                <button className={"nextStep"} onClick={submit}>{buttonText}</button>
                {isGoNext}
            </div>
        </div>
    )
}