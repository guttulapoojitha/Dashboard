# Overview

  A simple, responsive dashboard that fetches JSON data from a mock API (/api/dashboard.json) and displays:

  KPIs (total/open tickets, MTTR, uptime)

  Table of open tickets by department

  Fuel consumption bar

  MTTR history chart using Chart.js 

 # How to Run

  Open index.html in a browser.

  Ensure a local server is running (e.g., VS Code `Live Server`) so that the fetch API works.

  Click `Go to Dashboard` to open ``dashboard.html`` and see the populated dashboard.

# Notes

  Data is fetched from `api/dashboard.json`.

  Chart.js is used for MTTR history; and for all other elements use plain HTML, CSS, and JS.