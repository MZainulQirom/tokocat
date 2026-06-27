"use client";

import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

export default function Hero() {

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-green-200 via-green-100 to-white"></div>

      {/* Blur Circle (hiasan modern) */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-400 rounded-full blur-3xl opacity-30"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center" />
        
        {/* Text */}
      <div className="relative max-w-7xl h-full my-20 mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Text */}
        <motion.div
         initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
      >
          <h1 className="text-4xl text-green-600 md:text-5xl font-bold leading-tight">
            Solusi Cat Terbaik untuk
            <span className="text-green-700"> Rumah Impian Anda</span>
          </h1>

          <p className="mt-4 text-gray-700">
            Temukan berbagai pilihan cat berkualitas tinggi dari berbagai merk terpercaya
            dengan harga terbaik.
          </p>

          <div className="mt-6 flex gap-4">
            <Link href="/page/product">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                Lihat Produk
              </button>
            </Link>

            <button className="border border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-100">
              Konsultasi
            </button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}>
          <Image src="/assets/Paint.png" width={400} height={400} loading="eager" className="object-contain rounded-2xl" alt={" Cat Vector"} />
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-green-600 mt-2 rounded"></div>
        </div>
      </motion.div>
    </section>
  );
}