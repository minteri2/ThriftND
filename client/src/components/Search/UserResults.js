import * as React from 'react';
import {
  List,
  ListItem,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';


export default function UserResults({ users }) {

  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };

  return (
    <List style={flexContainer}>
      {users.map((user, i) => (
        <Link to={`/user/${user.username}`}>
          <ListItem key={i}>
            <Typography>{user.first_name} {user.last_name}</Typography>
            <Typography>@{user.username}</Typography>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}