# My Cybersecurity Notes

<p class="meta">Google Cybersecurity Certificate, Courses 1 to 8 &nbsp;|&nbsp; Written in my own words for revision</p>

These are the notes I keep while studying the certificate. They are not a copy of the course. I wrote each idea the way I would explain it to myself, and I added a few "easy to mix up" points where two things look alike. The hands-on work that goes with these notes is in the Projects folder, and the command and search cheat sheets are in this folder too.

**Contents:** 1 Foundations · 2 Managing risk · 3 Networks · 4 Linux and SQL · 5 Assets, threats, vulnerabilities · 6 Detection and response · 7 Python · 8 Jobs · Quick reference

---

## Course 1: Foundations of Cybersecurity

**The big idea.** Security means protecting data, devices, networks and people from being misused. Everything is measured against three goals: keep data **secret** (confidentiality), keep it **correct** (integrity), and keep it **reachable** (availability).

- A *threat actor* is whoever might cause harm. It can be an outsider or an insider.
- **PII** identifies a person (name, email). **SPII** is the sensitive subset (ID numbers, medical data) and needs extra care.
- **Phishing** tricks a person into acting, usually through a message. The trick works on human behaviour, not on a software bug. That is why it is called social engineering.
- Easy to mix up: a phishing *tactic* is how they pressure you (urgency, fear). A phishing *indicator* is what I can check (sender domain, link target, odd request).
- The Morris worm and later outbreaks are why companies started forming incident response teams. Equifax is the standard example of a known bug that was left unpatched.
- Rules matter as well as tools: GDPR (EU privacy, 72-hour breach notice), PCI DSS (card payments), HIPAA (health data), SOC reports (controls over customer data).
- Analyst tools I will keep meeting: SIEM (logs in one place), packet analyzers, playbooks (written steps for an incident), plus Python, SQL and Linux for the day-to-day work.

---

## Course 2: Play It Safe: Manage Security Risks

**Risk vocabulary.** A *vulnerability* is a weakness. A *threat* is something that could exploit it. *Risk* is the chance that it happens times the damage it would do.

- Risk handling comes down to four choices: accept it, avoid it, transfer it (insurance), or reduce it with controls.
- **Least privilege:** only the access needed for the job. **Separation of duties:** no one person controls a whole sensitive process.
- Controls come in three kinds (administrative, technical, physical) and have four jobs (prevent, detect, correct, deter). A lock is physical and preventative. A camera is physical and detective.
- **NIST CSF** has five functions: identify, protect, detect, respond, recover. I use it as a checklist for "what did the company do before, during and after".
- An **audit** compares what a company has against a standard: set the scope, assess risk, fill in the controls and compliance checklists, then recommend fixes in priority order. (My audit project follows this.)
- Open-source tools are free and community-built. Proprietary tools (Splunk, Chronicle) are sold with support.
- A **playbook** says what to do. A **SIEM** raises the alert. A **SOAR** tool can run some of the steps automatically.

---

## Course 3: Connect and Protect

**How data moves.** A device sends data in packets. Switches join devices inside one network, routers join different networks, and firewalls decide what may pass.

- **TCP/IP** has 4 layers and **OSI** has 7. I use the table in the quick reference to translate between them.
- **TCP** checks delivery and opens with a three-step handshake (SYN, SYN-ACK, ACK). **UDP** skips the checks to go faster.
- IPv4 addresses are 32 bits, IPv6 are 128 bits. **ARP** maps an IP to a hardware (MAC) address. **DHCP** hands out addresses. **DNS** turns names into addresses.
- Wi-Fi: WEP is broken, WPA2 and WPA3 are the ones to use.
- A **VPN** wraps traffic in an encrypted tunnel. A **proxy** stands between a user and the internet.
- **Subnets** split a network into smaller pieces so a problem in one piece is less likely to spread.

**Attacks I should recognise in a traffic log**

| Attack | What I would see |
|---|---|
| SYN flood | Many SYN packets, the handshake never finishes, the server runs out of room |
| DoS and DDoS | Too much traffic from one source (DoS) or from many (DDoS) |
| Smurf | ICMP requests with a faked source address, the replies swamp the victim |
| On-path | A device quietly sitting between two others reading or changing traffic |
| IP spoofing | A packet with a fake source IP |

