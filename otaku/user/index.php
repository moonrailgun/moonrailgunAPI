<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"></meta>
<title>用户登陆</title>
<link rel="stylesheet" href="../css/user.css">
</head>
<body>
    <section class="container">
        <div class="login">
            <h1>登陆</h1>
            <form action="login.php" method="post">
                <p>
                    <input name="login" placeholder="用户名" type="text" value=""/>
                </p>
                <p>
                    <input name="password" placeholder="密码" type="password" value=""/>
                </p>
                <p class="remember_me">
                    <label>
                        <input id="remember_me" name="remember_me" type="checkbox">
                            在本台电脑上记住
                        </input>
                    </label>
                </p>
                <p class="submit">
                    <input name="commit" type="submit" value="登陆"/>
                </p>
            </form>
        </div>
        <div class="login-help">
        	<p>还没有账号?<a href="#">点击此处注册</a>.</p>
            <p>忘记你的密码?<a href="#">点击此处重置</a>.</p>
        </div>
    </section>
</body>
</html>