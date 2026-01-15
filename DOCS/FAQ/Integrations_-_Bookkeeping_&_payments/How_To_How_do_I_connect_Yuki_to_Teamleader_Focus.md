---
title: "How To: How do I connect Yuki to Teamleader Focus?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692501107217-How-To-How-do-I-connect-Yuki-to-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T08:06:30Z"
updated_at: "2026-01-09T13:17:49Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: How do I connect Yuki to Teamleader Focus?

![](https://support.focus.teamleader.eu/hc/article_attachments/25692509584401)

Connecting to the Yuki accounting package is an in-depth integration. As with Octopus, Exact Online and Twinfield, payment data and invoices are all synchronised between Teamleader Focus and Yuki. This ensures that you are immediately aware of the latest financial activity. Here we explain how to connect a Yuki account and how the connection works.

 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

The connection with Yuki exports invoices and credit notes from Teamleader Focus to Yuki, so that the bookkeeping can be done there. With that purpose in mind, the customers linked to these invoices are first exported to Yuki. If an invoice is reconciled in Yuki, this is set as 'paid' in Teamleader Focus. You manage ledger accounts in Yuki, and for each synchronization they are retrieved from there.

 

Don’t have a Yuki account yet? Purchase or try one out at [www.yuki.nl](https://www.yuki.nl/).

 

## Activating the Yuki connection

 

To activate the connection:

- Go to Integrations/[Marketplace](http://marketplace.teamleader.eu/), in the menu above right in Teamleader Focus

- In the overview on the left, select ‘Bookkeeping’, and then ‘Yuki’. 

Your account is probably not connected yet, so you can do that straightaway here. You will need some data from Yuki, like your account and access codes.

 

### In Yuki

To find these codes, log in to Yuki and go to your **S****ettings **in the bottom-left corner.

![](https://support.focus.teamleader.eu/hc/article_attachments/25692525968529)
Next, you go to **Integrations > Web services **and here you'll find the Company-ID's and API keys of your account (or all your accounts, if you have several).
*Note: If you can't find the ID or keys you'll need to add one. Click on the + in the top left-hand corner and then click on Save.*

![](https://support.focus.teamleader.eu/hc/article_attachments/25692516801297)

Enter both in your Teamleader Focus Marketplace settings:

![](https://support.focus.teamleader.eu/hc/article_attachments/25692494179729)

 

### In Teamleader Focus

Once you have entered these codes you will be asked to confirm the account name. Teamleader Focus will also ask you to select a start date. As of this date all invoices will be synchronised with Yuki. This normally coincides with the start of the financial year.

Click on ‘Save’ and you will have completed your connection to Yuki! Yuki will now export the settings of your accounts and so on to Teamleader Focus.

 

There are three other settings that you can configure: 

1. The standard settings of your account numbers

2. The automatic synchronization of your invoices

3. The link between VAT rates in Teamleader Focus and those in Yuki

 

## Synchronise your invoices

To synchronise the invoices you have in Teamleader Focus with Yuki, navigate to **Revenue **> **Invoices**. At the top you will see a synchronisation symbol. Click on it and synchronisation will start in the background. You will get a message once your invoices have been imported from Teamleader Focus to Yuki.

 

### Error message

In some cases you may get an error message. That is probably because there is an undefined account on one or more invoices. In that case Teamleader Focus will indicate the invoices where this occurs. Also note that the module "Invoices" needs to be activated in Yuki, otherwise you will receive an error message in Teamleader Focus.

### 

In Yuki

If you have synchronised your invoices you will be able to find them in Yuki. To do this, go to ‘Sales' and select ‘Sales invoices', on the left. Here you will find all the invoices you have just synchronised.

 

***Note:** *Yuki regenerates the PDF of the invoice and doesn't fetch this from Teamleader Focus. This also means that the booking number in the PDF in Yuki has a different format (fiscal year + 0000 + invoice number) than the invoice number in Teamleader Focus.

 

## Synchronise payment data

In Yuki you can connect your bank data so that you can reconcile your invoices and enter them as paid. Because you have established the connection to Teamleader Focus, invoices that are paid in Yuki will automatically appear as paid in Teamleader Focus. More work saved!

 

**Note: **

- When an invoice has received the status 'Paid' in Teamleader Focus, it will also receive the status 'Paid' in Yuki. However, when you change the payment status in Yuki, the status in Teamleader Focus will remain 'Paid' unless you change this manually.

 

## Contact & company sync

Unfortunately, Yuki does not provide in a one or two-way contact sync between Teamleader Focus. To avoid double entries, it's easiest to export your contacts from Yuki and import them manually. If you need help, please contact [our support](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065).

 

Note: 

- For companies: Teamleader ID (e.g. 13292623) + **5** (e.g. 13292623**5**) is exported to Yuki in the 'Relatiecode' field.

- For contacts: Teamleader ID (e.g. 13292623) + **0** (e.g. 13292623**0**) is exported to in the 'Relatiecode' field.

- If this code is not found in any 'Relatiecode' field, the contact or company will be added to Yuki (which could cause doubles).

 

## Multiple company entities

[Multiple company entities (with different VAT numbers or the same VAT number) can be linked to different Yuki accounts](https://support.focus.teamleader.eu/hc/en-150/articles/25697723306897-FAQ-Can-I-link-multiple-company-entities-to-my-bookkeeping-tool). They can also be linked to one Yuki account, but it’s important you set a different start number per entity. E.g. entity A starts with 10001 and entity B starts with 20001. If your entities would have the same numbering this can cause issues when syncing the invoices to Yuki. Alternatively, you could also change the prefix (= usually the fiscal year) but keep in mind Teamleader Focus is not able to store booking numbers with letters or special characters (f.e.: "F" or "-" or "/").

 

Also the** numbering of both invoices and credit notes** in Teamleader Focus needs to be different for the different company entities (e.g. Invoice / Credit note 1 vs. Invoice / Credit note 100001). 

 

*Your invoices don't get synchronised or you are encountering errors during the synchronisation? *[*Read this article for some troubleshooting!*](https://support.focus.teamleader.eu/hc/en-150/articles/25693789506833-How-To-Troubleshooting-Yuki)