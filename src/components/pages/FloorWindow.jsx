import React from "react";

import './FloorWindow.css'

function FloorWindow(props)
{

    var url = "https://cenentury0941.github.io/Floor"

    return (<div className="FloorWindow">
        <iframe title="floor" src={url} width={"100%"} height={"100%"} ></iframe>
    </div>)
}

export default FloorWindow