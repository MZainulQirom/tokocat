
import Product from "@/models/Product";
export async function getProductFromDB(productId: string) {
  const product = await Product.findById(productId);
  if (!product) {
    return null;
  }
  return {
    price: product.price,
    // price : 50000
  };
}