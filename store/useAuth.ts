"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabase/supabaseClient";
import {
  loginSchema,
  LoginSchema,
  RegisterSchema,
  registerSchema,
} from "@/lib/schemas/authSchema";
import { toast } from "sonner";

type State = {
  formLogin: Partial<LoginSchema>;
  formRegister: Partial<RegisterSchema>;
  loading: boolean;
};

type Actions = {
  setFormLogin: (partial: Partial<LoginSchema>) => void;
  setFormRegister: (partial: Partial<RegisterSchema>) => void;
  getAuthUser: () => Promise<void>;
  signin: () => Promise<boolean>;
  signup: () => Promise<boolean>;
};

export const useAuthStore = create<State & Actions>((set, get) => ({
  formLogin: { email: "", password: "" },
  formRegister: { email: "", password: "", confirmPassword: "" },
  loading: false,
  setFormLogin: (partial) => {
    set((state) => ({
      formLogin: { ...state.formLogin, ...partial },
    }));
  },
  setFormRegister: (partial) => {
    set((state) => ({
      formRegister: { ...state.formRegister, ...partial },
    }));
  },
  getAuthUser: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
    } catch {
      toast.error("Error al obtener la información del usuario.");
    }
  },
  signin: async () => {
    set({ loading: true });
    const formLogin = get().formLogin;
    const validator = loginSchema.safeParse(formLogin);

    if (!validator.success) {
      validator.error.issues.map((error) => toast.error(error.message));
      set({ loading: false });
      return false;
    }

    const { email, password } = get().formLogin;

    if (!email || !password) return false;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        if (error.code === "email_not_confirmed") {
          toast.error(
            "El correo electrónico no ha sido confirmado. Revisa tu bandeja de entrada."
          );
        }
        set({ loading: false });
        return false;
      }

      set({ loading: false });
      return true;
    } catch {
      toast.error("Error al iniciar sesión.");
      set({ loading: false });
      return false;
    }
  },
  signup: async () => {
    set({ loading: true });
    const formRegister = get().formRegister;
    const validator = registerSchema.safeParse(formRegister);

    if (!validator.success) {
      validator.error.issues.map((error) => toast.error(error.message));
      set({ loading: false });
      return false;
    }

    const { email, password } = get().formRegister;

    if (!email || !password) return false;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        if (error.code === "weak_password") {
          toast.error(
            "La contraseña debería contener al menos un caracter de cada uno de estos: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};'|<>?,./`~."
          );
        }

        if (error.code === "email_address_invalid") {
          toast.error(
            `El correo electrónico ${email} no es válido.` 
          );
        }

        set({ loading: false });
        return false;
      }

      set({ loading: false });
      toast.success("Usuario registrado con éxito.");
      return true;
    } catch {
      toast.error("Error al registrar al usuario.");
      set({ loading: false });
      return false;
    }
  },
}));
