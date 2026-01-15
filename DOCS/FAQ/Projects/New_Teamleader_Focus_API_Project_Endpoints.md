---
title: "New Teamleader Focus API Project Endpoints"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25695894567953-New-Teamleader-Focus-API-Project-Endpoints"
locale: "en-150"
created_at: "2024-06-06T09:42:52Z"
updated_at: "2025-11-24T20:12:17Z"
category: "FAQ"
section: "Projects"
---

# New Teamleader Focus API Project Endpoints

If you are a developer who built an integration that made a call to our existing Project API endpoints recently, then this article might be interesting for you. We have new Project endpoints in our Teamleader Focus API. Read this article to find more information about the impact of these new endpoints on your integration.

 

## What’s new?

We have introduced a brand new Projects module, offering a frictionless experience in project planning and management within Teamleader Focus. This update includes an entirely new set of endpoints, bringing added functionalities. The new endpoints will be prefixed with /projects-v2/ and will exclusively apply to the new Projects module. The new endpoints can be found in our APIv2 documentation: [https://developer.focus.teamleader.eu/#/reference/new-projects](https://developer.focus.teamleader.eu/#/reference/new-projects).

 

Please note that the new Projects module is incompatible with legacy Project endpoints. Teamleader Focus users who switch to the new module will no longer be able to utilise integrations based on legacy Project endpoints from Teamleader Focus APIv1 or APIv2.

 

## When do these changes take effect?

As of now, newly created Teamleader Focus accounts are automatically using the new Projects module. For accounts activated before June 1st, 2023, the new Projects module will be rolled out in phases. These accounts will be able to migrate their current projects from the legacy Projects module to the new Projects module at the end of 2023. 

 

The legacy Project endpoints in both APIv2 and APIv1 will continue to function as expected in the near future. To facilitate a smooth migration, we have provided a transition period for the considerable future until a decision is made for the deprecation of the old Projects endpoint. We will make sure to communicate any decisions clearly and in time. 

 

## What does that mean for you?

We encourage you to look at and use the new Project endpoints, as our customers can already transition to the new module as of this moment. By providing a version of your integration compatible with the new projects module sooner, you'll empower a larger number of customers to benefit from your integration with the new Projects module.

 

If you have a public integration or have multiple Teamleader Focus accounts using your integration, we urge you to proactively reach out to our mutual customers that use your integration. Your direct engagement will provide the necessary guidance and support, guaranteeing a smooth user experience during this migration. 

 

Once ready, we request that you submit a new publish request. All steps for this are explained in the following article: [How do I publish my integration on the Teamleader Focus Marketplace?](https://support.focus.teamleader.eu/hc/en-150/articles/25692187820561-Getting-started-How-do-I-publish-my-integration-on-the-Teamleader-Focus-Marketplace)

 

If, on the other hand, your integration is not publicly available nor should this be, it will suffice to update your integration without submitting a new publish request. 

 

If you have any questions, feel free to contact our support team at [api@teamleader.eu](mailto:api@teamleader.eu). We're here to assist you throughout the transition process.