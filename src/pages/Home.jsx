import React, { useState, useRef, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";

import { detectCategory } from "../ai/engines/categoryEngine.js";
import { detectFramework } from "../ai/engines/frameworkEngine.js";
import { buildSlides } from "../ai/engines/contentEngine.js";
import { generateHashtags } from "../ai/engines/hashtagEngine.js";
import { generateCaptions } from "../ai/engines/captionEngine.js";
import { buildDesignDNA } from "../ai/engines/designDNAEngine.js";
import { PROVIDERS, generateWithFallback, toGeneratedCarousel } from "../ai/providers/index.js";
import { generateHeroImage } from "../ai/providers/imageProvider.js";
import {
  nodeToCanvas, exportNodeAsPng, exportNodeAsJpg, downloadBlob,
  buildPdfFromJpegs, buildZip, dataUrlToUint8,
} from "../lib/exportEngine.js";
import { SLIDE_W, SLIDE_H } from "../lib/slideStyle.js";
import { loadSettings, saveSettings, loadTemplateOverride, saveTemplateOverride } from "../lib/storage.js";

import Header from "../components/Header.jsx";
import CarouselForm from "../components/CarouselForm.jsx";
import CarouselRenderer from "../components/CarouselRenderer.jsx";
import ThumbnailNavigator from "../components/ThumbnailNavigator.jsx";
import ExportPanel from "../components/ExportPanel.jsx";
import DesignDnaPanel from "../components/DesignDnaPanel.jsx";
import HashtagPanel from "../components/HashtagPanel.jsx";
import CaptionPanel from "../components/CaptionPanel.jsx";
import { secondaryBtnStyle } from "../components/common.jsx";

const DEFAULT_SETTINGS = {
  provider: "local", apiKey: "", model: "", useProxy: false, proxyUrl: "", rememberApiKey: false, includeHeroImage: false,
};

export default function Home() {
  const [topic, setTopic] = useState("5 Cara AI Membantu Produktivitas Karyawan");
  const [templateOverride, setTemplateOverride] = useState(() => loadTemplateOverride());
  const [slideCount, setSlideCount] = useState(null); // null = Auto (deteksi dari teks topik)
  const [customBadge, setCustomBadge] = useState(""); // "" = pakai label kategori otomatis
  const [generated, setGenerated] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState("");
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const slideRef = useRef(null);
  const previewWrapRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(360 / SLIDE_W);

  // Settings AI Connector — dimuat dari localStorage (kalau ada), tapi
  // apiKey hanya ikut dimuat kalau user sebelumnya centang "Ingat API key".
  const [settings, setSettings] = useState(() => loadSettings() || DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTestStatus, setAiTestStatus] = useState(null); // null | 'ok' | 'fail'
  const [aiTestMsg, setAiTestMsg] = useState("");
  const [fallbackNotice, setFallbackNotice] = useState("");
  const [heroImageError, setHeroImageError] = useState("");

  const activeModel = settings.model || PROVIDERS[settings.provider].defaultModel;

  // Persist preferensi tiap kali berubah (bukan apiKey kecuali diminta).
  useEffect(() => { saveSettings(settings); }, [settings]);
  useEffect(() => { saveTemplateOverride(templateOverride); }, [templateOverride]);

  // Slide di-render native 1080x1350; scale tampilan mengikuti lebar layar.
  useEffect(() => {
    const el = previewWrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setPreviewScale(w / SLIDE_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [generated]);

  const runLocalEngine = useCallback((t) => {
    const category = detectCategory(t);
    const templateKey = templateOverride === "auto" ? undefined : templateOverride;
    const framework = detectFramework(t);
    const dna = buildDesignDNA(t, templateKey, framework.type);
    if (customBadge.trim()) dna.badge = customBadge.trim();
    const slides = buildSlides(t, framework, category, slideCount);
    const hashtags = generateHashtags(t, category);
    const captions = generateCaptions(t, slides, hashtags);
    return { topic: t, dna, slides, hashtags, captions };
  }, [templateOverride, slideCount, customBadge]);

  const handleGenerate = useCallback(async () => {
    const t = topic.trim();
    if (!t) return;
    setExportError("");
    setFallbackNotice("");
    setHeroImageError("");

    // Helper kecil dipakai di 2 jalur (Local & AI) — supaya gambar hero
    // independen total dari provider teks yang dipilih (lihat catatan di
    // SettingsPanel.jsx soal kenapa key-nya dipisah dari provider teks).
    const attachHeroImage = async (result) => {
      if (settings.includeHeroImage) {
        try {
          result.dna.heroImage = await generateHeroImage(settings.geminiImageApiKey, t, result.dna.badge);
        } catch (imgErr) {
          setHeroImageError(`Gambar cover gagal dibuat (${imgErr.message}) — slide tetap dipakai tanpa gambar.`);
        }
      }
      return result;
    };

    if (settings.provider === "local") {
      const result = runLocalEngine(t);
      if (settings.includeHeroImage) {
        setAiLoading(true);
        try {
          await attachHeroImage(result);
        } finally {
          setAiLoading(false);
        }
      }
      setGenerated(result);
      setActiveIndex(0);
      return;
    }

    setAiLoading(true);
    try {
      const templateKey = templateOverride === "auto" ? undefined : templateOverride;
      // Framework tetap dideteksi dari topik mentah walau teksnya nanti
      // datang dari AI Connector — supaya Layout Engine tetap konsisten
      // apa pun sumber kontennya (lihat catatan di layoutEngine.js).
      const framework = detectFramework(t);
      const dna = buildDesignDNA(t, templateKey, framework.type);
      if (customBadge.trim()) dna.badge = customBadge.trim();
      const { data, usedFallback, error } = await generateWithFallback({ ...settings, model: activeModel, slideCount }, t);
      const result = toGeneratedCarousel(t, data, dna);
      // toGeneratedCarousel bisa nimpa dna.badge pakai badge hasil AI —
      // pastikan custom badge/watermark user tetap menang kalau diisi.
      if (customBadge.trim()) result.dna.badge = customBadge.trim();
      if (usedFallback) {
        setFallbackNotice(`${PROVIDERS[settings.provider].name} gagal (${error?.message || "unknown error"}) — dialihkan ke Local Engine.`);
      }

      await attachHeroImage(result);

      setGenerated(result);
      setActiveIndex(0);
    } finally {
      setAiLoading(false);
    }
  }, [topic, settings, activeModel, templateOverride, slideCount, runLocalEngine, customBadge]);

  const handleTestConnection = async () => {
    setAiTestStatus(null);
    setAiTestMsg("");
    setAiLoading(true);
    try {
      const { usedFallback, error } = await generateWithFallback({ ...settings, model: activeModel }, "Tes koneksi AI Connector");
      if (usedFallback) throw error || new Error("Provider gagal");
      setAiTestStatus("ok");
      setAiTestMsg("Koneksi berhasil.");
    } catch (e) {
      setAiTestStatus("fail");
      setAiTestMsg(e.message);
    } finally {
      setAiLoading(false);
    }
  };

  const activeSlide = generated ? generated.slides[activeIndex] : null;

  const handleExportCurrent = async () => {
    if (!slideRef.current || !generated) return;
    setExporting(true);
    setExportError("");
    try {
      await exportNodeAsPng(slideRef.current, `carousel-slide-${activeIndex + 1}.png`);
    } catch {
      setExportError("Export gagal di browser ini. Coba Chrome/Edge terbaru.");
    } finally {
      setExporting(false);
    }
  };

  const handleExportCurrentJpg = async () => {
    if (!slideRef.current || !generated) return;
    setExporting(true);
    setExportError("");
    try {
      await exportNodeAsJpg(slideRef.current, `carousel-slide-${activeIndex + 1}.jpg`);
    } catch {
      setExportError("Export gagal di browser ini. Coba Chrome/Edge terbaru.");
    } finally {
      setExporting(false);
    }
  };

  const handleExportAll = async () => {
    if (!slideRef.current || !generated) return;
    setExporting(true);
    setExportError("");
    try {
      for (let i = 0; i < generated.slides.length; i++) {
        setActiveIndex(i);
        await new Promise((r) => setTimeout(r, 180));
        await exportNodeAsPng(slideRef.current, `carousel-slide-${i + 1}.png`);
        await new Promise((r) => setTimeout(r, 260));
      }
    } catch {
      setExportError("Export gagal di tengah proses. Coba Chrome/Edge terbaru.");
    } finally {
      setExporting(false);
    }
  };

  const handleExportPdf = async () => {
    if (!slideRef.current || !generated) return;
    setExporting(true);
    setExportError("");
    try {
      const jpegs = [];
      let w = SLIDE_W, h = SLIDE_H;
      for (let i = 0; i < generated.slides.length; i++) {
        setActiveIndex(i);
        await new Promise((r) => setTimeout(r, 180));
        const canvas = await nodeToCanvas(slideRef.current);
        w = canvas.width; h = canvas.height;
        jpegs.push(canvas.toDataURL("image/jpeg", 0.92));
      }
      const blob = buildPdfFromJpegs(jpegs, w, h);
      downloadBlob(blob, "carousel.pdf");
    } catch (e) {
      setExportError("Export PDF gagal: " + e.message);
    } finally {
      setExporting(false);
    }
  };

  const handleExportZip = async () => {
    if (!slideRef.current || !generated) return;
    setExporting(true);
    setExportError("");
    try {
      const files = [];
      for (let i = 0; i < generated.slides.length; i++) {
        setActiveIndex(i);
        await new Promise((r) => setTimeout(r, 180));
        const canvas = await nodeToCanvas(slideRef.current);
        const dataUrl = canvas.toDataURL("image/png");
        files.push({ name: `slide-${String(i + 1).padStart(2, "0")}.png`, data: dataUrlToUint8(dataUrl) });
      }
      const blob = buildZip(files);
      downloadBlob(blob, "carousel-slides.zip");
    } catch (e) {
      setExportError("Export ZIP gagal: " + e.message);
    } finally {
      setExporting(false);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 1500);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D12", color: "#E8E9ED", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`.spin { animation: acsp-spin 1s linear infinite; } @keyframes acsp-spin { to { transform: rotate(360deg); } }`}</style>

      <Header
        settings={settings}
        setSettings={setSettings}
        activeModel={activeModel}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        showKey={showKey}
        setShowKey={setShowKey}
        aiLoading={aiLoading}
        aiTestStatus={aiTestStatus}
        aiTestMsg={aiTestMsg}
        setAiTestStatus={setAiTestStatus}
        onTestConnection={handleTestConnection}
      />

      <div style={{ padding: 16, maxWidth: 720, margin: "0 auto" }}>
        <CarouselForm
          topic={topic}
          onTopicChange={setTopic}
          templateOverride={templateOverride}
          onTemplateChange={setTemplateOverride}
          slideCount={slideCount}
          onSlideCountChange={setSlideCount}
          customBadge={customBadge}
          onCustomBadgeChange={setCustomBadge}
          onGenerate={handleGenerate}
          aiLoading={aiLoading}
          providerName={PROVIDERS[settings.provider].name}
        />

        {fallbackNotice && (
          <div style={{ marginTop: 12, display: "flex", alignItems: "flex-start", gap: 8, background: "#241B0F", border: "1px solid #4A3620", borderRadius: 10, padding: 10, fontSize: 12, color: "#FBBF7A" }}>
            {fallbackNotice}
          </div>
        )}

        {heroImageError && (
          <div style={{ marginTop: 12, display: "flex", alignItems: "flex-start", gap: 8, background: "#241B0F", border: "1px solid #4A3620", borderRadius: 10, padding: 10, fontSize: 12, color: "#FBBF7A" }}>
            {heroImageError}
          </div>
        )}

        {generated && settings.provider === "local" && (
          <div style={{ marginTop: 12, display: "flex", alignItems: "flex-start", gap: 8, background: "#161B2E", border: "1px solid #2A335C", borderRadius: 10, padding: 10, fontSize: 12, color: "#A9B4E8" }}>
            💡 Ini hasil Mode Offline (variasi teksnya terbatas). Untuk hasil yang lebih kaya dan natural, sambungkan AI gratis (Gemini/Groq/OpenRouter, pakai API key sendiri) lewat ikon{" "}
            <button
              onClick={() => setShowSettings(true)}
              style={{ background: "none", border: "none", color: "#8B9EFF", fontWeight: 700, textDecoration: "underline", cursor: "pointer", padding: 0, fontSize: 12 }}
            >
              Settings
            </button>{" "}
            di atas.
          </div>
        )}

        {generated && (
          <>
            <div style={{ marginTop: 20 }}>
              <CarouselRenderer
                slide={activeSlide}
                dna={generated.dna}
                index={activeIndex}
                total={generated.slides.length}
                previewScale={previewScale}
                previewWrapRef={previewWrapRef}
                slideRef={slideRef}
              />

              <ThumbnailNavigator
                slides={generated.slides}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                dna={generated.dna}
              />

              <ExportPanel
                onExportCurrent={handleExportCurrent}
                onExportCurrentJpg={handleExportCurrentJpg}
                onExportAll={handleExportAll}
                onExportZip={handleExportZip}
                onExportPdf={handleExportPdf}
                exporting={exporting}
                exportError={exportError}
              />
            </div>

            <DesignDnaPanel dna={generated.dna} />
            <HashtagPanel hashtags={generated.hashtags} copied={copied} onCopy={copyToClipboard} />
            <CaptionPanel captions={generated.captions} copied={copied} onCopy={copyToClipboard} />

            <button onClick={handleGenerate} style={{ ...secondaryBtnStyle, width: "100%", marginTop: 20 }}>
              <RefreshCw size={14} /> Generate Ulang Variasi
            </button>
          </>
        )}
      </div>
    </div>
  );
}
