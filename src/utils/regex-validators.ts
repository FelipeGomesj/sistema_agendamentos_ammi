import { toast } from "react-toastify";

export function validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Por favor, insira um email válido.";
    }
    return null;
}

export function isValidString(input: string): boolean {
    // Remove leading, trailing, and multiple spaces
    const trimmedInput = input.trim().replace(/\s+/g, ' ');

    // Check if the length of the trimmed input is at least 8 characters
    if(trimmedInput.length < 8) {
        toast.error("Nome inválido. Por favor, insira um nome completo com pelo menos 8 letras."); 
    }
    return trimmedInput.length >= 8;
}

export function containsNumber(input: string): boolean {
    const hasNumber = /\d/.test(input);

    if (hasNumber) {
        toast.error("Nome inválido. Por favor, não insira números.");
    }

    return hasNumber;
}