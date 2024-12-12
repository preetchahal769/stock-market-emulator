import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  signup: async ({
    fullName,
    email,
    dateOfBirth,
    phoneNumber,
    password,
    confirmPassword,
  }) => {
    console.log({
      fullName,
      email,
      dateOfBirth,
      phoneNumber,
      password,
      confirmPassword,
    });
    set({ loading: true });
    if (password != confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axios.post("/auth/signup", {
        fullName,
        email,
        dateOfBirth,
        phoneNumber,
        password,
        confirmPassword,
      });
      set({ user: res.data });
      return toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in signup", error);
      return toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    console.log({ email, password });
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res);
      set({ user: res.data });
    } catch (error) {
      console.log("Error in login", error);
      return toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    console.log("logout");
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
