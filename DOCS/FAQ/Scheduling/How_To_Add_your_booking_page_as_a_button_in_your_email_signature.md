---
title: "How To: Add your booking page as a button in your email signature"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/36691162732561-How-To-Add-your-booking-page-as-a-button-in-your-email-signature"
locale: "en-150"
created_at: "2025-06-30T13:21:19Z"
updated_at: "2025-09-09T13:20:43Z"
category: "FAQ"
section: "Scheduling"
---

# How To: Add your booking page as a button in your email signature

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153) 

In this help article we guide you in creating a button via HTML for your booking page so you can add it to your Outlook or Gmail signature. In the first step we'll create the button and add the booking page URL to it and in the second step we'll add it to your Outlook or Gmail signature. We do recommend to ask your IT'er to help you set this up.
 

![Email composer in Teamleader Focus with a custom signature and meeting booking button.](https://support.focus.teamleader.eu/hc/article_attachments/36691162709521)**Note: In this help article John Doe at XYZ accountancy is a fictional person and company created to show as an example. Any resemblance is purely coincidental.*
 

In this help article:

- Create the button

- Add it into your email signature

Outlook (via the browser!)

- Gmail

 

## 1.  Create the button

- Copy your booking page link on [the meeting types page](https://meeting.teamleader.eu/scheduling/appointment-types/).
This could be a team booking page, a personal booking page or a meeting type link.

- 
Paste it in the following code
 

<a href="**BOOKING PAGE LINK**" style="background-color:#FFFFFF; color:#FFFFFF; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block; font-family:sans-serif;" target="_blank"> Button Text </a>
 

- 
Change the button background color to the Hex code you prefer. eg Black: #000000
 

<a href="BOOKING PAGE LINK" style="background-color:**#000000**; color:#FFFFFF; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block; font-family:sans-serif;" target="_blank"> Button Text </a>
 

- 
Change the button text color to the hex code you prefer. eg. white: #FFFFFF
 

<a href="BOOKING PAGE LINK" style="background-color:#000000; color:**#FFFFFF**; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block; font-family:sans-serif;" target="_blank"> Button Text </a>
 

- 
Add the text of the button. Eg. Book a meeting
 

<a href="BOOKING PAGE LINK" style="background-color:#000000; color:#FFFFFF; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block; font-family:sans-serif;" target="_blank"> **Book a meeting** </a>

 

So an example of a button could be:

<a href="https://meeting.teamleader.eu/book/my-team-name/u/username/t/meetingtype" style="background-color:#000000; color:#FFFFFF; padding:10px 20px; text-decoration:none; border-radius:5px; display:inline-block; font-family:sans-serif;" target="_blank"> Book a meeting </a>
Which would look like

![Email signature with a 'Book a meeting' button for Teamleader Focus scheduling.](https://support.focus.teamleader.eu/hc/article_attachments/36691157507089) 

 

## 2. Add it into your email signature

Once the button is created you can add it to the email signature. We recommend to let your IT'er help you but in case you want to do it yourself we've added the steps below.

- Outlook (via the browser!)

- Gmail

 

### Outlook (via the browser!)

- Open Outlook in your browser and [login](https://login.microsoftonline.com/common/oauth2/v2.0/authorize)

- Go to [https://outlook.live.com/mail/0/options/accounts-category/signatures-subcategory](https://outlook.live.com/mail/0/options/accounts-category/signatures-subcategory) or via the Gear icon ==> Account ==> Signatures

- On the location where you want to add the button type aaa
![Rich text editor in Teamleader Focus showing an email signature with a logo and formatting tools.](https://support.focus.teamleader.eu/hc/article_attachments/36691157509265)
 

- Right click outside(!) the signature box and select Inspect. The dev tools will now open in your browser.
 

- In the dev tools click on the Left top icon (arrow pointing inside a screen)
 ![Browser developer tools 'Elements' tab with the inspect element tool active.](https://support.focus.teamleader.eu/hc/article_attachments/36691162712465)
 

- Click in the Signature field where you've typed aaa. This should now be visible in the dev tools code. If you don't see 'aaa' click on the arrow next to the code and it should become visible
![Email signature configuration settings in Teamleader Focus with rich text editor and defaults.](https://support.focus.teamleader.eu/hc/article_attachments/36691157511185)
 

- Right click on the code part in blue and select **Edit as HTML**
 

- Double click on aaa, remove the text and paste the code from your button

![HTML code snippet for a 'Book a meeting' button link using Vectera integration](https://support.focus.teamleader.eu/hc/article_attachments/36691162715665)
 

- Click somewhere next to that code in the dev tools and then you should see the button appear in your signature field.
![Email signature editor in Teamleader Focus with a 'Book a meeting' button and company logo.](https://support.focus.teamleader.eu/hc/article_attachments/36691157517841)

- Click on Save and send a test mail to yourself. In the mail that you've sent double check that the button redirects you to your booking page when clicking on it.

**Note: if the above information is not clear, we recommend to have a look at *[*this Youtube video*](https://www.youtube.com/watch?v=6VlTqWdGClc)*. The owner of the video is not related in any way to Teamleader, but the information is useful.*

 

### Gmail

- Open Gmail in your browser and [login](https://accounts.google.com/v3/signin/identifier)

- Click on the Gear icon ==> See all settings ==> General ==> Signature (you will have to scroll down)

- On the location where you want to add the button type aaa
![Email signature editor in Teamleader Focus with a rich text toolbar and logo upload.](https://support.focus.teamleader.eu/hc/article_attachments/36691157521425)
 

- Right click outside(!) the signature box and select Inspect. The dev tools will now open in your browser.
 

- In the dev tools click on the Left top icon (arrow pointing inside a screen).
 ![Browser developer tools 'Elements' tab with the inspect element tool active.](https://support.focus.teamleader.eu/hc/article_attachments/36691162712465)
 

- Click in the Signature field where you've typed aaa. This should now be visible in the dev tools code. If you don't see 'aaa' click on the arrow next to the code and it should become visible.
![Email signature editor in Teamleader Focus settings with a rich text toolbar and HTML inspector.](https://support.focus.teamleader.eu/hc/article_attachments/36691157523473)
 

- Right click on the code part in blue and select **Edit as HTML.**
 

- Double click on aaa, remove the text and paste the code from your button.
![HTML code snippet for a 'Book a meeting' button using a Vectera booking link.](https://support.focus.teamleader.eu/hc/article_attachments/36691162725265)
 

- Click somewhere next to that code in the dev tools and then you should see the button appear in your signature field.
![Email signature editor in Teamleader Focus with a 'Book a meeting' button and formatting tools.](https://support.focus.teamleader.eu/hc/article_attachments/36691162726033)

- Click on Save and send a test mail to yourself. In the mail that you've sent double check that the button redirects you to your booking page when clicking on it.

**Note: if the above information is not clear, we recommend to have a look at *[*this Youtube video*](https://www.youtube.com/watch?v=6VlTqWdGClc)*. The video is in Outlook but the actions are the same in Gmail. The owner of the video is not related in any way to Teamleader, but the information is useful.*