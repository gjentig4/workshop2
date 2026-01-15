---
title: "FAQ: What if something is blocking my audio/video connections?"
url: "https://support.focus.teamleader.eu/hc/en-150/articles/25694882344465-FAQ-What-if-something-is-blocking-my-audio-video-connections"
locale: "en-150"
created_at: "2024-06-06T09:14:20Z"
updated_at: "2025-05-04T13:22:34Z"
category: "FAQ"
section: "Troubleshooting"
---

# FAQ: What if something is blocking my audio/video connections?

![](https://support.focus.teamleader.eu/hc/article_attachments/25694913478033)

 

The Lead capture Booster requires WebRTC to be enabled in your browser. This is the technology where the audio-, videoconferencing and screen share is based on. If you're having issues activating your camera or microphone you best check if WebRTC isn't blocked in your browser, ad-blocker or extension/add-on.

 

# 1. Basic checks

Before looking into the more advanced options, you might want to check the following steps:

 

Is your camera/microphone physically connected to your computer?

Is the correct camera/microphone selected in the meeting room settings?

Does the device work if you refresh the page/restart the browser?

Does the device work in other applications?

- If no, it's probably related to your operating system or camera/microphone.

- If yes, then the issue is probably browser-related, check the next step.

 

Does the device work if you test it in an incognito window or another browser?

- If no, check if your device isn't blocked by your Operating system.

- If yes, it's probably blocked in the browser settings, because of an ad-blocker or another extension/add-on (see below in this article).

 

# 2. Enable WebRTC in your browser

In all browsers, WebRTC is enabled by default. Check in the browser settings if the Camera and Microphone aren't blocked for meetings.

- 
[Chrome](https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DDesktop)/[Edge](https://support.microsoft.com/en-gb/windows/windows-camera-microphone-and-privacy-a83257bc-e990-d54a-d212-b5e41beba857)

- Mozilla Firefox (see steps below)

- [Safari](https://support.class.com/s/collaborate?language=en_US&articlenumber=kA08a000000E6POCA0&callchild=true&isload=true)

- 
[Brave](https://support.brave.com/hc/en-us/articles/360018205431-How-do-I-change-site-permissions-)

 

In some cases, webRTC might be disabled in Firefox. To **enable WebRTC in Firefox**, follow these steps:

- Navigate to about:config in your browser's address bar.

- Search for media.peerconnection.enabled.

- Double click on the item in the list to set the value to 'True'. ![](https://support.focus.teamleader.eu/hc/article_attachments/25694881500049)

 

Now you can reopen your meeting room and enjoy using the Lead capture Booster!

 

# 3. Check if a browser extension/add-on is using or blocking your camera/microphone

 

## 1. General extensions and add-ons

Installing browser extensions or add-ons is often very handy. But they can impact your meeting experience in the Lead capture Booster. If you experience issues with connection to a microphone or camera, it might be that an extension is blocking this access.

 

To rule out which extension (there are millions of them available) is the bad guy, try opening the Lead capture Booster in a Private / Incognito window. Most extensions are blocked in Private / Incognito windows so you can rule out whether it's an extension that is blocking your connections.

 

### Google Chrome extensions

- Visit chrome://extensions in your Chrome browser tab to get an overview of all your extensions.

- Check whether these extensions have access to your camera/microphone. This can interfere with the Lead capture Booster trying to access the same camera/microphone. Make sure to disable the extensions with microphone/camera access before joining a meeting.

- Double-check if the extensions are allowed in an Incognito window before you try the Lead capture Booster in an Incognito window.

 

### FireFox add-ons

- Visit about: addons in your Firefox browser tab to get an overview of all your add-ons

- Check whether these add-ons have access to your camera/microphone. This can interfere with the Lead capture Booster trying to access the same camera/microphone. Make sure to disable the add-ons with microphone/camera access before joining a meeting

- Double-check if the add-ons are allowed in a Private window before you try the Lead capture Booster in a Private window

 

## 2. Ad blockers

There are numerous ad blockers available and they usually serve a great purpose: making your experience on the web smooth and ad-free.

As advertisers get more creative to pass their message to you, ad blockers become more potent in blocking all kinds of ads and connections. Some ad blockers therefore also block **WebRTC** connections. There are 2 things that you can do:

- 
**Disable or delete your ad blocker**. Then try to join a meeting room. If you can connect with other participants and share + receive audio/video streams, it was your ad blocker that blocked WebRTC.

If you can't find how to disable the blocking in your ad blocker's settings, we suggest joining a meeting in another browser or in an incognito window.

 

- 
**Dive into your ad blocker's settings and look for WebRTC** (might be located in Advanced Settings). Make sure to disable blocking WebRTC.

Example from AdGuard: ![](https://support.focus.teamleader.eu/hc/article_attachments/25694913180177)

 

### Popular extensions/add-ons to check

Some popular extensions/add-ons that can influence are:

- [Adblock](https://getadblock.com/en/)

- [Ublock Origin](https://ublockorigin.com/)

- [Ghostery](https://www.ghostery.com/)

- 
[Adguard ](https://adguard.com/en/welcome.html)(See 3.2.2 in this help article)

- [TunnelBear Blocker](https://www.tunnelbear.com/apps/blocker)