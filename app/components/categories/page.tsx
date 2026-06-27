export default function Categories() {
  const data = [
    { name: "Cat Tembok", icon: "🎨" },
    { name: "Cat Kayu", icon: "🪵" },
    { name: "Cat Besi", icon: "⚙️" },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-center text-green-600 md:text-5xl text-2xl font-bold mb-10">
        Kategori Produk
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="p-6 border rounded-xl bg-green-100 hover:bg-green-200 text-center hover:shadow-lg transition"
          >
            <div className="text-7xl">{item.icon}</div>
            <h3 className="mt-4  text-green-500 hover:text-green-700 font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}