---
title: "How To: Export list of companies and linked contact person(s)"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25697900333969-How-To-Export-list-of-companies-and-linked-contact-person-s"
locale: "en-150"
created_at: "2024-06-06T10:41:19Z"
updated_at: "2025-05-04T13:05:35Z"
category: "FAQ"
section: "CRM"
---

# How To: Export list of companies and linked contact person(s)

![](https://support.focus.teamleader.eu/hc/article_attachments/25697899160465)

 

Interested in a list of your companies together with their linked contact persons? Teamleader has the solution for you:

 

    1. [Create a segment](https://support.focus.teamleader.eu/hc/en-150/articles/25690816108305-How-To-Creating-a-segment-in-Teamleader-Focus) in **Companies** with the rule **"Name is filled out"**:

![](https://support.focus.teamleader.eu/hc/article_attachments/25697882676113)

    2. Go to **Contacts** and [create another segment](https://support.focus.teamleader.eu/hc/en-150/articles/25690816108305-How-To-Creating-a-segment-in-Teamleader-Focus) with the rule **"Companies is in segment + name of the segment you made in step 1"**:

![](https://support.focus.teamleader.eu/hc/article_attachments/25697868308753)

 

    3. Select the segment from step 2 in Contacts and click on **E****xport** in the upper right corner. In Select, click on **"Create new template"**. There, you can put the columns you want in your Excel export, in this case **companies and first name + last name:**

![](https://support.focus.teamleader.eu/hc/article_attachments/25697875931665)

Click on **Save**, then** Start export** and you will have the list of companies with their linked contact persons.

 

*Notes: *

- *Export your contacts (following step 3 of this article), but without selecting a segment, if you want to see if they have a linked company filled out at all.*

- *It is not possible to export the address (or other details) of your companies and also the addresses (or other details) of the contacts linked to your companies at the same time. However, you can do it with a [VLookUp in Excel](https://support.focus.teamleader.eu/hc/en-150/articles/25693188668433-How-To-Combine-two-Teamleader-Focus-export-files-into-one-Excel-file-VLookup).*