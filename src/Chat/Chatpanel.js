import React, {useState, useRef} from "react";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, TextField, List, Fab, debounce } from "@mui/material"
import {
  fetchConversationResp
} from '../service/index'

import Message from "../Component/Message";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const convertMessageListToConversationList = (messageList)=>{
  return messageList.map(({props})=>{
      const {message, alignment} = props
      return {
          content: message,
          role: alignment === 'left' ? 'assistant': 'user'
      }
  })
}

const convertConversationListToMessageList = (conversationList)=>{
  return conversationList.map(({content, role}, index)=>{
      return (
      <Message
        key={index}
        message={content}
        alignment={role==='assistant'?'left':'right'}
      />)
  })
}

const greetMessage = (
  <Message
    alignment={'left'}
    message={'Welcome to chat dream! Let\'s tell me about your dream'}
  />
)

const errorMessage = (
  <Message
    alignment={'left'}
    message={'Oops, please refresh page and re-enter your dream.'}
  />
)

const loadingMessage = (
  <Message
    id={1}
    alignment={'left'}
    message={'Analyzing your dream...'}
  />
)


const Chatpanel = () => {
  const classes = useStyles()

  const [conv, setConv] = useState([])
	const tfEle = useRef('')
	const sendMessage = async ()=>{
		if (!tfEle || !tfEle.current.value){
			return
		}
		let message = (
			<Message
				id={conv.length + 1}
				message={tfEle.current.value}
			/>
		)
    const fullConversation = [...conv, message]
		setConv(fullConversation)
		// reset input box value
    tfEle.current.value = ''
    const res = convertMessageListToConversationList(fullConversation)
    const response = await fetchConversationResp(res)
    if (response.status === 200){
      const conversationList = convertConversationListToMessageList(response.data)
      setConv(conversationList)
    }
	}

  const handleKeyDownWhenTyping = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <>
      <List className={classes.messageArea}>
        {greetMessage}
        {conv.map((item, index) => item)}
      </List>
      <Divider />
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            id="text-field-input"
            label="I had a dream..."
						inputRef={tfEle}
						fullWidth
            onKeyDown={(e)=>handleKeyDownWhenTyping(e)}
					/>
        </Grid>
        <Grid xs={1} item align="right">
          <Fab color="primary" aria-label="add">
            <SendIcon onClick={()=>sendMessage()} />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
};

/**
 * enhancement
 * - error interception using axios
 * - when answer is loading, print loading message while waiting
 * - display the answer in different color
 * - allow user to retry/start a new conversation
 *   - need a way to distinguish conversation message vs system prompt
 *   for example, 'we dont support Mandarin is not part of conversation'
 *   - need more roles, assistant | user | prompt, while prompt is not part of the conversation
 * - accuracy on response, length, usefulness etc
 * - 
 * 
 * 
 */

export default Chatpanel;
