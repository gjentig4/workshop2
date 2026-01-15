---
title: "FAQ: What do I do with the error message \"The invoices X and Y have the same booking number\"?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691742261521-FAQ-What-do-I-do-with-the-error-message-The-invoices-X-and-Y-have-the-same-booking-number"
locale: "en-150"
created_at: "2024-06-06T07:42:41Z"
updated_at: "2026-01-09T13:16:22Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# FAQ: What do I do with the error message "The invoices X and Y have the same booking number"?

![](https://support.focus.teamleader.eu/hc/article_attachments/25691741999889)

 

This means an invoice or credit note has been deleted from Exact Online but not from Teamleader Focus. During the synchronisation, we fetch the booking number from Exact Online and store it in Teamleader Focus. In Exact Online, the number will always be the number of the last booking +1. If a booking has been deleted from Exact Online, but not from Teamleader Focus, this will cause the same number to be added to Teamleader Focus during the next sync for different invoices or credit notes.
 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

Just follow those steps carefully to fix this error. Do mind that you need admin rights in Teamleader Focus to do this. **In case you might be unsure on how to use your Exact Online account, then do show this article to your accountant or contact us**.

- Go to Teamleader Focus, click on the cogwheel at the bottom right of the invoice overview and put '**booking number**' in the available columns. Do the same for the credit notes.

- Check the date of the most recent invoice with the double booking number that needs to be deleted. All **invoices from** **that date up till now** will need to be deleted in Exact Online.

- Go to your **credit notes** in Teamleader Focus and check whether there are any from that particular date of the invoice until now. If any, they will need to be deleted in Exact Online too.

- Go to Exact Online and delete the above mentioned booked invoice(s) and/or credit note(s) from Exact Online

- Return to Teamleader Focus invoices and write down the number of the oldest invoice that has been deleted from Exact Online and its booking number. If this was the invoice with the double booking number, write down one number higher.

- Go to the credit notes and write down the number of the oldest credit note that has been deleted from Exact Online and its booking number. (only if applicable)

- Go to Exact Online and check whether these numbers correspond with the 'Stamgegevens-Journals-Next booking number' in the journals for invoices and credit notes

- Navigate to your **user icon **in the top right hand corner of Teamleader Focus Click "**Integrations/Marketplace**"

- In the search bar, search for "Exact Online"

- Open the Exact Online integration and click on 'Edit settings' under 'Administration'. Write down the start date of this integration and your invoice and credit note journals (you will need this later) 

- Click on "Deactivate" and fill in the delink date, but** do NOT delink the contacts and companies!**
The delink date is the date of the first invoice or credit note that had to be deleted from Exact Online. All invoices and credit notes from or later than this date will be reset in Teamleader Focus.

- Click on the settings for "Exact Online", select the right department and click on 'Connect Exact Online'.

- Fill in a start date and your journals. Use the information you wrote down earlier (step 9). The start date should be the date of the invoice that was first synced to Exact Online. If the start date is set to a later date, the payment status of these invoices will not be fetched from Exact Online.
**DO NOT import companies/contacts in this step, because this will create doubles in your Teamleader Focus account**

- Go to "**Revenue** > **Invoices**" in Teamleader Focus and click on the synchronisation button (two arrows) in the bar at the top.

**Note**: in this step-by-step plan we assume that the problem is related to an invoice. If the problem is related to a credit note however, you need to change the word invoice with credit note and vice versa.