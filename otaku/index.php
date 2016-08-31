<?php
$apps = file_get_contents("./app-list.json");

echo $apps
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<form action="upload.php" method="post" enctype="multipart/form-data">
	<label for="file">上传应用压缩包:</label>
	<input type="file" name="file" id="file" />
	<br />
	<input type="submit" name="submit" value="上传" />
</form>
</body>
</html>
