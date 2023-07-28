import React from 'react'

import "./Floor.css"
import { useEffect } from 'react'

import FloorWindow from './FloorWindow'
import GameWindow from './GameWindow'
import VerifyBot from '../chatbot/verify-bot'



const floor_channel = new BroadcastChannel("vals_channel");

const pingDB = () => {
    
}

const Floor = () => {

    useEffect( () => {} 
    , [] );

    return (
        <div className='MainWindow'>

            <VerifyBot />
            <FloorWindow />
            <GameWindow height="75vh" width="50vh" left="2vw" bottom="5vh" no_bg="FALSE"/>
        </div>
    )
}

export default Floor
