"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type Product = {
  id: number | number;
  name: string;
  price: string;
  category: string;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  // console.log(product);
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 60 },
        show: { opacity: 1, y: 0 },
      }}
      className="bg-white p-4 my-5 rounded-xl shadow hover:shadow-2xl transition"
    >
      <img 
      src={product.image} 
      alt={product.name}
      className="h-40 w-full rounded-lg object-contain" />

      <h3 className="mt-4 h-10 font-semibold truncate">{product.name}</h3>
      <p className="text-green-600 font-bold">Rp.{Number(product.price).toLocaleString("id-ID")}</p>

      <div className="text-xs italic border bg-linear-to-r from-green-600 to-green-50 border-green-400 rounded-full text-center">
        stok terbatas
      </div>

      <Link
        href={`/detailProduct/${product.id}`}
        className="mx-auto grid text-center mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Beli
      </Link>
    </motion.div>
  );
}