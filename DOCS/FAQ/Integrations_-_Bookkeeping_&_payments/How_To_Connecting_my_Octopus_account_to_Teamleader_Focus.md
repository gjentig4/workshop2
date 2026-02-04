---
title: "How To: Connecting my Octopus account to Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691321114897-How-To-Connecting-my-Octopus-account-to-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:27:36Z"
updated_at: "2026-01-09T13:17:29Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Connecting my Octopus account to Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Our in-depth connection with the accounting tool Octopus goes both ways: invoices and credit notes in Teamleader Focus are synchronized to Octopus, and payment data from Octopus is retrieved in Teamleader Focus. This ensures that you are always aware of the latest financial activities in your organisation.

 

*Are you using our Accounting Connector Booster? In that case, the setup of your accounting integration is a bit different from what’s explained in this documentation. *[*Check this article for more details.*](https://support.focus.teamleader.eu/hc/en-150/articles/42086681298577-How-To-The-Accounting-connector-Booster-in-Teamleader-Focus)
 

Note that:

- Customers in Teamleader Focus are first exported to Octopus before the actual synchronization of the invoices.

- You manage ledger accounts in Octopus. These are automatically synchronized to Teamleader Focus.

- ! We advise you to change all customers in your CRM with the VAT type 'Contractor' to the type 'VAT liable' to correctly match this in Octopus. The reason is that Octopus doesn't recognize this VAT type and the relations would be synced to Octopus with the 'unknown' VAT type.

 

Don't have an Octopus account yet? You can purchase one by visiting [http://www.octopus.be.](http://www.octopus.be./)

 

## Setting up the integration

You'll need to complete **one of the following 3 steps**:

 

### A. My Octopus account is empty (and my Teamleader Focus account is or is not empty)

 

If your Octopus account does not contain any data yet, you'll first need to arrange a few things:

- Create a **fiscal year**

- Create a **journal**

- Check **ledger accounts**

 

- 
**Create a ****fiscal year** by navigating to **Management **> **Fiscal years**.

 

![The Management dropdown menu in the Teamleader Focus navigation bar with Fiscal years selected.](https://support.focus.teamleader.eu/hc/article_attachments/25691276091665)

 

 

**Note: **You cannot change the start date. Fiscal years must be sequential and without intervening periods. (You may need to create additional fiscal years before you can create the year you want.)

 

![Detailed view of a fiscal year configuration in the bookkeeping settings.](https://support.focus.teamleader.eu/hc/article_attachments/25691286871697)

 

2. **Create a ****journal**. First, check whether the right fiscal year is open (**Menu Bar** > **Fiscal Year** > **Open fiscal year**). You need two journals: one for invoices, and one for credit notes. Name the journal for invoices "**V1**" and credit notes "**V2**".

 

**Note:** always select '**Sales Entries'** as Entry Type. Only journals of this type will be visible in Teamleader Focus. 

 

![The 'Journals' configuration screen showing settings for a Sales bookings journal.](https://support.focus.teamleader.eu/hc/article_attachments/25691282549137)

 

3. Check the **accountancy accounts** (**Management **> **Accounts**). Those starting with 70 are retrieved from Octopus. In Teamleader Focus, you can indicate to which account they must be posted for each line of your invoices. 

 

**Note:** Any editing of accounts is best done in consultation with your accountant. 

 

![Overview of the Accounts list in the bookkeeping module showing VAT codes and deductibility.](https://support.focus.teamleader.eu/hc/article_attachments/25691282613265)

### 

B. My Teamleader Focus account is empty and my Octopus account contains my customer database

You can easily import your customer database into Teamleader Focus by selecting the '**Import companies from Octopus**' slider.

### 

C. Both my Teamleader Focus account and my Octopus account contain my customer database

**Note:** to prevent double entries in Octopus, you should import all companies in Teamleader Focus first. To do so, use the '**Import companies from Octopus'** slider. 

- Once you've imported companies you'll have some **duplicates in Teamleader Focus**. As an admin, you have the field '**External ID**' on your contact/company page. [Add this column to your invoices overview](https://support.focus.teamleader.eu/hc/en-150/articles/25697968906513-FAQ-Adding-or-removing-columns-in-my-list-views-in-Teamleader-Focus) to see which customers have an Octopus ID.

- 
[**Merge**](https://support.focus.teamleader.eu/hc/en-150/articles/25691760532241-How-To-How-can-I-merge-contacts-or-companies)** **the double entries **manually or automatically**.

 

### **Merging manually**

- Enter the name of a company. If there are 2 results, select **Actions **> **Merge**. 

 

**Note:** you can also merge using the details page of a company, under the three dots at the top. Teamleader Focus will automatically merge all fields, including customer number. In case of conflicting data, you'll have the option to select the correct entry. 

 

### **Merging automatically (highly recommended in case of > 50 duplicate records)**

- Create a segment with the rule 'Tags contain Octopus Import'. (all companies you just imported)

- Export this segment to Excel.

- In Teamleader Focus, perform the bulk action '**Delete**' on this segment.

- Delete any columns you don't need. (You only need "Name", "Accounting package customer number" and "VAT number".)

- Save the Excel file as .csv and import it in Teamleader Focus.

- If you need to enter merging criteria, choose Name (if the name rarely differs) or VAT number (if most VAT numbers are filled in). You can try different criteria and use the preview function to see how many companies will be added (this should be as low as possible).

- Once you completed the import, all **edited companies **have now been given the correct customer number.

- All **added companies** could not be matched. You'll have to go through these and **merge manually**.

 

Note: if everything went well, the '**Accounting package customer number'** field has been populated for all invoices. If this is not the case, compare your customer with the Excel file you exported. If your customer isn't in there, he'll be created in Octopus after the next sync.

 

## The actual connection with Teamleader Focus

- Click on the user icon on the top right corner and select '**Integrations/**[**Marketplace**](http://marketplace.teamleader.eu/)**'**. Search for '**Octopus**'.

- Enter the start date of the sync, and indicate you want to import companies from Octopus.

- Once you've entered username and password, connect the created journals to the invoices and credit notes.
*Note: Is your Octopus login connected to more than one Octopus account? Then you could have trouble seeing the right journals. Choose the right account and click on 'Link dossier' again to load the right journals.*
 

- Click '**Save'.**
**![Configuration form for linking a dossier and setting up an accounting integration, likely Octopus.](https://support.focus.teamleader.eu/hc/article_attachments/25691320194449)**

 

 

The VAT percentages in Teamleader Focus and Octopus are now connected. You can choose to select specific accounts automatically for specific VAT rates. 

 

**Note: **we advise setting the automatic synchronisation only after the connection has been established. 

 

## Starting the sync

- Click **Revenue **> **Invoices**.

- A **synchronisation symbol** will now be displayed on the right side.

- Click this symbol to re-sync with Octopus.

- After a while, you'll see a notification with the results of the sync. If you experience any problems, check these notifications first.

- The sync contains: the synchronisation of customers with linked invoices/credit notes, the (imported) invoices and credit notes, and payment information (reconciliation) from Octopus.

- After syncing, you can see the posted invoices in Octopus by selecting '**Accounting'** > '**Sales journal'**. Note: be sure to close the sales journal during the sync!

 

You can also import CODA files from your bank (**Accounting **> **Import **> **CODA files**). Match those payments with invoices through **Accounting **> **Reconcile **> **Reconcile customers**. Invoices that are reconciled in Octopus will automatically be set as paid in Teamleader Focus.

 

**Note**: when an invoice has obtained the status '**Paid**' in Teamleader Focus, it will also receive the status '**Paid**' in Octopus. However, when you change the payment status in Octopus, the status in Teamleader Focus will remain 'Paid' unless you change this manually.

 

## Troubleshooting

Your invoices don't get synchronized or you are encountering errors during the integration? [Read this article for some troubleshooting!](https://support.focus.teamleader.eu/hc/en-150/articles/25697678484497-How-To-Troubleshooting-Octopus)