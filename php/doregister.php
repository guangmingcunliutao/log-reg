<?php
header("Content-Type:text/html;charset=utf-8");
// 允许所有域名跨域
header("Access-Control-Allow-Origin:*");
    // 获取ajax发送过来的用户名和密码
$json = file_get_contents('php://input');
$json = json_decode($json);
$username = $json->{"username"};
$password = $json->{"password"};
    // 建立数据库链接
$link = new mysqli('localhost', 'root', '9511', 'admin', 3306);
    // 设置数据库字符集
$link->query("set names 'utf8'");
$link->query("set charactor set 'utf8'");
    // 准备sql语句
$select_sql = "SELECT username from user where username = '$username'";
$insert_sql = "INSERT into user values (null,'$username','$password')";
    // 执行sql语句，并返回值
if ($password != '') {
    $result = $link->query($select_sql);
    $rows = $result->fetch_assoc();
    if ($rows != null) {
        $arr = array("code" => "1000", "msg" => "用户已经存在");
        $arr = json_encode($arr);
        echo $arr;
    } else {
        $result = $link->query($insert_sql);
        if ($result) {
            $arr = array("code" => "200", "msg" => "注册成功");
            $arr = json_encode($arr);
            echo $arr;
        }
    }
} else if ($password == '') {
    $result = $link->query($select_sql);
    $rows = $result->fetch_assoc();
    if ($rows != null) {
        $arr = array("code" => "1001", "msg" => "用户已经存在");
        $arr = json_encode($arr);
        echo $arr;
    } else {
        $arr = array("code" => "201", "msg" => "可以注册");
        $arr = json_encode($arr);
        echo $arr;
    }
}
?>