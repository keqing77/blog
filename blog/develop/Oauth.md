---
slug: Oauth
title: Oauth 2.0 /  OIDC / PKCE / JWT 全面介绍
date: 2023-10-06
authors: keqing
tags: [Oauth]
keywords: [Oauth]
description: Oauth授权协议相关总结
---

#  Oauth 2.0 /  OIDC / PKCE / JWT 全面介绍
本文发布在**稀土掘金**: [Oauth 2.0 / OIDC / PKCE / JWT 全面介绍 - 掘金](https://juejin.cn/post/7281911124806582313)

基本每个网站想要进一步提供服务，用户都需要先进行`“登录”`操作，事实上背后涉及到的便是对用户进行**认证和授权**，它们是两个独立的过程，用户通常对此无感知，因为它们对用户来说似乎是单一的体验。

`OAuth2.0` 是目前最流行的授权机制，甚至可以说已经成为行业上的标准，也许你未曾听说过，但其实你每天都在和它打交道，如果你不了解它，那是很正常的，这正是 `Oauth2.0` 的设计优秀之处 - 让用户对此无感知， `OAuth` 是互联网上首选的授权协议，基本所有平台都在使用它，如 [微信开发平台](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)，[哔哩哔哩开发平台](https://openhome.bilibili.com/doc/4/eaf0e2b5-bde9-b9a0-9be1-019bb455701c)，[百度开放平台](https://openauth.baidu.com/doc/doc.html), [Google](https://developers.google.com/identity/protocols/oauth2), [Github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) 等背后都是基于`Oauth2.0`实现的

<!-- truncate -->

**本文也主要介绍 Oauth2.0 以及相关的技术（OIDC，PKCE，JWT等**）。

不知道你有没有留意主流的互联网网站除了支持 `用户名+密码`登录和`手机号+验证码`登录外，通常还提供了第三方账号登录， 比如最常见的 **微信登录**、**QQ登录**、**微博登录**、**GitHub登录**。  
这些第三方登录方式都是采用了 `OAuth2.0协议` 实现的。Oauth2.0 是 Oauth协议 的最新版本，Oauth1.0已被废弃，所以下文提到的 Oatuh 都是特指 Oauth 2.0。

以 `B站` 为例，b站支持微信等第三方登录，**但显然b站不知道你的微信密码**，这是怎么回事呢？

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a22bf22fffc4f3aa0e61a0618cdf4ab~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=816&h=428&s=102881&e=png&b=fefcfc)![](https://cdn.nlark.com/yuque/0/2023/png/25855336/1695641168241-18ec3560-9d1d-4d1b-8960-a9f08dc00aa8.png)

## 认证 & 授权

无论是学习 `Oauth2.0` 还是 `OIDC / JWT ...` , 首先要区别开 `认证(Authentication)`  以及 `授权(Authorization)`, 否则务必会造成一些理解的偏差和困扰。

详情可以参考 [Auth0 - authentication-and-authorization](https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization)

### 认证和授权区别

认证 - Authentication

`认证` 指的是**验证用户的身份**, 也就是让网站 `知道你是谁`, 认证的主要目的是**确认用户身份**，通过认证表明你是该网站的一个用户， 但它不涉及确定用户是否有权访问特定资源或执行特定操作

授权 - Authorization

`授权` 指的是是**根据用户的身份和角色来决定你可以做什么**，确定用户是否具有执行特定操作或访问特定资源的权限， 也就是让网站知道 `你能做什么`

### 总结

- 认证(Authentication)是**验证用户是谁的过程**，授权(Authorization)是**验证他们有权访问什么的过程**
- `认证(Authentication)`通常在授权之前完成，`授权(Authorization)`则通常在用户已经被认证后
- 两者通常一起使用用以确保**系统的安全性和数据的保护**， 但却经常被混淆

**以一个现实中的例子来举例说明两者区别**:

- 比如你下班回到小区，小区正门会有保安/门禁，这时候你需要刷门禁卡通过验证来进入，来证明你是这个小区的住户，保安并不知道你要住那栋楼 -  **这个过程就是认证**
- 进入小区后，你需要用你的房门钥匙来进入你的房间，这把钥匙只有进入你的房间的权限，没有进入其他住户房间的权限 -  **这个过程就是授权**
- Oauth2.0 实际上的作用就是**发放这个钥匙**`(Access Token - 访问令牌)`，协议并不包含对用户进行认证，也就是说 **Oauth2.0 只负责授权，如果需要认证，则通常会采用基于 oauth2.0 的 OIDC(Open ID Connect)**

## Oatuh 2.0

`Oatuh 2.0` 是一种**授权协议**，而不是**认证协议**， 如何认证则取决于厂商的实现， 如基于OAuth2.0 的 OIDC。**OAuth 2.0 授权框架使第三方应用程序能够在HTTP服务上获取有限访问权限**

`Oauth 2.0` 其实做的只有一件事情 - `颁发访问令牌 (也就是 Access Token)`，  
通过 Oauth2.0 来授权第三方应用，获取用户数据, 而**无需共享您的用户名和密码**，用户通过这个颁发的Token 去获取信息。

### 为什么需要 Oauth 2.0

假如在没有Oauth之前，你需要在**网站A**上打印你云盘上的照片，那么为了能够顺利打印照片，你需要把**云盘的帐户名和密码**提交给这个**网站A**，网站A 就可以用你的凭据(如用户名+密码)去读取云盘上的资料，但仔细的你已经察觉有些不妥之处。

- 这个网站必须**支持密码登录**, 而密码登录存在许多安全问题。
- 这个网站很可能会保存你的凭据以便用户下次访问使用，**网站会获得全部权限，且无法撤回**，你只能通过修改密码！且一旦该网站被攻击，则你的信息被泄漏，许多人为了偷懒，`不同网站的密码都设置为同一个`,后果不堪设想！

正是因为传统身份验证/授权模型存在以上缺点，才制定授权标准 [RFC-6749 Oauth 2.0](https://datatracker.ietf.org/doc/html/rfc6749)

OAuth 协议的设计目的是：让最终用户通过 OAuth 将他们在受保护资源上的部分权限委托给客户端应用，使客户端应用代表他们执行操作。

官方的话是不是听不懂，好吧，其实它的最终目的是**为第三方应用颁发一个有时效性的令牌 token**。使得第三方应用能够**通过该令牌获取相关的资源**， 这时候还是不明白为什么这样就解决了上面的问题，那么开始深入探讨Oauth了。

### 角色介绍

Oauth2.0 拥有4个主要角色， 通过**引入授权层并将客户端角色与资源所有者角色分离来解决上面提到的问题**

#### 资源拥有者

Resource Owner - 资源拥有者， 也就是**网站的用户**

#### 客户端

Client - 客户端， 也就是 **网站 A/B/C/D**

#### 授权服务器

Authorization Owner - 授权服务器，负责发放令牌Access Token 给客户端

它将认证用户的身份，为用户提供授权审批流程，并最终颁发授权令牌(Access Token)。**发送令牌给第三方的服务器** `(可以和资源服务器是同一个)`

#### 资源服务器

Resource Server - 资源服务器， **存放受保护的资源，服务提供商存放用户及其他资源的应用** `可以和授权服务器是同一个应用`

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22829b17b8ed4afc80296557970dd7c9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1027&h=786&s=116877&e=png&b=fefefe)![](https://cdn.nlark.com/yuque/0/2023/png/25855336/1695641206792-41841053-9c4c-4675-8d9d-ffba74908a8d.png)

通过这张图**可以一目了然各个角色的职责**，通过引入额外的一层授权层，从而隔离权限，客户端需要先获得授权，成功获取到令牌后，才可以访问资源。`注意的是：这里的客户端，指的不仅仅是网站的前端(浏览器)，还有网站的后端(网站服务器)`

因为 Oauth2.0 支持不同的授权模式，所以先简单介绍四种授权模式，再展开**描述具体的授权流程**（本文采用最为广泛使用的**授权码模式流程**）。

### 授权模式

此处仅列举介绍，下文会详细探讨最常用的**授权码模式**，`它是 OAuth 2.0 最安全最完备的许可类型`，其他模式可按需使用，需要进一步信息请参考 [RFC 6749 - OAuth 2.0 不同授权模式](https://datatracker.ietf.org/doc/html/rfc6749#page-8)

- **授权码模式（authorization code）** ：，**第三方应用先申请一个授权码，然后再用该码去获取令牌，这是功能最完整，流程最严密的模式**。现在主流的使用OAuth2.0协议授权的服务提供商都采用了这种模式 `我在下面Oauth2.0 流程介绍举例也将采取这种模式`。
- **简化模式（implicit）** ：跳过了请求授权码（Authorization Code）的步骤，直接通过浏览器向授权服务端请求令牌（Access Token）。这种模式的特点是所有步骤都在浏览器中完成，Token对用户可见，且请求令牌的时候不需要传递client_secret进行客户端认证。
- **密码模式（resource owner password credentials）** ：用户向第三方客户端提供自己在授权服务端的用户名和密码，客户端通过用户提供的用户名和密码向授权服务端请求令牌（Access Token）
- **客户端模式 （Client Credentials）**，适合没有前端的第三方，也没有用户的参与。仅仅是授权服务器与资源服务器之间的交互。

### 授权流程

以 auth0 为例，[Authorization Code Flow 授权码流程 - Auth0](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow)

![](https://cdn.nlark.com/yuque/0/2023/png/25855336/1695641212851-893a3f3a-8093-4919-8995-44514e5c83a0.png)![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcc65397670b431e901573ce9a3153a6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1681&h=1227&s=416150&e=png&b=ffffff)

### Oauth 2.0 优点

- **用户体验友好**，不再需要注册大量网站账号, 只需要拥有主流的帐号(如微信，Github，Google..), 通过第三方登录即可使用新的应用/网站，方便快捷且不需要维护多套密码。
- **可用于集中登录**，实现统一的授权中心/平台, 某些公司可能拥有多个产品，如果为每个产品单独开发一个认证/授权服务，显然是不优雅的，**比较好的解决方案就是所有需要登录的产品都请求同一个登录授权中心，进行统一登录授权处理**, 例子可参考(百度,百度贴吧,百度知道 / 微信，小程序，开放平台）。`值得注意的是，Oauth2.0需要与SSO区别开来, 两者是不同的东西`，前者是负责授权登录，后者是单点登录。Oauth可以是QQ登录微博，而SSO则是登录了Google，随后访问Gmail，Google Drive 也会自动登录。
- **安全可靠**, 用于分布式系统的权限控制, `Access Token` 规定了权限范围，还可以撤销令牌来撤销访问权限, 也减少了密码泄露和滥用的风险

### Q&A

#### 1. 在`授权码模式`过程中, 为什么需要先换 `Authorization Code` 再换 `Access Token` ？

在 Oauth 中，因为 Access Token 代表了用户的授权，如果token被泄漏，攻击者则拥有权限来访问用户资源，所以必须保证 Access Token 不能被泄漏！因为 Client ID 是公开的，而 Client Secret 是机密，用以验证客户端的身份。

**原因很简单 - 为了安全**，回顾下授权码模式的流程，客户端client 通过浏览器重定向拿到`Authorization Code`（暴露在前端）, 而拿 `Code + clientID + client Secret` 换取 `Access Token`是 client后台对授权服务器的访问（发生在后端），access token 不会被暴露，避免了泄露风险。如果这一步不返回code而是直接返回Access Token，那么这个 token 已经暴露了。

#### 2. Access Token 访问令牌有规定 Token 格式吗？

OAuth 2.0协议本身没有规定Access Token的具体格式，这通常是由授权服务器定义的，比较常用的是在**HTTP 请求的 Authorization头 中以 "Bearer" 关键字进行传递, 传递的值可以是任意形式，如普通字符串或者 jwt格式**

如 `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### 3. Oauth2.0 只是个授权协议，那么如何对用户进行认证呢？

是的，**Oauth2.0协议并不负责对用户进行认证**，在实际应用中，OAuth 2.0通常与身份认证协议或机制结合使用，以完成身份验证和授权的组合。**绝大多数厂商都会使用 OpenID Connect，也就是 OIDC**（OIDC是建立在OAuth 2.0之上的身份认证协议），在上面的 [auth0 授权码流程图](https://www.yuque.com/keqing77/hmi53o/fwif9m3xwgrygcqz#code)中的第八步可以看到返回access token的同时也返回了 ID token ， ID token 便是 OIDC 协议的一部分。

#### 4. 为什么需要 refresh token？

`refresh token` 是可选的, 但是 Access Token 通常会有有效期（较短 - 如一小时），如果用户在token有效期结束后被迫登出，经常性地登出是一种相当痛苦的用户体验，这时候就可以使用Refresh Token请求新的 Access Token，来持续保持用户会话且用户无感知。**当Access Token的有效期接近或过期时，客户端可以使用Refresh Token来请求新的Access Token** , Refresh Token 的有效期很长(较长 - 可以是一年甚至十年)，当然也可以不使用 refresh token 来让用户反复登录重新获取授权。

#### 5. 授权码流程中，必须传递的参数是哪些？ state参数的作用？

|   |   |   |
|---|---|---|
|参数|必填|描述|
|grant_type|✅|此处为 authorization_code, 表示请求授权码许可|
|response_type|✅|此处为 code, 表示响应给客户端类型为授权码|
|code|✅|从授权服务器接受到的 code 值|
|redirect_uri|✅|client 在开放平台注册时候填写的回调URI，授权服务需要验证该值|
|client_id|✅|给网站/程序 分配的ID，标识是哪个应用|
|client_secret|✅|注册时候分配的应用秘钥，验证客户端合法性|
|scope|❌|用于限制授权的权限|
|state|❌|用于防止跨站请求伪造（CSRF）攻击，客户端可以使用它来验证回调请求的合法性|

## OIDC

前面提到，`OAuth2`只解决了**授权**问题，没有实现**认证**部分，那么**认证**谁来做呢？ 这往往需要添加额外的API来实现认证，不同厂商策略不同，那么在对接时候就会造成混乱，那么有没有统一的标准呢？

登登，`OpenID Connect` 协议闪耀登场，[OpenID Connect（OIDC)](https://openid.net/specs/openid-connect-core-1_0.html)是建立在OAuth 2.0之上的标准，它能够认证用户并完成资源授权，它增加了一些额外的操作和端点，以支持身份认证和用户信息交换。

OIDC 流程与 OAuth 2.0 基本一样，但增加一些内容，可以看作是对 Oauth2.0的拓展

OIDC 规定：

- 引入`ID Token`，包含**用户基本信息**，并且采用 **JWT(Json Web Token)** 格式
- 引入了获取**用户详细信息**的端口(Endpoint) - `/userinfo`
- 定义了类似于 SAML Metadata 的 Discovery接口，  
    OIDC 规范定义了一组有关用户的标准声明claim，例如个人资料和电子邮件，这些声明可以在ID Token或 /userinfo 端点的响应中返回

### 术语比对

需要注意的是，OIDC一些概念术语发生了变化， 同时也引入一些新的概念，可以看下表格方便比对，不完全对应

|   |   |   |
|---|---|---|
|OIDC|Oauth2.0|描述|
|EU - **End User**|Resource Owner|用户|
|RP - **Relying Party**|Client|客户端|
|OP (**OpenID Provider**) or IDP (**Identity Provider**)|Authorization Server|身份提供商， 授权服务器|
|ID Token|Access Token|前者用于认证，后者用于授权|
|/userinfo|/authorzie，/token|前者获取用户详细信息，后者进行用于授权和发行token|

### OIDC 流程

1. 用户(End User)通过浏览器导航到网站，登录输入用户名和密码
2. RP（客户端）向 OP(OpenID Provider - Open ID提供商)发送请求
3. OP 对用户进行身份验证并获得授权
4. OP 使用 ID Token 和 Access Token 进行响应
5. RP 将带有 Access Token 的请求发送到 /userinfo
6. /userinfo 返回有关用户的声明。

**一个 ID Token 的例子：**

```
{
  "iss": "http://my-domain.auth0.com", // issuer，颁发ID Token的OpenID Provider的URL, 这里是 auth0
  "sub": "auth0|123456", // subject， 用来标识用户
  "aud": "my_client_id", // Audience, Token 的受众，常见为 Client ID，指示了ID Token为哪个客户端（RP）生成的 
  "exp": 1311281970, // expire, 过期时间
  "iat": 1311280970, // issue at, ID Token的 颁发时间
  "name": "Jane Doe", 
  "given_name": "Jane",
  "family_name": "Doe",
  "gender": "female",
  "birthdate": "0000-10-31",
  "email": "janedoe@example.com",
  "picture": "http://example.com/janedoe/me.jpg"
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/25855336/1695641221356-fca8d78d-f2b3-4cbe-8fff-f93e0ca43f5b.png)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8be18440dcc4ef093bc3f563bb3a12e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=623&h=531&s=93501&e=png&b=fefefe)

## PKCE

OAuth 2.0 授权码流程看似完美， 但其实还存在漏洞

前面提到 `Client Secret` 需要保密, 但是在一些公共应用，是没有 `Client Secret` 的， 因为它们无法安全存储`Client Secret`)，攻击者可以轻松获取存储在客户端中的`Client Secret` , 例如 **SPA 、移动端、或者完全前后端分离的应用**，它们应当使用`授权码 + PKCE 模式`

#### 为何需要 PKCE ？

比如在下面这个场景， 移动客户端使用 **授权码(Code)** 交换 **访问令牌(Access Token)**，如果这个Code 被中间人截获了，且该 Code 通常只能被使用一次，是不是就意味着攻击者能够使用这个 Code 获取 Access Token 从而获取权限，导致安全问题？

![](https://cdn.nlark.com/yuque/0/2023/png/25855336/1695641227888-128b74b6-df26-41a3-9d94-dff91bc131f8.png)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f53d7b5f03414a9aa4ed067315eb97a3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=934&h=411&s=106109&e=png&b=fafafa)

[PKCE](https://datatracker.ietf.org/doc/html/rfc7636) 就是为了解决授权码流程中的这一个风险，因为 `Public Client` 没有 `Client Secret`，这导致它容易遭受攻击，PKCE 需要确保只有最初请求授权码COde的客户端才能交换Access Token，防止攻击者使用截获的授权码。

### PKCE 流程

1. 客户端生成一个随机的 `code_verifier`, 这个`code_verifier`不会在网络中传输, 只有客户端知道
2. 客户端将`code_verifier`的散列值(如通过 SHA-256 散列算法) 生成出 `code_chanllebge` 发送到授权服务器
3. 客户端code交换token时，授权服务器则回比较客户端传来的`code_challenge`与传来的进行比对，匹配才会颁发Access Token

这样确保只有知道真正的`code_verifier`才能交换到Access Token，攻击者即使截获到了授权码code，也无法获得token，因为他们不知道正确的 `code_verifier`, **PKCE 也只适用于授权码模式**。

## JWT

**JWT** 全称 **JSON Web Tokens** ，是一种 Token 的种类，规范定义可参考 [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)。 可以通过使用 **JWT 来在用户和服务器之间传递安全可靠的信息**。它的两大使用场景是：**认证** 和 **数据交换**

`Oauth2.0 的 AcessToken 并不一定得使用 JWT, 但 OIDC 的ID Token 一定需要使用 JWT`，**JWT 是 OpenID Connect 标准不可或缺的一部分**

**强烈推荐阅读 Auth0 撰写的 JWT介绍文章**： [JSON Web Token Introduction - JSON Web 令牌简介 - jwt.io](https://jwt.io/introduction)

### JWT结构

JWT 的目的是为了确保数据确实来自被授权的人创建的(没有被篡改过)，并没有加密的步骤，只是为了方便在网络中传输防止乱码经过了`base64编码`

如果对`哈希，编码，加密，混淆`等概念比较模糊，可以阅读 [Hashing vs. Encryption vs. Encoding vs. Obfuscation](https://danielmiessler.com/p/encoding-encryption-hashing-obfuscation/#encoding)

JWT 由三部分组成:

- **头部（Header）** ：描述 JWT 的元数据，通常包含**加密算法**和**令牌类型**。
- **负载（Payload）** ：包含要传递的声明，可以包括**用户身份、权限、到期时间**等信息。
- **签名（Signature）** ：用于验证 JWT 的完整性，确保**playload 在传输过程中没有被篡改**

每部份通过 `.`分隔，例如：`xxxxx.yyyyy.zzzzz`, 以上组成 jwt 格式对应为：`Header.Payload.Signature`

```
// 1. 头部 (header) , 通过用 Base64 Url编码得到头部，得到 xxx
{
  "alg": "HS256",    // 指定签名使用的算法， 此处为 HS256
  "typ": "JWT"      // 指定令牌的类型, 也就是 jwt
}

)
// 2. 负载 (playload), 通过用 Base64 Url编码得到playload，得到 yyy
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

// 3.签名 (Signature), 对前面两部分base64得到的字符串和从服务端拿到的密钥secret 使用哈希算法计算出唯一签名
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),your-256-bit-secret
) secret base64 encoded

// 最终得到 JWT xxx.yyy.zzz
```

**注意⚠️: secret是保存在服务器端的，jwt的签发生成也是在服务器端的，secret是服务端的私钥，不能被泄漏, 它的作用是完成jwt的签发和jwt的验证**

得到 JWT 后可以在 [https://jwt.io/](https://jwt.io/) 进行校验，可以看到解码的 JWT 内容为

![](https://cdn.nlark.com/yuque/0/2023/png/25855336/1695641263481-929e252f-48cc-4af7-bcda-d8f573c5c5c7.png)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/359c612668764420ba5ca73859134845~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1264&h=787&s=98775&e=png&b=fefefe)

### JWT使用

既然生成了 JWT， 那么如何来使用它呢？ 为什么 OIDC 规定 Token格式必须得 JWT？

JWT 有多种使用方式， 如

1. 加到url中，`?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
2. 加到 header 请求头中，搭配 HTTPS **(推荐使用)**

`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  
3. 存储中 `cookie` 中, 自动发送，但不能跨域，或者跨域时候则放在 **request body**里, 存放在cookie里需要同时面临 **跨站脚本(XSS )** 和 **跨站请求伪造(CSRF)** 攻击的威胁，可以通过开启 `HTTP only` 来防范 **XSS攻击**，**因为开启了http only 的cookie不允许js进行读写，只能浏览器访问**，其他属性按需使用如 `SameSite` 等4. 存储在 `localStorage/SessionStorage` 中，没有CSRF的威胁，但同样面临 **XSS 攻击**的问题

### JWT优缺点

优点

- 自包含

- JWT 包含了头部（Header）、负载（Payload）和签名（Signature），这使得它是一个自包含的数据结构。负载可以携带有关用户、权限、到期时间等信息，**减少了需要查询外部数据存储的需要，有助于提高性能和可伸缩性**。

- 灵活性

- JWT 的负载可以包含自定义的声明（claims），这意味着你**可以根据需要添加任何额外的信息**。这对于在不同的应用场景中传递各种类型的数据非常有用。

- 无状态

- 由于 JWT 包含了足够的信息，使得验证令牌不需要查询外部存储或数据库。**这有助于实现无状态的服务器架构，减轻了服务器的负担**。

- 安全性

- JWT 使用签名来验证其完整性，**确保负载在传输过程中没有被篡改**。这样可以防止中间人攻击和数据篡改。

`正是因为 JWT 拥有以上优点，OIDC 规定 ID Token 的格式为 JWT`， 这有助于简化 OIDC 的流程，减少网络请求，提高安全性，为开发者和身份提供者提供了更方便、更可靠的方式来实现身份验证和用户信息传递。

缺点

**JWT 在某些场景很适合， 但这不意味着 JWT 适合所有场景，JWT也有很多缺陷**

- 无法撤回

- JWT最大的问题在于一旦发行后，无法撤回，因为 JWT 是无状态的，服务端并没有存储 JWT 格式的令牌， 它在失效之前都是有效的，默认情况下服务端无法让一个 token 失效 `(实际可以通过增加额外的逻辑来实现撤回，但也有代价)`

- 续签问题

- 因为无法撤回的问题， JWT的有效时间通常设置较短，session 可以自动续签，JWT 如何进行续签呢？ 解决这个问题可以发放两个 JWT，**参考 Oauth 2.0 使用未过期 Refresh Token 重新获取 Access Token**

## 总结

本文介绍的内容大概就这么多，但技术上很多细节需要背后进行深究，篇幅和个人能力有限也无法全部展示，希望上面这些简单的介绍对你有所帮助，最后如果想通过代码实现一个 `Oauth2.0 / OIDC` 的**认证授权应用**，那么个人推荐 [NextAuth.js](https://next-auth.js.org/getting-started/introduction), 作者声称将会改名成 [Auth.js](https://authjs.dev/)， 这是一个在线的体验 [demo](https://next-auth-example.vercel.app/)

## 参考链接

- [RFC 6749 - OAuth 2.0 授权框架](https://datatracker.ietf.org/doc/html/rfc6749)
- [RFC 6750 - OAuth 2.0 授权框架：Bearer Token使用](https://datatracker.ietf.org/doc/html/rfc6750)
- [RFC 7231：超文本传输协议 (HTTP/1.1)：语义和内容](https://www.rfc-editor.org/rfc/rfc7231)
- [RFC 7519 - JSON Web 令牌 (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)
- [RFC 7636：OAuth 公共客户端代码交换的证明密钥](https://www.rfc-editor.org/rfc/rfc7636)
- [https://jwt.io/ - Auth0](https://jwt.io/introduction)
- [授权码流程 - Auth0](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow)
- [Final: OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
- [OAuth 2.0 的一个简单解释 - 阮一峰](https://www.ruanyifeng.com/blog/2019/04/oauth_design.html)
- [OAuth 2 in Action](https://book.douban.com/subject/26997843/)
- [不要用JWT替代session管理（上）：全面了解Token,JWT,OAuth,SAML,SSO](https://zhuanlan.zhihu.com/p/38942172)
- [JWT 身份认证优缺点分析 | JavaGuide](https://javaguide.cn/system-design/security/advantages-and-disadvantages-of-jwt.html#%E6%80%BB%E7%BB%93)
- [Oauth 2.0 - PKCE](https://www.youtube.com/watch?v=Gtbm5Fut-j8)
