---
title: "How To: Direct debit in Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692319531281-How-To-Direct-debit-in-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T08:01:20Z"
updated_at: "2025-12-09T00:37:19Z"
category: "FAQ"
section: "Revenue"
---

# How To: Direct debit in Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

With Teamleader Focus' subscription module you can set up recurrent invoices. This means your customer will receive invoices at fixed intervals. Some customers also find it more convenient to set up a direct debit, so that they don’t have to worry any more about paying their invoices on time. In this article, you will read all about:

- Setting up direct debit in Teamleader Focus

- Using SEPA with Teamleader Focus

- Following up invoices

 

## Setting up direct debit in Teamleader Focus

If your customer wants to do this, you can put a reference to it on the invoice. 

- When setting up a subscription, you can select ‘Advanced options’.

- There, you will find a slider ‘Direct debit’.

- If you activate this slider and then put the shortcode $STRUCTURED_COMM_MESSAGE$ on your invoice template, your structured message will be replaced on each of your invoices by the following sentence:

 

*“This amount will be charged using the reference X from your account via direct debit.**”*

*![Toggle switches for invoice automation settings: Book directly, Autosend invoice, and Direct debit.](https://support.focus.teamleader.eu/hc/article_attachments/25692272300305)*

This notifies your customer that the invoice will be settled by the direct debit he set up beforehand, so that he has no need to worry about making the payment.

**NB: **Teamleader Focus will only add the notification to the invoice. It does not set up or manage the recurring direct debit itself — this must always be done through your bank. If you want to check the direct debit’s timing or other settings, make sure to review them where you set up the direct debit externally, as this is not handled by Teamleader Focus.

 

## How can I use direct debit (SEPA)?

The Single Euro Payments Area (SEPA) is a payment-integration initiative of the European Union for simplification of bank transfers in euro. It makes it easier to collect invoices from multiple customers at once.

 

There are currently three ways to use direct debit (SEPA) in Teamleader Focus:

 

1. An integration built by our partner Webfresh. With our Teamleader-Mollie integration, your customer invoices are automatically collected. Reduce your administrative burden and ensure a smoother cash flow. [Find out more here.](https://marketplace.focus.teamleader.eu/eu/en/detail/webfresh/automatische-sepa-incasso/75272a)

 

2. An integration built by our partner Twikey. You can [read more about it here](https://www.twikey.com/support/creditor/settings/integrations/teamleader.html). Once connected to Twikey all booked invoices can be send to Twikey immediately for payment, whether your customer is paying through Sepa direct debit, a payment link or even regular transfer.

 

3. If you don't use these integrations, there is an easy workaround. To be able to make it work, you will need the following:

- You need to have export rights (Contact the administrator of your Teamleader Focus account for more info).

- Make sure that the IBAN number is filled out for every customer in your CRM. Otherwise SEPA payments it won't work. 

 

Once you have this, these are the steps you need to follow:

- Go to **Revenue **> **Invoices **and create the segment of the invoices that you want to collect via SEPA

- Click ‘Export**’ **and choose ‘Export to Excel'

- Select the segment you want to export

- In the column selector, choose “new template” and select the fields you want to export.

**Note:** As a compulsory field, you need to select the field 'IBAN account nr'. You might also need other necessary fields, so we recommend that you check [SEPApp documentation](http://www.sepaapp.eu/en/manual/).

  5. Download and install the tool ‘[SEPApp](http://www.sepaapp.eu/en/)’. SEPApp is a tool that will convert your Excel to an XML file that you can upload to your online banking. It’s free up to 60 days and afterwards you pay a one time fee of € 49,90 for unlimited use.

  6. Run SEPApp. Fill in the required information and upload the Excel file into SEPApp. You will need a Creditor-ID. If you do not have this, contact your bank to receive one.

 

![SEPApp interface for configuring SEPA Direct Debits and generating XML files.](https://support.focus.teamleader.eu/hc/article_attachments/25692284484241)

    7. Click ‘Create SEPA file’. An XML file will be stored locally on your computer. It is recommended you check the created file before uploading it onto your online banking. Some banks offer an online tool for this.

       8. If your file is correct, you can upload it into your online banking tool.

       9. After you have uploaded the file into your online banking, all of the invoices in the file will be collected from your customers’ bank accounts.

 

**Note:** this flow will not set up an recurring SEPA payment with your customers. You will have to repeat these steps if you want to collect other invoices via SEPA.

 

## Following up invoices

If some of your customers do pay their recurrent invoices by direct debit, you can find all of the invoices quickly by means of a segment. In Invoices (not Subscriptions), create a new segment with the parameter ‘Direct debit’ ‘equals’ ‘yes’. A list of all the invoices which are paid by direct debit will appear. You can soon check which have been paid, in your bank account!