---
title: "FAQ: What if a meeting type on your booking page shows as unavailable?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/34085790925457-FAQ-What-if-a-meeting-type-on-your-booking-page-shows-as-unavailable"
locale: "en-150"
created_at: "2025-04-04T10:55:13Z"
updated_at: "2025-06-30T13:21:53Z"
category: "FAQ"
section: "Scheduling"
---

# FAQ: What if a meeting type on your booking page shows as unavailable?

![A graphic banner featuring the text 'FAQ' with a magnifying glass and a document icon.](https://support.focus.teamleader.eu/hc/article_attachments/25690748323089) 

When people visit your booking page but the meeting type is not bookable you will have to check a few things to see what is going wrong. On a personal booking page the meeting type will not be clickable, and on a team meeting type your host card will not be clickable. 

![Error messages in Teamleader Focus when a meeting type or team member is unavailable for booking.](https://support.focus.teamleader.eu/hc/article_attachments/34085790917521)# How to fix this issue?

There are a few reasons why a booking page is not working:

- 
## Calendar is not connected anymore

It's possible that your calendar is not connected anymore or that your calendar provider sends incorrect information to the Lead capture Booster, meaning that in our back-end we will see an error regarding your calendar connection (e.g. when your calendar provider has revoked access).

Go to the [Calendar settings](https://meeting.teamleader.eu/scheduling/configure/) and check if your calendar is still connected. 

If not, [reconnect your calendar ](https://support.focus.teamleader.eu/hc/en-150/articles/25695106112785-How-To-Scheduling-in-the-Lead-capture-Booster#Connect-your-calendar)and afterwards check on the booking page if it works again.

- If the calendar looks connected but there's no calendar to check for availability and no calendar in which events will be created, we recommend to disconnect and reconnect your calendar and afterwards check on the booking page if it works again.

 

- 
## No time slots available

If your calendar is connected but it's not bookable, it could be that you have no available time slots. In this case we recommend to check the following things:

On the [Calendar settings](https://meeting.teamleader.eu/scheduling/configure/) page, only select the calendars that should check your availability and thus should block time slots to avoid blocking unnecessary slots.

- In your calendar (Google, Outlook/O365, iCal), make sure that your events that are tasks/reminders/full day events don't have the status 'busy' if this is not necessary.

- On the [meeting type overview page](https://meeting.teamleader.eu/scheduling/appointment-types/), click on the meeting type that is blocked for booking. 

In the advanced settings, check that in the bookable period the start and end period is not in the past.

- In the advanced settings, make sure that the buffer before and the buffer after events isn't too big, so it blocks your calendar for new events.

- Check if the availabilities are correctly set up.

- 
Check if the unavailabilities are not fully covering your available period.

 

- 
## Payment unconfigured

If you have a meeting type where payment is required, the meeting type can show as not bookable if the integration with Stripe isn't active anymore. Go to the [Stripe integration](https://meeting.teamleader.eu/integrations/stripe/) page and reconnect your Stripe account. Verify on the booking page if your meeting type is bookable again.