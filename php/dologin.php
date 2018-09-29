<?php
header("Content-Type:text/html;charset=utf-8");
// 允许所有域名跨域
header("Access-Control-Allow-Origin:*");
    // 获取ajax发送过来的用户名和密码
    // 获取post请求发送过来的json字符串数据
$json = file_get_contents('php://input');
// 将json字符串转换为对象
$json = json_decode($json);
// 从对象中抽取数据
$username = $json->{"username"};
$password = $json->{"password"};
    // 建立数据库链接
$link = new mysqli('localhost', 'root', '9511', 'admin', 3306);
    // 设置数据库字符集
$link->query("set names 'utf8'");
$link->query("set charactor set 'utf8'");
    // 准备sql查询语句
if ($password == '') {
    $select_sql = "SELECT username from user where username = '$username'";
    $result = $link->query($select_sql);
    $rows = $result->fetch_assoc();
    // $rows = json_encode($rows);
    if ($rows == null) {
        $arr = array("code" => "1001", "msg" => "用户名不存在");
    } else {
        $arr = array("code" => "201", "msg" => "");
    }
    $arr = json_encode($arr);
    echo $arr;
} else if ($password != '') {
    $select_sql = "SELECT username,password from user where username = '$username' && password = '$password'";
        // 执行sql查询语句，并返回值
    $result = $link->query($select_sql);
        // 对返回回来的数据进行处理
    $rows = $result->fetch_assoc();
    // $rows = json_encode($rows);
    if ($rows == null) {
        $arr = array("code" => "1000", "msg" => "登录失败，用户名或密码错误");
    } else {
        $arr = array("code" => "200", "msg" => "");
    }
    $arr = json_encode($arr);
    echo $arr;
}
?>