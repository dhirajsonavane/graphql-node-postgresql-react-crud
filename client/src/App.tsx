import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
} from "@apollo/client";
import "./App.css";
import Box from "@mui/material/Box";
import { CREATE_USER } from "./Graphql/Mutations";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { CreateUser } from "./Components/CreateUser";
import { UpdatePassword } from "./Components/UpdatePassword";
import { ListOfUsers } from "./Components/ListOfUsers";

const App = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Box sx={{ display: "flex", p: 2 }}>
        <ListOfUsers />
        <CreateUser />
        <UpdatePassword />
      </Box>
    </ApolloProvider>
  );
};

export default App;
