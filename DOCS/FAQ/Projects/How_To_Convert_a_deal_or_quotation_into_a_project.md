---
title: "How To: Convert a deal or quotation into a project"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25695713796625-How-To-Convert-a-deal-or-quotation-into-a-project"
locale: "en-150"
created_at: "2024-06-06T09:38:07Z"
updated_at: "2026-01-09T16:00:09Z"
category: "FAQ"
section: "Projects"
---

# How To: Convert a deal or quotation into a project

![A 'How To' tutorial banner featuring a wrench and gear illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25690662955153)

 

*This article describes functionality of our new project module. This module is being rolled out gradually, so it is possible you do not have access to the features described here yet. If that is the case, *[*you can still find documentation on the previous project module here.*](https://support.focus.teamleader.eu/hc/en-150/sections/25690691571089) 

In Teamleader Focus, you have the option to convert a deal or a quotation into an existing or a new project, or to add quotation items to an already existing project template. Read this article to discover how.

 

# Converting to a project

You can either convert a quotation to a project, or a deal.

 

## Via your quotation detail page

To convert your quotation, go to your quotation detail page and click on the arrow next to 'Convert to invoice'. Choose **Convert ****to** **project**:

 

    ![Converting a deal to a project or invoice in Teamleader Focus](https://support.focus.teamleader.eu/hc/article_attachments/25691267873681)
  

 

    You get redirected to the following screen in which you can select which
    lines you want to convert to a project:
    
    ![The 'Convert quotation to project' interface showing line item selection and conversion options.](https://support.focus.teamleader.eu/hc/article_attachments/25695726367249)
  

 

- By default all lines are selected, but you can uncheck the items by clicking the box next to them.

- By default, all articles of your quotation will be tasks in the project, but you can bulk change them to materials here or click on the arrow next to the article.
*Note: if you selected a product from your product database in your account, or a *[*custom price unit*](https://support.focus.teamleader.eu/hc/en-150/articles/25691458413201-FAQ-How-can-I-add-units-to-my-products)* was selected, automatically it will be suggested to convert the article to a material in the project.*

![Interface for converting a quotation to a project, showing options to change items to tasks or materials.](https://support.focus.teamleader.eu/hc/article_attachments/25695664589329)

- When converting a quotation to a project, **negative lines** on the quotation are carried over as negative materials or groups in the project, following the same rules as positive lines. This ensures that e.g. discounts remain consistent when moving between quotations and projects.
 

Next, click on **Convert to project. **Here, you need to decide if you want to:
![The 'Convert to project' dialog box with options to create a new project or use a template.](https://support.focus.teamleader.eu/hc/article_attachments/34153183112593)
 

- **Create new project**

- **Create from template **(add the lines to a project template)

- **Add to existing project** (add the lines to an already existing project 

 

If you have set up [required custom fields on project level,](https://support.focus.teamleader.eu/hc/en-150/articles/25691611839633-FAQ-Can-you-make-fields-required-in-Teamleader-Focus) you'll need to fill these out in this screen as well before you can continue. 

### 

Create new project

If you chose to create a new project, you can skip ahead to the next paragraph ['After conversion'.](https://support.focus.teamleader.eu/hc/en-150/articles/25695713796625-How-To-Convert-a-deal-or-quotation-into-a-project#h_01JB98ZJ8YZ0WEF3CKP2GD98MM)
 

### Add to existing project

Choose the second option if you're already working on a project but need to add additional work. The new lines get added to the bottom of the work breakdown.

- First, you choose the project

- Secondly, you’ll be redirected to the following screen in which you need to decide what happens to the project budget:
**![The 'Add to existing project' dialog box for linking a quotation to a project budget.](https://support.focus.teamleader.eu/hc/article_attachments/29568169170321)**

Based on:

Quotation lines: only add/replace the selected quotation lines to the budget of the project

- Quotation total: add/replace the total amount of the quotation to the budget of the project

- Impact:

Add to project budgets: add the amounts on top of the existing project budget

- Replace project budgets

- Don’t change project budgets

- Depending on your choice, you have the option (checkbox) to proportionally update the budgets of underlying project lines based on the new project budget.
 

### Create from template

If you choose ‘Create from template’, you add the full content or part of the quotation to your project. 

- Choose a project template

- In the next screen, you decide what needs to happen to the project budget. (cf. above)
 

The quotation lines you selected will be added to the project next to the already present items from your project template (groups, tasks, materials, meeting placeholders,...). [Read more about project templates here.](https://support.focus.teamleader.eu/hc/en-150/articles/27877954273297-How-To-Project-templates-in-Teamleader-Focus)

 

### After conversion

After conversion the following things happened to your project:

- The subtitles of your quotation become ‘groups’ in the project

- The products of your quotation become tasks/materials (according to what you selected)
Materials: if defined in the quotation lines, [custom price units of products](https://support.focus.teamleader.eu/hc/en-150/articles/25691458413201-FAQ-How-can-I-add-units-to-my-products) are also taken over
![Project planning overview in Teamleader Focus showing the work breakdown structure.](https://support.focus.teamleader.eu/hc/article_attachments/25695726502161)
 

- The project and the deal/quotation will be linked, which means the project will be displayed within the deal and the quotation, and the deal and quotation will be displayed within the project.
*Note: When converting a deal/quotation to an existing project, the deal and the quotation will (additionally) be added to the project info too.*

- The customer of your quotation is filled in automatically as the customer of your newly created project, or in the case of an already existing project, added as additional customer to your project.

- The ‘Price’ of your project is the total amount of the materials in your quotation (or at least the materials you selected). The unit prices will be taken over.
*Note: for an existing project/project out of a template, the price will be updated with the materials you selected from the quotation.*

- The 'Time budget' of your project is the total time taken over from the tasks in your quotation (or at least the tasks you selected). Each task receives an 'estimated time' of x hours based on the quantity in your quotation line(s), and it's the total estimated time of all these quotation tasks.

 

**If you've added a new project, these additional things happen too:**

- The title of your quotation is filled in automatically as the title of your newly created project (but you can of course change this).

- The billing method of the project, as well as the underlying groups, will be ‘Time and materials’ by default.

- The 'Budget' of your project will be prefilled with the prices on the quotation. When changing the billing method to 'Fixed' price, the Price will be prefilled with the corresponding budget. This way, no prices from the quotation are lost.

 

Afterwards, you can find the linked project in the follow-up tab of your quotation page.

 

    ![The follow-up tab of a quotation showing linked invoices and projects.](https://support.focus.teamleader.eu/hc/article_attachments/25691295456145)
  

 

### Via the deal page

To convert your deal, go to [your deal page](https://support.focus.teamleader.eu/hc/en-150/articles/25697814636305-How-To-Deal-overview-per-customer-and-deal-page) and next to 'Follow up on your deal', click on the **plus ****icon **> **Project**.

 

If you have [multiple quotations](https://support.focus.teamleader.eu/hc/en-150/articles/25693685516433-How-To-Multiple-quotations-in-Teamleader-Focus) in your deal, you'll first need to choose which quotation you want to create a project from. 

 

Afterwards, you'll find the linked project in the Projects tab of your deal.

 

## Link deal to project afterwards

As stated above, your deal and your project will be linked when you've created a project out of your deal. However, there's a way to link your project to your deal if you first created your project and then your deal: 

- Simply navigate to the project

- Add the field ‘Deals’ to the header of your project if you haven’t already

- Click on **+Deal**

- Select your deal

 

## Unlink a deal from a project

Easily **unlink** a deal or a quotation from your project by navigating to your project and clicking on the little cross next to the deal or quotation.
![Project or task details panel showing owners, assignees, customers, and linked deals.](https://support.focus.teamleader.eu/hc/article_attachments/41857261283985)

 

# Note

It's important to know that you can link multiple projects to the same deal or quotation. You’re not limited to a single project. This gives you a clearer overview of the full scope and lets you manage everything from one central place.