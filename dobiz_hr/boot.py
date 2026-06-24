import frappe


@frappe.whitelist(allow_guest=True)
def load_all_translations(lang=None):
    from frappe.translate import get_all_translations
    return get_all_translations(lang or frappe.local.lang or "en")