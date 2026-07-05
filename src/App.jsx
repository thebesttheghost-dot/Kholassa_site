import React, { useState, useEffect, useMemo, useCallback } from "react";
import { storage } from "./storage";
import {
  Search, Moon, Sun, Heart, Star, User, ShoppingCart, X, Plus, Edit2,
  Trash2, BookOpen, Play, Globe, Menu, Check, Download, ChevronLeft,
  ChevronRight, Sparkles, Clock, Eye, Settings, LogOut
} from "lucide-react";

/* ============================== THEME / TOKENS ============================== */

const THEME = {
  dark: {
    bg: "#0B1120",
    bgElevated: "#121A2E",
    bgCard: "#161F38",
    text: "#F1EFE8",
    textMuted: "#8D96AC",
    border: "rgba(255,255,255,0.08)",
    gold: "#D4AF37",
    goldSoft: "#E7CD6E",
    violet: "#8B5CF6",
    cyan: "#22D3EE",
    emerald: "#34D399",
  },
  light: {
    bg: "#F6F4EE",
    bgElevated: "#FFFFFF",
    bgCard: "#FFFFFF",
    text: "#181B24",
    textMuted: "#6B7280",
    border: "rgba(0,0,0,0.08)",
    gold: "#B4881E",
    goldSoft: "#8C6A16",
    violet: "#7C3AED",
    cyan: "#0891B2",
    emerald: "#059669",
  },
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Tajawal:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');`;

/* ============================== I18N ============================== */

const DICT = {
  ar: {
    brand: "خُلاصة",
    nav_home: "الرئيسية", nav_books: "ملخصات الكتب", nav_anime: "ملخصات الأنمي",
    nav_categories: "التصنيفات", nav_popular: "الأكثر مشاهدة", nav_contact: "تواصل معنا",
    search_ph: "ابحث عن كتاب أو أنمي...",
    hero_title: "اقرأ الجوهر، لا الحشو.",
    hero_sub: "ملخصات عالية الجودة للكتب والأنمي في دقائق معدودة — مجانية ومدفوعة، منظمة بعناية.",
    hero_cta1: "استعرض الملخصات", hero_cta2: "أنشئ حسابًا مجانًا",
    sec_latest: "أحدث الملخصات", sec_popular: "الأشهر الآن", sec_free: "مجانًا للجميع",
    sec_paid: "مختارات مميزة", sec_reco: "مقترحة لك",
    tag_free: "مجاني", tag_paid: "مدفوع",
    read_time: "دقيقة قراءة", rating: "التقييم", reviews: "تقييم",
    btn_read: "قراءة الملخص", btn_buy: "شراء", btn_download: "تحميل",
    btn_fav: "أضف للمفضلة", btn_unfav: "إزالة من المفضلة",
    all_categories: "كل التصنيفات", filter_all: "الكل", filter_free: "مجاني", filter_paid: "مدفوع",
    login: "تسجيل الدخول", logout: "تسجيل الخروج", account: "حسابي",
    favorites: "المفضلة", purchases: "مشترياتي", admin: "لوحة التحكم",
    login_title: "تسجيل الدخول / حساب جديد", name_ph: "الاسم", email_ph: "البريد الإلكتروني",
    continue: "متابعة", cancel: "إلغاء",
    checkout_title: "إتمام الشراء", card_number: "رقم البطاقة", card_name: "الاسم على البطاقة",
    card_exp: "تاريخ الانتهاء", card_cvc: "CVC", pay_now: "ادفع الآن", demo_notice:
      "هذا نموذج تجريبي — لا تُدخل بيانات بطاقة حقيقية. الدفع الفعلي يتطلب ربط بوابة دفع حقيقية.",
    purchase_success: "تم الشراء بنجاح! يمكنك الآن قراءة الملخص كاملًا.",
    about_book: "نبذة عن الكتاب", about_anime: "نبذة عن الأنمي", key_ideas: "أهم الأفكار",
    story_nospoiler: "القصة (بدون حرق)", main_chars: "الشخصيات الرئيسية",
    comments: "التقييمات والتعليقات", write_comment: "اكتب تعليقك...", submit: "إرسال",
    empty_fav: "لا توجد عناصر في المفضلة بعد.", empty_purchase: "لم تقم بشراء أي ملخص بعد.",
    admin_title: "لوحة تحكم المسؤول", add_new: "إضافة ملخص جديد", edit: "تعديل", delete: "حذف",
    save: "حفظ", type_book: "كتاب", type_anime: "أنمي", title_field: "العنوان",
    category_field: "التصنيف", price_field: "السعر (0 = مجاني)", cover_field: "رابط صورة الغلاف",
    desc_field: "النبذة", ideas_field: "أهم الأفكار (سطر لكل فكرة)", chars_field: "الشخصيات (سطر لكل شخصية)",
    time_field: "مدة القراءة/العرض (دقيقة)", stats: "الإحصائيات", total_items: "إجمالي الملخصات",
    total_free: "المجانية", total_paid: "المدفوعة", back: "رجوع", results_for: "نتائج البحث عن",
    no_results: "لا توجد نتائج مطابقة.", contact_msg: "لأي استفسار أو تعاون، راسلنا عبر البريد أدناه.",
    footer_rights: "جميع الحقوق محفوظة.", footer_note: "منصة عربية لملخصات الكتب والأنمي.",
    close: "إغلاق",
  },
  en: {
    brand: "Khulasa",
    nav_home: "Home", nav_books: "Book Summaries", nav_anime: "Anime Summaries",
    nav_categories: "Categories", nav_popular: "Most Viewed", nav_contact: "Contact",
    search_ph: "Search books or anime...",
    hero_title: "Read the essence, skip the filler.",
    hero_sub: "Premium book & anime summaries in minutes — free and paid, curated with care.",
    hero_cta1: "Browse Summaries", hero_cta2: "Create Free Account",
    sec_latest: "Latest Summaries", sec_popular: "Trending Now", sec_free: "Free For Everyone",
    sec_paid: "Featured Picks", sec_reco: "Recommended For You",
    tag_free: "Free", tag_paid: "Paid",
    read_time: "min read", rating: "Rating", reviews: "reviews",
    btn_read: "Read Summary", btn_buy: "Buy", btn_download: "Download",
    btn_fav: "Add to Favorites", btn_unfav: "Remove from Favorites",
    all_categories: "All Categories", filter_all: "All", filter_free: "Free", filter_paid: "Paid",
    login: "Log In", logout: "Log Out", account: "Account",
    favorites: "Favorites", purchases: "My Purchases", admin: "Admin Panel",
    login_title: "Log In / New Account", name_ph: "Name", email_ph: "Email",
    continue: "Continue", cancel: "Cancel",
    checkout_title: "Checkout", card_number: "Card Number", card_name: "Name on Card",
    card_exp: "Expiry", card_cvc: "CVC", pay_now: "Pay Now", demo_notice:
      "This is a demo — do not enter real card details. Real payments require a real payment gateway integration.",
    purchase_success: "Purchase successful! You can now read the full summary.",
    about_book: "About the Book", about_anime: "About the Anime", key_ideas: "Key Ideas",
    story_nospoiler: "Story (Spoiler-Free)", main_chars: "Main Characters",
    comments: "Ratings & Comments", write_comment: "Write a comment...", submit: "Submit",
    empty_fav: "No favorites yet.", empty_purchase: "No purchases yet.",
    admin_title: "Admin Dashboard", add_new: "Add New Summary", edit: "Edit", delete: "Delete",
    save: "Save", type_book: "Book", type_anime: "Anime", title_field: "Title",
    category_field: "Category", price_field: "Price (0 = free)", cover_field: "Cover Image URL",
    desc_field: "Description", ideas_field: "Key Ideas (one per line)", chars_field: "Characters (one per line)",
    time_field: "Read/Watch Time (min)", stats: "Statistics", total_items: "Total Summaries",
    total_free: "Free", total_paid: "Paid", back: "Back", results_for: "Search results for",
    no_results: "No matching results.", contact_msg: "For questions or partnerships, email us below.",
    footer_rights: "All rights reserved.", footer_note: "An Arabic platform for book & anime summaries.",
    close: "Close",
  },
};

const BOOK_CATS_AR = ["تطوير الذات", "ريادة الأعمال", "المال والاستثمار", "البرمجة", "التسويق", "علم النفس"];
const BOOK_CATS_EN = ["Self Growth", "Entrepreneurship", "Money & Investing", "Programming", "Marketing", "Psychology"];
const ANIME_CATS_AR = ["أكشن", "مغامرات", "خيال", "دراما", "غموض"];
const ANIME_CATS_EN = ["Action", "Adventure", "Fantasy", "Drama", "Mystery"];

/* ============================== SEED DATA ============================== */

function seedData() {
  const books = [
    { id: "b1", type: "book", title: "العادات الذرية", category: "تطوير الذات", price: 0, cover: "https://picsum.photos/seed/atomichabits/500/700", time: 12, desc: "كيف تبني عادات صغيرة تؤدي إلى نتائج كبيرة بمرور الوقت، عبر نظام تدريجي قابل للتطبيق.", ideas: ["التغيير الصغير المتكرر يصنع فرقًا هائلًا على المدى الطويل", "ركّز على الهوية التي تريد بناءها، لا فقط على النتيجة", "اجعل العادة الجيدة واضحة وسهلة وجاذبة", "البيئة أقوى من قوة الإرادة"], rating: 4.7, ratingsCount: 312, views: 5400 },
    { id: "b2", type: "book", title: "التفكير السريع والبطيء", category: "علم النفس", price: 19, cover: "https://picsum.photos/seed/thinkfastslow/500/700", time: 18, desc: "استكشاف لنظامي التفكير في عقلنا: السريع الحدسي، والبطيء التحليلي، وكيف يؤثران في قراراتنا.", ideas: ["النظام الأول سريع وحدسي وعاطفي", "النظام الثاني بطيء ومنطقي ويحتاج جهدًا", "نحن عُرضة لتحيزات معرفية منتظمة", "الثقة الزائدة بالحدس قد تُضلّلنا في القرارات المعقدة"], rating: 4.5, ratingsCount: 201, views: 3900 },
    { id: "b3", type: "book", title: "الأب الغني والأب الفقير", category: "المال والاستثمار", price: 0, cover: "https://picsum.photos/seed/richdadpoordad/500/700", time: 10, desc: "مقارنة بين عقليتين ماليتين مختلفتين، وكيف تشكل نظرتك للأصول والخصوم مستقبلك المالي.", ideas: ["الأصول تضع مالًا في جيبك، الخصوم تُخرجه", "الذكاء المالي أهم من مقدار الدخل", "استثمر في التعليم المالي أولًا"], rating: 4.3, ratingsCount: 480, views: 8100 },
    { id: "b4", type: "book", title: "البدء بالسؤال: لماذا", category: "ريادة الأعمال", price: 15, cover: "https://picsum.photos/seed/startwithwhy/500/700", time: 14, desc: "كيف تُلهم القادة والشركات العظيمة الناس عبر التركيز على 'السبب' قبل 'الكيف' و'الماذا'.", ideas: ["الناس لا يشترون ما تفعله، بل يشترون سبب فعلك له", "دائرة الذهب الأصفر: لماذا، كيف، ماذا", "القيادة الملهمة تبدأ من الداخل إلى الخارج"], rating: 4.4, ratingsCount: 156, views: 2600 },
    { id: "b5", type: "book", title: "أساسيات البرمجة النظيفة", category: "البرمجة", price: 0, cover: "https://picsum.photos/seed/cleancode/500/700", time: 20, desc: "مبادئ عملية لكتابة كود مقروء وقابل للصيانة يفهمه أي مطور بسهولة.", ideas: ["الأسماء الواضحة توفّر وقت الفهم لاحقًا", "الدالة الجيدة تفعل شيئًا واحدًا فقط", "التعليقات لا تعوّض عن كود سيئ"], rating: 4.6, ratingsCount: 98, views: 1450 },
  ];
  const anime = [
    { id: "a1", type: "anime", title: "رحلة الحديد الصاعد", category: "أكشن", price: 0, cover: "https://picsum.photos/seed/ironascent/500/700", time: 8, desc: "في عالم مقسّم بالتقنية القديمة، ينطلق شاب عادي في رحلة لاكتشاف قوة كامنة بداخله.", chars: ["كايتو — البطل، شاب مصمم يحمل سرًّا عائليًا", "ريو — الرفيق الحكيم صاحب الخبرة القتالية", "ميرا — قائدة فصيل منافس بأهداف غامضة"], rating: 4.2, ratingsCount: 240, views: 4700 },
    { id: "a2", type: "anime", title: "ظلال الأكاديمية", category: "غموض", price: 12, cover: "https://picsum.photos/seed/shadowacademy/500/700", time: 9, desc: "أكاديمية نخبوية تُخفي أسرارًا مظلمة، وطالبة جديدة تبدأ في كشف الحقيقة خيطًا بخيط.", chars: ["نور — الطالبة الجديدة الفضولية", "الأستاذ فارس — شخصية غامضة يصعب الوثوق بها"], rating: 4.6, ratingsCount: 175, views: 3300 },
    { id: "a3", type: "anime", title: "أساطير البحر المفقود", category: "مغامرات", price: 0, cover: "https://picsum.photos/seed/lostsea/500/700", time: 7, desc: "طاقم من المغامرين يبحث عن جزيرة أسطورية يُقال إنها تحوي مفتاح ماضٍ نُسي.", chars: ["الكابتن سالم — قائد الطاقم العنيد", "لونا — خبيرة الخرائط القديمة"], rating: 4.0, ratingsCount: 89, views: 1900 },
    { id: "a4", type: "anime", title: "قلب من زجاج", category: "دراما", price: 10, cover: "https://picsum.photos/seed/glassheart/500/700", time: 11, desc: "قصة إنسانية عن فتاة تتعلم مواجهة خوفها من الفقدان بعد حادثة غيّرت حياتها.", chars: ["هانا — الشخصية الرئيسية الهادئة", "يوسف — صديق الطفولة الداعم"], rating: 4.8, ratingsCount: 302, views: 6200 },
  ];
  return [...books, ...anime];
}

/* ============================== HELPERS ============================== */

function useThemeVars(theme) {
  return THEME[theme];
}

function StarRow({ value, size = 14 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {stars.map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= Math.round(value) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

/* ============================== CARD (signature element) ============================== */

function SummaryCard({ item, t, theme, isFav, onToggleFav, onOpen, lang }) {
  const isBook = item.type === "book";
  const accent = isBook ? theme.gold : theme.violet;
  const bg = theme.bgCard;

  return (
    <div
      onClick={() => onOpen(item.id)}
      style={{
        background: bg,
        border: `1px solid ${theme.border}`,
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform .25s ease, box-shadow .25s ease",
        position: "relative",
      }}
      className="group hover:-translate-y-1 hover:shadow-2xl"
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img
          src={item.cover}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)",
          }}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(item.id); }}
          title={isFav ? t.btn_unfav : t.btn_fav}
          style={{
            position: "absolute", top: 10, insetInlineEnd: 10,
            background: "rgba(0,0,0,0.45)", borderRadius: "50%",
            width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Heart size={16} color="#fff" fill={isFav ? "#fff" : "none"} />
        </button>
        <span
          style={{
            position: "absolute", top: 10, insetInlineStart: 10,
            background: item.price === 0 ? theme.emerald : accent,
            color: "#0B1120", fontWeight: 700, fontSize: 11,
            padding: "3px 10px", borderRadius: 999,
          }}
        >
          {item.price === 0 ? t.tag_free : `${t.tag_paid} · $${item.price}`}
        </span>
      </div>

      {/* Signature strip: ticket-stub for books, film-sprockets for anime */}
      {isBook ? (
        <div style={{ position: "relative", height: 14 }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, borderTop: `2px dashed ${theme.border}`,
          }} />
          <div style={{
            position: "absolute", top: -7, left: -7, width: 14, height: 14, borderRadius: "50%",
            background: theme.bg,
          }} />
          <div style={{
            position: "absolute", top: -7, right: -7, width: 14, height: 14, borderRadius: "50%",
            background: theme.bg,
          }} />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", background: theme.bgElevated }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: 2, background: theme.bg, marginTop: -3, marginBottom: -3 }} />
          ))}
        </div>
      )}

      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{ fontFamily: "Cairo, sans-serif", fontWeight: 800, fontSize: 16, color: theme.text, marginBottom: 4, lineHeight: 1.4 }}>
          {item.title}
        </h3>
        <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>{item.category}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: theme.textMuted }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={13} /> {item.time} {t.read_time}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, color: accent }}>
            <StarRow value={item.rating} size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================== MAIN APP ============================== */

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("ar");
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [comments, setComments] = useState({});
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const t = DICT[lang];
  const c = THEME[theme];
  const dir = lang === "ar" ? "rtl" : "ltr";

  /* ---------- Load / seed data ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await storage.get("summaries", true);
        setSummaries(res ? JSON.parse(res.value) : seedData());
        if (!res) await storage.set("summaries", JSON.stringify(seedData()), true);
      } catch {
        const seed = seedData();
        setSummaries(seed);
        try { await storage.set("summaries", JSON.stringify(seed), true); } catch {}
      }
      try {
        const res = await storage.get("comments", true);
        setComments(res ? JSON.parse(res.value) : {});
      } catch { setComments({}); }
      try {
        const res = await storage.get("account", false);
        setAccount(res ? JSON.parse(res.value) : null);
      } catch { setAccount(null); }
      try {
        const res = await storage.get("favorites", false);
        setFavorites(res ? JSON.parse(res.value) : []);
      } catch { setFavorites([]); }
      try {
        const res = await storage.get("purchases", false);
        setPurchases(res ? JSON.parse(res.value) : []);
      } catch { setPurchases([]); }
      setLoaded(true);
    })();
  }, []);

  const persistSummaries = useCallback(async (next) => {
    setSummaries(next);
    try { await storage.set("summaries", JSON.stringify(next), true); } catch {}
  }, []);
  const persistFavorites = useCallback(async (next) => {
    setFavorites(next);
    try { await storage.set("favorites", JSON.stringify(next), false); } catch {}
  }, []);
  const persistPurchases = useCallback(async (next) => {
    setPurchases(next);
    try { await storage.set("purchases", JSON.stringify(next), false); } catch {}
  }, []);
  const persistComments = useCallback(async (next) => {
    setComments(next);
    try { await storage.set("comments", JSON.stringify(next), true); } catch {}
  }, []);
  const persistAccount = useCallback(async (next) => {
    setAccount(next);
    try { await storage.set("account", JSON.stringify(next), false); } catch {}
  }, []);

  const toggleFav = (id) => {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    persistFavorites(next);
  };

  const books = useMemo(() => summaries.filter((s) => s.type === "book"), [summaries]);
  const animes = useMemo(() => summaries.filter((s) => s.type === "anime"), [summaries]);

  const openItem = (id) => { setSelectedId(id); setView("detail"); setMenuOpen(false); window.scrollTo?.(0, 0); };

  const filteredList = (list) => list.filter((it) => {
    const catOk = catFilter === "all" || it.category === catFilter;
    const priceOk = priceFilter === "all" || (priceFilter === "free" ? it.price === 0 : it.price > 0);
    const searchOk = !search || it.title.toLowerCase().includes(search.toLowerCase());
    return catOk && priceOk && searchOk;
  });

  const globalSearchResults = useMemo(() => {
    if (!search) return [];
    return summaries.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, summaries]);

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Sparkles color={c.gold} size={32} className="animate-pulse" />
      </div>
    );
  }

  return (
    <div dir={dir} style={{ minHeight: "100vh", background: c.bg, color: c.text, fontFamily: "Tajawal, 'Inter', sans-serif", transition: "background .3s" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        ::selection { background: ${c.gold}; color: #0B1120; }
        input, textarea { font-family: inherit; }
        .container-w { max-width: 1180px; margin: 0 auto; padding: 0 20px; }
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
        .btn-primary { background: ${c.gold}; color: #0B1120; font-weight: 700; border-radius: 999px; padding: 10px 22px; transition: opacity .2s; }
        .btn-primary:hover { opacity: .88; }
        .btn-outline { border: 1px solid ${c.border}; color: ${c.text}; border-radius: 999px; padding: 10px 22px; }
      `}</style>

      <Header
        t={t} c={c} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang}
        view={view} setView={setView} account={account} setShowLogin={setShowLogin}
        search={search} setSearch={setSearch} menuOpen={menuOpen} setMenuOpen={setMenuOpen}
        logout={() => persistAccount(null)}
      />

      {successMsg && (
        <div style={{ position: "fixed", top: 80, insetInlineEnd: 20, zIndex: 100, background: c.emerald, color: "#08160f", padding: "10px 18px", borderRadius: 12, fontWeight: 700, boxShadow: "0 10px 30px rgba(0,0,0,.3)" }}>
          {successMsg}
        </div>
      )}

      {search && view !== "detail" && (
        <div className="container-w" style={{ paddingTop: 24 }}>
          <h2 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 20, marginBottom: 14 }}>{t.results_for} "{search}"</h2>
          {globalSearchResults.length === 0 ? (
            <p style={{ color: c.textMuted }}>{t.no_results}</p>
          ) : (
            <Grid items={globalSearchResults} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />
          )}
        </div>
      )}

      {!search && view === "home" && (
        <Home t={t} c={c} lang={lang} setView={setView} summaries={summaries} favorites={favorites}
          toggleFav={toggleFav} openItem={openItem} theme={theme} />
      )}

      {!search && (view === "books" || view === "anime") && (
        <BrowseSection
          t={t} c={c} lang={lang} type={view}
          list={filteredList(view === "books" ? books : animes)}
          catFilter={catFilter} setCatFilter={setCatFilter}
          priceFilter={priceFilter} setPriceFilter={setPriceFilter}
          favorites={favorites} toggleFav={toggleFav} openItem={openItem}
          categories={view === "books" ? (lang === "ar" ? BOOK_CATS_AR : BOOK_CATS_EN) : (lang === "ar" ? ANIME_CATS_AR : ANIME_CATS_EN)}
        />
      )}

      {!search && view === "detail" && selectedId && (
        <DetailView
          t={t} c={c} lang={lang}
          item={summaries.find((s) => s.id === selectedId)}
          isFav={favorites.includes(selectedId)}
          toggleFav={toggleFav}
          isPurchased={purchases.some((p) => p.id === selectedId)}
          onBuy={(item) => account ? setCheckoutItem(item) : setShowLogin(true)}
          onBack={() => setView(summaries.find((s) => s.id === selectedId)?.type === "book" ? "books" : "anime")}
          comments={comments[selectedId] || []}
          onComment={(c2) => {
            const next = { ...comments, [selectedId]: [...(comments[selectedId] || []), c2] };
            persistComments(next);
          }}
          account={account}
        />
      )}

      {!search && view === "favorites" && (
        <div className="container-w" style={{ padding: "32px 0 60px" }}>
          <h2 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 24, marginBottom: 20 }}>{t.favorites}</h2>
          {favorites.length === 0 ? <p style={{ color: c.textMuted }}>{t.empty_fav}</p> :
            <Grid items={summaries.filter((s) => favorites.includes(s.id))} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />}
        </div>
      )}

      {!search && view === "purchases" && (
        <div className="container-w" style={{ padding: "32px 0 60px" }}>
          <h2 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 24, marginBottom: 20 }}>{t.purchases}</h2>
          {purchases.length === 0 ? <p style={{ color: c.textMuted }}>{t.empty_purchase}</p> :
            <Grid items={summaries.filter((s) => purchases.some((p) => p.id === s.id))} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />}
        </div>
      )}

      {!search && view === "contact" && (
        <div className="container-w" style={{ padding: "60px 0", maxWidth: 560 }}>
          <h2 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 24, marginBottom: 10 }}>{t.nav_contact}</h2>
          <p style={{ color: c.textMuted, marginBottom: 16 }}>{t.contact_msg}</p>
          <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18, fontFamily: "Inter" }}>
            support@khulasa.example
          </div>
        </div>
      )}

      {!search && view === "admin" && (
        <AdminPanel t={t} c={c} lang={lang} summaries={summaries} setSummaries={persistSummaries} />
      )}

      <Footer t={t} c={c} setView={setView} />

      {showLogin && (
        <AuthModal t={t} c={c} onClose={() => setShowLogin(false)} onSubmit={(acc) => { persistAccount(acc); setShowLogin(false); }} />
      )}

      {checkoutItem && (
        <CheckoutModal
          t={t} c={c} item={checkoutItem}
          onClose={() => setCheckoutItem(null)}
          onPay={() => {
            const next = [...purchases, { id: checkoutItem.id, date: new Date().toISOString(), price: checkoutItem.price }];
            persistPurchases(next);
            setCheckoutItem(null);
            setSuccessMsg(t.purchase_success);
            setTimeout(() => setSuccessMsg(""), 3500);
          }}
        />
      )}
    </div>
  );
}

/* ============================== HEADER ============================== */

