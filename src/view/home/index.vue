<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%;background:#48576a">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" router>
					<el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>管理员</template>
						<el-menu-item index="collegeManage">院校管理</el-menu-item>
						<el-menu-item index="shopList">专业管理</el-menu-item>
						<el-menu-item index="foodList">院校分数线管理</el-menu-item>
						<el-menu-item index="orderList">专业分数线管理</el-menu-item>
						<el-menu-item index="adminList">用户管理</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-document"></i>用户</template>
						<el-menu-item index="addShop">查询院校</el-menu-item>
						<el-menu-item index="addGoods">查询专业</el-menu-item>
						<el-menu-item index="addGoods">查询院校分数线</el-menu-item>
						<el-menu-item index="addGoods">查询专业分数线</el-menu-item>
						<el-menu-item index="addGoods">院校对比</el-menu-item>
						<el-menu-item index="addGoods">院校推荐</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-document"></i>系统管理</template>
						<el-menu-item index="visitor">退出</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '~@/style/mixin';
</style>
