# Incident Handler's Journal

<p class="meta"><b>Course:</b> Sound the Alarm: Detection and Response &nbsp;|&nbsp; <b>Type:</b> Running journal (4 entries) &nbsp;|&nbsp; <b>Tools:</b> Wireshark, tcpdump, VirusTotal &nbsp;|&nbsp; <b>Skills:</b> Incident response, documentation, packet analysis</p>

I kept this journal while working through the course. Each entry records what I looked at, the tool I used, and the 5 W's (who, what, where, when, why) when the entry was about an incident.

## Entry 1: Documenting a ransomware incident (September 3, 2026)

| | |
|---|---|
| **What it was** | A case study of a ransomware attack on a healthcare company |
| **Phases** | *Detection and analysis:* the company noticed the attack and asked other organizations for technical help. *Containment, eradication and recovery:* it shut down its computers to contain the attack, but could not remove the ransomware alone and needed outside help. |
| **Tools** | None |
| **Who** | An organized group of attackers |
| **What** | Ransomware that encrypted critical files |
| **Where** | A healthcare company |
| **When** | Tuesday, 9:00 a.m. |
| **Why** | The attackers got in through phishing. The ransom note asked for a large payment, so the motive was money. |

**Prevention:** phishing awareness training, email filtering, offline backups, and a recovery plan that has been tested.
**Should the company pay?** Paying does not guarantee the files come back and it encourages more attacks.

## Entry 2: Analyzing a packet capture (September 3, 2026)

**Tool: Wireshark**, a network protocol analyzer with a graphical interface. It lets an analyst capture and read network traffic, which helps find and investigate malicious activity.

**Notes:** Wireshark shows a lot at once. Filtering the packet list and following a TCP stream makes it easier to see only the traffic that matters.

## Entry 3: Capturing my first packet (September 4, 2026)

**Tool: tcpdump**, a network protocol analyzer that runs on the command line. It does the same job as Wireshark, with options typed instead of clicked.

**Notes:** Options matter. `-i` picks the interface, `-c` sets how many packets to capture, `-w` saves to a file, and `-v` adds detail. A wrong option or interface name gives the wrong output.

## Entry 4: Investigating a suspicious file hash (September 4, 2026)

| | |
|---|---|
| **Phase** | Detection and analysis |
| **Tool** | VirusTotal, which checks files, URLs, domains and IP addresses against what the security community has already reported |
| **Who** | Unknown attacker (sender of a phishing email) |
| **What** | An email with a malicious attachment, `bfsvc.exe`, SHA-256 `54e6ea47eb04634d3e87fd7787e2136ccfbcc80ade34f246a12cf93bab527f6b` |
| **Where** | An employee's computer (email sent to the HR mailbox) |
| **When** | Email sent July 20, 2022 at 9:30 a.m. The IDS flagged the file and alerted the SOC at 1:20 p.m. |
| **Why** | The employee could download and open a malicious attachment |

VirusTotal reported the hash as malicious. **Prevention:** security awareness training on attachments, and email filtering that blocks executable attachments.

## Reflections

**What was challenging?** The Linux exercises. I made typing mistakes: a wrong file name, `cd..` without a space, and `chmod 0-w` instead of `chmod o-w`. The shell's error message told me what was wrong each time, so I learned to read the error before retyping.

**Has my understanding of incident response changed?** Yes. I used to think it meant finding a problem and fixing it. Now I see it as a cycle: preparation, detection and analysis, containment, eradication and recovery, then a review afterwards. It depends on plans, people and tools working together.

**Which skill was the most useful?** Reading network traffic with Wireshark and tcpdump. Seeing the real packets made ideas like the TCP handshake and DNS lookups much easier to understand.