function Header({ t, c, theme, setTheme, lang, setLang, view, setView, account, setShowLogin, search, setSearch, menuOpen, setMenuOpen, logout }) {
  const navItem = (key, label) => (
    <button
      onClick={() => { setView(key); setMenuOpen(false); }}
      style={{
        color: view === key ? c.gold : c.textMuted, fontWeight: 600, fontSize: 14,
        background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: `${c.bgElevated}E8`, backdropFilter: "blur(10px)", borderBottom: `1px solid ${c.border}` }}>
      <div className="container-w" style={{ display: "flex", alignItems: "center", gap: 20, height: 68 }}>
        <button onClick={() => setView("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.gold}, ${c.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={17} color="#0B1120" />
          </div>
          <span style={{ fontFamily: "Cairo", fontWeight: 900, fontSize: 19, color: c.text }}>{t.brand}</span>
        </button>

        <nav className="hide-mobile" style={{ display: "flex", gap: 22, flex: 1 }}>
          {navItem("home", t.nav_home)}
          {navItem("books", t.nav_books)}
          {navItem("anime", t.nav_anime)}
          {navItem("favorites", t.favorites)}
          {navItem("contact", t.nav_contact)}
        </nav>

        <div className="hide-mobile" style={{ position: "relative", flex: "0 0 220px" }}>
          <Search size={15} style={{ position: "absolute", insetInlineStart: 12, top: 10, color: c.textMuted }} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search_ph}
            style={{ width: "100%", background: c.bg, border: `1px solid ${c.border}`, borderRadius: 999, padding: "8px 14px 8px 34px", color: c.text, fontSize: 13, outline: "none" }}
          />
        </div>

        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} title="Language" style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted }}>
          <Globe size={19} />
        </button>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Theme" style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted }}>
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {account ? (
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setView("purchases")} title={t.purchases} style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted }}>
              <ShoppingCart size={19} />
            </button>
            <button onClick={() => setView("admin")} title={t.admin} style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted }}>
              <Settings size={19} />
            </button>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: c.gold, color: "#0B1120", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 }}>
              {account.name?.[0]?.toUpperCase() || "?"}
            </div>
            <button onClick={logout} title={t.logout} style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted }}>
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button className="hide-mobile btn-primary" onClick={() => setShowLogin(true)} style={{ fontSize: 13, padding: "8px 18px" }}>
            {t.login}
          </button>
        )}

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: c.text }} className="hide-mobile-none">
          <Menu size={22} className="hide-mobile" style={{ display: "none" }} />
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: c.text, display: window.innerWidth < 769 ? "block" : "none" }}>
          <Menu size={22} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ borderTop: `1px solid ${c.border}`, padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ position: "relative" }}>
            <Search size={15} style={{ position: "absolute", insetInlineStart: 12, top: 10, color: c.textMuted }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search_ph}
              style={{ width: "100%", background: c.bg, border: `1px solid ${c.border}`, borderRadius: 999, padding: "8px 14px 8px 34px", color: c.text, fontSize: 13, outline: "none" }} />
          </div>
          {navItem("home", t.nav_home)}
          {navItem("books", t.nav_books)}
          {navItem("anime", t.nav_anime)}
          {navItem("favorites", t.favorites)}
          {navItem("purchases", t.purchases)}
          {navItem("contact", t.nav_contact)}
          {account ? (
            <>
              {navItem("admin", t.admin)}
              <button onClick={logout} style={{ color: c.textMuted, background: "none", border: "none", textAlign: lang === "ar" ? "right" : "left" }}>{t.logout}</button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => setShowLogin(true)}>{t.login}</button>
          )}
        </div>
      )}
    </header>
  );
}

