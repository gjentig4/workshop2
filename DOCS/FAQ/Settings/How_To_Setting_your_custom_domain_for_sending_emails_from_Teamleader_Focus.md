---
title: "How To: Setting your custom domain for sending emails from Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692624924561-How-To-Setting-your-custom-domain-for-sending-emails-from-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T08:08:42Z"
updated_at: "2026-01-05T10:21:10Z"
category: "FAQ"
section: "Settings"
---

# How To: Setting your custom domain for sending emails from Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Sending an email from within Teamleader Focus is quick and easy, even if it’s only an invoice or a meeting confirmation. All of these emails will be sent from Teamleader Focus’ email server, resulting in the sender being “[email@teamleader.be](mailto:email@teamleader.be)”. Whenever your customers reply to an email that was sent from within Teamleader Focus, the answer will arrive in the correct mailbox. Yes: Teamleader Focus is that smart.

 

But there is more. It’s also possible to use **your own domain name** to send emails from Teamleader Focus. The main advantage here is that your chances of ending up in the [spam box](https://support.focus.teamleader.eu/hc/en-150/articles/25693895081617-FAQ-Why-did-my-email-fail-to-deliver) of your correspondent, are reduced drastically. 

 

To install this feature, you need to:

- Be an [administrator in Teamleader](https://support.focus.teamleader.eu/hc/en-150/articles/25690956768913-FAQ-How-can-I-grant-or-remove-administrator-rights) Focus with access to 'Settings'.

- Either have access to your own email domain settings, or have an IT responsible / contact person who does.

- Own your own domain name such as “@mycompany.com”. A, for example, [“@gmail.com”](%E2%80%9C@gmail.com%E2%80%9D) or @outlook.com domain will not work. 

 

Within the DNS settings of your domain, you'll have to add **3 'CNAME records'**. A CNAME record (Canonical Name) is a kind of DNS-record that indicates which email servers can send mail on behalf of your domain. This implies that you're allowing Teamleader Focus to send emails from your domain from within your specific account.

 

## 1. Set your custom domain for sending emails in Teamleader Focus

- Go to Settings > Email > **Custom domains for outgoing emails**.

- Click "Get started" and **enter your domain**.

- In the following pop-up, you'll see 3 **CNAME** records. All of them have a **name** and a **value**.

- Either copy the separate records or copy them all at once: 

If you plan on adding the records yourself, we advise you to copy them one by one.

- If you plan having them added by your IT responsible, we advise to copy them all at once using the 'Copy all' button.

 

![The 'Connect your domain' dialog showing DNS records to install for email white-labeling.](https://support.focus.teamleader.eu/hc/article_attachments/25692591751569)

 

 

## 2. Add the CNAME records to your domain's DNS settings

 

In order to allow Teamleader Focus to send emails from your own domain name, these 3 CNAME records should now be added to the **DNS settings** of your domain. 

 

In those DNS settings, you are able to create a new DNS record. While adding such a record, you choose the type 'CNAME' and simply copy both its name and value. You do this three times (once for each record).

 

*An example of what this looks like on *[*one.com*](//one.com)*: *

 

*![Personal DNS settings in one.com for configuring CNAME records for email whitelabeling.](https://support.focus.teamleader.eu/hc/article_attachments/25692623782545)*

 

 

Once this is done, it can take up to 48 hours for your newly added CNAME record to be verified publicly. If your CNAMEs are not considered valid after this timeframe, please check our [troubleshoot guide](https://support.focus.teamleader.eu/hc/en-150/articles/25695210286481-FAQ-My-domain-verification-is-pending-or-invalid-what-could-be-wrong).

* *

## Frequently asked questions:

### How do I add a CNAME record to my domain?

If you don’t precisely know how to add a CNAME record to your DNS settings, you can use the guide of your own domain provider. We listed the most common ones below:

 

[**Combell**](https://www.combell.com/nl/help/kb/wat-is-een-cname-record-hoe-kan-ik-een-cname-record-aanmaken-wijzigen/)
[**TransIP**](https://www.transip.eu/knowledgebase/entry/407-setting-a-cname-record/#:~:text=Where%20do%20I%20add%20a,%2C%20followed%20by%20)
[**Telenet**](https://www2.telenet.be/nl/business/klantenservice/dns-instellingen-aanpassen-via-mycloud/)

[**One.com**](https://help.one.com/hc/en-us/articles/360000803517-How-do-I-create-a-CNAME-record-)
[**Godaddy**](https://support.duda.co/hc/en-us/articles/26520132463383-Make-Your-Site-Live-Initial-Steps-and-DNS-Record-Setup)
[**Wordpress**](https://wordpress.com/support/domains/custom-dns/)

[**Easyhost**](https://www.easyhost.be/en/help/kb/what-is-a-cname-record-how-do-i-create-change-it/)
[**Google**](https://support.google.com/a/answer/47283?hl=en)
[**Gandi**](https://help.instapage.com/hc/en-us/articles/360011779991-Creating-a-CNAME-record-on-Gandi-gandi-net-)

[**Wix**](https://support.wix.com/en/article/adding-or-updating-cname-records-in-your-wix-account)
[**Cloudflare**](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
[**Siteground**](https://www.siteground.com/kb/manage-dns-records/)

 

 

### Can I verify multiple domains?

Yes, you can whitelist multiple domains and that will allow you to send emails from users that have a different domain. This is especially handy when you [use multiple company entities](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus) or [**alternative email addresses**](https://support.focus.teamleader.eu/hc/en-150/articles/25697837339409-How-To-Alternative-email-addresses-in-Teamleader-Focus).

 

Make sure to verify **all** domains used to send emails in your account. Think about: 

- User email addresses

- Shared inbox address(es)

- 
[Invoicing email](https://support.focus.teamleader.eu/hc/en-150/articles/25691077944721-How-To-Setting-an-invoicing-email-in-Teamleader-Focus) address(es)

- General entity email address(es)

 

Note: There is a limit of 10 domains that can be added.

 

### What about DMARC?

Until now, we've covered a lot about **CNAME** **records**, which handle domain authentication automatically when you send emails through Teamleader Focus. Apart from CNAMEs, there's another crucial DNS record that impacts your email delivery overall (not just tied to Teamleader Focus) – the **DMARC** **record**. If your domain does not have a DMARC record yet, [follow these simple steps](https://support.focus.teamleader.eu/hc/en-150/articles/25693895081617-FAQ-Why-did-my-email-fail-to-deliver#:~:text=The%20importance%20of%20DMARC) to set it up.

 

### Should I also modify my SPF and DKIM records?

**No, this is not needed**. Our CNAMEs automatically handle your SPF and DKIM record, so no further action is required on your behalf.

 

## Did you know?

- Only **one user** has to go through this procedure. All email addresses using this/these domain(s) in the account will automatically be verified.

- Be careful when adding any type of email address to your account, as a wrong email address will **not** trigger an error message. 

- 
[Responses on contact forms via the Lead capture Booster ](https://support.focus.teamleader.eu/hc/en-150/articles/25695775141649-How-To-Contact-forms-and-how-to-create-them)cannot be sent from your own custom domain. The sender of these emails will always be [info@teamleader.eu](mailto:info@teamleader.eu).