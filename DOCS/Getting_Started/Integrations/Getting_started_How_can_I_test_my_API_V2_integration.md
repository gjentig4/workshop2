---
title: "Getting started: How can I test my API V2 integration?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25693133999633-Getting-started-How-can-I-test-my-API-V2-integration"
locale: "en-150"
created_at: "2024-06-06T08:24:03Z"
updated_at: "2025-06-18T09:56:17Z"
category: "Getting Started"
section: "Integrations"
---

# Getting started: How can I test my API V2 integration?

![A 'LET'S START' introductory banner with a paper plane illustration on a light blue background.](https://support.focus.teamleader.eu/hc/article_attachments/25691002060177)

 

When building an integration as a developer or an integrator, you can use a free trial account and [contact our support team](https://support.focus.teamleader.eu/hc/en-150/requests/new?ticket_form_id=25911134514065) to help you convert your free trial account into a sandbox account. We wouldn't want your work to be lost because of an expired trial account. 

 

To test API calls for your API V2 integration, we recommend using [Insomnia](https://insomnia.rest/). Click the link to go to their homepage to download the tool. Once installed, take the following steps:

 

- 
Create a new request by clicking the arrow next to the plus sign and fill in the request you’ll find in the [API V2 documentation](https://developer.teamleader.eu/#/reference/crm/companies/companies.list). In our example, we’ll take ‘companies.list’![API request interface showing a GET call to the companies.list endpoint in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25693118702737)

 

 

 

 

2.  Select ‘**OAuth 2.0**’ below the header ‘**Auth**’.![Selecting OAuth 2.0 authentication for a Teamleader Focus API request in a debug tool.](https://support.focus.teamleader.eu/hc/article_attachments/25693118772369)

 

3. The screenshots below shows what value to fill in where:![API debug interface showing OAuth 2 authentication settings for Teamleader Focus companies list](https://support.focus.teamleader.eu/hc/article_attachments/25693133762321)

 

4. If all goes well, a pop-up will appear and you’ll be asked to fill in your Teamleader Focus login details.

 

 

5. Your access tokens will then be made.

**Access tokens**: These expire 1 hour after they are issued for security reasons. If your integration needs to communicate with the API beyond the access token lifespan, you will need to request a new access token using the refresh token which was issued along with the access token. Note that refresh tokens can only be used once in order to get a new access token and refresh token.

**Refresh tokens**: will continue functioning until the user revokes them or uninstalls the integration, but Insomnia will take care of this for you.![Advanced options for API authentication showing refresh, identity, and access tokens.](https://support.focus.teamleader.eu/hc/article_attachments/25693118862225)

6. Now it’s time to call up your Teamleader Focus API V2 [endpoints](https://developer.teamleader.eu).

 

7. If all goes well, you will see the results in JSON in the right-hand side of your screen.![JSON API response showing company details like name, status, and website in Teamleader Focus.](https://support.focus.teamleader.eu/hc/article_attachments/25693133862545)

 

 

## Test API V2 webhooks

Use [Beeceptor](https://beeceptor.com/) to test your Teamleader Focus webhooks. You don’t need to install anything, just go to the homepage to create an endpoint and get going.

 

Webhooks are registered via the API. To register, list or unregister Webhooks for API V2. Go to the API V2 [documentation](https://developer.teamleader.eu/#/reference/other/webhooks/webhooks.register) under ‘**Other**’.![Teamleader Focus API documentation showing webhook registration endpoints and request attributes.](https://support.focus.teamleader.eu/hc/article_attachments/25693133905169)

 

 

Finally, use Beeceptor to check if the triggers come through correctly.![Beeceptor interface showing a successful POST request for a webhook test.](https://support.focus.teamleader.eu/hc/article_attachments/25693119026065)