/* ============================== HOME ============================== */

function Grid({ items, t, c, favorites, toggleFav, openItem, lang }) {
  if (items.length === 0) return <p style={{ color: c.textMuted }}>{t.no_results}</p>;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
      {items.map((it) => (
        <SummaryCard key={it.id} item={it} t={t} theme={c} isFav={favorites.includes(it.id)} onToggleFav={toggleFav} onOpen={openItem} lang={lang} />
      ))}
    </div>
  );
}

function SectionRow({ title, items, t, c, favorites, toggleFav, openItem, lang }) {
  if (items.length === 0) return null;
  return (
    <section style={{ marginTop: 46 }}>
      <h2 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 21, marginBottom: 16, color: c.text }}>{title}</h2>
      <Grid items={items} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />
    </section>
  );
}

function Home({ t, c, lang, setView, summaries, favorites, toggleFav, openItem, theme }) {
  const latest = [...summaries].slice(-4).reverse();
  const popular = [...summaries].sort((a, b) => b.views - a.views).slice(0, 4);
  const free = summaries.filter((s) => s.price === 0).slice(0, 4);
  const paid = summaries.filter((s) => s.price > 0).slice(0, 4);
  const featured = summaries[0];

  return (
    <div className="container-w" style={{ paddingBottom: 60 }}>
      {/* HERO */}
      <section style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32, padding: "56px 0 20px" }}>
        <div style={{ flex: "1 1 420px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: c.gold, fontSize: 13, fontWeight: 700, marginBottom: 14 }}>
            <Sparkles size={15} /> {t.brand}
          </span>
          <h1 style={{ fontFamily: "Cairo", fontWeight: 900, fontSize: "clamp(30px, 5vw, 48px)", lineHeight: 1.25, marginBottom: 16 }}>
            {t.hero_title}
          </h1>
          <p style={{ color: c.textMuted, fontSize: 16, lineHeight: 1.8, marginBottom: 26, maxWidth: 460 }}>{t.hero_sub}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setView("books")}>{t.hero_cta1}</button>
            <button className="btn-outline" onClick={() => setView("home")}>{t.hero_cta2}</button>
          </div>
        </div>
        {featured && (
          <div onClick={() => openItem(featured.id)} style={{ flex: "1 1 280px", maxWidth: 320, cursor: "pointer", position: "relative" }}>
            <div style={{ position: "absolute", inset: -14, background: `radial-gradient(circle, ${theme === "dark" ? c.gold : c.gold}22, transparent 70%)` }} />
            <img src={featured.cover} alt={featured.title} style={{ width: "100%", borderRadius: 20, position: "relative", boxShadow: "0 30px 60px rgba(0,0,0,.35)" }} />
          </div>
        )}
      </section>

      <SectionRow title={t.sec_latest} items={latest} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />
      <SectionRow title={t.sec_popular} items={popular} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />
      <SectionRow title={t.sec_free} items={free} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />
      <SectionRow title={t.sec_paid} items={paid} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />
    </div>
  );
}

