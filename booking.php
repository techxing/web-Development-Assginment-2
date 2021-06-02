<?php
/*
This is php connect to data base and insert user input from booking page into data base.
*/

require_once 'sqlinfo.inc.php';
// assign variable to server connection.
$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db) or die("<p>Server connection failed !</p>");

// check database connection.

if (!$conn){

	echo "Database connection failed";
}

else
{
  $customerName = $_POST["cname"];
  $phone = $_POST["phone"];
  $unitNo = $_POST["unumber"];
  $stNo = $_POST["snumber"];
  $stName = $_POST["stname"];
  $suburb = $_POST["sbname"];
  $destination = $_POST["dsbname"];
  $pickUpDate = date('Y-m-d', strtotime($_POST["datefield"])); //sorting date into to php mysql format
  $pickUpTime = $_POST["timefield"];
  $bookingStatus = "unassigned";

  $sql_tble = "CabsOnline";

//insert test data into our database table.
	$insertTableQuery = "INSERT INTO $sql_tble (CustomerName,
    PhoneNumber,UnitNumber,StreetNumber,StreetName,Suburb,DestinationSuburb,PickUpDate,PickUpTim,BookingStatus) VALUES
    ('$customerName','$phone','$unitNo','$stNo','$stName','$suburb','$destination','$pickUpDate','$pickUpTime','$bookingStatus')";
	$result = mysqli_query ($conn, $insertTableQuery);
    if(!$result ){

      echo mysqli_error($conn);
    }

    else {
     $BookingID = mysqli_insert_id($conn);
     echo "<p name = reference>Thank you! Your booking reference number is $BookingID. You will be picked up in front of your provided address at $pickUpTime on $pickUpDate.</p> ";

    }
		//free $result
		mysqli_free_result($result);
		//close database connection
		mysqli_close($conn);

};

 ?>
