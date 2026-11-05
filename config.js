/* ============ THE A — SITE SETTINGS ============
   Everything you may want to edit lives in this file:
   links, policies, about text, products, prices, sizes and photo files.
   ============ EDIT HERE: contact details & links ============ */
const CONFIG = {
  whatsappLink: "https://wa.me/message/JCN6DRCGOIFWN1", // your WhatsApp chat link
  whatsappNumber: "",  // optional: digits only with country code, e.g. "201XXXXXXXXX". If set, it is used instead of the link above.
  instagram: "https://www.instagram.com/the_a_eg?psln=MWs0NWpmOGZ5cmV3dw%3D%3D&utm_source=qr",
  facebook: "https://www.facebook.com/share/18h9QdVnA5/?mibextid=wwXIfr",
  brand: "THE A",
  about: [
    "THE A is a women's label for quiet confidence. We keep things simple: soft fabrics, clean lines and pieces that feel as good as they look.",
    "Our identity is burgundy, ivory and a touch of baby pink: feminine, understated and never loud. The mark says it too, a bold lowercase “the” meeting a single sweeping capital A.",
    "From coordinated sets to easy knitwear, every piece is chosen to be worn on repeat and to make getting dressed feel effortless."
  ],
  aboutPillars: [
    {t:"Soft fabrics",       d:"Meltone and fleece-knit pieces made to be comfortable."},
    {t:"Sets & knitwear",    d:"Coordinated sets and an easy knit cardigan."},
    {t:"A quiet palette",    d:"Burgundy, ivory and baby pink, with nothing shouting."}
  ],
  aboutIsPlaceholder: false, // set true to show a "replace with your own story" note
  orderSteps: [
    "Open a piece and choose your color and size.",
    "Press Order via WhatsApp, or message us on Instagram or Facebook. Your selection is written into the message for you.",
    "Send it and we'll confirm the details with you in the chat. Your order is confirmed once the deposit is paid."
  ],
  // Leave text empty until confirmed — a clearly marked "to be completed" note is shown instead.
  policies: [
    {title:"Delivery",          text:"We deliver across all of Egypt. Delivery takes 5–10 working days.", hint:""},
    {title:"Exchange policy",    text:"You can open, check and try your order when it arrives, before the courier leaves. No refunds or returns — exchanges only, and only if the item is unused and in its original form.", hint:""},
    {title:"Payment",           text:"A deposit is required to confirm your order. We accept payment through InstaPay, Telda and Vodafone Cash.", hint:""}
  ]
};
/* To add a product: copy one object in PRODUCTS below (id, name, was, now, fabric, desc, colors[{name, sw, imgs[]}]).
   To change a price: edit "was" / "now" — discount % and every message update automatically. */
/* ============ Photo files (in the same folder as index.html) ============ */
const IMG={
 pinkFront:"offline-white-pink-1.jpg",
 pinkSide:"offline-white-pink-2.jpg",
 pinkDetail:"offline-white-pink-3.jpg",
 pinkTop:"offline-white-pink-top.jpg",
 pinkPants:"offline-white-pink-pants.jpg",
 navyFront:"offline-white-navy-1.jpg",
 navyDetail:"offline-white-navy-2.jpg",
 navyTop:"offline-white-navy-top.jpg",
 navyPants:"offline-white-navy-pants.jpg",
 ashFront:"ash-set-grey-1.jpg",
 ashSide:"ash-set-grey-2.jpg",
 ashTop:"ash-set-grey-top.jpg",
 ashPants:"ash-set-grey-pants.jpg"
};
/* ============ Products & sizes (do not change values) ============ */
const SIZES = [["XS","78–82","60–64","84–88"],["S","82–86","64–68","88–92"],["M","86–92","68–74","92–98"],["L","92–98","74–80","98–104"],["XL","98–104","80–86","104–110"],["XXL","104–110","86–92","110–116"]];
const PRODUCTS = [
 {id:"offline",name:"Offline Set",was:1800,now:1399,fabric:"Meltone",
  parts:[{id:"top",name:"Top only",now:699},{id:"pants",name:"Pants only",now:799}], // optional: pieces sold separately. Add was:#### to a piece to show a crossed-out price + discount
  desc:"A coordinated set in Meltone fabric, available in two color pairings.",
  colors:[{name:"White & Baby Pink",sw:"linear-gradient(90deg,#fff 50%,#f6d5dc 50%)",imgs:[IMG.pinkFront,IMG.pinkSide,IMG.pinkDetail,IMG.pinkPants],
     partImgs:{top:[IMG.pinkTop],pants:[IMG.pinkPants]}},
          {name:"White & Navy",sw:"linear-gradient(90deg,#fff 50%,#1c2a4a 50%)",imgs:[IMG.navyFront,IMG.navyDetail,IMG.navyPants],
     partImgs:{top:[IMG.navyTop],pants:[IMG.navyPants]}} /* optional: photos shown when a piece is chosen, e.g. partImgs:{top:[...],pants:[...]} */]},
 {id:"ash",name:"Ash Set",was:1800,now:1399,fabric:"Soft fleece / knitted fabric (تريكو)",
  parts:[{id:"top",name:"Top only",was:1000,now:699},{id:"pants",name:"Pants only",was:1100,now:799}],
  desc:"A soft grey set in fleece-knit fabric.",
  colors:[{name:"Grey",sw:"#a7a7a7",imgs:[IMG.ashFront,IMG.ashSide,IMG.ashTop,IMG.ashPants],
     partImgs:{top:[IMG.ashTop],pants:[IMG.ashPants]}}]},
 {id:"candy",name:"Candy Knit Cardigan",was:1100,now:850,fabric:null,
  desc:"An off-white knit cardigan.",
  colors:[{name:"Off-white",sw:"#f3eee4",imgs:["candy-knit-cardigan-1.jpg","candy-knit-cardigan-2.jpg","candy-knit-cardigan-3.jpg"]}]}
];
/* ================================================================ */
