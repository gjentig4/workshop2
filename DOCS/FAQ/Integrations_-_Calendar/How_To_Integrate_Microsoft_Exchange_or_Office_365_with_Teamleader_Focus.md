---
title: "How To: Integrate Microsoft Exchange or Office 365 with Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25690974588305-How-To-Integrate-Microsoft-Exchange-or-Office-365-with-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:16:17Z"
updated_at: "2025-08-05T14:07:06Z"
category: "FAQ"
section: "Integrations - Calendar"
---

# How To: Integrate Microsoft Exchange or Office 365 with Teamleader Focus

![](https://support.focus.teamleader.eu/hc/article_attachments/25690960322321)

 

The next agenda integration we offer is with Microsoft Exchange/Office 365. This integration only works for Exchange servers version 2010 or higher. To make the integration, follow these steps:

- Go to your **user ****icon **in the top right-hand corner > **Integrations/Marketplace** > look for ‘Exchange Calendar’ or ‘Office 365 Calendar’.

- Once you have selected this integration, click "**ADD"**** **to grant the requested access.

- If you use the default server "outlook.office365.com", click "**Connect via Office 365**". If you use a remote server, click "**Connect via own serve**r". 

- If you use the default server, you will be redirected to outlook.office365.com, where you can proceed with the login. If you use a remote server, you can enter the server name and login credentials. If MFA is set up, you need to create an app-specific password.

*Note*: if you already have an active Office 365 Calendar integration authenticated via username and password and you use the default outlook.office365.com server, make sure to make the switch to [authentication via the Office 365 platform](https://support.focus.teamleader.eu/hc/en-150/articles/25693669621137-How-To-The-importance-of-authenticating-your-calendar-via-Office-365).

 

- Once your connection is successful, you will be able to enable the synchronisation with your Exchange Agenda or [Contacts](https://support.focus.teamleader.eu/hc/en-150/articles/25690975185169-FAQ-How-can-I-export-my-Teamleader-Focus-contacts-to-Outlook).

 

If you enable the **agenda synchronisation**, you can select :

- one agenda to which you want to synchronise the meetings from Teamleader Focus

- multiple agendas from which you want to import calendar items

- to push tasks and calls from your Teamleader Focus agenda to your personal agenda

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25690946452753)

 

Remarks

- If your Office licence doesn't include a server, you will receive the error message "*Connecting to Office 365 failed. Your Office 365 license should include an Exchange server in order to install this integration*". Note that the Exchange server needed for the calendar synchronisation is not available for Office 365 Personal or Office 365 Home accounts. 

- It's possible that the admin of your Office 365 account still needs to grant access to connect with Teamleader Focus. You can find information on how to do that [here](https://docs.microsoft.com/en-gb/azure/active-directory/manage-apps/configure-user-consent?tabs=azure-portal#configure-risk-based-step-up-consent). Another option is to ask your Office 365 admin to connect their calendar first; their authentication will automatically add Teamleader Focus to the trusted apps of the entire Office 365 account.

- Naturally we respect your privacy and therefore calendar items which are imported from your Exchange Calendar appear as [grey blocks](https://support.focus.teamleader.eu/hc/en-150/articles/25691415928721-FAQ-Why-do-I-only-see-grey-blocks-in-the-agenda-of-my-colleague) in your Teamleader Focus agenda. If you do want to make these visible to other users in Teamleader Focus, then you can click on them and select whether to convert the meeting into a visible task or meeting.

- Because the link works in both directions, adjustments in your Teamleader Focus or Exchange agenda will always be synchronized. The synchronization runs in the background every half an hour. However, for good measure, we recommend you start the sync manually when it is the first time you make the connection. You can do this by going to Agenda and clicking on the synchronisation symbol on the right.
![](https://support.focus.teamleader.eu/hc/article_attachments/25690933561105) 

- There's also the possibility to limit access to a user's calendar. Read all about it [here](https://support.focus.teamleader.eu/hc/en-150/articles/25691555792401-FAQ-Why-can-t-I-see-the-calendar-of-my-colleagues).

- In the [Lead capture Booster](https://support.focus.teamleader.eu/hc/en-150/articles/25694859794577-How-To-Activate-and-use-the-Lead-capture-Booster), you can integrate your Exchange calendar as well and let customers schedule meetings directly into your calendar. Read all about it [here](https://support.focus.teamleader.eu/hc/en-150/articles/25694330548881-How-To-Connect-your-Office-365-Outlook-calendar-with-the-Lead-capture-Booster).

- Calendar events from your external calendar will only be synced to Teamleader Focus starting from the date you set up your calendar integration. Historical/past data is not synced e.g. meetings from last month.

- Calendar events from your external calendar that span multiple days or are recurring events cannot be converted to meetings or tasks.