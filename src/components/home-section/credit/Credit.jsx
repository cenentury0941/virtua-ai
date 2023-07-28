import './credit.scss'

import '../../header/header.scss'

import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { bgVideo } from '../../../assets/videos'
import Button from '../../button/Button'

import { logo_large } from '../../../assets/images'

import "./Home.css"

const Credit = props => {

    const navigate = useNavigate();

    const videoRef = useRef(null)

    useEffect(() => {
        videoRef.current.play()
        const pauseVideo = () => {
            if (!document.hidden) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
        }
        document.addEventListener('webkitvisibilitychange', pauseVideo)
        return () => {
            document.removeEventListener('webkitvisibilitychange', pauseVideo)
        }
    }, []);

    return (
        <div className={`credit overlay ${props.isActive ? 'active' : ''}`}>
            <video
                ref={videoRef}
                width="100%"
                height="auto"
                loop={true}
                className="overlay"
            >
                <source src={bgVideo} type="video/mp4"/>
            </video>
            <div className="credit__content">
                <div className="title">
                    <img src={logo_large} alt="" style={{height:"100%",aspectRatio:"1"}} />
                </div>
                <div className="ButtonContainer">
                <div className="Button" onClick={() => { navigate("/VirtuaAi/Meet") }}><h1>MEET VIRTUA AI</h1></div>
                <div className="Button" onClick={() => { navigate("/VirtuaAi/Sandbox") }}><h1>EXPLORE SANDBOX DEMO</h1></div>
            
                </div>
            </div>
        </div>
    )
}

export default Credit
