# Serene — Beauty & Wellness Landing Page

React + Vite + Tailwind CSS + TypeScript。兩個滿版區塊：Hero（背景影片 + 導覽列 + 手機選單）與 Quote（滾動視差動畫）。

## 開發

```bash
cd serene
npm install
npm run dev
```

開啟 http://localhost:5175

## 建置

```bash
npm run build      # 輸出到 dist/
npm run preview    # 預覽正式版
```

## 結構

```
serene/
├─ index.html                    # 載入 Google Fonts
├─ src/
│  ├─ main.tsx                   # 進入點
│  ├─ index.css                  # Tailwind + 自訂 utility（liquid-glass、text-glow…）
│  ├─ App.tsx                    # <Hero /> + <QuoteSection />
│  └─ components/
│     ├─ Hero.tsx                # 影片背景、導覽列、手機選單、主標題
│     └─ QuoteSection.tsx        # 漸層背景、彩虹/雲朵視差（rAF + lerp）
├─ tailwind.config.js
├─ postcss.config.js
└─ vite.config.ts               # 固定連接埠 5175

```

## 備註

- 影片與雲朵/彩虹圖片皆為外部 URL，觀看時需連網；若來源站台有防盜連或失效，畫面仍可正常渲染（僅該素材不顯示）。
- 視差動畫為滾動觸發，需在可見的瀏覽器中捲動 Hero → Quote 才會看到雲朵滑入與彩虹位移。
