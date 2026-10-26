# SYN Flood Attack Analysis

<p class="meta"><b>Course:</b> Connect and Protect: Networks and Network Security &nbsp;|&nbsp; <b>Type:</b> Practice scenario &nbsp;|&nbsp; <b>Tools:</b> Wireshark capture log &nbsp;|&nbsp; <b>Skills:</b> Network security, TCP/IP, threat detection, incident reporting</p>

## The scenario

::: scenario
Visitors to a company's website saw a "connection timeout" error. I was given a Wireshark capture of the traffic going to the web server (`192.0.2.1`, port 443) and asked to write a short incident report: what type of attack is happening, and how it makes the website stop working.
:::

## Questions and my answers

::: q
**Section 1.** What type of attack could have caused this network interruption?
:::

::: a
A **SYN flood**, which is a type of denial of service (DoS) attack.

This is what I saw in the capture (174 packets):

| What I checked | What I found |
|---|---|
| Who sent the most packets | `203.0.113.0` sent 140 of the 174 packets |
| How fast | About 48 seconds, from 3.4 s to 51.8 s into the capture |
| Type of packets | Almost all were SYN packets to port 443 |
| Normal visitors (`198.51.100.5`, `.14`, `.16`, `.23`) | Their connections worked at first, then the server started answering them with `[RST, ACK]`, and they got an HTTP 504 Gateway Time-out |
:::

::: q
**Section 2.** How does the attack make the website stop working?
:::

::: a
A normal TCP connection starts with a three-way handshake:

1. **SYN:** the visitor's computer asks the server to open a connection.
2. **SYN-ACK:** the server agrees and sets aside resources for the connection.
3. **ACK:** the visitor confirms and the connection opens.

In a SYN flood the attacker sends a huge number of SYN packets and never sends the final ACK. The server keeps answering each one and holding resources for connections that never finish. After enough of these, the server has nothing left for real visitors. Their requests get reset or time out, which is the error people saw.
:::

## What I would do next

- Block `203.0.113.0` at the firewall.
- Turn on SYN flood protection on the server (SYN cookies, rate limiting).
- Set up monitoring that alerts when SYN traffic suddenly jumps.

## What I learned

- Reading a packet log is mostly about counting: who sent the most, how often, and what type of packet.
- The handshake is the key to this attack. Once I understood the three steps, it was clear which step the attacker was skipping.
