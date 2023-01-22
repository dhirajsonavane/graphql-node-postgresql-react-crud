import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";

import { CREATE_USER } from "../Graphql/Mutations";

export const CreateUser = () => {
  const [createUser, { error, loading }] = useMutation(CREATE_USER);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    try {
      createUser({
        variables: {
          name: name,
          username: userName,
          password: password,
        },
      });

      setName("");
      setUserName("");
      setPassword("");
    } catch (error) {}
  };

  return (
    <FormGroup>
      <FormControl>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ m: 1 }}
        />
      </FormControl>
      <FormControl>
        <TextField
          value={userName}
          label="User Name"
          onChange={(e) => setUserName(e.target.value)}
          sx={{ m: 1 }}
        />
      </FormControl>
      <FormControl>
        <TextField
          value={password}
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
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
          CREATE
        </Button>
      </FormControl>
    </FormGroup>
  );
};
