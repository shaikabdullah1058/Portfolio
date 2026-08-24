import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const socials = {
  github: "https://github.com/shaikabdullah1058",
  linkedin: "https://www.linkedin.com/in/shaik--abdullah/",
  instagram: "https://www.instagram.com/shaik._.abdullah._/",
  email: "shaikabdullah1052008@gmail.com",
};
