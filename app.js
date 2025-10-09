// app.js — Cognigy bridge for the demo site
(() => {
  "use strict";

  // --- UI updater: swap “Sign in” → user’s name ---
  function setSignedInName(name = "Andy Martin") {
    const btn = document.getElementById("btnSignIn");
    const label = document.getElementById("btnSignInLabel");
    if (!btn || !label) return;

    label.textContent = name;

    // Optional: tweak styling to look “signed in”
    btn.classList.remove("border", "border-blue-400", "text-blue-700", "hover:bg-blue-50");
    btn.classList.add("bg-blue-50", "text-blue-900", "border", "border-blue-200");
  }

  // --- 1) Cognigy Webchat data → page (handles your _webapp payload) ---
  function wireCognigyWebchatBridge() {
    // Only if Webchat is embedded
    if (!window.CognigyWebchat || !window.CognigyWebchat.on) return;

    window.CognigyWebchat.on("webchat/incoming-message", ({ data }) => {
      // Look for your custom payload shape
      const wa = data && data.data && data.data._webapp;
      if (!wa || !wa.type) return;

      if (wa.type === "webapp.signin") {
        const name = (wa.payload && wa.payload.name) || "Andy Martin";
        setSignedInName(name);
      }
    });
  }

  // --- 2) Fallbacks for other transports (optional but handy) ---
  // a) window.postMessage from a wrapper / test console
  window.addEventListener("message", (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === "webapp.signin") {
      setSignedInName(e.data.name || "Andy Martin");
    }
  });

  // b) CustomEvent from other scripts
  document.addEventListener("webapp.signin", (e) => {
    const name = e.detail && e.detail.name;
    setSignedInName(name || "Andy Martin");
  });

  // --- Boot ---
  window.addEventListener("DOMContentLoaded", () => {
    wireCognigyWebchatBridge();
  });

  // Expose for quick manual testing in the DevTools console:
  window.__demoSignIn = setSignedInName;
})();
