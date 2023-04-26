BACKEND
<!-- - double check isPaid and updatePaid logic with frontend code DONE -->
<!-- - update controllers and routes to account for new donation table DONE -->
<!-- - create view that sums donations by username and order amounts DONE -->
<!-- - Bug if a user deletes their order in queue, but it has a donation attached. Messes up the total for the leaderboard DONE -->
<!-- - Bug if user donates, but doesn't order a drink. Doesn't load correctly in leaderboard DONE -->

<!-- FRONTEND -->
<!-- - go through and update routes/paths from old frontend DONE -->
<!-- - PROVIDE ALTERNATE STYLING FOR SELECTED BUTTONS DONE -->

- APP.js
    <!-- - make admin page not adhere to same width settings DONE -->
    <!-- - update mainNav to be same width DONE -->
    <!-- - add 404 not found page DONE -->

- ADMIN
    <!-- - figure out how to load all orders and filter accordingly DONE
    - add functionality to update paid/completed/delete DONE
    - add comments into rows that have them DONE -->
    <!-- ???? REVIST - Add in ability to close tables with dropdown -->
    - Add recently updated identifier based on last update
    - Fix Date/time
    <!-- !!!! NO - Remove navigate from AdminTableRow and use something better to re-render tables -->
    <!-- - add a tab section to close tabs and check values DONE -->
    <!-- !!!! NO - make table scrollable? -->
    <!-- - Add table for donations DONE -->
    <!-- ???? REVISIT - Add Search/filter functionality  -->

- FAQ
    <!-- - redesign DONE -->

- TAB
    <!-- !!!! NO - move tab out from being own page and make it a button to switch between tab and admin pages -->
    <!-- - finish building out functionality in TabTableRow DONE -->
    <!-- !!!! NO - maybe add field to getOrdersGrouped for if total_unpaid = 0 and that will allow us to undo marking a tab closed? -->
    <!-- - figure out donations DONE -->
    <!-- !!!! NO - make table scrollable? -->
    <!-- - redo table to align with new backend queries and view DONE -->
    <!-- - add separate queries for paid/unpaid? DONE -->
    <!-- ???? REVISIT - add modal for confirming close tab?  -->
    <!-- - add functionality to close all donations for a user and make "Add Donation" a modal pop-up form? DONE -->
    <!-- ???? REVISIT - Add Search/filter functionality -->
    - have feedback for unsuccessful donation
    - Fix Date/time

- QUEUE:
    <!-- - Go through queue, queueList, queueItem and update to match what is returned from database DONE -->
    <!-- ???? REVISIT - after order is submitted, scroll down to their spot in line -->
    <!-- - update cards to look better DONE -->
    <!-- - Add EDIT/DELETE FUNCTIONALITY TO QUEUE BASED ON USER's NAME IN LOCALSTORAGE DONE -->
    <!-- - check localStorage username against names in queue and make the card different somehow DONE -->
    <!-- - Add state for if data comes back empty DONE -->

- ORDER
    <!-- - make it where form can't be submitted if any inputs are blank DONE
    - add option to enter in own drink DONE
    - Save username to local storage DONE -->
    <!-- - don't let user change name DONE -->
    <!-- !!!! NO - Add a check to see if a user already exists with that name and isn't stored in local storage -->
    <!-- - add donation field DONE -->
    <!-- - submit button: -->
    <!-- - grey out/disable until form is filled -->
    <!-- - on donation buttons: DONE -->
    <!-- - make them grey out if not selected DONE -->
    <!-- - add field popup if other is selected DONE -->
    <!-- - if other is selected, update OTHER to reflect value chosen DONE -->
    <!-- - update both ends to account for new donation table DONE -->
    <!-- - allow user to deselect donate option DONE -->

— DONATE
    <!-- - don't let user change name DONE -->
    <!-- - make that shit DONE -->
    <!-- - grey out/disable submit until donation and name are filled -->
    <!-- - grey out/disable green check if custom donation amount is empty -->
    <!-- - allow user to deselect donate option DONE -->

- MENU
    <!-- - make it where clicking "Add to Order" populates form in Order page DONE -->
    <!-- — make top buttons sticky and actually redirect to different sections of the page DONE -->
    <!-- - make sticky buttons look better so everything that scrolls underneath is no longer visible DONE -->

- LEADERBOARD
    <!-- - make that shit (mobile and other version) DONE -->
    <!-- - add sum query to backend to get total of all orders submitted DONE -->
    - have whole page refresh every minute?
    - Improve Honorable Mentions
    <!-- - UPDATE backend to total order_totals and total_donated DONE -->
    <!-- - Add state for if data comes back empty DONE -->

- PAYMENT
    <!-- - update links to pay correctly DONE -->
    <!-- !!!! NO - maybe add userTotal to localStorage?? -->

- Extra Shit
    - Animation for when goal is hit?