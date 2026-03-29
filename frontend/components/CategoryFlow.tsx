'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "Homemade",
    subtitle: "Authentic & Traditional",
    description: "Our homemade range brings ancestral recipes directly to your kitchen. We handpick the freshest ingredients and sun-dry them to perfection before stone-grinding.",
    accentColor: "#D97706", // Amber
    secondaryColor: "#78350F",
    images: [
      "/assets/images/homemade_turmeric.png",
      "/assets/images/green_powder.png"
    ],
    details: ["Stone Ground", "Sun Dried", "No Preservatives"],
    featuredProducts: [
      {
        id: 101,
        name: "Pure Haldi Powder",
        price: "145",
        rating: 4.9,
        image: "/assets/images/homemade_turmeric.png",
        slug: "pure-haldi-powder"
      },
      {
        id: 102,
        name: "Coriander Mix",
        price: "120",
        rating: 4.8,
        image: "/assets/images/green_powder.png",
        slug: "coriander-mix"
      }
    ]
  },
  {
    id: 2,
    title: "Jain Masala",
    subtitle: "Roots-Free, Pure Flavor",
    description: "Strictly conforming to Jain dietary principles. Experience rich, uncompromising flavors crafted entirely without root vegetables under optimal purity conditions.",
    accentColor: "#059669", // Emerald
    secondaryColor: "#064E3B",
    images: [
      "/assets/images/red_chilies.png",
      "/assets/images/red_closeup.png"
    ],
    details: ["Satvik Approved", "Zero Root Veg", "Steam Sterilized"],
    featuredProducts: [
      {
        id: 201,
        name: "Jain Chili Masala",
        price: "180",
        rating: 5.0,
        image: "/assets/images/red_chilies.png",
        slug: "jain-chili-masala"
      },
      {
        id: 202,
        name: "Pure Red Powder",
        price: "165",
        rating: 4.9,
        image: "/assets/images/red_closeup.png",
        slug: "pure-red-powder"
      }
    ]
  },
  {
    id: 3,
    title: "HD Original",
    subtitle: "The Brand's Signature",
    description: "Premium, export-quality spices sourced from the finest select farms across India. Ground at optimal temperatures to lock in volatile oils. The heartbeat of our brand.",
    accentColor: "#A61717", // Brand Red
    secondaryColor: "#450A0A",
    images: [
      "/assets/images/signature_mix.png",
      "/assets/images/black_peppercorns.png"
    ],
    details: ["Export Grade", "High Oil Content", "Farm Direct"],
    featuredProducts: [
      {
        id: 301,
        name: "Signature Blend",
        price: "450",
        rating: 5.0,
        image: "/assets/images/signature_mix.png",
        slug: "signature-blend"
      },
      {
        id: 302,
        name: "Black Pepper Gold",
        price: "320",
        rating: 4.9,
        image: "/assets/images/black_peppercorns.png",
        slug: "black-pepper-gold"
      }
    ]
  }
];

const ProductMiniCard = ({ product, color }: { product: any, color: string }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative flex flex-col items-start gap-3 p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 group overflow-hidden w-44 shadow-[0_10px_20px_rgba(0,0,0,0.05)] shadow-inner"
  >
    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-1">
      <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
        <Star size={10} className="fill-yellow-500 text-yellow-500" />
        <span className="text-[10px] font-black">{product.rating}</span>
      </div>
    </div>
    <div className="w-full">
      <h5 className="text-xs font-black text-stone-900 group-hover:text-red-950 transition-colors uppercase tracking-wider truncate mb-1">{product.name}</h5>
      <div className="flex items-center justify-between mt-1">
        <span className="text-sm font-black text-stone-950">₹{product.price}</span>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 rounded-full transition-all duration-300"
          style={{ backgroundColor: color + '20' }}
        >
          <ShoppingCart size={14} style={{ color: color }} />
        </motion.button>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent pointer-events-none" />
  </motion.div>
);

