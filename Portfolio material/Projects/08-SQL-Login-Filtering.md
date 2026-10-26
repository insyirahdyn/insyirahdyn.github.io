# SQL Login Filtering

<p class="meta"><b>Course:</b> Tools of the Trade: Linux and SQL &nbsp;|&nbsp; <b>Type:</b> Practice scenario &nbsp;|&nbsp; <b>Tools:</b> SQL (MariaDB) &nbsp;|&nbsp; <b>Skills:</b> SQL, log analysis, filtering with WHERE, AND, OR, NOT, LIKE</p>

## The task

::: scenario
I worked as a security analyst at an organization that wants to make its systems safer. I had two tables:

- **`log_in_attempts`**: `event_id`, `username`, `login_date`, `login_time`, `country`, `ip_address`, `success`
- **`employees`**: `employee_id`, `device_id`, `username`, `department`, `office`

I had to write SQL queries to investigate suspicious logins and to find the employees whose computers need a security update.
:::

## Part 1: Investigating logins

::: q
**1.** A possible incident happened after business hours. Find all failed login attempts after 18:00.
:::

::: a
```sql
SELECT *
FROM log_in_attempts
WHERE login_time > '18:00' AND success = FALSE;
```
`AND` means both conditions must be true: the time is after 18:00 **and** the login failed.
:::

::: q
**2.** Something suspicious happened on 2022-05-09. Find the login activity on that day and the day before.
:::

::: a
```sql
SELECT *
FROM log_in_attempts
WHERE login_date = '2022-05-09' OR login_date = '2022-05-08';
```
`OR` returns a row if it matches either date. `AND` would return nothing, because a login cannot happen on two dates.
:::

::: q
**3.** Find the login attempts that did not come from Mexico.
:::

::: a
```sql
SELECT *
FROM log_in_attempts
WHERE NOT country LIKE 'MEX%';
```
The data stores Mexico as both `MEX` and `MEXICO`. `LIKE 'MEX%'` matches both because `%` stands for any characters after `MEX`. `NOT` then leaves out those rows.
:::

## Part 2: Finding employee machines to update

::: q
**4.** Find employees in the Marketing department who work in the East building.
:::

::: a
```sql
SELECT *
FROM employees
WHERE department = 'Marketing' AND office LIKE 'East%';
```
The `office` column holds the building and a number (for example `East-170`), so `LIKE 'East%'` finds every East office.
:::

::: q
**5.** Find employees in Finance or Sales.
:::

::: a
```sql
SELECT *
FROM employees
WHERE department = 'Finance' OR department = 'Sales';
```
An employee is in one department only, so I used `OR`. `AND` would return nothing.
:::

::: q
**6.** Find all employees who are not in Information Technology.
:::

::: a
```sql
SELECT *
FROM employees
WHERE NOT department = 'Information Technology';
```
:::

## What I learned

- `AND` narrows results, `OR` widens them, and `NOT` removes a group. Choosing the wrong one gives an empty result or too many rows.
- `LIKE` with `%` helps when the data is not stored in one clean format.
- Filtering a big log down to the rows that matter is a core analyst skill.
