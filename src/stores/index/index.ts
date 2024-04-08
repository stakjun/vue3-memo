import { defineStore } from 'pinia';
import { geneId, localGetItem, localSetItem } from '@/utils';
import type { CatalogType, MemoType } from './types';

const indexStore = defineStore('index', {
	state: () => ({
		/** 文件夹列表 */
		catalogs: [] as CatalogType[],
		/** 备忘录列表 */
		memos: [] as MemoType[],
		/** 当前文件夹 id */
		active_cataid: null as number | null,
		/** 当前备忘录 id */
		active_memoid: null as number | null
	}),
	actions: {
		/** 新建文件夹 */
		createCata(val: Pick<CatalogType, 'user_id' | 'cata_name'>) {
			const curCata = Object.assign({}, val, {
				cata_id: geneId()
			});
			this.catalogs.push(curCata);
			localSetItem('catalogs', this.catalogs);
		},
		/** 获取文件夹列表 */
		getCatalogs() {
			const data = localGetItem('catalogs');
			if (data) {
				this.catalogs = data;
			}
		},
		/** 设置当前点击的文件 */
		setCatId(id: number) {
			this.active_cataid = id;
			localSetItem('active_cataid', id);
			if (this.activeMemos.length == 0) {
				this.setMemoId(null);
			} else {
				this.setMemoId(this.activeMemos[0].memo_id);
			}
		},
		/** 删除文件夹 */
		removeCata(id: number) {
			const index = this.catalogs.findIndex((cata) => cata.cata_id === id);
			if (index !== -1) {
				this.catalogs.splice(index, 1);
				localSetItem('catalogs', this.catalogs);
			}
			if (id === this.active_cataid) {
				this.active_cataid = this.catalogs.length
					? this.catalogs[0].cata_id
					: null;
				localSetItem('active_cataid', this.active_cataid);
			}
		},
		/** 获取当前点击的文件 */
		getActiveId() {
			const data = localGetItem('active_cataid');
			if (data) {
				this.active_cataid = data;
			}
			const active_memoId = localGetItem('active_memoid');
			if (active_memoId) {
				this.active_memoid = active_memoId;
			}
		},
		/** 新增备忘录 */
		createMemo(val: Pick<MemoType, 'cata_id' | 'title' | 'content'>) {
			const curMemo = Object.assign({}, val, {
				memo_id: geneId(),
				update_at: new Date().valueOf()
			});
			this.memos.push(curMemo);
			localSetItem('memos', this.memos);
		},
		/** 获取备忘录列表 */
		getMemos() {
			const data = localGetItem('memos');
			if (data) {
				this.memos = data;
			}
		},
		/** 更新备忘录 */
		updateMemo(id: number, val: Partial<MemoType>) {
			const index = this.memos.findIndex((memo) => memo.memo_id === id);
			if (index !== -1) {
				this.memos[index] = { ...this.memos[index], ...val };
				localSetItem('memos', this.memos);
			}
		},
		/** 删除备忘录 */
		removeMemo(id: number) {
			const index = this.memos.findIndex((memo) => memo.memo_id === id);
			if (index !== -1) {
				this.memos.splice(index, 1);
				localSetItem('memos', this.memos);
			}
			if (id === this.active_memoid) {
				this.active_memoid = this.activeMemos.length
					? this.activeMemos[0].memo_id
					: null;
				localSetItem('active_memoid', this.active_memoid);
			}
		},
		setMemoId(id: number | null) {
			this.active_memoid = id;
			localSetItem('active_memoid', id);
		}
	},
	getters: {
		activeMemos: (state) =>
			state.memos.filter((item) => item.cata_id === state.active_cataid!)
	}
});

export default indexStore;
