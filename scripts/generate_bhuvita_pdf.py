import os
import re
import subprocess
import markdown

def generate_pdf():
    md_path = os.path.join("docs", "14_DAY_GROWTH_PLAN_BHUVITA.md")
    html_out = os.path.join("scratch", "bhuvita_guide.html")
    pdf_out = os.path.join("docs", "Makeovers_by_Bhuvita_14_Day_Growth_Playbook.pdf")

    os.makedirs("scratch", exist_ok=True)
    os.makedirs("docs", exist_ok=True)

    with open(md_path, "r", encoding="utf-8") as f:
        md_text = f.read()

    # Pre-process GitHub alerts like > [!IMPORTANT], > [!WARNING], > [!CAUTION]
    def replace_alerts(match):
        alert_type = match.group(1).upper()
        content = match.group(2).strip()
        icon = "📌"
        badge_class = "alert-info"
        title = "IMPORTANT NOTE"

        if "WARN" in alert_type:
            icon = "⚠️"
            badge_class = "alert-warning"
            title = "WARNING / ATTENTION"
        elif "CAUTION" in alert_type or "CRITICAL" in alert_type:
            icon = "🛑"
            badge_class = "alert-caution"
            title = "CRITICAL RULE"
        elif "TIP" in alert_type:
            icon = "💡"
            badge_class = "alert-tip"
            title = "PRO STRATEGY TIP"

        # clean lines starting with >
        cleaned_content = "\n".join([line.lstrip("> ").strip() for line in content.split("\n")])
        return f'\n<div class="custom-alert {badge_class}"><div class="alert-title">{icon} {title}</div><div class="alert-body">\n\n{cleaned_content}\n\n</div></div>\n'

    md_text = re.sub(r'>\s*\[!(IMPORTANT|WARNING|CAUTION|NOTE|TIP)\]([^\n]*(?:\n>[^\n]*)*)', replace_alerts, md_text)

    # Convert markdown to HTML
    extensions = ['tables', 'fenced_code', 'nl2br', 'sane_lists']
    html_body = markdown.markdown(md_text, extensions=extensions)

    # Post-process: style WhatsApp scripts with special styling
    # Look for blockquotes that contain WhatsApp scripts or dialogues
    def style_scripts(match):
        inner = match.group(1)
        if "Hi " in inner or "Bride's Name" in inner or "wa.me" in inner or "Google Review Link" in inner:
            return f'<div class="script-card"><div class="script-badge">📱 Ready-to-Send WhatsApp Script</div><blockquote>{inner}</blockquote></div>'
        return f'<blockquote>{inner}</blockquote>'

    html_body = re.sub(r'<blockquote>([\s\S]*?)</blockquote>', style_scripts, html_body)

    # Wrap checkboxes
    html_body = re.sub(r'\[\s*\]\s*(.*?)(?=<br|</li|\n)', r'<label class="checkbox-item"><span class="check-box"></span> \1</label>', html_body)
    html_body = re.sub(r'\[x\]\s*(.*?)(?=<br|</li|\n)', r'<label class="checkbox-item checked"><span class="check-box checked">✓</span> \1</label>', html_body)

    # Full luxury document template
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Makeovers by Bhuvita — 14-Day Growth Playbook</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page {{
    size: A4 portrait;
    margin: 18mm 16mm 20mm 16mm;
    @top-right {{
      content: "Makeovers by Bhuvita • Confidential Playbook";
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8pt;
      color: #9C8975;
      text-transform: uppercase;
      letter-spacing: 1px;
    }}
    @bottom-center {{
      content: "Page " counter(page);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8.5pt;
      color: #8B6F47;
      font-weight: 600;
    }}
  }}

  :root {{
    --gold: #8B6F47;
    --gold-light: #D4A574;
    --gold-bg: #F9F6F0;
    --dark: #1F1B18;
    --gray-body: #3E3833;
    --gray-muted: #6B625B;
    --border: #E8DFD5;
    --wa-green: #25D366;
  }}

  * {{
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  body {{
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 10pt;
    line-height: 1.55;
    color: var(--gray-body);
    background-color: #FFFFFF;
    margin: 0;
    padding: 0;
  }}

  /* Typography */
  h1, h2, h3, h4 {{
    font-family: 'Playfair Display', Georgia, serif;
    color: var(--dark);
    font-weight: 700;
    line-height: 1.25;
    margin-top: 1.4em;
    margin-bottom: 0.5em;
    break-after: avoid;
  }}

  h1 {{
    font-size: 22pt;
    color: var(--gold);
    border-bottom: 2px solid var(--gold-light);
    padding-bottom: 6px;
    margin-top: 0;
  }}

  h2 {{
    font-size: 15pt;
    color: var(--dark);
    border-left: 4px solid var(--gold);
    padding-left: 10px;
    margin-top: 1.6em;
    margin-bottom: 0.6em;
  }}

  h3 {{
    font-size: 12pt;
    color: var(--gold);
    margin-top: 1.2em;
  }}

  h4 {{
    font-size: 10.5pt;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}

  p, li {{
    font-size: 9.5pt;
    color: var(--gray-body);
  }}

  strong {{
    color: var(--dark);
    font-weight: 600;
  }}

  /* Header Luxury Cover Hero */
  .cover-header {{
    background: linear-gradient(135deg, #FAF7F2 0%, #F5EFEB 100%);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    text-align: center;
    break-inside: avoid;
  }}

  .brand-super {{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--gold);
    font-weight: 700;
    margin-bottom: 4px;
  }}

  .brand-title {{
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 32pt;
    color: var(--dark);
    line-height: 1;
    margin: 6px 0 10px 0;
    font-weight: 700;
  }}

  .brand-sub {{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10pt;
    color: var(--gray-muted);
    max-width: 600px;
    margin: 0 auto;
    font-weight: 400;
  }}

  .badge-grid {{
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
    flex-wrap: wrap;
  }}

  .badge {{
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 8pt;
    font-weight: 600;
    color: var(--gold);
  }}

  /* Script Cards (WhatsApp) */
  .script-card {{
    background: #FAFFF9;
    border: 1.5px solid #82E0AA;
    border-left: 5px solid #25D366;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 14px 0;
    break-inside: avoid;
  }}

  .script-badge {{
    font-size: 8.5pt;
    font-weight: 700;
    color: #1E7E34;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }}

  .script-card blockquote {{
    margin: 0;
    padding: 0;
    border: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 9pt;
    color: #1F3A24;
    line-height: 1.5;
  }}

  /* Alerts */
  .custom-alert {{
    border-radius: 8px;
    padding: 10px 14px;
    margin: 14px 0;
    break-inside: avoid;
  }}

  .alert-title {{
    font-weight: 700;
    font-size: 9pt;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}

  .alert-body p {{
    margin: 4px 0;
    font-size: 9pt;
  }}

  .alert-warning {{
    background-color: #FFFDF0;
    border: 1px solid #FFE082;
    border-left: 4px solid #FFA000;
    color: #5D4037;
  }}

  .alert-caution {{
    background-color: #FDF2F2;
    border: 1px solid #F8B4B4;
    border-left: 4px solid #E02424;
    color: #771D1D;
  }}

  .alert-info {{
    background-color: #F7F5F0;
    border: 1px solid var(--border);
    border-left: 4px solid var(--gold);
    color: var(--dark);
  }}

  /* Tables */
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 8.5pt;
    break-inside: avoid;
  }}

  th, td {{
    padding: 7px 10px;
    border: 1px solid var(--border);
    text-align: left;
    vertical-align: top;
  }}

  th {{
    background-color: #F5EFEB;
    color: var(--dark);
    font-weight: 700;
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}

  tr:nth-child(even) td {{
    background-color: #FCFAF8;
  }}

  /* Checkboxes */
  .checkbox-item {{
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 2px 0;
    font-size: 9pt;
  }}

  .check-box {{
    display: inline-block;
    width: 13px;
    height: 13px;
    border: 1.5px solid var(--gold);
    border-radius: 3px;
    background: #FFF;
    margin-right: 5px;
    vertical-align: middle;
  }}

  .check-box.checked {{
    background: var(--gold);
    color: white;
    text-align: center;
    font-size: 9pt;
    line-height: 11px;
    font-weight: bold;
  }}

  /* Lists */
  ul, ol {{
    padding-left: 20px;
    margin: 6px 0;
  }}

  li {{
    margin-bottom: 4px;
  }}

  /* Code blocks & pre */
  pre {{
    background: #F8F5F1;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 8pt;
    font-family: 'Consolas', monospace;
    overflow-x: auto;
    break-inside: avoid;
    white-space: pre-wrap;
    word-break: break-word;
  }}

  code {{
    font-family: 'Consolas', monospace;
    font-size: 8.5pt;
    background: #F4EFEA;
    padding: 1px 4px;
    border-radius: 3px;
    color: #795548;
  }}

  hr {{
    border: none;
    border-top: 1px solid var(--border);
    margin: 20px 0;
  }}

  /* Responsive print tweaks */
  .page-break {{
    page-break-after: always;
    break-after: page;
  }}
</style>
</head>
<body>

<div class="cover-header">
  <div class="brand-super">Private Strategic Playbook • Sector 37A Chandigarh</div>
  <div class="brand-title">Makeovers by Bhuvita</div>
  <div class="brand-sub">
    <strong>14-Day Brand Owner & Business Growth Action Plan</strong><br>
    Google Business Domination • 200+ Bride Review Engine • Instagram Funnel • Luxury B2B Partnerships • WhatsApp Closing
  </div>
  <div class="badge-grid">
    <span class="badge">Founder: Bhuvita</span>
    <span class="badge">UV Ghai Certified</span>
    <span class="badge">5+ Years • 200+ Brides</span>
    <span class="badge">Sector 37A Studio</span>
    <span class="badge">makeoversbybhuvita.com</span>
  </div>
</div>

{html_body}

</body>
</html>
"""

    with open(html_out, "w", encoding="utf-8") as f:
        f.write(full_html)

    print(f"Generated HTML template at: {html_out}")

    # Invoke Edge headless to print to PDF
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    if not os.path.exists(edge_path):
        edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

    abs_html = os.path.abspath(html_out)
    abs_pdf = os.path.abspath(pdf_out)

    cmd = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={abs_pdf}",
        f"file:///{abs_html.replace(os.sep, '/')}"
    ]

    print("Running Edge PDF generation...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(abs_pdf) and os.path.getsize(abs_pdf) > 1000:
        print(f"SUCCESS! Created PDF at: {abs_pdf} (Size: {os.path.getsize(abs_pdf):,} bytes)")
    else:
        print(f"Edge exited with code: {res.returncode}")
        print("Stdout:", res.stdout)
        print("Stderr:", res.stderr)

if __name__ == "__main__":
    generate_pdf()
