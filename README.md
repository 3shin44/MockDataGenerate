# 模擬資料產生器

[模擬資料產生器 GitHub Pages](https://3shin44.github.io/mock-data-generate/)

## 說明

產生模擬資料，資料類型：陣列中多筆物件

單筆資料中提供常用資料產生模組：固定字串、迴圈索引值(流水號)、時間(Moment.js)、台灣身份證字號、隨機字串、手機號碼

## 指令說明

- build
  
  一般環境編譯指令，編譯後將build內部資料放入SERVER上對應名稱資料夾

  如: {SERVER}/mock-data-generate/{build content}

  不同資料夾名稱修改`PUBLIC_URL=/mock-data-generate`


- format

  依據.prettier 調整Coding Style

- predeploy

  GitHub Pages預設指令

- deploy

  GitHub Pages預設指令&佈署




## 專案結構說明

```
├─build
│  └─static
│      ├─css
│      └─js
├─public
└─src
    ├─components        元件/通用元件
    │  └─EditPanelPage  各頁面專用元件
    ├─pages             頁面入口
    └─util              JS函式庫
```
