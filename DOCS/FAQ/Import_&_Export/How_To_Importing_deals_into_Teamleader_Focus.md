---
title: "How To: Importing deals into Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691668093329-How-To-Importing-deals-into-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:39:36Z"
updated_at: "2025-05-04T14:02:07Z"
category: "FAQ"
section: "Import & Export"
---

# How To: Importing deals into Teamleader Focus

![](https://support.focus.teamleader.eu/hc/article_attachments/25691689475473)

 

Starting with Teamleader Focus does not necessarily mean starting from scratch. It is possible you have a list of deals you want to import into Teamleader Focus. Whether they are already won, lost or still running, importing them is no problem.

 

However, you should note that the import file (CSV or Excel) should contain certain information and should be structured properly. You'll find more information on this aspect in this article.

 

Once your file is properly structured, simply send it to [our support](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) along with written consent. Our support team will then carry out the actual import.

 

Notes:

- When you import deals, you can only add new ones. **Existing deals cannot be modified through an import**. Aside from that, the import works in the same way as a CRM import: the columns need to be matched with the right field. The option to undo the import is also available for about two weeks.

- If you have [more than 1 company entity](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus): You need to create separate Excel files per company entity. Otherwise your deals will all be imported on your default company entity. Don't forget to link the fields for the linked quotation (cf. b) Fields for linked quotation down below)."

- It isn't possible to import 'separate' quotations, as quotations are always linked to a deal in the background. You always need to provide the 'Fields of the deal itself' too (cf. below).

 

## Import file

### a) Fields of the deal itself

In the CSV file/Excel sheet, there should be one line per deal. An example sheet can be found at the end of the article.

 

#### Mandatory columns

- 
Customer name:Contact or company in your CRM.

In case the customer does not exist yet, a new company will be added. 

- If the customer already exists: make sure that the first name and the surname are in the right order and that the name of the contact/company exactly matches the name in Teamleader Focus.

- If you have different deals for the same customer in your Excel file, make sure not to mention them right below each other in your file otherwise Teamleader Focus will merge these deals for this customer. If you move the different deal all the way to the bottom of your Excel file Teamleader Focus will recognise this data as separate deals.

- 
Title: Title of the deal

- 
[Pipeline](https://support.focus.teamleader.eu/hc/en-150/articles/25696017218705-How-To-Multiple-Sales-Pipelines-in-Teamleader-Focus) name: If you have multiple deal pipelines, the column 'Pipeline name' is required if you also add deal phases in your file. If you only have one pipeline, you don't need to add that column to your file as your deals will be imported in the default pipeline.

 

#### Optional columns

- 
Responsibility: Each deal needs to have a responsible, which needs to be an active Teamleader Focus user in this account. In case this column is missing or one field is left blank, Teamleader Focus will ask during the import which user should be filled in in case the field is empty. By default, the user conducting the import will be set but every other active Teamleader Focus user can be chosen here, as well.

- 
Contact: This is the company’s contact person. This field can only be filled in in case the deal is linked to a company.

- 
Phase: This is the name of the deal phase as defined under Settings > Deals and Quotations > Pipelines > deal phases. If you have multiple deal pipelines, make sure to define the exact phase names for that specific pipeline. If you didn't provide a pipeline or deal phases, then the deal will be assigned to the phase 'New' of the default pipeline.

- 
Date (current phase): You can specify the date when the deal landed in its current phase, like the date of acceptance or refusal *(recommended date format: yyyy-mm-dd).*
*Note: There's a big difference between the export and import of deals. When exporting, it's possible to obtain 3 different dates: date accepted, date refused and date adde**d. When importing a deal, it's only possible to import one date and that's the date of the deal in its current phase.* 

- 
Source: This is the source of the deal. If the origin is unknown, leave this blank and do not fill in ‘unknown’.

- 
Probability (%): This is about the probability of the deal, you need to fill in a number between 0 and 100.

- 
Reason refused: Short reason of refusal that can be used in the statistics.

- 
Reason refused (long): A longer piece of text on why the deal got refused.

- 
Amount excl. VAT: In case no quotation is attached to the deal, a general amount (value of the quotation) can be filled in here. This all needs to be in the same currency, the currency your account is set in.

- 
ID: An ID to match with a company (this is a custom field for companies of type 1 line text or number)

- 
Custom fields: Custom fields on deal level can also be filled in during an import, we advise you to create the necessary custom fields before you do the import

- 
Expected close date: This is the date you expect a deal to be accepted/won (*recommended date format: yyyy-mm-dd).*

- 
Remarks: A longer piece of text where you define background information about the deal.

 

### b) Fields for linked quotation

In the CSV file/Excel sheet, there should be one line per article on the quotation, the information above should then be filled in for every line. An example file can be found at the end of this article.

The articles of the quotation will be loaded, but you'll still need to include the accompanying text, lay-out,… you want.

 

#### Mandatory columns:

- Name item

- 
Amount excl. VAT: This is the price per unit excl. VAT. This all needs to be in the same currency, the currency your account is set in.

- 
VAT rate item: This is the VAT rate of the item, e.g.0, 6, 12, 21, CM (other EU member state), MC (contractor), EX (outside EU), VCMD (other EU member states-facilities)

- 
Item quantity: Fill in the number of items.

#### Optional columns:

- 
Total amount incl. VAT: This can be used as a verification and is the sum of all positions of your invoice. This all needs to be in the same currency, the currency your account is set in.

- 
Subtitle item: You can add a subtitle that will be added above the item.

- 
Account item: You can add a ledger account for this position, for example 700000 (BE), 8000 (NL)… The ledger accounts should be created in advance under **Settings > Invoices > Ledger Accounts**.

Example files