# Simple Event Tickets
A simple web app that creates / displays / validates QR code tickets using a Hasura/Postgres database.

## Description
There are three endpoints:

* sell - for creating tickets which will have to be sent by mail manually (see also [Simple Event Tickets Sender](https://github.com/kretep/simple-event-tickets-sender)).
* ticket - shows the ticket using the code in the url.
* scan - QR code scanner that validates a ticket.

The `sell` and `scan` endpoints require a JWT token to be filled (manually at the moment) for authentication.

## Install

```
npm install
```

## Run dev

You'll have to make a database with GraphQL interface (Hasura) available yourself. The path to the GraphQL endpoint is currently hard-coded. See below for database & Hasura configuration.

```
npm run dev -- --https
```

## Build
This builds a static version of the webapp with all the endpoints to src/dist:
```
npm run build
```

## Database + Hasura setup

An easy way to setup a Hasura instance is by using Heroku. Follow these steps: https://github.com/hasura/graphql-engine-heroku

Set up these config vars:

```
DATABASE_URL=<database connection string>
HASURA_GRAPHQL_ADMIN_SECRET=<secret only for hasura admin>
HASURA_GRAPHQL_ENABLE_ALLOWLIST=true
HASURA_GRAPHQL_JWT_SECRET={"type":"HS256", "key":"<your JWT secret>"}
HASURA_GRAPHQL_UNAUTHORIZED_ROLE=public
```

### Initialize the database

There's only one table in the database: `tickets`. TODO: add schema.

### Permissions

Besides admin, there are three roles that have the following permissions on the `tickets` table.

* public - for viewing a ticket with the provided code, has only select permissions on the `code`, `type` and `checkins_left` columns.
* scanner - for validating a ticket, has all select permissions and update permission on the `checkins_left` and `log` column.
* seller - for selling a ticket, has all insert and select permissions.

### Allow List

The allow list should be enabled (environment variable above) and the exact queries can be specified in the Hasura console (tucked away a bit, use the gear icon in the top right and select `Allow List` in the left sidebar).

Add the exact queries as used in the code (the gql strings).

## Creating JWT tokens

Use https://jwt.io/
TODO: add payload examples

## Example deployment overview

![example deployment overview](images/deployment.png)
