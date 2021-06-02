<?php
/*
This is php updated searched booking ID's booking Status to Assgined.
*/

//set default time zone for New Zealand
date_default_timezone_set('NZ');
require_once 'sqlinfo.inc.php';
// assign variable to server connection.
$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db) or die("<p>Server connection failed !</p>");

// check database connection.
if (!$conn) {
    echo "Database connection failed";
} else {
    $sql_tble = "CabsOnline";
    $searchID = $_POST["bookingID"];
    // retrive associated date if user put valid booking reference number
    if (isset($searchID)) {
        $updateQuery = "UPDATE $sql_tble SET BookingStatus ='assigned' WHERE BookingID = $searchID";
        $result = mysqli_query($conn, $updateQuery);

        if (!$result) {
            echo"Something went wrong with query!";
        } else {

              echo"Booking reference number $searchID has been assigned a Taxi";
            }
        }
        else{
          echo" Plesae enter booking ID";
        }
    }

    //free $result
    mysqli_free_result($result);
    //close date base connection
    mysql_close($conn);
?>
