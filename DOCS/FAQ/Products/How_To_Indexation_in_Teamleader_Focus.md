---
title: "How To: Indexation in Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25693930507281-How-To-Indexation-in-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T08:48:34Z"
updated_at: "2025-10-07T15:15:36Z"
category: "FAQ"
section: "Products"
---

# How To: Indexation in Teamleader Focus

![](https://support.focus.teamleader.eu/hc/article_attachments/25693930233745)

 

With each passing year, you want to make sure that the prices of your products are up to date. Fortunately you don’t need to change this product by product in Teamleader Focus. Continue reading to find out how Teamleader Focus can help you save time by doing this in bulk for your products.

 

# Export your products

First of all, you’ll need to export all your products, or a [segment](https://support.focus.teamleader.eu/hc/en-150/articles/25690816108305-How-To-Creating-a-segment-in-Teamleader-Focus) of your products. Follow these steps:

- Go to **Products**

- Click on **Export**

- Select a segment or ‘Select all’

- In ‘Select’, choose **Create ****new ****template **to select a new [export template](https://support.focus.teamleader.eu/hc/en-150/articles/25698010805521-FAQ-How-can-I-select-the-fields-that-need-to-be-exported). Include the following columns:

Name

- ID

- Price

- Click **Start ****export**

- Open the Excel file

 

# Update prices in Excel

Now that you have the Excel file:

- It’s time to update your prices in the file by adjusting the ‘Price’ column

- 
**Save **the Excel file

 

# Import your products again

After you’ve updated your Excel file, you can now import your adapted products at once in Teamleader Focus:

- Go to **Products**

- Click on **Import**

- Choose the Excel file you just updated

- Match the right fields Name, ID & Price

- Finish the import. Don’t worry, no duplicates will be created as Teamleader Focus will recognise by means of the Name/ID that you’re updating the same products.

 

That’s it, the prices of your products are updated!

 

# Notes

- If you want to use the current prices in Teamleader Focus and only charge the price increase for certain customers, you can work with **price ****lists**. You can find more information in [this article.](https://support.focus.teamleader.eu/hc/en-150/articles/25691973505809-How-To-Create-price-lists)

- It's not possible to change the ledger account(s) of your subscriptions in bulk via export/import. You will need to adjust these manually by going to each subscription where you want to update the ledger accounts. There, adjust the ledger accounts of the items in the subscription and save the subscription again. The invoices generated after this will have the new ledger accounts. 

 

# Subscriptions indexation

What will happen to existing subscriptions once you've increased your product prices? The prices of the products in your subscription won't update automatically. You'll need to navigate to the subscription in question, edit the price(s) of the article and save the subscription again. The invoices generated afterwards will have the updated prices.

**! There is a possibility though to update the product prices of your existing subscriptions in bulk. Follow these steps: **

- 
[Create a segment](https://support.focus.teamleader.eu/hc/en-150/articles/25690816108305-How-To-Creating-a-segment-in-Teamleader-Focus) in your subscriptions for which you want to perform the indexation (probably with the rule "inactive = no", to exclude inactive subscriptions that no longer need to be updated).

- 
**Make sure the product line items on your subscriptions are linked to an existing product in your account. **(If this is not the case for (some of) your product line items, you’ll need to manually update these prices in your subscriptions.)

To check this, follow the following steps:

Export your active subscriptions

- Create a new [export template](https://support.focus.teamleader.eu/hc/en-150/articles/25698010805521-FAQ-How-can-I-select-the-fields-that-need-to-be-exported) and include the columns:

Customer name

- Title

- Product line: Item name

- Product line: Item: Existing product

- Product line: Item price excl. VAT

- Product line: Item VAT rate

- Product line items that are not linked to a product in your account have the value *“0” *in your export file in the column* “Product line: Item: Existing product”.*

*Note: discount lines (i.e. line-level discounts) are exported without an existing item, but the percentage will still be applied to the updated item price of the line to which they belong.*

- Add the products that don't exist yet to your account via the products module. (If you have many products that need to be added, you might consider adding them in [bulk via an import](https://support.focus.teamleader.eu/hc/en-150/articles/25692618041233-How-To-Importing-products-into-Teamleader-Focus).)

- Go to the subscriptions containing these products, remove the original product line item and add it again by selecting the product you just added.
 

- 
**Make sure the prices of your products are up to date.**
Edit the price of the item to be changed via the items module. If multiple items are involved, you can do this in bulk. Follow these steps:

Export all your products out of Teamleader Focus

- Create a new [export template](https://support.focus.teamleader.eu/hc/en-150/articles/25692618041233-How-To-Importing-products-into-Teamleader-Focus) and include the columns:

Name

- ID

- Price

- 
Update the prices in your Excel file.

- Import the file again in Teamleader Focus and match the right fields.
 

- If the above steps are executed, [admins ](https://support.focus.teamleader.eu/hc/en-150/articles/25691974365841-FAQ-What-are-the-rights-of-an-admin)can go to **Subscriptions **and select the segment for which they want to perform the indexation. 

- Click on **Actions** in the top right-hand corner and choose **Update product prices**
**![](https://support.focus.teamleader.eu/hc/article_attachments/38885039203857)**
 

- 
**Confirm **the action. 

All future invoices created from these subscriptions will now contain the updated prices.

- This action won't change the prices of invoices that were already generated from these subscriptions.