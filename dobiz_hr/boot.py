import frappe


def boot_session(bootinfo):
    if hasattr(bootinfo, "apps"):
        for app in bootinfo.apps:
            if isinstance(app, dict) and app.get("name") == "hrms":
                app["title"] = "Do Business HR"
                app["logo"] = "/assets/dobiz_hr/images/dobiz-logo.svg"


@frappe.whitelist(allow_guest=True)
def load_all_translations(lang=None):
    from frappe.translate import get_all_translations
    return get_all_translations(lang or frappe.local.lang or "en")