<?php
$catalog = file_get_contents("./catalog.json");
$catalog = json_decode($catalog, true);
usort($catalog, 'timeSort');

function timeSort($a, $b)
{
    $time1 = strtotime($a["updatedTime"]);
    $time2 = strtotime($b["updatedTime"]);
    if ($time1 < $time2) {
        return 1;
    } else {
        return -1;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  <title>Otaku!</title>
</head>
<body class="container">
<div class="row">
  <div class="col-sm-offset-8">
    <a href="create.html" class="btn btn-info">创建应用</a>
  </div>
</div>
<table class="table table-hover">
  <thead>
    <tr>
      <th>id</th>
      <th>应用名称</th>
      <th>应用版本</th>
      <th>应用作者</th>
      <th>更新日期</th>
    </tr>
  </thead>
  <tbody>
<?php
foreach ($catalog as $index => $item) {
    echo '<tr><th>' . $item['id'] . '</th><td>' . $item['name'] . '</td><td>' . $item["version"] . '</td><td>@' . $item['author'] . '</td><td>' . $item['updatedTime'] . '</td></tr>';
}
?>
  </tbody>
</table>
</body>
</html>