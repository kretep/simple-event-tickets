import { useQuery, gql } from "@apollo/client";
import React from "react";
import QRCode from "react-qr-code";
import jdLogo from "../images/jd-logo-bw.png";
import './ShowTicket.css';

const FETCH_TICKET = gql`
query fetchTicket($code: String!) {
  tickets(where: {code: {_eq: $code}}) {
    checkins_left
    type
    code
  }
}
`;

export function ShowTicket(props) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let code = params.get('code');

  const { loading, error, data } = useQuery(FETCH_TICKET, {
    variables: { code }
  });

  if (loading) return (<div className="message">Laden...</div>);
  if (error) return (<div className="message">Er is een fout opgetreden bij het ophalen van het ticket:<br />
    `${error.message}`</div>);

  const ticket = data.tickets[0];

  if (ticket === undefined) {
    return ( <div className="message">Ticket niet gevonden; controleer of de link correct is ingevoerd.</div>)
  }

  const { checkins_left, type } = ticket;
  return (
    <div className="grid-container">
      <div className="item1">
        <img style={{maxWidth: "50%"}} src={jdLogo} />
      </div>

      <div className="item2">
        <span style={{fontSize: "48px", fontWeight: "bold"}}>
          { type == 0 && "Dagkaart" }
          { type == 1 && "Weekkaart" }
          &nbsp;2021&nbsp;&nbsp;
        </span>

        <span style={{fontSize: "32px", fontWeight: "bold"}}>
        { checkins_left == 1 && `(${checkins_left} bezoek over)` }
        { checkins_left > 1 && `(${checkins_left} bezoeken over)` }

        </span>
      </div>

      <div className="item3" style={{width: "auto"}} >
        <QRCode value={code} /><br />
        <span style={{fontSize: "16px", textAlign: "center"}}>
          { code }
        </span>
      </div>
    </div>
  );
}
