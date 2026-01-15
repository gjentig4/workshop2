---
title: "How To: Identify custom fields in Zapier"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25693176138513-How-To-Identify-custom-fields-in-Zapier"
locale: "en-150"
created_at: "2024-06-06T08:25:28Z"
updated_at: "2025-12-30T15:02:42Z"
category: "FAQ"
section: "Integrations - Web2Lead"
---

# How To: Identify custom fields in Zapier

![](https://support.focus.teamleader.eu/hc/article_attachments/25693158846353)

 

*You’re probably in the middle of creating a *[*form integration via Zapier*](https://support.focus.teamleader.eu/hc/en-150/articles/25693152447121-How-To-Link-your-online-form-to-Teamleader-Focus-via-Zapier)*. While setting up a template, Zapier will ask you to define the IDs of custom fields. It’s a way to make sure that the communication between both apps runs as smoothly as possible.*

 

Unfortunately, these IDs can’t simply be found in Teamleader Focus: you’ll have to fetch them using an endpoint in the program ‘**Insomnia**’. You don’t need any developing skills whatsoever, you only need to download the program for free [here ](https://insomnia.rest/download/)and authenticate yourself in Insomnia.

 

### Authenticate yourself

You will need to choose '**OAuth2**' as authorization type after creating a new request in Insomnia.

 

The *Authorization URL* and *Access token URL* can be copy pasted to the corresponding fields in Insomnia:

[https://app.teamleader.eu/oauth2/authorize](https://app.teamleader.eu/oauth2/authorize)

[https://app.teamleader.eu/oauth2/access_token](https://app.teamleader.eu/oauth2/access_token)

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25693167322257)

 

To obtain the *Client ID*, the *Client secret* and the *Redirect URL*, you will need to go to our [Marketplace](https://marketplace.teamleader.eu/build), and [create a new test integration](https://marketplace.teamleader.eu/eu/en/build). In your integration, you only need to fill out the following data:

- Name of the integration, e.g. 'Test'

- Valid redirect URLs, e.g. [https://www.mywebsite.eu/redirect](https://www.mywebsite.eu/redirect)

- OAuth scopes: check all boxes except for 'Administrator only'

- Add a long and a short description, both can be 'Test' (at least one language not being English should be filled out)

- All other fields can be ignored, you can save the integration

Now copy the Client ID, Client secret and Redirect URL in Insomnia OAuth2. You should be able to fetch the tokens.

More details about all of this can be found [here](https://support.focus.teamleader.eu/hc/en-150/articles/25693133999633-Getting-started-How-can-I-test-my-API-V2-integration).

 

### Fetch your custom field IDs

After authenticating yourself (and thus connecting your Teamleader Focus account to Insomnia), you fill in the endpoint [https://developer.focus.teamleader.eu/docs/api/custom-field-definitions-list](https://developer.focus.teamleader.eu/docs/api/custom-field-definitions-list) and press ‘SEND’. This will provide you with a list of all your custom fields and their IDs. Now you only have to copy the IDs you need and paste them in Zapier.

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25693173887889)

 

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25693159029777)

 

**Note**: you can only use certain custom field *types *in Zapier:

- Single line text 

- Number

- Yes/No fields

- Money

- Integer

- Single selection

- 
Multiple selection (enter these values in the following way: ["value1", "value2"]

For multiple selection: if the outcome of the trigger app is formatted with a **comma **and the values are between **quotation marks**: perfect!
If not: you will need to change the format to be compatible with the Teamleader Focus API with an extra Zap-step: [the Zapier formatter](https://zapier.com/apps/formatter/help)
![](https://support.focus.teamleader.eu/hc/article_attachments/25693174080785)

 

**Note: **if you have more than 20 custom fields, you can put the following content in your POST request in order to see the IDs of all custom fields.

 

{

  "page": {

    "size": 100,

    "number": 1

  },

  "sort": [

    {

      "field": "label",

      "order": "asc"

    }

  ]

}

 

 

![](https://support.focus.teamleader.eu/hc/article_attachments/25693129601297)

 

**Note: **The technical reason behind all of this is that our integration with Zapier is built on the [API v2](https://developer.teamleader.eu/). You can find more information about these principles (& other places you can use them) in our [developer space](https://support.focus.teamleader.eu/hc/en-150/sections/24833791174033) of our support centre.