(function () {
    var lang = (window.frappe && frappe.boot && frappe.boot.lang) || "";

    function applyRTL() {
        if (lang.indexOf("ar") !== 0) return;
        document.documentElement.setAttribute("lang", "ar");
        document.documentElement.setAttribute("dir", "rtl");
        var app = document.getElementById("app");
        if (app) { app.setAttribute("dir", "rtl"); app.style.direction = "rtl"; }
    }

    function reloadAfterLogin(prevPath) {
        if (prevPath.indexOf("login") === -1) return;
        var last = parseInt(sessionStorage.getItem("_dobiz_reloaded") || "0");
        if (Date.now() - last < 8000) return;
        sessionStorage.setItem("_dobiz_reloaded", String(Date.now()));
        setTimeout(function () { window.location.reload(); }, 400);
    }

    applyRTL();
    document.addEventListener("DOMContentLoaded", applyRTL);
    [100, 300, 600, 1000, 1500, 2000].forEach(function (ms) { setTimeout(applyRTL, ms); });

    new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
            if (m.attributeName === "dir" && document.documentElement.getAttribute("dir") !== "rtl") {
                applyRTL();
            }
        });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });

    var _origReplace = history.replaceState;
    history.replaceState = function (state, title, url) {
        var prev = window.location.pathname + window.location.hash;
        _origReplace.apply(this, arguments);
        reloadAfterLogin(prev);
        applyRTL();
    };

    var _origPush = history.pushState;
    history.pushState = function (state, title, url) {
        var prev = window.location.pathname + window.location.hash;
        _origPush.apply(this, arguments);
        reloadAfterLogin(prev);
        applyRTL();
    };

    window.addEventListener("hashchange", applyRTL);
    window.addEventListener("popstate", function () { setTimeout(applyRTL, 100); });
}());
