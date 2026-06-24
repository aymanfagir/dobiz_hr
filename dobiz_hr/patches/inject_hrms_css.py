import re
import os


def apply():
    bench_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", ".."))
    src = os.path.join(bench_root, "apps", "hrms", "hrms", "www", "hrms.html")
    dst = os.path.join(bench_root, "apps", "dobiz_hr", "dobiz_hr", "www", "hrms.html")

    if not os.path.isfile(src) or not os.path.isfile(dst):
        return

    src_content = open(src).read()
    dst_content = open(dst).read()

    patterns = [
        r'/assets/hrms/frontend/assets/index-[\w-]+\.js',
        r'/assets/hrms/frontend/assets/frappe-ui-[\w-]+\.js',
        r'/assets/hrms/frontend/assets/frappe-ui-[\w-]+\.css',
        r'/assets/hrms/frontend/assets/index-[\w-]+\.css',
    ]

    changed = False
    for pat in patterns:
        src_match = re.search(pat, src_content)
        dst_match = re.search(pat, dst_content)
        if src_match and dst_match and src_match.group() != dst_match.group():
            dst_content = dst_content.replace(dst_match.group(), src_match.group(), 1)
            changed = True

    if changed:
        open(dst, "w").write(dst_content)