import React from 'react'

import "./Meet.css"

import GameWindow from './GameWindow'
import VerifyBot from '../chatbot/verify-bot'

const Meet = () => {
    return (
        <div className='MainWindow'>
            <VerifyBot />
            <GameWindow />
        </div>
    )
}

export default Meet
