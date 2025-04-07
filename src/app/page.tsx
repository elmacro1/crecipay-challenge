"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files?.[0];

    setFile(value || null);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/commissions/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error al subir el archivo");
      }

      const data = await res.json();

      setSuccessMessage(data.message);
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(error as string);
    }
  };

  return (
    <main className="flex flex-col gap-4 items-center">
      <h2>Subir archivo CSV</h2>
      <input type="file" accept=".csv" onChange={onChange} />
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
        onClick={handleSubmit}
      >
        Procesar archivo
      </button>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </main>
  );
}