**Hardening** means shrinking the attack surface: patch, remove what is unused, use MFA, close unneeded ports, segment the network. An **IDS** only alerts. An **IPS** alerts and blocks. In the cloud, the provider and the customer share responsibility, and what each one owns depends on the service type (SaaS, PaaS, IaaS).

---

## Course 4: Tools of the Trade: Linux and SQL

**Linux.** Open source, and the shell (usually Bash) takes typed commands. Analysts use it because it is quick, scriptable and everywhere on servers.

- Look around: `pwd`, `ls`, `cd`, `cat`, `head`, `tail`, `less`.
- Search: `grep` for text inside files, `find` for files by name or property, `|` to pass one command's output to the next.
- Change things: `mkdir`, `touch`, `cp`, `mv`, `rm`, `nano`.
- Users: `sudo` runs a command with admin rights. `useradd`, `usermod`, `userdel` manage accounts.
- Permissions are read, write, execute for **user, group, other**. `chmod` changes them and `chown` changes the owner. The full table is in the quick reference.
- Mix-up to avoid: `usermod -g` *replaces* a group, `usermod -a -G` *adds* one.
- Project: [Linux File Permissions](../Projects/07-Linux-File-Permissions.pdf)

**SQL.** A relational database keeps data in tables of rows and columns, connected by keys.

- The pattern is always `SELECT` (which columns) `FROM` (which table) `WHERE` (which rows).
- `AND` needs both conditions, `OR` needs either one, `NOT` excludes. `LIKE` with `%` matches part of a value.
- **Joins** combine tables on a shared key. Inner keeps only matches, left and right keep everything from one side, full outer keeps everything.
- Project: [SQL Login Filtering](../Projects/08-SQL-Login-Filtering.pdf). Commands are collected in the [Linux and SQL Cheat Sheet](K2-Linux-and-SQL-Cheat-Sheet.pdf).

---

## Course 5: Assets, Threats, and Vulnerabilities

**Assets first.** Before protecting anything, I need to know what it is and how sensitive it is. Data is usually sorted into public, internal, confidential and restricted, and the higher the label, the stronger the protection.

- **Scoring a risk:** rate likelihood and severity, then multiply. High score means fix first. (My vulnerability report uses a 1 to 3 scale for both.)
- **Data life:** collected, stored, used, archived, destroyed. Each stage needs rules about who may touch it.
- **Privacy vs security:** privacy is about a person's control over their data, security is about keeping it protected.
- **Encryption:** symmetric uses one shared key (fast, example AES). Asymmetric uses a public and private pair (example RSA). Certificates prove a public key really belongs to its owner.
- **Hashing** is different from encryption. A hash is a one-way fingerprint, so it proves a file was not changed but cannot be turned back into the file. Adding a **salt** before hashing passwords defeats precomputed (rainbow table) attacks. SHA-256 is fine, MD5 and SHA-1 are weak.
- **AAA:** who are you (authentication), what may you do (authorization), what did you do (accounting). MFA and SSO are about the first one.
- **Finding weaknesses:** scans (internal or external), penetration tests, bug bounties. CVE is the public catalogue of known flaws. Software that no longer gets updates (end of life) is a standing risk.
- **Attack types to know:** social engineering (pretexting, baiting, tailgating, smishing, vishing, spear phishing, whaling), malware families (virus, worm, trojan, ransomware, spyware, rootkit, botnet), and web attacks (cross-site scripting, SQL injection). Injection is stopped by validating input and using prepared statements.
- **Threat modelling** means thinking like the attacker on purpose. PASTA is a seven-stage method that moves from business goals down to attack paths and fixes.
- Project: [Vulnerability Assessment Report](../Projects/05-Vulnerability-Assessment-Report.pdf)

---

## Course 6: Sound the Alarm: Detection and Response

**Incident lifecycle (NIST):** prepare, detect and analyse, contain / eradicate / recover, then learn from it afterwards.

