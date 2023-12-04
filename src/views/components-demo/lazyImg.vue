<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { filterList } from "./lazyMock"
import $utilsFun from "@/utils/tools/utilsFun"

defineOptions({ name: "LazyImg" })

const data = ref({
  filterList: filterList
})

onMounted(() => {
  $utilsFun.lazyImg("[data-lazy-img-list]", data.value.filterList)
})
</script>

<template>
  <div class="app-container">
    <el-card shadow="hover" header="lazyImg">
      <div class="flex-warp" v-if="data.filterList.length > 0">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb15" v-for="(v, k) in data.filterList" :key="k">
            <div class="flex-warp-item">
              <div class="flex-warp-item-box">
                <div class="item-img" v-loading="v.loading">
                  <img :data-img="v.img" :data-key="k" :data-lazy-img-list="k" />
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
.flex-warp {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: 0 -5px;
  .flex-warp-item {
    padding: 5px;
    width: 100%;
    height: 200px;
    .flex-warp-item-box {
      border: 1px solid var(--next-border-color-light);
      width: 100%;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      &:hover {
        cursor: pointer;
        border: 1px solid var(--el-color-primary);
        transition: all 0.3s ease;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.03);
        .item-txt-title {
          color: var(--el-color-primary) !important;
          transition: all 0.3s ease;
        }
        .item-img {
          img {
            transition: all 0.3s ease;
            transform: translateZ(0) scale(1.05);
          }
        }
      }
      .item-img {
        width: 100%;
        height: 215px;
        overflow: hidden;
        img {
          transition: all 0.3s ease;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
