import React, { useState, useEffect, useMemo, useCallback } from "react";
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
    hero_cta1: "استعرض الملخصات", hero_cta2: "ابدأ مجانًا",
    stat_summaries: "ملخص", stat_readers: "قارئ", stat_categories: "تصنيف",
    author: "المؤلف", episodes: "عدد الحلقات", quotes_title: "اقتباسات مميزة",
    similar_title: "قد يعجبك أيضًا", privacy: "سياسة الخصوصية", faq: "الأسئلة الشائعة",
    faq_q1: "هل يمكنني تحميل الملخصات المجانية؟", faq_a1: "نعم، جميع الملخصات المجانية متاحة للتحميل والقراءة فورًا بعد تسجيل الدخول.",
    faq_q2: "كيف أدفع مقابل الملخصات المدفوعة؟", faq_a2: "عبر واجهة الدفع الآمنة داخل الموقع باستخدام بطاقتك البنكية.",
    faq_q3: "هل يمكنني إلغاء اشتراكي في أي وقت؟", faq_a3: "نعم، لا يوجد أي التزام طويل الأمد، ويمكنك التوقف متى شئت.",
    privacy_text: "نحن نحترم خصوصيتك. لا نشارك بياناتك الشخصية مع أي طرف ثالث، ونستخدم معلوماتك فقط لتحسين تجربتك داخل المنصة وتذكر مفضلاتك ومشترياتك.",
    author_field: "المؤلف", episodes_field: "عدد الحلقات", quotes_field: "اقتباسات مميزة (سطر لكل اقتباس)",
    preview: "معاينة قبل النشر", preview_hide: "إخفاء المعاينة",
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
    hero_cta1: "Browse Summaries", hero_cta2: "Start Free",
    stat_summaries: "Summaries", stat_readers: "Readers", stat_categories: "Categories",
    author: "Author", episodes: "Episodes", quotes_title: "Featured Quotes",
    similar_title: "You Might Also Like", privacy: "Privacy Policy", faq: "FAQ",
    faq_q1: "Can I download free summaries?", faq_a1: "Yes, all free summaries are available to read or download right after logging in.",
    faq_q2: "How do I pay for paid summaries?", faq_a2: "Through the secure checkout inside the site using your card.",
    faq_q3: "Can I cancel anytime?", faq_a3: "Yes, there's no long-term commitment — stop whenever you like.",
    privacy_text: "We respect your privacy. We never share your personal data with third parties, and we only use your information to improve your experience and remember your favorites and purchases.",
    author_field: "Author", episodes_field: "Episodes", quotes_field: "Featured Quotes (one per line)",
    preview: "Preview before publishing", preview_hide: "Hide preview",
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
    { id: "b1", type: "book", title: "العادات الذرية", author: "جيمس كلير", category: "تطوير الذات", price: 0, cover: "https://picsum.photos/seed/atomichabits/500/700", time: 12, desc: "كيف تبني عادات صغيرة تؤدي إلى نتائج كبيرة بمرور الوقت، عبر نظام تدريجي قابل للتطبيق.", ideas: ["التغيير الصغير المتكرر يصنع فرقًا هائلًا على المدى الطويل", "ركّز على الهوية التي تريد بناءها، لا فقط على النتيجة", "اجعل العادة الجيدة واضحة وسهلة وجاذبة", "البيئة أقوى من قوة الإرادة"], quotes: ["أنت لا ترتقي لمستوى أهدافك، بل تهبط لمستوى أنظمتك", "كل فعل هو تصويت لنوع الشخص الذي تريد أن تصبحه"], rating: 4.7, ratingsCount: 312, views: 5400 },
    { id: "b2", type: "book", title: "التفكير السريع والبطيء", author: "دانيال كانمان", category: "علم النفس", price: 19, cover: "https://picsum.photos/seed/thinkfastslow/500/700", time: 18, desc: "استكشاف لنظامي التفكير في عقلنا: السريع الحدسي، والبطيء التحليلي، وكيف يؤثران في قراراتنا.", ideas: ["النظام الأول سريع وحدسي وعاطفي", "النظام الثاني بطيء ومنطقي ويحتاج جهدًا", "نحن عُرضة لتحيزات معرفية منتظمة", "الثقة الزائدة بالحدس قد تُضلّلنا في القرارات المعقدة"], quotes: ["لا شيء في الحياة مهم بقدر ما تعتقد أنه مهم وأنت تفكر فيه"], rating: 4.5, ratingsCount: 201, views: 3900 },
    { id: "b3", type: "book", title: "الأب الغني والأب الفقير", author: "روبرت كيوساكي", category: "المال والاستثمار", price: 0, cover: "https://picsum.photos/seed/richdadpoordad/500/700", time: 10, desc: "مقارنة بين عقليتين ماليتين مختلفتين، وكيف تشكل نظرتك للأصول والخصوم مستقبلك المالي.", ideas: ["الأصول تضع مالًا في جيبك، الخصوم تُخرجه", "الذكاء المالي أهم من مقدار الدخل", "استثمر في التعليم المالي أولًا"], quotes: ["الأثرياء لا يعملون من أجل المال، بل يجعلون المال يعمل لهم"], rating: 4.3, ratingsCount: 480, views: 8100 },
    { id: "b4", type: "book", title: "البدء بالسؤال: لماذا", author: "سيمون سينك", category: "ريادة الأعمال", price: 15, cover: "https://picsum.photos/seed/startwithwhy/500/700", time: 14, desc: "كيف تُلهم القادة والشركات العظيمة الناس عبر التركيز على 'السبب' قبل 'الكيف' و'الماذا'.", ideas: ["الناس لا يشترون ما تفعله، بل يشترون سبب فعلك له", "دائرة الذهب الأصفر: لماذا، كيف، ماذا", "القيادة الملهمة تبدأ من الداخل إلى الخارج"], quotes: ["الناس لا يشترون ما تفعله؛ يشترون سبب فعلك له"], rating: 4.4, ratingsCount: 156, views: 2600 },
    { id: "b5", type: "book", title: "أساسيات البرمجة النظيفة", author: "روبرت مارتن", category: "البرمجة", price: 0, cover: "https://picsum.photos/seed/cleancode/500/700", time: 20, desc: "مبادئ عملية لكتابة كود مقروء وقابل للصيانة يفهمه أي مطور بسهولة.", ideas: ["الأسماء الواضحة توفّر وقت الفهم لاحقًا", "الدالة الجيدة تفعل شيئًا واحدًا فقط", "التعليقات لا تعوّض عن كود سيئ"], quotes: ["الكود النظيف يُقرأ دائمًا كأنه كُتب بعناية من قِبل شخص يهتم"], rating: 4.6, ratingsCount: 98, views: 1450 },
  ];
  const anime = [
    { id: "a1", type: "anime", title: "رحلة الحديد الصاعد", category: "أكشن", price: 0, episodes: 24, cover: "https://picsum.photos/seed/ironascent/500/700", time: 8, desc: "في عالم مقسّم بالتقنية القديمة، ينطلق شاب عادي في رحلة لاكتشاف قوة كامنة بداخله.", chars: ["كايتو — البطل، شاب مصمم يحمل سرًّا عائليًا", "ريو — الرفيق الحكيم صاحب الخبرة القتالية", "ميرا — قائدة فصيل منافس بأهداف غامضة"], rating: 4.2, ratingsCount: 240, views: 4700 },
    { id: "a2", type: "anime", title: "ظلال الأكاديمية", category: "غموض", price: 12, episodes: 12, cover: "https://picsum.photos/seed/shadowacademy/500/700", time: 9, desc: "أكاديمية نخبوية تُخفي أسرارًا مظلمة، وطالبة جديدة تبدأ في كشف الحقيقة خيطًا بخيط.", chars: ["نور — الطالبة الجديدة الفضولية", "الأستاذ فارس — شخصية غامضة يصعب الوثوق بها"], rating: 4.6, ratingsCount: 175, views: 3300 },
    { id: "a3", type: "anime", title: "أساطير البحر المفقود", category: "مغامرات", price: 0, episodes: 26, cover: "https://picsum.photos/seed/lostsea/500/700", time: 7, desc: "طاقم من المغامرين يبحث عن جزيرة أسطورية يُقال إنها تحوي مفتاح ماضٍ نُسي.", chars: ["الكابتن سالم — قائد الطاقم العنيد", "لونا — خبيرة الخرائط القديمة"], rating: 4.0, ratingsCount: 89, views: 1900 },
    { id: "a4", type: "anime", title: "قلب من زجاج", category: "دراما", price: 10, episodes: 13, cover: "https://picsum.photos/seed/glassheart/500/700", time: 11, desc: "قصة إنسانية عن فتاة تتعلم مواجهة خوفها من الفقدان بعد حادثة غيّرت حياتها.", chars: ["هانا — الشخصية الرئيسية الهادئة", "يوسف — صديق الطفولة الداعم"], rating: 4.8, ratingsCount: 302, views: 6200 },
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
          loading="lazy"
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
        <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>
          {isBook && item.author ? `${item.author} · ` : ""}{item.category}{!isBook && item.episodes ? ` · ${item.episodes} ${t.episodes}` : ""}
        </div>
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

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("summaries", true);
        setSummaries(res ? JSON.parse(res.value) : seedData());
        if (!res) await window.storage.set("summaries", JSON.stringify(seedData()), true);
      } catch {
        const seed = seedData();
        setSummaries(seed);
        try { await window.storage.set("summaries", JSON.stringify(seed), true); } catch {}
      }
      try {
        const res = await window.storage.get("comments", true);
        setComments(res ? JSON.parse(res.value) : {});
      } catch { setComments({}); }
      try {
        const res = await window.storage.get("account", false);
        setAccount(res ? JSON.parse(res.value) : null);
      } catch { setAccount(null); }
      try {
        const res = await window.storage.get("favorites", false);
        setFavorites(res ? JSON.parse(res.value) : []);
      } catch { set
