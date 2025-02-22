"use client";
import { useState } from "react";
import InputComponent from "@/components/input-component";
import { useRouter } from "next/navigation";

import { validateConfirmPassword } from "@/utils/password-validators";
import { isSomeEmptyFiled } from "@/utils/empty-fields-validator";
import { isValidString, containsNumber} from "@/utils/regex-validators";
import { createUserService } from "@/services/user.service";
import { CreateUserDto } from "@/DTO/create-user.dto";
import { toast } from "react-toastify";
export default function CreateAccount() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter();
  
  const handleCreateAccount =  () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name); 
    console.log("Confirm Password:", confirmPassword);

    if(isSomeEmptyFiled([email,password, confirmPassword, name])) {
      return;
    }

    if(validateConfirmPassword(password, confirmPassword) !==  null){
      return;
    }

    if(!isValidString(name)){
      return;
    }

    if(containsNumber(name)){
      return;
    }


    createUserAccount();

  };



  const createUserAccount = async () => {
    const userDto: CreateUserDto = {
      email: email,
      name: name,
      password: password,
      role: "user",
    };

    try {
      await createUserService(userDto);
      router.push("/");
      toast.success("Usuário criado com sucesso! Faça o Login para continuar.");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return;
    }
  }

    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl font-semibold mb-4">Crie sua conta</h2>
          <p className="text-gray-600 mb-6">Preencha os campos abaixo para criar sua conta</p>
          <div className="flex flex-col gap-4">
            <InputComponent tipo="text" placeHolderText="Nome e Sobrenome" onErrorChange={setNameError} onValueChange={setName} />
            <InputComponent tipo="email" placeHolderText="E-mail" onErrorChange={setEmailError} onValueChange={setEmail} />
            <InputComponent tipo="password" placeHolderText="Senha" onErrorChange={setPasswordError} onValueChange={setPassword} />
            <InputComponent tipo="password" placeHolderText="Confirmar senha" onErrorChange={setConfirmPasswordError} onValueChange={setConfirmPassword} />
            <button
              className={`bg-blue-500 text-white py-2 rounded-md hover:bg-green-600 transition ${emailError || passwordError || confirmPasswordError ? 'cursor-not-allowed' : ''}`}
              disabled={!!emailError || !!passwordError || !!confirmPasswordError}
              onClick={handleCreateAccount}
            >
              Criar conta
            </button>
  
            <button
              className={`bg-blue-900 text-white py-2 rounded-md hover:bg-green-600 transition`}
              onClick={() => router.back()}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }
