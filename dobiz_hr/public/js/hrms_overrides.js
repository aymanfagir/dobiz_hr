(function() {
    var _lang = (window.frappe && frappe.boot && frappe.boot.lang) || '';

    function applyRTL() {
        if (_lang.indexOf('ar') !== 0) return;
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        var app = document.getElementById('app');
        if (app) { app.setAttribute('dir', 'rtl'); app.style.direction = 'rtl'; }
    }

    function updateBranding() {
        document.querySelectorAll('*').forEach(function(el) {
            if (el.children.length === 0 && el.textContent.includes('Frappe HR')) {
                el.textContent = el.textContent.replace(/Frappe HR/g, 'Do Business HR');
            }
        });
        document.querySelectorAll('.flex.flex-col.mx-auto').forEach(function(container) {
            var svg = container.querySelector('svg');
            if (svg && !container.querySelector('img.dobiz-logo')) {
                svg.style.display = 'none';
                var img = document.createElement('img');
                img.src = '/assets/dobiz_custom/images/DoBiz_Taiba.png';
                img.className = 'dobiz-logo';
                img.style.cssText = 'max-height:64px; width:auto;';
                container.insertBefore(img, svg);
            }
        });
    }

    applyRTL();
    updateBranding();
    document.addEventListener('DOMContentLoaded', function() { applyRTL(); updateBranding(); });
    [100, 300, 600, 1000, 1500, 2000].forEach(function(ms) {
        setTimeout(applyRTL, ms);
        setTimeout(updateBranding, ms);
    });

    new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (m.attributeName === 'dir' && document.documentElement.getAttribute('dir') !== 'rtl') {
                applyRTL();
            }
        });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });

    var brandTimer = null;
    var brandObserver = new MutationObserver(function() {
        clearTimeout(brandTimer);
        brandTimer = setTimeout(updateBranding, 30);
    });
    document.addEventListener('DOMContentLoaded', function() {
        if (document.body) brandObserver.observe(document.body, { childList: true, subtree: true });
    });
    if (document.body) brandObserver.observe(document.body, { childList: true, subtree: true });

    function checkLoginReload(prevPath) {
        if (prevPath.indexOf('login') === -1) return;
        var last = parseInt(sessionStorage.getItem('_hrms_reloaded') || '0');
        if (Date.now() - last < 5000) return;
        sessionStorage.setItem('_hrms_reloaded', Date.now().toString());
        setTimeout(function() { window.location.reload(); }, 400);
    }

    var _origPushState = history.pushState;
    history.pushState = function(state, title, url) {
        var prevPath = window.location.pathname + window.location.hash;
        _origPushState.apply(this, arguments);
        applyRTL(); updateBranding();
        checkLoginReload(prevPath);
    };

    var _origReplaceState = history.replaceState;
    history.replaceState = function(state, title, url) {
        var prevPath = window.location.pathname + window.location.hash;
        _origReplaceState.apply(this, arguments);
        applyRTL(); updateBranding();
        checkLoginReload(prevPath);
    };

    window.addEventListener('hashchange', function() { applyRTL(); updateBranding(); });
    window.addEventListener('popstate', function() { setTimeout(applyRTL, 100); setTimeout(updateBranding, 100); });
})();
