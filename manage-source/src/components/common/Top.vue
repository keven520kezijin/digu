<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="iconfont icon-ico-menu w-icon-menu"></i>
    </div>
    <!-- <div class="logo">后台管理系统</div> -->
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="iconfont icon-ico_setting"></i>
                    </el-tooltip>
                </div> -->
        <!-- 消息中心 -->
        <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="iconfont icon-ico_message"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
        <!-- <div class="user-name" @click="dialogVisible = true">
                    <el-tooltip effect="dark" content="退出登录" placement="bottom">
                        <i class="iconfont icon-ico_log-out"></i>
                    </el-tooltip>
                </div> -->

        <!-- <el-dropdown class="user-name" trigger="click">
                    <span class="el-dropdown-link">
                        <i class="iconfont icon-ico_log-out"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a @click="dialogVisible = true">
                            <el-dropdown-item>退出登录</el-dropdown-item> 
                        </a>
                    </el-dropdown-menu>
                </el-dropdown>  -->

        <!-- 用户头像 -->

        <!-- <a href="#/changepass">
                <span class="sidebar-user-head">
                    <img src="../../../static/img/user.png" alt="">
                </span>
                <p class="sidebar-user-name">{{username}}</p>
                <p class="sidebar-realName">({{realName}})</p>
                </a> -->

        <div class="user-avator"><img alt="" /></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown
          class="user-name"
          :class="{ active: isActive }"
          trigger="click"
          @command="handleCommand"
          @visible-change="handleChange"
        >
          <span class="el-dropdown-link"> {{ realName }} <i class="el-icon-caret-bottom"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <a href="http://blog.gdfengshuo.com/about/" target="_blank">
                            <el-dropdown-item>关于作者</el-dropdown-item>
                        </a>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a> -->
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog title="退出登录" :visible.sync="dialogVisible" width="30%">
      <span>您确定要退出当前账号登录状态吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bus from '../common/bus';
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      dialogVisible: false,
      name: '',
      message: 2,
      username: '',
      realName: '',
      isActive: false,
    };
  },
  computed: {
    // username(){
    //     let username = localStorage.getItem('ms_username');
    //     return username ? username : this.name;
    // }
  },
  created() {
    let GLOBAL_loginName = localStorage.getItem('loginName');
    let GLOBAL_realName = localStorage.getItem('GLOBAL_realName');

    this.username = GLOBAL_loginName;
    this.realName = GLOBAL_realName;
  },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    handleEnter() {
      $.post(this.$baseUrl + 'services/manager/logout.json').then(res => {
        if (res.resultMessageEnum == '0000') {
          this.dialogVisible = false;
          // localStorage.removeItem('ms_username');
          localStorage.removeItem('ms_pass');
          localStorage.removeItem('checked');
          localStorage.removeItem('GLOBAL_loginName');
          localStorage.removeItem('GLOBAL_realName');
          this.$router.push('/login');
        } else {
          this.$message.error(res.resultMessage);
        }
      });
      this.dialogVisible = false;
    },
    handleCommand(val) {
      if (val == 'loginout') {
        this.dialogVisible = true;
      }
    },
    handleChange(val) {
      // if(val){
      this.isActive = val;
      // }
    },
  },
};
</script>
<style scoped lang="less">
.header {
  background-color: #fff;
  position: relative;
  margin-left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #000;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 50px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 50px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
  i {
    font-size: 18px;
    color: #8b612f;
    position: relative;
    top: 2px;
  }
  .active {
    i {
      color: #1890ff;
    }
  }
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
}

.user-name {
  margin-left: 10px;
  cursor: pointer;
}
.user-name.el-dropdown {
  // font-size: 24px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.el-dropdown-link {
  /* color: #fff; */
  font-size: 12px;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