const FloatingParticels = ({ color }: { color: string }) => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-40">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", rotate: Math.random() * 360, scale: Math.random() * 0.5 + 0.5 }}
        animate={{ y: [null, "-20%", "120%"], rotate: [null, 180, 360] }}
        transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear", delay: -Math.random() * 20 }}
        className="absolute w-2 h-2 rounded-full blur-[1px]"
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

const SectionBackground = ({ color, index }: { color: string, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 45 : -45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <motion.div style={{ rotate, scale }} className="relative w-[120vw] h-[120vw] opacity-[0.03]">
        <div className="absolute inset-0 border-[40px] md:border-[80px] rounded-[30% 70% 70% 30% / 30% 30% 70% 70%]" style={{ borderColor: color }} />
        <div className="absolute inset-[10%] border-[2px] rounded-full opacity-50" style={{ borderColor: color }} />
      </motion.div>
    </div>
  );
};

const LayoutSection = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const containerRef = useRef(null);
  const isEven = index % 2 === 0;
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const yImg1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yImg2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] w-full flex flex-col justify-center py-32 overflow-hidden bg-stone-50 border-b border-stone-200">
      <SectionBackground color={category.accentColor} index={index} />
      <FloatingParticels color={category.accentColor} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
          
          {/* Visual Showcase */}
          <div className="w-full lg:w-3/5 relative h-[500px] md:h-[700px]">
            <motion.div style={{ y: yImg1 }} className="absolute top-0 left-0 w-[70%] h-[75%] rounded-[4rem] overflow-hidden shadow-2xl z-20 border-8 border-white">
              <Image src={category.images[0]} alt={category.title} fill className="object-cover scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
            </motion.div>
            <motion.div style={{ y: yImg2 }} className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-full overflow-hidden shadow-xl z-30 border-8 border-white">
              <Image src={category.images[1]} alt={category.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full" />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full opacity-10 blur-3xl -z-10" style={{ backgroundColor: category.accentColor }} />
          </div>

          {/* Text Content */}
          <motion.div style={{ opacity: textOpacity }} className={`w-full lg:w-2/5 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
            <div className="space-y-12">
              <div className="space-y-4">
                <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="inline-block text-xs font-black tracking-[0.4em] uppercase" style={{ color: category.accentColor }}>Category Flow 0{category.id}</motion.span>
                <h2 className="text-7xl md:text-8xl font-serif font-black leading-[0.8] tracking-tighter text-stone-950 uppercase">{category.title}</h2>
              </div>

              <div className="h-px w-20 bg-stone-200" />

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-serif italic text-stone-700 leading-tight">{category.subtitle}</h4>
                  <p className="text-lg text-stone-600 font-medium leading-relaxed max-w-md">{category.description}</p>
                </div>

                {/* FEATURED PRODUCTS INTEGRATION */}
                <div className={`space-y-6 flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Curated Favorites</span>
                   <div className="flex gap-4">
                      {category.featuredProducts.map(p => (
                        <ProductMiniCard key={p.id} product={p} color={category.accentColor} />
                      ))}
                   </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {category.details.map((detail, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full border border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-white/50">{detail}</span>
                ))}
              </div>

              <div className="pt-8">
                <Link href={`/products?category=${category.title.toLowerCase()}`}>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group flex items-center gap-4 text-stone-950 font-black uppercase text-sm tracking-widest overflow-hidden">
                    <span className="relative">Explore Full Range <span className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-950 origin-right transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left" /></span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: category.accentColor + '20' }}><ArrowRight size={18} style={{ color: category.accentColor }} /></div>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vertical Indicator */}
      <div className={`absolute top-0 ${isEven ? 'left-8' : 'right-8'} h-full flex flex-col justify-center gap-20 pointer-events-none opacity-20 hidden xl:flex`}>
         {[...Array(5)].map((_, i) => <div key={i} className="w-0.5 h-12 bg-stone-400 rounded-full" />)}
      </div>
    </section>
  );
};

export default function CategoryFlow() {
  return (
    <div className="w-full flex flex-col font-sans">
      {categories.map((category, idx) => (
        <LayoutSection key={category.id} category={category} index={idx} />
      ))}
    </div>
  );
}
