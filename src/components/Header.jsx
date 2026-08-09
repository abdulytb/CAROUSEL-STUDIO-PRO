import React from "react";
import { Wand2, HardDrive, Cloud, Settings as SettingsIcon } from "lucide-react";
import { PROVIDERS } from "../ai/providers/index.js";
import SettingsPanel from "./SettingsPanel.jsx";

export default function Header({
  settings, setSettings, activeModel,
  showSettings, setShowSettings,
  showKey, setShowKey,
  aiLoading, aiTestStatus, aiTestMsg, setAiTestStatus,
  onTestConnection,
}) {
  const provider = PROVIDERS[settings.provider];

  return (
    <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid #1A1D24" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#8B5CF6,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Wand2 size={18} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 0.3 }}>AI Carousel Studio Pro</div>
          <div style={{ fontSize: 11, color: "#7A7F8C", display: "flex", alignItems: "center", gap: 5 }}>
            {settings.provider === "local" ? <HardDrive size={11} /> : <Cloud size={11} />}
            {provider.name}{settings.provider !== "local" ? ` · ${activeModel}${settings.useProxy ? " · via proxy" : ""}` : " — offline, tanpa API"}
          </div>
        </div>
        <button
          onClick={() => setShowSettings((s) => !s)}
          style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid #262A34", background: showSettings ? "#1E222B" : "#12151C", color: "#E8E9ED", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <SettingsIcon size={16} />
        </button>
      </div>

      {showSettings && (
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
          showKey={showKey}
          setShowKey={setShowKey}
          aiLoading={aiLoading}
          aiTestStatus={aiTestStatus}
          aiTestMsg={aiTestMsg}
          setAiTestStatus={setAiTestStatus}
          onTestConnection={onTestConnection}
        />
      )}
    </div>
  );
}
