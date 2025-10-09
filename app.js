// app.js — bridge handlers for P&O demo
(function(){
  "use strict";

  // Swap “Sign in” → user’s name
  function setSignedInName(name = "Andy Martin") {
    var label = document.getElementById("btnSignInLabel");
    var btn   = document.getElementById("btnSignIn");
    if (!label || !btn) return;
    label.textContent = name;

    // style as "signed in"
    btn.classList.remove("border","border-blue-400","text-blue-700","hover:bg-blue-50");
    btn.classList.add("bg-blue-50","text-blue-900","border","border-blue-200");
  }

  // Direct callback used by the bridge
  window.webappSignin = function (payload) {
    setSignedInName((payload && payload.name) || "Andy Martin");
  };

  // Generic CustomEvent fallback (same type as _webapp.type)
  window.addEventListener("webapp.signin", function (e) {
    setSignedInName((e.detail && e.detail.name) || "Andy Martin");
  });

  // Optional: manual tester in the console
  window.__demoSignIn = setSignedInName;
})();
