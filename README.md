# Violet Coffee Shop - Backend

<br/>

<div align="center">
	<img height="200" src="https://raw.githubusercontent.com/anshoriacc/violet-coffee-shop-backend/master/public/github-banner.png" alt="VioletCoffeeShop">

[![express](https://img.shields.io/npm/v/express?label=express)](https://www.npmjs.com/package/express)
[![sequelize](https://img.shields.io/npm/v/sequelize?label=sequelize)](https://www.npmjs.com/package/sequelize)
[![mysql](https://img.shields.io/npm/v/mysql?label=mysql)](https://www.npmjs.com/package/mysql)
[![jsonwebtoken](https://img.shields.io/npm/v/jsonwebtoken?label=jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
[![bcrypt](https://img.shields.io/npm/v/bcrypt?label=bcrypt)](https://www.npmjs.com/package/bcrypt)
[![cors](https://img.shields.io/npm/v/cors?label=cors)](https://www.npmjs.com/package/cors)
[![multer](https://img.shields.io/npm/v/multer?label=multer)](https://www.npmjs.com/package/multer)
[![dayjs](https://img.shields.io/npm/v/dayjs?label=dayjs)](https://www.npmjs.com/package/dayjs)
[![midtrans-client](https://img.shields.io/npm/v/midtrans-client?label=midtrans-client)](https://www.npmjs.com/package/midtrans-client)
[![nodemailer](https://img.shields.io/npm/v/nodemailer?label=nodemailer)](https://www.npmjs.com/package/nodemailer)

<br/>

</div>

<br/>

Violet coffee shop is a web application that can make it easier for customer to order food and beverages from coffee shop. Customer can simply register, login, see products, order, see order history, edit their profile, etc.

## Contents

- [API Endpoint](#api-endpoint)
- [Run Application](#run-application)
- [Postman Documentation](#postman-documentation)
- [Deployment](#deployment)
- [Related Projects](#related-projects)
- [Contributors](#contributors)

## API Endpoint

### Public

#### Login

Endpoint: `https://coffee-shop-back-end.herokuapp.com/api/auth/login`

- Body
  | KEY | VALUE |
  | --- | --- |
  | Password | `112233` |
  | Email | customer@gmail.com |
  | Password | 112233 |

#### Register

Endpoint: `https://coffee-shop-back-end.herokuapp.com/api/auth/signup`

- Body
  | KEY | VALUE |
  | --- | --- |
  | Email | `type new email` |
  | Password | `type password` |
  | Phone | `your phone number` |

Endpoint: `https://coffee-shop-back-end.herokuapp.com/api/product`

- Query `optional`
  | KEY | VALUE |
  | --- | --- |
  | search | `keyword for product (string)` |
  | sortBy | `sort product based by (string)` |
  | sort | `ASC \| DESC` |
  | code_promo | `type promo code (string)` |
  | per_page | `product you want to display per page (number)` |
  | page | `jump to page you want (number)` |
  | category | `type category: coffee \| non coffee \| food` |

#### Forgot Password

#### Product's detail

#### Edit profile

### Customer:

- Order
- Order history

### Admin:

- Add product
- Edit product
- Add promo
- Edit promo
- Dashboard Admin

For more detailed API Endpoints, please visit the [full postman documentation](#postman-documentation)

## How to Run the Application

### 1. Clone this repository

Clone this repository by run the following code:

```
$ git clone <this-repo-url>
```

### 2. Install dependency packages

Install dependency packages by run the following code inside project folder:

```
$ npm install
```

### 3. Run `npm start`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Postman Documentation

[Postmaan documentation link](https://documenter.getpostman.com/view/15601945/UVeDrmm1)

## Deployment

[Heroku deploy link](https://coffee-shop-back-end.herokuapp.com/)

## Related Projects

[Violet Coffee Shop - Frontend](https://github.com/anshoriacc/violet-coffee-shop-frontend)

## Contributors

This project created with ReactJS by [Achmad Anshori](https://github.com/anshoriacc), [Fahrul Muhammad](https://github.com/fahrul-muhammad), [Tri Sumanzaya](https://github.com/Trisumanzaya93), [Fajar Pratama Vhishinggah](https://github.com/ikehikeh151), [Hazpi Nurafgan](https://github.com/Hazgn).
