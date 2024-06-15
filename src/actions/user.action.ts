"use server"
import { signIn as signInAuth } from "@/auth";
type SignInProps = typeof signInAuth;
export const signIn: SignInProps = async (...props) => signInAuth(...props);