"use client";
export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";

export default function CheckoutPage({
  params,
}: {
  params: { token: string };
}) {
  const [data, setData] = useState<{ image?: string; price?: number } | null>(null);

  // ✅ ambil token dari params (bukan searchParams lagi)
  const token = params.token;

  // ✅ decode token
  const dataToken = useMemo(() => {
    if (typeof window === "undefined") return null;

    try {
      if (!token) return null;
      const decoded = decodeURIComponent(token);
      return JSON.parse(atob(decoded));
    } catch {
      return null;
    }
  }, [token]);

  // ✅ state order
  const [order, setOrder] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    quantity: 1,
    color: "",
    paymentMethod: "COD",
  });

  // ✅ update order saat token ready
  useEffect(() => {
    if (!dataToken) return;

    setOrder((prev) => ({
      ...prev,
      quantity: dataToken.qty || 1,
      color: dataToken.color || "",
    }));
  }, [dataToken]);

  // ✅ ambil data produk
  useEffect(() => {
    if (!dataToken?.id) return;

    fetch(`/api/detail/${dataToken.id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [dataToken]);

  const price = data?.price || 0;
  const subtotal = price * order.quantity;
  const ongkir = 10000;
  const total = subtotal + ongkir;

  const updateQty = (newQty: number) => {
    setOrder((prev) => ({
      ...prev,
      quantity: newQty,
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPayment, setShowPayment] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleOrder = async () => {
    if (!order.name || !order.phone || !order.address || !order.city) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1000);
      return;
    }

    const payload = {
      productId: dataToken?.id,
      ...order,
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    await res.json();

    if (order.paymentMethod === "Transfer Bank") {
      setShowPayment(true);
    } else {
      alert("Pesanan berhasil dibuat! Siapkan uang saat barang datang.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-10 text-gray-600 mt-20">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-6">

        {/* 📦 RINGKASAN */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>

          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src={data?.image || "/placeholder.png"}
              className="w-20 h-20 md:w-40 md:h-40 object-contain rounded"
            />

            <div>
              <h3 className="font-semibold">Produk</h3>
              <p className="text-sm text-gray-500">Warna: {order.color}</p>

              <p className="text-lg font-bold text-green-600">
                Rp {price.toLocaleString("id-ID")}
              </p>

              {/* qty */}
              <div className="flex items-center mt-2">
                <button onClick={() => updateQty(Math.max(1, order.quantity - 1))}>-</button>
                <span className="px-4">{order.quantity}</span>
                <button onClick={() => updateQty(order.quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          {/* harga */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between">
              <span>Ongkir</span>
              <span>Rp {ongkir.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        {/* 📍 FORM */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Alamat</h2>

          <input name="name" value={order.name} onChange={handleChange} placeholder="Nama" className="input"/>
          <input name="phone" value={order.phone} onChange={handleChange} placeholder="No HP" className="input"/>
          <textarea name="address" value={order.address} onChange={handleChange} className="input"/>
          <input name="city" value={order.city} onChange={handleChange} className="input"/>
        </div>
      </div>

      {showAlert && <p className="text-red-500 text-center">Isi semua data!</p>}

      <button onClick={handleOrder} className="btn">
        Buat Pesanan
      </button>

      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h2>Transfer Bank</h2>
            <p>Total: Rp {total.toLocaleString("id-ID")}</p>
          </div>
        </div>
      )}
    </div>
  );
}