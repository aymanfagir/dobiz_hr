import frappe
from hrms.www.hrms import get_context as base_get_context

def get_context(context):
    # Get the standard context from the HRMS app
    context = base_get_context(context)
    
    # Add your custom language/direction data
    context.update({
        "lang": frappe.local.lang,
        "dir": "rtl" if frappe.local.lang.startswith("ar") else "ltr"
    })
    return context

import frappe

def get_context(context):
    # Add this to check if the server is actually running this file
    print("--- HRM.PY GET_CONTEXT CALLED ---")
    
    context.update({
        "lang": frappe.local.lang,
        "dir": "rtl" if frappe.local.lang.startswith("ar") else "ltr"
    })
    return context