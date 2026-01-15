---
title: "FAQ: What if my invoice/credit note is shown twice in Exact Online?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25693702327057-FAQ-What-if-my-invoice-credit-note-is-shown-twice-in-Exact-Online"
locale: "en-150"
created_at: "2024-06-06T08:40:39Z"
updated_at: "2026-01-09T13:17:11Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# FAQ: What if my invoice/credit note is shown twice in Exact Online?

![](https://support.focus.teamleader.eu/hc/article_attachments/25693651806737)

In this article we'll give you more information on how to solve the issue of an invoice/credit note being shown twice in Exact Online and consequently having 2 different bookkeeping numbers.

 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

Cause: The invoice/credit note was manually added in Exact Online before connecting Teamleader Focus to Exact Online and afterwards it also got synced to Exact Online via Teamleader Focus.

 

Solution: Deleting specific invoices and credit notes in Exact Online and reconnecting the integration so those invoices and credit notes respectively get synced again.

 

Follow these steps carefully to fix this problem. Do mind that you need admin rights in Teamleader Focus to do this. **In case you might be unsure on how to use your Exact Online account, then do show this article to your accountant or contact us**.

 

- Go to Teamleader Focus, click on the cogwheel at the bottom right of the invoice overview and[ put 'booking number' in the available columns](https://support.focus.teamleader.eu/hc/en-150/articles/25697968906513-FAQ-Adding-or-removing-columns-in-my-list-views-in-Teamleader-Focus). Do the same for the credit notes.

- Check the date of the invoice or credit note that is shown twice in Exact Online. All **invoices ****from that date up till now** will have to be deleted in Exact Online.

- Go to your **credit notes** in Teamleader Focus and check whether there are any from that particular date until now. They will need to be deleted in Exact Online too.

- Go to Exact Online.

- Delete all invoices and credit notes in Exact Online which have been added on the above-mentioned date and later.

- Go to Teamleader Focus.

- Return to Teamleader Focus invoices and write down the booking number (step 1) of the oldest invoice that has been deleted from Exact Online, which should follow the number of the last invoice which has not been deleted.

- Go to the credit notes and write down the number of the oldest credit note that has been deleted from Exact Online and its booking number (only if applicable).

- Go to Exact Online and check whether these numbers correspond with the 'Master data-Journals-Next booking number' in the journals for invoices and credit notes

- In Teamleader Focus, click on your **user ****icon **> **Integrations/Marketplace **> **Manage **> **Exact ****Online > Settings**

- Go to 'Edit settings for administration' > Division. Write down on a paper the start date of this integration and your invoice and credit note journals (you will need this later) 

- Click on **Deactivate**

- Choose the date of the invoice or credit note that caused the issue as the date to disconnect on (invoices and credit notes from this date onwards will lose the link to Exact Online, their bookkeeping number and can be re-synced to Exact Online)

- Do not disconnect customers, the slider must be disabled

- Click on the settings again

- Select the correct Division

- Click on **Connect Exact Online**

- As a start date, fill out the original start date of the integration (the data you wrote down in step 11)

- Do not import contacts and companies, the slider must be disabled

- Fill in the correct journals and connect

- Go to **Revenue** > **Invoices **in Teamleader Focus

- Click on the **sync ****button **to sync all invoices

 

*Do you encounter other Exact Online errors? *[*Please check this article.*](https://support.focus.teamleader.eu/hc/en-150/articles/25697940180369-How-To-Troubleshooting-Exact-Online)