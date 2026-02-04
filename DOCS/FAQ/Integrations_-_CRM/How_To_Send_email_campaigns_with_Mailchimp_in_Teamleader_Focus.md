---
title: "How To: Send email campaigns with Mailchimp in Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25690774879889-How-To-Send-email-campaigns-with-Mailchimp-in-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:09:24Z"
updated_at: "2025-07-07T09:42:25Z"
category: "FAQ"
section: "Integrations - CRM"
---

# How To: Send email campaigns with Mailchimp in Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Sending an email campaign is an easy way to reach a large target audience. However, building an efficient, attractive and clear campaign is more difficult. There are a few online tools that help you to create a good campaign. Mailchimp is one of them.

The integration between Mailchimp and Teamleader Focus is easy: Teamleader Focus synchronises all your CRM contacts and companies to Mailchimp, including your predefined segments which will be groups in Mailchimp. In Mailchimp, you can send well-made campaigns to a predefined part of your contact database.

 

*Note: the Mailchimp integration is an integration on account level, which means that only 1 user per account can link the Teamleader Focus account to Mailchimp. *

 

We’ll explain how it works:

- The Setup

- Creating a segment in Teamleader Focus for Mailchimp

- Syncing a segment from Teamleader Focus to Mailchimp

- Sending a campaign to the right people

- Mailing data in Teamleader Focus

- Archived contacts in Mailchimp

 

Do you prefer to watch our instructive video first? You can do so right here:

 

## The Setup

