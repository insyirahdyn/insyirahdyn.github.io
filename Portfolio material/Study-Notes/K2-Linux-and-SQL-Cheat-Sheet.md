# Linux and SQL Cheat Sheet

<p class="meta"><b>Course:</b> Tools of the Trade: Linux and SQL &nbsp;|&nbsp; <b>Type:</b> My study sheet &nbsp;|&nbsp; <b>Skills:</b> Linux, Bash, SQL</p>

## Linux (Bash)

### Navigate and read

| Command | What it does |
|---|---|
| `pwd` | Show where I am |
| `ls`, `ls -a`, `ls -l`, `ls -la` | List files. `-a` shows hidden files, `-l` shows details and permissions |
| `cd folder`, `cd ..`, `cd ~` | Go into a folder, up one level, or home |
| `cat file` | Print a file |
| `head file`, `tail file` | First or last 10 lines |
| `less file` | Page through a long file |

### Search and filter

| Command | What it does |
|---|---|
| `grep word file` | Show lines that contain a word |
| `grep word *` | Search every file in the folder |
| `find . -name "x.txt"` | Find a file by name (`-iname` ignores case) |
| `find . -mtime -1` | Files changed in the last day |
| `cmd1 \| cmd2` | **Pipe**: send the output of one command into another |

### Create, move, delete

| Command | What it does |
|---|---|
| `mkdir`, `rmdir` | Make or remove a directory |
| `touch file` | Create an empty file |
| `cp`, `mv`, `rm` | Copy, move or rename, and delete a file |
| `nano file` | Edit a file in the terminal |
| `echo text > file` | Write output into a file (`>>` adds to it) |

### Permissions and users

| Command | What it does |
|---|---|
| `chmod u+x file` | Change permissions. `u` user, `g` group, `o` other. `+` adds, `-` removes. `r` read, `w` write, `x` execute |
| `chown user file` | Change the owner |
| `sudo command` | Run a command with admin rights |
| `useradd`, `usermod`, `userdel` | Add, change and delete users. `usermod -a -G group user` adds a secondary group |
| `man command`, `apropos word`, `whatis command` | Get help |

**Reading `-rwxr-x---`:** first character is the type (`-` file, `d` directory). Then three sets of three: user, group, other.

## SQL

| Idea | Example |
|---|---|
| Choose columns and a table | `SELECT username, country FROM log_in_attempts;` |
| All columns | `SELECT * FROM employees;` |
| Filter rows | `WHERE department = 'Sales'` |
| Both must be true | `WHERE a = 1 AND b = 2` |
| Either can be true | `WHERE a = 1 OR b = 2` |
| Exclude | `WHERE NOT country = 'USA'` |
| Pattern match | `WHERE office LIKE 'East%'` (`%` is any characters, `_` is one character) |
| Range | `WHERE login_date BETWEEN '2022-05-08' AND '2022-05-09'` |
| Sort | `ORDER BY login_date` |
| Count | `SELECT COUNT(*) FROM log_in_attempts WHERE success = FALSE;` |

### Joins

A join combines two tables on a column they share.

| Join | Returns |
|---|---|
| `INNER JOIN` | Only rows that match in both tables |
| `LEFT JOIN` | All rows from the left table, plus matches from the right |
| `RIGHT JOIN` | All rows from the right table, plus matches from the left |
| `FULL OUTER JOIN` | All rows from both tables |

```sql
SELECT *
FROM employees
INNER JOIN machines ON employees.device_id = machines.device_id;
```
