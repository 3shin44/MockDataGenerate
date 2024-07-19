import EntryPage from "./EntryPage";
import EditPanelPage from "./EditPanelPage";

// 產生頁面頁表, 供ROUTER使用
const pageList = [
  {
    path: "/entryPage",
    componentName: EntryPage,
  },
  {
    path: "/editPanel",
    componentName: EditPanelPage,
  },
];

export default pageList;
