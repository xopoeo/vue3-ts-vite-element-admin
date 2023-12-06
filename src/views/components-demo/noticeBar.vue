<template>
  <div class="notice-bar-container layout-pd">
    <el-card shadow="hover" header="滚动通知栏：默认">
      <NoticeBar text="🎉🎉🔥滚动通知栏：" />
    </el-card>

    <el-card shadow="hover" header="滚动通知栏：设置样式" style="margin-bottom: 15px">
      <NoticeBar
        text="🎉🎉🔥滚动通知栏："
        leftIcon="iconfont icon-tongzhi2"
        rightIcon="ele-ArrowRight"
        background="#ecf5ff"
        color="#409eff"
      />
    </el-card>

    <el-card
      shadow="hover"
      header="滚动通知栏：搭配 NoticeBar 和 Carousel 走马灯 组件可以实现垂直滚动的效果"
      style="margin-bottom: 15px"
    >
      <NoticeBar :scrollable="true">
        <el-carousel height="40px" direction="vertical" :autoplay="true" indicator-position="none" :interval="3000">
          <el-carousel-item v-for="v in state.noticeList" :key="v">{{ v }} </el-carousel-item>
        </el-carousel>
      </NoticeBar>
    </el-card>

    <el-card shadow="hover" header="滚动通知栏：参数" style="margin-bottom: 15px">
      <el-table :data="state.tableData" style="width: 100%">
        <el-table-column prop="a1" label="参数" />
        <el-table-column prop="a2" label="说明" />
        <el-table-column prop="a3" label="类型" />
        <el-table-column prop="a4" label="可选值" />
        <el-table-column prop="a5" label="默认值" />
      </el-table>
    </el-card>

    <el-card shadow="hover" header="图标选择器(宽度自动)：事件" style="margin-bottom: 15px">
      <el-table :data="state.tableData1" style="width: 100%">
        <el-table-column prop="a1" label="事件名称" />
        <el-table-column prop="a2" label="说明" />
        <el-table-column prop="a3" label="类型" />
        <el-table-column prop="a4" label="回调参数" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="">
import { defineAsyncComponent, reactive } from "vue"
const NoticeBar = defineAsyncComponent(() => import("@/components/NoticeBar/index.vue"))

defineOptions({ name: "NoticeBar" })

const state = reactive({
  noticeList: [
    " 在日常开发时，弹窗是一个经常使用的功能，而且重复性极高，你可能会遇到下面这些问题:",
    "1、一个页面内多个弹窗, 要维护多套弹窗状态,看的眼花缭乱",
    "2、弹窗内容比较简单，声明变量 + 模板语法的方式写起来比较麻烦"
  ],
  tableData: [
    {
      a1: "mode",
      a2: "通知栏模式，用于右侧 icon 图标点击",
      a3: "string",
      a4: "closeable / link",
      a5: ""
    },
    {
      a1: "text",
      a2: "通知文本内容，scrollable 为 false 时生效",
      a3: "string",
      a4: "",
      a5: ""
    },
    {
      a1: "color",
      a2: "通知文本颜色",
      a3: "string",
      a4: "",
      a5: "#e6a23c"
    },
    {
      a1: "background",
      a2: "通知背景色",
      a3: "string",
      a4: "",
      a5: "#fdf6ec"
    },
    {
      a1: "size",
      a2: "字体大小，单位px",
      a3: "number / string",
      a4: "",
      a5: "14"
    },
    {
      a1: "height",
      a2: "通知栏高度，单位px",
      a3: "number / string",
      a4: "",
      a5: "40"
    },
    {
      a1: "delay",
      a2: "动画延迟时间 (s)",
      a3: "number / string",
      a4: "",
      a5: "1"
    },
    {
      a1: "speed",
      a2: "滚动速率 (px/s)",
      a3: "number / string",
      a4: "",
      a5: "100"
    },
    {
      a1: "scrollable",
      a2: "是否开启垂直滚动",
      a3: "boolean",
      a4: "true",
      a5: "false"
    },
    {
      a1: "leftIcon",
      a2: "自定义左侧图标",
      a3: "string",
      a4: "",
      a5: ""
    },
    {
      a1: "rightIcon",
      a2: "自定义右侧图标",
      a3: "string",
      a4: "",
      a5: ""
    }
  ],
  tableData1: [
    {
      a1: "close",
      a2: "通知栏模式（mode）closeable 时回调事件",
      a3: "function",
      a4: ""
    },
    {
      a1: "link",
      a2: "通知栏模式（mode）link 时回调事件",
      a3: "function",
      a4: ""
    }
  ]
})
</script>
