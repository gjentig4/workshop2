---
title: "FAQ: How can I make phases mutually dependent?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691937254417-FAQ-How-can-I-make-phases-mutually-dependent"
locale: "en-150"
created_at: "2024-06-06T07:49:37Z"
updated_at: "2026-01-13T12:18:13Z"
category: "FAQ"
section: "Old projects"
---

# FAQ: How can I make phases mutually dependent?

![](https://support.focus.teamleader.eu/hc/article_attachments/25691921995537)

 

Whenever you add a second (or third, ...) phase to a project, you'll have the option to link the new phase to already existing phases.

 

- Navigate to your project. You'll see the [work breakdown](https://support.focus.prd.teamleader.eu/hc/en-us/articles/25697800978065) page. 

- Click on **Add phase **to add a new phase

- Fill out the necessary information such as the phase title and the responsible user.

- Click on **+ Dependency **and select one of your existing phases

![](https://support.focus.teamleader.eu/hc/article_attachments/25691922036369)

 

## Apply to tasks and dependencies

If you afterwards move the due date of a phase that is linked to another phase, you'll have the option to apply this change to tasks and dependencies as well:

![](https://support.focus.teamleader.eu/hc/article_attachments/25691922088081)
 

### Enabling the toggle

Imagine the due date of your first phase was on the 24th of May, but you decide to postpone this date to a week later on the 31st of May. The due date of the dependent second phase was originally one week later than the due date of the first phase. When changing the due date of the first phase, the due date of the dependent phase (and tasks) **will move too with the exact same amount of days** and will now still be one week after the due date of the first phase.

 

Not only the due date is affected; changing the due date of a parent phase (a phase with underlying phases) will also change the **start date of the underlying phases.**

 

*Note: Dates of meetings will not be moved automatically !*

 

### Disabling the toggle

Imagine that you change the due date of your first phase to a date later than the due date of your second phase, and you don't decide to enable the toggle to apply this change to tasks and dependencies.
Changing the due date of your first phase will be possible, but you'll receive the following error message:
*"This due date is later than the due date of **Phase ****2 **(xx/xx/xxxx). This breaks its dependency on this phase."*

There will also be exclamation marks next to the due dates of your phases to denote these conflicting dates.