---
title: "How To: Set up InvoiceCloud"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692202362257-How-To-Set-up-InvoiceCloud"
locale: "en-150"
created_at: "2024-06-06T07:58:26Z"
updated_at: "2026-01-02T12:17:33Z"
category: "FAQ"
section: "Revenue"
---

# How To: Set up InvoiceCloud

![](https://support.focus.teamleader.eu/hc/article_attachments/25692172178961)

*E-invoicing is set to become mandatory in all European countries by 2030.*
*For Belgium, e-invoicing already became mandatory on 01/01/2026.** Find out all about e-invoicing and enabling **Peppol ***[*here *](https://support.focus.teamleader.eu/hc/en-150/articles/25693204310673-How-To-What-is-e-invoicing-and-how-do-I-enable-Peppol-in-Teamleader-Focus)*or *[*set it up in Teamleader Focus.*](https://focus.teamleader.eu/settings.php#company_information)
 

InvoiceCloud is a platform that allows your customers to see, download and pay their invoices online. For the latter, you need to activate the integration to allow customers to choose their preferred method of payment via the services of Mollie and Stripe.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25692166794769)

 

In this article you'll learn how to use InvoiceCloud:

- Give your customers access to InvoiceCloud

- Sending your invoice

- InvoiceCloud

- Paying invoices online: Mollie & Stripe

 

## Give your customers access to InvoiceCloud

Similar as with [CloudSign](https://support.focus.teamleader.eu/hc/en-150/articles/25690878232593-How-To-Digital-signing-of-your-quotations-with-CloudSign) when it comes to sending quotations to your customers, the same can be set up when sending invoices via email to a customer: in the email body you can include a parameter that will be converted into a link when the customer receives it. Through this link the customer will arrive to their unique InvoiceCloud platform, where they will be able to see all the current and past invoices and their statuses, they will be able to download them and pay them online (if you set up this integration).

 

To include the link to InvoiceCloud in your email templates, follow these steps:

- Navigate to **Settings **> **Revenue **> **Email templates for invoices**

- Click on the **+ **symbol

- Create your template and add the parameter #LINK somewhere in your email body.
*Note*: You can also use and/or edit the default templates that Teamleader Focus has created already on your account.

 

## Sending your invoice

When sending the invoice to your customer, make sure you select a template with the above mentioned #LINK in it. During sending, #LINK will be replaced by in the mail editor.

    The email your customer receives will look like this:
    ![](https://support.focus.teamleader.eu/hc/article_attachments/25692157342097)
  

- The parameter #LINK will have changed automatically to the sentence “View this invoice”;

- The online invoice itself will be visible and clickable via a thumbnail;

- The PDF of your invoice will be attached to the email.

 

### Layout of the email

You can slightly change the above layout of the invoice email by navigating to **Settings **> **Email **> **Preferences**. Disable the toggle ‘Use Teamleader design for outgoing emails’ here if you’d rather use your own layout. Keep in mind that this will cause the above thumbnail and background to disappear and only display ‘plain text’.

 

## InvoiceCloud

After your customer clicked the InvoiceCloud link, they see a page similar to this one:
![](https://support.focus.teamleader.eu/hc/article_attachments/25692184465553)

You can customise your logo and the colours of your interface to your liking. Read more about it [here](https://support.focus.teamleader.eu/hc/en-150/articles/25690839495441-How-To-Personalising-Teamleader-Focus-cloud-platforms). Additionally, the interface is mobile-friendly and will always be in the language of the customer. The browser tab will mention the name of your company entity as well.

 

It's always possible to copy the InvoiceCloud link to preview what it looks like for your customer for example or to send it to someone. Go to the invoice in your Teamleader Focus account, click on the **three dots **next to 'Info' and choose **Copy InvoiceCloud link**. Open the link in a new tab to preview the environment.

 

On the actual platform, you'll have a few options.

    - 
      Logically, your customer can check the
      **content of the invoice **you
      sent them.  
      

        
          Amount Due 
          
            If an invoice is overdue and a
            [fixed late fee and/or interest costs](https://support.focus.teamleader.eu/hc/en-150/articles/25691540229137-How-To-Interest-and-late-fees)
            were set, then then the button
            **View calculation **will
            be visible underneath. This payment calculation breakdown
            helps your customer understand where the additional costs
            are coming from.![](https://support.focus.teamleader.eu/hc/article_attachments/25692172392465)
          

        

        - 
          
            Due Date
            The due date of the invoice is shown. If an invoice is overdue,
            it's shown how long it’s overdue for.
          

        

        - 
          
            Credit note
            If there's a credit note linked to your invoice, then this
            will be visible as a tab next to the linked invoice. The
            **View calculation **button
            will show the invoice amount minus the credited amount.
            ![](https://support.focus.teamleader.eu/hc/article_attachments/25692183089809)
          

        

      

    
    - 
      Furthermore, the customer can
      **download **the invoice
      to e.g. print it out later on.
      

        The invoice will be downloaded as a PDF file

        - 
          When a customer downloads an invoice that has one or more linked
          credit notes, a zip file is downloaded containing both PDF's
        

      

    
    - 
      If the customer has any questions, they can post
      **feedback **on
      the invoice by clicking the button
      **Send feedback**.
      

        
          Read all there is to know about the feedback on the cloud platforms
          [in this article.](https://support.focus.teamleader.eu/hc/en-150/articles/25691170524817-FAQ-Where-is-the-feedback-of-the-cloud-platforms-sent-to)
        

      

    
    - 
      Within InvoiceCloud, customers can consult their
      **entire invoice history**. They
      get a complete overview of the entire history of all invoices that have
      ever been sent with Teamleader Focus, regardless of how long they have
      been using InvoiceCloud. This way, the customer always has a way of consulting
      old invoices should there ever be any doubt.
      The overview is split into:
      

        
          Open invoices
          The customer can check their unpaid invoices in this overview,
          and if you also set up the connection with either Mollie or Stripe
          (cf. below) they can immediately take advantage of the opportunity
          to pay them!
        

        - 
          Paid invoices
          When accessing a paid invoice, more information will be visible
          such as the Total amount (with a 'View Calculation' button) and
          the date the invoice was paid on.
        

        - 
          Credited invoices
        

      

    
    - 
      You can set invoices manually to paid in Teamleader Focus, but what's
      more important is that
      **customers can actually immediately pay their invoice **online
      via InvoiceCloud. They do this via the
      **Pay invoice **button
      in the top right-hand corner.
      *Letting your customers pay their invoices online is onl**y possible via an integration with either Mollie or Stripe. You can read everything about this in the paragraphs below.*
      

        
          If customers click the
          **Pay invoice**
          button, they'll get to see a widget containing the payment methods
          you activated in Mollie or Stripe.
        

        - 
          From these options the customer can choose their preferred option
          and transfer the owed amount to you.
        

        - 
          Once this has happened, the invoice will get the status 'Paid'
          in Teamleader Focus as well as in InvoiceCloud.
          After payment, an email notification will be sent towards all
          admins, notifying them about the payment. A payment confirmation
          email will also be sent to your customer.
          *Notes:*
          

            
              If something went wrong during payment, customers will
              receive an error message. If there are 5 errors in a
              row, the payment button will be blocked for one hour.
            

            - 
              You might have activated the bank transfer option in
              your payment integration. Mind that in that case, the
              invoice status in Teamleader Focus won't be automatically
              put to paid since we can't check if that payment was
              successful or not. You will have to check those payments
              yourself, and put the invoice on paid manually.
            

          

        
      

    
  
 

## Paying invoices online: Mollie & Stripe

Letting your customers pay their invoice(s) online is one of the most interesting features of our InvoiceCloud. To be able to let your customers pay your invoices on the spot, you'll need a connection with either Mollie or Stripe. [Read this article to learn more.](https://support.focus.teamleader.eu/hc/en-150/articles/25695285354513-How-To-Paying-invoices-online-with-Mollie-Stripe)