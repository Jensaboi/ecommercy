import { getConnection } from "../db/getConnection.js";
import validator from "validator";
import bcrypt from "bcrypt";

export async function register(req, res) {
  const db = await getConnection();
  try {
    let { name, gender, email, password } = req.body;

    gender = gender?.trim();
    name = name?.trim();
    email = email?.trim();

    if (!name || !gender || !email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const isValidEmail = validator.isEmail(email);

    if (!isValidEmail)
      return res.status(400).json({ message: "Invalid email format." });

    const hashedPassword = await bcrypt.hash(password, 10); //10, think thats safe enough

    const existingEmail = await db.get("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existingEmail)
      return res
        .status(409)
        .json({ message: "User with this email already exists." });

    const user = await db.run(
      `INSERT INTO users ( name, gender, email, password, role ) VALUES (
       ?, ?, ?, ?, 'user' )`,
      [name, gender, email, hashedPassword]
    );

    req.session.userId = user.lastID;

    req.session.save(err => {
      if (err) {
        console.error("Failed to save session:", err);
        return res.status(500).json({ message: "Failed to save session" });
      }

      res.status(201).json({
        message: "Account registerd.",
        user: { name, email },
      });
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}

export async function login(req, res) {
  const db = await getConnection();
  try {
    let { email, password } = req.body;

    email = email?.trim();

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found. Sign in to create an Account." });
    }

    const isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser)
      return res.status(400).json({ message: "Wrong email or password." });

    req.session.userId = user.id;

    req.session.save(err => {
      if (err) {
        console.error("Failed to save session:", err);
        return res.status(500).json({ message: "Failed to save session" });
      }
      res.status(200).json({
        message: "Session saved.",
        user: { name: user.name, email },
      });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}

export async function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong, Please try again." });
    }

    res.status(200).json({ message: "Logged out." });
  });
}

//Add later
export async function deleteUser(req, res) {
  const db = await getConnection();
  try {
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}
