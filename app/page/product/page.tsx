"use client";

import { useEffect, useState } from "react";
import ProductFilter from "../../components/productFilter/page";
import ProductCard from "../../components/ProductCard/page";
import Loading from "../../components/loading/page";
import {motion}from "framer-motion"; 


type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string
};

export default function ProdukPage() {
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch("/api/products")
        const data = await response.json();
        setProducts(data)
        setFiltered(data); // Set filtered to all products initially
        setLoading(false);
      }
      fetchData();
    },[])
      

  const handleSearch = (value: string) => {
    const result = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
  };

  return (
    <div className="w-full px-5 lg:max-w-5xl mx-auto  py-24 text-gray-600">
      <h1 className="text-3xl font-bold mb-6">Semua Produk</h1>

      <ProductFilter onSearch={handleSearch} />

      <div className="md:grid md:grid-cols-4 gap-5 text-gray-600">
      <motion.div
        transition={{ delay:  0.2 }}
        initial="hidden"
        animate="show"
        className="contents" // ⬅️ penting biar grid tetap jalan
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </div>
      {loading ? (<Loading />) : null}

      {filtered.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          Produk tidak ditemukan
        </p>
      )}
    </div>
  );
}