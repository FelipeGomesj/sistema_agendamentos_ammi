"use client";
import { useState } from "react";
import InputComponent from "@/components/input-component";
import { useRouter } from "next/navigation";
import { isSomeEmptyFiled } from "@/utils/empty-fields-validator";
import { loginService } from "@/services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    if (isSomeEmptyFiled([email, password])) {
      return;
    }
    loginFunction();
  };


  const loginFunction = async () => {
    try {
        const response = await loginService(email.toLowerCase(), password);
        
        // ✅ Armazena o token no sessionStorage ou localStorage
        sessionStorage.setItem("token", response.access_token);
        sessionStorage.setItem("user", JSON.stringify(response.user));
    
        router.push("/"); // Redireciona para a home
      } catch (error: any) {
        alert(error.message);
      }

  }
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Bem-vindo!</h2>
        <p className="text-gray-600 mb-6">Conecte-se</p>
        <div className="flex flex-col gap-4">
          <InputComponent tipo="email" placeHolderText="E-mail" onErrorChange={setEmailError} onValueChange={setEmail} />
          <InputComponent tipo="password" placeHolderText="Senha" onErrorChange={setPasswordError} onValueChange={setPassword} />
          <button
            className={`bg-blue-500 text-white py-2 rounded-md hover:bg-green-600 transition ${emailError || passwordError ? 'cursor-not-allowed' : ''}`}
            disabled={!!emailError || !!passwordError}
            onClick={handleLogin}
          >
            Entrar
          </button>
          <button
            className="bg-blue-900 text-white py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => router.push("/create-account")}
          >
            Crie sua conta
          </button>
          <a href="#" className="text-blue-500 hover:underline">
            Esqueci minha senha
          </a>
        </div>
      </div>
    </div>
  );
}