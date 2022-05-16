const { check, validationResult, matchedData } = require('express-validator');
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const User = db.users;

/**
 * login authentication
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @api api/auth/login 
 */
async function login(req, res) {
  
    await check('email').notEmpty()
        .withMessage("Email is required")
        .normalizeEmail().isEmail()
        .run(req);

    await check('password').notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 }).run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(422).json({ 
        errors: result.array() 
        });
    }

    // Get user input   
    const email = req.body.email;
    const password = req.body.password;

    try {

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
           // Create token
          const token = jwt.sign(
            { user_id: user.id, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
    
          res.status(200).json({user,token});
      }

    } catch (err) {
        res.status(400).send({
          message:
            err.message || "Invalid req."
        });
    }
}

/**
 * Register authentication
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @api api/auth/register 
 */
 async function register(req, res) {
  
    await check('email').notEmpty()
          .withMessage("Email is required")
          .normalizeEmail().isEmail()
          .run(req);

    await check('password').notEmpty()
          .withMessage("Password is required")
          .isLength({ min: 6 }).run(req);
    await check('first_name')
          .notEmpty()
          .withMessage("First name is required")
          .run(req);
    await check('last_name')
          .notEmpty()
          .withMessage("Last name is required")
          .run(req);
    await check('username').notEmpty()
          .withMessage("Username is required").run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ 
        errors: result.array() 
      });
    }

      // Get user input   
    const email = req.body.email;
  
    // Validate if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // 422 Unprocessable Entity: server understands the content type of the request entity
      // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
      return res.status(200).json({
        errors: [
          {
            email: user.email,
            msg: "The user already exists",
          },
        ],
      });
    }

    // Hash password before saving to database
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user_details = {
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    };

     // Save Tutorial in the database
     try {
      // if Users.create supports callbacks only you always can wrap this with Promise
      const createdUser = await User.create(user_details);
      res.send(createdUser);
    } catch (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
    }

      //  Do not include sensitive information in JWT
  const accessToken = await jwt.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10s",
    }
  );

  res.json({
     accessToken
  });
          
 }

module.exports = {
login,
register
}