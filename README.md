# Ecommerce Website

A simple Ecommerce website built with MERN stack. MongoDB used for the backend with Nodejs and Express to store user data for authentication, purchases, wishlist and user data.

React Router used for navigation. 


## Home Page

![App Screenshot](https://i.imgur.com/KOcjwQO.png)

![App Screenshot](https://i.imgur.com/omZbkqG.png)

> User can favorite a product to wishlist by clicking on a empty heart.

**Favorite:**

```
{
    name: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
}
```

## Product Page

![App Screenshot](https://i.imgur.com/UAVW6h8.png)

> Clicking on add to cart will add the current item/product to the shopping cart.

**Shopping Cart:**

```
{
    name: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quant: {
        type: Number,
        required: true
    }
}
```

## Login/Signup Page

![App Screenshot](https://i.imgur.com/FJILPrg.png)

![App Screenshot](https://i.imgur.com/VhTqHhO.png)

> User can signup by clicking **Sign Up** and opening the sing up tab
> If the user already has an account, it's possible to just login by 
> the login tab and then **Sign In**.

**User:**

```
{
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    second_contact: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    logged: {
        type: Boolean,
        default: false,
        required: false
    }
}
```

## Checkout Pages

![App Screenshot](https://i.imgur.com/S6MXCqS.png)

![App Screenshot](https://i.imgur.com/kI39LOn.png)

![App Screenshot](https://i.imgur.com/MR4Qv39.png)

![App Screenshot](https://i.imgur.com/gbi1xRJ.png)

> After a purchase, clicking on **Back to home**, **Go to dashboard** or **See your purchase(s)**,
> the current purchase will be add to the user's history purchases and will be available to overview in the dashboard,
> which is only accessible in a exist and logged account.

**Purchase:**

```
{
    purchase_number: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    buyout_type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    shipping: {
        type: String,
        required: true
    },
    shipping_price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    postal: {
        type: Number,
        required: true
    },
    street_number: {
        type: Number,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
}
```

## User Dashboard
![](https://i.imgur.com/oJfE1Ee.gif)

> The dashboard is only accessible in a exist and logged account.
> In the dashboard is possible to visualize user's data information,
> purchase's history and wishlist. It's possible to update account's 
> information in the dashboard and add a new address or remove and edit,
> set an address as default and much more.

**Address:**
```
{
    postal: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    street_address: {
        type: String,
        required: true
    },
    street_number: {
        type: Number,
        required: true
    },
    street_address_2: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    default: {
        type: Boolean,
        default: false
    }
}
```

## Stack used

**Front-end:** Javascript, React, React Router, SASS

**Back-end:** NodeJs, ExpressJs, Mongoose

**Database**: MongoDB


## Possible Future Additions

* Third Party Payment Integration
* Third Party Auth like Google, Facebook, Twitter, etc
* Recaptcha for security
* Recommendations/Frequently Bought Together
* Forgot Password
* For-You-Page based on favorites and previous orders
