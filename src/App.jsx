import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  Coffee,
  MapPin,
  Menu as MenuIcon,
  Minus,
  MousePointer2,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Utensils,
  X
} from 'lucide-react';
import {
  catalogItems,
  galleryImages,
  heroSlides,
  menuCategories,
  menuPages,
  signatureItems,
  socialLinks
} from './data/menu';

const logo = '/assets/anna-cafe-logo.png';

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075 } }
};

const routeTitles = {
  '/': 'Home',
  '/products': 'Products',
  '/gallery': 'Gallery',
  '/order': 'Order Tray',
  '/contact': 'Contact'
};

function dishNameFromImage(image) {
  const fileName = image.split('/').pop()?.replace(/\.[^.]+$/, '') || 'Anna Cafe';
  return fileName
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const requiredOrderFields = [
  { key: 'customerName', label: 'Customer name' },
  { key: 'pickupDeliveryTime', label: 'Pickup/delivery time' },
  { key: 'notes', label: 'Notes' }
];

function getMissingOrderFields(details = {}) {
  return requiredOrderFields.filter(({ key }) => !String(details?.[key] || '').trim());
}

function orderDetailsAreComplete(details = {}) {
  return getMissingOrderFields(details).length === 0;
}

function getOrderDetailsError(details = {}) {
  const missing = getMissingOrderFields(details).map(({ label }) => label);
  if (!missing.length) return '';
  return `Please fill ${missing.join(', ')} first.`;
}

function InstagramGlyph({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.9" r="1.25" fill="currentColor" />
    </svg>
  );
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/index.html') return '/';
  const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return routeTitles[path] ? path : '/';
}

function useRoute() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (nextPath) => {
    const cleanPath = normalizePath(nextPath);
    if (cleanPath !== path) {
      window.history.pushState({}, '', cleanPath);
      setPath(cleanPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { path, navigate };
}

function AppLink({ to, children, className = '', onNavigate, ...props }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate?.(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function CursorGlow() {
  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return null;
}

function FloatingBeans() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 14 }).map((_, index) => (
        <span
          key={index}
          className="bean animate-beanDrift opacity-60"
          style={{
            top: `${8 + ((index * 17) % 82)}%`,
            left: `${5 + ((index * 23) % 90)}%`,
            animationDelay: `${index * -0.65}s`,
            animationDuration: `${8 + (index % 5)}s`,
            transform: `scale(${0.55 + (index % 4) * 0.16}) rotate(${index * 19}deg)`
          }}
        />
      ))}
    </div>
  );
}

