const fallback = {
  cafeName:"كافيه البستان",
  tagline:"أهلاً بيكم",
  categories:[
    {name:"Hot drinks - مشروبات ساخنة",items:[
      
      {name:"Tea",desc:"شاي",price:"15 EGP"},
      {name:"Coffee",desc:"قهوة",price:"25 EGP"},
      {name:"Espresso",desc:"قهوة إسبريسو",price:"50 EGP"},
      {name:"Cappuccino",desc:"إسبريسو مع لبن ورغوة",price:"70 EGP"},
      {name:"Latte",desc:"إسبريسو مع لبن",price:"75 EGP"}
    ]},
    {name:"Frish drinks - مشروبات فريش",items:[
      {name:"Mango",desc:"مانجا",price:"50 EGP"},
      {name:"guava",desc:"جوافه",price:"50 EGP"},
      {name:"Banana with milk",desc:"موز باللبن",price:"50 EGP"},  
      {name:"Lemon",desc:"ليمون",price:"40 EGP"}
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
