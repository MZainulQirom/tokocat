"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // preview gambar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // submit
  const handleSubmit = async () => {
    if (!file) return alert("Pilih gambar dulu!");

    setLoading(true);

    try {
      // 1. upload ke cloudinary
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      // 2. simpan ke mongodb
      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          name,
          color,
          price: Number(price),
          category,
          description,
          image: uploadData.url,
        }),
      });

      alert("Produk berhasil ditambahkan 🎉");

      // reset
      setName("");
      setColor("");
      setPrice("");
      setCategory("");
      setDescription("");
      setFile(null);
      setPreview("");
    } catch (err) {
      alert("Terjadi error!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600 bg-linear-to-br from-green-100 to-white p-4">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">
          Tambah Produk
        </h1>

        {/* Nama */}
        <input
          type="text"
          placeholder="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          placeholder="Warna Cat"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Harga */}
        <input
          type="number"
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Kategori */}
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
            <textarea
              placeholder="Deskripsi (Opsional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

        {/* Upload */}
        <div className="mb-3">
          <input type="file" onChange={handleFileChange} value={file?.name || ""} />
        </div>

        {/* Preview */}
        {preview && (
          <motion.img
            src={preview}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg mb-3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        )}

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          {loading ? "Loading..." : "Tambah Produk"}
        </motion.button>
      </motion.div>
    </div>
  );
}