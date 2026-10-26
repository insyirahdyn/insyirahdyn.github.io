# SIEM Search Cheat Sheet: Splunk and Google SecOps (Chronicle)

<p class="meta"><b>Course:</b> Sound the Alarm: Detection and Response &nbsp;|&nbsp; <b>Type:</b> My study sheet &nbsp;|&nbsp; <b>Tools:</b> Splunk, Google SecOps (Chronicle) &nbsp;|&nbsp; <b>Skills:</b> SIEM, log analysis, threat detection</p>

A **SIEM** (security information and event management) tool collects log data from many sources, normalizes it so it all looks the same, and lets an analyst search it. A SOC analyst uses it to find things like failed logins. Different companies use different tools, so I practised the main ideas in two of them.

## Splunk (Search Processing Language, SPL)

| I want to... | Search | How it works |
|---|---|---|
| Find events with a word in them | `index=main fail` | `index=main` picks the index (where Splunk stores events). `fail` is the search term. |
| Chart results by device | `index=main fail \| chart count by host` | The pipe `\|` sends the results of the first part into the next command. `chart count by host` counts matching events per host, so I can spot a device with a lot of failures. |
| Match similar words | `index=main fail*` | `*` is a wildcard. It matches `fail`, `failed`, `failure` and so on. |
| Match an exact phrase | `index=main "login failure"` | Double quotes match the exact phrase only. |

**Pipes work like in Linux.** In Bash a pipe sends the output of one command into another. SPL uses the same idea to chain commands.

## Google SecOps (Chronicle)

There are two types of search:

| | UDM Search | Raw Log Search |
|---|---|---|
| Searches | Data that was already parsed and normalized into the Unified Data Model | The raw, unparsed logs |
| Speed | Faster | Slower |
| Use it when | You know which UDM field to filter on | You cannot find it in the normalized data, or you want to search a username, file name or hash directly |
| Extra | Uses fields like `metadata.event_type` | Supports **regular expressions** to match patterns |

Example UDM search for user logins:

```
metadata.event_type = "USER_LOGIN"
```

**Parts of a UDM event:**

- **Entities (the "nouns"):** the device, user or process involved, such as hostname, username and IP address.
- **Event metadata:** what type of event it is, and when it happened.
- **Network metadata:** protocol and other network details.
- **Security results:** the outcome, for example "virus detected and quarantined".

## How I would look for failed logins

1. Search the logs for the word `fail*` (Splunk) or filter on the login event type (Chronicle).
2. Count by host or by user to see who has the most failures.
3. Look at the times. Many failures in a short window can mean a brute force attempt.
4. Note the source IP addresses and check them against known bad ones.
