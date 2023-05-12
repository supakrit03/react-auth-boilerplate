const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const users = [
  {
    id: 1,
    name: "supakrit",
    username: "foo",
    password: "Pass@word",
  },
];

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/", (req, res) => {
  res.send("Test API");
});

const accessTokenSecret = "accessTokenSecret";
const authTokenSecret = "authTokenSecret";

const signAccessToken = (payload) => {
  // AccessToken  expiresIn  1 minute
  return jwt.sign(payload, accessTokenSecret, { expiresIn: 60 });
};

const signAuthToken = (payload) => {
  // AuthToken  expiresIn  7 days
  return jwt.sign(payload, authTokenSecret, { expiresIn: "7 days" });
};

const cookieName = "auth_token";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  const errorMsg = "username or password invalid";
  if (!user) return res.status(400).json({ message: errorMsg });

  const payload = { userId: user.id };

  const authToken = signAuthToken(payload);
  const accessToken = signAccessToken(payload);

  res.cookie(cookieName, authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    accessToken,
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie(cookieName);
  res.status(200).send();
});

app.post("/refresh", (req, res) => {
  const { auth_token } = req.cookies;

  jwt.verify(auth_token, authTokenSecret, (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const payload = { userId: user.userId };
    res.status(200).json({ accessToken: signAccessToken(payload) });
  });
});

// Protected resource path
app.get("/profile", authenticateJWT, (req, res) => {
  const { userId } = req.user;

  const user = users.find((user) => user.id === userId);

  res.status(200).json({ user });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server start at ${PORT}`);
});