function PageHero({ eyebrow, title, copy, image, children }) {
  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-32 section-pad sm:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(213,176,113,.24),transparent_25%),radial-gradient(circle_at_84%_16%,rgba(157,178,147,.32),transparent_31%),linear-gradient(135deg,#f7efe3,#fffaf1_45%,#e7d9c7)]" />
      <FloatingBeans />
      <div className="container-wide relative grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/55 px-4 py-2 text-sm font-bold uppercase tracking-[0.28em] text-forest shadow-porcelain backdrop-blur-xl">
            <Sparkles size={16} /> {eyebrow}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-[clamp(3.7rem,9vw,8.2rem)] font-black uppercase leading-[.86] tracking-[0.06em] text-forest text-balance">
            {title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-deep/72 sm:text-xl">
            {copy}
          </motion.p>
          {children && <motion.div variants={fadeUp} className="mt-8">{children}</motion.div>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[36rem] rounded-[3rem] bg-forest p-3 shadow-leaf"
        >
          <div className="overflow-hidden rounded-[2.35rem] bg-deep">
            <img src={image} alt="Anna Cafe visual" className="h-[34rem] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-2 rounded-[2rem] border border-white/35 bg-cream/85 p-5 shadow-porcelain backdrop-blur-2xl">
            <img src={logo} alt="Anna Cafe logo" className="h-24 w-24 rounded-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Navbar({ path, navigate, cartCount }) {
  const [open, setOpen] = useState(false);
  const links = [
    ['Home', '/'],
    ['Products', '/products'],
    ['Gallery', '/gallery'],
    ['Order Tray', '/order'],
    ['Contact', '/contact']
  ];

  const linkClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${path === href ? 'bg-forest text-cream shadow-leaf' : 'text-deep/70 hover:bg-white/60 hover:text-forest'}`;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/35 bg-cream/75 px-4 py-3 shadow-porcelain backdrop-blur-2xl"
      >
        <AppLink to="/" onNavigate={navigate} className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-sage/70 ring-1 ring-forest/10 transition-transform duration-300 group-hover:rotate-6">
            <img src={logo} alt="Anna Cafe logo" className="h-full w-full object-cover" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold tracking-[0.22em] text-forest">ANNA</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.44em] text-moss">Cafe</span>
          </span>
        </AppLink>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <AppLink key={href} to={href} onNavigate={navigate} className={linkClass(href)}>
              {label}
            </AppLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/65 text-forest transition hover:-translate-y-0.5 hover:bg-forest hover:text-cream" aria-label="Open Instagram">
            <InstagramGlyph size={18} />
          </a>
          <AppLink to="/order" onNavigate={navigate} className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-cream shadow-leaf transition hover:-translate-y-0.5 hover:bg-deep shimmer">
            <ShoppingBag size={17} /> Order {cartCount > 0 && <span className="rounded-full bg-gold px-2 py-0.5 text-[11px] text-deep">{cartCount}</span>}
          </AppLink>
        </div>

        <button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full bg-forest text-cream lg:hidden" aria-label="Toggle navigation menu">
          {open ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/40 bg-cream/90 p-4 shadow-porcelain backdrop-blur-2xl lg:hidden">
            <div className="grid gap-2">
              {links.map(([label, href]) => (
                <AppLink key={href} to={href} onNavigate={(next) => { setOpen(false); navigate(next); }} className={linkClass(href)}>
                  {label}
                </AppLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Steam() {
  return (
    <div aria-hidden className="absolute -top-20 left-1/2 h-28 w-28 -translate-x-1/2">
      {[0, 1, 2].map((item) => (
        <span key={item} className="absolute bottom-0 h-20 w-5 rounded-full border-l border-white/35 blur-[1px] animate-steam" style={{ left: `${30 + item * 18}%`, animationDelay: `${item * 0.65}s` }} />
      ))}
    </div>
  );
}

function Hero({ navigate }) {
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 150]);
  const imageY = useTransform(scrollY, [0, 700], [0, -90]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.08]);
  const current = heroSlides[active];

  useEffect(() => {
    const timer = setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 3800);
    return () => clearInterval(timer);
  }, []);

  const move = (direction) => {
    setActive((value) => (value + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-cream pt-32 sm:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(213,176,113,.28),transparent_24%),radial-gradient(circle_at_90%_18%,rgba(157,178,147,.34),transparent_28%),linear-gradient(135deg,#f7efe3,#fffaf1_45%,#e7d9c7)]" />
      <div className="absolute -right-24 top-20 h-[35rem] w-[35rem] rounded-full border border-forest/10 bg-sage/20 blur-3xl" />
      <div className="absolute -left-28 bottom-0 h-[30rem] w-[30rem] rounded-full bg-caramel/15 blur-3xl" />
      <FloatingBeans />

      <div className="section-pad container-wide relative grid min-h-[calc(100vh-9rem)] items-center gap-10 pb-20 lg:grid-cols-[1.06fr_.94fr]">
        <motion.div style={{ y: heroY }} className="max-w-3xl">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mb-5 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/55 px-4 py-2 text-sm font-bold uppercase tracking-[0.28em] text-forest shadow-porcelain backdrop-blur-xl">
            <Sparkles size={16} /> Ezdan Mall Al Wakra
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="font-display text-[clamp(4.3rem,12vw,10.5rem)] font-black uppercase leading-[.82] tracking-[0.08em] text-forest text-balance">
            Anna
            <span className="block text-[clamp(3.5rem,9vw,8.4rem)] text-deep">Cafe</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.18 }} className="mt-7 max-w-xl text-lg leading-8 text-deep/72 sm:text-xl">
            A refined multi-page cafe experience with product visuals, animated menu discovery, and a visible drag-to-tray WhatsApp ordering flow.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.26 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <AppLink to="/products" onNavigate={navigate} className="group relative overflow-hidden rounded-full bg-forest px-7 py-4 text-center text-sm font-extrabold uppercase tracking-[0.22em] text-cream shadow-leaf transition hover:-translate-y-1">
              <span className="relative z-10 flex items-center justify-center gap-2">Explore products <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
            </AppLink>
            
          </motion.div>
        </motion.div>

        <motion.div style={{ y: imageY, scale }} className="relative mx-auto w-full max-w-[38rem] lg:ml-auto">
          <motion.div initial={{ opacity: 0, rotate: -8, scale: 0.9 }} animate={{ opacity: 1, rotate: -2, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 rounded-[3.5rem] bg-forest p-3 shadow-leaf">
            <div className="relative overflow-hidden rounded-[2.8rem] bg-deep">
              <AnimatePresence mode="wait">
                <motion.img key={current.image} src={current.image} alt={current.name} initial={{ opacity: 0, scale: 1.08, x: 70 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.96, x: -70 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="h-[32rem] w-full object-cover" />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-deep/75 via-transparent to-white/10" />
              <Steam />
              <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] border border-white/15 bg-white/15 p-5 text-cream backdrop-blur-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{current.category} · QAR {current.price}</p>
                <p className="mt-1 font-display text-3xl font-bold">{current.name}</p>
                <p className="mt-1 text-sm text-cream/78">{current.line}</p>
              </div>
            </div>
          </motion.div>

          {/* <div className="absolute -right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2">
            <button onClick={() => move(-1)} className="grid h-11 w-11 place-items-center rounded-full bg-cream/85 text-forest shadow-porcelain backdrop-blur-xl transition hover:-translate-y-0.5"><ArrowLeft size={18} /></button>
            <button onClick={() => move(1)} className="grid h-11 w-11 place-items-center rounded-full bg-cream/85 text-forest shadow-porcelain backdrop-blur-xl transition hover:-translate-y-0.5"><ArrowRight size={18} /></button>
          </div> */}

          <motion.div animate={{ y: [0, -16, 0], rotate: [0, 3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-4 top-8 z-20 hidden rounded-[2rem] border border-white/40 bg-white/70 p-4 shadow-porcelain backdrop-blur-xl sm:block">
            <img src={logo} alt="Anna Cafe emblem" className="h-24 w-24 rounded-full object-cover" />
          </motion.div>

          <motion.div animate={{ y: [0, 18, 0], rotate: [0, -3, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-7 -right-4 z-20 rounded-[2rem] border border-white/35 bg-cream/80 p-5 shadow-porcelain backdrop-blur-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-moss">Carousel</p>
            <div className="mt-2 flex gap-2">
              {heroSlides.map((slide, index) => (
                <button key={slide.name} onClick={() => setActive(index)} aria-label={`Show ${slide.name}`} className={`h-2.5 rounded-full transition-all ${active === index ? 'w-8 bg-forest' : 'w-2.5 bg-forest/25'}`} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const words = ['Espresso', 'Mojito', 'Cheesecake', 'Croissant', 'Tiramisu', 'Arabic Coffee'];
  return (
    <div className="relative z-10 border-y border-forest/10 bg-forest py-4 text-cream mask-fade">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-4xl font-bold uppercase tracking-[0.16em] opacity-90">
        {Array.from({ length: 2 }).flatMap(() => words).map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">{item} <span className="h-2 w-2 rounded-full bg-gold" /></span>
        ))}
      </div>
    </div>
  );
}

function Story() {
  return (
    <section className="relative overflow-hidden bg-deep py-24 text-cream section-pad">
      <div className="ornament-corner left-8 top-8" />
      <div className="ornament-corner bottom-8 right-8 rotate-180" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(213,176,113,.24),transparent_22%),radial-gradient(circle_at_90%_70%,rgba(157,178,147,.20),transparent_28%)]" />
      <div className="container-wide relative grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative">
          <div className="absolute -inset-6 rounded-full border border-sage/20" />
          <div className="relative overflow-hidden rounded-full border-[14px] border-sage bg-cream shadow-glow">
            <img src="/assets/showcase/san-sebastian-cake.png" alt="San Sebastian cake at Anna Cafe" className="aspect-square w-full object-cover" />
          </div>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="lg:pl-10">
          <motion.p variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-sageSoft"><Coffee size={16} /> About the cafe</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-5xl font-bold leading-tight sm:text-7xl text-balance">A calm meeting point for coffee, sweets, and slow conversations.</motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-cream/72">The menu introduces Anna Cafe as a comfortable space for working or meeting friends, with hot and cold drinks, sweets, and desserts crafted to suit every taste.</motion.p>
          <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-3">
            {[[catalogItems.length, 'Menu items'], [menuCategories.length, 'Sections'], ['2', 'Languages']].map(([number, label]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="font-display text-4xl font-bold text-gold">{number}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-cream/60">{label}</p>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6 rounded-[2.2rem] border border-sage/25 bg-sage/10 p-6 font-arabic text-2xl leading-[2.1] text-sageSoft" dir="rtl">مساحة ضممت لتكون ملاذك المفضل للعمل أو اللقاءات الودية، تقدم مشروبات ساخنة وباردة وحلويات طازجة.</motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SignatureCard({ item, index, onAdd }) {
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -12, rotate: index % 2 ? -1.5 : 1.5 }} className="group relative min-h-[34rem] overflow-hidden rounded-[3rem] bg-deep shadow-leaf">
      <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/28 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-forest shadow-porcelain">{item.badge}</div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-gold">{item.category}</p>
        <h3 className="font-display text-4xl font-bold">{item.name}</h3>
        <p className="mt-3 text-sm leading-6 text-cream/76">{item.note}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-xl">QAR {item.price}</span>
          <button onClick={() => onAdd?.(catalogItems.find((menuItem) => menuItem.name === item.name) || { ...item, id: item.name, price: Number(item.price), displayPrice: item.price })} className="grid h-11 w-11 place-items-center rounded-full bg-gold text-deep transition group-hover:rotate-45" aria-label={`Add ${item.name}`}><Plus size={20} /></button>
        </div>
      </div>
    </motion.article>
  );
}

function Signatures({ onAdd, navigate }) {
  return (
    <section className="relative overflow-hidden bg-cream py-24 section-pad">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-deep/10 to-transparent" />
      <div className="container-wide relative">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white/55 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-moss shadow-porcelain"><Sparkles size={15} /> Signature products</p>
          <h2 className="font-display text-5xl font-bold leading-tight text-forest sm:text-7xl text-balance">New products for a premium cafe.</h2>
          <p className="mt-5 text-lg leading-8 text-deep/64">Every product now has its own clean menu-matched visual, prepared for product cards, hero sections, gallery tiles, and the order tray.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {signatureItems.map((item, index) => <SignatureCard key={item.name} item={item} index={index} onAdd={onAdd} />)}
        </motion.div>
        <div className="mt-10 text-center">
          <AppLink to="/products" onNavigate={navigate} className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-extrabold uppercase tracking-[0.2em] text-cream shadow-leaf transition hover:-translate-y-1">View all products <ArrowUpRight size={18} /></AppLink>
        </div>
      </div>
    </section>
  );
}

function MenuShowcase({ navigate }) {
  const [active, setActive] = useState(menuCategories[0].id);
  const category = menuCategories.find((item) => item.id === active) || menuCategories[0];
  return (
    <section className="relative overflow-hidden bg-deep py-24 text-cream section-pad">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(157,178,147,.24),transparent_27%),radial-gradient(circle_at_88%_80%,rgba(213,176,113,.20),transparent_30%)]" />
      <div className="container-wide relative grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-sageSoft"><Utensils size={15} /> Menu preview</p>
          <h2 className="font-display text-5xl font-bold sm:text-7xl text-balance">Tap a section. Then drag it to the tray.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-cream/70">The full Products and Order pages now include every section with name, image, price, quantity, and WhatsApp-ready checkout.</p>
          <AppLink to="/order" onNavigate={navigate} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-extrabold uppercase tracking-[0.2em] text-deep shadow-glow transition hover:-translate-y-1">Open order tray <ShoppingBag size={18} /></AppLink>
        </motion.div>
        <div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {menuCategories.slice(0, 10).map((item) => (
              <button key={item.id} onClick={() => setActive(item.id)} className={`shrink-0 rounded-full border px-5 py-3 text-sm font-bold transition ${active === item.id ? 'border-gold bg-gold text-deep' : 'border-white/10 bg-white/10 text-cream hover:bg-white/15'}`}>
                {item.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="mt-6 overflow-hidden rounded-[3rem] border border-white/10 bg-white/10 shadow-leaf backdrop-blur-2xl">
              <div className="grid lg:grid-cols-[.85fr_1.15fr]">
                <div className="relative min-h-[28rem] overflow-hidden bg-gradient-to-br from-deep via-forest to-deep">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,250,241,.16),transparent_28%),radial-gradient(circle_at_84%_82%,rgba(213,176,113,.14),transparent_32%)]" />
                  <div className="relative z-10 flex min-h-[28rem] flex-col justify-between gap-5 p-6 sm:p-8">
                    <div className="flex min-h-0 flex-1 items-center justify-center pb-2">
                      <img src={category.image} alt={category.title} className="max-h-[17rem] w-full object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,.24)]" />
                    </div>
                    <div className="rounded-[2rem] border border-white/15 bg-deep/45 p-5 text-cream shadow-leaf backdrop-blur-xl">
                      <p className="font-arabic text-3xl text-sageSoft" dir="rtl">{category.arabic}</p>
                      <h3 className="mt-1 font-display text-4xl font-bold leading-none sm:text-5xl">{category.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-cream/65">{category.description}</p>
                  <div className="mt-6 grid gap-3">
                    {category.items.slice(0, 9).map(([name, price]) => (
                      <div key={name} className="flex items-center justify-between rounded-2xl bg-deep/35 px-4 py-3">
                        <span className="font-semibold">{name}</span>
                        <span className="rounded-full bg-cream px-3 py-1 text-sm font-extrabold text-forest">QAR {price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function GalleryStrip({ navigate }) {
  return (
    <section className="relative overflow-hidden bg-cream py-24 section-pad">
      <div className="container-wide">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white/55 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-moss shadow-porcelain"><Camera size={15} /> Gallery</p>
            <h2 className="font-display text-5xl font-bold text-forest sm:text-7xl text-balance">Social-style frames, menu pages, and product shots.</h2>
          </div>
          <AppLink to="/gallery" onNavigate={navigate} className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-extrabold uppercase tracking-[0.2em] text-cream shadow-leaf transition hover:-translate-y-1">Gallery <ArrowUpRight size={18} /></AppLink>
        </motion.div>
        <div className="mt-12 flex gap-5 overflow-x-auto pb-6 scrollbar-hide">
          {galleryImages.concat(menuPages.slice(0, 4)).map((image, index) => {
            const isMenuPage = image.includes('/menu-pages/');
            return (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.04 }}
                className={`group relative h-[30rem] w-[22rem] shrink-0 overflow-hidden rounded-[2.8rem] shadow-leaf ${isMenuPage ? 'bg-forest p-3' : 'bg-cream'}`}
              >
                <img
                  src={image}
                  alt={isMenuPage ? 'Anna Cafe menu page' : 'Anna Cafe gallery'}
                  className={`${isMenuPage ? 'h-full w-full rounded-[2rem] bg-cream object-contain' : 'h-full w-full object-cover'} transition duration-700 group-hover:scale-[1.03]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/15 bg-white/15 p-4 text-cream backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{isMenuPage ? 'Menu page' : `Frame ${index + 1}`}</p>
                  <p className="mt-1 font-display text-2xl font-bold">{isMenuPage ? 'Full uncropped page' : 'Anna Cafe visual'}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactBanner({ navigate }) {
  return (
    <section className="relative overflow-hidden bg-cream py-24 section-pad">
      <div className="container-wide relative overflow-hidden rounded-[3.2rem] bg-forest p-6 text-cream shadow-leaf sm:p-10 lg:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(213,176,113,.28),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(255,250,241,.14),transparent_28%)]" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-sage/30" />
        <div className="absolute -bottom-28 left-1/2 h-80 w-80 rounded-full border border-gold/20" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-sageSoft"><MapPin size={15} /> Visit Anna Cafe</p>
            <h2 className="font-display text-5xl font-bold sm:text-7xl text-balance">A polished website that turns views into visits and orders.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/72">Location, socials, gallery, full menu products, and a WhatsApp tray now live in one elegant multi-page build.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={socialLinks.maps} target="_blank" rel="noreferrer" className="rounded-full bg-cream px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-forest transition hover:-translate-y-1">Open maps</a>
              <AppLink to="/contact" onNavigate={navigate} className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-cream transition hover:-translate-y-1 hover:bg-white/15">Contact us</AppLink>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 36, rotate: 2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="paper-texture rounded-[2.6rem] p-7 text-deep shadow-porcelain">
            <img src={logo} alt="Anna Cafe logo" className="mx-auto h-36 w-36 rounded-full object-cover shadow-porcelain" />
            <div className="mt-7 space-y-5">
              <div className="rounded-[2rem] border border-forest/10 bg-white/55 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-moss">Location</p>
                <p className="mt-2 font-display text-3xl font-bold text-forest">Ezdan Mall Al Wakra</p>
                <p className="mt-1 font-arabic text-2xl text-moss" dir="rtl">إزدان مول الوكرة</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="rounded-[1.6rem] bg-forest p-5 text-cream transition hover:-translate-y-1"><InstagramGlyph size={24} /><p className="mt-4 font-bold">Follow the cafe</p></a>
                <a href={socialLinks.snapchat} target="_blank" rel="noreferrer" className="rounded-[1.6rem] bg-gold p-5 text-deep transition hover:-translate-y-1"><Camera /><p className="mt-4 font-bold">Watch the stories</p></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ navigate, onAdd }) {
  return (
    <>
      <Hero navigate={navigate} />
      <Story />
      <Signatures onAdd={onAdd} navigate={navigate} />
      <MenuShowcase navigate={navigate} />
      <GalleryStrip navigate={navigate} />
      <ContactBanner navigate={navigate} />
    </>
  );
}


function setCleanDragImage(event) {
  const sourceImage = event.currentTarget.querySelector('img');
  if (!sourceImage || typeof document === 'undefined') return;

  const preview = sourceImage.cloneNode(true);
  preview.className = 'clean-drag-preview';
  preview.setAttribute('aria-hidden', 'true');
  preview.draggable = false;
  document.body.appendChild(preview);
  event.dataTransfer.setDragImage(preview, 70, 70);
  window.setTimeout(() => preview.remove(), 0);
}

function ProductCard({ item, onAdd, onDragStartItem, onDragEndItem }) {
  const onDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('application/json', JSON.stringify(item));
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
    setCleanDragImage(event);
    event.currentTarget.classList.add('dragging-card');
    onDragStartItem?.(item);
  };

  const onDragEnd = (event) => {
    event.currentTarget.classList.remove('dragging-card');
    onDragEndItem?.();
  };

  return (
    <motion.article
      layout
      variants={fadeUp}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileHover={{ y: -8 }}
      className="group relative cursor-grab overflow-hidden rounded-[2.4rem] border border-forest/10 bg-cream/80 shadow-porcelain backdrop-blur-xl transition active:cursor-grabbing"
    >
      <div className="relative h-[23rem] overflow-hidden bg-gradient-to-br from-deep via-forest to-deep">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,250,241,.14),transparent_30%),radial-gradient(circle_at_80%_85%,rgba(213,176,113,.14),transparent_32%)]" />
        <div className="absolute left-4 top-4 z-20 rounded-full bg-cream/95 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-forest shadow-porcelain">
          QAR {item.displayPrice}
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between gap-4 p-5 pt-16">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="max-h-[13.5rem] w-full object-contain transition duration-700 group-hover:scale-105"
              draggable="false"
            />
          </div>
          <div className="rounded-[1.6rem] border border-white/15 bg-white/15 p-4 text-cream shadow-leaf backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{item.category}</p>
            <h3 className="mt-1 line-clamp-2 font-display text-[1.8rem] font-bold leading-none">{item.name}</h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <button onClick={() => onAdd(item)} className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-extrabold uppercase tracking-[0.17em] text-cream shadow-leaf transition hover:-translate-y-0.5">
          <Plus size={17} /> Add to tray
        </button>
        <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-moss"><MousePointer2 size={14} /> Drag card down</p>
      </div>
    </motion.article>
  );
}

