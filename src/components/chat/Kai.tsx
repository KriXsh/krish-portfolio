"use client";

import dynamic from "next/dynamic";

// Loaded after the page so the chat (and its markdown renderer) never slows
// down first paint.
const KaiChat = dynamic(() => import("./KaiChat"), { ssr: false });

export default function Kai() {
  return <KaiChat />;
}
