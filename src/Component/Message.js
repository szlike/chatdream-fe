import React from 'react'
import {
    Grid,
    ListItem,
    ListItemText,
  } from '@mui/material'

const Message = ({ id, alignment='right', message, timestamp=new Date().toLocaleString() }) => {
  
  return (
    <ListItem key={id}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={alignment} primary={message}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={alignment} secondary={timestamp}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Message;
