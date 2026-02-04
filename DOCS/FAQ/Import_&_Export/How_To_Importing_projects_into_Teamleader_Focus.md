---
title: "How To: Importing projects into Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691671131025-How-To-Importing-projects-into-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:40:17Z"
updated_at: "2025-04-30T15:22:10Z"
category: "FAQ"
section: "Import & Export"
---

# How To: Importing projects into Teamleader Focus

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

You've just started with Teamleader Focus, but that doesn't necessarily mean you're starting from scratch. It may be possible that you have a list of projects that you'd like to import into Teamleader Focus. Well, you can!

 

Note that your import file (CSV or Excel) should contain certain information, and should be structured properly. More information on that can be found in this article.

 

Once your file is structured properly, simply send it to [our support](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) along with written consent. Our support team will then carry out the actual import.

 

**Important notes:**

- Each row in your file is a project, while each project phase should be a column.

- Adding projects to Teamleader Focus is only an add-on operation. This means that you cannot update existing projects but can only add new ones. Apart from that, the import works the same way as a CRM import: The columns need to be matched with the right field and the option to undo the import is also available for about two weeks.

- There needs to be min. one and max. ten phases per project.

- It is not possible to add extra employees to projects using the CSV-import. If you create a segment on the added projects, employees can be added as participants or final responsible with a fixed hour rate through 'Actions'.

##  

## Import file

### a) Fields for project itself

#### Mandatory columns

- 
Project name: Name/Title of the project

- 
Provided Budget: If there is no fixed budget, then fill in 0 in this field.

- 
Start date: Starting date of the project (recommended date format: yyyy-mm-dd)

- 
Customer name:Name of the customer

When a customer from your Excel or CSV file does not exist in Teamleader Focus yet, then a new company will be created by Teamleader Focus after the import.

- When the same company/contact name exists twice already in Teamleader Focus, then after the import the project will be linked to the company/contact last added to Teamleader Focus.

 

#### Optional columns

- 
Responsible: Name of the Teamleader Focus user who is responsible for the project.

- 
Project number: Fill in the number of your project; you cannot fill in letters in this field, only numbers.

- 
Custom fields: Custom fields on project level can also be filled in during an import, we advise you to create the necessary custom fields before you do the import

- 
Status: You can use one of the following values:

active: this is the standard value

- done: finished project

- cancelled: cancelled project

- onhold: project put on hold

- 
**Notes:** 

The names of project statuses need to be added in English. If you translate or modify the names of these statuses, they will not be recognised by Teamleader Focus.

- Make sure the statuses are added in lowercase letters, so don't add a capital letter at the beginning of the status.

- 
ID to match with a company: ID to match with a company. This needs to be custom field on company level of the type single-line text.

 

### b) Fields for related phases

#### Mandatory columns

- Name of the phase

- 
Budget: If there is no fixed budget, fill in 0 in this field. Note: The sum of the budgets of the phases cannot exceed the budget of the project.

- 
Billing method, can be one of these three options. If a wrong option is provided, “time_and_materials” will be used:

time_and_materials

- fixed_price

- non_invoiceable

- 
Due date: Due date of the phase. It needs to be later than the starting date of the project (recommended date format: yyyy-mm-dd).

 

#### Optional columns

- 
Responsible: If this field is left blank, the responsible of the linked project will be filled in.

- 
Closed: 0/1; 0 means that the phase is open (standard setting); 1 means that the phase is closed. For finished projects with status "done", 1 is the standard value.