
# Muni University Service Directory

A front-end web application that helps students, staff, visitors and new university members find services on the Muni University campus, check whether they are open, and get simple directions.

Built for ITM-1131, Group 2. The project uses sample data and browser-side processing only: there is no database, login or server.

Live site: ADD-LINK-HERE (GitHub Pages)
Repository: https://github.com/maysalwa41/group2-university-service-directory

# Features
Feature	What it does
Service directory: Eight offices shown as cards with location, phone, email, opening hours and purpose
Search: Finds services by name, purpose, building, room, category or zone as you type
Category filter:	Narrows the list to one type of help, such as Technology or Health and welfare
Open status:	Each card shows "Open now" or "Closed now", and a summary line counts open services
Directions:	Selecting a service shows step-by-step text directions, a photo where available, and highlights its campus zone
Campus zone guide:	Four zones (A to D) describing what is found in each area
Feedback form:	Lets a user report incorrect information, with validation and clear success and error messages
Empty state:	A friendly message appears when no service matches the search

# Pages and sections

The app is a single page with three connected sections, reachable from the top navigation:

1. Find a service: (#directory): search, filter, summary and service cards.
2. Directions: (#directions): destination picker, directions panel and zone guide.
3. Report information: (#feedback): the feedback form.

# Technologies
. HTML5 with semantic landmarks, a skip link, labelled fields and live regions
. CSS3 in an external stylesheet: global box-sizing: border-box, Flexbox for layout, Grid for cards, filters and zones, and breakpoints for mobile, tablet and desktop
. JavaScript (ES6) with no libraries or build step

# Running the project
1. Clone the repository or download it as a ZIP file:
bash
git clone https://github.com/maysalwa41/group2-university-service-directory.git
2. Keep index.html, style.css, script.js and the image files together in the same folder.
3. Open index.html in a web browser.

# Deploying on GitHub Pages
1. Open the repository on GitHub and go to Settings, then Pages.
2. Under Build and deployment, choose Deploy from a branch.
3. Select the main branch and the / (root) folder, then save.
4. After a minute the site is live at https://maysalwa41.github.io/group2-university-service-directory/. Copy this link into the Live site line above.

# Project structure
.
├── index.html     Page structure and form
├── style.css      Styles and responsive layout
├── script.js      Data, search, directions and form logic
├── README.md      This file
└── *.jpeg / *.jpg / *.png   Campus photos, logo and map

# How the JavaScript is organised

The sample records live in one services array in script.js. Each record has an id, name, category (need), zone, building, room, phone, email, opening days and hours, purpose, optional image, and text directions.

Function	         Purpose
isOpenNow()	        Compares the current day and time with a service's opening days and hours
renderServices()	Draws the service cards and shows or hides the empty message
filterServices()	Applies the search text and category filter
summariseResults()	Shows how many services were found and how many are open
showDirections()	Displays directions, photo and contact details, and highlights the zone
validateField()    	Validate the feedback form and show success or error messages
submit Feedback     Validate the feedback form and show success or error messages
initializeApp()	    Fills the dropdowns and connects all event listeners

# Accessibility and responsiveness
. Skip-to-content link, one h1, logical heading order, and labels on every field
. Status messages use aria-live, and invalid fields use aria-invalid
. All controls work with the keyboard
. Layout adapts at 480, 650 and 1000 px (one, two, then three card columns) with no horizontal scrolling
# Sample data

All names, phone numbers (+256 700 000 10x) and email addresses (@sample.ac.ug) are made up for the assignment and are not real contact details.

# Known limitations
. Open and closed status uses the visitor's device clock, not campus time.
. The feedback form is a demonstration: reports are validated but not sent or stored.
. The category filter groups services by type of help, not by user group.
. Directions are written text descriptions, not an interactive map.

# Team
Member	Role and contribution
Name	e.g. HTML structure and accessibility
Name	e.g. CSS layout and responsive design
Name	e.g. JavaScript search, filter and directions
Name	e.g. data, images, feedback form and testing

Each member's work can be traced in the repository's commit history.

# Acknowledgements

Course: ITM-1131, Muni University.     