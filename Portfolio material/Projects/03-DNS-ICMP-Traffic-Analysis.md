# DNS and ICMP Traffic Analysis

<p class="meta"><b>Course:</b> Connect and Protect: Networks and Network Security &nbsp;|&nbsp; <b>Type:</b> Practice scenario &nbsp;|&nbsp; <b>Tools:</b> tcpdump log &nbsp;|&nbsp; <b>Skills:</b> Network analysis, DNS, ICMP, incident reporting</p>

## The scenario

::: scenario
Customers of a company's website (`yummyrecipesforme.com`) could not open it and saw the message "destination port unreachable". The IT team ran tcpdump while loading the page. I was given that log and asked to write what the problem is and what could have caused it.
:::

## The evidence

A short example of the pattern that repeats in the log:

```
13:24:32  IP 192.51.100.15.52444 > 203.0.113.2.domain: A? yummyrecipesforme.com.
13:24:36  IP 203.0.113.2 > 192.51.100.15: ICMP 203.0.113.2 udp port 53 unreachable
```

## Questions and my answers

::: q
**Part 1.** What problem does the DNS and ICMP log show?
:::

::: a
The browser sends a **UDP** request to the DNS server to find the IP address for `yummyrecipesforme.com` (the `A?` means "what is the address?"). The reply is an **ICMP error**: `udp port 53 unreachable`.

Port 53 is the **DNS** port. DNS turns a domain name into an IP address. The error means nothing is answering on port 53 at the DNS server, so the browser never gets an address and the website cannot load.
:::

::: q
**Part 2.** What happened, when, and what could be the cause?
:::

::: a
- **When:** around 1:24 p.m. (13:24). The same failed lookup repeats later in the log.
- **How the team found out:** several customers contacted the company about the "destination port unreachable" error.
- **What the IT team did:** they opened the site themselves and saw the same error, then captured DNS and ICMP traffic with tcpdump and read the log.
- **Key finding:** every DNS request is followed by an ICMP reply saying UDP port 53 is unreachable.
- **Likely cause:** the DNS service is down or blocked. It could be a denial of service attack on the DNS server, a misconfiguration, or a firewall rule blocking port 53.

**Next steps I would take:** check that the DNS service is running, check firewall rules for port 53, look at the server logs for signs of an attack, and switch to a backup DNS server so customers can reach the site while it is fixed.
:::

## What I learned

- An ICMP error message is useful evidence. It tells you which port and which protocol failed.
- Knowing common ports (DNS is 53) lets me read a log quickly.
- With only a log and no access to the server, I can say what is *likely*, not what is certain, so my answer lists causes and checks.
