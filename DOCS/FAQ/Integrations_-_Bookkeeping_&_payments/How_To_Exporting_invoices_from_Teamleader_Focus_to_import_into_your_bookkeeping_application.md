---
title: "How To: Exporting invoices from Teamleader Focus to import into your bookkeeping application"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692666955153-How-To-Exporting-invoices-from-Teamleader-Focus-to-import-into-your-bookkeeping-application"
locale: "en-150"
created_at: "2024-06-06T08:10:00Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Exporting invoices from Teamleader Focus to import into your bookkeeping application

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

This article does not apply for you if you are using one of our two-way bookkeeping synchronisations but if you use a one-way connection between Teamleader Focus and your bookkeeping program. In this article, you find an overview of all [available bookkeeping programs](https://support.focus.prd.teamleader.eu/hc/en-us/articles/25691318213393) for your country.

 

In this article, you will get to know all about the following:

- Preparing your Teamleader Focus account

- Exporting the invoices

- Uploading the invoices into your bookkeeping program

####  

## Preparing your Teamleader Focus account

This step is two-fold: Managing external IDs and setting up ledger accounts.

 

### Managing external IDs

From the moment you begin working with Teamleader Focus, the idea is to manage your customers from Teamleader Focus and send them to your accounting package. Therefore, no new customers should be entered in your accounting package. Teamleader Focus matches your customers based on their External ID. Therefore, we recommend to import your customer data from your accountancy program into Teamleader Focus.

- Export a list of your bookkeeping program including the bookkeeping number.

- Check this [article on importing contacts and companies](https://support.focus.teamleader.eu/hc/en-150/articles/25691800529297-How-To-Importing-contacts-and-companies-to-Teamleader-Focus) and import your file. Ensure here that you match the field "External ID". This field is only visible by admins. If you don't see it, go to **Revenue **> **Invoices **> **Export **> **B****ookkeeping export **> **Manage ****external ****IDS **> enable the slider next to 'Manually editable'

- You may already have imported your companies and now there are duplicates in your database (because the company names were not exactly the same). 

- You can remove the duplicate records by [undoing the import](https://support.focus.teamleader.eu/hc/en-150/articles/25691345461777-FAQ-How-can-I-undo-an-import-of-contacts-or-companies-in-Teamleader-Focus) (only new companies will be deleted; those companies for which an external ID had already been entered, will not be deleted). 

- Next, you can go over the other companies manually and enter the external ID. In order to see directly which customer has an ID and which one not, go to your **CRM** > **Companies** > Dropdown menu next to the looking glass > **Create new segment**. In this segment, you choose the rules: "External ID" is not filled out. That way, you see all companies without an id. If these are companies/contacts that are already present in the accounting package, you must enter the external ID per customer manually by looking up the external ID in the file of your accountant.

- Once all external IDs are imported from your accounting package, you can indicate that the new external IDs should be created automatically with the export. More on that in step 2.

- From now on, Teamleader Focus will create the external IDs sequentially, beginning at a start value that you specify. For security reasons, this value is 100000 by default. First consult your accountant before lowering this value, or you run the risk that existing customers from your accounting package are overwritten!

Notes:

- If you do not yet have any customers in your accounting package, select the "Generate automatically" option when exporting your invoices. More on that in step 2.

- If you only have a small number of customers (< 30) in your accounting package that have to be entered into Teamleader Focus, you can, instead of importing, simply go over and edit the relevant customers and populate the "External ID" field.

### Setting up ledger accounts

It is necessary that every position on your invoice is assigned to the right ledger account.

- Go to **Settings** > **Revenue **> **Ledger accounts**

- Create all ledger accounts, you use. Note that if you use commercial discounts, you must also indicate an account for discounts.

- After creating your accounts, you can select "**Auto-suggest accounts at certain VAT-tariffs**". Here you can set that your invoice line will automatically select a specific account when a VAT rate is selected.

- You can also quickly set the accounts on the basis of the VAT rates for all your existing invoices in Teamleader Focus so that you do not have to go through them manually.

 

## Exporting the invoices

- Go to **Revenue **> **Invoices** and click on **Export** in the right hand corner.

- Choose ‘**Bookkeeping export**’.

- The following screen allows you to specify the period of which you want to export your invoices and also lets you select your own bookkeeping program.

- Before you continue, you can choose to manage your external IDs. Check above for more information.

- Next, the cost calculations will be performed. Because these are bookkeeping programs with which we do not have a two way sync with, **a fee of € 0.12 per invoice will be charged**. This amount is collected through your [Teamleader Focus wallet](https://support.focus.teamleader.eu/hc/en-150/articles/25691506715921-FAQ-What-can-I-do-with-the-credits-in-my-Teamleader-Focus-wallet). An invoice is only charged once, so if something goes wrong with the export, you will be able to export the same invoices for free the next time.

- 
If you continue with the import, you will arrive at a screen where a number of parameters must still be provided with input. Many of these parameters differ from package to package, but the following are (almost) always present:

• *VAT:* On total/On lines. Teamleader Focus calculates the VAT per line so always select "On Lines" here.
• *Customers:* Select Export customers too. This will ensure that customers are also exported.
• *Invoice journal:* this is the code of the journal to which your invoices are posted.
• *Credit note journal:* the journal where credit notes are posted. This can be the same as the journal for the invoices

Other parameters depend on the accounting package that you use. If there are parameters that you do not understand, please contact [our support](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065).

- Once you have entered the correct parameters, a screen will be displayed where you will see your customers and invoices. If there are no errors, you can press "**Next**" and the file will be downloaded.

 

## Uploading the invoices into your bookkeeping program

The file you just downloaded can be sent to your accountant to be imported. This step depends on your bookkeeping program.