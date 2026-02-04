---
title: "How To: Exporting invoices to the Wings accounting application"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692476855185-How-To-Exporting-invoices-to-the-Wings-accounting-application"
locale: "en-150"
created_at: "2024-06-06T08:06:10Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Exporting invoices to the Wings accounting application

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Teamleader Focus provides a connection with around thirty accounting packages, including Wings. Export invoices to your bookkeeping software whenever you want without having to print invoices first. Note: per exported invoice there is a **charge of 0.10** euros – a mere pittance for all the work you save!

 

[First consult this general article in relation to exporting invoices from Teamleader Focus.](https://support.focus.teamleader.eu/hc/en-150/articles/25692666955153-How-To-Exporting-invoices-from-Teamleader-Focus-to-import-into-your-bookkeeping-application)

This export works for both the standard Wings version and Wings Online. If you use Wings Online, you must contact them to activate the necessary icons via *+32 (0)15 245 700* or via *info@wings.be*. You will need to import entries using **ASCII files**.

 

## PARAMETERS

In addition to the usual parameters, there are a number of parameters that are specific to Wings:

Location of the file is "**Wings.ini**":

- 
*Wings*: enter the location of the folder in which Wings was installed (usually this is "c:/wings/")

- 
*Wings Online*: enter the "**home directory**" that you get if you have the Wings Web Service installed. For example: "**\\****wings-db-01\wingsdata\My Wings**"

- 
*Wings Dossier ID*: enter the ID of your file. This is the "**Internal number**" under **Management **-> **Settings **(see screenshot below).

 

![Settings window in Wings Boekhouding for configuring dossier details and VAT information.](https://support.focus.teamleader.eu/hc/article_attachments/25692492149137)

 

The country codes in Teamleader Focus and Wings are often different. For example, Belgium (BE) is B and France (FR) is F. You can find all values for the countries under **Basic **-> **Help files** -> **Countries **and, next, **clicking the magnifying glass**. You should enter the "**Old code**" (see screenshot).

 

![Country search dialog in the Wings Boekhouding accounting software integration](https://support.focus.teamleader.eu/hc/article_attachments/25692524164497)

 

- 
*Payment Conditions*: you can find these in Wings under **Basic **-> **Help files** -> **Payment conditions** and, next, **clicking the magnifying glass**. The payment terms used most often are **F0XX**, where XX is the number of days. For example: F000 for cash, F014 for 14 days, …

 

![Payment terms selection window in Wings Boekhouding for Teamleader Focus integration](https://support.focus.teamleader.eu/hc/article_attachments/25692514957713)

 

You can find the codes for the journals in Wings by selecting **Consult **-> **Journals **and, next, **clicking the field next to **"**Post**"
Customer group code: You can find the code in Wings under Basic -> Groups -> Customer groups. Usually this is "0000.

The default values can be used for the other parameters.

 

## IMPORTING CUSTOMERS AND INVOICES

Keep in mind that entries cannot be removed in Wings so we recommend making a backup first for each import. You can do this by selecting **Management **-> **Backup**.

 

For the actual import, use the "**WAIimp.exe**" application, which is in the Wings' installation folder. This application allows you to select a file (select the **Output.txt** file that you obtained with the export). Next, the import is performed.

 

If the import fails, you will get an Output.ERR file in which you will find (technical) information about the error. If you cannot find a solution to the problem immediately, you can forward this file together with your import file to our [Support department](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065).

 

*Interested in syncing your invoices to Wings immediately rather than exporting them? Then check out *[*this integration*](https://marketplace.teamleader.eu/integration/e7ceb1)* Billit developed.*