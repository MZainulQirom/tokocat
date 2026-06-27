"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
export default function CheckoutPage() {
  const [data, setData] = useState<{ image?: string, price?: number } | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // let dataToken: any = null;

  // try {
  //   if (token) {
  //     const decoded = decodeURIComponent(token);
  //     dataToken = JSON.parse(atob(decoded));
  //   }
  // } catch (err) {
  //   console.log("TOKEN ERROR:", err);
  // }
  const dataToken = useMemo(() => {
  try {
    if (!token) return null;
    const decoded = decodeURIComponent(token);
    return JSON.parse(atob(decoded));
  } catch {
    return null;
  }
}, [token])
  const [order, setOrder] = useState({
  name: "",
  phone: "",
  address: "",
  city: "",

  quantity: dataToken?.qty || 1,
  color: dataToken?.color || "",
  // totalPayment 
  paymentMethod: "COD",
});
  // const product = 
  const price = data?.price || 0;
  const subtotal = price * order.quantity;
  const ongkir = 10000;
  const total = subtotal + ongkir;

    useEffect(() => {
  if (!dataToken?.id) return;

  fetch(`/api/detail/${dataToken?.id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      setData(data);
    });
}, [dataToken.id]);
  const updateQty =(newQty: number) => {  
    setOrder((prev) => ({
      ...prev,
      quantity: newQty,
    }));
  }

  useEffect(() => {
    updateQty(dataToken?.qty || 1);
  }, [dataToken?.qty]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const [showPayment, setShowPayment] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleOrder = async () => {
    if(!order.name || !order.phone || !order.address || !order.city) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
    const payload = {
      productId: dataToken?.id,
      ...order,
      // price,
      // subtotal,
      // ongkir,
      // total,
    };
    console.log("ORDER PAYLOAD:", payload);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const result = await res.json();

    if(order.paymentMethod === "Transfer Bank") {
      setShowPayment(true);
      // alert("Pesanan berhasil dibuat! Silakan lakukan pembayaran melalui transfer bank.");
    } else if(order.paymentMethod === "COD") {
      alert("Pesanan berhasil dibuat! Silakan siapkan uang tunai untuk pembayaran saat barang diterima.");
    }
  }
  // const [orderId, setOrderId] = useState("");



  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-10 text-gray-600 mt-20">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-6">
        
        

        {/* 📦 RINGKASAN */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>

          <div className="flex items-center gap-4 border-b pb-4">
            <img
              src={data?.image  || "/placeholder.png"}
              alt="produk"
              className="w-20 h-20 md:w-40 md:h-40 object-contain rounded "
            />

            <div>
              <h3 className="font-semibold">Jotun Majestic</h3>
              <p className="text-sm text-gray-500">Warna: {dataToken?.color}</p>
              <p className="text-lg font-bold text-right text-green-600 w-full">Rp {price.toLocaleString("id-ID")}</p>

              {/* JUMLAH */}
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQty(order.quantity > 1 ? order.quantity - 1 : 1)}
                  className="px-2 border"
                >
                  -
                </button>
                <span className="px-4">{order.quantity}</span>
                <button
                  onClick={() => updateQty(order.quantity + 1)}
                  className="px-2 border"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* HARGA */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between">
              <span>Ongkir</span>
              <span>Rp {ongkir.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* 💳 PEMBAYARAN */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Metode Pembayaran</h3>

            <div className="space-y-2">
              {["COD", "Transfer Bank"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 border p-2 rounded cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={order.paymentMethod === method}
                    onChange={() => setOrder((prev) => ({ ...prev, paymentMethod: method }))}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* 📍 FORM ALAMAT */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>

          <input
            type="text"
            name="name"
            value={order.name}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            className="w-full border p-2 rounded mb-3"
          />

          <input
            type="text"
            name="phone"
            value={order.phone}
            onChange={handleChange}
            placeholder="No HP"
            className="w-full border p-2 rounded mb-3"
          />

          <textarea
            name="address"
            value={order.address}
            onChange={handleChange}
            placeholder="Alamat Lengkap"
            className="w-full border p-2 rounded mb-3"
            rows={3}
          />

          <input
            type="text"
            name="city"
            value={order.city}
            onChange={handleChange}
            placeholder="Kota / Kecamatan"
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
         {/* BUTTON */}
         {showAlert && (
         <p className="text-center text-sm italic text-red-500 ">Mohon Lengkapi data anda !!</p>
          )}
          <button 
          className="mt-6 md:w-1/2 w-full md:mx-auto grid bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          onClick={handleOrder}
          >
            Buat Pesanan
          </button>
          {showPayment && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center">

                <h2 className="text-xl font-bold mb-4">Pembayaran Transfer</h2>

                <p className="mb-2">Silakan transfer ke:</p>

                <div className="bg-gray-100 p-3 rounded mb-4">
                  <p className="font-semibold">BCA</p>
                  <p className="text-lg font-bold">1234567890</p>
                  <p className="text-sm">a.n Toko Cat</p>
                </div>

                <p className="mb-2">Total Pembayaran:</p>
                <p className="text-2xl font-bold text-green-600 mb-4">
                  Rp {total.toLocaleString("id-ID")}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  *Pastikan transfer sesuai hingga 3 digit terakhir
                </p>

                <button
                  onClick={() => {
                    alert("Terima kasih telah melakukan pembayaran! Pesanan Anda akan segera kami proses.")
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded mb-2"
                >
                  Saya Sudah Bayar
                </button>

                <button
                  onClick={() => setShowPayment(false)}
                  className="text-sm text-gray-500"
                >
                  Tutup
                </button>

              </div>
            </div>
          )}
    </div>
  );
}