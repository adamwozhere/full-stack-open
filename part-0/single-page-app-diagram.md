# Single Page App

Sequence diagram for visiting the Single Page App version of the notes app

```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/js.js
  activate server
  server->>browser: JavaScript file
  deactivate server
```