/* ============================== BROWSE ============================== */

function BrowseSection({ t, c, lang, type, list, catFilter, setCatFilter, priceFilter, setPriceFilter, favorites, toggleFav, openItem, categories }) {
  return (
    <div className="container-w" style={{ padding: "32px 0 60px" }}>
      <h2 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 26, marginBottom: 18 }}>
        {type === "books" ? t.nav_books : t.nav_anime}
      </h2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        <SelectPill value={catFilter} onChange={setCatFilter} c={c} options={[{ v: "all", l: t.all_categories }, ...categories.map((x) => ({ v: x, l: x }))]} />
        <SelectPill value={priceFilter} onChange={setPriceFilter} c={c} options={[{ v: "all", l: t.filter_all }, { v: "free", l: t.filter_free }, { v: "paid", l: t.filter_paid }]} />
      </div>
      <Grid items={list} t={t} c={c} favorites={favorites} toggleFav={toggleFav} openItem={openItem} lang={lang} />
    </div>
  );
}

function SelectPill({ value, onChange, options, c }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{ background: c.bgCard, border: `1px solid ${c.border}`, color: c.text, borderRadius: 999, padding: "8px 14px", fontSize: 13, outline: "none" }}>
      {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

/* ============================== DETAIL VIEW ============================== */

function DetailView({ t, c, lang, item, isFav, toggleFav, isPurchased, onBuy, onBack, comments, onComment, account }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  if (!item) return null;
  const isBook = item.type === "book";
  const unlocked = item.price === 0 || isPurchased;

  return (
    <div className="container-w" style={{ padding: "28px 0 60px" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", marginBottom: 20, fontSize: 13 }}>
        {lang === "ar" ? <ChevronRight size={16} /> : <ChevronLeft size={16} />} {t.back}
      </button>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <img src={item.cover} alt={item.title} style={{ width: 240, borderRadius: 18, boxShadow: "0 20px 50px rgba(0,0,0,.35)", flexShrink: 0 }} />
        <div style={{ flex: "1 1 320px" }}>
          <span style={{ color: isBook ? c.gold : c.violet, fontWeight: 700, fontSize: 12 }}>{item.category}</span>
          <h1 style={{ fontFamily: "Cairo", fontWeight: 900, fontSize: 30, margin: "6px 0 10px" }}>{item.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, color: c.textMuted, fontSize: 13 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={14} /> {item.time} {t.read_time}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: c.gold }}><StarRow value={item.rating} /> ({item.ratingsCount} {t.reviews})</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Eye size={14} /> {item.views}</span>
          </div>
          <p style={{ color: c.textMuted, lineHeight: 1.9, marginBottom: 20, maxWidth: 560 }}>{item.desc}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {unlocked ? (
              <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Download size={16} /> {isBook ? t.btn_read : t.btn_read}
              </button>
            ) : (
              <button className="btn-primary" onClick={() => onBuy(item)} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ShoppingCart size={16} /> {t.btn_buy} · ${item.price}
              </button>
            )}
            <button className="btn-outline" onClick={() => toggleFav(item.id)} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Heart size={16} fill={isFav ? c.gold : "none"} color={isFav ? c.gold : c.text} /> {isFav ? t.btn_unfav : t.btn_fav}
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
        <div>
          <h3 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 18, marginBottom: 14 }}>
            {isBook ? t.key_ideas : t.story_nospoiler}
          </h3>
          {isBook ? (
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(unlocked ? item.ideas : item.ideas?.slice(0, 2))?.map((idea, i) => (
                <li key={i} style={{ display: "flex", gap: 10, color: c.textMuted, lineHeight: 1.7 }}>
                  <Check size={16} color={c.gold} style={{ flexShrink: 0, marginTop: 3 }} /> {idea}
                </li>
              ))}
              {!unlocked && <li style={{ color: c.textMuted, fontStyle: "italic" }}>...{t.btn_buy} {t.results_for && ""}</li>}
            </ul>
          ) : (
            <p style={{ color: c.textMuted, lineHeight: 1.9 }}>{item.desc}</p>
          )}
        </div>
        {!isBook && (
          <div>
            <h3 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 18, marginBottom: 14 }}>{t.main_chars}</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {item.chars?.map((ch, i) => (
                <li key={i} style={{ display: "flex", gap: 10, color: c.textMuted, lineHeight: 1.7 }}>
                  <Sparkles size={15} color={c.violet} style={{ flexShrink: 0, marginTop: 3 }} /> {ch}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Comments */}
      <div style={{ marginTop: 48 }}>
        <h3 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 18, marginBottom: 16 }}>{t.comments}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {comments.length === 0 && <p style={{ color: c.textMuted, fontSize: 13 }}>—</p>}
          {comments.map((cm, i) => (
            <div key={i} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{cm.name}</span>
                <span style={{ color: c.gold }}><StarRow value={cm.rating} size={12} /></span>
              </div>
              <p style={{ color: c.textMuted, fontSize: 13 }}>{cm.comment}</p>
            </div>
          ))}
        </div>
        {account && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}
              style={{ background: c.bgCard, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "8px 12px" }}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{"★".repeat(r)}</option>)}
            </select>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder={t.write_comment}
              style={{ flex: 1, minWidth: 200, background: c.bgCard, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "8px 12px", outline: "none" }} />
            <button className="btn-primary" onClick={() => { if (!text.trim()) return; onComment({ name: account.name, rating, comment: text }); setText(""); }}>
              {t.submit}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================== AUTH MODAL ============================== */

