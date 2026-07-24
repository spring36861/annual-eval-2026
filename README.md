# 115年度代行檢查機構年終考評 · 3D 互動展示網頁

一個工業控制室風格、帶科技/AI 氛圍的 3D 互動網站，可直接部署到 GitHub Pages，並針對手機觀看優化。

- 進場為「工業齒輪核心」3D 場景（旋轉齒輪機組、爐心發光、危險警戒環、藍圖網格、火花粒子，可拖曳旋轉）。
- 三大互動節點，造型貼合危險性機械設備：
  - **代檢業務報告** → 壓力容器造型（條列說明）
  - **優良事蹟** → 六角螺帽造型（圖片相簿）
  - **創新作為** → 齒輪造型（AI 主題特效）
- 點擊任一設備物件即展開對應內容面板。

---

## 1. 檔案結構

```
115年考評網頁/
├─ index.html            ← 網頁主檔（不用改）
├─ css/style.css         ← 樣式（不用改）
├─ js/
│  ├─ data.js            ← ★ 你要改的內容都在這裡（文字、數據、圖片、卡片）
│  └─ main.js            ← 3D 引擎（一般不用改）
├─ assets/
│  ├─ images/            ← 放「優良事蹟」的照片
│  └─ models/            ← 放自訂 3D 模型（.glb）
└─ README.md
```

---

## 2. 如何修改內容（不用懂程式）

打開 **`js/data.js`**，用記事本或 VS Code 編輯，存檔後重新整理網頁即可。

- **改標題**：最上面 `SITE.title`。
- **代檢業務報告**：改 `stats`（數據卡）與 `items`（條列，每筆有 `heading` 標題和 `text` 內文）。
- **優良事蹟**：改 `gallery`，每筆有 `img`（照片檔名）、`title`、`caption`。
- **創新作為**：改 `typewriter`（開場打字句）與 `cards`（每張卡有 `icon` emoji、`title`、`desc`）。

> 提示：中文引號要用英文的 `'` 或 `"`，每筆資料結尾記得留逗號 `,`。

---

## 3. 放照片（優良事蹟）

1. 把照片放進 `assets/images/`，例如 `merit-1.jpg`。
2. 確認 `js/data.js` 裡 gallery 的 `img` 檔名一致。
3. 建議寬約 1200px、單張 300KB 以內，手機載入較快。

照片還沒放時會自動顯示漸層佔位圖，之後替換即可。

---

## 4. 提交 3D 模型給網頁呈現 ★（你問的重點）

網頁支援載入你自己的 3D 模型，取代預設的幾何造型。

### 你要提供的格式
- **檔案格式：`.glb`**（glTF 二進位，單一檔案含材質，最通用）。
- 面數建議 **5 萬面以內**（手機也順）；貼圖尺寸 1024～2048px。
- 模型請置中、比例正常，網頁會自動縮放到合適大小。

### 怎麼做出 .glb？
- **用 Blender（免費）**：做好模型後 `檔案 → 匯出 → glTF 2.0 (.glb)`。
- **用線上工具**：把 obj/fbx 丟到 https://products.aspose.app/3d/conversion 之類轉成 glb。
- **免費模型庫**：Sketchfab、Poly Pizza 可下載可商用的 glb。

### 怎麼交給我 / 怎麼啟用
把 `.glb` 檔放進 `assets/models/`，然後打開 `js/data.js`，把對應項目那行的 `//` 拿掉：
```js
model: 'assets/models/report.glb',
```
重新整理網頁，該節點就會換成你的模型（會自動緩慢旋轉）。

> 如果你把 .glb 檔傳給我，我可以直接幫你接好、調整大小與旋轉，你只要看成果。

---

## 5. 部署到 GitHub Pages

1. 在 GitHub 建立一個新的 repository（例如 `annual-eval-2026`）。
2. 把本資料夾所有檔案上傳（可用網頁拖曳上傳，或 git push）。
3. 進入 repo 的 **Settings → Pages**。
4. Source 選 **Deploy from a branch**，Branch 選 **main / (root)**，按 Save。
5. 等 1～2 分鐘，Pages 會給你一個網址（`https://你的帳號.github.io/repository名稱/`），手機打開即可。

用 git 上傳的指令範例：
```bash
git init
git add .
git commit -m "115年度代行檢查考評展示網頁"
git branch -M main
git remote add origin https://github.com/你的帳號/annual-eval-2026.git
git push -u origin main
```

---

## 6. 本機預覽

**直接用滑鼠雙擊 `index.html` 就能開**（用 Chrome / Edge 開啟即可，需連網載入 3D 函式庫）。

若日後想改回新版模組載入或架站測試，也可用簡易伺服器：
```bash
npx serve .
```
然後瀏覽器開 `http://localhost:3000`。

---

## 備註
- 3D 函式庫（Three.js）與字型從 CDN 載入，觀看時需連網。
- 若要完全離線，可再告訴我，我幫你把函式庫改成本機引入。
