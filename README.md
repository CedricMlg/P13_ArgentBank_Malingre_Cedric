# P13_ArgentBank_Malingre_Cedric

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* yarn
  ```sh
  npm install --global yarn
  ```

Argent Bank uses the following tech stack:

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the right versions and download both packages.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CedricMlg/P13_ArgentBank_Malingre_Cedric
   ```
2. Install packages
   ```sh
   yarn
   ```
3. Start local dev server
   ```js
   yarn dev:server
   ```
4. (in another terminal) Launch project
   ```js
   yarn dev
   ```

Your server should now be running at http://locahost:3001 and you will have two users in your MongoDB database!

## API Documentation

To learn more about how the API works, once you have started your local server, you can visit: http://localhost:3001/api-docs

## Populated Database Data

You should have two users in the database, here is the default values of the two users, you'll need email and password to signup :

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`
