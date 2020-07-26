# Sessions Manager

[![Build Status](https://travis-ci.org/meetKazuki/sessions-manager.svg?branch=develop)](https://travis-ci.org/meetKazuki/sessions-manager)
[![Test Coverage](https://api.codeclimate.com/v1/badges/581fdd29deba58ff43be/test_coverage)](https://codeclimate.com/github/meetKazuki/sessions-manager/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/581fdd29deba58ff43be/maintainability)](https://codeclimate.com/github/meetKazuki/sessions-manager/maintainability)

<details>
  <summary>Demo User</summary>

> | Email Address               | Password |
> | --------------------------- | -------- |
> | `session@demo.dev`          | 11111111 |

</details>


## Getting Started

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installing/Run locally

- Make sure you have `nodejs`, `postgres` installed.

- Clone or fork repo🤷‍♂

  ```bash
    - git clone https://github.com/meetKazuki/sessions-manager
    - cd sessions-manager
    - npm install
  ```

- Create a PostgreSQL database by running the command below in `psql`

  ```bash
    CREATE DATABASE session_dev;
  ```
- Create/configure `.env` environment with your credentials. A sample `.env.example` file has been provided to get you started. Make a duplicate of `.env.example` and rename to `.env`, and then continue with the test.


### API ENDPOINTS

| URI                                       | HTTP Method     | Description
| --------------------------                | -----------     | -----------------
| <code>/auth/signup</code>                 | `POST`          | Create an account
| <code>/auth/signin</code>                 | `POST`          | Log-in to account
| <code>/users/sessions</code>              | `GET`           | Get logged-in devices for user
| <code>/users/sessions/</code>             | `DELETE`        | Logout out of all sessions for a user
| <code>/users/sessions/:sessionId</code>   | `DELETE`        | Logout out of a particular session


### RESOURCES
- [Model Entities](https://dbdiagram.io/d/5f110de474ca2227330d7660)
- [Hosted API](https://sess-staging.herokuapp.com/)
