---
title: "How To: How do I prepare my bookkeeping integration (Exact Online, Octopus or Twinfield) and Teamleader Focus account for connection?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691176976401-How-To-How-do-I-prepare-my-bookkeeping-integration-Exact-Online-Octopus-or-Twinfield-and-Teamleader-Focus-account-for-connection"
locale: "en-150"
created_at: "2024-06-06T07:24:18Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: How do I prepare my bookkeeping integration (Exact Online, Octopus or Twinfield) and Teamleader Focus account for connection?

![](https://support.focus.teamleader.eu/hc/article_attachments/25691151873169)

 

The integrations Teamleader Focus offers with one of the bookkeeping tools mentioned in the title are all in-depth: both payment data and contacts synchronise between Teamleader Focus and the tool.

 

The connection entails that invoices and credit notes from Teamleader Focus will be exported to the tool to take care of the bookkeeping there. With that purpose in mind, customers linked to these invoices will first be exported. If an invoice is reconciled, it is marked as 'paid' in Teamleader Focus. You manage your ledger accounts in the bookkeeping software: for each synchronisation they are retrieved from there.

 

Depending on your situation, you must follow one of the following 3 scenarios before you can actually [start connecting Exact Online](https://support.focus.teamleader.eu/hc/en-150/articles/25691221776145-How-To-Connecting-Exact-Online-to-Teamleader-Focus), [Octopus ](https://support.focus.teamleader.eu/hc/en-150/articles/25691321114897-How-To-Connecting-my-Octopus-account-to-Teamleader-Focus)or [Twinfield](https://support.focus.teamleader.eu/hc/en-150/articles/25691300242705-How-To-How-do-I-connect-my-Twinfield-account-to-Teamleader-Focus) to Teamleader Focus. 

 

# A. My Bookkeeping software is empty (and my Teamleader Focus account is or is not empty)

If your bookkeeping tool account does not contain any data yet, you must first set a few things:

- Create fiscal years (period/date table).

- Create a journal for invoices.

- Create a journal for credit notes (different from the invoice journal).

- Define ledger accounts.

In Exact, this can be found by clicking on your company name at the top right and selecting ‘Master data’. You can find the settings under the ‘Financial’ section. We go further into detail on creating a journal below.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25691196953745)

 

The journals must be of the type ‘**Sales**’ as Teamleader Focus can only save documents of this type of journal. When creating a journal, you must also enter a ledger account. Connect this account with a revenue account.

 

With each synchronisation all revenue accounts are loaded from your bookkeeping software into Teamleader Focus. Therefore, you are managing accounts from within the bookkeeping software. If you do not use the accounts, you can just create a default account and use this account for all invoice lines.

 

# B. My Teamleader Focus account is empty and my bookkeeping tool contains my customer database

While making the connection, you can very quickly and easily import your customer database into Teamleader Focus by selecting the slider ‘Import companies' from Exact Online, Octopus or Twinfield. You can immediately start making the connection via the link to the article for the tool you use. No further preparation is needed.

 

# C. Both my Teamleader Focus account and my bookkeeping tool contain my customer database

If you have a customer database in both Teamleader Focus and the tool, the import is somewhat more complex. In order to prevent double entries of companies in your bookkeeping tool, all companies must first be imported into Teamleader Focus. This is done by importing through the slider ‘Import companies from ...’ that appears while making the actual connection. This is explained in the[ third step of making the actual connection](https://support.focus.teamleader.eu/hc/en-150/articles/25691221776145-How-To-Connecting-Exact-Online-to-Teamleader-Focus) (in the case of Exact).

 

After importing, it is likely you have many duplicates of customers in Teamleader Focus. As an admin, you can see which customers have an External ID via their contact/company page and which do not. This column can also be added to the columns of your invoices overview.
![](https://support.focus.teamleader.eu/hc/article_attachments/25691168349329)

 

You can now merge the double entries manually or automatically in Teamleader Focus:

- 
**Manually**: Enter the name of a company and if there are 2 results, select **Merge** under ‘Actions’. You can also choose to merge through the details page of a company (under the three dots at the top). Teamleader Focus will automatically merge all fields, including the external ID. If there’s a conflict, you will get the option to select 1 of the 2 values.

- 
**Automatically**: If there are more than 50 duplicate records, it is often worth the trouble to merge automatically using the following (more complex) method: with the merging mechanism built into our [Excel or CSV import](https://support.focus.teamleader.eu/hc/en-150/articles/25691800529297-How-To-Importing-contacts-and-companies-to-Teamleader-Focus) you can merge the companies automatically and then merge the remaining companies (of which the name, for example, differs slightly) manually. Achieve this by following the following steps:

[Create a segment ](https://support.focus.teamleader.eu/hc/en-150/articles/25690816108305-How-To-Creating-a-segment-in-Teamleader-Focus)that contains all of the companies you just imported. All companies that were imported have automatically been given a tag (in the case of Exact Online ‘Exact Online Import’)  so it is better to create a segment with the rule ‘Tags contain Exact Online Import’. You can find a guide on making tags [here](https://support.focus.teamleader.eu/hc/en-150/articles/25690854640529-How-To-Using-tags-in-Teamleader-Focus).

- Export this segment to Excel.

- In Teamleader Focus, perform the [bulk action ‘Delete’ on this segment](https://support.focus.teamleader.eu/hc/en-150/articles/25691338172561-FAQ-How-can-I-delete-more-than-one-contact-or-company-in-one-go): this will again delete all companies.

- Delete the unnecessary columns from the Excel file to avoid any older data from your bookkeeping tool overwriting more recent data from Teamleader Focus. The necessary columns are ‘Name” and ‘External ID’ and we strongly advise importing the VAT number as well.

- You can save the Excel file and [import it through our import tool](https://support.focus.teamleader.eu/hc/en-150/articles/25691800529297-How-To-Importing-contacts-and-companies-to-Teamleader-Focus). Again, therefore only the ‘Name’, ‘External ID’ and ‘VAT number’ fields are needed.

- If Teamleader Focus asks for a criterion for merging, you can do this on the basis of the name (if the name rarely differs) or on the basis of a VAT number (if most of the VAT numbers are entered). You can try different criteria and see how many new companies will be added through the preview function. We want this number to be as low as possible.

- Import the data.

- All **edited** companies are companies that have now been given the correct customer number.

- All **added** companies are companies that could not be matched. You will have to go through these manually and merge them, as we described earlier.

If everything has been performed correctly, you will see that the ‘External ID’ column has been populated with regard to all your invoices. If this is not everywhere the case, compare that customer with the Excel file you exported. If the customer is not present there, the customer will simply be created in your bookkeeping tool during the next synchronisation.