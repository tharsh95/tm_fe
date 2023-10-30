import React from "react";
import { UserProvider } from './Contexts/userContext'; // Import your UserProvider
import { BrowserRouter as Router } from 'react-router-dom';

import Container from "./Container";
const App = () => {

  return (
      <UserProvider>
        <Container />
      </UserProvider>
  );
};

export default App;
