import { defineStore } from 'pinia';
import type { UserType } from './types';
import { ImitateHttp, localGetItem, localSetItem } from '@/utils';

const userStore = defineStore('user', {
	state: () => ({
		userInfo: null as UserType | null
	}),
	actions: {
		/** 获取登录用户 */
		getUser() {
			const data = localGetItem('login_user');
			this.userInfo = data;
		},
		setUser(user: UserType) {
			localSetItem('login_user', user);
			this.userInfo = user;
		},
		/** 注册 */
		register(form: UserType) {
			return ImitateHttp((s, f) => {
				form.user_id = parseInt(form.phone.slice(-4));
				localSetItem('regis_user', form);
				s('ok');
			});
		},
		/** 登录 */
		login(form: UserType) {
			const user: UserType | null = localGetItem('regis_user');
			return ImitateHttp((s, f) => {
				if (!user) {
					f('用户未注册');
				} else {
					if (user.phone === form.phone && user.password === form.password) {
						user.login_at = +new Date();
						this.setUser(user);
						s('登录成功');
					} else {
						f('手机号或密码错误');
					}
				}
			});
		},
		/** 退出登录 */
		logout() {
			localStorage.removeItem('login_user');
			this.userInfo = null;
		}
	}
});

export default userStore;
