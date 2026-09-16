"use client";

import React, { useState, useEffect } from "react";
import { Download, Smartphone, X } from "lucide-react";

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Listen for beforeinstallprompt event (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  if (!showPrompt && !isIos) return null;

  return (
    <>
      {showPrompt && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            padding: "0.85rem 1.25rem",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            maxWidth: "360px",
          }}
        >
          <Smartphone size={24} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>Install Scrapiva App</div>
            <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>
              Add to Home Screen for fast 1-tap mobile billing.
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            style={{
              background: "#ffffff",
              color: "#047857",
              border: "none",
              padding: "0.45rem 0.85rem",
              borderRadius: "8px",
              fontWeight: 800,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Install
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              opacity: 0.8,
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {showIosGuide && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "16px",
              padding: "1.5rem",
              maxWidth: "400px",
              color: "#ffffff",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#34d399", fontSize: "1.1rem" }}>
              Install on iPhone / iPad
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: "1.5" }}>
              1. Tap the <strong>Share button</strong> (square with up arrow) in Safari. <br />
              2. Scroll down and tap <strong>"Add to Home Screen"</strong>. <br />
              3. Tap <strong>Add</strong> in the top right.
            </p>
            <button
              onClick={() => setShowIosGuide(false)}
              style={{
                marginTop: "1rem",
                width: "100%",
                background: "#10b981",
                border: "none",
                color: "#ffffff",
                padding: "0.6rem",
                borderRadius: "8px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
