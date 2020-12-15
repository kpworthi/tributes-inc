# Tributes Inc.
### Fictional 'tribute' designer as a personal project

## Goal
Create a multi-page website incorporating multiple functionalaties learned over the the legacy full-stack freeCodeCamp curriculum.

### User Stories:
1. Have a landing page, a pricing/products page, and a directory page
1. Users can register their own account
1. Users are able to view an account management page
1. Users can create up to two types of 'tribute' pages from pre-made templates
1. MongoDB is utilized for account authentication and user-created content
1. Server to be created using Node.js and Express.js

### 0.3.2 changes
1. Implemented server route testing
1. Implemented log-in / registration testing

- Log-out API call now checks to see if user is even logged in first, just in case.
- ensureAuthenticated was properly renamed to ensureNotAuthenticated
- Routes now use both ensureAuthenticated and ensureNotAuthenticated

### 0.3.1 changes
1. Fixed an issue with cookies not being delivered properly

### 0.3.0 changes
1. Added mongoDB collection for user registration
1. Modified log-in area to submit actual requests
1. Log-in and registration buttons display feedback under them
1. Server authenticates users via Passport / mongoDB
1. Site retains session info via a mongo store
1. On successful registration or log-in, user is redirected to an account landing page
1. On subsequent log-ins, the user's last log-in date is updated

- Changed arguments passed from auth.js click handler to submission functions
- Initially, server replied with string for auth checks. Moved to json
- Finally changed login page filename to 'login' instead of having two 'auth' files
- Account landing page with basic tab functionality implemented as a placeholder.

### 0.2.0 changes
1. Modified base html page for React.
1. Added React main file (index) and subsequent components for header, footer, and the main pages (home, products, the directory and the log-in button).
1. Created (mostly) placeholder information on each page
1. Layout frameworks in place courtesy of Bootstrap
1. Made modifications for better viewing on mobile
1. Added the dependencies for Passport on the server in preparation for user account handling
