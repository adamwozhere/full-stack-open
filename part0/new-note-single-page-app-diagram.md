# New note with Single Page App

Sequence diagram for creating a new note on the Single Page App version of the notes app

```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (note json data)
  activate server
  server->>browser: Status 201: created
  deactivate server
```
