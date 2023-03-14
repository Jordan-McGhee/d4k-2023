BACKEND
<!-- - double check isPaid and updatePaid logic with frontend code DONE -->
    <!-- - update controllers and routes to account for new donation table DONE -->
    - create view that sums donations by username and order amounts

<!-- FRONTEND -->
<!-- - go through and update routes/paths from old frontend DONE -->

- APP.js
    - make admin page not adhere to same width settings
    - update mainNav to be same width
    - add 404 not found page

- ADMIN
    <!-- - figure out how to load all orders and filter accordingly DONE
    - add functionality to update paid/completed/delete DONE
    - add comments into rows that have them DONE -->
    - Add in ability to close tables with dropdown
    - Add recently updated identifier based on last update
    - Remove navigate from AdminTableRow and use something better to re-render tables
    - add a tab section to close tabs and check values
    - make table scrollable?
    - Add table for donations

- TAB
    - move tab out from being own page and make it a button to switch between tab and admin pages
    - finish building out functionality in TabTableRow
    - maybe add field to getOrdersGrouped for if total_unpaid = 0 and that will allow us to undo marking a tab closed?
    - figure out donations
    - make table scrollable?
    <!-- - add separate queries for paid/unpaid? DONE -->

- QUEUE:
    <!-- - Go through queue, queueList, queueItem and update to match what is returned from database DONE -->
    - Add EDIT/DELETE FUNCTIONALITY TO QUEUE BASED ON USER's NAME IN LOCALSTORAGE
    - check localStorage username against names in queue and make the card different somehow

- ORDER
    <!-- - make it where form can't be submitted if any inputs are blank DONE
    - add option to enter in own drink DONE
    - Save username to local storage DONE -->
    - don't let user change name
    - Add a check to see if a user already exists with that name and isn't stored in local storage
    <!-- - add donation field DONE -->
    - on donation buttons:
        - make them grey out if not selected
        - add field popup if other is selected
        <!-- - if other is selected, update OTHER to reflect value chosen DONE -->
    - store tab info in local storage ?
        - separate donation and order total?
    - update both ends to account for new donation table

- MENU
    <!-- - make it where clicking "Add to Order" populates form in Order page DONE -->
    <!-- — make top buttons sticky and actually redirect to different sections of the page DONE -->
    - make sticky buttons look better so everything that scrolls underneath is no longer visible

- LEADERBOARD
    - make that shit (mobile and other version)
    <!-- - add sum query to backend to get total of all orders submitted DONE -->
    - have whole page refresh every minute?
    - UPDATE backend to total order_totals and total_donated


- ADD WAY TO PAY (LINK TO VENMO/PAYPAL/ETC)
- maybe add userTotal to localStorage??