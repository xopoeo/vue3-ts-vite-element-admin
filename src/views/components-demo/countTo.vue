<script setup lang="ts">
import CountTo from "@/components/CountTo/index.vue"
import { ref, reactive } from "vue"

defineOptions({ name: "countTo" })

const countRef = ref()
const state = reactive({
  startVal: 0,
  endVal: 1314512,
  duration: 3000,
  decimals: 0,
  separator: ",",
  prefix: "¥ ",
  suffix: " rmb",
  autoplay: false
})

const start = () => {
  countRef.value?.start()
}

const pauseResume = () => {
  countRef.value?.pauseResume()
}
</script>

<template>
  <div class="text-center mb-40px">
    <CountTo
      ref="countRef"
      :start-val="state.startVal"
      :end-val="state.endVal"
      :duration="state.duration"
      :decimals="state.decimals"
      :separator="state.separator"
      :prefix="state.prefix"
      :suffix="state.suffix"
      :autoplay="state.autoplay"
      class="text-30px font-bold text-[var(--el-color-primary)]"
    />
  </div>
  <el-row :gutter="20" justify="space-between">
    <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
      <div class="flex mb-20px items-center">
        <span class="min-w-90px text-right">开始值：</span>
        <el-input-number v-model="state.startVal" :min="0" />
      </div>
    </el-col>
    <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
      <div class="flex mb-20px items-center">
        <span class="min-w-90px text-right">结束值：</span>
        <el-input-number v-model="state.endVal" :min="1" />
      </div>
    </el-col>
    <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
      <div class="flex mb-20px items-center">
        <span class="min-w-90px text-right">持续时间：</span>
        <el-input-number v-model="state.duration" :min="1000" />
      </div>
    </el-col>
    <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
      <div class="flex mb-20px items-center">
        <span class="min-w-90px text-right">分割符号：</span>
        <ElInput v-model="state.separator" />
      </div>
    </el-col>
    <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
      <div class="flex mb-20px items-center">
        <span class="min-w-90px text-right">前缀：</span>
        <ElInput v-model="state.prefix" />
      </div>
    </el-col>
    <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
      <div class="flex mb-20px items-center">
        <span class="min-w-90px text-right">后缀：</span>
        <ElInput v-model="state.suffix" />
      </div>
    </el-col>
    <el-col :span="24">
      <div class="text-center">
        <el-button type="primary" @click="start">开始</el-button>
        <el-button @click="pauseResume"> 暂停/继续 </el-button>
      </div>
    </el-col>
  </el-row>
</template>
