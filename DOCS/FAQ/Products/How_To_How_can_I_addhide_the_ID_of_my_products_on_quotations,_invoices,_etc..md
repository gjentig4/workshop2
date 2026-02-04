---
title: "How To: How can I add/hide the ID of my products on quotations, invoices, etc.?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691970559761-How-To-How-can-I-add-hide-the-ID-of-my-products-on-quotations-invoices-etc"
locale: "en-150"
created_at: "2024-06-06T07:50:47Z"
updated_at: "2026-01-13T10:40:33Z"
category: "FAQ"
section: "Products"
---

# How To: How can I add/hide the ID of my products on quotations, invoices, etc.?

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

In addition to adding a name, the product module also allows you to add a unique ID for each product.

 

Depending on your internal processes, you can then choose to either show this ID on quotations, invoices and other documents or treat it as additional information for internal use only. This information would then not be displayed on these documents.

 

## ID for external use

This is the standard setting. Whenever you add a product to your quotation, you can search for the ID and name of a product. If the ID is filled in, it will also be displayed automatically. However, you should be careful to select the article from the list and not fill in the name of the article manually.
![Adding a line item to a quotation or invoice in Teamleader Focus](https://support.focus.teamleader.eu/hc/article_attachments/25691961860625)

 

Once you've done so, the ID will be displayed automatically on your quotations, invoices and other documents as well*. You do not need to use a specific shortcode, the ID will be displayed along with the name via the shortcode $DESCRIPTION$.

![A single line item for a product in a Teamleader Focus document like an invoice or quotation.](https://support.focus.teamleader.eu/hc/article_attachments/25691961888913)

 

**Note: when products are added on a work order via the mobile app then the ID won't be shown.*

 

## ID for internal use

If you'd like to hide the product ID from quotations, invoices, etc, then you need to disable a toggle in your settings:

- Go to **Settings > Products > Preferences **

- Disable the toggle 'Display the ID of products on documents'
![Preferences setting to display product IDs on documents in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25691961916305)

The ID will remain visible within the products module, and you'll still be able to search on ID and product name when you add it to a quotation or an invoice. But the ID will simply not be displayed, not within the quotation or the invoice in Teamleader Focus nor on the quotation, invoice, or other document itself.

![Line item editor in Teamleader Focus showing product search, price, quantity, and margin fields.](https://support.focus.teamleader.eu/hc/article_attachments/25691969304721)

 

If you then use the shortcode $DESCRIPTION$, the name of the product will be displayed but not the ID.

![A single line item in a Teamleader Focus document showing product details and pricing.](https://support.focus.teamleader.eu/hc/article_attachments/25691953999249)