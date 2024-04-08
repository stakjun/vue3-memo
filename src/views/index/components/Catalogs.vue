<template>
	<div class="catalogs-comp">
		<div class="header">
			<el-button round @click="toCreate">新建文件夹</el-button>
		</div>
		<div class="catas-list">
			<div
				v-for="item in store.catalogs"
				:key="item.cata_id"
				class="cata-item"
				:class="{ 'is-active': item.cata_id === store.active_cataid }"
				@click="store.setCatId(item.cata_id)"
			>
				<el-icon :size="17">
					<folder-opened v-if="item.cata_id === store.active_cataid" />
					<folder-remove v-else />
				</el-icon>
				<span class="text">{{ item.cata_name }}</span>
				<el-icon class="delete" @click.stop="store.removeCata(item.cata_id)"
					><Delete
				/></el-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { FolderRemove, FolderOpened, Delete } from '@element-plus/icons-vue';
import { indexStore } from '@/stores';

const store = indexStore();

/** 新建文件夹 */
const toCreate = (): void => {
	ElMessageBox.prompt('输入文件夹名称', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		inputPlaceholder: '不超过10个字'
	}).then((res) => {
		if (res.value) {
			store.createCata({
				user_id: 4204,
				cata_name: res.value
			});
		}
	});
};
</script>

<style lang="less">
.catalogs-comp {
	.header {
		padding: 10px 16px;
		border-bottom: 1px solid #f0f0f0;
	}

	.catas-list {
		padding: 12px 6px;

		.cata-item {
			display: flex;
			align-items: center;
			padding: 6px 18px;

			.text {
				margin-left: 12px;
			}

			.delete {
				margin-left: auto;
			}

			&:hover {
				background: #f0f0f0;
				cursor: pointer;
			}

			&.is-active {
				color: var(--el-color-primary);
				font-weight: bold;
			}
		}
	}
}
</style>
