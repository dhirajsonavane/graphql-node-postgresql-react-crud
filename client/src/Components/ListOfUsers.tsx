import React, { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

import { DELETE_USER } from "../Graphql/Mutations";
import Box from "@mui/material/Box";
import { GET_ALL_USERS } from "../Graphql/Queries";
import { ListItemButton } from "@mui/material";

export const ListOfUsers = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_USERS);
  const [deleteUser, { error }] = useMutation(DELETE_USER);

  const handleClick = (id: number) => {
    try {
      deleteUser({ variables: { id: id } });
      refetch();
    } catch (error) {}
  };

  return (
    <Box sx={{ display: "flex" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <List
          sx={{ width: "300px", maxWidth: 360, border: "1px solid lightgrey" }}
        >
          {data.getAllUsers.map((user: any, index: number) => (
            <ListItem
              key={user.id}
              sx={{
                borderBottom:
                  data.getAllUsers?.length - 1 === index
                    ? "none"
                    : "1px solid lightgrey",
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.username} />
              <ListItemButton
                disableRipple
                disableGutters
                disableTouchRipple
                focusRipple={false}
                sx={{
                  justifyContent: "right",
                  width: "40px",
                  maxWidth: "40px",
                  "&:hover": { backgroundColor: "unset !important" },
                }}
                onClick={() => handleClick(user.id)}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
