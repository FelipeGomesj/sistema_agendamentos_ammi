import { toast } from "react-toastify";

export function validatePassword(password: string): string | null {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length < minLength) {
      return "A senha deve ter pelo menos 8 caracteres.";
    }
    if (!hasUpperCase) {
      return "A senha deve ter pelo menos uma letra maiúscula.";
    }
    if (!hasSymbol) {
      return "A senha deve ter pelo menos um símbolo.";
    }
    return null;
  }


  export function validateConfirmPassword(password:string, confirmPassword:string): string | null {
    if(password !== confirmPassword) {
      toast.error("As senhas não coincidem. Por favor, verifique novamente"); 
      return "As senhas não coincidem. Por favor, verifique novamente.";
    }
    return null;
  }
