---
title: "How To: Exporting invoices to the Expert M+ (Kluwer) accounting application"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692446514321-How-To-Exporting-invoices-to-the-Expert-M-Kluwer-accounting-application"
locale: "en-150"
created_at: "2024-06-06T08:04:18Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Exporting invoices to the Expert M+ (Kluwer) accounting application

![](https://support.focus.teamleader.eu/hc/article_attachments/25692437251729)

 

The connection with Expert M works with both the normal version and Eva Online.

[First consult this general article in relation to exporting invoices from Teamleader Focus.](https://support.focus.teamleader.eu/hc/en-150/articles/25692666955153-How-To-Exporting-invoices-from-Teamleader-Focus-to-import-into-your-bookkeeping-application)

 

### Setting the parameters

 

It is often the case that the numbering of the documents does not agree with the numbering of the invoices in relation to Expert M. The invoices are, for example, 1, 2, 3, etc. but in Expert M the document numbers are 201400001, 201400002, etc. 

We have provided for this conversion in Teamleader Focus. With "Numbering Documents" you can select, for example, "Set length at 9 figures, starting with the year", and the invoice numbers will be converted.

 

### Importing into Expert M

 

To import the file into Expert M, select **Extra –Import external applications – xml–Expert/M** on the menu bar.

Next, select the .xml file*, and indicate that you want to import **customers** and **sales**.
** The pdf records of the invoices are not imported in Expert M, only the xml file.*

Before importing, you will be asked in what year and accounting period the documents need to be booked. This means you can only export one period at a time!

 

After importing, an overview of the number of records imported and the reason for any records not having been imported will be displayed.

 

It is possible that you receive error notifications when importing. This is usually because an incorrect parameter was entered; you need to export the invoices with edited parameters in this event. Naturally, the invoices will not be charged twice. Common error notifications:

 

- “*This is not a valid amount!*" This notification is usually the result of selecting the incorrect separator when exporting (decimal separator), which is either a point or a comma.

- “*This is not a valid date!*" The format is set by default to dd/MM/yyyy (e.g. 31/12/2014), but sometimes this is set differently in Expert M, for example, dd-MM-yyyy (31-12-2014) or yyyy-MM-dd (2014-12-31). You can quickly discover what the correct format is by checking the date notation of one of your sales.

 

If it is not immediately clear what caused the error notification, it is best if you forward the notification to [our support team](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065). 

 

You can export the error notification(s) by right-clicking them -> export to Excel. Send the file with which you attempted to import as well so that we can assist you more quickly.

 

*Interested in syncing your invoices to Expert M immediately rather than exporting them? Then check out *[*this integration*](https://marketplace.teamleader.eu/integration/292d7a)* Billit developed. *