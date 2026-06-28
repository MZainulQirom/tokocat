import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutPage from "../[token]/page";

// ✅ mock alert (WAJIB)
beforeAll(() => {
  global.alert = jest.fn();
});

// ✅ mock useSearchParams dari next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => {
      const data = {
        id: "123",
        qty: 1,
        color: "Merah",
      };
      return encodeURIComponent(btoa(JSON.stringify(data)));
    },
  }),
}));

// ✅ mock fetch
const mockFetch = jest.fn((url: string | URL, options?: any) => {
  const href = url.toString();

  if (href.includes("/api/detail/")) {
    return Promise.resolve({
      ok: true,
      json: async () => ({
        image: "/test.jpg",
        price: 50000,
      }),
    }) as any;
  }

  if (href === "/api/checkout") {
    return Promise.resolve({
      ok: true,
      json: async () => ({ success: true }),
    }) as any;
  }

  return Promise.reject("Unknown API: " + href);
});

global.fetch = mockFetch as unknown as typeof global.fetch;

describe("CheckoutPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render checkout page", () => {
    render(<CheckoutPage />);

    expect(screen.getByText("Ringkasan Pesanan")).toBeInTheDocument();
  });

  it("should fetch product data and display price", async () => {
    render(<CheckoutPage />);

    // ✅ langsung tunggu data muncul (tanpa waitFor)
    // expect(await screen.findByText(/50.000/)).toBeInTheDocument();
    const prices = await screen.findAllByText(/50.000/);
expect(prices.length).toBeGreaterThan(0);
  });

  it("should show error if form is empty", async () => {
    render(<CheckoutPage />);

    const button = screen.getByText("Buat Pesanan");
    await userEvent.click(button);

    expect(
      await screen.findByText("Mohon Lengkapi data anda !!")
    ).toBeInTheDocument();
  });

  it("should submit order successfully (COD)", async () => {
    render(<CheckoutPage />);

    await userEvent.type(screen.getByPlaceholderText("Nama Lengkap"), "Zainul");
    await userEvent.type(screen.getByPlaceholderText("No HP"), "08123");
    await userEvent.type(
      screen.getByPlaceholderText("Alamat Lengkap"),
      "Jl Test"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Kota / Kecamatan"),
      "Bojonegoro"
    );

    const button = screen.getByText("Buat Pesanan");
    await userEvent.click(button);

    // ✅ cek fetch dipanggil TANPA waitFor
    expect(await screen.findByText(/Ringkasan Pesanan/)).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/checkout",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("should show transfer modal when payment is Transfer Bank", async () => {
    render(<CheckoutPage />);

    const transferRadio = screen.getByLabelText("Transfer Bank");
    await userEvent.click(transferRadio);

    await userEvent.type(screen.getByPlaceholderText("Nama Lengkap"), "Zainul");
    await userEvent.type(screen.getByPlaceholderText("No HP"), "08123");
    await userEvent.type(
      screen.getByPlaceholderText("Alamat Lengkap"),
      "Jl Test"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Kota / Kecamatan"),
      "Bojonegoro"
    );

    const button = screen.getByText("Buat Pesanan");
    await userEvent.click(button);

    expect(
      await screen.findByText("Pembayaran Transfer")
    ).toBeInTheDocument();
  });
});