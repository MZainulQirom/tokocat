"use client"
import { useEffect, useState } from "react";

export default function AboutPage() {
const images = [
    "/images/paint1.jpg",
    "/images/paint2.jpg",
    "/images/paint3.jpg",
]
const [current, setCurrent] = useState(0);
useEffect(() => {
    const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
}, []);
  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-linear-to-b from-green-800 via-green-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Tentang TokoCat
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          Solusi terbaik untuk kebutuhan cat rumah, bangunan, dan proyek Anda.
          Kualitas terbaik dengan harga terjangkau.
        </p>
      </section>

      {/* STORY */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
            {images.map((src, index) => (   
            <img
              key={index}
              src={src}
              alt={`Toko Cat ${index + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
            />
          ))}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Cerita Kami</h2>
          <p className="text-gray-600 leading-relaxed">
            TokoCat berdiri sejak 2020 dengan tujuan menyediakan produk cat
            berkualitas tinggi untuk masyarakat Indonesia. Kami percaya bahwa
            warna dapat mengubah suasana dan memberikan kehidupan pada setiap
            ruangan.
          </p>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Kenapa Memilih Kami?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Produk Berkualitas</h3>
              <p className="text-gray-600">
                Kami hanya menjual cat dari brand terpercaya dengan kualitas terbaik.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
              <p className="text-gray-600">
                Harga kompetitif untuk semua kalangan, tanpa mengorbankan kualitas.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Pelayanan Ramah</h3>
              <p className="text-gray-600">
                Tim kami siap membantu Anda memilih warna dan produk terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Visi</h2>
          <p className="text-gray-600">
            Menjadi toko cat terpercaya dan terdepan di Indonesia.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Misi</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Menyediakan produk berkualitas tinggi</li>
            <li>Memberikan pelayanan terbaik</li>
            <li>Menjadi solusi kebutuhan warna pelanggan</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          Siap Mengubah Rumah Anda?
        </h2>
        <p className="mb-6">
          Jelajahi koleksi cat terbaik kami sekarang!
        </p>
        <a
          href="/products"
          className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Lihat Produk
        </a>
      </section>
    </div>
  );
}