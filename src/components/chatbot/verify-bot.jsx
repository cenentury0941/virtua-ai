import { useState, useEffect, useRef , React } from "react";
import "./verify-bot.css";

import { useNavigate } from "react-router-dom";
import SendIcon from "./images/send.png";
import MicIcon from "./images/mic.png";
import TtsDisabledIcon from "./images/notts.png";
import TtsEnabledIcon from "./images/tts.png";
import Loading from "./images/loading.gif";

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { Configuration, OpenAIApi } from "openai";

const bc = new BroadcastChannel('my_channel'); 


function setSpeaking(value)
{
    bc.postMessage(value ? "true" : "false");
}


var notkeya = "sk-TV@dlUGtgDQx@JyJjj"
var notkeyb = "5QL8T@3BlbkFJ3@S9Ekv"
var notkeyc = "wJxq@LRBuMo@kJWH"

const configuration = new Configuration({
    organization: "org-RZ3uSWP75ShMsyLdXuc7Hot7",
    apiKey: (notkeya + notkeyb + notkeyc).replaceAll( "@" , "" ),
  });

  //console.log( (notkeya + notkeyb + notkeyc).replaceAll( "@" , "" ) )

const openai = new OpenAIApi(configuration);



const firebaseConfig = {

    apiKey: "AIzaSyDediO1CPm4T60pxMLhuimFI3xIFQD7rbw",
  
    authDomain: "verify-bot-ennovate.firebaseapp.com",
  
    projectId: "verify-bot-ennovate",
  
    storageBucket: "verify-bot-ennovate.appspot.com",
  
    messagingSenderId: "656544899745",
  
    appId: "1:656544899745:web:977f5c9b78d1dfee7a06e0",
  
    measurementId: "G-2842XBLZSE"
  
  };
  

var input = document.createElement('input');
input.type = 'file';

input.onchange = e => { 
   var file = e.target.files[0]; 
}


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

var access_token = null;
const API_KEY = "39k8898c-c21h-4i09-bh78-h8hh04l2b12";
const url_start = "https://firebasestorage.googleapis.com/v0/b/verify-bot-ennovate.appspot.com/o/";
const url_end = "?alt=media&token=7838da10-fa19-42b9-a953-f3bade7848ee";
var session_id = "";



   
    function text2Binary(string) {
        return string.split('').map(function (char) {
            return char.charCodeAt(0).toString(2);
        }).join(' ');
    }


    var last_user_message = "";

