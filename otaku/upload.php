<?php
header("content-type:text/html;charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

$app_name        = $_POST["app-name"];
$app_type        = $_POST["app-type"];
$app_version     = $_POST["app-version-first"] . "." . $_POST["app-version-second"] . "." . $_POST["app-version-third"];
$app_author      = $_POST["app-author"];
$app_description = $_POST["app-description"];
$app_snapshoot   = $_POST["app-snapshoot-json"];

echo "应用名称:" . $app_name . "<br />";
echo "应用类型:" . $app_type . "<br />";
echo "应用版本:" . $app_version . "<br />";
echo "应用作者:" . $app_author . "<br />";
echo "应用说明:" . $app_description . "<br />";
echo "应用快照:" . $app_snapshoot . "<br />";
echo "<br />";

//上传文件
if (($_FILES["file"]["type"] == "application/x-zip-compressed")
    && ($_FILES["file"]["size"] < 1 * 1024 * 1024)) {

    if ($_FILES["file"]["error"] > 0) {
        echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
    } else {
        echo "Upload: " . $_FILES["file"]["name"] . "<br />";
        echo "Type: " . $_FILES["file"]["type"] . "<br />";
        echo "Size: " . ($_FILES["file"]["size"]) . "Byte<br />";
        echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
        echo "<br />";

        $catalogPath = "catalog.json";
        $content     = file_get_contents($catalogPath);
        if (is_uploaded_file($_FILES['file']['tmp_name']) && $content != false) {
            $json       = json_decode($content, true);
            $max_app_id = 0;
            for ($i = 0; $i < count($json); $i++) {
                if ($json[$i]["id"] > $max_app_id) {
                    $max_app_id = $json[$i]["id"];
                }

                if ($json[$i]["name"] == $app_name) {
                    die("上传中断！该应用重名");
                }
            }
            $app_id                 = $max_app_id + 1;
            $new_app["id"]          = $app_id;
            $new_app["name"]        = $app_name;
            $new_app["type"]        = $app_type;
            $new_app["version"]     = $app_version;
            $new_app["author"]      = $app_author;
            $new_app["description"] = $app_description;
            $new_app["snapshoot"]   = $app_snapshoot;
            $new_app["size"]        = $_FILES["file"]["size"];
            $new_app["createdTime"] = date("Y-m-d h:i:s");
            $new_app["updatedTime"] = date("Y-m-d h:i:s");

            $file_extend = pathinfo($_FILES["file"]["name"])["extension"]; //文件扩展名
            if (move_uploaded_file($_FILES['file']['tmp_name'], 'apps/' . $app_id . "." . $file_extend)) {
                echo "存储于: " . "upload/" . $app_id . "." . $file_extend . "<br /><br />";

                //文件保存完毕。写入JSON
                array_push($json, $new_app);
                $myfile = fopen($catalogPath, "w") or die("Unable to open file!");
                $txt    = json_encode($json);
                fwrite($myfile, $txt);
                fclose($myfile);

                echo '<a href="index.html">返回首页</a>';
            } else {
                echo "失败";
            }
        } else {
            echo "写入失败:目录文件内容不存在";
        }
    }
} else {
    echo "Invalid file";
}
