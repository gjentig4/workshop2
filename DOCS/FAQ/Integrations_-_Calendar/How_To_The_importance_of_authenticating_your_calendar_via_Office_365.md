---
title: "How To: The importance of authenticating your calendar via Office 365"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25693669621137-How-To-The-importance-of-authenticating-your-calendar-via-Office-365"
locale: "en-150"
created_at: "2024-06-06T08:40:32Z"
updated_at: "2025-05-04T14:12:51Z"
category: "FAQ"
section: "Integrations - Calendar"
---

# How To: The importance of authenticating your calendar via Office 365

![](https://support.focus.teamleader.eu/hc/article_attachments/25693685871889)

**Note**: Connecting via the Office 365 platform can only be done if you use the default outlook.office365.com server, not if you use your own, remote server.

**Note**: if you already have a working Office 365 Calendar integration, you don't have to remove and reinstall the integration. It suffices to click the 'Connect via Office 365' button and follow the flow; your integration will keep working.

## Why do we support authenticating via Office 365?

Microsoft made MFA mandatory for all their tenants from **June 2021 **onwards. This implies that our old way of connecting your Office 365 / Exchange calendar (via email and password) needs an upgrade as well. If you don’t make the switch to connecting via the Office platform, your calendar will stop working as soon as MFA is enabled for your Office 365 account.

The main reasons why it’s important to authenticate via your Office 365 account:

- 
It’s safer

No app-specific passwords, no whitelisting IP’s, no turning off security defaults,...

- 
It’s easier

A password / security default change in office won’t stop the integration from working

- 
An IP address change on our side won’t stop the integration from working 

## How to switch to the new authentication?

- Go to the settings of your Office 365 / Exchange calendar integration in the Marketplace.
![](https://support.focus.teamleader.eu/hc/article_attachments/27925076624529) 

- You’ll notice a new button: “**Connect via Office 365**”. This button will redirect you to the Office platform, where you can log in using your own security defaults.![](https://support.focus.teamleader.eu/hc/article_attachments/27925076623121) 

- After successfully logging in, you’ll be redirected to the Teamleader Focus Marketplace again and you’ll be able to adjust the settings of your integration. 

- Re-authenticating doesn’t remove and reinstall the integration; it simply ‘renews’ your existing authentication.