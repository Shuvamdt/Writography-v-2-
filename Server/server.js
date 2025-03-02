import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
// import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = process.env.PORT || 4000;
const saltRounds = 10;
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4000",
      "https://writography-v-2.vercel.app",
    ],
    credentials: true,
  })
);

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

let posts = [];
let userId = 0;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/all", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogs");
    posts = result.rows;
    res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user_posts", async (req, res) => {
  try {
    const id = userId;
    const result = await db.query("SELECT * FROM blogs WHERE user_id=$1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/post", async (req, res) => {
  const content = req.body.content;
  const title = req.body.title;
  const date = new Date().toISOString();
  const post = {
    content: content,
    title: title,
  };
  console.log(post);
  const id = userId;
  if (content.length > 200) {
    return res.json({ mes: "Content exceeds the 100-word limit." });
  } else {
    await db.query(
      "INSERT INTO blogs (title, blog ,date, user_id) VALUES($1, $2, $3, $4)",
      [title, content, date, id]
    );
    res.json(post);
  }
});

app.patch("/user_posts/:id", async (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  console.log(id, content);
  const edit_id = await db.query(
    "UPDATE blogs SET blog = ($1) WHERE id = $2 RETURNING id",
    [content, id]
  );
  console.log(edit_id.rows);
  res.json({ id: edit_id.rows });
});

app.delete("/user_posts/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const deleteId = await db.query(
    "DELETE FROM blogs WHERE id= $1 RETURNING id",
    [id]
  );
  res.json({ id: deleteId.rows });
});
app.post("/roast/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query("SELECT blog FROM blogs WHERE id=$1", [id]);
  const blogContent = result.rows.length > 0 ? result.rows[0].blog : null;
  if (!blogContent) {
    return res.status(400).json({ error: "Blog content is required" });
  }
  const prompt = `Roast this blog post in a humorous and critical and short way:\n\n${blogContent}`;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ roast: text });
  } catch (error) {
    console.error("Error roasting blog:", error);
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

app.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.sendStatus(404);
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("success");
              userId = user.id;
              res.json({ name: user.name });
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed", error: err });
      }
      userId = user.id;
      return res.json({ message: "Login successful", name: user.name });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logout successful" });
    });
  });
});

passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb(null, false);
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
