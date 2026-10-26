# Phishing Incident Triage

<p class="meta"><b>Course:</b> Sound the Alarm: Detection and Response &nbsp;|&nbsp; <b>Type:</b> Practice scenario &nbsp;|&nbsp; <b>Tools:</b> Phishing response playbook, VirusTotal, alert ticket &nbsp;|&nbsp; <b>Skills:</b> Incident response, phishing analysis, threat detection</p>

## The scenario

::: scenario
I played a level-one SOC analyst. Alert ticket **A-2703** said an employee had opened an attachment from a suspicious email. I was given the email, the file hash, and a phishing playbook. My job: decide if the alert is a real threat, write my findings in the ticket, and set the ticket status.
:::

## Questions and my answers

::: q
**Question 1.** Is there anything in the email that shows it is not legitimate?
:::

::: a
Yes, four things:

- **The sender doesn't add up.** The display name is "Def Communications", the email is signed "Clyde West", and the address is `76tguyhh6tgftrt7tg.su`, which is a random string on a .su domain. None of the three match.
- **Spelling and grammar mistakes** in the subject and body ("Egnieer", "Ingergy", "writing for to express"). The company name is spelled wrong too.
- **The attachment is password protected and the password is in the email.** This stops email scanners from opening the file, so it is a common trick.
- **The file is `bfsvc.exe`.** A resume should be a PDF or Word file. An .exe is a program.
:::

::: q
**Question 2.** Is the attached file malicious?
:::

::: a
Yes. I took the SHA-256 hash of the attachment and searched it on VirusTotal:

`54e6ea47eb04634d3e87fd7787e2136ccfbcc80ade34f246a12cf93bab527f6b`

Many security vendors flag it as malicious, so it is a known bad file. One thing I noted for later: a hash is the easiest indicator for an attacker to change (one changed bit gives a new hash), so blocking the hash alone would not be enough.
:::

::: q
**Question 3.** What should the ticket status be?
:::

::: a
**Escalated.** The alert was only marked *Medium*, but the employee opened the attachment and the file is confirmed malicious, so the computer may already be compromised. A level-one analyst should not handle that alone.

What I asked the level-two analyst to do:

1. Isolate the employee's computer from the network.
2. Check for other activity from that computer and whether anyone else received the email.
3. Block the sender's domain and the file hash.
4. Remind HR staff not to open attachments from unknown senders.
:::

## Ticket summary

| Field | Value |
|---|---|
| Ticket ID | A-2703 |
| Alert | SERVER-MAIL: phishing attempt, possible download of malware |
| Original severity | Medium |
| Email sent | Wednesday, July 20, 2022, 09:30 |
| Attachment | `bfsvc.exe` (confirmed malicious) |
| Status | Open → **Escalated** |

## What I learned

- A playbook gives the order of steps, so I did not have to guess what to check first.
- The severity on an alert is a starting point. The evidence can change it.
- VirusTotal gives a fast answer on a hash, but the Pyramid of Pain shows why hashes are weak indicators and domains and attacker behaviour are harder to change.
