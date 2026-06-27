// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server"; 

// export async function GET() {
//     try {
//         const client = await clientPromise;
//         const db = client.db("tokocat");
//         const products = await db.collection("products").find({}).toArray();
//         const formatted = products.map((item) => ({
//       id: item._id.toString(),
//       name: item.name,
//       price: item.price,
//       category: item.category,
//       image: item.image,
//     }));
//         return NextResponse.json(formatted);
//     } catch (error :any) {
//         console.error("Error fetching products:", error);
//         // const message = error instanceof Error ? error.message : String(error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ WAJIB await

    console.log("API ID:", id);

    if (!id) {
      return NextResponse.json({ message: "ID kosong" }, { status: 400 });
    }

    const cleanId = id.trim();

    let objectId;

    try {
      objectId = new ObjectId(cleanId);
    } catch {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("toko_cat");

    const product = await db.collection("products").findOne({
      _id: objectId,
    });

    if (!product) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      color: product.color,
      description: product.description,
    });

  } catch (error: any) {
    console.log("ERROR DETAIL:", error);
    return NextResponse.json(
      { error: error.message || String(error) },
      { status: 500 }
    );
  }
}