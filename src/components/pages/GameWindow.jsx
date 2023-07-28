import React from "react";

import './GameWindow.css'

function GameWindow(props)
{

    var bg = "https://cenentury0941.github.io/MikuExportBg"
    var no_bg = "https://cenentury0941.github.io/MikuExport"

    return (<div className="GameWindow" style={{ position:"absolute", left:( props.left?props.left:"0" ), bottom:( props.bottom?props.bottom:"0"), height: ( props.height ? props.height : "100vh" ) , width: ( props.width ? props.width : "100vw" ) }}>
        <iframe title="miku" src={ props.no_bg==="true" ? no_bg : bg } width={"100%"} height={"100%"} ></iframe>
    </div>)
}

export default GameWindow