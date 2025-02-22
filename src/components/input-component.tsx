import { useState, useEffect } from "react";
import { validateEmail } from "@/utils/regex-validators";
import { validatePassword } from "@/utils/password-validators";

interface InputComponentProps {
  tipo: string;
  placeHolderText: string;
  onErrorChange?: (error: string) => void;
  onValueChange?: (value: string) => void;
}

export default function InputComponent({ tipo, placeHolderText, onErrorChange, onValueChange }: InputComponentProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (tipo === "email") {
      const errorMessage = validateEmail(newValue);
      setError(errorMessage || "");
    } else if(tipo === "password"){
        const errorMessage = validatePassword(newValue);
        setError(errorMessage || "");
    } else {
      setError("");
    }
    if(onValueChange) {
        onValueChange(newValue);
      }
  };

  

  useEffect(() => {
    if (onErrorChange) {
      onErrorChange(error);
    }
  }, [error, onErrorChange]);

  return (
    tipo === 'email' ?  <div className="flex flex-col">
      <label className="font-bold text-gray-500 self-start mb-1">{placeHolderText}</label>
      <input
        type={tipo}
        placeholder={placeHolderText}
        value={value}
        onChange={handleChange}
        className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div> : tipo === 'password' ? 
    <div className="flex flex-col">
      <label className="font-bold text-gray-500 self-start mb-1">{placeHolderText}</label>
      <input
        type={tipo}
        placeholder={placeHolderText}
        value={value}
        onChange={handleChange}
        className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div> : 
    <div className="flex flex-col">
      <label className="font-bold text-gray-500 self-start mb-1">{placeHolderText}</label>
    <input
      type={tipo}
      placeholder={placeHolderText}
      value={value}
      onChange={handleChange}
      className="bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <span className="text-red-500">{error}</span>}
  </div> 
  ) ;
}