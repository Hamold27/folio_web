# Portfolio 作品集網站

用 VS Code 打開這個資料夾，安裝 **Live Server** 擴充套件後，在 `index.html` 上按右鍵 →「Open with Live Server」就能預覽。
（直接雙擊 `index.html` 也能看，大部分功能都正常。）

## 檔案結構

```
index.html        首頁（Portfolio 眼睛跟著滑鼠轉 + 手寫字選單）
about.html        1.0 About me
typography.html   2.0 Typography & Layout
web.html          3.0 Web Design
packaging.html    4.0 Packaging & Binding
fine-arts.html    5.0 Fine Arts（瀑布流 + 分類篩選 + 點圖放大）

css/style.css     全部樣式（最上面的 :root 可以改顏色、字體）
js/main.js        首頁眼睛跟隨滑鼠
js/lightbox.js    點圖放大檢視（所有 class="zoomable" 的圖片）
js/gallery.js     Fine Arts 瀑布流排版
js/artworks.js    Fine Arts 作品清單（新增 / 刪除 / 排序作品改這裡）

images/
  logo/           首頁 logo（眼睛已拆成 pupil1.png、pupil2.png）、內頁 logo
  hand/           手寫字 PNG（首頁選單 + 各頁標題）
  about/          大頭照、學校 logo、QR code
  typography/     字體作品
  web/            台藝好課
  packaging/      夢境檔案、綠色包裝設計、Ragazza
  fine-arts/full  作品大圖（點開時顯示）
  fine-arts/thumb 作品縮圖（瀑布流顯示）
```

## 常見修改

**換手寫字**：把新的 PNG 用同樣檔名放進 `images/hand/` 覆蓋就好。
建議白色字、透明背景（內頁會自動反轉成黑色）。

**眼睛移動幅度**：`js/main.js` 最上面的 `MAX_X`、`MAX_Y`（數字越大眼睛轉越多）。

**新增 Fine Arts 作品**：圖片放進 `images/fine-arts/full/`（和 `thumb/`），
再到 `js/artworks.js` 加一行，例如：
```js
{ file: 'my-new-work.jpg', category: 'watercolor', title: '靜物 2026', w: 720, h: 540 },
```
`title` 會顯示在放大檢視下方，目前都是空的，可以補上作品名稱。

**還沒放的圖片**（頁面上會顯示虛線框）：
- `images/typography/coffee.png` — 野人咖啡 文字造型
- `images/typography/dream.png` — 夢遊 文字造型期末

**QR code 連結**：`about.html` 裡兩個 `href="#"` 換成你的 Behance / LinkedIn 網址。

## Fine Arts 圖片處理說明

- 原始 HEIC 照片已轉成 JPG，裁掉地板、紙膠帶、拖鞋等背景。
- 三組重複拍攝的照片只保留一張（IMG_3383/3384、IMG_3393/3394、IMG_3400/3401）。
- 轉正的照片：IMG_3367、IMG_3395（轉 180°）、IMG_3387、IMG_3388（轉 90°）。
  如果有其他張方向不對，可以用任何看圖軟體旋轉後覆蓋 `full/` 和 `thumb/` 裡的同名檔案，
  並把 `artworks.js` 裡那一張的 `w`、`h` 對調。
