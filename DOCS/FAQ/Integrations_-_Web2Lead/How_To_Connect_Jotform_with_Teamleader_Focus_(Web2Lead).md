---
title: "How To: Connect Jotform with Teamleader Focus (Web2Lead)"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691809384721-How-To-Connect-Jotform-with-Teamleader-Focus-Web2Lead"
locale: "en-150"
created_at: "2024-06-06T07:44:48Z"
updated_at: "2025-04-30T15:21:21Z"
category: "FAQ"
section: "Integrations - Web2Lead"
---

# How To: Connect Jotform with Teamleader Focus (Web2Lead)

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Web forms are a useful way to collect customer data. Use Web2Lead to automatically add all information leads enter to your Teamleader Focus account. This way, you can use customised questions on your web forms and make sure all data is registered properly. 

 

And there's more: for each form that is filled out, a new deal will be added to your CRM. This enables you to follow up on your leads quicker. All you have to do is add a Jotform form to your website. 

 

*Before starting, we would like to offer you the choice between our standard Web2Lead-integrations and our new integration with *[*Zapier*](https://support.focus.teamleader.eu/hc/en-150/articles/25693119585425-How-To-Integrate-Teamleader-Focus-with-Zapier)*. The second one could offer you some important advantages. Read more about this in the *[*following article*](https://support.focus.teamleader.eu/hc/en-150/articles/25693169806481-How-To-Link-an-online-form-to-Teamleader-Focus-Web2Lead-integrations)*.*

 

## How to set up your Teamleader Focus integration with Jotform?

Navigate to [Teamleader Focus Marketplace](http://marketplace.teamleader.eu/) or click on your profile picture in the right top corner > **Integrations/Marketplace**. Here you can use the search bar to find the Jotform integration. If you want to discover other Web2Lead integrations, click on the "Web2Lead" category in the sidebar. To integrate Jotform with your Teamleader Focus account, choose **Add**. Once you've made the connection, choose the provider you want to use to create the form. 

 

## Creating a form with Jotform

In the toolbar on the left, there are available fields you can drag and drop in the editing screen. We recommend using Text Box fields to keep the integration with Teamleader Focus running smoothly. Define your fields later on, so Teamleader Focus recognizes the fields correctly.

 

![The JotForm form builder interface showing a 'Contact us' form being created.](https://support.focus.teamleader.eu/hc/article_attachments/25691783973905)

Once you have used all the fields you want, define your field types. This is important, otherwise Teamleader Focus will not know which value belongs to which field. Let's take 'Name' as an example. Make sure not to use the default Jotform element 'Full name' because you need to have separate fields to connect with Teamleader Focus. Use the element 'Short text' to add both 'First name' and 'Last Name':
![The drag-and-drop form builder interface for creating custom web forms in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25691779622929)
 

For each field, you can click on the cog and select **Properties **> Advanced. Scroll down to 'Field details'. You can leave the ‘ID’ field as it is, but be sure to complete the field according to the parameters that Teamleader Focus recognizes. For 'Last name' for example you use 'last_name':

 

![The Field Details section in a form builder showing the Unique Name property for a field.](https://support.focus.teamleader.eu/hc/article_attachments/25691779657105)

 

*Note: *The same goes for the 'Address field': don't use the 'Address' form element Jotform offers, as this counts as only one field. You need several separate fields to be able to link this to the separate fields in Teamleader Focus (think about 'street', 'house number', 'city' etc..).

 

### Fields allowed

[Here](https://support.focus.teamleader.eu/hc/en-150/articles/25692156975889-FAQ-What-are-the-available-fields-for-Web2Leads) you will find a list of all the possible fields Teamleader Focus can import from your form. Only these fields can integrate your data with Teamleader Focus correctly, so make sure to name your fields accordingly. 

###  

## Linking new forms with Teamleader Focus

Once you've created your form, link it with your Teamleader Focus account. Go back to Teamleader Focus and navigate to the Integrations/Marketplace > open the settings from Jotform> connect  new form and enter the form name. Below, you have the option to assign a co-worker, who will receive a notification whenever the form is filled in. Also, you can add a tag to new leads to [segment them easily](https://support.focus.teamleader.eu/hc/en-150/articles/25690816108305-How-To-Creating-a-segment-in-Teamleader-Focus) and enable the option to create a new deal for every submitted form. 

 

Save your form in order to view the Webhook URL that connects Teamleader Focus with your Jotform account. Copy the link and go back to your Jotform account. Follow the instructions to set-up a webhook with JotFrom: [https://www.jotform.com/help/245-How-to-Setup-a-Webhook-with-JotForm](https://www.jotform.com/help/245-How-to-Setup-a-Webhook-with-JotForm)

 

![How to find WebHooks in the form integration settings.](https://support.focus.teamleader.eu/hc/article_attachments/25691797059089)

 

Now your form is connected.