<template>
	<div class="customcomp-editor">
		<Toolbar
			class="editor-toolbar"
			:editor="editorRef"
			:defaultConfig="config"
		/>
		<slot />
		<Editor
			mode="simple"
			v-model="valueHtml"
			class="editor-content"
			:defaultConfig="editConfig"
			@onCreated="handleCreated"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import type {
	IDomEditor,
	IToolbarConfig,
	IEditorConfig
} from '@wangeditor/core';

/** 编辑器实例，必须用 shallowRef，重要！*/
const editorRef = shallowRef<IDomEditor>();
/** 内容 HTML */
const valueHtml = defineModel();
/** 工具栏配置 */
const config = ref<Partial<IToolbarConfig>>({
	toolbarKeys: [
		'undo',
		'redo',
		'|',
		'bold',
		'italic',
		'through',
		'color',
		'bgColor',
		'|',
		'fontSize',
		{
			iconSvg:
				'<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
			key: 'group-justify',
			menuKeys: [
				'justifyLeft',
				'justifyRight',
				'justifyCenter',
				'justifyJustify'
			],
			title: '对齐'
		},
		'insertImage',
		'|',
		'clearStyle'
	]
});
/** 编辑器配置 */
const editConfig = ref<Partial<IEditorConfig>>({
	placeholder: '输入备忘内容...',
	scroll: false, // 禁止编辑器滚动
	autoFocus: false
});

/** 编辑器回调函数 */
const handleCreated = (editor: IDomEditor) => {
	editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style lang="less">
@import '@wangeditor/editor/dist/css/style.css';
.customcomp-editor {
	height: 100%;

	.editor-toolbar {
		border-bottom: 1px solid #f0f3f5;

		.w-e-bar-divider {
			background: #f0f0f0;
			height: 20px;
			margin: 10px 0;
		}
	}

	.editor-content {
		height: calc(100vh - 160px) !important;

		strong {
			font-weight: bold !important;
		}

		[data-slate-editor] {
			padding: 0 20px;
		}

		.w-e-text-placeholder {
			left: 20px;
			top: 15px;
		}
	}
}
</style>
