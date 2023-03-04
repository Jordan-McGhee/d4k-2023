<!-- BACKEND -->
<!-- - double check isPaid and updatePaid logic with frontend code DONE -->

<!-- FRONTEND -->
<!-- - go through and update routes/paths from old frontend DONE -->

- APP.js
    - make admin page not adhere to same width settings
    - update mainNav to be same width

- ADMIN
    <!-- - figure out how to load all orders and filter accordingly DONE
    - add functionality to update paid/completed/delete DONE
    - add comments into rows that have them DONE -->
    - Add in ability to close tables with dropdown
    - Add recently updated identifier based on last update
    - Remove navigate from AdminTableRow and use something better to re-render tables
    - add a tab section to close tabs and check values

- QUEUE:
    <!-- - Go through queue, queueList, queueItem and update to match what is returned from database DONE -->
    - Add EDIT/DELETE FUNCTIONALITY TO QUEUE BASED ON USER's NAME IN LOCALSTORAGE

- ORDER
    <!-- - make it where form can't be submitted if any inputs are blank DONE
    - add option to enter in own drink DONE
    - Save username to local storage DONE -->
    - add pop up if user tries to change name that's saved in localStorage

- MENU
    - make it where clicking "Add to Order" populates form in Order page
    — make top buttons sticky and actually redirect to different sections of the page

- LEADERBOARD
    - make that shit