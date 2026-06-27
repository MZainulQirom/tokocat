export default function WhyUs() {
  const data = [
    "Produk Original",
    "Harga Terjangkau",
    "Pengiriman Cepat",
    "Konsultasi Gratis",
  ];

  return (
    <section className="py-16 text-gray-500 bg-white">
      <h2 className="text-center text-3xl font-bold mb-10">
        Kenapa Pilih Kami?
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 px-4">
        {data.map((item, i) => (
          <div key={i} className="text-center">
            <div className="text-green-600 text-3xl">✔</div>
            <p className="mt-2">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}