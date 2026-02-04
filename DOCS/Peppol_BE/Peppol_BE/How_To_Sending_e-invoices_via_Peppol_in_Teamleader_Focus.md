---
title: "How To: Sending e-invoices via Peppol in Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/30085139646225-How-To-Sending-e-invoices-via-Peppol-in-Teamleader-Focus"
locale: "en-150"
created_at: "2024-11-15T09:56:55Z"
updated_at: "2025-11-14T16:02:12Z"
category: "Peppol 🇧🇪"
section: "Peppol 🇧🇪"
---

# How To: Sending e-invoices via Peppol in Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)
An important part of the Belgian regulation around e-invoicing is that you have to send B2B invoices through the Peppol network. We have provided for this directly in Teamleader Focus. Read this article to learn how to send e-invoices via Peppol in Teamleader Focus.
 

- [Enable Peppol](#01JCQKXFAWM1MVNQ3SKC92MT8D)

- [Send invoices via Peppol](#01JCQKXFBSEB6FGD1W3KNVECBR)

- [Sending invoices vs bookkeeping](#01JCQKXFJ5T4BSHSERDWT8CHDN)

- [Sending e-invoices in Europe](#01JCQKXFJA95EZZ76GTJMB94H0)

- [E-invoice sent but not received](#h_01K2M3MVXW5G67AXJPNQ01EXV1)

 

# Enable Peppol

In order to send invoices through Peppol in Teamleader Focus, you need to make sure Peppol is enabled in your account. [Follow the instructions in this article to enable Peppol. ](https://support.focus.teamleader.eu/hc/en-150/articles/25693204310673-How-To-What-is-E-invoicing-and-how-do-I-send-invoices-via-the-Peppol-network)
 

You can **send invoices from multiple instances/tools if you want.** This means that next to from Teamleader Focus, you could technically also use additional tools to send your invoices from. As for **receiving **invoices, you can **only enable Peppol in one software tool**. [Find more information in this article.](https://support.focus.teamleader.eu/hc/en-150/articles/28079545197713-How-To-Receiving-e-invoices-via-Peppol-in-Teamleader-Focus)
 

# Send invoices via Peppol

Follow these instructions to send an invoice through Peppol:

- Go to **Revenue **> **Invoices**

- 
**Click **on the invoice you want to send via Peppol
*Make sure this is a booked invoice.*

- Click on **Send**

- 
Choose **Send via Peppol network**

![The 'Send invoice' dialog box showing four different delivery methods in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/30081623183249)

To be able to send an invoice via the Peppol network there are a few conditions:

The invoice you created is for a *Belgian or Luxembourg *company entity in your account, for which you have enabled Peppol

- The customer of your invoice needs to be Belgian, Dutch or Luxembourgish.

- 
The customer of your invoice needs to have a valid VAT or KBO number filled out on their contact/company page
! Note that you can also choose a different Peppol identifier for your customer, like a GLN or DUNS number. Read all about it [here](https://support.focus.teamleader.eu/hc/en-150/articles/33778228489489-FAQ-Can-I-choose-a-different-Peppol-identifier-for-my-customer).

- 
Your customer must also be registered on the Peppol network. We will automatically look for your customer in the Peppol database and let you know when we couldn’t find the customer on Peppol:

![Selection screen for sending an invoice via Peppol or email, showing a Peppol registration warning.](https://support.focus.teamleader.eu/hc/article_attachments/30085119930897)
If they’re not (yet) registered on Peppol, you can still send your invoice via the regular channels (email, by post,...)
 

- If all conditions are met, click on **Send**

- 
**Attachments: **by default, the PDF of your invoice will be attached when you send the invoice. You can also add additional attachments by clicking **Add attachments **here. If your invoice is based on time tracking then you can select the time tracking document in PDF/.xlsx here, or you can choose a file from your computer.

![The 'Send via Peppol network' dialog for sending invoices with attachments in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/38842662628753)

Some things to point out as for sending attachments: 
- The amount of attachments is limited to 5 (the pdf of the invoice itself + 4 additional attachments).
- The total file size of all the attachments is limited to 100MB. 
- Only these file types are supported: PDF, PNG, JPG ,XLSX and CSV.
- The result will be one UBL file in which the attachments are embedded.

Notes:

You can only send your invoice once through Peppol.

Sending an invoice through Peppol means it gets booked in your customer’s bookkeeping or invoicing software. Sending it again would create a double.

- 
If you need to make textual corrections to the invoice or the customer did not pay, [you can send an email reminder](https://support.focus.teamleader.eu/hc/en-150/articles/25691492744849-FAQ-How-can-I-send-a-reminder-of-an-invoice-in-Teamleader-Focus) stating the invoice was already sent via Peppol. You could also include the original invoice as a PDF again.

- Given everything is official, you should therefore also create and send a credit note via the Peppol network in case you made a mistake on your e-invoice.

- 
[Sending invoices in bulk ](https://support.focus.teamleader.eu/hc/en-150/articles/25693422005649-How-To-Performing-bulk-actions-on-your-invoices)via Peppol is not yet possible in Teamleader Focus.
 

- 
After your invoice was sent, you can **receive **a ‘response’ from your customer. 
 

Note that you can only receive responses or status updates from the e-invoices you sent if you also enabled Peppol **for receiving e-invoices **in your account. This means that if you've enabled Peppol for sending only you won't receive these updates and responses. [Read all about receiving e-invoices in Teamleader Focus here.](https://support.focus.teamleader.eu/hc/en-150/articles/28079545197713-How-To-Receiving-e-invoices-via-Peppol-in-Teamleader-Focus)

You can consult the response in Teamleader Focus via the **Peppol status** of your e-invoice. This is an external status of the progress/status of your invoice:

Sending

- Sent

- Sending failed

- Accepted

- Refused

- On hold

- 
Payment initiated

Note that it is your customer who determines this status. This means that if the Peppol status of your invoice is ‘Payment initiated’, it does not mean Peppol verified the payment, or the payment is really done. If you use a [payment integration via Ponto for example](https://support.focus.teamleader.eu/hc/en-150/articles/25697624265361-How-To-Setting-invoices-to-paid-with-Ponto), then it’s still via Ponto that the invoices get set to paid in Teamleader Focus and not via Peppol. 

You can consult the Peppol status either via:

The invoice page itself:
The status of your invoice will be visible on your invoice page. The customer can also provide an additional message, which will appear on the invoice detail page below ‘Peppol status’.

![The Info widget of an invoice in Teamleader Focus showing Peppol status and payment actions.](https://support.focus.teamleader.eu/hc/article_attachments/30085139628433)

Additionally, the Activities of your invoice will be updated according to the Peppol activity:![Timeline entry in Teamleader Focus showing a refused Peppol invoice notification.](https://support.focus.teamleader.eu/hc/article_attachments/30094240161681)
 

- 
Your invoices overview: 
Via the cogwheel, add the column ‘Peppol status’ to your invoices overview. 
 

As sender of the invoice you’ll also receive notifications about the invoice (e.g. that it was refused together with the reason why), both via email and via the notification bell in Teamleader Focus. 

![Email notification from Teamleader Focus stating an invoice was refused via Peppol.](https://support.focus.teamleader.eu/hc/article_attachments/30094240164241)

## 

Mobile app

Sending your invoices via Peppol is also possible via the mobile app.

# 

Sending invoices vs bookkeeping

What if you have an integration with a bookkeeping tool via Teamleader Focus? No problem! You can still sync outgoing invoices to your bookkeeping software via Teamleader Focus, even if they are sent via Peppol. 
 

# Sending e-invoices in Europe

To recap; the Belgian regulation around e-invoicing is that you have to send B2B invoices through the Peppol network. 
 

But what about other countries? What if you send B2G? Or if you’re a French company sending invoices to a Belgian company? 

- **Invoices to the Belgian, Dutch government and Luxembourg government (B2G) should also be sent through Peppol. **Know that for Belgium and the Netherlands, this is also possible in Teamleader Focus as we can identify these government instances too. This means that for Belgium you don’t need to manually upload invoices to Mercurius anymore like in the past.

- As for **sending invoices to non-Belgian countries**, you can still use regular **email**.

- Only Belgian companies need to send via Peppol to Belgian companies. As a **Dutch, French, German,** …** company** you can send invoices to your** Belgian customer via email.**

 

# E-invoice sent but not received

When you send an invoice via Peppol but the recipient claims they haven’t received it, there are several things you can check to identify the cause and resolve the issue. [Read all about it here.](https://support.focus.teamleader.eu/hc/en-150/articles/38089998568337-FAQ-What-if-my-Peppol-invoice-was-sent-but-not-received)

 

Read this article but still have questions? [Be sure to check out our Peppol FAQ here! ](https://support.focus.teamleader.eu/hc/en-150/articles/30083675838609-Frequently-Asked-Questions-Peppol)