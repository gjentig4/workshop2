---
title: "How To: Importing subscriptions into Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691692064785-How-To-Importing-subscriptions-into-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:40:07Z"
updated_at: "2025-04-30T14:00:34Z"
category: "FAQ"
section: "Import & Export"
---

# How To: Importing subscriptions into Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Teamleader Focus is your new tool, but that doesn't mean you don't already have ongoing subscriptions. Luckily, you can import those subscriptions in Teamleader Focus quite easily.

 

However, your import file (CSV or Excel) should contain certain information, and have the right structure. You'll read more about that in this article.

 

Once your file is structured correctly, simply send it to [support](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) along with written consent. Our support team will then carry out the actual import.

 

**Important notes:**

- Importing subscriptions is only an add-on operation which means that existing subscriptions cannot be updated, only new ones can be added. Apart from that, the import works the same way as a CRM import: The columns need to be matched with the right field and the option to undo the import is also available for about two weeks.

- If you want to import subscriptions for [different company entities](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus), you'll need to create those company entities in Teamleader Focus first.

- If you want to import the invoices themselves as well (articles on the invoices), note that all invoices will be created using the standard template. 

- In order to set a template as standard template, simply go to **Settings > Document layout** > choose the layout for invoices you would like to set as standard. 

- Then, click on "**Set as default invoice template**" to set it as your standard layout. In case you work with several company entities, this needs to be done for every company entity. 

 

![The 'Custom layout for Invoice' page showing the 'Set as default invoice template' button.](https://support.focus.teamleader.eu/hc/article_attachments/25691645021841)

 

 

## Import file

### a) Fields of the subscription itself

 

#### Mandatory columns

- 
Name customer: Name of the contact or the company; in case it is not known, a company will be created.

- Title of the subscription

- 
Payment terms:

OD/CONT/CONTANT: contant (0 days)

- 7, 21, 30, 7D, 21D, 30D...: Standard payment term

- 30DEM: 30 days before the end of the month (same counts for 60DEM and 90DEM)

- 
Notes: If you fill in a payment term that is not in the list of payment terms (read [this article](https://support.focus.teamleader.eu/hc/en-150/articles/25691448283537-How-To-How-can-I-change-the-payment-terms-of-my-invoices) for more information), it will be used for the specific subscriptions from your list and all the invoices based on those subscriptions. Note, however, that the payment term will not automatically be added to the list of payment terms.

- 
Period of the subscription:period after which the subscription will be renewed:

everyweek 

- twoweekly (every two weeks)

- monthly

- twomonthly (every two months)

- quarterly

- fourmonthly (every four months)

- sixmonthly (every six months)

- yearly

- twoyearly (every two years)

- 3yearly, 4yearly,...

Note: The period always needs to be in English, Teamleader Focus only recognizes English words.

- 
Start date of the subscription: The first invoice will be created on this date. If this date is in the past, the period of the subscription will be added until a date in the future is reached. This date will be the next renewal date (recommended date format: yyyy-mm-dd).

####  

#### Optional columns

- 
End date: End date of the subscription (recommended date format: yyyy-mm-dd)

- 
Direct booking: 0/1; 0 means that the automatically created invoices will be drafts, 1 means that the invoices will not only be created automatically but booked as well.

- 
Send invoice automatically: 0/1; 0 means that your invoice won't be sent automatically, 1 means that the invoice will be sent automatically.

- 
Send invoice via post: 0/1; 0 means that the invoice won't be sent automatically via post, 1 means that the invoice will be sent automatically via post

- 
Custom fields: Custom fields on invoice level can also be filled in during an import, we advise you to create the necessary custom fields before you do the import

- 
ID: You can fill in an ID to match with a company; this can be a custom field on company level of the type single-line text

- 
Company entity: you only need to fill in this column if you work with several company entities. 

- 
Remarks/Comments: fill out the text for the Remarks field of the subscription.

 

### b) Fields for the items on the invoice

 

In the CSV file/Excel sheet, there should be one line for every position on the invoice, the information above should then be filled in for every line. An example file can be found at the end of this article.

*Note: The first invoice will be created at the next renewal date.*

 

#### Mandatory columns

- 
Name item: Name of the article

- 
Amount excl. VAT: This is the price per unit excl. VAT. This all needs to be in the same currency, the currency set for your account.

- 
VAT rate item: This is the VAT rate of the item, e.g.0, 6, 12, 21, CM (other EU member state), MC (contractor), EX (outside EU), VCMD (other EU member states-facilities)

- 
Item quantity: Here you fill in the amount of your items.

####  

#### Optional columns

- 
Total amount incl. VAT: This can be used as a verification and is the sum of all positions of your invoice. This all needs to be in the same currency, the currency your account is set in.

- 
Subtitle item: You can add a subtitle that will be added above the item.

- 
Account item: You can add a ledger account for this position, can be 7000 (BE), 8000 (NL)… The ledger accounts should be created in advance under Settings > Invoices > Ledger Accounts.

- 
Item: Unit: You can add the units of your invoice items.