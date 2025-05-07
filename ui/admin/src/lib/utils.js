import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { toast } from "sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function error(ex) {
  toast(ex.message || ex);

}