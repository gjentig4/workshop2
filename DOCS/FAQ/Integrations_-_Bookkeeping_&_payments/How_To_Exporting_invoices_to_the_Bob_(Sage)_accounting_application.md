---
title: "How To: Exporting invoices to the Bob (Sage) accounting application"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692579208337-How-To-Exporting-invoices-to-the-Bob-Sage-accounting-application"
locale: "en-150"
created_at: "2024-06-06T08:06:46Z"
updated_at: "2026-01-09T12:27:03Z"
category: "FAQ"
section: "Integrations - Bookkeeping & payments"
---

# How To: Exporting invoices to the Bob (Sage) accounting application

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

## Step 1: BOBLink and BDE

 

In addition to Bob, you'll need the **BOBLink application **to be able to export invoices to Bob. If you do not have this yet, you can contact your distributor.

 

To use BOBLink, you also need a **BDE**, which you can also get from your distributor. **Installing the BDE ensures that BOBLink can be used**. Installing the BDE is simple: just execute Setup.exe. After it has been executed, you will see in your Control Panel that a BDE Administrator has been added. This tells you that BDE has been installed correctly.

 

![Windows Control Panel search result for BDE Administrator (32-bit)](https://support.focus.teamleader.eu/hc/article_attachments/25692561543569)

 

## Step 2: BOB.ini

 

To be able to continue, it is important to know what the installation and data folders are. You can find this information by **clicking the question mark** in Bob and selecting "**Information**"; in this example, the installation folder is c:\b50adsdemo and the data folder c:\b50adsdemo\data.

 

![Info dialog in Sage BOB 50 showing version, installation folder, and data folder paths.](https://support.focus.teamleader.eu/hc/article_attachments/25692501619473)

 

In the installation folder, click the file "**BOB.ini**" and select edit. The file will look something like this:

 

`[VERSION] `
`UserPriority=YES`
`DefaultLang=NLB`

`[DIR]`
`COMMONDATA=c:\b50adsdemo\data\COMMON `
`METADATA=c:\b50adsdemo\METADATA`

`DEFAULTFOLDERDATA=c:\b50adsdemo\data`

`COMMUNICATION=c:\b50adsdemo\data\COMMON\COMMUNICATION`

`**LINK=c:\b50adsdemo\data\link**`

`[980000]`

`PROFIDUC=YES`

`FOLDERGEST=NO`

`[OPTIONS]`

`PROFIDUC=YES`

`FOLDERGEST=NO`

`CONFIRMCLOSE=NO`

 

If the line in bold is not present, you must add it. The link path consists of your data folder with "\link" after it.

 

## Step 3: Adjusting BATCH scripts

 

To be able to import customers and invoices, we provide 2 batch scripts. You can download a zip file with the 2 files [here](https://support.focus.teamleader.eu/hc/en-150/article_attachments/35411025682065). After extracting the files, you can edit them by right-clicking them and selecting edit.

 

The files will look as follows (both files must be edited in the same way):

 

`C:\b50adsdemo\BOBLINK.exe /CIE=DOSSIER_CODE /USR=USERNAME_CODE /LOG=Foutenlog_facturen.log /MOD=ENTRYSAL /HDF=Sales.txt /LNF=Sales_detail.txt /INTEMP`

`C:\b50adsdemo\BOBLINK.exe /CIE=DOSSIER_CODE /USR=USERNAME_CODE /LOG=Foutenlog_klanten.log /MOD=CUSTOMER /MNF=Sales_customers.txt`

Replace "C:\b50adsdemo" with the path to your installation folder and we recommend actually checking that the "BOBLink.exe" file is there. Replace DOSSIER_CODE with the file code and replace USERNAME_CODE with your user code. You can see both codes when you login to Bob; this is/CIE=IF/USR=JAN in the case below.

 

![Login dialog for Sage BOB 50 Expert integration with user and dossier selection fields.](https://support.focus.teamleader.eu/hc/article_attachments/25692527844753)

 

The batch scripts must be saved to a special location. To that end, create a "LINK" directory containing yet another directory with the code of your file as its name in your data folder. Next, paste the .bat files in it. For this example, the paths of the .bat files will look like this:

 

C:\b50adsdemo\data\LINK\IF\Import_facturen.bat
C:\b50adsdemo\data\LINK\IF\Import_klanten.bat

 

## Step 4: Exporting invoices and customers from Teamleader Focus

 

[Article: Exporting invoices and customers from Teamleader Focus](https://support.focus.teamleader.eu/hc/en-150/articles/25692666955153-How-To-Exporting-invoices-from-Teamleader-Focus-to-import-into-your-bookkeeping-application)

 

## Step 5: Importing invoices and customers into Bob

 

Put the files from the .zip file in the same directory where the .bat files are. Next, execute Import_klanten.bat. 2 screens will be displayed when the execution is successful:

 

![Technical view of the BOB 50 accounting export process using batch files and command prompt.](https://support.focus.teamleader.eu/hc/article_attachments/25692561765265)

 

If only 1 window is displayed, the path to your installation folder may not be correct in the .bat files. If 2 windows are displayed and there is also an error log file (Foutenlog_klanten.log), something failed. You can find more information about this in the log file. For example, an error can occur if the journal is not found, a fiscal year does not yet exist or has already been closed. If you do not understand the error message, please [contact us](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) and forward the log file.

 

Once the customers have been imported and you have verified that the customers are actually present in Bob, you can import the invoices by executing Import_facturen.bat. This works the same way as importing customers.

 

*Note*: [Multi-currency invoices](https://support.focus.teamleader.eu/hc/en-150/articles/25692864101137-How-To-Multi-currency-in-Teamleader-Focus) will be exported in the account currency. This means that invoices created in US Dollar, for example, in an account with Euro as currency will be exported in Euro.