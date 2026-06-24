import frappe
from hrms.www.hrms import get_context as _get_context

no_cache = 1


def get_context(context):
    if frappe.session.user and frappe.session.user != "Guest":
        lang = frappe.db.get_value("User", frappe.session.user, "language")
        if lang:
            frappe.local.lang = lang
    return _get_context(context)