import Hero from "./components/hero/page";
import Categories from "./components/categories/page";
import Products from "./components/product/page";
import WhyUs from "./components/whyUs/page";


export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Products />
      <WhyUs />
    </div>
  );
}
