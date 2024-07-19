import EntryPage from "./EntryPage"
import OtherPage from "./OtherPage"
// 產生頁面頁表, 供ROUTER使用
const pageList = [
  {
    path: "/entryPage",
    componentName: EntryPage
  },
  {
    path: "/other",
    componentName: OtherPage
  }
]

export default pageList