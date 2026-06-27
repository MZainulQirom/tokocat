"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Pesan berhasil dikirim 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6 text-gray-600">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-gray-600">
            Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-green-50 p-8 rounded-xl shadow-lg "
          >
            <h2 className="text-2xl font-semibold mb-6">Kirim Pesan</h2>

            <input
              type="text"
              placeholder="Nama"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full mb-4 p-3 border rounded-lg outline-none"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full mb-4 p-3 border rounded-lg outline-none"
              required
            />

            <textarea
              placeholder="Pesan"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full mb-4 p-3 border rounded-lg outline-none h-32"
              required
            />

            <button
              type="submit"
              className="bg-indigo-600 text-green-50 px-6 py-3 rounded-lg outline-none hover:bg-indigo-700 w-full"
            >
              Kirim Pesan
            </button>
          </form>

          {/* INFO */}
          <div className="space-y-6">

            <div className="bg-green-50 p-6 rounded-xl shadow-lg ">
              <h3 className="text-xl font-semibold mb-2">Alamat</h3>
              <p className="text-gray-600">
                Jl. Cat Indah No. 123, Jakarta
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl shadow-lg ">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">tokocat@email.com</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl shadow-lg ">
              <h3 className="text-xl font-semibold mb-2">Telepon</h3>
              <p className="text-gray-600">+62 812 3456 7890</p>
            </div>

            {/* MAP */}
            <div className="rounded-xl overflow-hidden shadow-lg ">
              <iframe
                src="https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-60 border-0"
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}