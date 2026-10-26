# Python Allow-List Updater

<p class="meta"><b>Course:</b> Automate Cybersecurity Tasks with Python &nbsp;|&nbsp; <b>Type:</b> Practice scenario &nbsp;|&nbsp; <b>Tools:</b> Python 3 &nbsp;|&nbsp; <b>Skills:</b> Python, file handling, loops, conditionals, automation</p>

## The task

::: scenario
At an organization, access to restricted content is controlled by an **allow list** of IP addresses saved in `allow_list.txt`. A separate **remove list** has the IP addresses that should lose access. Doing this by hand is slow and easy to get wrong, so I wrote a Python script that removes every address on the remove list from the file.
:::

## The code

```python
# The file that holds the allow list
import_file = "allow_list.txt"

# IP addresses that should lose access
remove_list = ["192.168.97.225", "192.168.158.170", "192.168.201.40", "192.168.58.57"]

# Read the allow list into a string
with open(import_file, "r") as file:
    ip_addresses = file.read()

# Turn the string into a list so single addresses can be removed
ip_addresses = ip_addresses.split()

# Remove each address on the remove list, only if it is in the allow list
for element in remove_list:
    if element in ip_addresses:
        ip_addresses.remove(element)

# Turn the list back into a string, one address per line
ip_addresses = "\n".join(ip_addresses)

# Write the new allow list over the old file
with open(import_file, "w") as file:
    file.write(ip_addresses)
```

## How it works

::: q
**Step 1.** Open the file and read it.
:::

::: a
`open(import_file, "r")` opens the file in read mode. I used `with` so Python closes the file automatically when the block ends. `.read()` puts the whole file into one string.
:::

::: q
**Step 2.** Why convert the string into a list?
:::

::: a
`.remove()` only works on a list, and the file is just text. `.split()` cuts the string at each space or new line, so every IP address becomes one item in the list.
:::

::: q
**Step 3.** Loop through the remove list and delete matches.
:::

::: a
The `for` loop takes one address at a time from `remove_list`. The `if element in ip_addresses` check matters, because `.remove()` gives an error if the item is not in the list. The allow list has no duplicates, so one `.remove()` per address is enough.
:::

::: q
**Step 4.** Save the result.
:::

::: a
A file can only be written with a string, so `"\n".join(...)` turns the list back into text with one address per line. I opened the file again in write mode (`"w"`), which replaces the old content with the new list.
:::

## What I learned

- Most file work in Python follows the same pattern: open, read, change, write back.
- Checking `if element in list` before `.remove()` avoids a crash.
- Even a short script like this saves time and cuts down on human mistakes.
