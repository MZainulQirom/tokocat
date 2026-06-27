"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "../loading/page";
import Link from "next/link";

export default function Products() {
  type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string
};
  // const products = [

  //   {
  //     name: "Dulux Interior",
  //     price: "Rp 150.000",
  //     image: "/images/1.jpeg"
  //   },
  //   {
  //     name: "Avian Cat Kayu",
  //     price: "Rp 120.000",
  //     image: "/images/2.jpg"
  //   },
  //   {
  //     name: "No Drop Anti Bocor",
  //     price: "Rp 200.000",
  //     image: "/images/3.jpeg"
  //   },
  // ];
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(false);
console.log(products);

  // Simulate fetching data from an API
  useEffect(()  => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch("/api//products?unggulan=true");
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
    setLoading(false);
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <motion.h2 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-green-600 text-3xl font-bold mb-10">
        Produk Unggulan
      </motion.h2>
      {loading ? (<Loading />) : null}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {products.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            key={i}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img src={item.image} alt={item.image} width={500} height={500} className="h-40 object-contain rounded-lg" />

            <h3 className="mt-4 font-semibold text-gray-600 h-10 truncate">{item.name}</h3>
            <p className="text-green-600 font-bold">Rp.{Number(item.price).toLocaleString('id-ID')}</p>
            <div className="text-xs italic border bg-linear-to-r from-green-600 to-green-50 border-green-400 rounded-full text-center">
              stok terbatas
            </div>

            <Link href={`/detailProduct/${item.id}`} className="mt-4 w-full grid mx-auto text-center bg-green-600 text-white py-2 rounded-lg">
              Beli
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}