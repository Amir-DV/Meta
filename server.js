const express = require("express");
const passport = require("passport");
const session = require("express-session");
const DiscordStrategy = require("passport-discord").Strategy;
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:3000", "http://192.168.1.33:3000"];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin - like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Use cookie parser
app.use(cookieParser());

// Configure sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Ensure you have this in your .env file
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set secure to true in production
      maxAge: 3600000, // 1 hour expiration
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Discord strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/discord/callback",
      scope: ["identify", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user profile
      // e.g., find or create user in your database
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Define the OAuth routes
app.get("/auth/discord", passport.authenticate("discord"));

app.get(
  "/auth/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect to React app after successful authentication
    res.redirect("http://localhost:3000/en");
  }
);

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout error" });
    }
    res.clearCookie("connect.sid");
    res.redirect("http://localhost:3000/en");
  });
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
