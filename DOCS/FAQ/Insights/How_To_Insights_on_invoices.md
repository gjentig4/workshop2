---
title: "How To: Insights on invoices"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25697840851857-How-To-Insights-on-invoices"
locale: "en-150"
created_at: "2024-06-06T10:39:37Z"
updated_at: "2025-10-16T14:56:49Z"
category: "FAQ"
section: "Insights"
---

# How To: Insights on invoices

![](https://support.focus.teamleader.eu/hc/article_attachments/25697839545745)

In this article we want to tell you something more about the insights on invoices and how the values are calculated exactly. We’ll talk about the calculations in ‘Total revenue excl. VAT’ versus the Paid - Not yet paid - Overdue bar.

![](https://support.focus.teamleader.eu/hc/article_attachments/25697826348817)

## General

When you navigate to **Insights **> **Invoices **you’ll find the overview above. In the top right-hand corner you can define the period of which you want to see some invoice statistics. It’s also possible to filter on certain customers by clicking on the ‘Customer’ button in grey. 

The quick stats on the right show you the total revenue (excl. VAT and incl. VAT) of the active period and for a certain customer or all customers.

## Total revenue excl. VAT

The total revenue excl. VAT is calculated this way:

**Total revenue excl. VAT = [sum of all booked invoices in this period] - [sum of all credit notes in this period]**

- The total revenue excl. VAT is the total of all your booked invoices in the selected period. Draft invoices are not included in this sum.

- 
! Important to know is that the sum of the total revenue excl. VAT has been reduced with the sum of the credit notes in the selected period.

The credit notes don’t necessarily need to be linked to the invoices in that period

- This is why the amount of total revenue excl. VAT could differ from the total amount of your paid + unpaid + overdue invoices.

## Paid

The paid value symbolized by the green colour in the bar is calculated this way:

**Paid = [sum of all paid invoices in this period] - [credited amount linked to these invoices] **

- You could also check this amount by creating a segment on invoice level for this period and adding the rule ‘Paid equals yes’.

- The amount shown is excl. VAT

## Unpaid

The not yet paid value symbolized by the blue colour in the bar is calculated this way:

**Not yet paid = [sum of all unpaid invoices in this period] - [sum of the overdue invoices] - [credited amount linked to these invoices]**

- You could also check this amount by creating a segment on invoice level for this period and adding the following rules:![](https://support.focus.teamleader.eu/hc/article_attachments/25697856240273)

- The amount shown is excl. VAT

## Overdue

The overdue value symbolized by the red colour in the bar is calculated this way:

**Overdue = sum of all overdue invoices in this period**

- You could also check this amount by creating a segment on invoice level for this period and adding the following rules:![](https://support.focus.teamleader.eu/hc/article_attachments/25697826450833)

- The amount shown is excl. VAT