import React, { useRef, useState } from "react";


export function TokenEntry(props) {
  const tokenInput = useRef(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSave = () => {
    const newToken = tokenInput.current.value;
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  return (
    <div>
      <label htmlFor="token">Token: </label>
      <input name="token" ref={tokenInput} value={token}></input>
      <button onClick={handleSave}>Opslaan</button>
    </div>
  );
}
