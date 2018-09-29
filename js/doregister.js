var doregister = (function () {
    return {
        init: function () {
            // 获取注册按钮和返回按钮
            this.$register = document.querySelector('.register');
            this.$goBack = document.querySelector('.goBack');
            // 获取三个文本框
            this.$username = document.querySelector('#username');
            this.$password = document.querySelector('#password');
            this.$repassword = document.querySelector('#repassword');
            this.event();
        },
        event: function () {
            var _this = this;
            this.$username.addEventListener('change',this.regusername,false);
            // 返回按钮添加点击事件
            this.$goBack.onclick = function () {
                window.location.assign('login.html');
            }
            // 注册按钮添加点击事件
            this.$register.onclick = function () {
                // 获取文本框的值
                var username = _this.$username.value;
                var password = _this.$password.value;
                var repassword = _this.$repassword.value;
                // 初始判断
                if (username == '' || password == '') {
                    alert('用户名或密码不能为空');
                } else if (password != repassword) {
                    alert('两次输入的密码不一致');
                } else {
                    // 获取数据
                    _this.getData(username, password);
                }
            }
        },
        getData: function (username, password) {
            var _this = this;
            var params = {
                method:'POST',
                data: {
                    username: username,
                    // 值验证用户名时，默认密码为空
                    password: password || ''
                },
                // 数据返回成功处理
                success: function (data) {
                    _this.handleData(data);
                }
            }
            // 发送请求
            sendAjax('http://localhost:1101/php/admin/php/doregister.php', params);
        },
        handleData:function(data){
            if (data.code == 1000) {
                alert(data.msg);
            } else if (data.code == 200) {
                alert(data.msg);
                // 注册成功，跳转到登录页面
                window.location.assign('login.html');
            }else if(data.code == 1001){
                alert(data.msg);
            }else if(data.code == 201){
                alert(data.msg);
            }
        },
        regusername:function(){
            if(this.value == ''){
                doregister.$register.disabled = '';
                return;
            }
            var reg = /^\w{1,16}$/;
            if(!reg.test(this.value)){
                alert('用户名只能是6到16的字母数字下划线');
                doregister.$register.disabled = 'disabled';
            }else{
                doregister.$register.disabled = '';
                // 验证用户名是否存在
                doregister.getData(this.value);
            }
        }
    }
}());