function ModalShell({ c, onClose, title, children, width = 400 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: c.bgElevated, borderRadius: 18, padding: 26, width: "100%", maxWidth: width, border: `1px solid ${c.border}`, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 19, color: c.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted }}><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AuthModal({ t, c, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <ModalShell c={c} onClose={onClose} title={t.login_title}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.name_ph}
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "10px 14px", outline: "none" }} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.email_ph}
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "10px 14px", outline: "none" }} />
        <button className="btn-primary" disabled={!name.trim()} onClick={() => onSubmit({ name, email })}>
          {t.continue}
        </button>
      </div>
    </ModalShell>
  );
}

/* ============================== CHECKOUT MODAL ============================== */

function CheckoutModal({ t, c, item, onClose, onPay }) {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  return (
    <ModalShell c={c} onClose={onClose} title={t.checkout_title}>
      <div style={{ marginBottom: 14, padding: 12, borderRadius: 10, background: c.bgCard, display: "flex", justifyContent: "space-between", fontSize: 14 }}>
        <span>{item.title}</span><strong>${item.price}</strong>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input value={num} onChange={(e) => setNum(e.target.value)} placeholder={t.card_number} maxLength={19}
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "10px 14px", outline: "none" }} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.card_name}
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "10px 14px", outline: "none" }} />
        <div style={{ display: "flex", gap: 10 }}>
          <input placeholder={t.card_exp} style={{ flex: 1, background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "10px 14px", outline: "none" }} />
          <input placeholder={t.card_cvc} style={{ flex: 1, background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "10px 14px", outline: "none" }} />
        </div>
        <p style={{ fontSize: 11.5, color: c.textMuted, lineHeight: 1.6 }}>{t.demo_notice}</p>
        <button className="btn-primary" onClick={onPay}>{t.pay_now}</button>
      </div>
    </ModalShell>
  );
}