function ProductsPage({ onAdd, navigate, onDragStartItem, onDragEndItem }) {
  const [active, setActive] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filtered = useMemo(() => {
    return catalogItems.filter((item) => {
      const matchesCategory = active === 'all' || item.categoryId === active;
      const searchText = `${item.name} ${item.category} ${item.arabicCategory}`.toLowerCase();
      const matchesSearch = !normalizedSearch || searchText.includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [active, normalizedSearch]);

  return (
    <>
      <PageHero eyebrow="Full catalog" title="Products" copy="Every menu item is now shown under its specific section with a clean image, name, price, and drag-to-tray behaviour." image="/assets/products/iced-caramel.png">
        <button onClick={() => navigate('/order')} className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-extrabold uppercase tracking-[0.2em] text-cream shadow-leaf transition hover:-translate-y-1">Open ordering tray <ChevronDown size={18} /></button>
      </PageHero>
      <section className="relative bg-cream py-14 section-pad">
        <div className="container-wide">
          <div className="sticky top-24 z-30 -mx-5 mb-10 border-y border-forest/10 bg-cream/88 px-5 py-4 backdrop-blur-2xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            <div className="mb-4 rounded-[2rem] border border-forest/10 bg-white/78 p-2 shadow-porcelain backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="group flex flex-1 items-center gap-3 rounded-[1.55rem] bg-cream/82 px-4 py-3 ring-1 ring-forest/10 transition focus-within:bg-white focus-within:ring-forest/30">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-cream shadow-leaf transition group-focus-within:scale-105">
                    <Search size={18} />
                  </span>
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search coffee, cakes, mojitos, croissants..."
                    className="min-w-0 flex-1 bg-transparent text-base font-semibold text-forest outline-none placeholder:text-moss/65"
                    aria-label="Search products"
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest/8 text-forest transition hover:bg-forest hover:text-cream" aria-label="Clear product search">
                      <X size={17} />
                    </button>
                  )}
                </label>
                <div className="rounded-full bg-forest px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-cream shadow-leaf">
                  {filtered.length} item{filtered.length === 1 ? '' : 's'}
                </div>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              <button onClick={() => setActive('all')} className={`shrink-0 rounded-full px-5 py-3 text-sm font-bold transition ${active === 'all' ? 'bg-forest text-cream shadow-leaf' : 'bg-white/70 text-forest hover:bg-white'}`}>All items</button>
              {menuCategories.map((category) => (
                <button key={category.id} onClick={() => setActive(category.id)} className={`shrink-0 rounded-full px-5 py-3 text-sm font-bold transition ${active === category.id ? 'bg-forest text-cream shadow-leaf' : 'bg-white/70 text-forest hover:bg-white'}`}>{category.title}</button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            {filtered.length ? (
              <motion.div key={`${active}-${normalizedSearch || 'all'}`} variants={stagger} initial="hidden" animate="visible" exit={{ opacity: 0, y: 20 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item) => <ProductCard key={item.id} item={item} onAdd={onAdd} onDragStartItem={onDragStartItem} onDragEndItem={onDragEndItem} />)}
              </motion.div>
            ) : (
              <motion.div key="empty-products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-[2.5rem] border border-dashed border-forest/20 bg-white/65 p-12 text-center shadow-porcelain">
                <Search className="mx-auto text-moss" size={34} />
                <h3 className="mt-4 font-display text-4xl font-bold text-forest">No products found</h3>
                <p className="mx-auto mt-2 max-w-md text-deep/60">Try a different dish name, drink name, or choose another category tab.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function TrayShelfCard({ item, onDropItem, onDragStartItem, onDragEndItem }) {
  const onDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('application/json', JSON.stringify(item));
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
    setCleanDragImage(event);
    event.currentTarget.classList.add('dragging-card');
    onDragStartItem?.(item);
  };

  const onDragEnd = (event) => {
    event.currentTarget.classList.remove('dragging-card');
    onDragEndItem?.();
  };

  return (
    <motion.button
      type="button"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={() => onDropItem(item)}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex min-h-[11.5rem] w-44 shrink-0 cursor-grab flex-col justify-between overflow-hidden rounded-[1.7rem] border border-forest/10 bg-white p-3 text-left shadow-porcelain transition active:cursor-grabbing sm:w-52"
      aria-label={`Drag ${item.name} to the tray`}
    >
      <span className="absolute inset-x-5 top-3 h-1 rounded-full bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 transition group-hover:opacity-100" />
      <span className="relative block h-24 overflow-visible rounded-[1.25rem] bg-transparent sm:h-28">
        <img src={item.image} alt={item.name} className="h-full w-full object-contain p-5 transition duration-700 group-hover:scale-110" draggable="false" />
      </span>
      <span className="mt-3 block min-w-0">
        <span className="block truncate text-[10px] font-extrabold uppercase tracking-[0.22em] text-moss">{item.category}</span>
        <span className="mt-1 block line-clamp-2 font-display text-xl font-bold leading-none text-forest">{item.name}</span>
        <span className="mt-2 inline-flex rounded-full bg-forest px-3 py-1 text-xs font-extrabold text-cream">QAR {item.displayPrice}</span>
      </span>
    </motion.button>
  );
}

function getTrayPlacements(cart) {
  const fallback = [
    [24, 44], [41, 42], [58, 46], [72, 43],
    [31, 61], [49, 62], [66, 63], [82, 59],
    [18, 63], [39, 55], [58, 57], [77, 52]
  ];

  return cart.flatMap((entry) =>
    Array.from({ length: entry.qty }).map((_, index) => {
      const saved = entry.placements?.[index];
      const [x, y] = fallback[(index + cart.findIndex((item) => item.id === entry.id) * 2) % fallback.length];
      return {
        ...entry,
        placementKey: `${entry.id}-${index}`,
        trayX: saved?.x ?? x,
        trayY: saved?.y ?? y
      };
    })
  );
}

function OrderPage({ cart, onAdd, updateQty, removeItem, clearCart, onDragStartItem, onDragEndItem, orderDetails, onOrderDetailsChange }) {
  const [activeCategory, setActiveCategory] = useState('croissant');
  const [trayHover, setTrayHover] = useState(false);
  const [lastDropped, setLastDropped] = useState(null);
  const [orderError, setOrderError] = useState('');
  const total = cart.reduce((sum, entry) => sum + entry.price * entry.qty, 0);
  const count = cart.reduce((sum, entry) => sum + entry.qty, 0);
  const activeItems = useMemo(() => (activeCategory === 'all' ? catalogItems : catalogItems.filter((item) => item.categoryId === activeCategory)), [activeCategory]);
  const trayItems = useMemo(() => getTrayPlacements(cart), [cart]);
  const orderReady = cart.length > 0 && orderDetailsAreComplete(orderDetails);

  const handleOrderDetailsChange = (nextDetails) => {
    onOrderDetailsChange(nextDetails);
    if (orderDetailsAreComplete(nextDetails)) setOrderError('');
  };

  const validateOrder = (event) => {
    if (!cart.length) {
      event.preventDefault();
      return;
    }

    if (!orderDetailsAreComplete(orderDetails)) {
      event.preventDefault();
      setOrderError(getOrderDetailsError(orderDetails));
      document.getElementById('checkout-details')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const readDroppedItem = (event) => {
    const payload = event.dataTransfer.getData('application/json') || event.dataTransfer.getData('text/plain');
    if (!payload) return null;
    return JSON.parse(payload);
  };

  const handleTrayDrop = (event) => {
    event.preventDefault();
    setTrayHover(false);

    const item = readDroppedItem(event);
    if (!item) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(88, Math.max(12, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(78, Math.max(24, ((event.clientY - rect.top) / rect.height) * 100));
    onAdd(item, { x, y });
    setLastDropped(item.name);
    window.setTimeout(() => setLastDropped(null), 1400);
  };

  const handleTrayLeave = (event) => {
    const nextTarget = event.relatedTarget;
    if (!nextTarget || !event.currentTarget.contains(nextTarget)) setTrayHover(false);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f4ef] pb-24 pt-28 section-pad sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(213,176,113,.18),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(157,178,147,.18),transparent_30%),linear-gradient(180deg,#fffaf3,#f4eee6)]" />
        <div className="container-wide relative">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
            <motion.p variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.28em] text-moss shadow-porcelain">
              <ShoppingBag size={15} /> shopping tray
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-[clamp(3rem,8vw,6.8rem)] font-black leading-[.86] tracking-[0.04em] text-forest text-balance">Freshly Served </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-deep/62">
              Drag a product from the top shelf onto the wooden tray. The item lands exactly where you drop it, like the reference video.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-9">
            <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-forest/10 bg-white/80 p-3 shadow-porcelain backdrop-blur-xl sm:p-4">
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                <button onClick={() => setActiveCategory('all')} className={`shrink-0 rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-[0.18em] transition ${activeCategory === 'all' ? 'bg-forest text-cream shadow-leaf' : 'bg-cream text-forest hover:bg-white'}`}>All</button>
                {menuCategories.map((category) => (
                  <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`shrink-0 rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-[0.18em] transition ${activeCategory === category.id ? 'bg-forest text-cream shadow-leaf' : 'bg-cream text-forest hover:bg-white'}`}>
                    {category.title}
                  </button>
                ))}
              </div>
              <div className="video-menu-shelf flex gap-4 overflow-x-auto px-1 pb-2 pt-3 scrollbar-hide">
                {activeItems.map((item) => <TrayShelfCard key={item.id} item={item} onDropItem={onAdd} onDragStartItem={onDragStartItem} onDragEndItem={onDragEndItem} />)}
              </div>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`wooden-tray-stage relative min-h-[24rem] overflow-hidden rounded-[3rem] p-5 shadow-leaf transition duration-300 sm:min-h-[31rem] sm:p-8 ${trayHover ? 'ring-8 ring-gold/35' : ''}`}
              onDragEnter={(event) => { event.preventDefault(); setTrayHover(true); }}
              onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; setTrayHover(true); }}
              onDragLeave={handleTrayLeave}
              onDrop={handleTrayDrop}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,.14),transparent_40%)]" />
              <div className="wooden-tray-board absolute left-1/2 top-[57%] h-[58%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] sm:w-[88%]" />
              <div className="absolute left-1/2 top-[57%] h-[43%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[2.4rem] border border-deep/10 bg-black/5 shadow-inner" />

              <AnimatePresence>
                {trayItems.map((entry) => (
                  <motion.div
                    key={entry.placementKey}
                    layout
                    initial={{ opacity: 0, scale: 0.45, y: -80, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.4 }}
                    transition={{ type: 'spring', stiffness: 330, damping: 25 }}
                    className="tray-food-item group absolute z-20"
                    style={{ left: `${entry.trayX}%`, top: `${entry.trayY}%` }}
                  >
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                      <img src={entry.image} alt={entry.name} className="h-24 w-28 object-contain drop-shadow-[0_18px_24px_rgba(70,38,13,.38)] sm:h-32 sm:w-40" draggable="false" />
                      <button onClick={() => updateQty(entry.id, -1)} className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-forest text-cream opacity-0 shadow-porcelain transition group-hover:opacity-100" aria-label={`Remove one ${entry.name}`}><X size={15} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {count === 0 && (
                <div className="absolute inset-x-8 top-1/2 z-10 -translate-y-1/2 text-center text-deep/48">
                  <MousePointer2 className="mx-auto mb-3 text-moss" size={34} />
                  <p className="font-display text-3xl font-bold text-forest">Drop products here</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em]">The tray is visible and ready</p>
                </div>
              )}

              <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2">
                <a href={orderReady ? buildWhatsAppUrl(cart, orderDetails) : '#'} target={orderReady ? '_blank' : undefined} rel="noreferrer" onClick={validateOrder} className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-extrabold uppercase tracking-[0.18em] shadow-leaf transition ${cart.length ? 'bg-deep text-cream hover:-translate-y-1' : 'bg-deep/25 text-white/70 cursor-not-allowed'}`}>
                  <ShoppingBag size={16} /> Place order
                </a>
              </div>

              <div className={`absolute left-6 top-6 z-30 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] shadow-porcelain transition ${trayHover ? 'bg-gold text-deep' : 'bg-white/78 text-forest'}`}>
                {trayHover ? 'Release to place' : lastDropped ? `${lastDropped} added` : 'Wooden tray drop zone'}
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-[2.4rem] border border-forest/10 bg-white/82 p-5 shadow-porcelain backdrop-blur-xl sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-moss">Your tray</p>
              <h2 className="mt-2 font-display text-4xl font-bold text-forest">{count ? `${count} item${count > 1 ? 's' : ''}` : 'Empty tray'}</h2>
              <p className="mt-1 text-sm text-deep/55">Drag and drop items onto the board, or tap any product card to add it.</p>

              <div className="mt-5 grid max-h-[30rem] gap-3 overflow-y-auto pr-1 md:grid-cols-2 xl:grid-cols-4">
                {cart.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-forest/20 bg-cream/70 p-5 text-center text-sm text-deep/55 md:col-span-2 xl:col-span-4">No products yet.</div>
                ) : cart.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 rounded-[1.35rem] bg-cream/85 p-3">
                    <img src={entry.image} alt={entry.name} className="h-14 w-14 object-contain drop-shadow-md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-forest">{entry.name}</p>
                      <p className="text-xs text-moss">QAR {entry.price} each</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(entry.id, -1)} className="grid h-7 w-7 place-items-center rounded-full bg-white text-forest" aria-label={`Remove one ${entry.name}`}><Minus size={13} /></button>
                      <span className="w-6 text-center text-sm font-bold">{entry.qty}</span>
                      <button onClick={() => updateQty(entry.id, 1)} className="grid h-7 w-7 place-items-center rounded-full bg-forest text-cream" aria-label={`Add one ${entry.name}`}><Plus size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div id="checkout-details" className="mt-5 scroll-mt-32">
                <OrderDetailsFields details={orderDetails} onChange={handleOrderDetailsChange} error={orderError} />
              </div>

              <div className="mt-5 rounded-[1.6rem] bg-forest p-4 text-cream md:flex md:items-center md:justify-between md:gap-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-sageSoft">Total</p>
                <p className="mt-1 font-display text-4xl font-bold">QAR {total}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => { clearCart(); setOrderError(''); }} disabled={!cart.length} className="rounded-full border border-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-cream transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35">Clear Tray</button>
                  <a href={orderReady ? buildWhatsAppUrl(cart, orderDetails) : '#'} target={orderReady ? '_blank' : undefined} rel="noreferrer" onClick={validateOrder} className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] transition ${cart.length ? 'bg-gold text-deep hover:-translate-y-0.5' : 'bg-white/10 text-cream/35 cursor-not-allowed'}`}>Place order</a>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Visual library" title="Gallery" copy="Lifestyle product photos are now featured in the gallery, along with the original menu pages for a premium visual browsing experience." image="/assets/showcase/classic-tiramisu.png" />
      <section className="bg-cream py-16 section-pad">
        <div className="container-wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {galleryImages.map((image, index) => {
              const title = dishNameFromImage(image);
              return (
                <motion.article
                  key={image}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className={`group relative overflow-hidden rounded-[2.8rem] bg-cream shadow-leaf ${index % 3 === 0 ? 'lg:row-span-2' : ''}`}
                >
                  <img
                    src={image}
                    alt={title}
                    className={`${index % 3 === 0 ? 'h-[38rem]' : 'h-[28rem]'} w-full object-cover transition duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/62 via-deep/5 to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />
                  <div className="absolute bottom-5 left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2 text-center">
                    <div className="mx-auto inline-flex max-w-full items-center justify-center rounded-full border border-white/20 bg-deep/42 px-4 py-2 text-cream shadow-leaf backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:bg-forest/65 sm:px-5">
                      <h3 className="truncate font-display text-lg font-bold leading-none sm:text-xl">{title}</h3>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
          <div className="mt-16">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white/55 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-moss shadow-porcelain">Original menu</p>
                <h2 className="font-display text-5xl font-bold text-forest sm:text-6xl">Menu PDF pages</h2>
              </div>
              <a href="/assets/anna-cafe-menu.pdf" className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-cream shadow-leaf transition hover:-translate-y-1">Download PDF <ArrowUpRight size={17} /></a>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {menuPages.slice(0, 4).map((page, index) => (
                <motion.a
                  key={page}
                  href={page}
                  target="_blank"
                  rel="noreferrer"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="group relative overflow-hidden rounded-[2rem] bg-forest p-2 shadow-leaf"
                >
                  <img
                    src={page}
                    alt={`Anna Cafe menu page ${index + 1}`}
                    className="h-full max-h-[34rem] w-full rounded-[1.55rem] bg-cream object-contain transition duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-2 flex items-center justify-center rounded-[1.55rem] bg-deep/16 opacity-0 transition duration-500 group-hover:opacity-100">
                    <span className="rounded-full border border-white/20 bg-deep/55 px-5 py-2 font-display text-2xl font-bold text-cream shadow-leaf backdrop-blur-xl">Menu Page {index + 1}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage({ navigate }) {
  return (
    <>
      <PageHero eyebrow="Location + socials" title="Contact Us" copy="Connect with Anna Cafe on Instagram or Snapchat, open the location, or start a WhatsApp order from the tray." image="/assets/showcase/spanish-latte.png">
        <div className="flex flex-wrap gap-3">
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-cream shadow-leaf transition hover:-translate-y-1"><InstagramGlyph size={18} /> Instagram</a>
          <a href={socialLinks.snapchat} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/60 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-forest shadow-porcelain backdrop-blur-xl transition hover:-translate-y-1"><Camera size={18} /> Snapchat</a>
        </div>
      </PageHero>
      <section className="bg-cream py-16 section-pad">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2.8rem] bg-forest p-8 text-cream shadow-leaf lg:col-span-2">
            <MapPin size={34} className="text-gold" />
            <h2 className="mt-5 font-display text-5xl font-bold">Ezdan Mall Al Wakra</h2>
            <p className="mt-3 font-arabic text-3xl text-sageSoft" dir="rtl">إزدان مول الوكرة</p>
            <p className="mt-5 max-w-2xl text-cream/70">Use this section for exact floor, opening hours, phone number, and Google Map embed once those details are confirmed.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={socialLinks.maps} target="_blank" rel="noreferrer" className="rounded-full bg-cream px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-forest transition hover:-translate-y-1">Open maps</a>
              <button onClick={() => navigate('/order')} className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-cream transition hover:-translate-y-1 hover:bg-white/15">Start order</button>
            </div>
          </div>
          <div className="paper-texture rounded-[2.8rem] p-8 shadow-porcelain">
            <img src={logo} alt="Anna Cafe logo" className="mx-auto h-40 w-40 rounded-full object-cover shadow-porcelain" />
            <div className="mt-8 space-y-4">
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[1.5rem] bg-white/65 p-5 font-bold text-forest transition hover:-translate-y-1"><span className="flex items-center gap-3"><InstagramGlyph size={21} /> Instagram</span><ArrowUpRight size={18} /></a>
              <a href={socialLinks.snapchat} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[1.5rem] bg-white/65 p-5 font-bold text-forest transition hover:-translate-y-1"><span className="flex items-center gap-3"><Camera size={21} /> Snapchat</span><ArrowUpRight size={18} /></a>
              <a href="/assets/anna-cafe-menu.pdf" className="flex items-center justify-between rounded-[1.5rem] bg-white/65 p-5 font-bold text-forest transition hover:-translate-y-1"><span className="flex items-center gap-3"><Utensils size={21} /> Menu PDF</span><ArrowUpRight size={18} /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function OrderDetailsFields({ details, onChange, variant = 'light', error = '' }) {
  const isDark = variant === 'dark';
  const baseInputClass = 'mt-2 w-full rounded-[1.1rem] border border-forest/10 bg-cream/95 px-4 py-3 text-sm font-semibold text-forest outline-none shadow-inner transition placeholder:text-moss/55 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/20';
  const labelClass = `text-[11px] font-extrabold uppercase tracking-[0.24em] ${isDark ? 'text-sageSoft' : 'text-moss'}`;
  const missingFields = new Set(error ? getMissingOrderFields(details).map(({ key }) => key) : []);
  const inputClass = (field) => `${baseInputClass} ${missingFields.has(field) ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100' : ''}`;

  const updateField = (field, value) => {
    onChange({ ...details, [field]: value });
  };

  return (
    <div className={`${isDark ? 'border-white/10 bg-white/8 text-cream' : 'border-forest/10 bg-cream/80 text-deep'} rounded-[1.6rem] border p-4 shadow-porcelain backdrop-blur-xl`}>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={`text-xs font-extrabold uppercase tracking-[0.28em] ${isDark ? 'text-gold' : 'text-moss'}`}>Checkout details</p>
          <p className={`mt-1 text-sm ${isDark ? 'text-cream/65' : 'text-deep/55'}`}>These required details will be added to the WhatsApp order message.</p>
          {error && (
            <p className={`mt-3 rounded-[1rem] border px-4 py-3 text-sm font-bold ${isDark ? 'border-red-300/40 bg-red-500/15 text-red-100' : 'border-red-200 bg-red-50 text-red-700'}`}>
              {error}
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Customer name <span className="text-red-500">*</span></span>
          <input
            required
            value={details.customerName}
            onChange={(event) => updateField('customerName', event.target.value)}
            placeholder="Enter customer name"
            aria-invalid={missingFields.has('customerName')}
            className={inputClass('customerName')}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Pickup/delivery time <span className="text-red-500">*</span></span>
          <input
            required
            value={details.pickupDeliveryTime}
            onChange={(event) => updateField('pickupDeliveryTime', event.target.value)}
            placeholder="Example: Pickup 7:30 PM"
            aria-invalid={missingFields.has('pickupDeliveryTime')}
            className={inputClass('pickupDeliveryTime')}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelClass}>Notes <span className="text-red-500">*</span></span>
          <textarea
            required
            value={details.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Any special instructions?"
            rows={3}
            aria-invalid={missingFields.has('notes')}
            className={`${inputClass('notes')} resize-none`}
          />
        </label>
      </div>
    </div>
  );
}

function buildWhatsAppUrl(cart, details = {}) {
  const lines = cart.map((entry) => `${entry.qty} x ${entry.name} — QAR ${entry.price * entry.qty}`);
  const total = cart.reduce((sum, entry) => sum + entry.price * entry.qty, 0);
  const clean = (value) => (value || '').trim();
  const customerName = clean(details.customerName);
  const pickupDeliveryTime = clean(details.pickupDeliveryTime);
  const notes = clean(details.notes);
  const text = [
    'Hello Anna Cafe, I want to place this order:',
    '',
    ...lines,
    '',
    `Total: QAR ${total}`,
    '',
    `Customer name: ${customerName || '-'}`,
    `Pickup/delivery time: ${pickupDeliveryTime || '-'}`,
    `Notes: ${notes || '-'}`
  ].join('\n');
  const encoded = encodeURIComponent(text);
  return socialLinks.whatsappNumber ? `https://wa.me/${socialLinks.whatsappNumber}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}

function CartTray({ cart, onDropItem, updateQty, removeItem, clearCart, navigate, path, dragActive }) {
  const [expanded, setExpanded] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [trayPulse, setTrayPulse] = useState(false);
  const total = cart.reduce((sum, entry) => sum + entry.price * entry.qty, 0);
  const count = cart.reduce((sum, entry) => sum + entry.qty, 0);
  const previousCountRef = useRef(count);
  const showHint = path === '/products' || path === '/order';
  const trayActive = isOver || dragActive || trayPulse;
  const handleContinueToOrder = () => {
    if (!cart.length) return;
    setExpanded(false);
    navigate('/order');
    window.setTimeout(() => {
      document.getElementById('checkout-details')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 360);
  };

  useEffect(() => {
    setExpanded(false);
    setIsOver(false);
  }, [path]);

  useEffect(() => {
    const previousCount = previousCountRef.current;
    previousCountRef.current = count;

    if (count > previousCount) {
      setTrayPulse(false);
      const frame = window.requestAnimationFrame(() => setTrayPulse(true));
      const timer = window.setTimeout(() => setTrayPulse(false), 720);
      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timer);
      };
    }
  }, [count]);

  const readDroppedItem = (event) => {
    const payload = event.dataTransfer.getData('application/json') || event.dataTransfer.getData('text/plain');
    if (!payload) return null;
    return JSON.parse(payload);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsOver(false);
    setExpanded(true);
    try {
      const item = readDroppedItem(event);
      if (item) onDropItem(item);
    } catch (error) {
      console.error('Could not read dragged menu item', error);
    }
  };

  const handleDragLeave = (event) => {
    const nextTarget = event.relatedTarget;
    if (!nextTarget || !event.currentTarget.contains(nextTarget)) setIsOver(false);
  };

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[120] px-3 pb-3 sm:px-6 sm:pb-5"
      initial={{ y: 120, opacity: 0 }}
      animate={trayPulse ? { y: [0, -22, 0], opacity: 1 } : { y: 0, opacity: 1 }}
      transition={trayPulse ? { duration: 0.62, ease: [0.22, 1, 0.36, 1] } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl">
        <div
          onDragEnter={(event) => { event.preventDefault(); setIsOver(true); }}
          onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; setIsOver(true); }}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative overflow-hidden rounded-[2rem] border p-3 shadow-leaf backdrop-blur-2xl transition duration-300 ${trayPulse ? 'cart-tray-pop scale-[1.018] border-gold bg-forest text-cream ring-4 ring-gold/35' : trayActive ? 'scale-[1.01] border-gold bg-forest text-cream ring-4 ring-gold/30' : 'border-gold/20 bg-deep/95 text-cream ring-1 ring-white/10'}`}
        >
          <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <button type="button" className="flex cursor-default items-center gap-3 text-left" aria-label="Tray summary">
              <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-full transition ${trayActive ? 'bg-gold text-deep animate-pulseGlow' : 'bg-gold text-deep'} ${trayPulse ? 'shadow-glow' : ''}`}><ShoppingBag size={25} /></span>
              <span>
                <span className={`block text-xs font-extrabold uppercase tracking-[0.28em] ${trayActive ? 'text-gold' : 'text-gold'}`}>{showHint ? 'Visible serving tray · drag & drop here' : 'Anna Cafe serving tray'}</span>
                <span className={`block font-display text-2xl font-bold ${trayActive ? 'text-cream' : 'text-cream'}`}>{count ? `${count} item${count > 1 ? 's' : ''} · QAR ${total}` : 'Drop products into the tray'}</span>
                {/* <span className={`mt-1 block text-xs font-semibold uppercase tracking-[0.18em] ${trayActive ? 'text-cream/70' : 'text-cream/60'}`}>Desktop: drag cards down. Mobile: tap Add to tray.</span> */}
              </span>
            </button>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setExpanded(true)} className={`rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] transition ${trayActive ? 'border-white/15 bg-white/10 text-cream hover:bg-white/15' : 'border-white/15 bg-white/10 text-cream hover:bg-white/15'}`}>{expanded ? 'Tray Opened' : 'Open tray'}</button>
              {/* <a href={cart.length ? buildWhatsAppUrl(cart, orderDetails) : '#'} target={cart.length ? '_blank' : undefined} rel="noreferrer" onClick={(event) => { if (!cart.length) event.preventDefault(); }} className={`rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-[0.18em] transition ${cart.length ? 'bg-gold text-deep hover:-translate-y-0.5' : 'bg-white/10 text-cream/40 cursor-not-allowed'}`}>Place on WhatsApp</a> */}
              <button onClick={() => setExpanded((value) => !value)} className={`grid h-10 w-10 place-items-center rounded-full transition ${trayActive ? 'bg-white/12 text-cream' : 'bg-white/10 text-cream'}`} aria-label={expanded ? "Close tray" : "Open tray"}><ChevronDown className={`transition ${expanded ? '' : 'rotate-180'}`} size={18} /></button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                {/* <div className={`mt-4 rounded-[1.4rem] border border-dashed p-4 text-center transition ${trayActive ? 'border-gold bg-gold/15 text-cream' : 'border-gold/30 bg-white/8 text-cream'}`}>
                  <div className="mx-auto flex max-w-2xl items-center justify-center gap-3">
                    <MousePointer2 className={trayActive ? 'text-gold' : 'text-moss'} />
                    <div>
                      <p className="font-display text-2xl font-bold">{trayActive ? 'Release the item to add it' : 'Drop zone is ready'}</p>
                      <p className={`text-sm ${trayActive ? 'text-cream/70' : 'text-cream/60'}`}>Drag any product card onto this tray area, or use the Add to tray button.</p>
                    </div>
                  </div>
                </div> */}

                <div className={`mt-3 max-h-[46vh] overflow-y-auto rounded-[1.4rem] border border-dashed border-gold text-center transition  p-3  ${trayActive ? 'bg-white/10' : 'bg-white/8'}`}>
                  {cart.length === 0 ? (
                    <div className={`grid place-items-center rounded-[1.2rem] p-7 text-center ${trayActive ? 'bg-white/10 text-cream' : 'bg-white/8 text-cream'}`}>
                      <ShoppingBag className={trayActive ? 'text-gold' : 'text-moss'} />
                      <p className="mt-3 font-bold">Your tray is empty.</p>
                      <p className={`mt-1 text-sm ${trayActive ? 'text-cream/70' : 'text-cream/60'}`}>Start with coffee, mojito, cakes, croissants, or sandwiches.</p>
                    </div>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {cart.map((entry) => (
                        <div key={entry.id} className="flex items-center gap-3 rounded-[1.2rem] bg-cream/90 p-3 text-deep shadow-porcelain">
                          <img src={entry.image} alt={entry.name} className="h-16 w-16 object-contain drop-shadow-md" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-bold text-forest">{entry.name}</p>
                            <p className="text-sm text-moss">QAR {entry.price} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(entry.id, -1)} className="grid h-8 w-8 place-items-center rounded-full bg-white text-forest" aria-label={`Remove one ${entry.name}`}><Minus size={14} /></button>
                            <span className="w-6 text-center font-bold">{entry.qty}</span>
                            <button onClick={() => updateQty(entry.id, 1)} className="grid h-8 w-8 place-items-center rounded-full bg-forest text-cream" aria-label={`Add one ${entry.name}`}><Plus size={14} /></button>
                            <button onClick={() => removeItem(entry.id)} className="grid h-8 w-8 place-items-center rounded-full bg-red-50 text-red-700" aria-label={`Remove ${entry.name}`}><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {cart.length > 0 && (
                  <>
                    <div className="mt-3 flex flex-col justify-between gap-3 rounded-[1.4rem] bg-forest p-4 text-cream sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-sageSoft">Total</p>
                        <p className="font-display text-3xl font-bold">QAR {total}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={clearCart} className="rounded-full border border-white/15 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-cream transition hover:bg-white/10">Clear</button>
                        <button type="button" onClick={handleContinueToOrder} className="rounded-full bg-gold px-6 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-deep transition hover:-translate-y-0.5"><Check size={16} className="inline" /> Place order</button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="bg-deep px-5 pb-36 pt-10 text-cream sm:px-8 lg:px-12">
      <div className="container-wide flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-[0.22em]">ANNA CAFE</p>
          <p className="mt-2 text-sm text-cream/55">React + Tailwind multi-page animated concept with drag-to-tray ordering.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(routeTitles).map(([href, label]) => (
            <AppLink key={href} to={href} onNavigate={navigate} className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-cream/70 transition hover:bg-white/10 hover:text-cream">{label}</AppLink>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { path, navigate } = useRoute();
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState({ customerName: '', pickupDeliveryTime: '', notes: '' });
  const [dragActive, setDragActive] = useState(false);

  const addItem = (item, placement = null) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      const newPlacement = placement || null;
      if (existing) {
        return current.map((entry) => (
          entry.id === item.id
            ? { ...entry, qty: entry.qty + 1, placements: [...(entry.placements || []), newPlacement] }
            : entry
        ));
      }
      return [...current, { ...item, qty: 1, placements: [newPlacement] }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((current) => current.map((entry) => {
      if (entry.id !== id) return entry;
      const nextQty = entry.qty + delta;
      const currentPlacements = entry.placements || [];
      const nextPlacements = delta > 0 ? [...currentPlacements, null] : currentPlacements.slice(0, Math.max(0, nextQty));
      return { ...entry, qty: nextQty, placements: nextPlacements };
    }).filter((entry) => entry.qty > 0));
  };

  const removeItem = (id) => setCart((current) => current.filter((entry) => entry.id !== id));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, entry) => sum + entry.qty, 0);

  return (
    <main className="relative overflow-hidden">
      <CursorGlow />
      <Navbar path={path} navigate={navigate} cartCount={cartCount} />
      <AnimatePresence mode="wait">
        <motion.div key={path} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
          {path === '/' && <HomePage navigate={navigate} onAdd={addItem} />}
          {path === '/products' && <ProductsPage navigate={navigate} onAdd={addItem} onDragStartItem={() => setDragActive(true)} onDragEndItem={() => setDragActive(false)} />}
          {path === '/gallery' && <GalleryPage />}
          {path === '/order' && <OrderPage cart={cart} onAdd={addItem} updateQty={updateQty} removeItem={removeItem} clearCart={clearCart} orderDetails={orderDetails} onOrderDetailsChange={setOrderDetails} onDragStartItem={() => setDragActive(true)} onDragEndItem={() => setDragActive(false)} />}
          {path === '/contact' && <ContactPage navigate={navigate} />}
        </motion.div>
      </AnimatePresence>
      <Footer navigate={navigate} />
      {path !== '/order' && <CartTray cart={cart} onDropItem={addItem} updateQty={updateQty} removeItem={removeItem} clearCart={clearCart} navigate={navigate} path={path} dragActive={dragActive} />}
    </main>
  );
}
