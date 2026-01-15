---
title: "How To: Embed a booking page into your website"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25695019511185-How-To-Embed-a-booking-page-into-your-website"
locale: "en-150"
created_at: "2024-06-06T09:17:32Z"
updated_at: "2025-06-30T13:21:53Z"
category: "FAQ"
section: "Scheduling"
---

# How To: Embed a booking page into your website

![](https://support.focus.teamleader.eu/hc/article_attachments/25694991312145)

Making it easy for customers to book a meeting can be a big time saver. By integrating your booking page or meeting type into your own website, Wordpress, Webflow or Wix, it's possible to achieve just that.

 

**In this help article**

- 
[General](#General)

[Own website](#Own-website)

- [Wordpress](#Wordpress)

- [Webflow](#Webflow)

- [Wix](#Wix)

- [Embed a booking page in a contact widget](#Embed-a-booking-page-in-a-contact-widget)

 

Do you prefer to watch our instructive video first? You can do so right here:

![](https://support.focus.teamleader.eu/hc/article_attachments/28017249599633)

 

*Note: the above video is a little bit outdated as right now, you don't need to manually set up the iframe anymore. *

## General

After you've [created meeting types](https://support.focus.teamleader.eu/hc/en-150/articles/25694496632593-How-To-Create-a-meeting-type-for-your-personal-booking-page-as-a-team-admin), basically all you have to do is copy the code from the meeting type page and paste in the code base of your website on the right location.

- Go to **Meeting types**
![](https://support.focus.teamleader.eu/hc/article_attachments/25694964439185)

If you want to copy the personal or team booking page, click on **Booking links **in the top right-hand corner and click on the preferred embedded HTML link (personal or team). 

- If you want to copy the meeting type, click on the **Share icon **and choose **Copy embedded HTML.**

***Example***:

If you choose one of the embedded HTML's, then the embedded booking link (e.g. [https://cloud.teamleader.eu/_customer-meeting/embed/book/my-team-name-1/u/user-name/](https://cloud.teamleader.eu/my-team-name-1/bookings/u/user-name/)) gets added into an iframe code block. This will look like this:

 

<iframe    style="width: 100%; height: 600px;"    src=" https://cloud.teamleader.eu/_customer-meeting/embed/book/my-team-name-1/u/user-name/"    frameborder="0"></iframe>

 

*Note: *The part after /book/ (=my-team-name-1) is the team-name, while the last part (=/u/user-name) is the editable part of the booking link in [your scheduling configuration](https://meeting.teamleader.eu/scheduling/appointment-types/).

 

2. **Paste the embedded HTML code** in your own website, Wordpress, Webflow or WIX (cf. below).

 

3. Adjust the height and width according to your website (in our suggestion the height is fixed to 600px).

 

4. Enjoy an upgrade in the scheduling of your meetings!

If you want to automatically prefill booking page questions you can add data in the parameter behind the URL as in this example:

[https://cloud.teamleader.eu/_customer-meeting/embed/book/my-team-name-1/u/user-name/?questions.id=value](https://cloud.teamleader.eu/_customer-meeting/embed/book/my-team-name-1/u/user-name/?questions.id=value)

 

Visit [this help article](https://support.focus.teamleader.eu/hc/en-150/articles/25695956076817-How-To-Prefill-contact-form-and-booking-page-questions) for more information.

### Own website

Basically all you have to do is copy the embedded HTML iframe and paste it in the code base of your website on the right location.

### Wordpress

**Wordpress.com**

It's not possible to embed a booking page in a [Wordpress.com](//Wordpress.com) website. You can add a hyperlink behind text, to forward your clients to a booking page.

**Wordpress.org**

Once you've copied the codeblock with the embedded booking page (see general), you can now embed it in your Wordpress website.

- Open the page where you want to add the codeblock

- Click on the **Plus** and select **Custom HTML**
**![](https://support.focus.teamleader.eu/hc/article_attachments/25694991456529)**

- Paste the iframe code in the custom HTML block
**note: Depending on your layout, you might want to put the iframe in a paragraph.*

- Test and edit the height so the iframe displays perfectly on your website.

- Publish your website
![](https://support.focus.teamleader.eu/hc/article_attachments/25694980038801)

 

### Webflow

Copy and paste the embedded HTML iframe in your Webflow website.

- Open the page where you want to add the codeblock

- Click on the **Plus** and in Advanced select **Embed**, drag and drop the Embed box into your page**![](https://support.focus.teamleader.eu/hc/article_attachments/25694995436689)**

- Paste the iframe code in the custom HTML block.

- Test and edit the height so the iframe displays perfectly on your website.

- Publish your website
![](https://support.focus.teamleader.eu/hc/article_attachments/25694964649617)

###  

### Wix

**Embed booking page**

To embed a booking page in your Wix website, click on **Copy embedded HTML.**

- Open the page where you want to add the codeblock

- Click on the **Plus** and **Embed Code **-**Embed HTML**
![](https://support.focus.teamleader.eu/hc/article_attachments/25694980230801)

- In the HTML settings, select Website address and paste the embedded booking page code in the field Website Address. Click on **Apply.**
**![](https://support.focus.teamleader.eu/hc/article_attachments/25694964747025)**

- Edit the height so the iframe shows perfectly on your website.

- Publish your website
![](https://support.focus.teamleader.eu/hc/article_attachments/25694950810001)

 

**Redirect URL**

In scheduling it's possible to add a redirect URL to your meeting types. Unfortunately this is blocked by WIX meaning that if you've setup a redirect URL an error will appear after a client books a meeting. 

 

We recommend to remove the redirect URL for the meeting types which are shown on your embedded booking page or contact WIX support.

- Go to the[ Meeting types page in the Lead capture Booster](https://meeting.teamleader.eu/scheduling/appointment-types/?scope=personal)

- In the meeting type card, click on the **3 dots** and select **Edit**

- In 'Powerful extensions', go to **Redirecting**

- Remove the URL in the field below 'Redirect URL'
![](https://support.focus.teamleader.eu/hc/article_attachments/25694991861649)

- Save the page

 

## Embed a booking page in a contact widget

If you don't want to show an entire booking page on your website but you want to put it behind a button, then you can use the contact widget. Optionally, you can choose if the booking page should open in a pop-up window on your website or in a different tab.

- 
Go to [Contact widgets](https://meeting.teamleader.eu/contact-widgets/)

- Click on **Create a widget**

- Design your button

- Select whether the booking page should open in a new tab or on the same page

- 
In 'Link contact type' select Meeting type and choose your meeting type or booking page
![](https://support.focus.teamleader.eu/hc/article_attachments/25694964912145)

- Hit **Save **and [embed the contact widget in your website](https://support.focus.teamleader.eu/hc/en-150/articles/25695420502545-How-To-Embed-the-contact-widget-in-your-website).