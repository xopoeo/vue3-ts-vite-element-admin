import { defineComponent, onMounted, reactive, ref, Ref } from "vue"
import { usePagination } from "@/hooks/usePagination"
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const dialogOptions = reactive({
  visible: false,
  closeOnPressEscape: false,
  closeOnClickModal: false,
  title: "提示",
  width: "30%"
})

//表格的数据字段
interface TableItem {
  date: string
  name: string
  address: string
}

export default defineComponent({
  name: "demoTable",
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  setup() {
    const tableData: Ref<TableItem[]> = ref([])

    // 查询
    // const handleQuery = (params: PageQuery) => {
    //   console.log("分页参数", params)
    // }

    // 编辑按钮点击
    const onEdit = () => {
      dialogOptions.visible = true
    }

    onMounted(() => {
      //页面初始化完毕

      //生成测试数据
      for (let i = 0; i < 100; i++) {
        tableData.value.push({
          date: "2016-05-02",
          name: `王小虎${i + 1}`,
          address: "上海市普陀区金沙江路 1518 弄"
        })
      }

      //设置分页总数
      paginationData.total = tableData.value.length
    })
    return () => (
      <>
        <div class="app-container">
          <div class="app-wrap">
            <div class="search-wrap"></div>
            <div class="table-wrap">
              <el-table
                data={tableData.value.slice(
                  (paginationData.currentPage - 1) * paginationData.pageSize,
                  paginationData.currentPage * paginationData.pageSize
                )}
                style={{ height: "100%" }}
              >
                {() => (
                  <>
                    <el-table-column prop="date" label="日期" width="180" />
                    <el-table-column prop="name" label="姓名" width="180" />
                    <el-table-column prop="address" label="地址" />
                    <el-table-column
                      label="操作"
                      align="center"
                      v-slots={{
                        // TODO: 先写any了
                        default: ({ row }: any) => {
                          return (
                            <el-button link type="primary" style={`cursor: pointer;`} onClick={onEdit}>
                              查看 {row.name}
                            </el-button>
                          )
                        }
                      }}
                    />
                  </>
                )}
              </el-table>
            </div>

            <div class="currentPage-wrap">
              {paginationData.total > 1 ? (
                <el-pagination
                  v-model:layout={paginationData.layout}
                  v-model:pageSizes={paginationData.pageSizes}
                  v-model:total={paginationData.total}
                  v-model:currentPage={paginationData.currentPage}
                  v-model:pageSize={paginationData.pageSize}
                  onSizeChange={handleSizeChange}
                  onCurrentChange={handleCurrentChange}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <el-dialog
            close-on-press-escape={dialogOptions.closeOnPressEscape}
            close-on-click-modal={dialogOptions.closeOnClickModal}
            v-model={dialogOptions.visible}
            title={dialogOptions.title}
            width={dialogOptions.width}
          >
            <span>This is a message</span>
            <footer>
              <el-button
                onClick={() => {
                  dialogOptions.visible = false
                }}
                type="primary"
              >
                取消
              </el-button>
              <el-button
                type="primary"
                onClick={() => {
                  dialogOptions.visible = false
                }}
              >
                确定
              </el-button>
            </footer>
          </el-dialog>
        </div>
      </>
    )
  }
})
