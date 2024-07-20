import TestPage from "./TestPage";
import EditPanelPage from "./EditPanelPage";

// 產生頁面頁表, 供ROUTER使用
const pageList = [
  {
    path: "/",
    componentName: EditPanelPage,
  },
  {
    path: "/test",
    componentName: TestPage,
  },
];

export default pageList;
