import { defineComponent, h } from "vue"
import DemoTable from "./demoTable"

export default defineComponent({
  name: "About",
  setup() {
    return () => {
      return h(
        "div",
        {
          class: "h-full"
        },
        [
          <>
            <DemoTable />
          </>
        ]
      )
    }
  }
})
