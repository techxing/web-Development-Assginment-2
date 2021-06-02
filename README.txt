This is a simple web-based taxi booking system called Cabs online:
Files included:

booking.HTML - take user input, booing will not be confirmed until user fill out all correct and required information.
booking.js - process and validate user input (upon invalid input error message will show on booking.html, then send to booking.php.
booking.php - process user input, and update into php database

adminlogin.html - provide login for user and redirect to amdmin.html - User Name and password both are 'admin'
admin.html- enable user to search booking with booking reference number also out put a booking table in the
admin.js - provide functions for both adminglogin and admin.html. process request from user and send to php files.
admin.php - process input from admin.html(when search button clicked). retrieve data from php database.
assignTaxi.php - process input (booking ID) from admin.html(when Assign button clicked). assign and update booking status.

taxi.css  - css stylesheet for all html pages except 'admin.html'.
admin.css  - css stylesheet for 'admin.html' ONLY.

How to use:

- client can book a taxi from booking.html. the each input will be validated and process then valid input will be insert into database. a confirmation will appear at bottom of the form upon successful booking.
- client can login to admin page to retrieve booking request entered from booking.html page with valid booking ID (reference number), if no booking id entered. those booking with "unassigned" booking status with in next 2 hours will appear.
- client and assign taxi to booking with "unassigned" booking status (user need put booking number in the search box). a confirmation of the assignment will send back to the client.
