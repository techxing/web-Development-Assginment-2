/*
This js file process all user input data from admin page
*/

//<!--adminlogin function redirect to admin.html upon successful login-->
function adminlogin() {

  var username = document.getElementById('userName').value;
  var password = document.getElementById('password').value;

  if (username == 'admin' && password == 'admin') {
    window.location.href = 'admin.html';
  } else {
    alert('Invalid input');
  }
}

//<!--function for getting booking request when search button clicked -->

function getBookingRequest() {
  var xhr = createRequest();
  if (xhr) {
    var bsearch = document.getElementById('bookingID').value;
    var obj = document.getElementById('targetDiv');
    var requestbody = 'bookingID=' + encodeURIComponent(bsearch);
    xhr.open('POST', 'admin.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      alert(xhr.readyState);
      if (xhr.readyState == 4 && xhr.status == 200) {
        obj.innerHTML = xhr.responseText;
      } // end if
    }; // end anonymous call-back function

    xhr.send(requestbody);
  } // end if
} // end function

//<!--fucntion for assigne booking when assign button clicked-->
function assignBooking() {
  var xhr = createRequest();
  if (xhr) {
    var bsearch = document.getElementById('bookingID').value;
    var obj = document.getElementById('assignTarget');
    var requestbody = 'bookingID=' + encodeURIComponent(bsearch);
    xhr.open('POST', 'assignTaxi.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      alert(xhr.readyState);
      if (xhr.readyState == 4 && xhr.status == 200) {
        obj.innerHTML = xhr.responseText;
      } // end if
    }; // end anonymous call-back function

    xhr.send(requestbody);
  } // end if
} // end function
