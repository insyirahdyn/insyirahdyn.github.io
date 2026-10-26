// Turns the write-ups in Portfolio material/ into pages for the site.
// The .md files there are the source: edit those, then run `npm run dev`.
// PDFs are not published, so visitors can only read the pages on the site.
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const material = path.join(root, 'Portfolio material');
const outDir = path.join(root, 'src/content/labs');

// Order, slug, category and card summary for each write-up
const entries = [
  { file: 'Projects/01-Phishing-Incident-Triage.md', slug: 'phishing-incident-triage', category: 'Incident response',
    summary: 'Triaged a phishing alert, confirmed the attachment was malware with VirusTotal, and escalated the ticket.' },
  { file: 'Projects/02-SYN-Flood-Attack-Analysis.md', slug: 'syn-flood-attack-analysis', category: 'Networking',
    summary: 'Read a Wireshark capture and identified the SYN flood that took a website offline.' },
  { file: 'Projects/03-DNS-ICMP-Traffic-Analysis.md', slug: 'dns-icmp-traffic-analysis', category: 'Networking',
    summary: 'Traced a website outage to an unreachable DNS service using a tcpdump log.' },
  { file: 'Projects/04-Security-Audit-Botium-Toys.md', slug: 'security-audit-botium-toys', category: 'Risk & compliance',
    summary: 'Completed controls and compliance checklists (PCI DSS, GDPR, SOC) and prioritised the fixes.' },
  { file: 'Projects/05-Vulnerability-Assessment-Report.md', slug: 'vulnerability-assessment-report', category: 'Risk & compliance',
    summary: 'Scored threats to a database server with NIST SP 800-30 and recommended access controls.' },
  { file: 'Projects/06-Incident-Handlers-Journal.md', slug: 'incident-handlers-journal', category: 'Incident response',
    summary: 'Documented four incidents and the tools I used (Wireshark, tcpdump, VirusTotal).' },
  { file: 'Projects/07-Linux-File-Permissions.md', slug: 'linux-file-permissions', category: 'Linux, SQL & Python',
    summary: 'Checked and fixed file and directory permissions with chmod, following least privilege.' },
  { file: 'Projects/08-SQL-Login-Filtering.md', slug: 'sql-login-filtering', category: 'Linux, SQL & Python',
    summary: 'Wrote SQL queries to investigate suspicious logins and find machines that need updates.' },
  { file: 'Projects/09-Python-Allow-List-Updater.md', slug: 'python-allow-list-updater', category: 'Linux, SQL & Python',
    summary: 'Wrote a Python script that removes IP addresses from an allow list file.' },
  { file: 'Projects/10-PASTA-Threat-Model.md', slug: 'pasta-threat-model', category: 'Risk & compliance',
    summary: 'Threat-modelled a sneaker marketplace app with PASTA, with a data flow diagram and attack tree.' },
  { file: 'Projects/11-NIST-CSF-Incident-Report.md', slug: 'nist-csf-incident-report', category: 'Incident response',
    summary: 'Wrote an ICMP flood incident report using the five NIST CSF functions.' },
  { file: 'Study-Notes/K1-SIEM-Search-Cheat-Sheet.md', slug: 'siem-search-cheat-sheet', category: 'Study notes',
    summary: 'How I search logs in Splunk and Google SecOps (Chronicle).' },
  { file: 'Study-Notes/K2-Linux-and-SQL-Cheat-Sheet.md', slug: 'linux-and-sql-cheat-sheet', category: 'Study notes',
    summary: 'The Linux commands and SQL queries I use most.' },
  { file: 'Study-Notes/My-Notes.md', slug: 'my-notes', category: 'Study notes',
    summary: 'My own notes for all 8 courses of the certificate.',
    meta: { type: 'Study notes (Courses 1 to 8)' } },
];

// Links between write-ups point at their PDFs; send them to the site page instead
const pageFor = Object.fromEntries(entries.map((e) => [path.basename(e.file, '.md'), `/learning/${e.slug}`]));
const linkPdfs = (s) =>
  s.replace(/\]\((?:\.\.\/)?(?:Projects\/|Study-Notes\/)?([^)/]+)\.pdf\)/g, (m, name) => (pageFor[name] ? `](${pageFor[name]})` : m));

const callouts = { scenario: 'callout callout-scenario', q: 'callout callout-q', a: 'callout callout-a' };

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inlineCode = (s) => escapeHtml(s).replace(/`([^`]+)`/g, '<code>$1</code>');
const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();

function parseMeta(html) {
  const meta = {};
  for (const part of html.split(/&nbsp;\|&nbsp;/)) {
    const m = stripTags(part).match(/^(\w+):\s*(.+)$/);
    if (m) meta[m[1].toLowerCase()] = m[2].trim();
  }
  return meta;
}

function convert(md, entry) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let title = entry.slug;
  let meta = {};
  const body = [];

  for (const line of lines) {
    if (line.startsWith('# ') && title === entry.slug) { title = line.slice(2).trim(); continue; }
    if (line.startsWith('<p class="meta">')) { meta = parseMeta(line.replace(/^<p class="meta">|<\/p>$/g, '')); continue; }

    // ::: q / ::: a / ::: scenario blocks become styled boxes
    const open = line.match(/^:::\s*(\w+)\s*$/);
    if (open) { body.push(`<div class="${callouts[open[1]] ?? 'callout'}">`, ''); continue; }
    if (/^:::\s*$/.test(line)) { body.push('', '</div>'); continue; }

    // Images on their own line become figures with a caption
    const img = line.match(/^!\[(.*)\]\((?:\.\.\/)?images\/([^)]+)\)\s*$/);
    if (img) {
      body.push(`<figure><img src="/images/${img[2]}" alt="${escapeHtml(img[1].replace(/`/g, ''))}" loading="lazy" /><figcaption>${inlineCode(img[1])}</figcaption></figure>`);
      continue;
    }
    body.push(linkPdfs(line.replace(/\]\((?:\.\.\/)?images\//g, '](/images/')));
  }

  meta = { ...meta, ...entry.meta };
  const front = {
    title,
    slug: entry.slug,
    order: entries.indexOf(entry) + 1,
    category: entry.category,
    summary: entry.summary,
    course: meta.course,
    type: meta.type,
    tools: meta.tools,
    skills: meta.skills,
  };
  const yaml = Object.entries(front)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');
  return `---\n${yaml}\n---\n\n${body.join('\n').trim()}\n`;
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
for (const entry of entries) {
  const md = await readFile(path.join(material, entry.file), 'utf8');
  await writeFile(path.join(outDir, `${entry.slug}.md`), convert(md, entry));
}

// Copy screenshots so the site can serve them (PDFs are deliberately left out)
await rm(path.join(root, 'public/images'), { recursive: true, force: true });
await cp(path.join(material, 'images'), path.join(root, 'public/images'), { recursive: true });
await rm(path.join(root, 'public/pdf'), { recursive: true, force: true });

console.log(`Synced ${entries.length} write-ups into src/content/labs`);
