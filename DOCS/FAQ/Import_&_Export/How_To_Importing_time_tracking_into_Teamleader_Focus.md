---
title: "How To: Importing time tracking into Teamleader Focus"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691706103569-How-To-Importing-time-tracking-into-Teamleader-Focus"
locale: "en-150"
created_at: "2024-06-06T07:40:27Z"
updated_at: "2025-11-04T16:26:55Z"
category: "FAQ"
section: "Import & Export"
---

# How To: Importing time tracking into Teamleader Focus

![](https://support.focus.teamleader.eu/hc/article_attachments/25691677966225)

 

When you're getting started with Teamleader Focus, it may come in handy to import the time tracking from your old system to have all the data you need in your new tool. Teamleader Focus allows you to do this easily!

 

Note that your import file (CSV or Excel) should contain certain information and should be structured properly. You'll find more information on this throughout this article.

 

Once your file is structured properly, simply send it to [our support](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) along with written consent. Our support team will then carry out the actual import.

 

**Important notes:**

    - 
      The import of time tracking is an add-on operation. This means that you
      cannot edit existing time tracking but only add new one. Apart from that,
      the import works the same way as a CRM import: The columns need to be
      matched with the right field and the option to undo the import is also
      available for about two weeks.
    

    - 
      You can only import general time tracking. Time tracking linked to a
      task, call, etc. cannot be imported.
    

  
 

## Import file

### Mandatory columns

    - 
      Start date: Starting date of the time
      tracking (recommended date format: yyyy-mm-dd hh:mm)
    

    - 
      End date: End date of the time tracking,
      this needs to be on the same date as the start date (recommended date
      format: yyyy-mm-dd hh:mm)
    

    - 
      Description: Description of what action
      has been performed
    

    - 
      Column to link to a customer:1
      of the following 3 options
      

        
          Name of the customer: This can be the name of a contact or a
          company. In the case of a company, the name has to exactly match
          with the name in Teamleader Focus. In the case of a contact,
          the name has to exactly match with the full name in Teamleader
          Focus: first name last name (with a single space in between).
          If the customer is not found, a new company will be added. We
          will notify you if this is the case. In the same Excel file you
          can add time tracking for contacts and companies.
        

        - 
          ID to match with companies or contacts: If you don't want to
          match the customers by their name, you can also match them using
          a unique ID. This can be a custom field of the type single-line
          text or number.

        

      

    
  

  
    **Note:** Files
    will often only include the date and the duration of tracked time. But in
    order to import time tracking into Teamleader Focus, you need to enter a
    start and an end date and hour (remember; the end date of the time tracking needs to be on the same date as the start date).
    This can be solved by copying the column start date and displaying it in
    the format yyyy-mm-dd hh:mm. You then add another column for the end date
    and calculate it based on the duration. Be aware that Excel works with a
    24h scheme.
  

 

See example below:

    
      
        
          
        
        
          **A**
        
        
          **B**
        
        
          **C**
        
        
          **D**
        
      
      
        
          **1**
        
        Date
        Duration
        Start date
        End date
      
      
        
          **2**
        
        2015-04-14
        2,5
        2015-03-14 00:00
        2015-03-14 02:30
      
      
        
          
        
        
          
        
        
          
        
        
          **=A2**
        
        
          **=C2+B2/24**
        
      
    
  ####  

#### Optional columns

    - 
      User: Name of the user who tracked
      time. This needs to be an active Teamleader Focus user.
    

    - 
      Invoiceable: 0/1; 0 means that it is
      not invoiceable, 1 means it is invoiceable. The standard value in this
      field is 0.
    

    - 
      Work type: You can choose a work type
      for the tracked time but be aware that those work types need to be created
      beforehand via **Settings **
      **Calendar**. If you didn't specify
      a work type for your time tracking, then the default work type will be
      used.