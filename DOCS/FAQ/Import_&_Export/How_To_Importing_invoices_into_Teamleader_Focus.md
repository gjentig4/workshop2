---
title: "How To: Importing invoices into Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691675511825-How-To-Importing-invoices-into-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:39:53Z"
updated_at: "2025-12-09T07:08:36Z"
category: "FAQ"
section: "Import & Export"
---

# How To: Importing invoices into Teamleader Focus

![](https://support.focus.teamleader.eu/hc/article_attachments/25691658301585)

If you're just starting out with Teamleader Focus, that doesn't necessarily mean you haven't used invoicing software before. It may come in handy to import your previous invoices in Teamleader Focus. Note that you can import invoices in Teamleader Focus regardless of the fact if they have been paid or not.

 

However, your import file (CSV or Excel) should contain certain information, and be structured in a certain way. You'll find more information on this in this article.

 

Once your file is structured properly, send it to [support](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) along with written consent. Our support team will then carry out the actual import.

 

**Important notes:**

- Importing invoices is an add-on operation, which means that no existing ones can be updated, only new ones can be added. Apart from that, the import works the same way as a CRM import: The columns need to be matched with the right field and the option to undo the import is also available for about two weeks.

- The fiscal years need to be created. This means that if you want to import invoices from 2015, you need to create 2015 as a fiscal year under **Settings > Revenue > Fiscal years**.

- If you want to import invoices for [different company entities](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus), you need to create those company entities in Teamleader Focus first.

- If you want to import the invoices themselves as well (articles on the invoices), all invoices will be created using the standard template.

- In order to set a standard template, simply go to **Settings > Document layout** > choose the layout for invoices you would like to set as standard.

- Then, click on "**Set as default invoice template**" to set it as standard layout. In case you work with several company entities, this needs to be done for every company entity. ![](https://support.focus.teamleader.eu/hc/article_attachments/25691645021841)

 

## The import file

 

### a) Mandatory columns

- 
Name customer: Name of the contact or the company

In case the name is not known, a company will be created.

- If the customer is a contact, make sure the contact name follows the format firstname + lastname (Mark Zuckerberg) and not lastname + firstname (Zuckerberg Mark), otherwise a new company would be created.

- 
Payment terms:

0D/CONT/CONTANT: cash (0 days)

- 7, 21, 30, 7D, 21D, 30D...: Standard payment term

- 30DEM: 30 days before the end of the month (same counts for 60DEM and 90DEM)
Notes: If you fill in a payment term that is not in the list of payment terms (read [this article](https://support.focus.teamleader.eu/hc/en-150/articles/25691448283537-How-To-How-can-I-change-the-payment-terms-of-my-invoices) for more information), it will be used for the specific invoices from your list, but will not be added to the list of payment terms.

- 
Permanent: 0/1, 0 means that a draft invoice without a number will be created, 1 means that a booked invoice will be created

- 
Number: invoice number, only number without prefix (only required if invoice is booked)

- 
Paid: 0/1, 0: invoice is not paid - 1: invoice is paid

- 
Date of the invoice: Date of the invoice (recommended date format: yyyy-mm-dd)

- 
Items on the invoice itself: In the CSV file/Excel sheet, there should be one line for every position on the invoice, the information above should then be filled in for every line. An example file can be found at the end of this article.

Name item: Name of the article

- 
Amount excl. VAT: This is the price per unit excl. VAT. This all needs to be in the same currency, the currency your account is set in.

- 
VAT rate item: This is the VAT rate of the item, e.g.0, 6, 12, 21, CM (other EU member state), MC (contractor), EX (outside EU), VCMD (other EU member states-facilities). If you created a VAT rate yourself you need to use the CODE you specified for that VAT rate in the settings.

- 
Item quantity: Here you fill in the amount of your items.

 

### b) Optional columns

- 
Date paid: Date the invoice has been paid (recommended date format: yyyy-mm-dd)

- 
Custom fields: Custom fields on invoice level can also be filled in during an import, we advise you to create the necessary custom fields before you do the import

- 
ID: You can fill in an ID to match with a company; this can be a custom field on company level of the type single-line text

- 
Company entity: you only need to fill in this column if you work with several company entities.

- 
Items on the invoice itself:

Total amount incl. VAT: This can be used as a verification and is the sum of all positions of your invoice. This all needs to be in the same currency, the currency your account is set in.

- 
Subtitle item: You can add a subtitle that will be added above the item.

- 
Account item: You can add a ledger account for this position, can be 7000 (BE), 8000 (NL),… The ledger accounts should be created in advance under **Settings **> **Revenue **> **Ledger ****Accounts**.