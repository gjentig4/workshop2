---
title: "FAQ: Why is the number of my contacts in Teamleader Focus not the same as in MailChimp?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25690762914065-FAQ-Why-is-the-number-of-my-contacts-in-Teamleader-Focus-not-the-same-as-in-MailChimp"
locale: "en-150"
created_at: "2024-06-06T07:09:34Z"
updated_at: "2025-05-04T14:10:45Z"
category: "FAQ"
section: "Integrations - CRM"
---

# FAQ: Why is the number of my contacts in Teamleader Focus not the same as in MailChimp?

![A graphic banner featuring the text 'FAQ' with a magnifying glass and a document icon.](https://support.focus.teamleader.eu/hc/article_attachments/25690748323089)

 

The number of contacts or companies in a Teamleader Focus segment might differ slightly from the segment in MailChimp. This due to the criteria that MailChimp maintains:

## More contacts in Teamleader Focus than in Mailchimp

- Only contacts or companies that have an email address will be synchronised. Contacts or companies without an email address will not appear in MailChimp.

- The email address is a unique key. If an email address appears multiple times in Teamleader Focus, it will only be used once by MailChimp. 

Even if an email address is the same for the company as well as the related contact, you will only find it at the company in MailChimp.

- When you have added the same email address for multiple contacts and **activated the opt-in for all of them**, Teamleader Focus will only sync the contact for which you first activated the opt-in. 

- When you have added the same email address for multiple companies and **activated the opt-in for all of them**, Teamleader Focus will only sync the company for which you first activated the opt-in.

- People always have the option to unsubscribe from your emails. These people will be removed from the MailChimp segment, but will remain in Teamleader Focus.

- The same rule applies for so called ‘bounced’ email addresses. If an email address cannot be reached (this can be because of [different reasons](http://kb.mailchimp.com/delivery/deliverability-research/soft-vs-hard-bounces)), it will be removed from the segment in MailChimp, but it will stay in Teamleader Focus.

- Bounced emails are managed by MailChimp, Teamleader Focus only takes over the message. Want to know why an email bounced? Take a look at your MailChimp account

- MailChimp limits the number of “Groups” to 60. This means that only 60 Teamleader Focus segments can be synchronized. If you have more, check off the “synchronize to MailChimp” checkbox when creating/editing your segments.

## More contacts in Mailchimp than in Teamleader Focus

The number of contacts or companies can also be higher in MailChimp than in Teamleader Focus. This is probably because you have a custom field that allows you to add multiple email addresses to one contact. Because an email address is a unique key in MailChimp, the segment will have a higher number than your Teamleader Focus segment.

 

Note:

- If you delete an entry in Mailchimp and not in Teamleader Focus, Teamleader Focus will create this contact again via the next sync.

- If you delete an entry in Teamleader Focus and not in Mailchimp, Teamleader Focus will delete this contact in Mailchimp during the next sync.