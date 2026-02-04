---
title: "FAQ: What values are allowed for importing contacts or companies?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691845208465-FAQ-What-values-are-allowed-for-importing-contacts-or-companies"
locale: "en-150"
created_at: "2024-06-06T07:46:53Z"
updated_at: "2025-12-04T14:32:29Z"
category: "FAQ"
section: "Import & Export"
---

# FAQ: What values are allowed for importing contacts or companies?

![A graphic banner featuring the text 'FAQ' with a magnifying glass and a document icon.](https://support.focus.teamleader.eu/hc/article_attachments/25690748323089)

 

You want to import your contacts and companies? Great, so let’s first have a look at the excel file in attachment.

 

## Creating additional fields

All fields of your excel or csv file you want to import should be available in Teamleader Focus. If they are not one of the standard fields, you should create custom fields *before* you start the import. Check [here](https://support.focus.teamleader.eu/hc/en-150/articles/25692628832017-How-To-Creating-a-custom-field-in-Teamleader-Focus) for more information.

 

## Allowed values for Custom fields

**Type**
**Allowed value**

Single line text
No restriction but all information needs to be in **one column**

Multiline text
No restriction but all information needs to be in **one column**

Single selection
No restriction but all information needs to be in **one column**
Unknown options will be added to the list of options.

Multiple selection
Different options need to be in one column, separated by a comma.
Unknown options will be added to the list of options.

Date
Needs to have the format YYYY-MM-DD

Money
Needs to be a number

Integer
Needs to be an integer number

Number
Needs to be a number

Automatically incrementing field
Needs to be a number

Yes/No
Needs to be the value 1 or 0
1 is “Yes” and 0 is “No”

Emailaddress
Check that all email addresses have the symbol @
Check that are not special characters not accepted on an email address
Only one email address per column is accepted

Phone number
Only one number per column is accepted

URL
Check that all websites include [www](http://www). and .com/.uk/.es/etc...
Only one website per column is accepted

Company
Needs to be an existing company in the account otherwise a new company is created

Contact
Needs to be an existing contact in the account otherwise a new contact is created

Product
Needs to be an existing product in the account otherwise a new product is created

User
Needs to be the exact name of an active user in the account

##  

## Allowed values for some standard fields

### Contacts/Companies

**Field**
**Allowed value**

Email address
Check that all email addresses have the symbol @
Check that are not special characters not accepted on an email address
Only one email address per column is accepted

Website
Check that all websites include [www](http://www). and .com/.uk/.es/etc...
Only one website per column is accepted

Phone
Only one telephone number per column is accepted

Fax
Only one fax number per column is accepted

Tags
Different options need to be in one column, separated by a comma.
Unknown options will be added to the list of options.

Country
Extended names are not accepted.
Only [ISO codes](https://nl.wikipedia.org/wiki/ISO_3166-1) (2 letters accepted)

Language
Extended names are not accepted.
Only [ISO codes](https://nl.wikipedia.org/wiki/ISO_3166-1) (2 letters accepted)

Payment terms

Cash:
CONT/CONTANT/0D: payment term cash (0 days)
Default payment terms:
7, 21, 30, 7D, 21D, 30D… : normal payment term
Flexible payment terms:
If you use custom payment terms, you can upload these as well. They will be kept as a preference for your customer.
You can also [create custom payment](https://support.focus.teamleader.eu/hc/en-150/articles/25691448283537-How-To-How-can-I-change-the-payment-terms-of-my-invoices) terms within Teamleader Focus.
End of month:
30DEM: 30 days after the end of the month (identical for 60DEM and 90DEM)

Background information
No restriction but all information needs to be in **one column**

Opt-in marketing mails
This column allows you to exclude from your mailing list the companies that don’t wish to receive information.
Only the numbers 0 and 1 are accepted.
The number 0 stands for 'Opt-in marketing mails’ = NO and the number 1 stands for 'Opt-in marketing mails' = YES’.

Active
Only the numbers 0 and 1 are accepted.
The number 0 stands for '[deactivated](https://support.focus.teamleader.eu/hc/en-150/articles/25697830754065-How-To-Deactivating-customers-in-Teamleader-Focus)’ and the number 1 stands for 'active'.

###  

### Contacts only

**Field**
**Allowed value**

First and Last name
Can be in one column but should be all in the same order, e.g. all First name + Last name
Note: You need to choose the right value when matching this column at a later stage, e.g. “First name + Last name”

Gender
Men: “M”, “MAN”, “MALE”
Women: "WOMAN”, “F”, “FEMALE”

Date of birth
Needs to have the format YYYY-MM-DD

Related companies
Only one related company per column is accepted
Maximum number of columns for related companies is 3
The function of the contacts has to be in a separate column

Function of contact in the company
Only one function per column is accepted

###  

### Companies only

**Field**
**Allowed value**

Account manager
Needs to be the exact name of an active user in the account

VAT liability
You can use the text abbreviations or the numbers listed below:

vat_liable: Belgian VAT liability (1)
intra_community_eu: Intra-Community VAT liability (4)
outside_eu: VAT liability outside the EU (6)
contractor: Contracting partner (30)
private_person: Private person (7)
exempted_from_vat: Not liable for VAT (10)

Sector
Sectors can only be entered for companies by using the triple letter codes that are used by Trends. [You can find the sector list attached at the bottom of this article.](https://support.focus.teamleader.eu/hc/en-150/article_attachments/40034104552593)

Related contacts
Only one related contact per column is accepted
Maximum number of columns for related contacts is 3
The function of the contacts has to be in a separate column

Function of related contact
Only one function per column is accepted