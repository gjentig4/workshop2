---
title: "How To: Prefill contact form and booking page questions"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25695956076817-How-To-Prefill-contact-form-and-booking-page-questions"
locale: "en-150"
created_at: "2024-06-06T09:45:51Z"
updated_at: "2025-04-30T15:21:23Z"
category: "FAQ"
section: "Contact widgets & Contact forms"
---

# How To: Prefill contact form and booking page questions

![](https://support.focus.teamleader.eu/hc/article_attachments/25695954816401)

When integrating a contact form or booking page in your app, platform or website, you can add data in the URL to prefill some answers of questions and improve the customer experience.

 

Adding the data to the URL is pretty easy and can be done via a URL parameter. As contact forms and booking pages consist of several [types of questions](https://support.focus.teamleader.eu/hc/en-150/articles/25695587505553-How-To-What-types-of-questions-can-I-add-to-my-meeting-type), you will need to have a good look at which data to add for which type of question.

 

*The prefill functionality works for all question types of contact forms. For booking pages however, prefilling isn't functional yet for all question types. This will be updated soon!* 

 

**In this help article**

- [Adding data via a URL parameter](#Adding-data-via-a-url-parameter)

- [Question ID](#Question-ID)

- [Question types](#Question-types)

## Adding data via a URL parameter

*Here we'll take a contact form as an example, but know you can do the same for your booking pages.*

 

Basically all you have to do is add a parameter with information to the contact form URL to prefill questions. 

 

A contact form URL looks like this:

- Teamleader Focus domain: https://cloud.teamleader.eu//forms//

- Custom domain: https://something.mydomain.com/forms//

 

You can add a parameter by adding **?questions.questionID=Answer**.

Add a second question by adding **&questions.****questionID=Answer**.

 

So a contact form with 2 filled in questions will look like this:
**https://cloud.teamleader.eu//forms//?questions.****questionID=Answer****&questions.****questionID=Answer**

 

## Question ID

 

You can copy the question ID of a contact form question by following these steps:

- Go to [https://meeting.teamleader.eu/contact-forms/](https://meeting.teamleader.eu/contact-forms/)

- Click on the pencil icon next to the contact form that you want to prefill

- Click on the 3 dots next to the question that you want to prefill

- Click on **Copy question id**

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25695924295569)

 

## Question types

The answers to most of the question types are pretty straightforward, you** just type in the value**.

 

A few examples:

- Single line: questions.=**simon**

- Email address: questions.=[**simon@company.com**](mailto:simon@company.com)

- VAT number:  questions.=BE0123456789

 

Some question types require a specific type of answer value. These are the values to set:

 

**Question ****type**
**Answers**
**Example**

Single selection
The label of the option. If the question has an "other option, you just have to type the word.
Option1
or
randomword

Multi selection
A comma separated list of options. If the question has an "other" option, one of the values can be a random word.
Option 1,Option 2,randomword
**see note 1*

Yes/No
0 (=no) or 1 (=yes)
0

Checkbox
1 (=checked)
1

Address
A comma separated list with 5 values: street, number, postal code, city, country code**
Dok-Noord,3A/101,9000,Gent,BE

Date
yyy-mm-dd
2023-09-07

 

**Note 1: for single and multi select questions the answer needs to be the exact value. *

- *Capital letters need to be added. *

- *Spaces need to be added in the form of %20.*

- *Newlines need to be added in the form of either %0A or \n*

*****Note 2: the country of the address must be according to the *[*official country codes*](https://www.w3schools.com/tags/ref_country_codes.asp)*, in capital letters. E.g. if the country is Belgium you fill out 'BE'.*

 

*Note 3: It's not possible to prefill an Attachment/file question.*

 

### Example

To prefill the questions of the following form as follows:

- Max

- James

- maxjames@company.com

- Yes 

- 1994-01-16

- Option 1 & Other = Cheese

- Dok-Noord,3A/101,9000,Gent,Belgium

![](https://support.focus.teamleader.eu/hc/article_attachments/25695924322705)

 

I will need to add the following parameter to the contact form URL:

 

?questions.ID=Max&questions.=James&questions.ID=maxjames@company.com&questions.ID=1&questions.ID=1994-01-16&questions.ID=Option%201,cheese&questions.ID=Dok-Noord,3A/101,9000,Gent,Belgium

 

*Note: Option 1 has a capital letter and a space and needs to be added as Option%201.*

 

Which results in:

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25695954948113)