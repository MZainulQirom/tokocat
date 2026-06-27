/// <reference types="jest" />

import { POST } from "../route";
import Order from "@/models/Order";
import * as productModule from "@/lib/product";

// MOCK DB CONNECT
jest.mock("@/lib/mongodb", () => ({
  connectDB: jest.fn(),
}));

// MOCK ORDER MODEL
jest.mock("@/models/Order", () => ({
  create: jest.fn(),
}));

// MOCK NextResponse (biar kita bisa baca JSON)
const mockJson = jest.fn();

// jest.mock("next/server", () => {
//   return {
//     NextResponse: {
//       json: (data: any, init?: any) => {
//         return {
//           status: init?.status || 200,
//           json: async () => data,
//         };
//       },
//     },
//   };
// });

describe("Checkout API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. VALIDASI ERROR
  it("should return 400 if data incomplete", async () => {
    const req = {
      json: async () => ({
        name: "Zainul",
        phone: "",
        address: "",
        city: "",
        productId: "1",
      }),
    } as any;

    const res = await POST(req);

    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.message).toBe("Data tidak lengkap");
  });

  // 2. PRODUK TIDAK ADA
  it("should return 404 if product not found", async () => {
    // override function internal
    jest.spyOn(productModule , "getProductFromDB").mockResolvedValue(null as any);

    const req = {
      json: async () => ({
        name: "Zainul",
        phone: "08123",
        address: "Surabaya",
        city: "Surabaya",
        productId: "invalid",
      }),
    } as any;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.message).toBe("Produk tidak ditemukan");
  });

  // 3. SUCCESS CASE
  it("should create order successfully", async () => {
    jest.spyOn(productModule, "getProductFromDB").mockResolvedValue({
      price: 50000,
    });

    (Order.create as jest.Mock).mockResolvedValue({
      _id: "order123",
    });

    const req = {
      json: async () => ({
        name: "Zainul",
        phone: "08123",
        address: "Surabaya",
        city: "Surabaya",
        productId: "1",
        quantity: 2,
        color: "Red",
        paymentMethod: "COD",
      }),
    } as any;
    

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.total).toBe(110000); // (50000 * 2) + 10000
    expect(Order.create).toHaveBeenCalled();
  });
  it("should ignore price dari frontend", async () => {
  const res = await POST({
    json: async () => ({
      productId: "123",
      name: "test",
      phone: "08123",
      address: "jalan",
      city: "jakarta",
      quantity: 1,
      price: 1, // 🔥 manipulasi
    }),
  } as any);

  const data = await res.json();

  expect(data.total).not.toBe(1);
});
});