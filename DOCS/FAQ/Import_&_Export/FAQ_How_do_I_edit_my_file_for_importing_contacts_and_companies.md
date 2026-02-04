---
title: "FAQ: How do I edit my file for importing contacts and companies?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691867398801-FAQ-How-do-I-edit-my-file-for-importing-contacts-and-companies"
locale: "en-150"
created_at: "2024-06-06T07:46:39Z"
updated_at: "2025-05-04T14:02:08Z"
category: "FAQ"
section: "Import & Export"
---

# FAQ: How do I edit my file for importing contacts and companies?

![A graphic banner featuring the text 'FAQ' with a magnifying glass and a document icon.](https://support.focus.teamleader.eu/hc/article_attachments/25690748323089)

 

Before you [get started on doing an import](https://support.focus.teamleader.eu/hc/en-150/articles/25691800529297-How-To-Importing-contacts-and-companies-to-Teamleader-Focus), you should definitely check [the allowed values per import value](https://support.focus.teamleader.eu/hc/en-150/articles/25691845208465-FAQ-What-values-are-allowed-for-importing-contacts-or-companies). Here we will explain you how you can fix columns, so that they fit the allowed format.

 

The base for the fixing is the first attachment.

 

The desired outcome will then look like the second attachment. This file can serve as a guideline for your import file.

 

Below, we will explain how to fix most of the columns in your import file. You will need to know only these three formulas to do so:

- Text to Columns

- Sort and Filter/Find and Select

- Combine text formula
 

## **Text to columns formula**

This formula can be applied to fix columns with addresses, email addresses, phone numbers, account managers, related contacts (or all other columns with multiple values).

- Insert on the right as many new columns as the max number of email addresses you have in the same cell, select your email address column > Go to **Data** > Select the option **Text to Columns**:**![Using the 'Text to Columns' feature in Excel to prepare data for Teamleader Focus import](https://support.focus.teamleader.eu/hc/article_attachments/25691837512721)**

- Choose the option **Delimited.**

-  Press **Next** > Choose your delimiting symbol from the list (e.g. comma, semicolon, etc.) or type your delimiting symbol next to Other.

**![Step 2 of the Convert Text to Columns Wizard for importing data into Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25691814656657)**

4. Press **Next** to continue > Choose the option **General** for the column Data format and check the new columns that will be created in the Data preview section:

**![Step 3 of the Excel Convert Text to Columns Wizard for formatting data before importing to Teamleader](https://support.focus.teamleader.eu/hc/article_attachments/25691805156753)**

5. Press **Finish**. Voilà, it’s done!

 

**Notes: **

- In step 4 you have to choose the option **Text** for the column Data format.

 

**![Step 3 of the Excel Convert Text to Columns Wizard, setting the data format to 'Text'.](https://support.focus.teamleader.eu/hc/article_attachments/25691814752273)**

- Column phone number: If you have two or more telephone numbers in the same cell, you can separate them with the Text to Columns formula.

 

## Sort and filter/Find and select

** **

This formula can be applied to columns with countries, languages, payment terms, sectors (or all other columns in which you need to replace values).

- Select the column with the country.

- Click on **sort and filter** and select **Filter**:

**![The Sort & Filter menu in Teamleader Focus with the Filter option highlighted.](https://support.focus.teamleader.eu/hc/article_attachments/25691841077009)**

3. You will see a dropdown button on the column you selected, click on it to get a list of all the different countries in the column.

4. In order to replace extended names of countries by the 2 letters ISO code you need to use **Find and Select**.

5. Click on **Find and Select** and choose **Replace**:

**![Microsoft Excel 'Find & Select' menu with the 'Replace' option highlighted.](https://support.focus.teamleader.eu/hc/article_attachments/25691830810513)**

6. Enter the name of a country in **Find what** field, enter the corresponding ISO code in the Replace with field and then click on Replace all:![Find and Replace dialog box showing a search for 'England' to be replaced with 'EN'.](https://support.focus.teamleader.eu/hc/article_attachments/25691848464273)

7. Repeat step 6 for each country.

## Combine tags from two or more cells in one cell

- Insert a new column on the right hand side.

- Enter = in the first cell of your new column, select the first cell of the first tag column, type the string **&“,”&  **then select the second cell of the second tag column and press **Enter** to confirm. **![Excel formula example for combining multiple tag columns into one for Teamleader Focus import.](https://support.focus.teamleader.eu/hc/article_attachments/25691837929489)**

- To apply the formula to the whole column, select the cell with the formula, place the mouse on the lower right corner until you see a black + symbol.

**![Excel spreadsheet showing how to combine multiple tags into one column for Teamleader Focus import](https://support.focus.teamleader.eu/hc/article_attachments/25691805545105)**

4. Click on the + symbol and drag it down. Your column will look like this below:

**![Spreadsheet example showing how to combine multiple tag columns for a Teamleader Focus import.](https://support.focus.teamleader.eu/hc/article_attachments/25691831077009)**