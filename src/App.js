import React from 'react'
import './App.css'
import Chat from './Chat/index'
import ErrorPanel  from './Component/ErrorPanel'


export default function App (){
    return (
        <div className="App">
          {/* <ErrorPanel /> */}
          <Chat></Chat>
        </div>
    )
}
