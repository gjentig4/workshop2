---
title: "How To: Deleting invoices or credit notes that are already synced with Exact Online"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692211483793-How-To-Deleting-invoices-or-credit-notes-that-are-already-synced-with-Exact-Online"
locale: "en-150"
created_at: "2024-06-06T07:58:52Z"
updated_at: "2026-01-09T13:17:22Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Deleting invoices or credit notes that are already synced with Exact Online

![](https://support.focus.teamleader.eu/hc/article_attachments/25692226213777)

 

When you want to delete an invoice or credit note in Teamleader Focus, that has already been synced to Exact Online, you will receive an error message. The reason behind that is, that when an invoice or credit note is synced to Exact Online it will receive a booking number in Teamleader Focus. And when an invoice or credit note has a booking number in Teamleader Focus, it will be impossible to remove it without resetting the booking number.

 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

**Notes:**

First of all we need to say that deleting an invoice can have legal implications. You best credit the invoice via a credit note. 

However, in some cases, e.g. when you are testing Teamleader Focus or Exact Online it can happen that you booked an invoice by accident.

 

In Teamleader Focus you **can only delete the last invoice**. If the test invoice is no longer the last one, the best thing to do is to change the amount to zero. 

 

**Be careful and show this article to your accountant if you are not sure about how to use Exact Online or contact us**.

 

If it is the **last invoice**, you should follow these steps, do mind that you need admin rights in Teamleader Focus to do this. :

- Go to Teamleader Focus, click on the cogwheel at the bottom right of the invoice overview and put 'booking number' in the available columns.

- Check the date of the invoice that needs to be deleted. All invoices from that date up till now will need to be deleted in Exact Online. This is the delink date, which you'll need later (cf. step 10).

- Go to your credit notes in Teamleader Focus and check whether there are any from that particular date of the invoice until now. If any, they will need to be deleted in Exact Online too.

- Go to Exact Online and delete the above mentioned booked invoice(s) and/or credit note(s) from Exact Online

- Return to Teamleader Focus invoices and write down the number of the oldest invoice that has been deleted from Exact Online and its booking number.

- Go to the credit notes and write down the number of the oldest credit note that has been deleted from Exact Online and its booking number. (only if applicable)

- Go to Exact Online and check whether these numbers correspond with the 'Stamgegevens-Dagboeken-Next booking number' in the journals for invoices and credit notes

- Go back to Teamleader Focus, navigate to your picture in the top right hand corner, click "**Integrations/Marketplace**"

- Open the Exact Online integration and click on 'Edit settings' under 'Administration'. Write down the start date of this integration and your invoice and credit note journals (you will need this later)

- Click on "Deactivate" and fill in the delink date, but** do NOT delink the contacts and companies!**
The delink date is the date of the first invoice or credit note that should be deleted. All invoices and credit notes from or later than this date will be reset.

- Go to "Revenue > Invoices" in Teamleader Focus and delete the unneeded invoices and credit notes. As you can always only delete the last invoice, you need to start from the highest number.

- Navigate to your picture in the top right hand corner and click "**Integrations/Marketplace**"

- Click on the settings for "Exact Online", select the right department and click on 'Connect Exact Online'.

- Fill in a start date and your journals. Use the information you wrote down earlier (step 9). The start date should be the date of the invoice that was first synced to Exact Online. If the start date is set to a later date, the payment status of these invoices will not be fetched from Exact Online.
**DO NOT import companies/contacts in this step, because this will create doubles in your Teamleader Focus account**

- Go to "Revenue > Invoices" in Teamleader Focus and click on the synchronisation button (two arrows) in the bar at the top.

**Note**: in this step-by-step plan we assume that the problem is related to an invoice. If the problem is related to a credit note however, you need to change the word invoice to credit note and vice versa.