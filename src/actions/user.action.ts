'use server';
import { signIn as signInAuth, signOut as signOutAuth } from '@/auth';

type SignInProps = typeof signInAuth;
type SignOutProps = typeof signOutAuth;
export const signIn: SignInProps = async (...props) => signInAuth(...props);
export const signOut: SignOutProps = async (...props) => signOutAuth(...props);