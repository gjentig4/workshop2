---
title: "How To: Customising your document templates in Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692647207057-How-To-Customising-your-document-templates-in-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T08:09:42Z"
updated_at: "2025-12-26T10:24:05Z"
category: "FAQ"
section: "Templates"
---

# How To: Customising your document templates in Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

Integrating your own house style in Teamleader Focus? Easy. With the Word template builder you can personalize invoices, quotations and other documents in no time. No time to read? Watch our video about document templates:

## 

Some explanation

### Microsoft Word

Integrating a house style in Teamleader Focus is done by combining a Microsoft Word document (.docx) with certain shortcodes. Since you’re using Word to compose your document, all of the style elements within Word can be used to define your lay-out. Teamleader Focus recognizes these elements and transfers them to your invoice and quotation lay-out.

 

### Shortcodes

Shortcode are small snippets of text that Teamleader Focus will recognise and replace by the corresponding information from the tool. In your Word document, place them where you want the info to appear. Shortcodes start and end with a $-sign and are written in capitals. This is an example of a shortcode:

 

$DEPARTMENT_INFO$
 

You can look up the complete list of available shortcodes in **Settings **> **Document Layout **> choose a type of document > **View shortcodes**. If a certain shortcode is not present in the list then it also isn't available for that type of document.

##  

## Creating your own house style

### General

- Go to **Settings **and click on **Document layout**

- Click on the layout you would like to change

- Click on **Download example template**
! *Important remark: before you want to personalise, make sure a document has already been created for the particular template you want to personalise. E.g. If you want to customise an invoice template, first create a draft invoice in your account.*

- Now you can get creative in the downloaded Word document or you can make your own design in an all new document.

Here are a few tips we'd like to give you:

Use tables: tables use a fixed position in your document, so elements in the table won’t just involuntarily move. This is especially recommended for the contents of the invoice or quotation.

- Your logo: Know that you can easily adjust the size of your logo on your documents by adding the right shortcode matching your desired size! [Read all about it here.](https://support.focus.teamleader.eu/hc/en-150/articles/33221918241809-FAQ-Can-I-adapt-the-size-of-my-logo-on-my-templates) You can also import an image straight into your Word document. This will make it appear on your invoice/quotation and you'll be able to choose the size of the image. This applies to other images you would like to add as well.

- The table: the table contains the most valuable information for your customer. Make sure it remains clear and uncluttered and always use the provided shortcodes to retrieve the correct data.

- Page breaks: if you want to start a new page in the middle of your document, use the shortcode $PAGEBREAK$.

- Plain text: if you have text that appears by default on your invoices or quotations, you can just add it to the Word document and it will always be visible.

- If you need translations for plain text, you can create extra shortcodes.

- Shortcodes to present article information always need to be placed inside a table, for example  $AMOUNT$, $PRICE_PER_UNIT$ and $LINE_TOTALS$

- Custom fields: if you’ve created some custom fields in Teamleader Focus, you’re able use them in your template. You can find them at the bottom of the list of shortcodes.

 

- Ready layouting? Save your document as a .docx file

- Go back to Teamleader Focus and click “**Upload template**”. Teamleader Focus will immediately create a preview based on your document (if you have created an invoice or quotation before).

 

### Using a custom font

In this article about[ embedding your own font in your document](https://support.focus.teamleader.eu/hc/en-150/articles/25690938314513-FAQ-Can-I-use-my-own-font-in-the-layout-of-my-documents), you will find all necessary information.

 

### Custom CSS

Are you familiar with CSS (Cascading Style Sheets)? Below **‘Show advanced options**’ you can use CSS to fine-tune your layout even further. This article about [editing the CSS of your templates](https://support.focus.teamleader.eu/hc/en-150/articles/25692055679889-How-To-How-can-I-edit-the-CSS-of-my-templates) will help you further.

 

## Some remarks

- Do not upload the same Word document for quotations as for invoices. Both have different shortcodes that do not retrieve the same information.

- The file size of your document is limited to 4MB, so watch out with adding large images.

- Need help setting up your document templates? Then you can book a one-hour session with an onboarding manager via your license page. [Read all about it here!](https://support.focus.teamleader.eu/hc/en-150/articles/25693558117905-Need-personal-assistance)