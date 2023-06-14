
import React from 'react'

import ChatPanel from './Chatpanel'
import Menu from './Menu'
import Drawerlayout from '../Component/Drawerlayout'


const Chat = () => {

  return (
      <div>
        <Drawerlayout
          title={'Tell me about your dream'}
          left={<Menu />}
          main={
            <ChatPanel />
          }
        >
        </Drawerlayout>
      </div>
  );
}

export default Chat