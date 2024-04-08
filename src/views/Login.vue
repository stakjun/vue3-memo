<template>
	<div class="login-page">
		<el-form class="login-form">
			<!-- title -->
			<h2 class="title">{{ is_login ? '登录' : '注册' }}</h2>
			<!-- user_name -->
			<el-form-item v-if="!is_login">
				<el-input placeholder="用户名" size="large" v-model="form.user_name" />
			</el-form-item>
			<!-- phone -->
			<el-form-item>
				<el-input placeholder="手机号" size="large" v-model="form.phone" />
			</el-form-item>
			<!-- password -->
			<el-form-item>
				<el-input
					placeholder="密码"
					size="large"
					show-password
					v-model="form.password"
				/>
			</el-form-item>
			<el-form-item v-if="!is_login">
				<el-input
					placeholder="确认密码"
					size="large"
					show-password
					v-model="form.conform_password"
				/>
			</el-form-item>
			<!-- submit -->
			<el-form-item>
				<el-button
					class="login-btn"
					type="primary"
					size="large"
					:loading="loading"
					@click="submitForm"
				>
					{{ is_login ? '提交' : '注册' }}
				</el-button>
				<div class="text-row">
					<span class="text-wrap" @click="is_login = !is_login">
						<span>{{
							is_login ? '没有账号？去注册' : '已有账号？去登录'
						}}</span>
						<el-icon><ArrowRight /></el-icon>
					</span>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores';

const router = useRouter();
const store = userStore();

/** 用来判断当前是登录还是注册 */
const is_login = ref<boolean>(true);
/** 按钮的加载状态 */
const loading = ref<boolean>(false);
/** 表单数据 */
const form = ref<{
	user_name: string;
	phone: string;
	password: string;
	conform_password: string;
}>({
	user_name: '',
	phone: '',
	password: '',
	conform_password: ''
});

/** 按钮提交  */
const submitForm = async () => {
	/** 表单验证 */
	const { value: user } = form;
	if (!is_login.value && !user.user_name) {
		return ElMessage({
			type: 'warning',
			message: '请输入用户名'
		});
	}
	if (!user.phone || !user.password) {
		return ElMessage({
			type: 'warning',
			message: '手机号和密码不能为空'
		});
	}
	if (user.phone.length !== 11 || isNaN(Number(user.phone))) {
		return ElMessage({
			type: 'warning',
			message: '请输入正确的手机号'
		});
	}
	if (!is_login.value) {
		if (user.password != user.conform_password) {
			return ElMessage({
				type: 'warning',
				message: '两次输入密码不一致'
			});
		}
	}

	/** 登录/注册部分 */
	try {
		loading.value = true;
		if (is_login.value) {
			await store.login(user);
			setTimeout(() => {
				router.push('/');
			}, 500);
		} else {
			await store.register(user);
		}
		loading.value = false;
		ElMessage({
			type: 'success',
			message: is_login.value ? '登录成功' : '注册成功'
		});
	} catch (error: any) {
		loading.value = false;
		ElMessage({
			type: 'error',
			message: error || '错误'
		});
	}
};
</script>

<style lang="less">
.login-page {
	margin: 20vh auto;

	.login-form {
		width: 360px;
		background: #fff;
		padding: 30px 50px 10px 50px;
		border-radius: 7px;
		margin: 20px auto;
		box-shadow: var(--el-box-shadow);
		box-sizing: border-box;

		.title {
			text-align: center;
			margin-bottom: 18px;
		}

		.login-btn {
			margin-top: 14px;
			width: 100%;
		}

		.text-row {
			text-align: right;
			width: 100%;
			padding-top: 5px;

			.text-wrap {
				display: inline-flex;
				cursor: pointer;
				align-items: center;
			}
		}
	}
}
</style>
