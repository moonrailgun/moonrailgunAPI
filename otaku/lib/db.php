<?php
class DB{
	var $dbPath = "../app-list.json";

	function addFile($fileData){
		$data = file_get_contents($dbPath);
		$json = json_decode($data);
		array_push($json,$fileData);
		this->save($json);
	}

	function save($data){
		$myfile = fopen($dbPath, "w") or die("Unable to open file!");
		$txt = json_encode($data);
		fwrite($myfile, $txt);
		fclose($myfile);
	}
}

$db = new DB();
?>