# NIST CSF Incident Report: ICMP Flood

<p class="meta"><b>Course:</b> Connect and Protect: Networks and Network Security &nbsp;|&nbsp; <b>Type:</b> Practice scenario &nbsp;|&nbsp; <b>Tools:</b> NIST Cybersecurity Framework &nbsp;|&nbsp; <b>Skills:</b> NIST CSF, incident response, DDoS, network security</p>

## The scenario

::: scenario
A small multimedia company's internal network stopped responding for about two hours. The security team found that a flood of incoming **ICMP** packets was overloading the network, and that the attacker got in through an unconfigured firewall. They blocked the attack and shut down non-critical services so the critical ones could come back. The scenario also listed the fixes the team put in place: a firewall rate limit for ICMP, source IP verification, and network monitoring software. I was asked to write an incident report using the five functions of the **NIST Cybersecurity Framework**, sorting the events and fixes into the right function.
:::

## My report

::: q
**Summary.** What happened?
:::

::: a
The internal network stopped responding because of a DDoS attack. The attacker flooded the network with ICMP packets. The team blocked the attack and stopped non-critical services so critical services could be restored.
:::

::: q
**Identify.** What was attacked, and what needs protecting?
:::

::: a
An attacker or group used an ICMP flood against the company. The whole internal network was affected. All critical network resources had to be secured and brought back.
:::

::: q
**Protect.** What was put in place to prevent it from happening again?
:::

::: a
A new firewall rule that limits how many ICMP packets can come in, and an IDS/IPS that filters some ICMP traffic based on suspicious features.
:::

::: q
**Detect.** How will the team spot it next time?
:::

::: a
Source IP address verification on the firewall, to catch spoofed addresses in incoming ICMP packets, and network monitoring software to spot unusual traffic patterns.
:::

::: q
**Respond.** What will the team do during a future event?
:::

::: a
Isolate affected systems so the problem does not spread, restore critical systems and services, check the network logs for anything suspicious, and report to management and to the authorities where required.
:::

::: q
**Recover.** How does the company get back to normal?
:::

::: a
Block outside ICMP floods at the firewall, stop non-critical services to cut internal traffic, restore critical services first, and bring the non-critical systems back after the flood of packets has stopped.
:::

## What I learned

- The five NIST functions give a clear order for an incident report: identify, protect, detect, respond, recover.
- The fixes here were a firewall rule and IP address verification. A single missing control can let an attack take the whole network down.
- Regular checks of firewall rules and ongoing monitoring help catch these gaps before an attacker does.
