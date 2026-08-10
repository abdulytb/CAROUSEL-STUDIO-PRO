import React from "react";
import {
  Cloud, HardDrive, Eye, EyeOff, Sparkles, Loader2,
  CheckCircle2, XCircle, AlertTriangle,
} from "lucide-react";
import { PROVIDERS } from "../ai/providers/index.js";
import { chipStyle, secondaryBtnStyle } from "./common.jsx";

export default function SettingsPanel({
  settings, setSettings,
  showKey, setShowKey,
  aiLoading, aiTestStatus, aiTestMsg,
  onTestConnection, setAiTestStatus,
}) {
  const provider = PROVIDERS[settings.provider];

  return (
    <div style={{ marginTop: 14, background: "#12151C", border: "1px solid #1E222B", borderRadius: 14, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#E8E9ED", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <Cloud size={13} /> AI Connector (V2) — opsional
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.entries(PROVIDERS).map(([key, p]) => (
          <button
            key={key}
            onClick={() => { setSettings((s) => ({ ...s, provider: key })); setAiTestStatus(null); }}
            style={chipStyle(settings.provider === key)}
          >
            {key === "local" ? <HardDrive size={12} style={{ marginRight: 5 }} /> : <Cloud size={12} style={{ marginRight: 5 }} />}
            {p.name}
          </button>
        ))}
      </div>

      {settings.provider === "local" ? (
        <div style={{ marginTop: 10, fontSize: 12, color: "#7A7F8C", lineHeight: 1.5 }}>
          Mode default. Semua konten dibuat oleh Rule Engine lokal, 100% offline, tanpa biaya API.
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 11, color: "#9BA0AC", fontWeight: 600 }}>API KEY {provider.name.toUpperCase()}</label>
          <div style={{ position: "relative", marginTop: 6 }}>
            <input
              type={showKey ? "text" : "password"}
              value={settings.apiKey}
              onChange={(e) => { setSettings((s) => ({ ...s, apiKey: e.target.value })); setAiTestStatus(null); }}
              placeholder="Tempel API key milik Anda sendiri"
              style={{ width: "100%", background: "#0B0D12", border: "1px solid #262A34", borderRadius: 10, padding: "10px 40px 10px 12px", color: "#fff", fontSize: 13, boxSizing: "border-box" }}
            />
            <button onClick={() => setShowKey((v) => !v)} style={{ position: "absolute", right: 8, top: 8, background: "none", border: "none", color: "#7A7F8C", cursor: "pointer" }}>
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div style={{ fontSize: 11, color: "#5A5F6B", marginTop: 4 }}>
            Dapatkan key di {provider.keyUrl}. Key dikirim langsung dari browser Anda ke {provider.name} — aplikasi tidak menyimpan atau membayar biaya API apa pun.
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginTop: 10 }}>
            <input
              type="checkbox"
              checked={!!settings.rememberApiKey}
              onChange={(e) => setSettings((s) => ({ ...s, rememberApiKey: e.target.checked }))}
              style={{ width: 15, height: 15 }}
            />
            <span style={{ fontSize: 12, color: "#9BA0AC" }}>Ingat API key di perangkat ini (localStorage)</span>
          </label>

          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #1E222B" }}>
            <label style={{ fontSize: 11, color: "#9BA0AC", fontWeight: 600, marginTop: 12, display: "block" }}>MODEL</label>
            <input
              type="text"
              value={settings.model}
              onChange={(e) => setSettings((s) => ({ ...s, model: e.target.value }))}
              placeholder={provider.defaultModel}
              style={{ width: "100%", marginTop: 6, background: "#0B0D12", border: "1px solid #262A34", borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 13, boxSizing: "border-box" }}
            />
          </div>

          {settings.provider === "gemini" && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #1E222B" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={!!settings.includeHeroImage}
                  onChange={(e) => setSettings((s) => ({ ...s, includeHeroImage: e.target.checked }))}
                  style={{ width: 15, height: 15 }}
                />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#E8E9ED" }}>Gambar AI di Slide Cover</span>
                <span style={{ fontSize: 10, background: "#2A1E3A", color: "#C99BFF", borderRadius: 999, padding: "2px 8px", fontWeight: 700 }}>Eksperimental</span>
              </label>
              <div style={{ fontSize: 11, color: "#5A5F6B", marginTop: 4, marginLeft: 23 }}>
                Slide pertama pakai foto hasil AI (model gambar terpisah dari teks) sebagai background, bukan template biasa. Kuota &amp; biaya API-nya terpisah dari kuota teks — bisa lebih cepat habis atau berbayar tergantung akun Anda.
              </div>
            </div>
          )}

          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #1E222B" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={settings.useProxy}
                onChange={(e) => { setSettings((s) => ({ ...s, useProxy: e.target.checked })); setAiTestStatus(null); }}
                style={{ width: 15, height: 15 }}
              />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#E8E9ED" }}>Gunakan Proxy Server</span>
              {(settings.provider === "groq" || settings.provider === "openrouter") && (
                <span style={{ fontSize: 10, background: "#3A2E12", color: "#F5B84A", borderRadius: 999, padding: "2px 8px", fontWeight: 700 }}>Disarankan</span>
              )}
            </label>
            <div style={{ fontSize: 11, color: "#5A5F6B", marginTop: 4, marginLeft: 23 }}>
              Groq &amp; OpenRouter sering memblokir request langsung dari browser (CORS). Deploy proxy gratis dengan{" "}
              <code style={{ background: "#0B0D12", padding: "1px 4px", borderRadius: 4 }}>proxy-server/worker.js</code>{" "}
              ke Cloudflare Workers, lalu tempel URL-nya di bawah.
            </div>

            {settings.useProxy && (
              <input
                type="text"
                value={settings.proxyUrl}
                onChange={(e) => { setSettings((s) => ({ ...s, proxyUrl: e.target.value })); setAiTestStatus(null); }}
                placeholder="https://carousel-ai-proxy.<akun>.workers.dev"
                style={{ width: "100%", marginTop: 10, background: "#0B0D12", border: "1px solid #262A34", borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 13, boxSizing: "border-box" }}
              />
            )}
          </div>

          <button onClick={onTestConnection} disabled={aiLoading || !settings.apiKey} style={{ ...secondaryBtnStyle, marginTop: 12, width: "100%", opacity: !settings.apiKey ? 0.5 : 1 }}>
            {aiLoading ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />} Test Koneksi
          </button>
          {aiTestStatus === "ok" && (
            <div style={{ marginTop: 8, fontSize: 12, color: "#34D399", display: "flex", alignItems: "center", gap: 5 }}><CheckCircle2 size={13} /> {aiTestMsg}</div>
          )}
          {aiTestStatus === "fail" && (
            <div style={{ marginTop: 8, fontSize: 12, color: "#F87171", display: "flex", alignItems: "center", gap: 5 }}><XCircle size={13} /> {aiTestMsg}</div>
          )}

          <div style={{ marginTop: 12, fontSize: 11, color: "#5A5F6B", display: "flex", alignItems: "flex-start", gap: 6, background: "#0B0D12", border: "1px solid #1E222B", borderRadius: 8, padding: 8 }}>
            <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 1 }} />
            Jika provider gagal atau API key salah, sistem otomatis fallback ke Local Engine — carousel tetap ter-generate.
          </div>
        </div>
      )}
    </div>
  );
}
