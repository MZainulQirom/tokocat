import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getProductFromDB } from "@/lib/product";

// simulasi ambil produk dari DB
// async function getProductFromDB(productId: string) {
//   // 🔥 WAJIB: nanti ganti dengan MongoDB Product kamu
//   return {
//     price: 50000, // contoh
//   };
// }


export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    // 🔍 VALIDASI DATA
    if (!body.name || !body.phone || !body.address || !body.city) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // 🔥 AMBIL DATA PRODUK DARI DB (ANTI MANIPULASI)
    const product = await getProductFromDB(body.productId);

    if (!product) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    // 🔢 HITUNG ULANG (JANGAN PERCAYA FRONTEND)
    const price = product.price;
    const quantity = body.quantity || 1;
    const subtotal = price * quantity;
    const ongkir = 10000;
    const total = subtotal + ongkir;

    // 🧾 BUAT ORDER
    const order = await Order.create({
      productId: body.productId,
      name: body.name,
      phone: body.phone,
      address: body.address,
      city: body.city,

      quantity,
      color: body.color,

      price,
      subtotal,
      ongkir,
      total,

      paymentMethod: body.paymentMethod,

      status:
        body.paymentMethod === "COD"
          ? "pending"
          : "pending_payment",
    });

    // 📤 RESPONSE
    return NextResponse.json({
      success: true,
      orderId: order._id,
      total,
      paymentMethod: body.paymentMethod,
    });

  } catch (error) {
    console.log("CHECKOUT ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}