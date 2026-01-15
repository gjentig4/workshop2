---
title: "How To: Create price lists"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25691973505809-How-To-Create-price-lists"
locale: "en-150"
created_at: "2024-06-06T07:51:24Z"
updated_at: "2025-12-31T13:18:37Z"
category: "FAQ"
section: "Products"
---

# How To: Create price lists

![](https://support.focus.teamleader.eu/hc/article_attachments/25691965003793)

 

Price lists in Teamleader Focus allow you to set different pricing for your products, making it easy to decide which customers get charged which prices. This is especially useful for offering loyal customers more beneficial prices automatically. Instead of manually entering prices for each product, Teamleader Focus uses calculation methods to determine prices in your price lists. 
 

## How does it work?

You can start creating price lists via **Settings >** **Products >** Button **+**. You’ll get to see the following screen:

![](https://support.focus.teamleader.eu/hc/article_attachments/25691972331409)

 

Give your price list a name and select the preferred calculation method. You’ll get three options:

- Normal: this is your default price for a product. You can use it as a benchmark.
*Note: *This normal price list is by default present in a new account. However, you could also add additional price lists of the type "normal" (this means they don't have to refer to another price list and can just exist on their own).

- Calculated from unit cost: by selecting this, Teamleader Focus will calculate your product price based on your unit cost multiplied by a factor by your choice.

- Calculated from other price list: Teamleader Focus will calculate the price based on another price list whose 'Calculation Method' is Normal. 

 

Once you have selected the calculation method, click ‘Save’ to continue.

 

## Applying your price lists

It’s **important** to know that a price list always applies to a contact or company within Teamleader Focus. It never applies to a certain product.

 

To assign those price lists to a certain contact or company, you have to go to the customer page and click on the pencil to edit it. Among all the fields, you will find one called ‘Pricelist’, where you can select the list that you want to apply to this customer.

 

If you’re creating a quotation or an invoice for this customer, the product price will be calculated using the conditions you set earlier when creating the price list.

 

If you do not set a specific price list to a customer, he will always be charged the default price.

 

### Using a price list to give a discount

Our customers often use price lists as a way to give an automatic discount to a certain customer. You could do this specifically for your loyal customers for example, and assign to them a more beneficial price list.

 

## Example

We’re happy to give you a more in-depth example of how to use price lists.

 

1. Let’s start by creating two price lists:

- One with a default price

- Another one with a factor x2 based on the unit cost

 

2. We create a Company Y with a price list set as 'normal price', and a Company Z with a price list set as x2. 

 

3. Then, we also create a new product, that we will call 'Product X', with a unit cost of €10 and a default price of €15.

 

4. With all this data, we are ready to create a quotation for 'Company Y', who is being charged according to our default price. We’ll use the Product X to make the quotation:

![](https://support.focus.teamleader.eu/hc/article_attachments/39181263154705)

5. To finish our example, we also create a quotation using the same Product X for Company Z, who is being charged based on our price lists with factor times 2:

**![](https://support.focus.teamleader.eu/hc/article_attachments/25691972402321)**

 

As you see, the price for Company Y is the same as the default price we’ve defined earlier for our Product X. However, Company Z is being charged more, the unit cost (€ 10) times factor 2 (10*2 = € 20).

 

*Note*: Price lists only affect the price of articles that have been added in the Products module. It won't impact prices of time tracking, travel costs or manually added articles that aren't mentioned in the Products module.