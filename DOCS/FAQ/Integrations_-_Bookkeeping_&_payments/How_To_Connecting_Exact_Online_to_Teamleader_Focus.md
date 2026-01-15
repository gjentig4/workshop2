---
title: "How To: Connecting Exact Online to Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691221776145-How-To-Connecting-Exact-Online-to-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:24:44Z"
updated_at: "2026-01-09T13:15:33Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Connecting Exact Online to Teamleader Focus

![](https://support.focus.teamleader.eu/hc/article_attachments/25691210920721)

 

Before you make the actual connection between Exact Online and Teamleader Focus, don’t forget to have a look at our article on [‘How do I prepare my Exact Online and Teamleader Focus account for connection?](https://support.focus.teamleader.eu/hc/en-150/articles/25691176976401-How-To-How-do-I-prepare-my-bookkeeping-integration-Exact-Online-Octopus-or-Twinfield-and-Teamleader-Focus-account-for-connection) Depending on your Teamleader Focus and Exact set-up, different preparations are needed. Once you did that, you can start making the actual connection with Teamleader Focus.

*Tip: W**e advise you to use Google Chrome when connecting your Teamleader Focus account to Exact Online.*

 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

Do you prefer to watch our instructive video first? You can do so right here:

![](https://support.focus.teamleader.eu/hc/article_attachments/25691183891985)

* *

## Making the connection

*Before setting up the integration, make sure your user account in Exact Online has access to the following financial rights:*

- *Manage accounts*

- *Enter, modify and delete sales entries*

- *View creditor reports*

- *View debtor reports*

- 
*View financial master data*
 

*If this is not the case, contact Exact Online/your accountant to enable these rights for you.*

 

In Teamleader Focus, click on your icon user in the top right corner and select **Integrations/Marketplace**. You’ll arrive in the Marketplace. Select the ‘Bookkeeping’ category to find Exact Online:

- Connect your account and select the company entity you want to connect.

- Log in with your Exact Online credentials to land in the following overview:![](https://support.focus.teamleader.eu/hc/article_attachments/25691198083345)

- Enter a start date: this defines the date from which Teamleader Focus will synchronise your invoices and credit notes.

- Select the correct division and define both the journal for invoices and credit notes.

- Choose to import all companies and contacts from within Exact Online or not (depending on your set-up).

- Click ‘**Save’**.
*Note: *When connecting Exact Online to Teamleader Focus, make sure to click the Save button only once. The screen won’t visibly change after clicking, but the sync is already triggered in the background. If you click the button multiple times, all companies and contacts will be synced again from Exact Online to Teamleader Focus, resulting in duplicate data that needs to be cleaned up afterwards. After clicking Save once, simply close the setup screen, then return to the integration via the Marketplace to continue with the remaining configuration steps.

 

Next, you will need to link a few things between Teamleader Focus and Exact. The most important part is linking the VAT rates. The VAT rates selected in Exact always need to be of the type ‘Exclusive”, since Teamleader Focus always synchronises the total amount without VAT.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25691203580433)

 

Besides that, you can set an account to post (commercial) discounts and possibly set certain accounts to be suggested automatically when using specific VAT rates (the latter is optional). We advise setting the automatic synchronization only after the connection has been successfully established.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25691219961745)

## Manually activating the synchronisation

Now that the connection is made, you can manually activate the first synchronisation. First, click **Revenue **> **Invoices** in the navigation to synchronise. You will see that a synchronisation symbol is now being displayed in the top right-hand corner.

![](https://support.focus.teamleader.eu/hc/article_attachments/25691211167377)

 

If you click this symbol, the synchronization with Exact Online will be executed. After a while, you will see a notification with the results of the synchronization. If you experience any problems, your first step should be to check these notifications. The synchronization entails both the synchronization of customers linked to invoices or credit notes and the (imported) invoices and credit notes themselves.

 

When entries are reconciled in Exact, the corresponding invoices in Teamleader Focus will be set as paid.

 

Once everything is properly set, you can set the synchronization of customers and invoices to run automatically. Once this is done, the synchronization of invoice payments will run in the background automatically. You can also specify that you want to receive a notification when an invoice is set as paid in this way.

 

Note: When you change the payment status in Exact (e.g. from paid to unpaid), the status in Teamleader Focus will remain 'Paid' unless you change this manually.

 

## Matching payment terms between Teamleader Focus and Exact

 

The payment term used in Teamleader Focus is compared to the terms in Exact Online. Whenever there's no correct match found, the default payment term is used. 

- Default payment term is also used for all credit notes.

- Teamleader Focus doesn't support payment terms with discounts.

- Both Teamleader Focus and Exact Online support "end of month".

- There's a difference between normal payment terms and incasso/direct debit payment terms. This is how you should set up a payment term for direct debit: 

        ![Connecting Exact to Teamleader Focus - Direct debit payment term](https://support.focus.teamleader.eu/hc/article_attachments/25691198225169)

 

## Troubleshooting

Your invoices don't get synchronized or you are encountering errors during the integration? [Read this article for some troubleshooting!](https://support.focus.teamleader.eu/hc/en-150/articles/25697940180369-How-To-Troubleshooting-Exact-Online)