---
title: "How To: Exporting invoices to the Winbooks accounting application"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692523606417-How-To-Exporting-invoices-to-the-Winbooks-accounting-application"
locale: "en-150"
created_at: "2024-06-06T08:05:58Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Exporting invoices to the Winbooks accounting application

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Note: this article only applies to Winbooks, as the procedure for Winbooks on Web is different!

 

[First consult this general article about exporting invoices from Teamleader Focus.](https://support.focus.teamleader.eu/hc/en-150/articles/25692666955153-How-To-Exporting-invoices-from-Teamleader-Focus-to-import-into-your-bookkeeping-application)

## Parameters

In addition to the usual parameters, there are a number of specific parameters to export invoices to Winbooks. Most of these are not important for this export and can be ignored. The "***Call API***" parameter, however, must be deactivated. 

 

### The following parameters do require your attention:

*Invoice journal, Credit note journal*: your accountant will find these in Winbooks; see the following screenshots (**VERKP **is the code that we are looking for in this case).

 

![Navigation path in WinBooks to access Journal codes (Dagboekcodes) via Bestand > Tabellen.](https://support.focus.teamleader.eu/hc/article_attachments/25692490395025)

![The 'Dagboekcodes' dialog window for managing accounting journal codes.](https://support.focus.teamleader.eu/hc/article_attachments/25692506175505)

 

*Customer payment conditions*: Enter the different deadlines for payment in this table. There are 2 types of deadlines for payment:

- Usual deadline for payment: 0d, 14d, etc. -> 0d, 14d, etc.-> enter the figure for the value (0, 14, etc.).

- Deadline for end-of-month payment: 30d-EM, 60d-EM, etc. -> 30d-EM, 60d-EM, etc. -> enter the figure for the value followed by "E" (30E, 60E, etc.).

 

*Book year*: leave this empty (when importing, you select the fiscal year).

*Period*: this is the relevant period within the fiscal year. For quarterly statements, this is 1 to 4 and, for monthly statements, 1 to 12. It is usually quarterly statements

*Sales ledger account*: enter 700000 here.

 

The parameters will be remembered for the next export so you do not have to enter them each time.

![Configuration form for accounting export settings including VAT, journals, and ledger accounts.](https://support.focus.teamleader.eu/hc/article_attachments/25692513303441)

 

## Actual import in Winbooks

Importing in Winbooks takes place through the separate "**WbLinkInterface**" application. You must exit Winbooks to be able to execute the import.

 

1. Select the relevant file and the correct fiscal year. 

 

2. Put the 2 files from the .zip file in a separate folder and select that folder as the "**working directory**" in the interface.

 

3. Select TXT files as the format. Next, hit connection. 

 

4. Next, you can test the files and execute the import if there are no error notifications.

 

![Configuration window for the Winbooks Linker integration in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25692513359377)