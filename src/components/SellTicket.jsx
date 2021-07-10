import { useMutation, gql } from "@apollo/client";
import React, { useRef, useState } from "react";
import { sha256 } from "js-sha256";
import { TokenEntry } from "./TokenEntry";

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
  }
}
`

export function SellTicket(props) {
  const [insertTicket, { loading, error, data }] = useMutation(INSERT_TICKET);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const typeInputRef = useRef(null);

  const [ticketCode, setTicketCode] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    if (nameInputRef === null || emailInputRef === null || typeInputRef === null) {
      return;
    }
    if (nameInputRef.current === null || emailInputRef.current === null || typeInputRef.current === null) {
      return;
    }

    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const type = parseInt(typeInputRef.current.value);
    const now = new Date().toISOString();
    const checkins_left = type === 1 ? 5 : 1;
    const valueToHash = name + email + now + Math.random().toString();
    console.log(valueToHash);
    const code = sha256(valueToHash).substring(0, 10);
    let values = {
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
      <TokenEntry />
      <h1>Kaartverkoop</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Naam </label><input name="name" placeholder="" type="text" ref={nameInputRef} /><br />
        <label htmlFor="email">Email </label><input name="email" placeholder="" type="email" ref={emailInputRef} /><br />
        <label htmlFor="type">Type </label><select name="type" ref={typeInputRef}>
          <option value="0">Dagkaart</option>
          <option value="1">Weekkaart</option>
        </select><br />
        <button type="submit">Opslaan</button>
      </form>

      <div>
        {loading && 'Loading...'}
        {error && `Error! ${error.message}`}
        {data && 'Saved'}
      </div>

      <div>
        {ticketCode && <div>Ticket url: <a href={ticketUrl} target="_blank">{ticketUrl}</a></div>}
      </div>
    </div>
  );
}
