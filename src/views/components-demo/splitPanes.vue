<script setup lang="ts">
import { ref } from "vue"
import { Splitpanes, Pane } from "splitpanes"
import "splitpanes/dist/splitpanes.css"

defineOptions({ name: "SplitPanes" })

const paneSize = ref(50)
</script>

<template>
  <div class="app-container">
    <el-card shadow="hover" header="splitpanes 窗格拆分器">
      <el-alert
        title="`splitpanes`，项目地址：https://github.com/antoniandre/splitpanes"
        type="success"
        :closable="false"
        style="margin-bottom: 15px"
      />
      <splitpanes class="default-theme" @resize="paneSize = $event[0].size" style="height: 500px">
        <pane :size="20"> 1 </pane>
        <pane :size="80">
          <splitpanes class="default-theme" :horizontal="true">
            <pane :size="100"> 2 </pane>
            <pane :size="100"> 3 </pane>
          </splitpanes>
        </pane>
      </splitpanes>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.splitpanes__pane {
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  font-size: 70px;
  color: var(--el-color-primary-light-5);
  border: 1px solid var(--el-border-color-lighter);
  background-color: var(--el-color-primary) !important;
}
</style>
