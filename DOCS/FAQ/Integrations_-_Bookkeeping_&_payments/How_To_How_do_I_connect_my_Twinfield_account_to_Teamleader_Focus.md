---
title: "How To: How do I connect my Twinfield account to Teamleader Focus?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691300242705-How-To-How-do-I-connect-my-Twinfield-account-to-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:27:47Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: How do I connect my Twinfield account to Teamleader Focus?

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

The connection with the Twinfield accounting package is an in-depth integration. Read everything about it here.

 

Note:

- The connection with Twinfield exports invoices and credit notes from Teamleader Focus to Twinfield, so that the bookkeeping can be done there. With that purpose in mind, the customers linked to these invoices are first exported to Twinfield. 

- You manage ledger accounts in Twinfield, and for each synchronization they are retrieved from there.

## Activating the Twinfield connection

**Note:** to use this integration, you'll need at least the "**Bookkeeping Plus**" subscription (level 4). Not sure which version you have? Contact your accountant or Twinfield. 

 

**Twinfield strongly recommends not to link an admin account (level 1) to Teamleader Focus.** This because a level 1 user can do everything in Twinfield; not only creating bookings, but also mutate users and administrations (for example delete them). Imagine that you've linked with a user that is level 1, and the product is hacked or employees have access to this information, then that person can do unwanted things.

 

1. To connect with Twinfield, go to "**Integrations/**[**Marketplace**](https://marketplace.teamleader.eu/eu/en)".

2. In the Marketplace, search for and select '**Twinfield'**.

3. To make the connection, enter the following data:

- 
**Starting date**: select from which date Teamleader Focus should sync invoices. Normally, this will coincide with the start of your fiscal year.

- 
**Username & password**: your Twinfield username and password.

- 
**Organisation**: this is an extra login field Twinfield uses to identify you. (You received this when creating your Twinfield account.)

4. Once you've entered everything, click "**Connect administration**". 

 

You'll now be able to choose which Twinfield administration you want to connect to Teamleader Focus. 

**Tip: **we recommend you import your existing Twinfield companies in Teamleader Focus. (this will ensure there are no duplicates in Twinfield when exporting invoices)

5. Click "**Save**". The connection will be made and companies will be imported into Teamleader Focus. 

 

Now you can still set three things:

 

- 
**Link your VAT codes to Twinfield: **ensure that your VAT codes in Twinfield and Teamleader Focus correspond. 

- 
**Default settings for account numbers:** here, you can compare all you accounts in Teamleader Focus with those in Twinfield. If there are invoices for which an account has not yet been defined, you can automatically assign one by using the slider at the bottom.

- 
**Automatic synchronisation:** by using this, you won't need to start syncing between Twinfield and Teamleader Focus manually. This sync will run every night and you can choose to be informed about new payments.

## Exporting invoices

You can now export invoices to Twinfield:

- Navigate to **Revenue** > **Invoices**.

- Click the **synchronisation symbol** at the top of your screen (2 arrows).

Invoices will be sent to Twinfield and you'll receive a notification when the sync has been completed. You'll see how many invoices were exported, and how many customers have been created in Twinfield. 

 

**Note:** if the sync failed for specific invoices, you'll see a notification. For instance: Teamleader Focus may contain several invoices or credit notes with undefined accounts. You'll see for which cases, and you'll be able to edit them right away.

 

![Error message for Twinfield integration regarding invoices with undefined booking accounts.](https://support.focus.teamleader.eu/hc/article_attachments/25691283714449)

 

**Note**: Twinfield uses only one journal to save invoices and credit notes while Teamleader Focus numbers invoices and credit notes separately. This means that the invoice numbering in Twinfield will no longer correspond with the first credit note in Teamleader Focus.

## Invoices in Twinfield

You'll find exported invoices in Twinfield as **draft entries**. (Accounting Draft entries)

 

All invoices are saved as draft entries, as you cannot modify final entries in Twinfield. **To convert draft entries to final entries, select the green flag on the left.**

## Reconciling invoices

If you reconcile invoices in Twinfield (in other words, set them as paid), this will be updated in Teamleader Focus. 

- To reconcile invoices in Twinfield, go to **Accounting** > **Reconcile**.

- Here, you can set accounts receivable (sales invoices) to Paid. (you'll first need to save invoices as final entries)

 

**Note**: When you change the payment status in Twinfield to 'unpaid', the status in Teamleader Focus will remain 'Paid' unless you change this manually.