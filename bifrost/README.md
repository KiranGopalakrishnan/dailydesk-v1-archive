# Service: Bifrost

Bifrost is the user authentication service , Responsible for 

- Create and authenticate users
- Handle auth tokens and refresh tokens
- Verify requests coming from downstream services

## Request authentication
 
 - User authentication is done via JWT tokens issued to a user at creation or login
 - A JWT Token & a refresh token are issued to the user on creation and login as httpOnly cookies
   which makes sure that the tokens are not exposed and are not exchanged via data in get/post requests,
   and saves the clients from having to keep track of refresh tokens.   