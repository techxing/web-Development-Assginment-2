/*
This js file process all user input data from booking page
*/


function sendtophp(dataSource, targetDiv, cname, phone, unumber, snumber, stname, sbname, dsbname, date, time) {
  var xhr = createRequest();

  if (xhr) {

    cname = document.getElementById('cname').value;
    phone = document.getElementById('phone').value;
    unumber = document.getElementById('unumber').value;
    snumber = document.getElementById('snumber').value;
    stname = document.getElementById('stname').value;
    sbname = document.getElementById('sbname').value;
    dsbname = document.getElementById('dsbname').value;
    date = document.getElementById('datefield').value;
    time = document.getElementById('timefield').value;
    var obj = document.getElementById('targetDiv');

    var requestbody = 'cname=' + encodeURIComponent(cname) +
      '&phone=' + encodeURIComponent(phone) +
      '&unumber=' + encodeURIComponent(unumber) +
      '&snumber=' + encodeURIComponent(snumber) +
      '&stname=' + encodeURIComponent(stname) +
      '&sbname=' + encodeURIComponent(sbname) +
      '&dsbname=' + encodeURIComponent(dsbname) +
      '&datefield=' + encodeURIComponent(date) +
      '&timefield=' + encodeURIComponent(time);


    xhr.open('POST', 'booking.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      alert(xhr.readyState);
      if (xhr.readyState == 4 && xhr.status == 200) {
        obj.innerHTML = xhr.responseText;
      } // end if
    }; // end anonymous call-back function
    xhr.send(requestbody);
  } // end if
} //end of function


//function to check user input not null.
function checkInput() {
  var name = document.getElementById('cname');
  var phone = document.getElementById('phone');
  var unitNumber = document.getElementById('unumber');
  var streetNumber = document.getElementById('snumber');
  var streetName = document.getElementById('stname');
  var suburb = document.getElementById('sbname');
  var destinationSuburb = document.getElementById('dsbname');
  var date = document.getElementById('datefield');
  var time = document.getElementById('timefield');

  //setting error boolean for each input feild
  var nameErr = phoneErr = true;
  unitNumberErr = streetNameErr = true;
  streetNameErr = suburbErr = true;
  destinationSuburbErr = dateErr = timeErr = true;

  if (name.value.trim() === '') {
    setErrorFor(name, 'Name cannot be blank');
  } else {
    var regex = /^[a-zA-Z\s]+$/; // only accpet letters for customer name.
    if (regex.test(name.value) === false) {
      setErrorFor(name, 'Name is invaild');
    } else {
      {
        setSuccessFor(name);
        nameErr = false;
      }
    }
  }

  if (phone.value.trim() === '') {

    setErrorFor(phone, 'phone cannot be blank'); // only allwo digits for phone numbers.

  } else {
    var regex = /^[0-9]+$/; //only accpet number for phone number
    if (regex.test(phone.value) === false) {
      setErrorFor(phone, 'Phone number is invaild');
    } else {
      setSuccessFor(phone);
      phoneErr = false;
    }
  }

  if (unitNumber.value.trim() === '') {
    //allow unit number to have both numbers and letters i.e. 2A
    setErrorFor(unitNumber, 'Unit number is blank, please put n/a if null');
  } else {
    setSuccessFor(unitNumber);
    unitNumberErr = false;
  }

  if (streetNumber.value.trim() === '') {
    //allow unit number to have both numbers and letters i.e. 2A

    setErrorFor(streetNumber, 'Street number cannot be blank');
  } else {
    setSuccessFor(streetNumber);
    streetNumberErr = false;
  }

  if (streetName.value.trim() === '') {
    setErrorFor(streetName, 'Street number cannot be blank');
  } else {
    var regex = /^[a-zA-Z\s]+$/; //street name has letters only
    if (regex.test(streetName.value) === false) {
      setErrorFor(streetName, 'Street Name is invaild');
    } else {
      setSuccessFor(streetName);
      streetNameErr = false;
    }

  }

  if (suburb.value.trim() === '') {

    setErrorFor(suburb, 'Suburb is blank, please put NA if null');
  } else {
    var regex = /^[a-zA-Z\s]+$/; //suburb name has letters only
    if (regex.test(suburb.value.trim()) === false) {
      setErrorFor(suburb, 'Suburb is invaild');

    } else {
      setSuccessFor(suburb);
      suburbErr = false;
    }
  }

  if (destinationSuburb.value.trim() === '') {

    setErrorFor(destinationSuburb, 'Destination is blank, please put NA if null');
  } else {
    var regex = /^[a-zA-Z\s]+$/; //suburb name accpet letters only
    if (regex.test(destinationSuburb.value.trim()) === false) {
      setErrorFor(destinationSuburb, 'Destination is invaild');
    } else {
      setSuccessFor(destinationSuburb);
      destinationSuburbErr = false;
    }
  }

  if (datefield.value.trim() === '') {

    setErrorFor(datefield, 'Pick-Up Date cannot be blank');
  } else {
    setSuccessFor(datefield);
    dateErr = false;
  }

  if (timefield.value.trim() === '') {

    setErrorFor(timefield, 'Pick-Up Date cannot be blank');
  } else {
    setSuccessFor(timefield);
    timeErr = false;
  }

  if ((nameErr || phoneErr || unitNumberErr || streetNumberErr || streetNameErr || suburbErr || destinationSuburbErr || dateErr || timeErr) == false) {

    return sendtophp('booking.php', targetDiv, cname, phone, unumber, snumber, stname, sbname, dsbname, date, time);

  }
}

//helper function for give out error message in small element
function setErrorFor(input, message) {
  var parent = input.parentElement;
  var small = parent.querySelector('small');
  small.style.visibility = 'visible';
  //add error message inside small element
  small.innerText = message;
  parent.classList.add('error');
  parent.classList.remove('success');

}
//helper function for for successful input, and highlighting formbox in green and hidden the small element

function setSuccessFor(input) {
  var parent = input.parentElement;
  var small = parent.querySelector('small');
  small.style.visibility = 'hidden';
  parent.classList.add('success');
  parent.classList.remove('error');
}
