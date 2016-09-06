<?php
class DB
{
    $mysql_servername = "localhost";
    $mysql_username   = "root";
    $mysql_password   = "";
    $mysql_database   = "otaku";

    public function query(cmd)
    {
        $con = mysql_connect($mysql_servername, $mysql_username, $mysql_password);
        if (!$con) {
            die('Could not connect: ' . mysql_error());
        }

        mysql_select_db($mysql_database, $con);

        $result = mysql_query(cmd);
        mysql_close($con);

        return $result;
    }
}

$db = new DB();
?>