---
title: "How To: Setting invoices to paid with Ponto"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25697624265361-How-To-Setting-invoices-to-paid-with-Ponto"
locale: "en-150"
created_at: "2024-06-06T10:32:26Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Setting invoices to paid with Ponto

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

You receive payments for invoices on your bank account regularly, but still need to adjust the payment status of your invoices in Teamleader Focus manually? This integration will save you time!

 

[Ponto ](https://marketplace.teamleader.eu/eu/en/detail/isabel-group/ponto/8f0cd0)bridges the gap between your professional bank accounts and Teamleader Focus so your **invoices are automatically reconciled**. The Ponto integration matches your transactions **4 times a day** (at 03h00, 09h00, 15h00 and 21h00) with your sales invoices. This means no more manually checking every bank account to see if your invoice has been paid.

 

 

![Graphic banner with the text 'Teamleader Focus & Ponto' on a teal and white background.](https://support.focus.teamleader.eu/hc/article_attachments/25697595312529)

 

## Available bank connections

You can connect accounts of the following banks: [https://myponto.com/en/reach](https://myponto.com/en/reach)

 

## How to activate

In order to activate your integration you can follow these steps:

- Register with your VAT-number at [https://dashboard.myponto.com/sign-up](https://dashboard.myponto.com/sign-up)

- Click on the tab “Accounts” > “Add account” to input your bank accounts

- Go to Teamleader Focus and click on your profile picture in the right upper hand corner > **Integrations/Marketplace**

- Look for [Ponto](https://marketplace.teamleader.eu/eu/en/detail/isabel-group/ponto/8f0cd0), add the integration and log in with you Ponto details

 

Your integration is now active. You can disconnect the link with your bank accounts at any time via [https://dashboard.myponto.com/live/accounts](https://dashboard.myponto.com/live/accounts)

 

## Pricing

The maximum amount to be paid per month per bank account connected is 4 euros.

 

## Partial payments

Payments received through Ponto are matched based on the payment reference. For Belgium this is the structured communication (+++xxx/xxxx/xxxxx+++) and for other countries this is the invoice number (2023 / 1). If the references match, the payment will be added to the invoice in Teamleader Focus.

 

The invoice in Teamleader Focus will only get the status 'paid' when the full amount has been paid.

 

## Important remarks

Please take these remarks into account when setting up the integration with Ponto.

- The country of the customer has to be filled in.

- You need a VAT-number to be able to use the integration.

- If you have several [company entities](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus) in Teamleader Focus, the integration automatically works for all entities and not only your default company entity. You don't have to link the other company entities manually.
Note: For customers outside Belgium the invoice number has to be unique across all company entities. For this reason, we advise to set up a different fiscal year prefix or invoice number structure for each company entity. See [this article](https://support.focus.teamleader.eu/hc/en-150/articles/25691346944657-FAQ-Can-I-choose-the-numbering-of-my-invoices-in-Teamleader-Focus) for more information.

- Things to check if your invoices are not being set to paid:

The integration works based on the payment reference: if your customer does not use the (correct) payment reference when paying the invoice, the invoice will not be set to the status 'paid' in Teamleader Focus.

- It is legally required to authenticate a bank account at least every 90 days in Ponto, otherwise the integration might stop working. In most cases users will receive an email once the authorization has expired. To authenticate, click on your** user icon** in the top right-hand corner >** Integrations/Marketplace** > **Manage** > go to Ponto and click on **Settings**.
Note: Payments that have been made during a period of non-authentication will not be pushed through retroactively.

- Check whether your bank account is still visible in the Ponto interface.

- There is an issue with your bank's API.

- You need a paying Ponto account in order to use the integration.

 

*Note*: Did you check all the remarks mentioned above and is your invoice still not put on paid in Teamleader Focus but already paid in Ponto? Please [reach out to us ](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065)and send us a screenshot of the payment in Ponto with the payment reference and the number of the invoice in Teamleader Focus.