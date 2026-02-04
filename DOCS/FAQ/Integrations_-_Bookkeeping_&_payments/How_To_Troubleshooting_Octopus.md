---
title: "How To: Troubleshooting Octopus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25697678484497-How-To-Troubleshooting-Octopus"
locale: "en-150"
created_at: "2024-06-06T10:34:38Z"
updated_at: "2026-01-09T13:17:41Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Troubleshooting Octopus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

In this article we'll give you an overview of the more common errors you can encounter in the integration between Octopus and Teamleader Focus.

 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

- [Book year period is closed](#Book-year-period-is-closed)

- [Journal has the wrong type](#Journal-has-the-wrong-type)

- [Not all journals can be found in the Marketplace, but the setup of the journals is correct in Octopus](#Not-all-journals-can-be-found-in-the-Marketplace,-but-the-setup-of-the-journals-is-correct-in-Octopus)

- [An invoice item did not have an account specified for invoice X](#An-invoice-item-did-not-have-an-account-specified-for-invoice-X)

 

## Book year period is closed

 

Possible causes:

- The fiscal year is already closed in Octopus, meaning no more invoices can be added to it.

- The period (quarter or month e.g.) is already closed in Octopus, meaning no more invoices can be added to it.

 

Solution:

- Re-open the fiscal year (**Management >** **Journals**** >** Fiscal year X)

- Re-open the period (**Management > ****Journals > **Fiscal year X Closed until period/Secured till period) if possible.

- The period of "Secured till period" and "Closed until period" should be smaller (e.g. 201901) than the "Active period" or period you want to book in (e.g. 201902).
 

## Journal has the wrong type

 

Notification in Teamleader Focus:

**![Notification showing an Octopus synchronization error in Teamleader Focus](https://support.focus.teamleader.eu/hc/article_attachments/25697667960977)**

'Journal V1' in Octopus has the wrong type. This should be 'Sales bookings' but is 'Invoices' instead.

 

Solution:

- In Octopus, go to **Management Journals**

- Change the entry type of the journal to "Sales bookings". More information can be found [here](https://login.octopus.be/manual/NL/management_journals.htm).![Configuration screen for invoice journal settings in an accounting integration.](https://support.focus.teamleader.eu/hc/article_attachments/25697641918865)

 

## Not all journals can be found in the Marketplace, but the setup of the journals is correct in Octopus

Cause:

- If the journals have been created recently, they are not yet available for the API to fetch. Because of this, they are not available in the Teamleader Focus Marketplace to select.

 

Solution:

- In Octopus you can click on **File** (top left corner, make sure the correct account is active) and select 'Synchronise'.
![File menu in a bookkeeping tool showing Open file, Notes, Synchronise, and Backup/Restore options.](https://support.focus.teamleader.eu/hc/article_attachments/25697668120721)

- This will make the journals available for the API.

- After this you can go back to the Teamleader Focus Marketplace and click on **LINK ****DOSSIER** again.

- The missing journals should now be in the 'Journal Invoices/Journal Credit Notes' dropdown to select.

 

## An invoice item did not have an account specified for invoice X

Cause:

- An invoice item has an unknown account

 

Solutions: 

- Go to your invoice overview and open the corresponding invoice. Click on the** pencil** next to 'content' to add the correct ledger account (it shouldn't be unknown):
![The 'Items on the invoice' section in Teamleader Focus showing line item details and ledger accounts.](https://support.focus.teamleader.eu/hc/article_attachments/25697668223633)

- If your ledger accounts are related to your VAT rates, you can do this in bulk via settings invoices ledger accounts Auto-suggest accounts at certain VAT-tariffs.