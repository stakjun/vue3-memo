<template>
  <div class="index-page">
    <div class="catalogs">
      <!-- 文件夹区域 -->
      <Catalogs />
    </div>
    <div class="memos">
      <!-- 备忘录列表区域 -->
      <Menos />
    </div>
    <div class="detail">
      <!-- 编辑器区域 -->
      <template v-if="cur_memoid">
        <cus-editor v-model="content">
          <input 
            placeholder="输入标题" 
            class="memo-title" 
            v-model="title" 
            @input="titleChange(cur_memoid, title)"
          />
        </cus-editor>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import CusEditor from '@/components/CusEditor.vue'
import Catalogs from './components/Catalogs.vue'
import Menos from './components/Memos.vue'
import { indexStore } from '@/stores'
import { debounce } from '@/utils'

const store = indexStore()

/** 编辑器内容 */
const content = ref<string>('')
/** 编辑器标题 */
const title = ref<string>('')
/** 当前备忘录 id */
const cur_memoid = computed(() => store.active_memoid)

/** 编辑标题并保存 */
const titleChange = debounce((id: number, title: string) => {
  store.updateMemo(id, { title })
})

/** 编辑内容并保存 */
const contentChange = debounce((id: number, content: string) => {
  store.updateMemo(id, { content })
})

const updateCtx = () => {
  const cur_memo = store.activeMemos.find(item => item.memo_id === cur_memoid.value)
  if (cur_memo) {
    nextTick(() => {
      title.value = cur_memo.title
      content.value = cur_memo.content
    })
  }
}

/** 编辑器区域内容和备忘录切换联动 */
watch(cur_memoid, (val) => {
  if (val) {
    updateCtx()
  } else {
    title.value = ''
    content.value = ''
  }
})

/** 监听内容变化 */
watch(content, (val) => {
  contentChange(cur_memoid.value, val)
})

onMounted(() => {
  updateCtx()
})
</script>

<style lang="less">
.index-page {
  display: flex;
  align-items: stretch;
  height: calc(100vh - 55px);

  .catalogs {
    width: 20%;
    background: #f9f9f9;
  }

  .memos {
    width: 25%;
    border-right: 1px solid #f0f3f5;
  }

  .detail {
    flex: 1;
    min-width: 300px;

    .memo-title {
      border: none;
      outline: none;
      font-size: 19px;
      margin: 20px 20px 0 20px;
      padding-bottom: 14px;
      width: calc(100% - 40px);
      border-bottom: 1px solid #f0f3f5;

      &::placeholder {
        color: #999;
      }
    }
  }
}
</style>