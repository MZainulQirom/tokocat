"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/loading/page";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard/ProductCard";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  color?: string | string[];
  description?: string;
};

export default function DetailProductPage() {

const params = useParams();
const rawId = params?.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [product, setProduct] = useState<Product | null>(null);
  const [allProduct, setAllproduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // console.log("PARAMS:", allProduct);

   const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => {
    if (qty > 1) setQty((prev) => prev - 1);
  };

  const createToken = ( data: any) => {
    return btoa(JSON.stringify(data));
  }
  const token = createToken({ id, color: selectedColor, qty });
  useEffect(() => {
    if (!id) return; // ⛔ tunggu id siap

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/detail/${id}`);
        const resAll = await fetch("/api/products");
        
        if (!resAll.ok) {
          const text = await resAll.text();
          throw new Error(text || "Gagal mengambil data produk");
        }

        const allProductsData = await resAll.json();
        setAllproduct(allProductsData);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Gagal mengambil data");
        }

        const data = await res.json();
        setProduct(data);
        console.log(data);
        
      } catch (err: any) {
        console.error("FETCH ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    fetchProduct();
  }, [id]);

  // 🟡 Loading state
  if (loading) {
    return (
      <Loading />
    );
  }

  // 🔴 Error state
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // ⚠️ Data tidak ada
  if (!product) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Produk tidak ditemukan</p>
      </div>
    );
  }

  // ✅ Success state
  return (
   <section className="text-gray-600">
     <div className="w-[90%] h-full mt-20 md:grid grid-cols-2 gap-2 mx-auto bg-gray-100 p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-10/12 mx-auto h-72   rounded-lg object-contain"
      />
      <div>

      <h1 className="text-xl text-gray-600 font-bold mt-4 h-16">{product.name}</h1>
      <div className="w-full border-b border-gray-400" />
      <p className="text-gray-500 italic text-sm text-right ">Category: {product.category}</p>
      {/* <p className="text-xs italic">{Array.isArray(product.color) ? product.color.join(', ') : product.color}</p> */}
      {product.color && (
        <div className="flex gap-2 flex-wrap">
          {(Array.isArray(product.color) ? product.color : [product.color]).map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(item)}
              className={`px-3 py-1 border rounded-full text-sm ${
                selectedColor === item
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className="mt-4">
        <p className="font-semibold mb-2">Jumlah</p>
        <div className="flex items-center text-sm gap-3">
          <button
            onClick={decreaseQty}
            className="px-3  border rounded"
          >
            -
          </button>

          <span>{qty}</span>

          <button
            onClick={increaseQty}
            className="px-3  border rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-green-600 text-xl font-semibold mt-2">
        Rp {Number(product.price).toLocaleString('id-ID')}
        </p>
        <Link
          href={`/checkout/${encodeURIComponent(token)}`}
          className={`bg-green-600 text-white py-2 px-4 rounded-lg ${
            !selectedColor ? "opacity-50 pointer-events-none" : "hover:bg-green-700"
          }`}>
          Beli Sekarang
        </Link>
      </div>
      </div>
     
      {product.description && (
      <p className="italic mt-5 text-gray-500  md:w-[150%] max-h-full whitespace-pre-line leading-relaxed">{product.description}</p>
      )}
    </div>
      <div  className="w-full border-b my-10 border-gray-400"/>

    <div className="md:grid grid-cols-4 gap-2 w-[90%] mx-auto xl:max-w-7xl ">
      {allProduct?.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
   </section>
  );
}