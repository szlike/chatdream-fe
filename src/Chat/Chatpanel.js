import React, {useState, useRef} from "react";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, TextField, List, Fab, debounce } from "@mui/material";

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

const Chatpanel = () => {
  const classes = useStyles()
  const greetMessage = (
    <Message
      id={1}
      alignment={'left'}
      message={'Welcome to chat dream! Let\'s tell me about your dream'}
    />
  )
  const [conv, setConv] = useState([greetMessage])
	const tfEle = useRef('')
	const sendMessage = ()=>{
		if (!tfEle || !tfEle.current.value){
			return
		}
		let message = (
			<Message
				id={conv.length + 1}
				message={tfEle.current.value}
			/>
		)
		setConv([...conv, message])
		tfEle.current.value = ''
	}

  return (
    <>
      <List className={classes.messageArea}>
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

export default Chatpanel;
