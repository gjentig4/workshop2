---
title: "FAQ: Can I change the layout of my meeting and invite emails?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25694963991185-FAQ-Can-I-change-the-layout-of-my-meeting-and-invite-emails"
locale: "en-150"
created_at: "2024-06-06T09:16:35Z"
updated_at: "2025-05-04T13:19:03Z"
category: "FAQ"
section: "Dashboard"
---

# FAQ: Can I change the layout of my meeting and invite emails?

![](https://support.focus.teamleader.eu/hc/article_attachments/25694962614929)

The Lead capture Booster offers customizing options for meeting rooms and scheduling. To customize the layout of your emails, you will need to write custom HTML code that will be used as a template for all your emails. The Lead capture Booster provides a preview so you can check whether the layout shows well.

# Which emails will have the custom layout?

The custom layout will show in the following emails:

**Scheduling:**

- Confirmation email

- Reminder email

- Cancellation email

**Meeting rooms:**

- Meeting room invite email

# How to add the HTML code in the customization settings?

## Add the HTML code

We recommend writing the HTML code and then copy/paste it in the customization box.

To add it in the Lead capture Booster settings, follow these steps:

- Go to Settings > [Customization](https://meeting.teamleader.eu/team/customization/)

- Scroll down until you see 'Advanced branding'

- Paste the HTML code into the 'Custom email HTML template' box

- Click on 'Send me a preview mail' to see if the layout shows well. The mail will be sent to the email address of the logged-in user.

- Hit **Save** if the layout is ready

- Test the template with several e-mail clients (Google, Outlook, ..)

## Requirements

The HTML template must contain **a body and the {content}** **tag**. This tag will be replaced with the email content when an email is sent to your clients.

If the body or the {content} tag is not present, you won't be able to save the page and see an error message.

![](https://support.focus.teamleader.eu/hc/article_attachments/25694962661265)

## Important remarks

- The HTML template is **not** **validated by Teamleader Focus.** Make sure to test the template by sending a preview email to yourself before saving the page.

- When the preview looks good, we recommend testing it with several email clients as results might differ depending on the email client (e.g. you can book a test meeting with yourself).

# Default layout vs custom layout

By default, all emails sent by the Lead capture Booster look similar. Below you can find an example of the confirmation mail that a host receives when a guest books a meeting:

![](https://support.focus.teamleader.eu/hc/article_attachments/25694962716049)

Customizing the email template can give a very different result, for example:

![](https://support.focus.teamleader.eu/hc/article_attachments/25694978131985)