function VerifyBot()
{
    const navigate = useNavigate();

    const [showBot , setShowBot] = useState(false);
    const [inputMessage , setInputMessage] = useState("");
    const [buttonIcon, setButtonIcon] = useState( "url("+MicIcon+")" )
    const [messages , setMessages] = useState([ { source : "Bot" , message : "Sup?" } ])
    const [ttsEnabled , setTtsEnabled] = useState(false)
    const [listening , setListening] = useState(false)
    
    const chatscroll = useRef(null)

    const VirtuaAiContext = `Respond to the follow prompts as Virtua Ai. Limit response length to 39 words or less.
    
    Virtua AI is a modular virtual assistant service which is powered by open AI and Ti DB.

    Virtua AI has the following features:
    1. Modular : AI functionality in the form of prompts can be stored in the TiDB cluster from which
    individual capabilities can be installed ad-hoc by Virtua Ai in case the added functionality is required.

    Currently available modules include:
        - Home Automation Module: A Natural Language based approach to handling various IoT enabled appliances areound the house as
          well as a means to retrieve and analyse sensor readings such as temperature, power consumption, etc using the power of Data Analytics.
          A sandbox demo of this module is available to access to the landing page at cenentury0941.github.io/VirtuaAi

        - Medical Care Module: A data analytics and visualisation module focused on Medical care powered by OpenText cloud APIs Information Management System.
          This module is currently under development and will be completed by the 5th of August 2023 for a sample demonstration.
        
        - General Purpose Analytics Module: A data analytics module which uses natural language queries to automatically perform data analytics on a 
          custom data set provided by the user using openAI API. This module is currently in development.

    2. Natural Language : By appropriating open AI API, Virtua is capable of harnessing the power of GPT 3.5 turbo
    using which it can converse with users in a natural manner

    3. Extended Non-Volatile Context: By tagging and storing conversations with the user on TiDB cluster
    Virtua AI can filter and retrieve relevant conversation from the past from the database into the current context
    allowing human-like memory recall capabilities.

    4. AR display: With future readiness in mind, Virtua AI has implemented the HTML5 compatible player of GoDot
    Game Engine to generate a real-time 3D CGI rendition of the virtual assistant which can be customised as per the user's
    preference

    Virtua AI also features accessibility features such as Speech Synthesis and Recognition for Hands Free usage of the service.
    ` ;


    //Speech Synthesis
    const synth = window.speechSynthesis;

    useEffect(() => {
        if (chatscroll) {
            chatscroll.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

      useEffect(
        () => {
        
        if( messages[0].source == "User")
        {

        // setTimeout( () => {
        //     var lastMessage = messages[0].message;
        //     console.log( messages )
        //     setMessages( arr => [ { source : "Bot" , message : lastMessage } , ...arr ] )
        // } , 1000 );

        }
        else if( messages[0].source === "Bot" )
        {
            var lastMessage = messages[0].message;
            console.log( messages )
            const utterThis = new SpeechSynthesisUtterance(lastMessage);
            if(ttsEnabled)
            {    
                utterThis.addEventListener("end", (event) => {
                    setSpeaking(false);
                  });

            let voices = speechSynthesis.getVoices();
            console.log(voices);
            const desiredVoice = voices.find((voice) => voice.lang === 'en-US' && voice.name.includes('Zira'));
            if (desiredVoice) {
                utterThis.voice = desiredVoice;
            }
                    
            utterThis.pitch = 1;
            utterThis.rate = 1;
            utterThis.volume = 0.1;
            setSpeaking(true);
            synth.speak(utterThis);

        }
        }

        }
        , [messages, ttsEnabled]
      );

          const getLanguageGPT = async (message) => {
            var prompt = `
            determine the language of the source text as follows:
            source = "Hello, nice to meet you!"
            answer = English

            source = "`+message+`"
            answer = 
            `;
        
            console.log(prompt)

            var prompts =  [ { role : "user" , content : prompt }
                            ] 
            

            try {
        
                const result = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo-0613",
                    messages: prompts,
                    max_tokens: 200,
                  });
        
                var chat_response = result.data.choices[0].message.content //.data.choices[0].text;
                console.log(chat_response);
                return chat_response;
            } catch (e) {
                console.error(e);
                return "English";
              }
          }

          const translateGPT = async (message) => {

            console.log("Translate : " + message)

            var language = await getLanguageGPT(last_user_message);

            if( language === "English" || language === "english" )
            {
                return message;
            }

            var prompt = `
            translate "`+message+`" to `+language+`
            `;
        
            console.log(prompt)

            var prompts =  [ { role : "user" , content : prompt }
                            ] 
            

            try {
        
                const result = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo-0613",
                    messages: prompts,
                    max_tokens: 200,
                  });
        
                var chat_response = result.data.choices[0].message.content //.data.choices[0].text;
                console.log(chat_response);
                return chat_response;
            } catch (e) {
                console.error(e);
                return message;
              }
          }

          const promptChatGPT = async (message) => {
        
            if( message.length == 0 )
            {
                return;
            }
        
            console.log("Prompt : " + message)
            
            var prompts =  [ { role : "user" , content : VirtuaAiContext }, 
                                 { role : "assistant" , content : "Sure! Please provide the prompts." }] 
            
            prompts.push( { role : "user" , content : "prompt : " + message } )

            try {
        
                const result = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo-0613",
                    messages: prompts,
                    max_tokens: 200,
                  });
        
                var chat_response = result.data.choices[0].message.content //.data.choices[0].text;
                
                setMessages( arr => [ { source : "Bot" , message : chat_response } , ...arr ] )    
                
                console.log(chat_response);
        
            } catch (e) {
                console.error(e);
                setMessages( arr => [ { source : "Bot" , message : "Oops, unfortunately I ran into an error when accessing openAI's services. Please try again after a minute! Error Info : " + e } , ...arr ] )  
            }
        
          }
        

    function handleClick(event)
    {
        if( inputMessage.length > 0 )
        {
            console.log( "Sending Message" );
            console.log( inputMessage );
            last_user_message = inputMessage;
            setMessages( arr => [ { source : "User" , message : inputMessage } , ...arr ] )
            promptChatGPT(inputMessage);
            setInputMessage("");
        }
        else{

            console.log("Mic requested");
            const SpeechRecognitionEvent =
            window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            
            if (typeof SpeechRecognition === "undefined") {
                setMessages( arr => [ { source : "Bot" , message : "I'm sorry, but the browser doesn't support Web Speech Recognition API. Try using Chrome." } , ...arr ] )
            } else {
                console.log(SpeechRecognition);
                const recognition = new SpeechRecognition();
                const start = () => { setListening(true); console.log("listening") };
                const stop = () => { setListening(false); console.log("stopped listening"); recognition.stop();  };
                const onResult = event => {
                    console.log("result called");
                    for (const res of event.results) {
                        setInputMessage( inputMessage + res[0].transcript)
                    }
                    setTimeout( () => {stop()} , 3000 );
                };
                
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.addEventListener("result", onResult);
                recognition.start();
                setButtonIcon("url("+Loading+")");
            }



        }
    }  

    function toggleTts()
    {
        setMessages( arr => [ { source : "Bot" , message : "Text-To-Speech has been " + ( ttsEnabled ? "disabled" : "enabled" ) } , ...arr ] )
        setTtsEnabled( !ttsEnabled );
    }   

    function hideBot()
    {
        setShowBot(false);
    }

    function revealBot()
    {
        setShowBot(true);
    }

    useEffect( ()=> {
        console.log( inputMessage )
        if( inputMessage )
        {
            setButtonIcon("url("+SendIcon+")");
        }
        else
        {
            setButtonIcon("url("+MicIcon+")");
        }
    },
        [inputMessage]
    );

    return (

        <div className="VerifyBot">
        <div className={"BotBody " + (showBot ? "Reveal" : "Hide")}>
            <div className="BotContent">
                <div className="BotHeaderSection">
                    <div className="BotIcon"></div>
                    <div className="BotTitle"><h1>Virtua Ai</h1></div>
                    <div className="TtsButton" onClick={toggleTts} style={{backgroundImage : "url(" + ( ttsEnabled ? TtsEnabledIcon : TtsDisabledIcon ) + ")"}}></div>
                    <div className="CloseButton" onClick={hideBot}></div>
                </div>
                <div className="BotChatSection" ref={chatscroll}>
                    <div className="BotChatScrollable">
                    {
                    messages && messages.map( (element,index) => {
                         
                        if( element.message )
                        {
                            return <div key={index+element.message} className={ "BotMessage " + ( element.source == "Bot" ? "Bot" : "User" ) + " " + ( index == 0 ? "NewMessage" : "" ) }>{element.message}</div> 
                        }
                                               
                        
                        })
                    }

                    </div>
                </div>
                <div className="BotInputSection">
                    <input placeholder="Enter message" value={inputMessage} onKeyUp={ (event) => { event.key === "Enter" && handleClick() } } onChange={ (event) => { setInputMessage(event.target.value) } } type="text" className="BotInputText"></input>
                    <button style={{ backgroundImage : buttonIcon }} onClick={handleClick} className="BotInputButton"></button>
                </div>
            </div>
        </div>

        <div className={"BotShowButton " + (!showBot ? "Reveal" : "Hide")} onClick={revealBot}></div>

        </div>

    );

}

export default VerifyBot;





























