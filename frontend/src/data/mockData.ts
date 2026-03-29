import type { AuthUser, Category, Order, Product } from "../types";

const photo = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/900/700`;

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Audio",
    description: "Headphones, speakers, and all-day listening essentials.",
    image: photo("fluxon-audio-category")
  },
  {
    id: 2,
    name: "Smart Devices",
    description: "Wearables and connected products for modern routines.",
    image: photo("fluxon-smart-devices-category")
  },
  {
    id: 3,
    name: "Accessories",
    description: "Chargers, stands, cables, and practical daily add-ons.",
    image: photo("fluxon-accessories-category")
  },
  {
    id: 4,
    name: "Home Tech",
    description: "Useful tech for comfort, lighting, cleaning, and air quality.",
    image: photo("fluxon-home-tech-category")
  },
  {
    id: 5,
    name: "Personal Care",
    description: "Smart grooming and self-care tools with a premium feel.",
    image: photo("fluxon-personal-care-category")
  }
];

type ProductSeed = Omit<Product, "id" | "categoryId" | "category"> & { categoryName: Category["name"] };

const productSeeds: ProductSeed[] = [
  {
    categoryName: "Audio",
    name: "FluxBuds Air",
    description: "True wireless earbuds with balanced sound and compact charging case.",
    price: 69,
    oldPrice: 89,
    stock: 32,
    badge: "New",
    rating: 4.8,
    reviewCount: 214,
    featured: true,
    newArrival: true,
    image: photo("fluxon-audio-1")
  },
  {
    categoryName: "Audio",
    name: "NovaSound ANC",
    description: "Over-ear headphones with active noise cancellation and 40-hour playback.",
    price: 149,
    oldPrice: 189,
    stock: 18,
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 843,
    featured: true,
    bestSeller: true,
    image: photo("fluxon-audio-2")
  },
  {
    categoryName: "Audio",
    name: "PulseBeat Mini",
    description: "Pocket speaker with rich bass tuning and splash-resistant finish.",
    price: 54,
    stock: 25,
    badge: "Sale",
    rating: 4.7,
    reviewCount: 133,
    image: photo("fluxon-audio-3")
  },
  {
    categoryName: "Audio",
    name: "WaveLoop Pro",
    description: "Neckband earphones designed for calls, commuting, and long battery life.",
    price: 39,
    oldPrice: 49,
    stock: 26,
    rating: 4.6,
    reviewCount: 91,
    image: photo("fluxon-audio-4")
  },
  {
    categoryName: "Audio",
    name: "StudioArc Wired",
    description: "Wired headphones with clean detail and lightweight studio-inspired design.",
    price: 59,
    stock: 21,
    rating: 4.5,
    reviewCount: 74,
    image: photo("fluxon-audio-5")
  },
  {
    categoryName: "Audio",
    name: "GameTone X",
    description: "Gaming headset with soft cushions, boom mic, and immersive stereo sound.",
    price: 79,
    oldPrice: 99,
    stock: 17,
    rating: 4.8,
    reviewCount: 205,
    image: photo("fluxon-audio-6")
  },
  {
    categoryName: "Audio",
    name: "RoomBar Slim",
    description: "Minimal soundbar built for compact desks, bedrooms, and small TVs.",
    price: 119,
    stock: 10,
    badge: "Hot",
    rating: 4.7,
    reviewCount: 168,
    image: photo("fluxon-audio-7")
  },
  {
    categoryName: "Audio",
    name: "EchoDot Pocket",
    description: "Mini speaker with soft-touch finish and quick-connect wireless pairing.",
    price: 35,
    stock: 40,
    newArrival: true,
    rating: 4.5,
    reviewCount: 52,
    image: photo("fluxon-audio-8")
  },
  {
    categoryName: "Audio",
    name: "QuietPods Max",
    description: "Premium earbuds with deep ANC, transparency mode, and fast USB-C charging.",
    price: 109,
    oldPrice: 129,
    stock: 15,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 479,
    image: photo("fluxon-audio-9")
  },
  {
    categoryName: "Audio",
    name: "Reference One",
    description: "Closed-back headphones for focused work, editing, and crisp detail.",
    price: 129,
    stock: 8,
    rating: 4.8,
    reviewCount: 118,
    image: photo("fluxon-audio-10")
  },
  {
    categoryName: "Smart Devices",
    name: "Flux Watch S1",
    description: "Smartwatch with AMOLED display, call support, and daily health tracking.",
    price: 139,
    oldPrice: 169,
    stock: 22,
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 692,
    featured: true,
    bestSeller: true,
    image: photo("fluxon-smart-1")
  },
  {
    categoryName: "Smart Devices",
    name: "PulseBand Fit",
    description: "Slim fitness band with sleep tracking, step count, and workout reminders.",
    price: 49,
    stock: 38,
    rating: 4.6,
    reviewCount: 175,
    image: photo("fluxon-smart-2")
  },
  {
    categoryName: "Smart Devices",
    name: "Halo Ring Lite",
    description: "Smart ring concept for sleep tracking and low-profile daily wear.",
    price: 99,
    oldPrice: 119,
    stock: 11,
    newArrival: true,
    rating: 4.5,
    reviewCount: 42,
    image: photo("fluxon-smart-3")
  },
  {
    categoryName: "Smart Devices",
    name: "DeskHub Go",
    description: "Compact smart desk hub with clock, USB ports, and workspace shortcuts.",
    price: 89,
    stock: 14,
    rating: 4.4,
    reviewCount: 36,
    image: photo("fluxon-smart-4")
  },
  {
    categoryName: "Smart Devices",
    name: "WakeCube",
    description: "Smart alarm clock with ambient light and gentle morning routines.",
    price: 59,
    stock: 29,
    rating: 4.6,
    reviewCount: 103,
    image: photo("fluxon-smart-5")
  },
  {
    categoryName: "Smart Devices",
    name: "TrackTag Duo",
    description: "Bluetooth tracker set for keys, backpacks, and travel essentials.",
    price: 29,
    oldPrice: 39,
    stock: 47,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 318,
    image: photo("fluxon-smart-6")
  },
  {
    categoryName: "Smart Devices",
    name: "Vista Mini",
    description: "Portable smart display with clean interface for weather, timers, and media.",
    price: 119,
    stock: 9,
    rating: 4.5,
    reviewCount: 65,
    image: photo("fluxon-smart-7")
  },
  {
    categoryName: "Smart Devices",
    name: "HealthSync Band",
    description: "Daily wellness band focused on recovery insights and heart tracking.",
    price: 65,
    stock: 19,
    rating: 4.6,
    reviewCount: 98,
    image: photo("fluxon-smart-8")
  },
  {
    categoryName: "Smart Devices",
    name: "Balance Scale Pro",
    description: "Smart body scale with composition trends and companion-app readiness.",
    price: 79,
    stock: 13,
    badge: "Popular",
    rating: 4.7,
    reviewCount: 151,
    image: photo("fluxon-smart-9")
  },
  {
    categoryName: "Smart Devices",
    name: "Beam Pocket",
    description: "Mini projector made for flexible movie nights and portable presentations.",
    price: 199,
    oldPrice: 239,
    stock: 7,
    newArrival: true,
    rating: 4.7,
    reviewCount: 87,
    featured: true,
    image: photo("fluxon-smart-10")
  },
  {
    categoryName: "Accessories",
    name: "VoltCharge 35",
    description: "Fast wall charger with compact form and dual-device charging.",
    price: 29,
    stock: 56,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 521,
    image: photo("fluxon-accessory-1")
  },
  {
    categoryName: "Accessories",
    name: "MagBank 10K",
    description: "Magnetic power bank sized for travel days and fast top-ups.",
    price: 69,
    oldPrice: 89,
    stock: 31,
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 405,
    featured: true,
    bestSeller: true,
    image: photo("fluxon-accessory-2")
  },
  {
    categoryName: "Accessories",
    name: "Braided Link C",
    description: "Durable braided USB-C cable designed for desks, bags, and charging stations.",
    price: 15,
    stock: 82,
    rating: 4.7,
    reviewCount: 210,
    image: photo("fluxon-accessory-3")
  },
  {
    categoryName: "Accessories",
    name: "AirDock Pad",
    description: "Minimal wireless charging pad with soft LED ring and anti-slip base.",
    price: 34,
    stock: 28,
    rating: 4.5,
    reviewCount: 88,
    image: photo("fluxon-accessory-4")
  },
  {
    categoryName: "Accessories",
    name: "Rise Laptop Stand",
    description: "Foldable aluminum stand for cleaner posture and cooler laptop airflow.",
    price: 42,
    stock: 23,
    rating: 4.8,
    reviewCount: 144,
    image: photo("fluxon-accessory-5")
  },
  {
    categoryName: "Accessories",
    name: "FlexGrip Holder",
    description: "Adjustable phone holder for desks, kitchens, and bedside use.",
    price: 19,
    stock: 37,
    rating: 4.4,
    reviewCount: 61,
    image: photo("fluxon-accessory-6")
  },
  {
    categoryName: "Accessories",
    name: "TravelPlug World",
    description: "Travel adapter with clean design and multi-region compatibility.",
    price: 39,
    oldPrice: 49,
    stock: 16,
    newArrival: true,
    rating: 4.6,
    reviewCount: 57,
    image: photo("fluxon-accessory-7")
  },
  {
    categoryName: "Accessories",
    name: "KeySleeve Pro",
    description: "Protective keyboard sleeve with felt lining and slim profile.",
    price: 24,
    stock: 26,
    rating: 4.5,
    reviewCount: 41,
    image: photo("fluxon-accessory-8")
  },
  {
    categoryName: "Accessories",
    name: "PortHub 6",
    description: "Six-port USB hub for workstations that need flexible connectivity.",
    price: 49,
    stock: 21,
    badge: "Hot",
    rating: 4.7,
    reviewCount: 129,
    image: photo("fluxon-accessory-9")
  },
  {
    categoryName: "Accessories",
    name: "Shield Case Clear",
    description: "Transparent protective phone case with reinforced corners.",
    price: 18,
    stock: 44,
    newArrival: true,
    rating: 4.3,
    reviewCount: 39,
    image: photo("fluxon-accessory-10")
  },
  {
    categoryName: "Home Tech",
    name: "PureFlow Air",
    description: "Compact air purifier for bedrooms, workspaces, and quiet evenings.",
    price: 189,
    oldPrice: 229,
    stock: 12,
    featured: true,
    badge: "Best Seller",
    bestSeller: true,
    rating: 4.9,
    reviewCount: 366,
    image: photo("fluxon-home-1")
  },
  {
    categoryName: "Home Tech",
    name: "Luma Desk Beam",
    description: "LED desk lamp with adjustable warmth and a clean architectural silhouette.",
    price: 64,
    stock: 34,
    rating: 4.8,
    reviewCount: 202,
    image: photo("fluxon-home-2")
  },
  {
    categoryName: "Home Tech",
    name: "SweepBot Mini",
    description: "Robot vacuum built for daily dust pickup in compact living spaces.",
    price: 249,
    oldPrice: 299,
    stock: 8,
    rating: 4.7,
    reviewCount: 157,
    image: photo("fluxon-home-3")
  },
  {
    categoryName: "Home Tech",
    name: "MistCore",
    description: "Quiet humidifier with soft light and modern bedside presence.",
    price: 55,
    stock: 20,
    newArrival: true,
    rating: 4.6,
    reviewCount: 84,
    image: photo("fluxon-home-4")
  },
  {
    categoryName: "Home Tech",
    name: "Aroma Glow",
    description: "Aroma diffuser combining gentle vapor flow with ambient mood lighting.",
    price: 39,
    stock: 24,
    rating: 4.5,
    reviewCount: 72,
    image: photo("fluxon-home-5")
  },
  {
    categoryName: "Home Tech",
    name: "CoolFold Fan",
    description: "Portable fan with foldable body and desk-friendly footprint.",
    price: 45,
    stock: 30,
    rating: 4.6,
    reviewCount: 93,
    image: photo("fluxon-home-6")
  },
  {
    categoryName: "Home Tech",
    name: "GlowBulb Kit",
    description: "Smart bulb starter kit for mood shifts, desk scenes, and warm evenings.",
    price: 79,
    stock: 18,
    badge: "Popular",
    rating: 4.7,
    reviewCount: 147,
    image: photo("fluxon-home-7")
  },
  {
    categoryName: "Home Tech",
    name: "WarmSpace Mini",
    description: "Compact heater designed for focused work corners and cool mornings.",
    price: 99,
    oldPrice: 119,
    stock: 11,
    rating: 4.4,
    reviewCount: 48,
    image: photo("fluxon-home-8")
  },
  {
    categoryName: "Home Tech",
    name: "ClearTap Filter",
    description: "Countertop water filter unit with simple control and clean lines.",
    price: 129,
    stock: 9,
    rating: 4.6,
    reviewCount: 67,
    image: photo("fluxon-home-9")
  },
  {
    categoryName: "Home Tech",
    name: "DustGo Handheld",
    description: "Handheld mini vacuum for shelves, keyboards, and quick spot cleaning.",
    price: 59,
    stock: 27,
    newArrival: true,
    featured: true,
    rating: 4.7,
    reviewCount: 112,
    image: photo("fluxon-home-10")
  },
  {
    categoryName: "Personal Care",
    name: "TrimEdge Pro",
    description: "Cordless beard trimmer with precise guide combs and sharp stainless blades.",
    price: 69,
    oldPrice: 89,
    stock: 22,
    badge: "Best Seller",
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 553,
    image: photo("fluxon-care-1")
  },
  {
    categoryName: "Personal Care",
    name: "SilkDry Air",
    description: "Hair dryer with sleek build, fast airflow, and low-frizz styling mode.",
    price: 99,
    stock: 19,
    rating: 4.8,
    reviewCount: 188,
    image: photo("fluxon-care-2")
  },
  {
    categoryName: "Personal Care",
    name: "PureFace Brush",
    description: "Facial cleansing brush for a softer skincare routine and clean countertop look.",
    price: 34,
    stock: 31,
    rating: 4.5,
    reviewCount: 77,
    image: photo("fluxon-care-3")
  },
  {
    categoryName: "Personal Care",
    name: "BodyLine Groomer",
    description: "Water-resistant body groomer built for comfortable weekly upkeep.",
    price: 49,
    stock: 25,
    rating: 4.6,
    reviewCount: 90,
    image: photo("fluxon-care-4")
  },
  {
    categoryName: "Personal Care",
    name: "ReliefPulse Mini",
    description: "Compact massage gun for post-workout recovery and daily neck tension relief.",
    price: 119,
    oldPrice: 149,
    stock: 13,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 209,
    image: photo("fluxon-care-5")
  },
  {
    categoryName: "Personal Care",
    name: "SmoothTouch Epilator",
    description: "Epilator with travel cap, dual speeds, and ergonomic body shape.",
    price: 79,
    stock: 17,
    newArrival: true,
    rating: 4.5,
    reviewCount: 58,
    image: photo("fluxon-care-6")
  },
  {
    categoryName: "Personal Care",
    name: "BeardCare Kit",
    description: "Premium beard kit with trimmer tools and simple daily maintenance feel.",
    price: 59,
    stock: 28,
    rating: 4.7,
    reviewCount: 101,
    image: photo("fluxon-care-7")
  },
  {
    categoryName: "Personal Care",
    name: "SleekIron One",
    description: "Hair straightener with smooth plates and salon-inspired matte finish.",
    price: 69,
    stock: 15,
    rating: 4.6,
    reviewCount: 69,
    image: photo("fluxon-care-8")
  },
  {
    categoryName: "Personal Care",
    name: "SonicBrush Daily",
    description: "Sonic toothbrush with travel case and two brushing intensity modes.",
    price: 45,
    stock: 33,
    badge: "Popular",
    rating: 4.7,
    reviewCount: 142,
    image: photo("fluxon-care-9")
  },
  {
    categoryName: "Personal Care",
    name: "NailStudio Go",
    description: "Portable manicure device built for neat, at-home finishing touches.",
    price: 29,
    stock: 30,
    newArrival: true,
    featured: true,
    rating: 4.4,
    reviewCount: 33,
    image: photo("fluxon-care-10")
  }
];

export const mockProducts: Product[] = productSeeds.map((seed, index) => {
  const category = mockCategories.find((item) => item.name === seed.categoryName)!;

  return {
    id: index + 1,
    categoryId: category.id,
    category,
    ...seed
  };
});

export const mockDemoUser: AuthUser = {
  name: "Demo Customer",
  email: "demo@fluxon.shop",
  token: "mock-jwt-token"
};

export const mockOrders: Order[] = [
  {
    id: "FX-2026-1001",
    createdAt: "2026-03-16T10:30:00.000Z",
    status: "Confirmed",
    total: 248.9,
    items: [
      {
        productId: 2,
        productName: "NovaSound ANC",
        quantity: 1,
        unitPrice: 149
      },
      {
        productId: 21,
        productName: "MagBank 10K",
        quantity: 1,
        unitPrice: 69
      },
      {
        productId: 43,
        productName: "ReliefPulse Mini",
        quantity: 1,
        unitPrice: 119
      }
    ],
    payment: {
      method: "PayPal",
      amount: 337,
      status: "Paid"
    },
    customerEmail: "demo@fluxon.shop",
    shippingAddress: "18 Vision Street, Berlin"
  }
];
