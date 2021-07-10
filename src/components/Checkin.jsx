import { useMutation, useLazyQuery, gql } from "@apollo/client";
import React, { useRef, useState } from "react";
import { TokenEntry } from "./TokenEntry";

const GET_TICKET = gql`
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
const UPDATE_TICKET = gql`
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

export function Checkin(props) {
  const [getTicket, { loading, error, data }] = useLazyQuery(GET_TICKET);
  const [updateTicket, { loading, error, data }] = useMutation(UPDATE_TICKET);

  const [ticketCode, setTicketCode] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [increment, setIncrement] = useSate(1);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(values);
    updateTicket({ variables: { object: values } });
  };

  return (
    <div>
      <TokenEntry />
      <h1>Check-in</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="code">Code </label><input name="code" placeholder="" type="text" ref={codeInputRef} /><br />
          <button type="submit">Ophalen</button>
        </form>
      </div>

      <div>
        {loading && 'Loading...'}
        {error && `Error! ${error.message}`}
        {data && 'Saved'}
      </div>

      <div>
        <form onSubmit={handleUpdate}>
          <button
        </form>
      </div>
    </div>
  );
}
