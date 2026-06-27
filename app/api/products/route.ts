import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Product from "@/models/Product";

// GET semua produk
// export async function GET() {
//   try {
//     await connectDB();
    

//     const products = await Product.find();

//     const formatted = products.map((item: any) => ({
//       id: item._id.toString(),
//       name: item.name,
//       price: item.price,
//       category: item.category,
//       color: item.color,
//       description: item.description,
//       image: item.image,
//     }));

//     return NextResponse.json(formatted);
//   } catch (error: any) {
//     console.log("ERROR GET:", error);

//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Product from "@/models/Product";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const unggulan = searchParams.get("unggulan");
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    let filter: any = {};

    // 🔥 filter unggulan
    if (unggulan === "true") {
      filter.unggulan = true;
    }

    // 🔥 filter category
    if (category) {
      filter.category = category;
    }

    let query = Product.find(filter);

    // 🔥 limit data
    if (limit) {
      query = query.limit(Number(limit));
    }

    const products = await query;

    const formatted = products.map((item: any) => ({
      id: item._id.toString(),
      name: item.name,
      price: item.price,
      category: item.category,
      color: item.color,
      description: item.description,
      image: item.image,
      unggulan: item.unggulan,
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
// POST tambah produk
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // validasi biar aman
    if (!body.name || !body.price || !body.category || !body.image) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.log("ERROR POST:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}