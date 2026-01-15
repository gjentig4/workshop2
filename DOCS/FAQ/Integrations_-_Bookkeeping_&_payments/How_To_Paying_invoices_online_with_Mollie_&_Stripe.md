---
title: "How To: Paying invoices online with Mollie & Stripe"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25695285354513-How-To-Paying-invoices-online-with-Mollie-Stripe"
locale: "en-150"
created_at: "2024-06-06T09:26:11Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Paying invoices online with Mollie & Stripe

![](https://support.focus.teamleader.eu/hc/article_attachments/25695309218321)

 

Letting your customers pay their invoice(s) online is one of the most interesting features of our [InvoiceCloud](https://support.focus.teamleader.eu/hc/en-150/articles/25692202362257-How-To-Set-up-InvoiceCloud). To be able to let your customers pay your invoices on the spot, you'll need a connection with either Mollie or Stripe.

Mollie and Stripe are two online services that allow you to perform online payments. Using the link with Teamleader Focus, it allows you to offer customers their preferred method of payment. You can set up both services via the Marketplace in your personal account, at the top right-hand corner.

 

### **Multi-currency on InvoiceCloud**

If your invoice is made in a different currency (not EUR), both the Stripe and the Mollie integration are compatible with multi currency. Your customer will be able to pay online by credit card. The amount to pay will be converted to EUR.

 

## Setup Stripe

Stripe is an American company that specialises in online payments. If you don't have an account yet, don't worry. We've made it easy for you: you can create and link an account straight from Teamleader Focus.

 

Stripe will ask you some questions regarding your company activity, bank data and your identity. After that, you only need to grant authorisation to Stripe and there you go; your account has been linked!

 

## Setup Mollie

Mollie is a Dutch company that provides an integration with most common payment methods. You can create an account via [their website.](https://www.mollie.com/dashboard/signup/teamleader?lang=en) Because payments are sensitive, creating an account can be an exhaustive matter. We'll guide you through the necessary steps right here:

 

**1. Create a Mollie account**

**![](https://support.focus.teamleader.eu/hc/article_attachments/25695282305041)**

 

 

**2. Activate your account**

**After you created your Mollie account, you will land on the 'Get Started' page in the Mollie Dashboard. Press the blue button 'Start setup' to continue.**

**![](https://support.focus.teamleader.eu/hc/article_attachments/25695294081809)**

**3. Complete your account information**

After you've registered yourself on the website, Mollie will ask you to complete your account information. You'll have to provide them with some essential info about your company.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25695294140433)

Here, you also have to agree with Mollie's terms and conditions before you can continue.

 

**4. Enter the data of your stakeholders**

Enter the data of the [legal representative](https://help.mollie.com/hc/en-gb/articles/4405750362642-Wie-zijn-de-stakeholders-van-mijn-organisatie-).

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25695265239697)

 

- 
Enter whether the legal representative is an [Ultimate Beneficial Owner (UBO)](https://help.mollie.com/hc/en-us/articles/4408215755922-Wie-zijn-de-stakeholders-bij-een-besloten-vennootschap-). This is someone who has an interest of 25% or more of the company.

If the legal representative is not an UBO or if there are multiple UBO’s, enter the UBO at **Add ultimate beneficial owner**.

- Check the box at the bottom of the page to confirm that you have truthfully completed the stakeholder information.

- 
Click **Next**.

**5. Create a website profile**

Your profile at Mollie contains all of the data from the website you want to use to link with their services. Your website has to contain a few obligatory elements. If this is not the case, you won't be able to finish the integration. This is a checklist you can consult on the Mollie website as well.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25695294284177)

 

Finished everything? Then Mollie will perform a check to see if all of the required info on your website is visible enough. Don't worry, this check is done pretty quickly. As soon as this has happened, **you will find your API key on the Developers page**. We'll need this later on to finish the integration with Teamleader Focus.

![](https://support.focus.teamleader.eu/hc/article_attachments/25695294360593)

 

**6. Activate payment methods**

 

Finished step 1 and 2? Then it's time for the real thing: selecting your payment methods. Mollie offers a wide range of possibilities, such as iDEAL, PayPal, bank transfer, credit card... **The payment methods you select here, are the ones that will turn up on InvoiceCloud as well**.

![](https://support.focus.teamleader.eu/hc/article_attachments/25695294461969)

 

Some payment methods (such as PayPal) require a separate account. Mollie provides the necessary steps to do this in most cases.

 

 

**7. Upload your ID document**

 

Upload a copy of the ID of each [legal representative or UBO](https://help.mollie.com/hc/en-us/articles/4405750362642). You can do so via Get started => Continue setup => ID document.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25695294534289)

 

- 
Click **Upload ID**.

- Select your ID type. 

- Choose the way you prefer to upload the ID and follow the steps. 

- 
Make sure the copy meets [our requirements](https://help.mollie.com/hc/en-us/articles/360017382020-How-do-I-upload-my-ID-and-which-conditions-does-it-have-to-meet-), or your application will be rejected.

- 
Click **Next**.

 

 

**8. Activate payments**

 

Last but especially not least: in 'Settings' => 'Payouts', enter your account number to which Mollie can transfer all received payments.

![](https://support.focus.teamleader.eu/hc/article_attachments/25695297467665)

 

 

If you survived these steps, your Mollie account is now ready to be linked to Teamleader Focus!

 

**9. Link to Teamleader Focus**

 

In Teamleader Focus, navigate to [Integrations/Marketplace](https://marketplace.teamleader.eu/be/en/) and search for 'Mollie'. The only thing you need to enter, is your API key.

![](https://support.focus.teamleader.eu/hc/article_attachments/25695265755153)

 

 

You can find that API key in your Mollie account, via 'Developers' => API keys. At the bottom of the page you'll find your unique key. Enter it, and your account is linked to Teamleader Focus. 

 

## Notes

- If you have already received a full payment for the total of an invoice via InvoiceCloud, your customer cannot add a new payment to the invoice. The invoice is permanently marked as paid and cannot be paid again.

- If you want to change the amount of the invoice and receive a new payment from the customer, we advise you to credit the invoice and send a new invoice to your customer, which they will be able to pay via InvoiceCloud.

- 
[Multiple company entities](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus): if you integrate Mollie/Stripe, all company entities share the same Mollie/Stripe account and bank account, as splitting payments across different accounts isn't possible. Payments for different company entities will end up in the same bank account.

 

That's it, now go and get those invoices paid!

 

Interested in our instructive video on payment integrations ? Watch it right here:

![](https://support.focus.teamleader.eu/hc/article_attachments/25695297584273)