---
title: "How To: Importing products into Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692618041233-How-To-Importing-products-into-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T08:09:29Z"
updated_at: "2025-04-30T15:22:10Z"
category: "FAQ"
section: "Import & Export"
---

# How To: Importing products into Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Just like companies and contacts, you can easily import an existing list with products in Teamleader Focus. This means you don't need to enter each product manually.

 

Here you will learn more about:

- Preparing your import

- Adding products via import

- Undoing an import of products

 

## Preparing your import

Basically, you can import all files in the XLS, XLSX or CSV format. However, there are some things, you need to keep in mind when preparing your file for the import into Teamleader Focus.

**Note:** You find an example file in attachment.

- Ensure that there is one entry per line

- You can import values into all fields of a product, however:

**Every row** must at least contain the field "name" or the field "ID"

- You can also import descriptions: a short text with information about the product

- If you use the field "**ID**", Teamleader Focus assumes that each ID only occurs once in the file. If this is not the case, you get an error message telling you which IDs appear more than once.

- If you use no ID, the **name of a product** must be unique, otherwise it will be impossible to distinguish the various products from one another. Here too, the system shows which names appear more than once and how many times.

- 
**Prices, unit cost and stock** will generate an error message when the file contains non-numeric or negative values.

- When **importing **[**suppliers **](https://support.focus.teamleader.eu/hc/en-150/articles/25691712397713-How-To-Stock-management-in-Teamleader-Focus#:~:text=also%20have%20a-,supplier,-.%20Well%2C%20Teamleader%20Focus)by using their name, Teamleader Focus will look at both contacts and companies for links to existing contacts/companies that are already in Teamleader Focus. In order to link a product to a supplier, you add a column to your sheet and add the name in the right row. 

To link a supplier to a company, you add the company name. 

- To link a supplier to contacts, you enter "First name Family name". If nothing is found, a company will be created with the name that you added.

- 
**VAT rates**: the following values are accepted: "0", "6", "9", "12", "21", for the respective normal VAT rates. In addition there are the following special codes:

CM: Intra-Community

- MC: Co-contractor

- EX: Outside Europe

- VCMD: Intra-Community services

- 
**Custom fields**: We recommend to first create the custom fields and only then perform the import. [This article tells you all about creating custom fields.](https://support.focus.teamleader.eu/hc/en-150/articles/25692628832017-How-To-Creating-a-custom-field-in-Teamleader-Focus)

- 
[**Company entity**](https://support.focus.teamleader.eu/hc/en-150/articles/25697681388177-How-To-Multiple-company-entities-in-Teamleader-Focus): you can link your product to a particular company entity by adding the name of that company entity as a value.

- The file must be no larger than 5 MB. In any case, your file must not contain more than 35,000 rows* and 200 columns.
**Keep in mind that by default you can't have more than 10,000 products in your account. However, you can add more. *[*Read this article to learn how.*](https://support.focus.teamleader.eu/hc/en-150/articles/25692019371793-FAQ-Are-there-account-limits-in-Teamleader-Focus)

## Adding products via import

- Navigate to "**Products**" > click on "**Import**" in the right hand corner

- In the next pop up window you go for “**Choose File**”.

Note: You can only upload XLS, XLSX or CSV files.

- Choose the right file from your storage.

- Match the columns with the right fields.![Field mapping screen for importing data into Teamleader Focus](https://support.focus.teamleader.eu/hc/article_attachments/25692630364817)Notes:

Teamleader Focus does match some columns automatically. However, you should still check every column and match it accordingly.

- Make sure that every available value in the dropdown menu is only chosen *maximum once*.

- Fill in standard values in case a cell of a compulsory value is empty, like the VAT rate or the company entity.

- Click on “**Preview**”Note:In case you receive an error message:

Check whether you really matched each value maximum once.

- Check whether you filled every cell of the mandatory fields (ID or product name)

- Click “**Do import now**”.

 

## Undoing an import of products

If you imported products and realise that something went wrong, you still have the option to undo the import.

- You go to the overview of products, where you see at the bottom on the right hand side “**Import**”. 

- Click '**Undo import'** to actually undo the import. You have this option for about two weeks after the import if you didn't click on '**OK, dismiss**' yet. 

**Note:** In general we advise not to click on 'OK, dismiss' in order to keep the undo option available.

![Confirmation dialog showing the results of a product import with an option to undo.](https://support.focus.teamleader.eu/hc/article_attachments/25692617134993)

## Updating your products

Do you want to carry out an indexation of your product prices at the start of a new year? Or just want to generally change your product prices? Then follow these steps:

- Export all your products out of Teamleader Focus, make sure to export the fields Name and/or ID and the price field.

- Adapt the prices in your Excel file.

- Import the file again in Teamleader Focus and match the right fields.

 

### *Notes:*

- Updating your product prices won't change article prices for future invoices of already existing [subscriptions](https://support.focus.teamleader.eu/hc/en-150/articles/25691389220881-How-To-Creating-a-subscription-in-Teamleader-Focus). You'll need to deactivate the subscription and create one again.

- Prices on old quotations/invoices won't be adjusted.