- Create a Mailchimp account on [www.mailchimp.com](http://www.mailchimp.com)

- Make sure to complete the account setup.

- Automatically, your first audience will have been created and you yourself will have been added as a first subscriber. You can check this in **Audience > All contacts.**

- In order to connect to Teamleader Focus though, your audience needs to be empty. There are now two options:

If you're on the Free plan, you can only have 1 audience in your account. As the audience needs to be empty, you'll need to archive yourself as a contact from the audience:
![The Audience management view in Teamleader Focus showing contact actions like Archive and Unsubscribe.](https://support.focus.teamleader.eu/hc/article_attachments/25690772294673)

- If you're on a paying planyou need to create a new empty audience in Mailchimp: 

Go to “**Audience**” > Audience dashboard.

- Click on **Current audience** and choose **View audiences:**
**![Dropdown menu for selecting a 'Current audience' in a marketing or contact integration.](https://support.focus.teamleader.eu/hc/article_attachments/25690758558993)**

- Click **Create audience**
**![The 'Create Audience' button in Teamleader Focus with a mouse cursor hovering over it.](https://support.focus.teamleader.eu/hc/article_attachments/25690744477073)**
Fill in the requested info. Note that this is what your recipients will get to see when they receive the mail.

- Go back to your Teamleader Focus account. Click on your **user icon** in the upper right hand corner.

- Choose “**Integrations/Marketplace**”

- Enter “Mailchimp” in the search field

- Choose for “**Mailchimp**” and click on “**Add**”

- Enter your Mailchimp account name and password

- A new window opens that asks you to select an audience in Mailchimp. Choose your newly created empty audience.
![MailChimp integration setup screen in Teamleader Focus for syncing CRM contacts.](https://support.focus.teamleader.eu/hc/article_attachments/25690756030865)

- Click on “**Save**”

 

Congratulations! Mailchimp and Teamleader Focus are now integrated. Please note that the contact synchronization between Teamleader Focus and Mailchimp is one-way: Teamleader Focus doesn’t allow you to link an audience if there are already contacts added in your Mailchimp audience.

 

In order to sync your contacts to Mailchimp, the checkbox ['Opt-in marketing mails' needs to be enabled](https://support.focus.teamleader.eu/hc/en-150/articles/25692799115281-FAQ-What-does-the-checkbox-Opt-in-marketing-mails-mean) for each contact in Teamleader Focus.
![Form fields for business details including bank info, VAT liability, and marketing opt-in.](https://support.focus.teamleader.eu/hc/article_attachments/25690742971921)After this, you can choose to divide your contact audience in Mailchimp into separate marketing permissions/opt-ins. You can organize your audience in Mailchimp with a segment for each [marketing permission](https://kb.mailchimp.com/accounts/management/collect-consent-with-gdpr-forms) (email, direct mail, customized online marketing):

 

**![Editing a contact segment for marketing permissions with specific conditions.](https://support.focus.teamleader.eu/hc/article_attachments/25690758736657)**

 

## Creating a segment in Teamleader Focus for Mailchimp

**Note:** Teamleader Focus will push all your contacts and companies to Mailchimp (as long as they have a valid email address and are not unsubscribed). You can then create segments in Teamleader Focus to define the group of customers you want to send a specific campaign to.

 

Using segments is easier to mail your campaign to a specific part of your contact audience.

For example:

- 
[Create a segment](https://support.focus.teamleader.eu/hc/en-150/articles/25690816108305-How-To-Creating-a-segment-in-Teamleader-Focus) in Teamleader Focus based on email address.

- Choose to make this segment available in Mailchimp. Teamleader Focus will then synchronize this segment![The 'Edit segment' dialog in Teamleader Focus showing general info, rules, and Mailchimp export.](https://support.focus.teamleader.eu/hc/article_attachments/25690738199185)

 

## Syncing a segment from Teamleader Focus to Mailchimp

**1. **To synchronize your segments for the first time, you can click the rotation symbol on top of the screen (remember: you have to be in the CRM module to do this!)

![The top navigation bar in Teamleader Focus featuring search, quick add, and sync options.](https://support.focus.teamleader.eu/hc/article_attachments/25690772626705)
 

Notes: 

- You only need to sync manually once: when adding new contacts afterwards, Teamleader Focus will automatically synchronize the contacts, for which you [enabled 'Mailing'](https://support.focus.teamleader.eu/hc/en-150/articles/25692799115281-FAQ-What-does-the-checkbox-Opt-in-marketing-mails-mean), overnight. Of course, if you want to use your freshly created segment, you can start the sync manually.
 

- If you delete an entry in Mailchimp and not in Teamleader Focus, Teamleader Focus will create this contact again via the next sync.

- If you delete an entry in Teamleader Focus and not in Mailchimp, Teamleader Focus will delete this contact in Mailchimp during the next sync.

- If you want to be able to sync segments to Mailchimp as a non-admin user, then the 'Mailing' slider has to be enabled in your user settings.

 

**2.** Teamleader Focus will notify you when the synchronization is finished.

**3. **To see your “Segments” from Teamleader Focus in Mailchimp you must follow the next steps:

- Go to your Mailchimp account and choose “**Audience**”

- Choose the audience you’ve just created

- At the top you’ll find a number of tabs. Choose “**Manage contacts**”

 

**4. **Note that your Teamleader Focus segments are identified as “Groups” in Mailchimp. So choose for “Groups” in the dropdown menu.

**5.** At the right side, you can click on “view groups”. There you can find all segments you’ve made in Teamleader Focus.

![The contact groups management interface in the Teamleader Focus integration with Mailchimp.](https://support.focus.teamleader.eu/hc/article_attachments/25690756269073)

 

**6. **Now you can also use your groups within your marketing permission segments. Like this, you can send your future marketing campaigns only to your contacts who gave consent.
![The 'Create a new segment' interface in Teamleader Focus showing contact filtering conditions.](https://support.focus.teamleader.eu/hc/article_attachments/25690738343441)

### Which info will be synced to Mailchimp?

The following items will be synced to Mailchimp:

- First name

- Last name

- Email address

- City

- Country

- Gender

Would you like to sync custom fields to Mailchimp? Have a look at [this article](https://support.focus.teamleader.eu/hc/en-150/articles/25692168400017-FAQ-Can-I-export-custom-fields-to-Mailchimp) for more info.

 

## Sending a campaign to the right people

Now it’s just about selecting the right segments in Mailchimp to send your emails. 

- Go to your Mailchimp account

- Choose “**Campaigns**” in the navigation on top

- Click on “**Create campaign**”.

- You will be asked to choose the type of campaign. You can only use campaigns of the type “**Regular**”. If you use “A/B testing”, the statistics will be empty and you will only see the bounces for example.
![Marketing selection screen to create a regular email, automation journey, or landing page.](https://support.focus.teamleader.eu/hc/article_attachments/25690758994705)

- Now you’ll be asked to define your recipients. Choose “**Group or new segment**” and then pick “**Teamleader.contacts**” or “**Teamleader.companies**” in the list

- Choose your segment from the dropdown menu.
![The 'To' section of a campaign setup showing audience segmentation and recipient selection.](https://support.focus.teamleader.eu/hc/article_attachments/25690756411409)

- To send to multiple segments, add another rule by clicking “**Add**” and repeat the same steps as described above.

- Choose “**Next**”. Now you can go on creating your campaign, with the right Teamleader Focus contacts!

 

## Mailing Data in Teamleader Focus

What after you've sent your campaign? Teamleader Focus gathers some data from the sent campaigns and pushes it to your CRM database. When a customer opened your email, you'll see it in the 'Activities' of that contact.

 

From the moment you've activated the link with Mailchimp, you also find “Mailing” under the module “CRM”.

There you find the recently sent campaigns with some data such as

- the total amount sent

- unique and total opens

- number of clicks

- Unsubscribers

- bounces

In that last case, Teamleader Focus will add these email addresses to a list of 'invalid emails'. In this list you can choose to edit the email address (if you know the correct one), or to just remove the address out of your database completely.

 

## Archived contacts in Mailchimp

In a Mailchimp Audience, you can also find archived contacts. Click on your linked audience > Manage contacts > View archived contacts.

 

![Audience management screen showing the 'Manage contacts' dropdown menu with 'View archived contacts'.](https://support.focus.teamleader.eu/hc/article_attachments/25690738476945)

 

These are contacts that: 

- have the checkbox opt-in marketing mails disabled in Teamleader Focus but were once synced to Mailchimp

- don't exist in Teamleader Focus, so were manually added to the audience in Mailchimp

- were deleted from Teamleader Focus

 

 

**Note: **If you’re interested in using automation in Mailchimp (f.e. sending welcome emails), it’s important to know that this is not possible through our normal integration. However, it is possible by using Zapier, which allows to link a trigger in Teamleader Focus to an action in Mailchimp. You can read more about this in our general[ Zapier article](https://support.focus.teamleader.eu/hc/en-150/articles/25693119585425-How-To-Integrate-Teamleader-Focus-with-Zapier).