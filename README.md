## Pokkit Starter

This is a starter project for the Pokkit suite. It is a NextJS app with a TS server and a Pocketbase instance.

## Dev Setup

Use the following commands in 3 different terminals to run the app with appropriate dev feedback:

- `npm run dev1` // this runs the NextJS app
- `npm run dev2` // this runs the TS server
- `npm run dev3` // this runs the Pocketbase instance

Log in to Pocketbase at http://127.0.0.1:8090/_/ and use admin credentials;

- username: admin@admin.com
- password: admin@admin.com

Make sure to change the password before going live - or change immediately to avoid this issue.

## Database setup

- `db:create-backup` // creates a backup of the database using the pocketbase naming convention
- `db:replace-seed` // replaces the currently saved backup seed
- `db:restore-seed` // restores the currently saved backup seed