- A SOC usually works in tiers: tier 1 triages alerts, tier 2 investigates, tier 3 handles the hardest cases.
- When I document an incident I answer who, what, where, when and why, and I write down which tools I used.
- Detection tools: IDS, IPS, EDR for endpoints, SIEM for collecting and correlating logs.
- **Packets:** a header (addresses, protocol, TTL), the payload (the data) and sometimes a footer. Wireshark shows them in a window. tcpdump shows them in the terminal, and options like `-i`, `-c`, `-w`, `-r` and `-n` control what it captures and prints.
- **Logs** come as syslog, JSON, XML or CSV. A **signature** is a rule describing what a known-bad thing looks like.
- **Pyramid of Pain:** the lower a clue sits, the easier it is for an attacker to change, so the less it hurts them when I block it. A file hash is trivial to change. Their tactics and techniques are the hardest. So the best defence targets behaviour.
- VirusTotal checks a hash, URL or IP against what other people have already reported.
- Searching in SIEMs: Splunk uses SPL, Chronicle uses UDM search and raw log search. See the [SIEM Search Cheat Sheet](K1-SIEM-Search-Cheat-Sheet.pdf).
- Projects: [Incident Handler's Journal](../Projects/06-Incident-Handlers-Journal.pdf), [NIST CSF Incident Report](../Projects/11-NIST-CSF-Incident-Report.pdf)

---

## Course 7: Automate Cybersecurity Tasks with Python

**Why Python.** Many security jobs are the same small steps repeated on a lot of data. A script does them faster and without typing mistakes.

- **Types:** string, integer, float, boolean, list, tuple, dictionary, set. A **variable** is a name for a value.
- **Decisions:** `if`, `elif`, `else` with `==`, `!=`, `<`, `>`, `and`, `or`, `not`.
- **Loops:** `for` goes through a list or a range. `while` repeats as long as a condition holds, so I must make sure it can end.
- **Functions:** `def`, parameters, `return`. Variables made inside a function stay inside it.
- **Strings** start counting at 0 and cannot be changed in place. **Lists** can be changed (`.append()`, `.remove()`), and `.split()` / `.join()` convert between a string and a list.
- **Regular expressions** (`re.findall()`) pull a pattern, like an IP address or email, out of text.
- **Files:** `with open(name, "r") as f:` then `f.read()`. The `with` block closes the file for me.
- **Debugging:** read the error type and the line number first. Syntax, name, index and type errors each point to a different kind of slip. `print()` helps me see what the code is doing.
- Project: [Python Allow-List Updater](../Projects/09-Python-Allow-List-Updater.pdf)

---

## Course 8: Put It to Work

- Technical skill is not enough. I also have to explain an incident in a few clear sentences to someone who is not technical, and know when to escalate something that is beyond my level.
- A career identity statement should be short, specific, honest and positive. It can be reused in an introduction, a cover letter and an online bio.
- The job search checklist: list transferable skills, build a portfolio, write the resume, tidy my online profile, plan networking, practise interviews.
- If I use AI for the job search, I give it context and a clear goal, then read and edit the result before I use it.

---

## Quick reference

### Common ports

| Port | Protocol | Notes |
|---|---|---|
| 20, 21 | FTP | File transfer, not encrypted |
| 22 | SSH | Secure remote login |
| 23 | Telnet | Remote login, not encrypted |
| 25 | SMTP | Sending email |
| 53 | DNS | Names to addresses |
| 80 | HTTP | Web, not encrypted |
| 110 | POP3 | Receiving email |
| 143 | IMAP | Receiving email |
| 443 | HTTPS | Web, encrypted |

### Network layers

| TCP/IP | OSI |
|---|---|
| Application | 7 Application, 6 Presentation, 5 Session |
| Transport | 4 Transport |
| Internet | 3 Network |
| Network access | 2 Data link, 1 Physical |

### chmod letters

| Symbol | Meaning |
|---|---|
| `u`, `g`, `o`, `a` | user, group, other, all |
| `+`, `-`, `=` | add, remove, set exactly |
| `r`, `w`, `x` | read, write, execute |

### Three things to remember

- **CIA:** confidentiality, integrity, availability.
- **NIST CSF:** identify, protect, detect, respond, recover.
- **Incident lifecycle:** prepare, detect and analyse, contain and recover, learn afterwards.
