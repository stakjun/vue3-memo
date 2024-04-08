<template>
	<div class="memos-comp">
		<div class="header">
			<span>共 {{ store.activeMemos.length }} 条备忘录</span>
			<el-button :icon="Plus" circle @click="toCreate" />
		</div>
		<div class="memos-list">
			<div
				v-for="memo in store.activeMemos"
				:key="memo.memo_id"
				class="memo-item"
				:class="{ 'is-active': memo.memo_id === store.active_memoid }"
				@click="store.setMemoId(memo.memo_id)"
			>
				<div class="memo-item-inner">
					<div>
						<h3>{{ memo.title }}</h3>
						<span class="text">{{ FormatTime(memo.update_at) }}</span>
					</div>
					<el-icon class="delete" @click.stop="store.removeMemo(memo.memo_id)"
						><Delete
					/></el-icon>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { Plus, Delete } from '@element-plus/icons-vue';
import { indexStore } from '@/stores';
import { FormatTime } from '@/utils';

const store = indexStore();

/** 新增备忘录 */
const toCreate = (): void => {
	ElMessageBox.prompt('输入备忘录标题', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		inputPlaceholder: '标题'
	}).then((res) => {
		if (res.value && store.active_cataid) {
			store.createMemo({
				cata_id: store.active_cataid,
				title: res.value,
				content: +new Date() + ''
			});
		}
	});
};
</script>

<style lang="less">
.memos-comp {
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 16px;
		border-bottom: 1px solid #f0f3f5;
	}

	.memos-list {
		.memo-item {
			padding: 10px 14px;
			border-bottom: 1px solid #f0f3f5;

			.memo-item-inner {
				display: flex;
				align-items: center;
				padding: 8px 12px;
				font-size: 14px;
				border-radius: 5px;

				h3 {
					margin-bottom: 4px;
				}

				.text {
					color: #777;
				}

				.delete {
					margin-left: auto;
				}
			}

			&.is-active {
				.memo-item-inner {
					background: #f0f3f5;
				}
			}

			&:hover {
				.memo-item-inner {
					cursor: pointer;
					background: #f0f3f5;
				}
			}
		}
	}
}
</style>
