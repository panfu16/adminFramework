<!---
 --@author  PanFu
 --@data 2019-08-30 16:19
 --@description activity.v1.0-List
 --@version 1.0
--->
<template>
  <div class="content">
    <el-row>
      <el-col :span="4">
        <div class="head-portrait">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="portrait">
          <p>帐号：panfu163</p>
          <p>密码：vip会员</p>
          <p>手机：18285530808</p>
          <p>部门：技术部</p>
          <p>邮箱：1602859720@qq.com</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <h5>用户组</h5>
      <el-row>
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
        />
      </el-row>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  h4{
    border-bottom: 1px solid #eee;
    padding-bottom:20px;
    margin-bottom:20px;
    display:block;
    font-size:18px;
  }
  h5{
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding:20px 0;
    margin:20px auto;
    display:block;
  }
  .head-portrait {
    padding: 20px;
    .el-avatar {
      width: 80px;
      height: 80px;
    }
  }
  .portrait {
    padding: 20px;
    p {
      line-height: 30px;
      font-size: 14px;
    }
  }
  .shippingAddress {
    border: 1px solid #eee;
    padding: 20px;
    margin-right: 10px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      activeName: "1",
      count:1,
      props: {
        label: 'name',
        children: 'zones'
      },
      shippingAddress: [
        {
          name: "潘付",
          phone: "18285533808",
          address: "贵州省贵阳市南明区花溪大道北段126"
        },
        {
          name: "潘付",
          phone: "18285533808",
          address: "贵州省贵阳市南明区花溪大道北段126"
        }
      ]
    };
  },
  methods:{
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '会员用户组' }, { name: '新闻用户' }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "会员用户组") {
        hasChild = true;
      } else if (node.data.name === "新闻用户") {
        console.log("========");
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [{
            name: '普通会员' + this.count++
          }, {
            name: '注册会员' + this.count++
          }];
        } else {
          data = [{
            name: '新闻采集员' + this.count++
          }, {
            name: '新闻编辑人员' + this.count++
          }];
        }

        resolve(data);
      }, 500);
    },
    handleCheckChange(){}
  }
};
</script>
