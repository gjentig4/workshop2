---
title: "FAQ: My domain verification is pending or invalid, what could be wrong?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25695210286481-FAQ-My-domain-verification-is-pending-or-invalid-what-could-be-wrong"
locale: "en-150"
created_at: "2024-06-06T09:23:15Z"
updated_at: "2025-05-04T13:54:11Z"
category: "FAQ"
section: "Settings"
---

# FAQ: My domain verification is pending or invalid, what could be wrong?

![A graphic banner featuring the text 'FAQ' with a magnifying glass and a document icon.](https://support.focus.teamleader.eu/hc/article_attachments/25690748323089)

 

If you ended up on this article, you probably tried to validate your email domain in Teamleader Focus, but without success. That’s why we’re providing you with a troubleshooting guide to tackle whatever issue is at play.

 

If your CNAME records show a ‘Verification failed’ or 'Pending' state, please check the following common causes.

![Warning message stating 'Some records are not matching' during email domain setup.](https://support.focus.teamleader.eu/hc/article_attachments/25695177438609)
 

## 1. Did you add the CNAMEs to the DNS settings of your domain provider?

If not, [here’s a guide](https://support.focus.teamleader.eu/hc/en-150/articles/25692624924561-How-To-Setting-your-custom-domain-for-sending-emails-from-Teamleader-Focus) on how to add those records.

 

**Tip: **if you have to ask your provider or IT responsible to do this, you can use the functionality that copies all CNAME records at once. This way, you can avoid typos in a later stage:

 

![Table showing CNAME DNS records for email domain verification with a 'Copy all' button.](https://support.focus.teamleader.eu/hc/article_attachments/25695181557009)

 

## 2. Did you wait long enough for the CNAMEs to be validated?

Note that it can take up to **48 hours** for the CNAMEs to be registered publicly.

 

## 3. Is there perhaps a typo in one of the CNAME records that was added to your domain?

 

In order to avoid this, we highly recommend copy pasting the CNAME name(s) and value(s).

![Table showing CNAME DNS records for domain verification with copy buttons.](https://support.focus.teamleader.eu/hc/article_attachments/25695195306001)

 

## 4. Does your domain provider automatically add your domain name to the CNAME record? 

 

Some hosting providers automatically add your domain name to any CNAME record you enter. If this is the case, your CNAME will contain your domain name twice, for example: *"subdomain.teamleader.eu.teamleader.eu"*.

To avoid this from happening, only add the first part of the CNAME name in the 'name' or 'alias' field of the CNAME record.

![Table showing CNAME record names for email domain verification in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25695177668241)

 

 

*Pro-tip: check your CNAMEs yourself*

As CNAMEs are registered **publicly**, you can verify whether you have added them correctly by using MXToolbox, more specifically their CNAME lookup: [https://mxtoolbox.com/CNAMELookup.aspx](https://mxtoolbox.com/CNAMELookup.aspx). 

 

You simply paste (one of) the 3 CNAMEs in the search bar, and you will immediately see whether they are (already) registered publicly.

 

**“DNS record Found” = OK**

 

![A table showing a successful DNS record verification test in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25695208359313)

 

**“DNS record not found” = there is still an issue or you have not completed the 48 hours waiting time.**
** **

If the CNAME cannot be found publicly, your domain cannot be verified by Teamleader Focus either.

 

![A table row showing a failed DNS record test result in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25695181781905)

 

*Note*: Did you check all the guidelines mentioned above but you still have one or multiple CNAMEs with a failed verification state? Please [reach out to us ](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065)and send us a screenshot of the CNAMEs added to your domain's DNS settings; we'll be happy to help!