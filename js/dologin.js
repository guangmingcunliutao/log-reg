var dologin = (function () {
    return {
        init: function () {
            // 获取登录和注册按钮
            this.$loginBtn = document.querySelector('.login');
            this.$register = document.querySelector('.register');
            // 获取用户名和密码输入框
            this.$nameInp = document.querySelector('#username');
            this.$pwdInp = document.querySelector('#password');
            this.event();
        },
        event: function () {
            var _this = this;
            // 用户名验证
            this.$nameInp.addEventListener('change', this.regUsername, false);
            // 添加登录按钮点击事件
            this.$loginBtn.onclick = function () {
                // 获取用户名和密码框的值
                var username = _this.$nameInp.value;
                var password = _this.$pwdInp.value;
                // 验证如果用户名或者密码为空，直接返回
                if (username == '' || password == '') {
                    alert('用户名或密码不能为空');
                    return;
                }
                // 获取数据
                _this.getData(username, password);
            }
            // 添加注册按钮点击事件
            this.$register.onclick = function () {
                // 跳转到注册页面
                window.location.assign('register.html');
            }
        },
        getData: function (username, password) {
            var _this = this;
            var params = {
                method: 'POST',
                data: {
                    username: username,
                    password: password || ''
                },
                // 获取查询数据库之后的数据
                success: function (data) {
                    // 对数据进行处理
                    // console.log(data);
                    _this.handleData(data);
                }
            }
            // 发送请求
            sendAjax('http://localhost:1101/php/admin/php/dologin.php', params);
        },
        // 对返回的数据进行验证
        handleData: function (data) {
            // 如果用户名不存在，返回null
            if (data.code == 200) {
                alert('登录成功');
            } else if (data.code == 1000) {
                alert(data.msg);
            } else if (data.code == 1001) {
                alert(data.msg);
            }
        },
        regUsername: function () {
            if (this.value == '') {
                dologin.$loginBtn.disabled = '';
                return;
            }
            var reg = /^[a-zA-Z]\w{0,14}$/;
            // 这个this指向事件绑定元素
            if (!reg.test(this.value)) {
                // 如果用户名不符合正则，提示
                alert('用户名只能是15位以内的数字字母下划线');
                dologin.$loginBtn.disabled = 'disable';
            } else {
                // 这里不能使用this的原因是事件处理程序里面的this指向事件绑定元素
                dologin.$loginBtn.disabled = '';
                dologin.getData(this.value);
            }
        }
    }
}());