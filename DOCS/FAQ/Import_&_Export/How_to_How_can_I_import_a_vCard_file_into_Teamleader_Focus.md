---
title: "How to: How can I import a vCard file into Teamleader Focus?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692238128657-How-to-How-can-I-import-a-vCard-file-into-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T08:00:00Z"
updated_at: "2025-05-04T14:02:08Z"
category: "FAQ"
section: "Import & Export"
---

# How to: How can I import a vCard file into Teamleader Focus?

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

When exporting contacts from your phone, you'll often end up with a vCard file instead of an Excel or .csv file, which you need to import contacts and companies into Teamleader Focus.

 

You can, however, convert this vCard file into a .csv file. Read on to find out how!

 

## 1. Convert vCard file to CSV

You can use [this website](http://labs.brotherli.ch/vcfconvert/) to convert vCard files to CSV files. The title of the new file should be structured as follows: CSV, semicolon, header line, Unicode (UTF-8)

![Form for converting vCard files to CSV format with custom encoding and filter options.](https://support.focus.teamleader.eu/hc/article_attachments/25692215625233)

 

## 2. Change the encoding of the file

In order to convert the encoding of the file, you'll need to open it in [notepad++](https://notepad-plus-plus.org/downloads/) and change the encoding from "UTF-8 with BOM" to "UTF-8".

![Selecting 'Convert to UTF-8' in Notepad++ to fix CSV encoding for Teamleader Focus imports.](https://support.focus.teamleader.eu/hc/article_attachments/25692215672209)

##  

## 3. Find and replace the quotes

Carry out a find and replace operation and replace ’ (backquote) by ' (single quote). Then, save and replace the file.

![The Search menu in Notepad++ with the 'Replace...' option highlighted.](https://support.focus.teamleader.eu/hc/article_attachments/25692208564753)

 

![The 'Replace' dialog box in a text editor showing search and replace options.](https://support.focus.teamleader.eu/hc/article_attachments/25692215784081)

##  

## 4. Open the file in Excel

Now open this file via Excel, delete the non-necessary columns and change country names to ISO codes.

 

## 5. Do the actual import

When your file is ready to be imported, you should read [this article](https://support.focus.teamleader.eu/hc/en-150/articles/25691800529297-How-To-Importing-contacts-and-companies-to-Teamleader-Focus) first before you proceed. You can then carry out the import on contact level.

 

Notes:

- Merge criterion should be the name.

- Companies without a related contact will be ignored when doing the import on contact level.