import { Input, InputLabel, Button, FormControl } from "@material-ui/core";
import React, { useRef, useState } from "react";


export function TokenEntry(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSave = () => {
    localStorage.setItem('token', token);
  }

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="token">Token: </InputLabel>
        <Input id="token" onChange={(e) => setToken(e.target.value)}></Input>
      </FormControl>
      <Button variant="contained" onClick={handleSave}>Opslaan</Button>
    </div>
  );
}
