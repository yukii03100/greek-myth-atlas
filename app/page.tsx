"use client";
import { useEffect } from "react";
export default function Home(){
  useEffect(()=>{const script=document.createElement("script");script.type="module";script.src="/app.js";document.body.appendChild(script);return()=>script.remove()},[]);
  return <><header><a className="brand" href="#">希臘神話圖鑑</a><nav aria-label="主選單"><a href="#">角色介紹</a><a href="#timeline">時間線</a><a href="#relations">關係線</a><a href="#sources">資料來源</a><a href="#studio">我流角色互動</a><a href="#wardrobe">服裝參考</a><a className="guide-link" href="#guide">赫米斯導覽</a></nav></header><main id="app"><p>載入圖鑑中…</p></main><footer>希臘神話圖鑑</footer></>
}
