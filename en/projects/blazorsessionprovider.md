---
layout: post
title: Blazor Session Provider (BSP)
nodate: true
en: true
---

In Blazor Server, the user state lives as long as the circuit lives. That’s a rule that isn’t always obvious at first.

Everything works fine… until the user refreshes the page.  
There’s no exception, no log, no error: the state simply disappears.

## What is BlazorSessionProvider?

> If your Blazor Server application is never going to lose connection, never refresh, and never scale, you don’t need this library.
>
> In any other case, you do.

Developed on January 25, 2024, Blazor Session Provider (or BSP for short) is a **Blazor Server** library that allows you to manage session state within the application itself, rather than in the browser (as is commonly done). It provides a server-side session layer, decoupled from the circuit, secure, and fully controllable.

## Stack
**Blazor Server · .NET 8 · C# · SignalR**

## Problem to Address
When working with Blazor, there are inherent limitations in session state management, especially in Blazor Server applications, where the circuit lifecycle, reconnections, and page refreshes can silently cause the loss of critical user information. Simply refreshing the page once is enough to lose the user state, without triggering any error or exception.

**BSP** does not attempt to replace Blazor’s existing mechanisms, but rather to complement the framework with a controlled session layer:
- 📍 Stateful (server) — The session lives on the server
- 🔒 Data never travels to the client, preventing XSS attacks
- 🧠 Full control from the server (you can invalidate, renew, or redirect sessions)
- 🔁 The server decides when a session expires, based on the initial configuration
- ⚙️ Simple configuration
- ✅ Clean and simple API for managing session data
- 📡 Native SignalR integration (keeps the session alive during the connection)
- 👤 Real-time synchronized ClaimsPrincipal (reactive to changes)
- 🧱 State persists even if the page is refreshed, or until the server decides to close it

While there are existing solutions for session state management, not all of them solve the problem effectively. Below is a comparison table between BSP and other approaches commonly used in Blazor Server development.

| 🧩 Method                    | 📍 Where the state lives    | 🔒 Security                             | 🔁 Expiration / Logout                | ⚡ Blazor Server Integration | 🌐 Scalability                       | 🏆 Ideal for                              |
| ---------------------------- | --------------------------- | -------------------------------------- | ------------------------------------- | ---------------------------- | ------------------------------------ | ------------------------------------------ |
| 🟦 **BlazorSessionProvider** | 🖥️ Server                  | 🟢 Very high (no data exposed to client)| 🟢 Full server-side control            | 🟢 Native with SignalR        | 🟠 Medium (requires shared state)    | Pure Blazor Server apps                    |
| 🟧 **JWT**                   | 🌐 Client (token)           | 🟠 Medium (XSS risk if stored poorly)  | 🔴 Hard to revoke before expiration   | 🟠 Partial (connection auth) | 🟢 Very high                          | APIs, microservices, hybrid apps           |
| 💾 **localStorage**          | 🌐 Client                  | 🔴 Low (JS-accessible → XSS)            | 🔴 Manual (client-side)               | 🔴 Not native                | 🟢 High                               | Non-critical data, preferences             |
| 🗂️ **sessionStorage**       | 🌐 Client (per tab)         | 🔴 Low (XSS)                            | 🟠 Cleared when tab closes             | 🔴 Not native                | 🟢 High                               | Temporary UI state                         |
| 🧠 **Scoped Services**       | 🖥️ Server (per circuit)    | 🟢 High                                 | 🟠 Depends on lifecycle                | 🟢 Native                    | 🔴 Low                                | Temporary per-connection state             |
| 🧵 **Singleton Services**    | 🖥️ Server (global)         | 🔴 Risky (shared state)                 | 🔴 Hard to control                     | 🟢 Native                    | 🔴 Very low                           | Global cache, not session                  |

**BSP** emerges as a solution designed to introduce an explicit session model, decoupled from the circuit, allowing user state to be managed, persisted, and rehydrated in a controlled and consistent way—synchronizing identity, claims, and business state throughout the entire application lifecycle.

## Project link
<a href="https://github.com/oscardsoto/BlazorSessionProvider" target="blank">BSP</a> is licensed under the MIT License (and always will be).