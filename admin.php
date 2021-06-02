<?php
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
    $searchID = $_POST['bookingID'];
    // retrive associated date if user put valid booking reference number
    if (isset($searchID)) {
        $searchTableQuery = "SELECT * FROM $sql_tble where BookingID = '$searchID'";
        $result = mysqli_query($conn, $searchTableQuery);

        if (!$result) {
            echo"Something went wrong with the search!";
        } else {
            while ($row = mysqli_fetch_assoc($result)) {
                $pickUpDate = date('d/m/y', strtotime($row['PickUpDate'])); //retive the date in the right format from php database

                $pickUpTime = date('H:i', strtotime($row['PickUpTim']));//retive the time in the right format from php database

                echo "<tr>
							<td>".$row['BookingID']."</td>
							<td>".$row['CustomerName']."</td>
							<td>".$row['PhoneNumber']."</td>
							<td>".$row['UnitNumber']."</td>
							<td>".$row['StreetNumber']."</td>
							<td>".$row['StreetName']."</td>
							<td>".$row['Suburb']."</td>
							<td>".$row['DestinationSuburb']."</td>
							<td>".$pickUpDate."</td>
							<td>".$pickUpTime."</td>
							<td>".$row['BookingStatus']."</td>

							</tr>";
            }
        }
    }
}
    // retrive Booking Status "unassigned" data(within 2 hours from now) if user put nothing on the booking ID.
        if (empty($searchID)) {
            $searchQuery = "SELECT * FROM $sql_tble WHERE BookingStatus = 'unassigned' ";

            $resultNullSearch = mysqli_query($conn, $searchQuery);

            if ($resultNullSearch) {
                while ($row = mysqli_fetch_assoc($resultNullSearch)) {
                    $pickUpDate = date('d/m/y', strtotime($row['PickUpDate'])); //retive the date in the right format from php database

                    $pickUpTime = date('H:i', strtotime($row['PickUpTim']));//retive the time in the right format from php database

                    $recordTime = strtotime($row['PickUpDate'].''.$row['PickUpTim']);

                    $currentTime =  time()- $recordTime;

                    if ($currentTime < 7200) { //conditoin for retive booking within next two hours
                        echo"<tr>
                						<td>".$row['BookingID']."</td>
                						<td>".$row['CustomerName']."</td>
                						<td>".$row['PhoneNumber']."</td>
                						<td>".$row['UnitNumber']."</td>
                						<td>".$row['StreetNumber']."</td> 
                						<td>".$row['StreetName']."</td>
                						<td>".$row['Suburb']."</td>
                						<td>".$row['DestinationSuburb']."</td>
                						<td>".$pickUpDate."</td>
                						<td>".$pickUpTime."</td>
                						<td>".$row['BookingStatus']."</td>
                            </tr>";
                    }
                }
            }else {
                echo"No Booking for today in next 2 hours";
            }
        }

        //free result
        mysqli_free_result($resultNullSearch);
        //close database connection
        mysqli_close($conn);
