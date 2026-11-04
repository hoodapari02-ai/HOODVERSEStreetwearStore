import { FormEvent, useEffect, useMemo, useState } from "react"

type Product = {
  id: number
  name: string
  category: string
  categoryLabel: string
  price: number
  image: string
  alternateImage: string
  colors: string[]
  description: string
  badge?: string
  trending?: boolean
}

type CartItem = Product & { size: string quantity: number }

const photos = {
  orange:
    "https://images.unsplash.com/photo-1579269896398-4deb6cbdc320?auto=format&fit=crop&w=1400&q=85",
  woman:
    "https://images.unsplash.com/photo-1578470507807-3fc541d5f544?auto=format&fit=crop&w=1400&q=85",
  white:
    "https://images.unsplash.com/photo-1772311994065-697282b59fad?auto=format&fit=crop&w=1400&q=85",
  mask: "https://images.unsplash.com/photo-1595196925129-5fe5e5f4362b?auto=format&fit=crop&w=1400&q=85",
  studio:
    "https://images.unsplash.com/photo-1675527212537-3840fd89e9f2?auto=format&fit=crop&w=1400&q=85",
  rail: "https://images.unsplash.com/photo-1579774830533-ac44a4193894?auto=format&fit=crop&w=1400&q=85",
  street:
    "https://images.unsplash.com/photo-1763194180497-11b2253fea28?auto=format&fit=crop&w=1400&q=85",
  blue: "https://images.unsplash.com/photo-1777499252952-83fbad1e937a?auto=format&fit=crop&w=1400&q=85",
  glasses:
    "https://images.unsplash.com/photo-1599792594005-bcf3d30ab42b?auto=format&fit=crop&w=1400&q=85",
  chair:
    "https://images.unsplash.com/photo-1612189427126-c54b8720a955?auto=format&fit=crop&w=1400&q=85",
  garage:
    "https://images.unsplash.com/photo-1675526260065-349d165ab084?auto=format&fit=crop&w=1400&q=85",
}

const products: Product[] = [
  {
    id: 1,
    name: "Antariksh Oversized Hoodie",
    category: "desi",
    categoryLabel: "Desi Street",
    price: 2299,
    image: photos.mask,
    alternateImage: photos.street,
    colors: ["#151515", "#3d4b40", "#e6dfd2"],
    description:
      "Heavyweight 420 GSM cotton with an oversized drop shoulder and embroidered “Antariksh” chest detail.",
    badge: "New arrival",
    trending: true,
  },
  {
    id: 2,
    name: "No Signal Graphic Hoodie",
    category: "graphic",
    categoryLabel: "Graphic Fever",
    price: 1999,
    image: photos.woman,
    alternateImage: photos.blue,
    colors: ["#111111", "#6b6b66", "#796657"],
    description:
      "Washed cotton fleece, screen-printed back artwork and a lived-in finish made for late-night scenes.",
    badge: "Bestseller",
    trending: true,
  },
  {
    id: 3,
    name: "Core Heavyweight Hoodie",
    category: "minimal",
    categoryLabel: "Minimal",
    price: 1799,
    image: photos.studio,
    alternateImage: photos.glasses,
    colors: ["#111111", "#ded7c7", "#353941", "#192236"],
    description:
      "A clean everyday essential in dense brushed fleece with tonal embroidery and premium ribbing.",
    trending: true,
  },
  {
    id: 4,
    name: "Awaara Club Hoodie",
    category: "college",
    categoryLabel: "College Edition",
    price: 1899,
    image: photos.orange,
    alternateImage: photos.rail,
    colors: ["#db5b24", "#202020", "#d8cfbd"],
    description:
      "Varsity energy meets Indian street culture with collegiate artwork and a roomy, relaxed silhouette.",
    badge: "Campus pick",
  },
  {
    id: 5,
    name: "Universe 01 Hoodie",
    category: "unisex",
    categoryLabel: "Unisex",
    price: 2499,
    image: photos.glasses,
    alternateImage: photos.mask,
    colors: ["#101010", "#d9d6cc"],
    description:
      "Our signature unisex shape, cut wide and finished with raised silicone branding and metal-tipped cords.",
    badge: "Limited",
    trending: true,
  },
  {
    id: 6,
    name: "Dilli After Dark",
    category: "desi",
    categoryLabel: "Desi Street",
    price: 2199,
    image: photos.garage,
    alternateImage: photos.street,
    colors: ["#151515", "#404643", "#552f2f"],
    description:
      "Reflective Hindi typography, substantial fleece and a sharp urban palette inspired by winter nights.",
    badge: "New arrival",
  },
  {
    id: 7,
    name: "Blank Canvas Hoodie",
    category: "minimal",
    categoryLabel: "Minimal",
    price: 1499,
    image: photos.white,
    alternateImage: photos.chair,
    colors: ["#e9e4d9", "#b5ad9f", "#242424", "#677080"],
    description:
      "Minimal outside, considered inside. Soft brushed cotton and a perfectly weighted drape.",
  },
  {
    id: 8,
    name: "After Hours Hoodie",
    category: "graphic",
    categoryLabel: "Graphic Fever",
    price: 2099,
    image: photos.blue,
    alternateImage: photos.woman,
    colors: ["#18243a", "#171717", "#76726d"],
    description:
      "Electric blue graphic accents and high-density print on a deep navy oversized base.",
    badge: "Trending",
  },
  {
    id: 9,
    name: "Backbench Society",
    category: "college",
    categoryLabel: "College Edition",
    price: 1599,
    image: photos.rail,
    alternateImage: photos.orange,
    colors: ["#1a1a1a", "#4f4139", "#d1c5b1"],
    description:
      "Easy-going campus essential with hand-drawn back graphics and an ultra-relaxed unisex cut.",
  },
  {
    id: 10,
    name: "Everywhere Essential",
    category: "unisex",
    categoryLabel: "Unisex",
    price: 1299,
    image: photos.chair,
    alternateImage: photos.white,
    colors: ["#171717", "#e4dfd5", "#76746e"],
    description:
      "A breathable midweight hoodie built for every body, every plan and every season.",
  },
]

