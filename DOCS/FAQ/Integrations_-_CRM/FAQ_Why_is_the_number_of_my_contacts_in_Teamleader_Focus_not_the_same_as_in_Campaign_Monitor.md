---
title: "FAQ: Why is the number of my contacts in Teamleader Focus not the same as in Campaign Monitor?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25690786914065-FAQ-Why-is-the-number-of-my-contacts-in-Teamleader-Focus-not-the-same-as-in-Campaign-Monitor"
locale: "en-150"
created_at: "2024-06-06T07:09:40Z"
updated_at: "2025-05-04T14:10:45Z"
category: "FAQ"
section: "Integrations - CRM"
---

# FAQ: Why is the number of my contacts in Teamleader Focus not the same as in Campaign Monitor?

![A graphic banner featuring the text 'FAQ' with a magnifying glass and a document icon.](https://support.focus.teamleader.eu/hc/article_attachments/25690748323089)

It is possible that the segment you’ve  created in Teamleader Focus isn’t exactly the same as the segment in Campaign Monitor. The reason for this is that Campaign Monitor uses different criteria that may cause some differences:

## More contacts in Teamleader Focus than in Campaign Monitor

- Only contacts with an email address will be exported. Contacts in your Teamleader Focus segment without an email address will not appear in Campaign Monitor.

- The email address is a unique key. If an email address appears multiple times in Teamleader Focus, Campaign Monitor will only use this once.

- Recipients can always unsubscribe from your campaigns. They will be excluded from the CM segment, but will remain in your Teamleader Focus segment.

- The same goes for bounced email addresses. When a recipient cannot be reached (this can happen for multiple reasons), the address will also be excluded from CM, but not in Teamleader Focus.

## More contacts in Campaign Monitor than in Teamleader

The number of email addresses can also be higher in Campaign Monitor than the contacts listed in your Teamleader Focus segment. This can happen when you have a custom field to enter a second email address in Teamleader Focus. Campaign Monitor will recognize each of these email addresses as a unique key.