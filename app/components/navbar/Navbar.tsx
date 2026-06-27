"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";



const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const pathname = usePathname();


  return (
    <nav className="w-full bg-green-200 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex justify-center items-center text-green-600">
            <ShoppingCart size={30}  />
            <h1 className="text-2xl font-bold pl-2  ">
            TokoCat.id
            </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={"text-green-500 hover:text-green-600" + (pathname === "/" ? " font-bold" : "")}>
            Beranda
          </Link>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdown(true)}
            onMouseLeave={() => setIsDropdown(false)}
          >
            {/* <Link  > */}
            <Link  href="/product" className={"hover:text-green-600 text-green-500" + (pathname === "/product" ? " font-bold" : "")}>
              Produk
            </Link>
          </div>

          <Link href="/about" className={"hover:text-green-600 text-green-500" + (pathname === "/about" ? " font-bold" : "")}>
            Tentang
          </Link>

          <Link href="/contact" className={"hover:text-green-600 text-green-500" + (pathname === "/contact" ? " font-bold" : "")}>
            Kontak
          </Link>

          {/* CTA */}
          {/* <Link href="/page/checkout">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Beli Sekarang
          </button>
          </Link> */}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-100 text-green-600 shadow-md px-4 py-4 space-y-3">
          <Link href="/" className="block">
            Beranda
          </Link>

          <div>
            <p className="font-semibold">Produk</p>
            <div className="ml-4 mt-2 space-y-1">
              <Link href="/produk/cat-tembok" className="block">
                Cat Tembok
              </Link>
              <Link href="/produk/cat-kayu" className="block">
                Cat Kayu
              </Link>
              <Link href="/produk/cat-besi" className="block">
                Cat Besi
              </Link>
            </div>
          </div>

          <Link href="/tentang" className="block">
            Tentang
          </Link>

          <Link href="/kontak" className="block">
            Kontak
          </Link>

          {/* <button className="w-full bg-green-600 text-white py-2 rounded-lg">
            Beli Sekarang
          </button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;