const collections = [
  {
    id: "unisex",
    number: "01",
    name: "Unisex",
    detail: "Made for every body",
    image: photos.glasses,
  },
  {
    id: "graphic",
    number: "02",
    name: "Graphic Fever",
    detail: "Art you can wear",
    image: photos.woman,
  },
  {
    id: "desi",
    number: "03",
    name: "Desi Street",
    detail: "An Indian perspective",
    image: photos.garage,
  },
  {
    id: "minimal",
    number: "04",
    name: "Minimal",
    detail: "Quietly confident",
    image: photos.white,
  },
  {
    id: "college",
    number: "05",
    name: "College Edition",
    detail: "Collegiate, refined",
    image: photos.orange,
  },
]

const categories = [
  ["all", "All hoodies"],
  ["unisex", "Unisex"],
  ["graphic", "Graphic Fever"],
  ["desi", "Desi Street"],
  ["minimal", "Minimal"],
  ["college", "College Edition"],
]

const Icon = ({
  name,
  className = "size-5",
}: {
  name: string
  className?: string
}) => {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l-1 13H6L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z" />
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    star: (
      <path d="m12 2 3 6.1 6.7 1-4.8 4.7 1.1 6.7-6-3.2-6 3.2 1.1-6.7-4.8-4.7 6.7-1L12 2Z" />
    ),
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`

function App() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showWishOnly, setShowWishOnly] = useState(false)
  const [search, setSearch] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("hoodverse-wishlist") || "[]")
    } catch {
      return []
    }
  })
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("hoodverse-cart") || "[]")
    } catch {
      return []
    }
  })
  const [notice, setNotice] = useState("")
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(
    () => localStorage.setItem("hoodverse-cart", JSON.stringify(cart)),
    [cart],
  )
  useEffect(
    () => localStorage.setItem("hoodverse-wishlist", JSON.stringify(wishlist)),
    [wishlist],
  )
  useEffect(() => {
    document.body.style.overflow =
      cartOpen || quickView || menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [cartOpen, quickView, menuOpen])

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter(
      (product) =>
        (activeCategory === "all" || product.category === activeCategory) &&
        (!showWishOnly || wishlist.includes(product.id)) &&
        (!term ||
          product.name.toLowerCase().includes(term) ||
          product.categoryLabel.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)),
    )
  }, [activeCategory, search, showWishOnly, wishlist])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const flash = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 2600)
  }

  const addToCart = (product: Product, size = "M") => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id && item.size === size,
      )
      return existing
        ? current.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...current, { ...product, size, quantity: 1 }]
    })
    flash(`${product.name} added to your bag`)
  }

  const updateQuantity = (id: number, size: string, amount: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const chooseCategory = (id: string) => {
    setActiveCategory(id)
    setShowWishOnly(false)
    setVisibleCount(8)
    setMenuOpen(false)
    window.setTimeout(
      () =>
        document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" }),
      50,
    )
  }

  const handleSimpleForm = (
    event: FormEvent<HTMLFormElement>,
    message: string,
  ) => {
    event.preventDefault()
    event.currentTarget.reset()
    flash(message)
  }

  return (
    <div className="min-h-screen bg-[#f3f1e9] text-[#111]">
      {notice && (
        <div className="fixed left-1/2 top-24 z-[80] -translate-x-1/2 bg-[#c6a15b] px-5 py-3 text-center text-xs font-black uppercase tracking-[.15em] shadow-2xl">
          {notice}
        </div>
      )}

      <div className="bg-[#111] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[.25em] text-[#d4b77d] sm:text-xs">
        Complimentary delivery across India on orders above ₹1,999
      </div>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f3f1e9]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10">
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" className="size-6" />
          </button>
          <a
            href="#home"
            className="logo text-2xl font-black tracking-[-.08em] sm:text-3xl"
            aria-label="Hoodverse home"
          >
            HOOD<span className="text-[#a98545]">V</span>ERSE
          </a>
          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[.12em] lg:flex">
            <a className="nav-link" href="#home">
              Home
            </a>
            <a className="nav-link" href="#shop">
              Shop
            </a>
            <a className="nav-link" href="#collections">
              Collections
            </a>
            <a className="nav-link" href="#about">
              About us
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Icon name="search" className="size-5" />
            </button>
            <button
              className="relative hidden sm:block"
              onClick={() => {
                setActiveCategory("all")
                setShowWishOnly(true)
                setVisibleCount(8)
                document
                  .querySelector("#shop")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              aria-label={`Wishlist with ${wishlist.length} items`}
            >
              <Icon name="heart" className="size-5" />
              {wishlist.length > 0 && (
                <span className="icon-count">{wishlist.length}</span>
              )}
            </button>
            <button
              className="relative"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <Icon name="bag" className="size-5" />
              {cartCount > 0 && <span className="icon-count">{cartCount}</span>}
            </button>
          </div>
        </div>
        {searchOpen && (
          <form
            className="mx-auto flex max-w-[1500px] items-center gap-3 border-t border-black/10 px-5 py-4 lg:px-10"
            onSubmit={(e) => {
              e.preventDefault()
              chooseCategory("all")
            }}
          >
            <Icon name="search" className="size-5 text-black/50" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hoodies, collections and fits..."
              className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-black/35"
            />
            {search && (
              <button
                type="button"
                className="text-xs font-bold uppercase"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </form>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-[#111] p-6 text-[#f3f1e9] lg:hidden">
          <div className="flex items-center justify-between">
            <div className="logo text-2xl font-black tracking-[-.08em]">
              HOOD<span className="text-[#c6a15b]">V</span>ERSE
            </div>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <Icon name="close" className="size-7" />
            </button>
          </div>
          <nav className="mt-20 flex flex-col gap-4 text-5xl font-black uppercase leading-none tracking-[-.05em]">
            {["Home", "Shop", "Collections", "About", "Contact"].map(
              (item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mr-4 align-top text-xs font-bold text-[#c6a15b]">
                    0{i + 1}
                  </span>
                  {item}
                </a>
              ),
            )}
          </nav>
          <p className="absolute bottom-8 text-xs uppercase tracking-[.2em] text-white/50">
            Wear your universe. / Est. India 2026
          </p>
        </div>
      )}

      <main>
        <section
          id="home"
          className="relative min-h-[82vh] overflow-hidden bg-[#111] text-white"
        >
          <img
            src={photos.mask}
            alt="Model wearing a black oversized hoodie"
            className="absolute inset-0 h-full w-full object-cover object-[center_28%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="relative mx-auto flex min-h-[82vh] max-w-[1500px] items-end px-5 pb-14 lg:px-10 lg:pb-20">
            <div className="max-w-5xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.32em] text-[#d4b77d]">
                <span className="h-px w-10 bg-[#c6a15b]" /> The inaugural
                collection / 2026
              </p>
              <h1 className="display-title max-w-5xl text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-[.78] tracking-[-.075em]">
                Your world.
                <br />
                <span className="outline-text">Your hoodie.</span>
              </h1>
              <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <p className="max-w-sm text-lg font-medium text-white/75 sm:text-xl">
                  Sculpted fits. Quiet confidence. No compromise.
                  <br />
                  Crafted in India, considered for everywhere.
                </p>
                <a href="#shop" className="cta-button bg-[#c6a15b] text-black">
                  Discover the collection <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>
          <div className="absolute right-5 top-8 hidden border border-white/30 px-4 py-3 text-[10px] font-bold uppercase tracking-[.2em] md:block lg:right-10">
            420 GSM / Premium cotton
            <br />
            Oversized / Genderless
          </div>
        </section>

        <div className="marquee overflow-hidden border-y border-[#9d7c42] bg-[#c6a15b] py-3">
          <div className="marquee-track flex w-max items-center gap-8 text-sm font-black uppercase tracking-[.16em]">
            {[...Array(2)]
              .flatMap(() => [
                "Oversized by design",
                "Crafted in India",
                "Numbered editions",
                "Wear your universe",
              ])
              .map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex items-center gap-8"
                >
                  {item}
                  <span className="text-xl">✦</span>
                </span>
              ))}
          </div>
        </div>

        <section
          id="collections"
          className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Find your frequency</p>
              <h2>Shop by universe</h2>
            </div>
            <p>
              Five distinct moods. One unmistakable energy.
              <br />
              Pick the one that feels like you.
            </p>
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => chooseCategory(collection.id)}
                className="collection-card group relative h-[420px] overflow-hidden bg-black text-left text-white"
              >
                <img
                  src={collection.image}
                  alt={`${collection.name} collection`}
                  className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                <span className="absolute left-5 top-5 text-xs font-black tracking-[.2em] text-[#d4b77d]">
                  {collection.number}
                </span>
                <div className="absolute bottom-0 p-5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/60">
                    {collection.detail}
                  </p>
                  <h3 className="text-3xl font-black uppercase leading-none tracking-[-.04em]">
                    {collection.name}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">
                    Explore{" "}
                    <Icon
                      name="arrow"
                      className="size-4 transition group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-[#111] px-5 py-24 text-white lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1500px]">
            <div className="section-heading dark">
              <div>
                <p className="eyebrow">Atelier edition 2026</p>
                <h2>The outer limits</h2>
              </div>
              <p>
                Streetwear for the ones who never fit the frame.
                <br />
                Individually numbered. Edition of 250.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-[1.35fr_.65fr]">
              <button
                onClick={() => {
                  setQuickView(products[0])
                  setSelectedSize("M")
                }}
                className="group relative min-h-[620px] overflow-hidden text-left"
              >
                <img
                  src={photos.garage}
                  alt="New Drop 2026 nighttime streetwear editorial"
                  className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 p-7 sm:p-10">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[#d4b77d]">
                    The signature piece
                  </p>
                  <h3 className="text-5xl font-black uppercase tracking-[-.06em] sm:text-7xl">
                    Antariksh
                    <br />
                    No. 01
                  </h3>
                </div>
              </button>
              <div className="flex flex-col gap-5">
                <div className="flex-1 bg-[#c6a15b] p-8 text-black">
                  <p className="text-xs font-black uppercase tracking-[.2em]">
                    Private edition
                  </p>
                  <p className="mt-12 text-5xl font-black leading-[.9] tracking-[-.06em]">
                    250
                    <br />
                    PIECES.
                    <br />
                    THAT'S IT.
                  </p>
                  <button
                    onClick={() => chooseCategory("desi")}
                    className="mt-10 flex items-center gap-3 border-b border-black pb-2 text-xs font-black uppercase tracking-[.15em]"
                  >
                    Get yours <Icon name="arrow" className="size-4" />
                  </button>
                </div>
                <div className="relative min-h-72 flex-1 overflow-hidden">
                  <img
                    src={photos.blue}
                    alt="Blue-lit streetwear portrait"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-black/30 p-7">
                    <p className="text-2xl font-black uppercase tracking-[-.04em]">
                      Reflective ink.
                      <br />
                      Midnight energy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="shop"
          className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">The hoodie roster</p>
              <h2>Shop all fits</h2>
            </div>
            <p>
              {filteredProducts.length} styles found
              <br />
              Inclusive sizes XS—XXL
            </p>
          </div>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map(([id, label]) => (
              <button
                key={id}
                onClick={() => {
                  setActiveCategory(id)
                  setShowWishOnly(false)
                  setVisibleCount(8)
                }}
                className={`filter-chip ${
                  activeCategory === id && !showWishOnly ? "active" : ""
                }`}
              >
                {label}
              </button>
            ))}
            {showWishOnly && (
              <button
                className="filter-chip active"
                onClick={() => setShowWishOnly(false)}
              >
                Saved items
              </button>
            )}
          </div>
          {search && (
            <p className="mt-5 text-sm font-bold">
              Search results for “{search}”
            </p>
          )}
          <div className="mt-10 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <article key={product.id} className="product-card group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#dedbd1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <img
                    src={product.alternateImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 bg-[#c6a15b] px-3 py-2 text-[9px] font-black uppercase tracking-[.14em]">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-[#f3f1e9] transition hover:bg-[#c6a15b] ${
                      wishlist.includes(product.id) ? "text-red-600" : ""
                    }`}
                    aria-label={`${
                      wishlist.includes(product.id) ? "Remove from" : "Add to"
                    } wishlist`}
                  >
                    <Icon
                      name="heart"
                      className={`size-4 ${
                        wishlist.includes(product.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => {
                      setQuickView(product)
                      setSelectedSize("M")
                    }}
                    className="absolute inset-x-3 bottom-3 translate-y-16 bg-[#111] py-4 text-xs font-black uppercase tracking-[.14em] text-white transition duration-300 group-hover:translate-y-0"
                  >
                    Quick view
                  </button>
                </div>
                <div className="pt-4">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.15em] text-black/50">
                        {product.categoryLabel}
                      </p>
                      <h3 className="mt-1 text-lg font-black tracking-[-.025em]">
                        {product.name}
                      </h3>
                    </div>
                    <p className="shrink-0 font-black">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="size-3 rounded-full border border-black/20"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[.12em] hover:underline"
                    >
                      Add to bag <Icon name="plus" className="size-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="border border-black/15 py-20 text-center">
              <p className="text-2xl font-black uppercase">
                No hoodies in this orbit
              </p>
              <button
                onClick={() => {
                  setSearch("")
                  setActiveCategory("all")
                  setShowWishOnly(false)
                }}
                className="mt-5 text-xs font-black uppercase underline"
              >
                Reset filters
              </button>
            </div>
          )}
          {visibleCount < filteredProducts.length && (
            <div className="mt-14 text-center">
              <button
                onClick={() => setVisibleCount(products.length)}
                className="cta-button border border-black"
              >
                Load more <Icon name="plus" />
              </button>
            </div>
          )}
        </section>

        <section className="editorial relative flex min-h-[760px] items-end overflow-hidden bg-black text-white">
          <img
            src={photos.orange}
            alt="Streetwear editorial in vivid orange"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20" />
          <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-16 lg:px-10 lg:pb-24">
            <p className="eyebrow text-[#d4b77d]">
              Hoodverse editorial / Issue 01
            </p>
            <h2 className="mt-4 max-w-5xl text-[clamp(4rem,10vw,9rem)] font-black uppercase leading-[.8] tracking-[-.075em]">
              The street
              <br />
              is our runway.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <p className="max-w-md text-sm text-white/70">
                New Delhi to Bengaluru. Campus corridors to midnight streets. We
                make uniforms for wherever you become yourself.
              </p>
              <button
                onClick={() => chooseCategory("college")}
                className="cta-button bg-white text-black"
              >
                Discover the collegiate edit <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="section-heading">
            <div>
              <p className="eyebrow">In heavy rotation</p>
              <h2>Trending now</h2>
            </div>
            <button
              onClick={() => chooseCategory("all")}
              className="hidden items-center gap-2 text-xs font-black uppercase tracking-[.14em] sm:flex"
            >
              View all <Icon name="arrow" className="size-4" />
            </button>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => p.trending)
              .map((product, i) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setQuickView(product)
                    setSelectedSize("M")
                  }}
                  className="group text-left"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#ddd9ce]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-3 text-5xl font-black tracking-[-.08em] text-white/80">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-black/20 py-4">
                    <span className="font-black">{product.name}</span>
                    <span className="font-bold">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </section>

        <section
          id="about"
          className="bg-[#d9d6cc] px-5 py-24 lg:px-10 lg:py-32"
        >
          <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <img
                src={photos.street}
                alt="Hoodverse streetwear community"
                className="h-[650px] w-full object-cover grayscale"
              />
              <div className="absolute -bottom-6 right-0 max-w-[260px] bg-[#c6a15b] p-7 font-black uppercase">
                <p className="text-5xl tracking-[-.06em]">100%</p>
                <p className="mt-2 text-xs tracking-[.15em]">
                  Designed and made in India
                </p>
              </div>
            </div>
            <div className="lg:pl-12">
              <p className="eyebrow">Our story</p>
              <h2 className="mt-4 text-6xl font-black uppercase leading-[.85] tracking-[-.065em] sm:text-8xl">
                Not just
                <br />
                another
                <br />
                label.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/65">
                HOODVERSE began with one belief: true luxury is the freedom to
                inhabit your own identity. We create elevated oversized
                streetwear informed by India’s new creative culture.
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-black/65">
                Each piece is developed in limited runs using substantial
                fabrics, exacting construction and genderless silhouettes.
                Distinctive by design, never defined by excess.
              </p>
              <div className="mt-10 grid grid-cols-3 border-y border-black/20 py-6">
                {[
                  ["420", "GSM cotton"],
                  ["10K+", "Hoodies worn"],
                  ["24", "Cities reached"],
                ].map(([number, label]) => (
                  <div key={label}>
                    <p className="text-3xl font-black">{number}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-black/50">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="text-center">
            <p className="eyebrow">Real fits. Real people.</p>
            <h2 className="mt-3 text-5xl font-black uppercase tracking-[-.055em] sm:text-7xl">
              The community speaks
            </h2>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {[
              [
                "Aarav M.",
                "Mumbai",
                "The fit is exactly what oversized should be—not sloppy, just right. Fabric feels way more premium than the price.",
              ],
              [
                "Meher K.",
                "Delhi",
                "Wore my Dilli After Dark hoodie to three gigs in one week. The reflective print goes crazy in photos.",
              ],
              [
                "Rohan S.",
                "Bengaluru",
                "Finally an Indian brand getting heavyweight hoodies right. Already ordered a second colour.",
              ],
            ].map(([name, city, review], index) => (
              <article
                key={name}
                className={`border border-black/15 p-8 ${
                  index === 1 ? "bg-[#111] text-white" : ""
                }`}
              >
                <div className="flex gap-1 text-[#b89555]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} name="star" className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-8 text-xl font-semibold leading-snug">
                  “{review}”
                </blockquote>
                <div className="mt-10 border-t border-current/15 pt-5">
                  <p className="text-sm font-black uppercase">{name}</p>
                  <p className="text-[10px] uppercase tracking-[.15em] opacity-50">
                    {city} / Verified buyer
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#c6a15b] px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em]">
                Private access / By invitation
              </p>
              <h2 className="mt-3 text-5xl font-black uppercase leading-[.85] tracking-[-.065em] sm:text-7xl">
                Get into
                <br />
                our universe.
              </h2>
            </div>
            <form
              onSubmit={(e) =>
                handleSimpleForm(e, "You’re in. Welcome to the universe.")
              }
              className="flex border-b-2 border-black"
            >
              <input
                required
                type="email"
                aria-label="Email address"
                placeholder="YOUR EMAIL ADDRESS"
                className="w-full bg-transparent py-5 text-sm font-black outline-none placeholder:text-black/60"
              />
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[.12em]">
                Join now <Icon name="arrow" />
              </button>
            </form>
          </div>
        </section>

        <section
          id="contact"
          className="bg-[#111] px-5 py-24 text-white lg:px-10 lg:py-32"
        >
          <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-[#d4b77d]">Private client service</p>
              <h2 className="mt-4 text-6xl font-black uppercase leading-[.85] tracking-[-.06em]">
                Let's
                <br />
                talk.
              </h2>
              <p className="mt-7 max-w-sm text-white/60">
                Sizing questions, order help or collaboration ideas—we’re
                listening.
              </p>
              <div className="mt-10 space-y-2 text-sm font-bold">
                <a
                  className="block hover:text-[#d4b77d]"
                  href="mailto:hello@hoodverse.in"
                >
                  hello@hoodverse.in
                </a>
                <a
                  className="block hover:text-[#d4b77d]"
                  href="tel:+919876543210"
                >
                  +91 98765 43210
                </a>
                <p className="pt-3 text-xs font-normal text-white/40">
                  Mon—Sat / 10:00—19:00 IST
                </p>
              </div>
            </div>
            <form
              onSubmit={(e) =>
                handleSimpleForm(e, "Message sent. We’ll get back to you soon.")
              }
              className="grid gap-6 sm:grid-cols-2"
            >
              <label className="form-field">
                Name
                <input required name="name" placeholder="Your name" />
              </label>
              <label className="form-field">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                />
              </label>
              <label className="form-field sm:col-span-2">
                What can we help with?
                <select name="topic">
                  <option>Order support</option>
                  <option>Sizing & product</option>
                  <option>Collaboration</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="form-field sm:col-span-2">
                Message
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell us what's up..."
                />
              </label>
              <button className="cta-button w-fit bg-[#c6a15b] text-black sm:col-span-2">
                Send message <Icon name="arrow" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a0a0a] px-5 pb-8 pt-16 text-white lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 border-b border-white/15 pb-14 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="logo text-2xl font-black tracking-[-.08em]">
                HOOD<span className="text-[#c6a15b]">V</span>ERSE
              </div>
              <p className="mt-4 text-sm text-white/45">
                Wear Your Universe.
                <br />
                Crafted in India / Est. 2026
              </p>
            </div>
            <div>
              <p className="footer-title">Shop</p>
              <div className="footer-links">
                <button onClick={() => chooseCategory("all")}>
                  All hoodies
                </button>
                <button onClick={() => chooseCategory("desi")}>
                  Desi Street
                </button>
                <button onClick={() => chooseCategory("graphic")}>
                  Graphic Fever
                </button>
                <button onClick={() => chooseCategory("minimal")}>
                  Minimal
                </button>
              </div>
            </div>
            <div>
              <p className="footer-title">Help</p>
              <div className="footer-links">
                <a href="#contact">Contact us</a>
                <a href="mailto:hello@hoodverse.in?subject=Shipping%20question">
                  Shipping & returns
                </a>
                <a href="mailto:hello@hoodverse.in?subject=Size%20guide">
                  Size guide
                </a>
                <a href="#about">Our story</a>
              </div>
            </div>
            <div>
              <p className="footer-title">Follow the energy</p>
              <div className="mt-5 flex gap-3">
                <a
                  className="social-button"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <Icon name="instagram" />
                </a>
                <a
                  className="social-button text-xs font-black"
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Pinterest"
                >
                  P
                </a>
                <a
                  className="social-button text-xs font-black"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  YT
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-7 text-[10px] uppercase tracking-[.14em] text-white/35 sm:flex-row">
            <p>© 2026 Hoodverse Clothing Co.</p>
            <p>Made with energy in India</p>
          </div>
        </div>
      </footer>

      {quickView && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setQuickView(null)
          }
        >
          <div className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto bg-[#f3f1e9] sm:grid sm:grid-cols-2">
            <button
              onClick={() => setQuickView(null)}
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white"
              aria-label="Close quick view"
            >
              <Icon name="close" />
            </button>
            <div className="h-[42vh] sm:h-auto sm:min-h-[650px]">
              <img
                src={quickView.image}
                alt={quickView.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-10">
              <p className="eyebrow">{quickView.categoryLabel} / 2026</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[.9] tracking-[-.05em] sm:text-5xl">
                {quickView.name}
              </h2>
              <p className="mt-4 text-xl font-black">
                {formatPrice(quickView.price)}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-black/60">
                {quickView.description}
              </p>
              <div className="mt-8">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[.15em]">
                  Colour options
                </p>
                <div className="flex gap-2">
                  {quickView.colors.map((color) => (
                    <button
                      key={color}
                      aria-label={`Colour ${color}`}
                      className="size-7 rounded-full border-2 border-[#f3f1e9] shadow-[0_0_0_1px_#777]"
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <div className="mb-3 flex justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[.15em]">
                    Select size
                  </p>
                  <a
                    className="text-[10px] font-bold uppercase underline"
                    href="mailto:hello@hoodverse.in?subject=Size%20help"
                  >
                    Size help
                  </a>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border py-3 text-xs font-black ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-black/20"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart(quickView, selectedSize)
                  setCartOpen(true)
                  setQuickView(null)
                }}
                className="cta-button mt-8 w-full justify-center bg-[#c6a15b] text-black"
              >
                Add to bag — {formatPrice(quickView.price)} <Icon name="bag" />
              </button>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-black/15 pt-5 text-[10px] font-bold uppercase tracking-[.1em]">
                <span>Free shipping ₹1,999+</span>
                <span>7-day easy returns</span>
                <span>100% cotton</span>
                <span>Made in India</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div
          className="fixed inset-0 z-[75] bg-black/60"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setCartOpen(false)
          }
        >
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#f3f1e9]">
            <div className="flex items-center justify-between border-b border-black/15 p-6">
              <div>
                <p className="text-xl font-black uppercase">Your bag</p>
                <p className="text-xs text-black/50">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <Icon name="close" className="size-6" />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <Icon name="bag" className="size-12 text-black/30" />
                <p className="mt-5 text-2xl font-black uppercase">
                  Your bag is empty
                </p>
                <p className="mt-2 text-sm text-black/50">
                  Your next favourite hoodie is waiting.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false)
                    chooseCategory("all")
                  }}
                  className="cta-button mt-7 bg-black text-white"
                >
                  Discover the collection <Icon name="arrow" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-5 overflow-y-auto p-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-24 object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-black">{item.name}</p>
                        <p className="mt-1 text-[10px] uppercase text-black/50">
                          Size {item.size} / {item.categoryLabel}
                        </p>
                        <p className="mt-2 text-sm font-bold">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-auto flex w-fit items-center border border-black/20">
                          <button
                            className="p-2"
                            onClick={() =>
                              updateQuantity(item.id, item.size, -1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Icon name="minus" className="size-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            className="p-2"
                            onClick={() =>
                              updateQuantity(item.id, item.size, 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Icon name="plus" className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-black/15 p-6">
                  {cartTotal < 1999 ? (
                    <p className="mb-4 text-xs font-bold">
                      Add {formatPrice(1999 - cartTotal)} more for free
                      shipping.
                    </p>
                  ) : (
                    <p className="mb-4 text-xs font-bold text-[#8c6b2e]">
                      You unlocked free shipping.
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-black">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="mt-1 text-[10px] text-black/45">
                    Taxes included. Shipping calculated at checkout.
                  </p>
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(
                      `Hi HOODVERSE, I'd like to order: ${cart
                        .map(
                          (item) =>
                            `${item.quantity}x ${item.name} (${item.size})`,
                        )
                        .join(", ")}. Total: ${formatPrice(cartTotal)}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="cta-button mt-5 w-full justify-center bg-black text-white"
                  >
                    Order on WhatsApp <Icon name="arrow" />
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default App