/* ============================== ADMIN PANEL ============================== */

function emptyForm() {
  return { type: "book", title: "", category: "", price: 0, cover: "", desc: "", time: 10, ideas: "", chars: "" };
}

function AdminPanel({ t, c, lang, summaries, setSummaries }) {
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);

  const stats = {
    total: summaries.length,
    free: summaries.filter((s) => s.price === 0).length,
    paid: summaries.filter((s) => s.price > 0).length,
  };

  const submit = () => {
    if (!form.title.trim()) return;
    const base = {
      title: form.title, category: form.category, price: Number(form.price) || 0,
      cover: form.cover || `https://picsum.photos/seed/${encodeURIComponent(form.title)}/500/700`,
      desc: form.desc, time: Number(form.time) || 5, type: form.type,
      rating: 4.5, ratingsCount: 0, views: 0,
      ...(form.type === "book" ? { ideas: form.ideas.split("\n").filter(Boolean) } : { chars: form.chars.split("\n").filter(Boolean) }),
    };
    if (editingId) {
      setSummaries(summaries.map((s) => (s.id === editingId ? { ...s, ...base } : s)));
    } else {
      setSummaries([...summaries, { id: `x${Date.now()}`, ...base }]);
    }
    setForm(emptyForm());
    setEditingId(null);
  };

  const edit = (item) => {
    setEditingId(item.id);
    setForm({
      type: item.type, title: item.title, category: item.category, price: item.price,
      cover: item.cover, desc: item.desc || "", time: item.time,
      ideas: (item.ideas || []).join("\n"), chars: (item.chars || []).join("\n"),
    });
  };

  const remove = (id) => setSummaries(summaries.filter((s) => s.id !== id));

  const inputStyle = { background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 10, padding: "9px 12px", outline: "none", width: "100%" };

  return (
    <div className="container-w" style={{ padding: "32px 0 60px" }}>
      <h2 style={{ fontFamily: "Cairo", fontWeight: 800, fontSize: 24, marginBottom: 20 }}>{t.admin_title}</h2>

      <div style={{ display: "flex", gap: 14, marginBottom: 30, flexWrap: "wrap" }}>
        {[[t.total_items, stats.total], [t.total_free, stats.free], [t.total_paid, stats.paid]].map(([label, val], i) => (
          <div key={i} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 22px", minWidth: 140 }}>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "Inter", color: c.gold }}>{val}</div>
            <div style={{ fontSize: 12, color: c.textMuted }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 380px) 1fr", gap: 28 }}>
        <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 16, padding: 20, alignSelf: "start" }}>
          <h3 style={{ fontWeight: 800, marginBottom: 14 }}>{editingId ? t.edit : t.add_new}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={inputStyle}>
              <option value="book">{t.type_book}</option>
              <option value="anime">{t.type_anime}</option>
            </select>
            <input placeholder={t.title_field} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
            <input placeholder={t.category_field} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle} />
            <input placeholder={t.price_field} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} />
            <input placeholder={t.time_field} type="number" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} style={inputStyle} />
            <input placeholder={t.cover_field} value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} style={inputStyle} />
            <textarea placeholder={t.desc_field} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} style={inputStyle} />
            {form.type === "book" ? (
              <textarea placeholder={t.ideas_field} value={form.ideas} onChange={(e) => setForm({ ...form, ideas: e.target.value })} rows={4} style={inputStyle} />
            ) : (
              <textarea placeholder={t.chars_field} value={form.chars} onChange={(e) => setForm({ ...form, chars: e.target.value })} rows={4} style={inputStyle} />
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={submit}>{t.save}</button>
              {editingId && <button className="btn-outline" onClick={() => { setEditingId(null); setForm(emptyForm()); }}>{t.cancel}</button>}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {summaries.map((s) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 12, padding: 10 }}>
              <img src={s.cover} alt="" style={{ width: 44, height: 60, objectFit: "cover", borderRadius: 8 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                <div style={{ fontSize: 12, color: c.textMuted }}>{s.category} · {s.price === 0 ? t.tag_free : `$${s.price}`}</div>
              </div>
              <button onClick={() => edit(s)} style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer" }}><Edit2 size={16} /></button>
              <button onClick={() => remove(s.id)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================== FOOTER ============================== */

function Footer({ t, c, setView }) {
  return (
    <footer style={{ borderTop: `1px solid ${c.border}`, marginTop: 40 }}>
      <div className="container-w" style={{ padding: "30px 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, color: c.textMuted, fontSize: 13 }}>
        <div>
          <div style={{ fontFamily: "Cairo", fontWeight: 800, color: c.text, marginBottom: 4 }}>{t.brand}</div>
          <div>{t.footer_note}</div>
        </div>
        <div>© {new Date().getFullYear()} {t.brand} — {t.footer_rights}</div>
      </div>
    </footer>
  );
}
