# 新接龍 Woe Freecell

[Demo](http://woe-freecell.surge.sh/)

## 專案介紹

此專案使用 React 實作新接龍，使用到的技術包括：

- ReactJS
- Redux
- Redux Thunk
- Styled Component

_新接龍相關的邏輯，集中在 Redux Actions_

## 相關資源

- [UI 設計 by Daphne](https://challenge.thef2e.com/user/2104?schedule=2826#works-2826)
- [牌局運算式](https://rosettacode.org/wiki/Deal_cards_for_FreeCell)
- [新接龍解答](http://freecellgamesolutions.com)
- [新接龍規則](https://zh.wikipedia.org/wiki/%E6%96%B0%E6%8E%A5%E9%BE%8D)

## 截圖

![起始畫面](https://github.com/shuyang0129/woe-freecell/blob/master/src/assets/_presentation/start-page.png?raw=true)

## 操作

- New Game: 開啟新牌局
- Restart: 重啟目前牌局
- Hint: 顯示提示
- Undo: 回到上一步
- Double Click: 自動移動到可移動位置
- Drag & Drop: 拖放到合法位置(根據新接龍規則)

## 專案完成進度

### 基本操作

- [x] 開啟新牌局
- [x] 重啟目前牌局
- [x] 顯示提示
- [x] 回到上一步
- [x] 點擊兩下，自動移動到可移動位置
- [x] 拖放到合法位置
- [x] 單張或多張拖放

### 動畫

- [x] 起始動畫
- [ ] 點擊兩下時，卡片移動動畫

### 其他

- [ ] 遊戲成功畫面
- [ ] 遊戲失敗畫面
- [ ] 遊戲計時
- [x] 遊戲步數計算
- [ ] 遊戲步數顯示

## 在開發環境執行專案

1.  `yarn install`

    安裝專案所需依賴

2.  `yarn start`

    在本地執行專案
