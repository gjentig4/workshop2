---
title: "How To: Use QR codes on your Teamleader Focus invoices"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25695246134545-How-To-Use-QR-codes-on-your-Teamleader-Focus-invoices"
locale: "en-150"
created_at: "2024-06-06T09:25:00Z"
updated_at: "2026-01-02T12:19:14Z"
category: "FAQ"
section: "Revenue"
---

# How To: Use QR codes on your Teamleader Focus invoices

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

*E-invoicing is set to become mandatory in all European countries by 2030.*
*For Belgium, e-invoicing already became mandatory on 01/01/2026.** Find out all about e-invoicing and enabling **Peppol ***[*here *](https://support.focus.teamleader.eu/hc/en-150/articles/25693204310673-How-To-What-is-e-invoicing-and-how-do-I-enable-Peppol-in-Teamleader-Focus)*or *[*set it up in Teamleader Focus.*](https://focus.teamleader.eu/settings.php#company_information)
 

In this day and age people like to be as efficient as possible and our goal is of course to let you and your customers work smarter. Get paid even faster by putting a SEPA QR code on your invoice. Read everything about it here.

 

## What

Teamleader Focus supports SEPA QR codes meaning that this is a QR code you can put on your invoice. Customers can scan this QR code **with their bank app** to pay you even faster. Scanning it with their normal camera or QR code scanner won't work.

An example of a QR code:

![QR code with a lightning bolt logo in the center for mobile app pairing or authentication.](https://support.focus.teamleader.eu/hc/article_attachments/25695288807057)

 

The SEPA QR code:

- Can be seen as a payment request in QR form, and can be scanned with (most) bank apps.

- Is a European standard, currently mostly adopted in Belgium, the Netherlands, Germany, Austria and Finland.

- Is completely free, there are no transaction costs.

- Can be added to the invoice documents using a shortcode, which you can read about below

 

**Providers that aren’t supported:**

- iDeal

- Payconiq

 

The QR code will be generated with the (financial) information we got from you:

- The company name you filled out in **Settings > Company information > Company details**

- The bank account number you filled out in** Settings > Company information > Payment information**:
*Note: if your payment information isn't filled out, we won't be able to generate a QR code.*

**![The Payment information step in the 'Fill in company information' setup wizard in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25695226362129)**

- The amount incl. VAT that your customer has to pay

- The structured communication of the invoice

- The date of the invoice

 

## How

To put a SEPA QR code on your invoice, follow these steps:

    - 
      Go to
      **Settings > Document Layout > Invoices**
    

    - 
      Click on
      **View shortcode****s**
    

    - 
      You can choose between the following shortcodes, depending on if you
      want to have a QR code with or without instructions:
      ![Shortcodes for adding SEPA payment QR codes to document templates in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25695260203281)
    

    - 
      Copy the shortcode and paste it in the Word template of your invoice,
      e.g. $SEPA_QR_CODE$
    

    - 
      Save the Word document and upload your invoice template to Teamleader
      Focus
    

    - 
      Create an invoice, make sure it's booked

      *Note: QR codes aren't shown on draft invoices.*
    

    - 
      Depending on the shortcode you chose and where you placed it, the final
      document will look something like this:
      ![Example of a Teamleader Focus invoice document showing line items, VAT calculation, and a QR code.](https://support.focus.teamleader.eu/hc/article_attachments/25695260244113)
    

    - That’s it, now go and get paid!

  
 

## Notes

- The shortcode for the QR code can’t be placed in the header or the footer of your invoice template

- Alternative bank accounts: if you use multiple bank accounts the bank account you select when creating the invoice with a QR code, will be the one on which you receive the payment

- The SEPA QR code feature is not linked to any payment integrations (e.g. Mollie): this also means that the payment status of the invoice won't be updated after the customer paid the invoice 

- The QR code functionality is only available for invoices in Euro

- QR codes won't show up for negative or zero invoices

- 
If your bank or payment provider doesn't support the QR code functionality, you could make use of our [Mollie integration](https://support.focus.teamleader.eu/hc/en-150/articles/25695285354513-How-To-Paying-invoices-online-with-Mollie-Stripe) and create QR codes that way. [Read more about this in their documentation.](https://docs.mollie.com/payments/qr-codes)