---
title: "How To: Troubleshooting Exact Online"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25697940180369-How-To-Troubleshooting-Exact-Online"
locale: "en-150"
created_at: "2024-06-06T10:42:25Z"
updated_at: "2026-01-09T13:16:06Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Troubleshooting Exact Online

![](https://support.focus.teamleader.eu/hc/article_attachments/25697938946321)

In this article we'll give you an overview of the more common errors you can encounter in the integration between Exact Online and Teamleader Focus.
 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

- [No changes found](#No-changes-found)

- [Invoices X and Y have the same booking number](#Invoices-X-and-Y-have-the-same-booking-number)

- [Invalid VAT number](#Invalid-VAT-number)

- [The account number X could not be found in Exact Online](#The-account-number-X-could-not-be-found-in-Exact-Online)

- [No match was found in Exact Online for the VAT rate X](#No-match-was-found-in-Exact-Online-for-the-VAT-rate-X)

- [There are X documents which have unspecified ledger accounts](#There-are-X-documents-which-have-unspecified-ledger-accounts)

- [Province not found](#Province-not-found)

- [Invalid email address](#Invalid-email-address)

- [Journals can't be found when setting up the integration in the Marketplace](#Journals-can't-be-found-when-setting-up-the-integration-in-the-Marketplace)

- [External ID does not match](#Bad-customer-ID)

- [Invoice is shown twice in Exact Online](#Invoice-is-shown-twice-in-Exact-Online)

 

**Note**: If you received another error that isn't mentioned in this article, please [reach out to us](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) and don't forget to add the screenshot of the error you received. We'll be happy to help. 

 

To **load the current error messages** in your account, click on the bell icon and delete the notifications. Then, click on the double arrows to start the synchronisation again. You'll then see the latest error(s).
![](https://support.focus.teamleader.eu/hc/article_attachments/25697914743185)

 

## No changes found

If you see this error, please [send us a ticket](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065), so we can check the logs. Don't forget to mention that Exact Online is the bookkeeping tool that you're using.

 

## Invoices X and Y have the same booking number

If you received this error, please read [this article](https://support.focus.teamleader.eu/hc/en-150/articles/25691742261521-FAQ-What-do-I-do-with-the-error-message-The-invoices-X-and-Y-have-the-same-booking-number) for more information. 

 

## Invalid VAT number

- Belgian customer: the number should have the following format: BE0999999999 or BE1999999999
One block of 10 characters, the first character after the prefix is always 0 or 1 (for example BE0000000097)

- Dutch customer: the number should have the following format: NL999999999B99
One block of 14 characters, the 12th character should always be B (for example NL000000000B00)

- French customer: the number should have the following format: FRXX 999999999
One block of 2 characters + one block of 9 numbers (for example FR12 000000000)

- Italian customer: the number should have the following format: IT99999999999
One block of 11 characters (for example IT00000000000)

- Spanish customer: the number should have the following format: ESX9999999X
One block of 9 characters, the first and last characters can be a letter or a number but both can't be numerical (for example ES00000000T)

- Swiss customer: the number should have the following format: CHE-999.999.999 TVA
One block of CHE- and 9 numbers followed by TVA/MWST/IVA (for example CHE-000.000.000 TVA)

 

## The account number X could not be found in Exact Online

To solve this error, please create this account number in Exact Online or choose another one. 

 

## No match was found in Exact Online for the VAT rate X

You can set this VAT rate by clicking on your user icon > integrations/Marketplace > Manage > Exact Online > Select company entity > link VAT codes to Exact Online. 

 

## There are X documents which have unspecified ledger accounts

 

There are 2 ways to resolve the unspecified ledger accounts error:

- Click on the error message about unknown accounts; at the bottom you will see links to invoices / credit notes. Open the invoice links 1 by 1 and enter a ledger account where you see 'no accounts' by editing the invoice (clicking on the pencil next to 'content'), and **Save**.

![](https://support.focus.teamleader.eu/hc/article_attachments/25697924185361)

- If your ledger accounts are related to your VAT rates, you can do this in bulk via **Settings **> **Revenue **> ledger accounts> Auto-suggest accounts at certain VAT-tariffs.

 

## Province not found

This error can mean 2 things: 

- the country of the synchronised contact or company does not match with the provided VAT number.

- the address of the contact/company in Teamleader Focus doesn’t match with the address in Exact Online.

To solve this issue, you can change the address (country) to match the VAT number or change the VAT number to match the country. 

 

If that didn't solve your problem, please [send us a ticket](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) so we can check this for you.

 

## Invalid email address

This means the email address of your customer isn't valid. Please change or remove the email address.

 

## Journals can't be found when setting up the integration in the Marketplace

The linked Exact Online user has not enough rights to see the journals in Exact Online. Enable (or let the accountant do this) the correct rights in Exact Online : Master data > Users > Overview > NAME > Rights > Financial > View financial master data.

 

## External ID does not match

*"The relation #RELATION_NAME# could not be synced to Exact Online because the external ID does not match. Visit the support centre article "Troubleshooting Exact Online" to find out how to resolve it."*

This error message means that the external ID in Teamleader Focus no longer matches the ID of the relation (customer) in Exact Online.

 

Possible causes:

- The relation linked to the ID has been deleted in Exact Online (and a new one has been created manually).

- The relation linked to the ID is merged with another relation and the other ID is saved

- The entire administration was copied to a new administration (with an XML file), the relations will look the same in the new administration, but will have a different ID.

- The user who installed the integration does not have enough read/write rights in his EOL account.

- The integration was linked to another Exact Online administration, without first disconnecting the customers.

 

Solution: Adjusting the field 'External ID' in Teamleader Focus with the correct ID
*Note: this field on a contact/company page is only visible by admins of the account.*

*! If you're not 100% sure how to proceed or not comfortable with the process, please contact us at *[*support *](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065)*so we can go through the solution together !*

- Search by contact/company name in the general search field of Exact Online

- Open the customer page with a Ctrl+click on the client number.

- The ID can be found in the URL of the customer page between '**% 7b**' and '**% 7d**' in the URL.
In this example: [https://start.exactonline.be/docs/CRMAccountCard.aspx?_Division_=115673&AccountID=%7bcffa85f6-c82c-45cb-bd4e-d0b1df64014b%7d,](https://start.exactonline.be/docs/CRMAccountCard.aspx?_Division_=115673&AccountID=%7bcffa85f6-c82c-45cb-bd4e-d0b1df64014b%7d,) the ID is cffa85f6-c82c-45cb-bd4e-d0b1df64014b

*Note: In some accounts, there's a **curly bracket** instead of '% 7b' and '% 7d'. So for the above example the URL would be: https://start.exactonline.be/docs/CRMAccountCard.aspx?_Division_=115673&AccountID=**{**cffa85f6-c82c-45cb-bd4e-d0b1df64014b**}***

 

- Copy the ID

- Paste the ID in the field 'External ID' of the contact/company in Teamleader Focus where the problem occurs. You can do this by searching the contact/company > open the page > click on the pencil next to 'Company information'. Save the contact/company.
![](https://support.focus.teamleader.eu/hc/article_attachments/25697914846225)

- Perform a [manual synchronization](https://support.focus.teamleader.eu/hc/en-150/articles/25697904813329-FAQ-What-if-my-invoices-aren-t-synchronised-to-my-bookkeeping-tool), and repeat the steps for other customers with this error message

Notes

- If you don't find the contact/company in Exact Online, you need to empty the external ID, so a new relation can be created in Exact Online

- When searching on contact/company name in Exact you might be automatically redirected to the customer page. In this case it is best to search for only part of the customer name, and choose 'Starts with', so that you can open a new browser (as described in the steps above) with Ctrl+click

- If you've verified everything and confirmed that the ID in Exact Online matches the External ID in Teamleader Focus, then this is not the solution you're looking for. You'll need to check for duplicate entries in both Exact Online and Teamleader Focus.

 

## Invoice is shown twice in Exact Online

If you encounter this problem, [please read this article for more information](https://support.focus.teamleader.eu/hc/en-150/articles/25693702327057-FAQ-What-if-my-invoice-credit-note-is-shown-twice-in-Exact-Online).