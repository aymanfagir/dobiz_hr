app_name = "dobiz_hr"
app_title = "DoBiz Hr"
app_publisher = "Ayman Fagir"
app_description = "Custom app for saudi market"
app_email = "aymanfagir@gmail.com"
app_license = "mit"

required_apps = ["hrms"]

fixtures = [
    {"dt": "Property Setter"},
    {"dt": "Custom Field"},
    {"dt": "Navbar Settings"},
]

override_whitelisted_methods = {
    "frappe.translate.load_all_translations": "dobiz_hr.boot.load_all_translations"
}

after_migrate = ["dobiz_hr.patches.inject_hrms_css.apply"]

boot_session = "dobiz_hr.boot.boot_session"