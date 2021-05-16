# verification-of-mail-image-upload


Created the backend for verify user and upload img. 

## Documentation
- Use Postman to create documentation
- Click on docs below to have a look on post man documentation 

[![DOCS](https://img.shields.io/badge/Documentation-see%20docs-green?style=for-the-badge&logo=appveyor)](https://documenter.getpostman.com/view/14176656/TzRNGVsC)

## Functionality
### Images
- logged in and verified user can upload image
- Image will be uploaded to aws s3
- image info will also be store in our database which will contain key, url of img from aws, created at time , image Expire time and  and object id of user who uploaded image
- Expired image will be delete automatically using get routes
- get specific image with key
- get all images

### Users & Authentication
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 30 days
- User registration
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- User sendEmail
  * route will send link on clicking that link user will be verified


## Security
- Encrypt passwords and reset tokens
- Prevent NoSQL injections
- Add headers for security (helmet)
- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Use cors to make API public 


## Code Related Suggestions
- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes
- Validation using Mongoose and no external libraries
- Use async/await (create middleware to clean up controller methods)

