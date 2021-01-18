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

### 0.4.1 changes
1. Users can now delete a created tribute from their account page under the 'Your Content' tab
1. Users can now hide or show a created tribute from their account page under the 'Your Content' tab
   - Showing or hiding a tribute that has not yet been approved will have no noticeable affect
   - Hidden tributes can still be viewed by direct link
1. A confirmation pop-up/modal will display when a user attempts to hide, show, or delete their tribute
1. Design pages will now appropriately flag a quote with no author or an author with no quote

### 0.4.0 changes
1. Users can now create a templated tribute page through their account page under the 'Create or Buy' tab
   - Two tribute templates are available, a biography style, and a timeline style
   - Template previews are available from the products page
   - After completion of a tribute page, the page requires review and approval by a site admin prior to being viewable
   - Regardless of approval status, the page will appear in the user's account page under "Your Content"
   - Once the tribute is approved, the tribute will be viewable by direct link, or by using the directory
1. The directory has been updated to show all approved tributes, and includes a filter bar that can be used to search by name
1. Page navigation has been reworked in the scripts so that forward/back browser navigation, as well as typing direct links, is now available

- Forms for filling out personal information are now available on the user's account page under "Profile", but are otherwise non-functional
- As payment information cannot be saved, and orders cannot be placed, Payment Information and History tabs only have light placeholder text
- The 'Create or Buy' store has image in place for the active cards (navigable to the template designers) but the other cards are grayed out

### 0.3.4 changes
1. Logo now points to the home page
1. Fixed centering on account page sub-heading placeholders

- portfolio assets and routing were added to the server. added gitignore as they do not pertain to tributes-inc

### 0.3.3 changes
1. finished coding templates
1. hooked templates into products page
1. templates pull data from database

-cleaned up switch in index.js

### 0.3.2 changes
1. Implemented server route testing
1. Implemented log-in / registration testing

- ensureAuthenticated was properly renamed to ensureNotAuthenticated
- a new ensureAuthenticated was added

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
