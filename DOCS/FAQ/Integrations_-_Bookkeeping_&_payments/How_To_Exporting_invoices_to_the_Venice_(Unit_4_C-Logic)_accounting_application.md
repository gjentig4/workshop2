---
title: "How To: Exporting invoices to the Venice (Unit 4 C-Logic) accounting application"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692512750737-How-To-Exporting-invoices-to-the-Venice-Unit-4-C-Logic-accounting-application"
locale: "en-150"
created_at: "2024-06-06T08:05:43Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Exporting invoices to the Venice (Unit 4 C-Logic) accounting application

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Before continuing, first consult [this general article](https://support.focus.teamleader.eu/hc/en-150/articles/25692666955153-How-To-Exporting-invoices-from-Teamleader-Focus-to-import-into-your-bookkeeping-application) about exporting invoices from Teamleader Focus.

 

## Parameters

In addition to the usual parameters, there is 1 extra parameter for exporting to Venice: ***Booking date***: here, you enter the end of the quarter of which you are exporting invoices.

 

For example, for quarter 4 of 2013 (1/10/2013 to 31/12/2013), this is "31/12/2013". This also means that you can only export 1 quarter at a time to Venice.

 

## Importing customers

Go to the customer screen by selecting **Basic data** - **Customers**. Next, select **Extra **- **Import**. For the data file, select "**Output customers.txt**" and, for the descriptive file, "**Output customers.cli**". At Actions, indicate "**Formal testing**" and "**Add**", and at "**From item**", enter **1**.

![Import dialog for customer data in Venice (Teamleader Focus integration)](https://support.focus.teamleader.eu/hc/article_attachments/25692521082001)

 

## Importing invoices

Go to the invoices screen by selecting **Start **- **Accounting **- **Sales**. Next, select **Tools **- **Import: Text file**. As the data file, select "**Output.txt**" and, for the descriptive file, select "**Output.cli**". For actions, indicate "**Formal testing**" and "**Add**", and at "**From item**", enter **1**.

 

If there are error notifications, this will likely be because codes for journals or the entry date were not specified correctly. If something is not clear, contact our [support department](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065).

 

*Interested in syncing your invoices to Venice immediately rather than exporting them? Then check out *[*this integration*](https://marketplace.teamleader.eu/integration/2ad253)* Billit developed.*