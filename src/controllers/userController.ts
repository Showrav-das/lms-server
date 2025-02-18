import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login: express.RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// export const getProfile = async (req: Request, res: Response) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json(user);
// };

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const getUserDashboard = async (
  req: AuthenticatedRequest, // Changed from Request to AuthenticatedRequest
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const user = await User.findById(req.user.id).select("-password");
    console.log("user", user);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ message: "User Dashboard", user });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
};

// export const getUserDashboard = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ message: "User Dashboard", user });
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching user data" });
//   }
// };

export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json({ message: "Admin Dashboard", users });
  } catch (error) {
    res.status(500).json({ error: "Error fetching admin data" });
  }
};
