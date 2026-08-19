const fallback = {
  cafeName:"كافيه البستان",
  tagline:"أهلاً بيكم",
  categories:[
{name:"مشروبات ساخنة - Hot drinks",items:[
  {name:"شاي",desc:"Tea",price:"؟ EGP"},
  {name:"كركديه",desc:"Hibiscus",price:"؟ EGP"},
  {name:"ليمون",desc:"Lemon",price:"؟ EGP"},
  {name:"ينسون",desc:"Anise",price:"؟ EGP"},
  {name:"حلبة",desc:"Fenugreek",price:"؟ EGP"},
  {name:"قهوة",desc:"Coffee",price:"؟ EGP"},
  {name:"قهوة إسبريسو",desc:"Espresso",price:"؟ EGP"},
  {name:"كابتشينو",desc:"Cappuccino",price:"؟ EGP"},
  {name:"لاتيه",desc:"Latte",price:"؟ EGP"}
]},
{name:"مشروبات فريش - Fresh drinks",items:[
  {name:"مانجا",desc:"Mango",price:"؟ EGP"},
  {name:"جوافة",desc:"Guava",price:"؟ EGP"},
  {name:"موز باللبن",desc:"Banana with milk",price:"؟ EGP"},
  {name:"ليمون",desc:"Lemon",price:"؟ EGP"}
]},
    {name:"Shisha - شيشة",items:[
      {name:"شيشة معسل",price:"؟ EGP"},
      {name:"شيشة فواكه فاخر",price:"؟ EGP"},
    ]}
  ]
};

async function loadMenu(){
  let data=fallback;
  try{
    if(MENU_API_URL && !MENU_API_URL.includes("PASTE_")){
      const r=await fetch(MENU_API_URL,{cache:"no-store"});
      if(!r.ok) throw new Error("API");
      data=await r.json();
    }
  }catch(e){ console.warn("Using demo menu",e); }
  document.title=data.cafeName+" | Menu";
  document.getElementById("cafeName").textContent=data.cafeName;
  document.getElementById("tagline").textContent=data.tagline||"";
  const box=document.getElementById("categories");
  box.innerHTML="";
  data.categories.forEach(cat=>{
    const section=document.createElement("section");
    section.className="category";
    section.innerHTML=`<h2>${escapeHtml(cat.name)}</h2>`;
    cat.items.forEach(x=>{
      const item=document.createElement("article");
      item.className="item";
      item.innerHTML=`
        ${x.image?`<img src="${escapeAttr(x.image)}" alt="">`:""}
        <div class="info"><div class="name">${escapeHtml(x.name)}</div>
        ${x.desc?`<div class="desc">${escapeHtml(x.desc)}</div>`:""}</div>
        <div class="price">${escapeHtml(x.price)}</div>`;
      section.appendChild(item);
    });
    box.appendChild(section);
  });
  document.getElementById("status").remove();
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function escapeAttr(s){return escapeHtml(s)}
loadMenu();
