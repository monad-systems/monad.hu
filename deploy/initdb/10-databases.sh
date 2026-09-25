#!/bin/sh
# One database and one owner per consumer, so Umami and the contact endpoint
# cannot read each other's tables. Runs once, on an empty data directory.
set -eu

create() {
  name=$1
  password=$(cat "$2")
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" \
    -v name="$name" -v password="$password" <<'SQL'
create role :"name" login password :'password';
create database :"name" owner :"name";
SQL
}

create umami "$UMAMI_DB_PASSWORD_FILE"
create contact "$CONTACT_DB_PASSWORD_FILE"
