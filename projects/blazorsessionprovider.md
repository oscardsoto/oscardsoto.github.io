---
layout: post
title: Blazor Session Provider (BSP)
nodate: true
---

En Blazor Server, el estado del usuario vive mientras el circuito vive. Esa es una regla que no siempre es evidente al inicio.

Todo funciona bien… hasta que el usuario refresca la página.
No hay excepción, no hay log, no hay error: el estado simplemente desaparece.

## ¿Qué es BlazorSessionProvider?

> Si tu aplicación Blazor Server nunca va a perder conexión, nunca va a refrescarse y nunca va a escalar, no necesitas esta librería.
>
> En cualquier otro caso, sí.

Desarrollado el 25 de Enero del 2024, Blazor Session Provider (o BSP en corto) es una librería para **Blazor Server** que permite manejar estados de sesión dentro de la aplicación, y no en el navegador (como comunmente se maneja). Se trata de una capa de sesión en servidor, desacoplada del circuito, segura y controlable.

## Stack
**Blazor Server · NET 8 · C# · SignalR**

## Problema a enfrentar
Al momento de trabajar con Blazor, existen limitaciones inherentes al manejo del estado de sesión, especialmente en aplicaciones Blazor Server, donde el ciclo de vida del circuito, las reconexiones y los refrescos de página pueden provocar la pérdida silenciosa de información crítica del usuario. Basta con refrescar una sola vez la página para perder el estado del usuario, sin marcar ningún tipo de error o excepción.

**BSP** no intenta reemplazar los mecanismos existentes de Blazor, sino complementar el framework con una capa de sesión controlada:
- 📍 Stateful (server) — La sesión vive en el servidor
- 🔒 La información nunca viaja hacia al cliente, previniendo ataques XSS
- 🧠 Control total desde el server (puedes invalidar, renovar o redireccionar sesiones)
- 🔁 El servidor decide cuando una sesión expira, basada en la configuración inicial
- ⚙️ Configuración simple 
- ✅ API sencilla para manejar la información de la sesión
- 📡 Integración nativa con SignalR (mantiene la sesión viva durante la conexión)
- 👤 ClaimsPrincipal sincronizado en tiempo real (reactivo a cambios)
- 🧱 El estado permanece incluso si la página es recargada, o hasta que el servidor decida cerrarla

Si bien existen soluciones al problema del estado de sesión, no todos la resuelven de forma efectiva. Aquí te muestro una tabla comparativa, respecto a BSP y otras soluciones que comunmente se usan en el desarrollo de Blazor Server.

| 🧩 Método                    | 📍 Dónde vive el estado     | 🔒 Seguridad                             | 🔁 Expiración / Logout                 | ⚡ Integración Blazor Server   | 🌐 Escalabilidad                      | 🏆 Ideal para                                |
| ---------------------------- | --------------------------- | ---------------------------------------- | -------------------------------------- | ----------------------------- | ------------------------------------- | -------------------------------------------- |
| 🟦 **BlazorSessionProvider** | 🖥️ Servidor                | 🟢 Muy alta (no expone datos al cliente) | 🟢 Control total desde el servidor     | 🟢 Nativa con SignalR         | 🟠 Media (requiere estado compartido) | Apps Blazor Server puras |
| 🟧 **JWT**                   | 🌐 Cliente (token)          | 🟠 Media (riesgo XSS si se almacena mal) | 🔴 Difícil de revocar antes de expirar | 🟠 Parcial (auth de conexión) | 🟢 Muy alta                           | APIs, microservicios, apps híbridas          |
| 💾 **localStorage**          | 🌐 Cliente                  | 🔴 Baja (accesible por JS → XSS)         | 🔴 Manual (cliente)                    | 🔴 No nativa                  | 🟢 Alta                               | Datos no críticos, preferencias              |
| 🗂️ **sessionStorage**       | 🌐 Cliente (por pestaña)    | 🔴 Baja (XSS)                            | 🟠 Se limpia al cerrar pestaña         | 🔴 No nativa                  | 🟢 Alta                               | Estados temporales de UI                     |
| 🧠 **Scoped Services**       | 🖥️ Servidor (por circuito) | 🟢 Alta                                  | 🟠 Depende del ciclo de vida           | 🟢 Nativa                     | 🔴 Baja                               | Estado temporal por conexión                 |
| 🧵 **Singleton Services**    | 🖥️ Servidor (global)       | 🔴 Riesgosa (estado compartido)          | 🔴 Difícil de controlar                | 🟢 Nativa                     | 🔴 Muy baja                           | Cache global, no sesión                      |

**BSP** surge como una solución diseñada para introducir un modelo de sesión explícito, desacoplado del circuito, que permite gestionar, persistir y rehidratar el estado del usuario de forma controlada y consistente, sincronizando la identidad, los claims y el estado de negocio a lo largo de todo el ciclo de vida de la aplicación.

## Link del proyecto
<a href="https://github.com/oscardsoto/BlazorSessionProvider" target="blank">BSP</a> está licenciado bajo la licencia MIT (y siempre lo estará).