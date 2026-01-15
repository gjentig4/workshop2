---
title: "FAQ: What's causing bad connections in my meeting room?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25695159150737-FAQ-What-s-causing-bad-connections-in-my-meeting-room"
locale: "en-150"
created_at: "2024-06-06T09:21:45Z"
updated_at: "2025-05-04T13:22:35Z"
category: "FAQ"
section: "Troubleshooting"
---

# FAQ: What's causing bad connections in my meeting room?

![](https://support.focus.teamleader.eu/hc/article_attachments/25695159138321)

The Lead capture Booster meeting rooms establishes a connection between participants by making use of the [WebRTC API](https://en.wikipedia.org/wiki/WebRTC), which is supported by all major browsers. Usually, WebRTC tries to create a direct connection from participant to participant, but in some cases this is not possible.

When a direct connection cannot be established, the meeting room relay server is used as a middle man. This indirect communication between the participants has a significant impact on latency and bandwidth and can be difficult to avoid. This article describes the most common causes and gives an insight in what is happening in the background.

# How to avoid relayed traffic

The process to establish a direct connection (STUN) is dependent on certain techniques called ["Hole punching" techniques](https://datatracker.ietf.org/doc/html/rfc5128#section-3.3). If these techniques fail to result in a direct connection, a relayed connection is necessary.

- [Endpoint-independent NAT mapping](https://datatracker.ietf.org/doc/html/rfc4787#section-4.1): If the NAT configuration is not set up with Endpoint-independent mapping, where an internal IP: port tuple will always have the same external IP: port tuple, hole punching can fail.

- Firewall UDP restrictions: if a firewall restricts UDP traffic, WebRTC will fall back to transmitting its data to a TURN server [as TCP packets](https://datatracker.ietf.org/doc/html/rfc8656#section-3.1).

- Firewall port restrictions: Likewise, a firewall may be blocking traffic on certain ports resulting in a hole punching failure. The meeting rooms STUN server uses the default 3478 and/or 5349 ports for incoming connection requests, and uses a very wide 10000-60000 range for port mapping

This list is non-exhaustive but contains the most common causes. Fixing these issues should result in being able to create direct connections, in most cases. If you’re not certain how to fix these issues, contact your IT support with this information.

# Background information

## Local vs public IP address

In the modern web, not enough IP addresses are available to give each device its own unique address. To resolve this, a method called [Network Address Translation](https://en.wikipedia.org/wiki/Network_address_translation) is used: it gives the entire local network a single public address and it routes all incoming traffic to the relevant local device.

## Session Traversal Utilities for NAT (STUN)

As modern networks don't assign a uniquely identifying address to each device, there is an obstacle to overcome when establishing a direct connection: NAT implies that the participant does not know the address that uniquely identifies its own machine. STUN is a method in which a meeting room server on the public internet mediates between the two peers by asking the networks for the adresses of both participants, and passing this information on to the other particiapant. This allows both machines to set up a route that directly connects both participants, while taking into account the NAT setups of both networks.

## Traversal Using Relays around NAT (TURN)

The problem originates when even with STUN a direct connection is impossible. This can be due to firewall restrictions or incompatible network topology. The only way to resolve this is by having a server on the public internet that is able to directly connect to all possible network configurations. This server establishes a direct connection to both participants individually and acts as a relay through which all data passes. As the network traffic passes through a third party, using such a setup results in less available bandwidth and higher latency.