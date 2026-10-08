"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The chat (and its markdown renderer) is loaded only once the page has
// settled - when the browser is idle after load, or on the first click or key
// press - so it never competes with the hero, or with the visitor's first
// scroll, for the main thread on phones.
const KaiChat = dynamic(() => import("./KaiChat"), { ssr: false });

export default function Kai() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setReady(true);
    };
    const events = ["mousedown", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 4000 });
      else globalThis.setTimeout(cb, 2500);
    };
    const onLoad = () => idle(go);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => {
      events.forEach((e) => window.removeEventListener(e, go));
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return ready ? <KaiChat /> : null;
}
