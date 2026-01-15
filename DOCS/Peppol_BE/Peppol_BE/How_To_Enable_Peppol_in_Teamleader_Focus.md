---
title: "How To: Enable Peppol in Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25693204310673-How-To-Enable-Peppol-in-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T08:26:59Z"
updated_at: "2026-01-02T08:50:33Z"
category: "Peppol 🇧🇪"
section: "Peppol 🇧🇪"
---

# How To: Enable Peppol in Teamleader Focus

![SupportCentre_Howto.png](https://support.focus.teamleader.eu/hc/article_attachments/30200149676177) 

E-invoicing is mandatory in Belgium since January 1, 2026. Teamleader Focus makes it easy to comply by registering on Peppol, a secure network for sending electronic invoices. Follow the steps in this article to activate Peppol in your account easily.
 

**In this article: **

- [E-invoicing regulation](#h_01K4W34EE7R34Z41HTA0SKTVJ6)

- [Enable Peppol in Teamleader Focus](#01JCQXVGHBZEAZYT6QSD7EDXPS)

- [Sending and receiving invoices through Peppol](#01JCQXVGNGGM3X67H3F3GTQHNW)

- [Disable Peppol](#01JCQXVGNXGJMWE8QA2QWM94EZ)

- 
[UBL files](#01JCQXVGQ027P308TXSXDDW567) 

 

# E-invoicing regulation

E-invoicing will become obligatory in all European countries by 2030. Belgium introduced the requirement on January 1, 2026. E-invoicing means sending and receiving invoices fully digitally, so they can be processed automatically without needing to handle them manually. [This article explains what e-invoicing is, how its implementation differs across countries, and what Peppol means in this context.](https://support.focus.teamleader.eu/hc/en-150/articles/38947178910353-What-is-e-invoicing-and-Peppol)
 

# Enable Peppol in Teamleader Focus

Ready to start sending and receiving e-invoices through Peppol in Teamleader Focus? Follow these steps to enable Peppol:
 

*! First of all, only *[*admin users*](https://support.focus.teamleader.eu/hc/en-150/articles/25691974365841-FAQ-What-are-the-rights-of-an-admin)* in Teamleader Focus will be able to enable Peppol in the account.*
 

- Go to [**Settings > Company information**](https://focus.teamleader.eu/settings.php#company_information)

- Click on** Enable Peppol**
*Note that this button will only appear next to company entities with the country ‘Belgium’ or 'Luxembourg' as it's not possible to activate Peppol for countries other than Belgium or Luxembourg.*
*![](https://support.focus.teamleader.eu/hc/article_attachments/39925303600657)*

Do you see the button **Not Peppol verified yet** instead?
![](https://support.focus.teamleader.eu/hc/article_attachments/39925303602833)

In this case you might still need to complete your VAT information for this company entity, or we simply can’t confirm that this entity is allowed to have access to Peppol. Please contact us via [peppol@teamleader.eu](mailto:peppol@teamleader.eu) for further assistance. 
 

- In the next screen, you’ll see that your KBO number and your VAT number were filled out automatically based on the information in your company information.
Confirm your IBAN number or fill it out.
![](https://support.focus.teamleader.eu/hc/article_attachments/39925301804945)

Notes

The KBO number gets filled out automatically based on your VAT number. Peppol registration is based on your KBO number, which is mandatory for all companies in Belgium. It’s basically the same as a VAT number but without the ‘BE’ in front of it.

- 
[Multiple company entities: ](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus)You can register one company entity with a unique KBO or VAT number to both send and receive invoices via Peppol. However, if other entities share the same KBO or VAT number, they can only be registered for sending invoices (see step 5 – scenario 2: “you’re already registered on Peppol elsewhere”).
! If such a sending-only entity receives a response to an invoice it sent through Peppol, the response will still be correctly linked to the original invoice—even though that entity isn’t registered for receiving.
 

- Check the box next to ‘I confirm that the information is correct.’ 

- Click on **Save and continue**

To repeat what was stated above: you can **send e-invoices** through Peppol **via various software tools,** but you can **only receive e-invoices in one tool. **

There are 2 scenarios here:

**You are not registered on Peppol yet:**
Your identity on the Peppol network will be verified and you’ll receive the message that your registration on the Peppol Access Point was successful.

- 
**You’re already registered on Peppol elsewhere:**
![](https://support.focus.teamleader.eu/hc/article_attachments/41985057043089)

The moment you want to enable Peppol, we check if both your KBO number and VAT number aren’t registered elsewhere. If one of them are, you won’t be able to enable Peppol for receiving documents in Teamleader Focus and you’ll only be able to send invoices. 
[Read this article for more information.](https://support.focus.teamleader.eu/hc/en-150/articles/30082880993553-FAQ-What-if-I-m-already-registered-to-Peppol-elsewhere)
 

- After Saving, you’ll find all information in the **Peppol** tab of your company entity. Here you’ll see the status of Sending and Receiving:
![](https://support.focus.teamleader.eu/hc/article_attachments/39925301805713)
 

# Sending and receiving invoices through Peppol

After enabling Peppol in your account, you can start sending invoices through Peppol via Teamleader Focus, or start receiving them in your account. Find more information in these articles: 

- [How To: Sending invoices via Peppol in Teamleader Focus](https://support.focus.teamleader.eu/hc/en-150/articles/30085139646225-How-To-Sending-e-invoices-via-Peppol-in-Teamleader-Focus)

- 
[How To: Receiving invoices via Peppol in Teamleader Focus](https://support.focus.teamleader.eu/hc/en-150/articles/28079545197713-How-To-Receiving-e-invoices-via-Peppol-in-Teamleader-Focus)
 

# Disable Peppol

Follow these steps to disable Peppol for a company entity:

- Go to **Settings > Company information**

- Click on the **three dots** next to your company entity

- Choose **Disable Peppol**
**![](https://support.focus.teamleader.eu/hc/article_attachments/39925301809297)**

Note that disabling Peppol doesn’t mean your incoming invoices will be deleted. You will be deregistered from the Peppol network, and you won’t be able to send and receive e-invoices through Peppol anymore.
 

# UBL files

In Teamleader Focus accounts with at least one Belgian or German entity, invoices and credit notes can also be downloaded (separately) as a UBL/XML file. This allows you to e.g. send the UBL as an attachment via email to your bookkeeper, who in turn can upload that UBL to the bookkeeping tool. Go to your invoice > **three dots > Download UBL: **

![](https://support.focus.teamleader.eu/hc/article_attachments/31033328969617)

It's also possible to automatically add the UBL of an invoice/credit note in attachment when sending an invoice/credit note via email:

- Go to **Settings > Revenue > Preferences**

- 
**Enable the slider** next to 'Add UBL in attachment when sending invoice or credit note via email'

- Automatically, a UBL of the invoice/credit note will be added to the attachments of the invoice/credit note, together with the PDF of the document.
 

Read this article but still have questions? [Be sure to check out our Peppol FAQ here!](https://support.focus.teamleader.eu/hc/en-150/articles/30083675838609-Frequently-Asked-Questions-Peppol)