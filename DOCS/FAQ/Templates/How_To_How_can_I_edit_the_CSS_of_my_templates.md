---
title: "How To: How can I edit the CSS of my templates?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25692055679889-How-To-How-can-I-edit-the-CSS-of-my-templates"
locale: "en-150"
created_at: "2024-06-06T07:54:18Z"
updated_at: "2025-04-30T15:22:11Z"
category: "FAQ"
section: "Templates"
---

# How To: How can I edit the CSS of my templates?

![](https://support.focus.teamleader.eu/hc/article_attachments/25692079171985)

 

When you set up templates for quotations, invoices, etc, you generally use a Word document to set up your own corporate identity. More information on the general set up of your corporate identity can be found [here](https://support.focus.teamleader.eu/hc/en-150/articles/25692647207057-How-To-Customizing-your-templates-in-Teamleader-Focus).

 

Some parts of a template however, cannot be defined in your Word document. To modify these parts, you'll need to use CSS code.

 

**Note:** When you've edited the CSS of one template, all CSS code of other templates with the same layout variation will automatically be edited accordingly. 

 

1. To edit CSS code, simply navigate to **Settings** > **Document layout** > and choose the document you want to modify. 

Click '**Show** **a****dvanced options'  **and** 'Edit' **Custom CSS

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25692092055697)

 

 

2. On the following screen, you'll find the CSS code as displayed below:

![](https://support.focus.teamleader.eu/hc/article_attachments/25692079268497)

 

### CSS code consists of three parts:

- 
**HTML**
The part of the text that you want to edit (e.g. ‘p’ for normal text)

- 
**Properties**
The properties you want to edit

- 
**Value**
The value for those properties

- 
**Other syntax**
You always need to open and close the code with ‘{}’ and end a line with ‘;’
If not, all subsequent code will not be seen as code.

 

An example for the three parts: p {color:#000000;}

- HTML: p

- Properties: color

- Value: #000000

 

## HTML-tags

If relevant, these HTML tags can be used in the CSS code:

- p for normal text

- h1 for the first header

- h2 for the second header

- h3 for the third header

- h4 for the fourth header

- ol for entire list

- li for list items

- * for all tags

 

## CSS text properties

### Font family

- The font of a text is set with the font-family property.

- Start with the font you want, and end with a generic family, to let the browser pick a similar font in the generic family, if no other fonts are available. A list of fonts and their font family: [http://www.cssfontstack.com/Web-Fonts](http://www.cssfontstack.com/Web-Fonts)

- Note:

If the name of a font family consists of more than one word, it must be placed in quotation marks, cf.: "Times New Roman”.

- You need to use double quotes and not single quotes. If you copy the font-family from [www.cssfontstack.com](http://www.cssfontstack.com/) (as displayed above) this will need to be changed.

- Not all font-families are available in the CSS in Teamleader Focus. If your font happens to be unavailable, we recommend to check for a similar one.

- Example: *p {font-family: "Times New Roman";}*

 

### Font color

- The color of a text is set with the color property.

- Value can be [hexa-decimal or RGB](http://www.w3schools.com/colors/colors_picker.asp). RGB can be derived from the Word document by clicking on "More colors" when choosing your color.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25692046993937)

On the next screen, you'll need to go for **'Custom'** to see the values of the color you have used.

![](https://support.focus.teamleader.eu/hc/article_attachments/25692054253457)

 

- Example:*p {color:* *rgb(0,0,0);} **OR **p {color:#000000;}*

### Font size

- The font-size property sets the size of the text.

- By default, px is the used unit. However, Word uses 'points' as unit. To use the same unit in CSS use ‘pt’ or use a pt to px convertor: f.e.: [https://www.endmemo.com/topography/pixelpoint.php](https://www.endmemo.com/topography/pixelpoint.php)

- Example: *p {font-size: 12pt;}*

- Font style:

The font-style property is mostly used to specify italic text.

- This property has three values:

normal - The text is shown normally

- italic - The text is shown in italics

- oblique - The text is shown in oblique

- Example: *p {**font-style: italic;**}*

### Font weight

- The font-weight property specifies the weight of a font.

- Example:** ***p {font-weight: bold;} **-OR- **p {**font-weight: 400;**}*

- Line height

The line height property is used to specify the space between lines.

- The percentage 100% stands for the font size of the text.

- Example:** ***p{**line-height: 200%;**} **-OR- **p{**line-height: 20pt;**}*

 

## CSS code for quotations and invoices in Teamleader Focus

 

### Long description of articles

- Use ‘tag’.description to edit the mark-up for the long description of products (=shortcode $LONG_DESCRIPTION$).

- With p.product_image you edit the mark-up for the product image.

- ‘p.description’ will edit the normal text

- ‘ul’ (bullet points) and ‘ol’ (numbered list) will edit the mark-up for lists.

**Default**

*/* example styles for html used in longer article descriptions on invoices or quotations */*

*p.description{color:#666666;font-size:11px;margin-top:6px;margin-bottom:0px;margin-left:12px;}*

*p.description *{font-size:11px;}*

*p.product_image{margin-left:12px;margin-top:0px;margin-bottom:0px;}*

*ul.description li{background-color:none;}*

*ul.description li:first-child{margin-top:6px;}*

*ol.description li{background-color:none;}*
*ol.description li:first-child{margin-top:6px;}*

 

### Quotation text

- Use .quotation_text ‘tag’ to edit the mark-up for the shortcode $QUOTATION_TEXT$.

- Tag h1, h2, h3, h4, p, li can be used. Use no tag to affect all tags.

- You can also define parts in your quotation text which have a different font weight, e.g. text in bold via the tags normal, bold, bolder, lighter
Example: .quotation_text strong{font-size:30px; color:#00FF00 to further define all text which is in bold

- For the CSS of the quotation text, web-safe fonts are supported, such as Arial, Calibri, Courier New, Gill Sans, Lucida Sans Unicode, Times New Roman, Verdana,... Find more information about these web-safe fonts [here](https://blog.hubspot.com/website/web-safe-html-css-fonts).

**Default**

*/* example styles for the WYSIWYG quotation text */*

*.quotation_text p{font-size:12px; color:#000000}*

*.quotation_text li{font-size:12px; color:#000000}*

 

**Example**

*.quotation_text {**font-family:"Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif;**}*

*.quotation_text h1 {**font-size:18pt;**font-weight: bold;**}*

*.quotation_text h2{**font-size:14pt;**font-weight: bold;**}*

*.quotation_text h3{**font-size:12pt;**font-weight: bold;**}*

*.quotation_text h4{**font-size:10pt;**font-weight: bold;**}*

*.quotation_text p{**font-size:10pt;**color:#000000;**}*

*.quotation_text li{**font-size:10pt;**color:#000000;**}*
*.quotation_text table{font-size:12px; color:#000000}*

 

### Signature area on quotations

- By using ‘#signature_area’ in the text properties, the signature area can be edited (Shortcode = $DOCUMENT_SIGNATURE_AREA$).

- Up until now, our CSS-code only edits text properties.

- For the signature it is possible to edit more than that. The signature area is actually a table.

- So it can be edited by using CSS properties for tables, more info can be found by clicking the following link: [http://www.w3schools.com/css/css_table.asp](http://www.w3schools.com/css/css_table.asp).

**Default**

*/* example styles for the signature area on quotations */*

*#signature_area{font-size:14px;}*

*#signature_area hr{color:#CCC;}*

*table.signature_area{width:100%}*

*table.signature_area td{width:50%;vertical-align:top;}*

*table.signature_area td:first-child{text-align:left}*

*table.signature_area td:last-child{text-align:right}*

*table.signature_area td:last-child img{float:right;}*

 

**Example**

*/* example styles for the signature area on quotations */*

*#signature_area{**font-size:12px;**color: #000000;**font-family: "Times New Roman";**}*

 

### VAT summary table

- Via this CSS code you define the mark-up for the shortcode $VAT_SUMMARY$

- Similar to the signature area, the VAT summary table is a table. See "Signature area on quotations" for more information.

**Default**

*table.vat_summary{font-size:14px;margin-left:100%;}*

*table.vat_summary th{border:1px solid #CCC;}*

*table.vat_summary tr{line-height:26px;}*

*table.vat_summary td{border:1px solid #CCC;}*

*table.vat_summary td:last-child,table.vat_summary th:last-child{text-align:right;}*

*table.vat_summary .vat_rate{width:20%;}*

 

### Comments on invoices

- Use p.comments ‘tag’ to edit the mark-up for the shortcode $COMMENTS$.

- Tag h1, h2, h3, h4, p, li can be used. Use no tag to affect all tags.

**Default**

/* example style for comments on invoices */p.comments{font-size:12px;}

 

 

To be able to edit the layout of the shortcodes $INVOICE_REFERENCE$ and $LEGAL_NOTES$ you have to edit the General Styles. Note that you cannot edit them individually, all changes made on these general styles will be applied to these two shortcodes:

 

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25692069791249)

 

 

**Note:**

When editing a template in this way, CSS has priority meaning that the CSS mark-up will be used, and not the mark up of the Word file.