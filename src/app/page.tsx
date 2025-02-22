"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { User } from "@/models/user.model";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      setUser(JSON.parse(user));
    }
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="ml-4 text-xl">Sistema de Agendamentos</h1>
        </div>
        <div>
          {isLoggedIn ? (
            <div className="flex items-center">
              <img
                src="/assets/images/avatar.png"
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="mr-4">{user?.name}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => router.push("/login")}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/create-account")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Menu Hamburguer */}
      {menuOpen && (
        <nav className="bg-gray-800 text-white p-4">
          <button
            onClick={() => router.push("/appointments")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Agendamentos
          </button>
        </nav>
      )}

      {/* Corpo */}
      <main className="flex-grow p-4">
        <h2>Corpo da Home</h2>
        <p>Coloque o conteúdo desejado aqui.</p>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 text-center">
        <p>Desafio Técnico - Sistema de Agendamentos - Ammi Tecnologia</p>
        <p>Desenvolvedor: Felipe Gomes</p>
      </footer>
    </div>
  );
}