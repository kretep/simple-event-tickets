import { useMutation, gql } from "@apollo/client";
import React, { useRef, useState } from "react";
import { sha256 } from "js-sha256";
import { TokenEntry } from "./TokenEntry";
import { FormControl, Input, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

const INSERT_TICKET = gql`
mutation insert_single_ticket($object: tickets_insert_input!) {
  insert_tickets_one(object: $object) {
    checkins_left
    code
    create_date
    email
    log
    name
    sell_date
    type
    order_id
  }
}
`

export function SellTicket(props) {
  const [insertTicket, { loading, error, data }] = useMutation(INSERT_TICKET);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [order_id, setOrderID] = useState("");

  const [ticketCode, setTicketCode] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();

    if (name == "" || email == "" || type == "" || order_id == "") {
      return;
    }

    const now = new Date().toISOString();
    const checkins_left = type == "1" ? 5 : 1;
    const valueToHash = name + email + now + Math.random().toString();
    console.log(valueToHash);
    const code = sha256(valueToHash).substring(0, 10);
    let values = {
      order_id,
      name,
      email,
      type,
      checkins_left,
      code,
      sell_date: now,
      create_date: now,
      log: ""
    }
    console.log(values);
    insertTicket({ variables: { object: values } });
    setTicketCode(code);
  };

  const ticketUrl = `https://www.jeugddorpleiden.nl/tickets/ticket/?code=${ticketCode}`;

  return (
    <div>
      <div>
        <h2>Token invoer</h2>
        <TokenEntry />
      </div>
      <div>
        <h2>Verkoop kaartje</h2>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="orderid">Bestelnr </InputLabel>
            <Input id="orderid" placeholder="" type="text" onChange={(e) => setOrderID(e.target.value)} />
          </FormControl>&nbsp;&nbsp;
          <FormControl>
            <InputLabel htmlFor="name">Naam </InputLabel>
            <Input id="name" placeholder="" type="text" onChange={(e) => setName(e.target.value)} />
          </FormControl>&nbsp;&nbsp;
          <FormControl>
            <InputLabel htmlFor="email">Email </InputLabel>
            <Input id="email" placeholder="" type="email" onChange={(e) => setEmail(e.target.value)}  />
          </FormControl>&nbsp;&nbsp;
          <FormControl>
            <InputLabel htmlFor="type">Type </InputLabel>
            <Select id="type" onChange={(e) => setType(e.target.value)}>
              <MenuItem value="0">Dagkaart</MenuItem>
              <MenuItem value="1">Weekkaart</MenuItem>
            </Select>
          </FormControl>&nbsp;&nbsp;
          <Button variant="contained" type="submit">Opslaan</Button>
        </form>
      </div>

      <div>
        {loading && 'Loading...'}
        {error && `Error! ${error.message}`}
        {data && 'Saved'}
      </div>

      <div>
        {ticketCode && data && <div>Ticket url: <a href={ticketUrl} target="_blank">{ticketUrl}</a></div>}
      </div>
    </div>
  );
}
