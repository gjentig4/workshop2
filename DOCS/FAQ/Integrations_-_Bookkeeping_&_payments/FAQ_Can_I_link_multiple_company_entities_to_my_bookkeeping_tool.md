---
title: "FAQ: Can I link multiple company entities to my bookkeeping tool?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25697723306897-FAQ-Can-I-link-multiple-company-entities-to-my-bookkeeping-tool"
locale: "en-150"
created_at: "2024-06-06T10:35:27Z"
updated_at: "2026-01-09T13:18:08Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# FAQ: Can I link multiple company entities to my bookkeeping tool?

![A graphic banner featuring the text 'FAQ' with a magnifying glass and a document icon.](https://support.focus.teamleader.eu/hc/article_attachments/25690748323089)

 

Here is an overview of what is possible regarding linking [company entities](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus) from your Teamleader Focus account with your bookkeeping tool,
 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

## Full freedom

- 
[**Octopus**](https://support.focus.teamleader.eu/hc/en-150/articles/25691321114897-How-To-Connecting-my-Octopus-account-to-Teamleader-Focus)**: **Multiple company entities (with different VAT numbers or the same VAT number) can be linked to different journals within one Octopus account, or to different accounts/administrations.

- 
[**Yuki**](https://support.focus.teamleader.eu/hc/en-150/articles/25692501107217-How-To-How-do-I-connect-Yuki-to-Teamleader-Focus)**: **

Multiple company entities (with different VAT numbers or the same VAT number) can be linked to different Yuki accounts. They can also be linked to one Yuki account, but it’s important you set a different start number per entity. E.g. entity A starts with 10001 and entity B starts with 20001. If your entities would have the same numbering this can cause issues when syncing the invoices to Yuki. Alternatively, you could also change the prefix (= usually the fiscal year) but keep in mind Teamleader Focus is not able to store booking numbers with letters or special characters (f.e.: "F" or "-" or "/").

- Also the** numbering of both invoices and credit notes** in Teamleader Focus needs to be different for the different company entities (e.g. Invoice / Credit note 1 vs. Invoice / Credit note 100001). 
 

## Restrictions

- 
[**Exact Online**](https://support.focus.teamleader.eu/hc/en-150/articles/25691221776145-How-To-Connecting-Exact-Online-to-Teamleader-Focus): Multiple company entities (with the same VAT number) can be linked to different journals within only **one** Exact Online account/administration.

- 
[**Twinfield**](https://support.focus.teamleader.eu/hc/en-150/articles/25691300242705-How-To-How-do-I-connect-my-Twinfield-account-to-Teamleader-Focus): Only **one** company entity can be linked to only **one **Twinfield account/administration.

 

## Why are there differences between these bookkeeping tools?

Teamleader operates from one CRM which means that each customer has only one specific customer ID. As a result, Teamleader Focus can only synchronize with **one** other CRM. So if the bookkeeping tool does not work with customer ID’s, or if Teamleader Focus has the possibility to manage these ID’s (as is the case for Octopus and Yuki), there are no limitations.

 

However, if the bookkeeping tool maintains different CRM’s (as is the case for Exact Online and Twinfield) there are limitations. Teamleader Focus will only be able to connect with one of them as the single customer ID’s require a one-on-one relationship. If the tool has also only one journal (as is the case for Twinfield), only one company entity can be linked.