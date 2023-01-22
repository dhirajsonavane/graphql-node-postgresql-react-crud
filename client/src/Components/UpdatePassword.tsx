import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";

import { UPDATE_PASSWORD } from "../Graphql/Mutations";

export const UpdatePassword = () => {
  const [updatePassword, { error, loading }] = useMutation(UPDATE_PASSWORD);

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleClick = () => {
    try {
      updatePassword({
        variables: {
          username: username,
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
      });

      setUsername("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {}
  };

  return (
    <FormGroup sx={{ ml: 1 }}>
      <FormControl>
        <TextField
          label="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ m: 1 }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{ m: 1 }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ m: 1 }}
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          endIcon={loading ? <CircularProgress /> : <AddIcon />}
          onClick={() => handleClick()}
          disableRipple
          disableFocusRipple
        >
          UPDATE
        </Button>
      </FormControl>
    </FormGroup>
  );
};
