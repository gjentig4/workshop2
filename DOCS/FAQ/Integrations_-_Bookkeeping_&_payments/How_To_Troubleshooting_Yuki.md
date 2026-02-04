---
title: "How To: Troubleshooting Yuki"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25693789506833-How-To-Troubleshooting-Yuki"
locale: "en-150"
created_at: "2024-06-06T08:44:07Z"
updated_at: "2026-01-09T13:17:59Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Troubleshooting Yuki

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

In this article, we'll give you an overview of the more common errors you can encounter in the integration between Yuki and Teamleader Focus:

 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

- [There are X documents which have unspecified ledger accounts](#There-are-X-documents-which-have-unspecified-ledger-accounts)

- [The domain is not licensed for this functionality](#The-domain-is-not-licensed-for-this-functionality)

- [Cannot book this transaction line because the GLAccount is disabled](#Cannot-book-this-transaction-line-because-the-GLAccount-is-disabled)

- [An error occurred during the synchronisation of invoice X: Could not create or modify transactions before dd-mm-yyyy for administration x](#An-error-occurred-during-the-synchronisation-of-invoice-X%3A-Could-not-create-or-modify-transactions-before-dd-mm-yyyy-for-administration-x)

- [Sales tax code with percentage "xx" and type "xx" cannot be found](#Sales-taxcode-with-percentage-)

- [Yuki has reached its daily rate limit, the synchronisation can start again in 24h](#Daily-limit-exceeded)

- [Solution: Contact Yuki to increase the amount of calls per day.The VAT number of the relation must be filled in for sales invoices with deliveries to countries within the EU](#Solution%3A-Contact-Yuki-to-increase-the-amount-of-calls-per-day.The-VAT-number-of-the-relation-must-be-filled-in-for-sales-invoices-with-deliveries-to-countries-within-the-EU)

- 
[Failed to create credit note/invoice xxxx / x: "HTML render is blank](#Failed-to-create-credit-note/invoice-xxxx-/-x%3A-)"

- [The invoices X and Y have the same booking number](#The-invoices-X-and-Y-have-the-same-booking-number)

 

**Note**: If you received another error that isn't mentioned in this article, please [reach out to us](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) and don't forget to add the screenshot of the error you received. We'll be happy to help. 

 

To **load the current error messages** in your account, click on the bell icon and delete the notifications. Then, click on the double arrows to start the synchronisation again. You'll then see the latest error(s).
![Top navigation bar icons in Teamleader Focus highlighting the sync and notification buttons.](https://support.focus.teamleader.eu/hc/article_attachments/25697914743185)

 

## There are X documents which have unspecified ledger accounts

There are two ways to resolve the unspecified ledger accounts error:

- Click on the error message about unknown accounts; at the bottom you will see links to invoices / credit notes.

Open the invoice links one by one

- Enter a ledger account where you see 'No accounts' by editing the invoice (clicking on the pencil next to 'Content')

- 
**Save**.
![The 'Items on the invoice' section in Teamleader Focus showing line item details and ledger accounts.](https://support.focus.teamleader.eu/hc/article_attachments/25693775071249)

- If your ledger accounts are related to your VAT rates, you can do this in bulk via **Settings > Revenue > ****Ledger ****accounts** > Auto-suggest accounts at certain VAT-tariffs.

 

## The domain is not licensed for this functionality

Cause: You don't have the module 'Yuki Factuur' in Yuki, while this is necessary for the integration with Teamleader Focus.

Solution: Contact your accountant or Yuki, so they can activate this module in Yuki for you.

 

## Cannot book this transaction line because the GLAccount is disabled

Cause: The ledger account specified in the error message is disabled in Yuki.

Solution: Enable this ledger account in Yuki (by going to MAR search for the ledger account check the checkbox) or select a different ledger account on the invoice in Teamleader Focus.

 

## An error occurred during the synchronisation of invoice X: Could not create or modify transactions before dd-mm-yyyy for administration x

Cause: This means that period was already closed in Yuki

Solution: Reopen this period in Yuki

 

## Sales tax code with percentage "xx" and type "xx" cannot be found

Causes:

- A (custom) VAT rate used on one of your invoices, isn't matched to a corresponding VAT rate in Yuki.

- There is no VAT rate of that percentage within that specific VAT type in Yuki.

- The customer linked to the invoice is located in a country that doesn't correspond to the country's VAT rate (specifically for Yuki VAT type '40' - OSS)

- The start date of the tax rate validity in Yuki is a later date than the invoice date.

Solutions: 

- Go to the settings of your Yuki integration, choose "Link VAT rates to Yuki" and make sure all VAT rates are matched.

- Verify the settings of that specific VAT rate in Yuki to see if the percentage corresponds to the one in Teamleader Focus.

- Change the country of the customer linked to the invoice to the correct one.

- Change the start date of the tax rate validity in Yuki to match the date(s) of the to be synced invoice(s) in Teamleader Focus.
 

## Yuki has reached its daily rate limit, the synchronisation can start again in 24h

Cause: Yuki only permits a certain amount of calls per day. You can see the amount of calls per day in Yuki under Home Domain Settings Webservices Webservice amount of calls per day.

Solution: Contact Yuki to increase the amount of calls per day.

## 

The VAT number of the relation must be filled in for sales invoices with deliveries to countries within the EU

Causes: 

- The VAT number provided for the contact/company is not valid

- The VAT number is not filled in for invoices within the EU with sales inside EU 

Solutions:

- Edit the contact/company in Teamleader Focus and fill in the correct VAT number (in the correct format) and sync again.

- If the contact/company doesn't have a VAT number, change the VAT type of the articles in Teamleader Focus, because sales inside EU (services) always need a valid VAT number

 

## Failed to create credit note/invoice xxxx / x: "HTML render is blank"

Cause: The country of the customer of the invoice is ‘Unknown'

Solution: Fill in the country of the customer and sync again.

 

## The invoices X and Y have the same booking number

This error can have multiple causes:

- Teamleader Focus is not able to store booking numbers with letters or special characters (f.e.: "F" or "-" or "/").The invoices will be pushed to Yuki, but will be pushed again next synchronisation, because the booking number is missing in Teamleader Focus.

- Multiple company entities have the same book year and invoice structure

- An invoice/credit note with this number was created manually in Yuki

 

If you get this error, please [reach out to our support team](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) to find the cause and corresponding solution.