---
title: "IMAP deprecation in O365"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25693951709201-IMAP-deprecation-in-O365"
locale: "en-150"
created_at: "2024-06-06T08:49:55Z"
updated_at: "2025-04-30T15:22:12Z"
category: "FAQ"
section: "Integrations - Email tracking"
---

# IMAP deprecation in O365

Are you using our IMAP integration with the server outlook.office.365? Then you will probably receive the error **'AUTHENTICATE FAILED'**. Read all about what it means here.

 

This error message means that your Exchange environment has switched to Modern Authentication.

 

In recent months, Microsoft has begun communicating that it will permanently **disable Basic Authentication in all accounts as of 1 October 2022**. However, it is possible for an Exchange environment to already switch to Modern Authentication for all its users. You can read more about it [here](https://techcommunity.microsoft.com/t5/exchange-team-blog/basic-authentication-deprecation-in-exchange-online-may-2022/ba-p/3301866).

 

As IMAP is one of the protocols (functionalities) that relies on Basic Authentication, it is not possible anymore to use this protocol as an Exchange user, anywhere. That also goes for the IMAP integration in Teamleader Focus.

 

As Exchange will simply not provide Modern Authentication for the IMAP functionality, there is nothing we can change in our integration to achieve this again.

 

We therefore advise you to use the [Office 365 Add-In](https://support.focus.teamleader.eu/hc/en-150/articles/25692192595729-How-To-How-do-I-install-the-Outlook-email-add-in), which ties to your Office 365 account and runs on Modern Authentication. It is also still possible to use [manual BCC tracking](https://support.focus.teamleader.eu/hc/en-150/articles/25692591287697-How-To-Tracking-emails-to-Teamleader-Focus) which is similar to IMAP.

 

We hope this provides you with sufficient context.