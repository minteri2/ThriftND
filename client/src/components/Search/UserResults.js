import * as React from 'react';
import {
  List,
  ListItem,
  Typography,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import "../../App.css";


export default function UserResults({ users }) {

  const linkStyle = {
    color: "white",
    textDecoration: "none"
  }

  return (
    <Grid container
      xs={12}
      gap={2}
      justifyContent="space-between">
      {users.map((user, i) => (
        <Grid item xs={2} className="bgpurple" justifyContent="center">
          <Link to={`/user/${user.username}`} style={linkStyle}>
              <Typography align="center">{user.first_name} {user.last_name}</Typography>
              <Typography align="center">@{user.username}</Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}