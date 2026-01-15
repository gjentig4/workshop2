---
title: "FAQ: Can I export custom fields from Teamleader Focus to Mailchimp?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692168400017-FAQ-Can-I-export-custom-fields-from-Teamleader-Focus-to-Mailchimp"
locale: "en-150"
created_at: "2024-06-06T07:57:15Z"
updated_at: "2025-07-07T11:03:32Z"
category: "FAQ"
section: "Integrations - CRM"
---

# FAQ: Can I export custom fields from Teamleader Focus to Mailchimp?

![](https://support.focus.teamleader.eu/hc/article_attachments/25692167605649)

 

If you haven't already, you can read [this article](https://support.focus.teamleader.eu/hc/en-150/articles/25690774879889-How-To-Sending-email-campaigns-with-Mailchimp-in-Teamleader-Focus) on how to set up the link between Teamleader Focus and MailChimp before you continue.

 

## How to sync custom fields to MailChimp

 

You can export (all types of) custom fields from Teamleader Focus to MailChimp. To do so, simply navigate to the **Settings of your Audience** and go to **'Audience fields'** and** '*|MERGE|* tags'**. 

 

Next, create a '**text' field**.

![](https://support.focus.teamleader.eu/hc/article_attachments/25692162235281)

 

All custom field types in Teamleader Focus are converted to just text in MailChimp. If this field has the same name (between ***| |***) as a custom field (**only letters, numbers and _ are allowed characters**), the values from the custom field will be filled in.

 

This also works for some dedicated fields, like salutations.

 

### **Note:**

- Custom fields of the **type 'Email address**' sync to Mailchimp automatically without merge tags. The company or contact will be as many times in Mailchimp as there are email addresses for that company or contact.
![](https://support.focus.teamleader.eu/hc/article_attachments/25692146208017)

- The merge text cannot be longer than **10 characters**.

- If you add one of these tags below, this will not be automatically synchronized for all contacts/companies. The easiest way to force this to happen is to create a segment which contains contacts or companies (e.g. email is filled in) and sync that segment to MailChimp.

 

Name of custom field
 
Merge tag in Mailchimp
 

1e. Categorie
 
*|1ECATEGORIE|*
 

2e_en_3e_categorie
 
*|2E_EN_3E_C|*
 

Klantennummering
 
*|KLANTENNUM|*
 

Test
 
*|TEST|*