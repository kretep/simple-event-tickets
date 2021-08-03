import { useMutation, useLazyQuery, gql } from "@apollo/client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { TokenEntry } from "./TokenEntry";
import { FormControl, Input, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import QrScanner from "qr-scanner";

const GET_TICKET = gql`
query getTicket($code:String) {
  tickets(where: {code: {_eq: $code}}) {
    checkins_left
    code
    log
    name
    order_id
    sell_date
    type
    email
    create_date
  }
}
`
const CHECKIN_TICKET = gql`
mutation checkinTicket($code: String!, $checkins_left: Int!) {
  update_tickets_by_pk(pk_columns: {code: $code}, _set: {checkins_left: $checkins_left})
  { code, checkins_left }
}
`

export function ScanTicket(props) {
  const [code, setCode] = useState("");
  const [doLockCode, setDoLockCode] = useState(false);
  const [getTicket, { loading: loadingTicket, error: errorTicket, data: dataTicket }] = useLazyQuery(GET_TICKET);
  const [checkinTicket, { loading, error, data }] = useMutation(CHECKIN_TICKET);
  const [increment, setIncrement] = useState(1);
  const display = useRef();
  const scanner = useRef();

  const onScan = result => {
    console.log(result);
    if (code === "" && result !== "") {
      setCode(result);
      retrieveTicket(result);
    }
  }

  const onGetTicket = event => {
    event.preventDefault();
    retrieveTicket(code);
  }

  const retrieveTicket = ticketCode => {
    scanner.current.stop();
    setDoLockCode(true);
    getTicket({ variables: { code: ticketCode } });
  };


  useEffect(() => {
    console.log(display.current);
    scanner.current = new QrScanner(display.current, onScan);
    scanner.current.start();
    return () => {
      scanner.current.stop();
    }
  }, []);

  const ticket = dataTicket && dataTicket.tickets.length > 0 && dataTicket.tickets[0];

  const handleCheckin = event => {
    event.preventDefault();
    const newCheckinsLeft = ticket.checkins_left - 1;
    checkinTicket({ variables: { code, checkins_left: newCheckinsLeft }})
  };

  const reset = () => {
    location.reload();
    // setCode("");
    // setDoLockCode(false);
    // scanner.current.start();
  }

  console.log(data);

  return (
    <div>
      <div>
        <h2>Token invoer</h2>
        <TokenEntry />
      </div>
      
      <div>
        <h2>Check-in</h2>
        { !doLockCode && 
          (<Fragment><video width="100%" ref={display}></video>
          <form onSubmit={onGetTicket}>
            <FormControl>
              <InputLabel htmlFor="code">Code</InputLabel>
              <Input id="code" placeholder="" type="text" onChange={(e) => setCode(e.target.value)} />
            </FormControl>&nbsp;&nbsp;
            <Button variant="contained" type="submit">Ophalen</Button>
          </form></Fragment>) }
      </div>

      <div>
        {loadingTicket && 'Loading...'}
        {errorTicket && `Error! ${errorTicket.message}`}
        {doLockCode && dataTicket && `${ticket.name}, ${ticket.type == 0 ? 'dagkaart' : 'weekkaart'}, ${ticket.checkins_left} bezoeken over`}
      </div>

      {doLockCode &&
        (<div>
          <Button variant="contained" onClick={handleCheckin}>Check in</Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={reset}>Reset</Button>
        </div>)}

      <div>
        {loading && 'Loading...'}
        {error && `Error! ${error.message}`}
        {data && `Opgeslagen! ${data.update_tickets_by_pk.checkins_left} bezoeken over`}
      </div>
    </div>
  );
}
