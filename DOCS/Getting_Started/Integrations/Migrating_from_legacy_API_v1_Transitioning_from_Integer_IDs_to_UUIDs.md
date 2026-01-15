---
title: "Migrating from legacy API v1: Transitioning from Integer IDs to UUIDs"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/26981214932625-Migrating-from-legacy-API-v1-Transitioning-from-Integer-IDs-to-UUIDs"
locale: "en-150"
created_at: "2024-07-25T09:10:37Z"
updated_at: "2025-06-18T09:56:17Z"
category: "Getting Started"
section: "Integrations"
---

# Migrating from legacy API v1: Transitioning from Integer IDs to UUIDs

![SupportCentre_Letsstart.png](https://support.focus.teamleader.eu/hc/article_attachments/26981168231825)

The current version of our API brings several enhancements, including the transition from integer IDs to UUIDs for better security and scalability. Every integer ID, together with its entity type, can be translated into a UUID. This article will guide you through the migration process and provide you with necessary code snippets and best practices.

# 

Migration Endpoint

To assist in this transition, we have created a migration endpoint /migrate.id which helps you convert your integer IDs to UUIDs. 

curl --*location* 'https://api.focus.teamleader.eu/migrate.id' \
--*header* 'Content-Type: application/json' \
--*header* 'x-api-version: 2023-09-26' \
--*header* 'Authorization: Bearer <access_token>' \
--*data* '{
   "id": "2041",
   "type": "contact"
}'

# output
{
 "data": {
   "type": "contact",
   "id": "825d271d-74e5-0e71-b533-7a4696c777f9"
 }
}

# 

Migration Strategies

## 1. Creating a Data Store for Mapping

You can create a data store to map the new UUIDs by either:

- Adding a new column to your existing resources tables.

- Creating a new mapping table that includes columns for type, integer ID, and UUID.

Example table scheme:
![](https://lh7-eu.googleusercontent.com/docsz/AD_4nXd-Wq6BMsjNNL2dPTQyZf0xz77SrJsjEXuDLqiMB-3TbBlEu5CBnAPRDhxSGwShyqhPBc7PaXZRTGyNXpozaNi9bDi2M-kyxjqI2x6HAsHcMBgbSGpMd7NYOAhS6M9jRG_kjSAswACHuXDwpuHFwgbFm4nL?key=4n04saNKLiWIIrxVeCgvjg)

## 2. Populate the mapping table

You can approach this in various ways. Here are two suggestions to help you get started.

 

### A. Prepopulated mapping table through batch migration jobs

This scheduled job performs the ID migration. It can take either of the following parameters:

- Type only: for full ID migration of a specific type (e.g., migrate --type 'contact').

- Type with a list of IDs: for migrating specific batches of IDs within that type (e.g., migrate --type 'contact' --ids [1, 2, 3]). This allows multiple runs for different sets of IDs within the same type.

**Batch Processing with Transactions **

For better performance, it is recommended to wrap the migration in a transaction and handle API quotas properly. You might need to run the migration in intervals to avoid exceeding the API rate limit.

 

*Note: Please refer to our [API rate limit guidelines](https://developer.teamleader.eu/#/introduction/general-principles/rate-limiting) to ensure you do not exceed the API quota during migration.*

 

### B. Fetch UUID dynamically before API requests

Another approach is to fetch the UUID dynamically during API calls by integrating a check to see if the resource already has a UUID. If not, it calls the /migrate.id endpoint to update the ID before proceeding.

 

**Conclusion **

We hope this guide helps you in smoothly migrating from legacy API v1 to v2. Please note that unfortunately, we do not currently offer a way to convert UUIDs back to their integer values.

 

If you have any questions or need further assistance, [please do not hesitate to reach out to our support team.](https://support.focus.teamleader.eu/hc/nl/requests/new?ticket_form_id=25911134514065)