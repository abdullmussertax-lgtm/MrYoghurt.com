const defaultProducts=[
{id:1,name:"Mango Passion Juice",cat:"Juice",price:5000,image:"https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",desc:"Fresh mango + passion fruit blend."},
{id:2,name:"Strawberry Yoghurt",cat:"Yoghurt",price:6000,image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",desc:"Creamy yoghurt with strawberry."},
{id:3,name:"Green Detox",cat:"Detox",price:6500,image:"https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",desc:"A refreshing green fruit & veg detox."},
{id:4,name:"Tropical Smoothie",cat:"Smoothie",price:7000,image:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",desc:"Banana, pineapple and creamy goodness"},
{id:5,name:"Watermelon Cooler",cat:"Juice",price:4500,image:"https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80",desc:"Cold, fresh watermelon juice."},
{id:6,name:"Vanilla Yoghurt Cup",cat:"Yoghurt",price:5500,image:"https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80",desc:"Smooth vanilla yoghurt, made fresh."},
{id:7,name:"Pineapple Detox",cat:"Detox",price:6000,image:"https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80",desc:"Pineapple, ginger and citrus."},
{id:8,name:"Berry Power Smoothie",cat:"Smoothie",price:7500,image:"https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80",desc:"Berry-rich smoothie for a bright day."},
];

let products=JSON.parse(localStorage.getItem("my_products")||"null")||defaultProducts;
let cart=JSON.parse(localStorage.getItem("my_cart")||"[]");
let orders=JSON.parse(localStorage.getItem("my_orders")||"[]");
let users=JSON.parse(localStorage.getItem("my_users")||"[]");
let admins=JSON.parse(localStorage.getItem("my_admins")||"[]");
let currentUser=JSON.parse(localStorage.getItem("my_current")||"null");
let currentAdmin=JSON.parse(localStorage.getItem("my_current_admin")||"null");
let admin=false, currentCat="All";

// AI Language & Translations
let currentAILang="en";
const aiTranslations={
  en:{
    greeting:"Hi! I can help you choose a drink, understand your order, or connect you to customer service.",
    products:"Here are our menu items:",
    juice:"Juices",
    yoghurt:"Yoghurt",
    detox:"Detox",
    smoothie:"Smoothies",
    price:"Price: ",
    addToCart:"Added to cart! Visit the menu or cart page to checkout.",
    notFound:"I didn't quite understand. Try asking about: menu items, prices, orders, delivery, or account.",
    delivery:"Delivery takes 30-45 minutes. We serve fresh to your door daily.",
    payment:"We accept Cash on Delivery and Lipa Namba. Choose at checkout.",
    orders:"You need to login first to view orders. Go to Account page.",
    recommendation:"Based on our menu, I'd suggest our Tropical Smoothie or Green Detox!",
    support:"For urgent help, call us at 0697983933 or WhatsApp 0676475401.",
    hours:"We're available daily. Call customer service for delivery hours.",
    ingredients:"All drinks are made with fresh ingredients. No artificial flavors!",
    healthy:"Yes! All our products are fresh and healthy.",
    thank:"Thank you for choosing Mr. Yoghurt! 🥝"
  },
  sw:{
    greeting:"Habari! Naweza kukusaidia kuchagua kinywaji, kuelewa agizo lako, au kuwasiliana na huduma ya wateja.",
    products:"Hii ni karata yetu:",
    juice:"Madamu ya asili",
    yoghurt:"Yoghurt",
    detox:"Detox",
    smoothie:"Laini",
    price:"Bei: ",
    addToCart:"Kuongezwa kwa karata! Tembelea ukurasa wa karata ili kukamilisha.",
    notFound:"Sikuelewi vizuri. Jaribu kuuliza kuhusu: vipengee vya karata, bei, maagizo, utoaji, au akaunti.",
    delivery:"Utoaji huchukua dakika 30-45. Tunatoa kwa sura yako kila siku.",
    payment:"Tunakubali Fedha kwa Utoaji na Lipa Namba. Chagua wakati wa kufanya checkout.",
    orders:"Lazima ujifungue akaunti kwanza ili kuona maagizo.",
    recommendation:"Kulingana na karata yetu, ninapendekeza Tropical Smoothie au Green Detox!",
    support:"Kwa msaada wa haraka, piga 0697983933 au WhatsApp 0676475401.",
    hours:"Tupo kila siku. Piga huduma ya wateja kwa saa za utoaji.",
    ingredients:"Vinywaji vyote vinafanywa na vipengee safi. Hakuna ladha bandia!",
    healthy:"Ndiyo! Bidhaa zote zetu ni safi na nzuri kwa afya.",
    thank:"Asante kwa kuchagua Mr. Yoghurt! 🥝"
  },
  fr:{
    greeting:"Bonjour! Je peux vous aider à choisir une boisson, comprendre votre commande ou contacter le service client.",
    products:"Voici notre menu:",
    juice:"Jus",
    yoghurt:"Yaourt",
    detox:"Détox",
    smoothie:"Smoothies",
    price:"Prix: ",
    addToCart:"Ajouté au panier! Visitez la page menu ou panier pour confirmer.",
    notFound:"Je n'ai pas bien compris. Essayez de demander: articles du menu, prix, commandes, livraison ou compte.",
    delivery:"La livraison prend 30-45 minutes. Nous livrons frais à votre porte quotidiennement.",
    payment:"Nous acceptons le paiement à la livraison et Lipa Namba. Choisissez à la caisse.",
    orders:"Vous devez d'abord vous connecter pour voir les commandes. Allez à la page Compte.",
    recommendation:"Selon notre menu, je suggère notre Tropical Smoothie ou Green Detox!",
    support:"Pour une aide urgente, appelez 0697983933 ou WhatsApp 0676475401.",
    hours:"Nous sommes disponibles quotidiennement. Appelez le service client pour les horaires.",
    ingredients:"Toutes les boissons sont faites avec des ingrédients frais. Pas d'arômes artificiels!",
    healthy:"Oui! Tous nos produits sont frais et sains.",
    thank:"Merci d'avoir choisi Mr. Yoghurt! 🥝"
  },
  es:{
    greeting:"¡Hola! Puedo ayudarte a elegir una bebida, entender tu pedido o conectarte con el servicio al cliente.",
    products:"Aquí está nuestro menú:",
    juice:"Jugos",
    yoghurt:"Yogur",
    detox:"Detox",
    smoothie:"Batidos",
    price:"Precio: ",
    addToCart:"¡Agregado al carrito! Visita la página de menú o carrito para confirmar.",
    notFound:"No entendí bien. Intenta preguntar sobre: artículos del menú, precios, pedidos, entrega o cuenta.",
    delivery:"La entrega toma 30-45 minutos. Entregamos fresco a tu puerta diariamente.",
    payment:"Aceptamos pago contra entrega y Lipa Namba. Elige al pagar.",
    orders:"Primero debes iniciar sesión para ver pedidos. Ve a la página de Cuenta.",
    recommendation:"Según nuestro menú, ¡sugiero nuestro Tropical Smoothie o Green Detox!",
    support:"Para ayuda urgente, llama 0697983933 o WhatsApp 0676475401.",
    hours:"Disponibles diariamente. Llama al servicio al cliente para horarios.",
    ingredients:"Todas las bebidas se hacen con ingredientes frescos. ¡Sin sabores artificiales!",
    healthy:"¡Sí! Todos nuestros productos son frescos y saludables.",
    thank:"¡Gracias por elegir Mr. Yoghurt! 🥝"
  },
  pt:{
    greeting:"Olá! Posso ajudá-lo a escolher uma bebida, entender seu pedido ou conectar com o atendimento ao cliente.",
    products:"Aqui está nosso menu:",
    juice:"Sucos",
    yoghurt:"Iogurte",
    detox:"Detox",
    smoothie:"Smoothies",
    price:"Preço: ",
    addToCart:"Adicionado ao carrinho! Visite a página de menu ou carrinho para confirmar.",
    notFound:"Não entendi bem. Tente perguntar sobre: itens do menu, preços, pedidos, entrega ou conta.",
    delivery:"A entrega leva 30-45 minutos. Entregamos fresco à sua porta diariamente.",
    payment:"Aceitamos pagamento na entrega e Lipa Namba. Escolha ao pagar.",
    orders:"Você precisa fazer login primeiro para ver pedidos. Vá para a página Conta.",
    recommendation:"Baseado no nosso menu, sugiro nosso Tropical Smoothie ou Green Detox!",
    support:"Para ajuda urgente, ligue 0697983933 ou WhatsApp 0676475401.",
    hours:"Disponível diariamente. Ligue para o atendimento ao cliente para horários.",
    ingredients:"Todas as bebidas são feitas com ingredientes frescos. Sem sabores artificiais!",
    healthy:"Sim! Todos os nossos produtos são frescos e saudáveis.",
    thank:"Obrigado por escolher Mr. Yoghurt! 🥝"
  }
};

// AI Intent Recognition & Response Engine
const aiIntents={
  menu:["menu","drinks","what do you have","items","products","categories","options"],
  juice:["juice","juices","fresh juice","orange","mango","watermelon","passion","fruit drink"],
  yoghurt:["yoghurt","yogurt","yoghurt cup","strawberry","vanilla","creamy"],
  detox:["detox","green","cleanse","healthy","veg","vegetable"],
  smoothie:["smoothie","smoothies","berry","tropical","blend","thick drink"],
  price:["price","cost","how much","expensive","cheap","afford"],
  order:["order","how to order","place order","checkout","cart"],
  delivery:["delivery","deliver","how long","time","shipping","when"],
  payment:["payment","pay","cash","lipa namba","card","method"],
  account:["account","login","register","sign up","my orders","history"],
  status:["status","where is my order","track","progress"],
  ingredients:["ingredients","made of","what's in","fresh","quality"],
  healthy:["healthy","nutrition","diet","calories","sugar free"],
  help:["help","support","customer service","contact","phone"],
  hours:["hours","open","when","operating"],
  recommend:["recommend","suggest","best","favorite","good for"]
};

function detectIntent(text){
  const lowerText=text.toLowerCase();
  for(let intent in aiIntents){
    if(aiIntents[intent].some(keyword=>lowerText.includes(keyword))){
      return intent;
    }
  }
  return null;
}

function getAIResponse(text,lang="en"){
  const t=aiTranslations[lang]||aiTranslations.en;
  const intent=detectIntent(text);
  const lowerText=text.toLowerCase();
  
  // Menu-related
  if(intent==="menu"){
    return t.products+" "+products.map(p=>`${p.name} (${t[p.cat.toLowerCase()].toLowerCase()}) - ${t.price}${p.price} TZS`).join(", ");
  }
  
  // Specific category searches
  if(intent==="juice"||intent==="yoghurt"||intent==="detox"||intent==="smoothie"){
    let catItems=products.filter(p=>p.cat.toLowerCase()===intent);
    return t.products+" "+catItems.map(p=>`${p.name} - ${p.desc} (${t.price}${p.price} TZS)`).join(", ");
  }
  
  // Price inquiries
  if(intent==="price"){
    let priceInfo=products.map(p=>`${p.name}: ${p.price} TZS`).join(", ");
    return `Our prices: ${priceInfo}`;
  }
  
  // Order/Cart
  if(intent==="order"){
    if(cart.length===0){
      return "Your cart is empty. Go to our menu and add some fresh drinks!";
    }
    let items=cart.map(c=>{
      let p=products.find(x=>x.id===c.id);
      return `${p.name} x${c.qty}`;
    }).join(", ");
    return `Your current order: ${items}. Go to Cart page to checkout!`;
  }
  
  // Delivery
  if(intent==="delivery"){
    return t.delivery;
  }
  
  // Payment
  if(intent==="payment"){
    return t.payment;
  }
  
  // Account/Orders
  if(intent==="account"||intent==="status"){
    if(!currentUser){
      return t.orders;
    }
    let userOrders=orders.filter(o=>o.userId===currentUser.id);
    if(userOrders.length===0){
      return `Hi ${currentUser.name}! You don't have any orders yet. Start by visiting our menu!`;
    }
    let lastOrder=userOrders[userOrders.length-1];
    return `Hi ${currentUser.name}! Your latest order (#${lastOrder.id}) status: ${lastOrder.status}`;
  }
  
  // Ingredients
  if(intent==="ingredients"){
    return t.ingredients;
  }
  
  // Healthy
  if(intent==="healthy"){
    return t.healthy;
  }
  
  // Recommendations
  if(intent==="recommend"){
    return t.recommendation;
  }
  
  // Help
  if(intent==="help"||intent==="hours"){
    return t.support;
  }
  
  // Search for product by name
  let matchedProduct=products.find(p=>lowerText.includes(p.name.toLowerCase()));
  if(matchedProduct){
    return `${matchedProduct.name} - ${matchedProduct.desc}. ${t.price}${matchedProduct.price} TZS. Available in our menu!`;
  }
  
  // Default fallback
  return t.notFound+" "+t.thank;
}

const money=n=>"TZS "+Number(n).toLocaleString();
const save=()=>{localStorage.setItem("my_products",JSON.stringify(products));localStorage.setItem("my_cart",JSON.stringify(cart));localStorage.setItem("my_orders",JSON.stringify(orders));localStorage.setItem("my_users",JSON.stringify(users));localStorage.setItem("my_admins",JSON.stringify(admins));localStorage.setItem("my_current",JSON.stringify(currentUser));localStorage.setItem("my_current_admin",JSON.stringify(currentAdmin))};
const toast=m=>{let t=document.getElementById("toast");t.textContent=m;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2600)};

function showPage(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");if(id==="menu")renderMenu();if(id==="cart")renderCart();if(id==="orders")renderOrders();if(id==="account")renderAccount();if(id==="admin")renderAdmin();if(id==="admin-profile")renderAdminProfile()}

function filterCat(cat,el){currentCat=cat;document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));el.classList.add("active");renderMenu()}

function renderMenu(){let q=(document.getElementById("search")?.value||"").toLowerCase();let list=products.filter(p=>(currentCat==="All"||p.cat===currentCat)&&(`${p.name} ${p.desc}`.toLowerCase().includes(q)));document.getElementById("productGrid").innerHTML=list.map(p=>`<div class="product-card"><img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><p>${p.desc}</p><div class="card-foot"><strong>${money(p.price)}</strong><button class="btn small" onclick="addToCart(${p.id})">Add →</button></div></div>`).join("")}

function addToCart(id){let x=cart.find(i=>i.id===id);if(x)x.qty++;else cart.push({id,qty:1});save();updateCartCount();toast("Added to your order 🥭");}

function updateCartCount(){document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0)}

function renderCart(){let box=document.getElementById("cartItems");let empty=document.getElementById("cartEmpty");if(!cart.length){box.innerHTML="";empty.classList.remove("hidden");document.getElementById("cartTotal").textContent=money(0);return}empty.classList.add("hidden");let total=0;box.innerHTML=cart.map(c=>{let p=products.find(x=>x.id===c.id),cost=p.price*c.qty;total+=cost;return `<div class="cart-item"><div><b>${p.name}</b></div><div class="qty-ctrl"><button onclick="changeQty(${p.id},-1)">−</button><span>${c.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div><div><strong>${money(cost)}</strong> <button class="rm-btn" onclick="removeCart(${p.id})">✕</button></div></div>`}).join("");document.getElementById("cartTotal").textContent=money(total)}

function changeQty(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();renderCart();updateCartCount()}

function removeCart(id){cart=cart.filter(i=>i.id!==id);save();renderCart();updateCartCount()}

document.getElementById("payment").onchange=e=>{document.getElementById("lipanote").classList.toggle("hidden",e.target.value!=="Lipa Namba");document.getElementById("refWrap").classList.toggle("hidden",e.target.value!=="Lipa Namba")};

function placeOrder(){if(!currentUser){toast("Please register or login first.");showPage("account");return}if(!cart.length){toast("Your cart is empty.");return}let location=document.getElementById("orderLocation").value.trim(),name=document.getElementById("orderName").value.trim(),phone=document.getElementById("orderPhone").value.trim(),note=document.getElementById("orderNote").value.trim(),payment=document.getElementById("payment").value,paymentRef=document.getElementById("paymentRef").value.trim();if(!location||!phone){toast("Enter location and phone.");return}if(payment==="Lipa Namba"&&!paymentRef){toast("Enter payment reference.");return}let items=cart.map(c=>{let p=products.find(x=>x.id===c.id);return{id:c.id,name:p.name,qty:c.qty,price:p.price}}),total=items.reduce((a,x)=>a+x.price*x.qty,0),o={id:Date.now(),userId:currentUser.id,userName:name,userPhone:phone,userEmail:currentUser.email,items,location,note,payment,paymentRef,total,status:"Pending",date:new Date().toLocaleString(),driver:null};orders.push(o);cart=[];save();renderCart();renderOrders();toast("Order placed! Track it in My Orders. 🎉");showPage("orders")}

function renderOrders(){let list=orders.filter(o=>currentUser&&o.userId===currentUser.id);document.getElementById("ordersList").innerHTML=currentUser?(list.length?list.map(o=>orderCard(o,false)).join(""):` <div class="empty">No orders yet. <a href="#" onclick="showPage('menu')">Start ordering!</a></div>`):` <div class="notice">Login to see your orders.</div>`}

function orderCard(o,adm){let items=o.items.map(i=>`${i.name} × ${i.qty}`).join(", ");return `<div class="order-card"><div style="display:flex;justify-content:space-between;gap:10px"><div><b>Order #${o.id}</b><br><small>${o.date}</small></div><div style="text-align:right"><span class="status-badge">${o.status}</span><br><strong>${money(o.total)}</strong></div></div><div style="margin:10px 0"><div><b>Items:</b> ${items}</div><div><b>Location:</b> ${o.location}</div>${o.driver?`<div><b>Driver:</b> ${o.driver.name} (${o.driver.phone})</div>`:""}</div>${adm?`<div style="margin-top:10px;display:flex;gap:5px"><button class="btn small" onclick="setStatus(${o.id},'Processing')">Processing</button><button class="btn small" onclick="setStatus(${o.id},'On the way')">On the way</button><button class="btn small" onclick="setStatus(${o.id},'Delivered')">Delivered</button><button class="btn small" onclick="showDriverForm(${o.id})">Driver</button><button class="btn small" onclick="notifyCustomer(${o.id})">Notify</button><button class="btn small" onclick="printOrder(${o.id})">Print</button></div><div id="dform-${o.id}" class="hidden" style="margin-top:10px;padding:10px;background:#f5f5f5;border-radius:6px"><input id="dn-${o.id}" placeholder="Driver name"><input id="dp-${o.id}" placeholder="Driver phone"><button class="btn small" onclick="assignDriver(${o.id})">Assign</button></div>`:""}`;
}

function authTab(mode,el){document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));el.classList.add("active");let reg=mode==="register";document.getElementById("confirmWrap").classList.toggle("hidden",!reg);document.getElementById("authSubmit").textContent=reg?"Register":"Login";document.getElementById("accountTitle").textContent=reg?"Create your Mr. Yoghurt account":"Welcome back";document.getElementById("authForm").dataset.mode=mode;document.querySelectorAll(".muted").forEach(x=>x.classList.toggle("hidden",!reg))}

document.getElementById("authForm").dataset.mode="login";

function handleAuth(e){e.preventDefault();let mode=e.target.dataset.mode,name=authName.value.trim(),phone=authPhone.value.trim(),email=authEmail.value.trim(),pass=authPass.value;if(mode==="register"){if(pass!==authConfirm.value){toast("Passwords don't match.");return}if(users.find(u=>u.email===email)){toast("Email already registered.");return}let u={id:Date.now(),name,phone,email,pass,joined:new Date().toLocaleString()};users.push(u);currentUser=u;save();renderAccount();toast("Account created! Welcome 🎉");showPage("home")}else{let u=users.find(x=>x.email===email&&x.pass===pass);if(!u){toast("Email or password incorrect.");return}currentUser=u;save();renderAccount();toast("Logged in! 👋");showPage("home")}authForm.reset()}

function renderAccount(){document.getElementById("profileName").textContent=currentUser?.name||"Not logged in";document.getElementById("profilePhone").textContent=currentUser?currentUser.phone:"Create/login to manage orders.";document.getElementById("profileEmail").textContent=currentUser?`Email: ${currentUser.email}`:"";document.getElementById("profileJoined").textContent=currentUser?`Member since: ${currentUser.joined}`:"";document.getElementById("avatar").textContent=currentUser?(currentUser.name[0]||"?"):"?";document.getElementById("avatar").style.background=currentUser?"#28a745":"#ddd"}

function logout(){currentUser=null;save();renderAccount();toast("Logged out.");showPage("home")}

// ===== ADMIN SECTION =====
function adminLogin(){let user=adminUser.value.trim(),pass=adminPass.value;if(user==="admin"&&pass==="MrYoghurt@2026"){admin=true;currentAdmin={name:"Admin",email:"admin@mryoghurt.com",role:"System Administrator",login:new Date().toLocaleString()};save();renderAdmin();toast("Admin login successful! 🔐");adminUser.value="";adminPass.value=""}else{toast("Invalid credentials.")}}

function adminLogout(){admin=false;currentAdmin=null;save();renderAdmin();toast("Logged out of admin.")}

function renderAdmin(){document.getElementById("adminLogin").classList.toggle("hidden",admin);document.getElementById("adminDash").classList.toggle("hidden",!admin);if(!admin)return;document.getElementById("statOrders").textContent=orders.length;document.getElementById("statCustomers").textContent=users.length;document.getElementById("statSales").textContent=money(orders.reduce((a,o)=>a+o.total,0));document.getElementById("statProducts").textContent=products.length;renderAdminProducts();renderAdminOrders()}

function renderAdminProfile(){if(!currentAdmin){showPage("admin");return}document.getElementById("adminProfileName").textContent=currentAdmin.name;document.getElementById("adminProfileEmail").textContent=currentAdmin.email;document.getElementById("adminProfileRole").textContent=currentAdmin.role;document.getElementById("adminProfileLogin").textContent=currentAdmin.login;document.getElementById("adminStatOrders").textContent=orders.length;document.getElementById("adminStatRevenue").textContent=money(orders.reduce((a,o)=>a+o.total,0));document.getElementById("adminStatCustomers").textContent=users.length;document.getElementById("adminStatMenuItems").textContent=products.length}

function saveProduct(){let id=editId.value?Number(editId.value):Date.now();let p={id,name:pName.value.trim(),cat:pCat.value,price:Number(pPrice.value),image:pImage.value.trim()||"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",desc:pDesc.value.trim()};let existing=products.find(x=>x.id===id);if(existing){Object.assign(existing,p)}else{products.push(p)}save();renderAdmin();renderMenu();clearProductForm();toast("Drink saved! ✓")}

function renderAdminProducts(){let html=products.map(p=>`<div style="padding:10px;border:1px solid #ddd;margin:8px 0;border-radius:6px;display:flex;justify-content:space-between;align-items:center"><div><b>${p.name}</b> <br><small>${p.cat} • ${money(p.price)}</small></div><div style="display:flex;gap:5px"><button class="btn small" onclick="editProduct(${p.id})">Edit</button><button class="btn small" onclick="deleteProduct(${p.id})">Delete</button></div></div>`).join("");document.getElementById("adminProducts").innerHTML=html}

function editProduct(id){let p=products.find(x=>x.id===id);editId.value=p.id;pName.value=p.name;pCat.value=p.cat;pPrice.value=p.price;pImage.value=p.image;pDesc.value=p.desc;window.scrollTo({top:0,behavior:"smooth"})}

function clearProductForm(){editId.value="";pName.value="";pPrice.value="";pImage.value="";pDesc.value=""}

function deleteProduct(id){if(confirm("Delete this drink?")){products=products.filter(p=>p.id!==id);save();renderAdmin();renderMenu();toast("Drink deleted.")}}

function renderAdminOrders(){let html=orders.length?orders.map(o=>`<tr><td>${o.id}</td><td>${o.userName}</td><td>${o.items.map(i=>i.name).join(", ")}</td><td>${money(o.total)}</td><td>${o.status}</td><td>${o.payment}</td></tr>`).join(""):`<tr><td colspan="6" style="text-align:center;padding:20px;color:#999">No orders yet</td></tr>`;document.getElementById("adminOrders").innerHTML=`<table style="width:100%;border-collapse:collapse"><tr style="background:#101510;color:white"><th style="padding:10px;text-align:left">Order ID</th><th style="padding:10px;text-align:left">Customer</th><th style="padding:10px;text-align:left">Items</th><th style="padding:10px;text-align:left">Total</th><th style="padding:10px;text-align:left">Status</th><th style="padding:10px;text-align:left">Payment</th></tr>${html}</table>`}

function setStatus(id,status){let o=orders.find(x=>x.id===id);if(o){o.status=status;save();renderAdmin();renderOrders();toast("Order updated to: "+status)}}

function showDriverForm(id){document.getElementById("dform-"+id).classList.toggle("hidden")}

function assignDriver(id){let o=orders.find(x=>x.id===id),name=document.getElementById("dn-"+id).value.trim(),phone=document.getElementById("dp-"+id).value.trim();if(!name||!phone){toast("Enter driver name and phone.");return}o.driver={name,phone};save();renderAdmin();renderOrders();toast("Driver assigned! 🚗")}

function notifyCustomer(id){let o=orders.find(x=>x.id===id);if(!o)return;let text=`Mr. Yoghurt order ${o.id}: your order has been ${o.status}.${o.driver?` Driver: ${o.driver.name}, ${o.driver.phone}`:""} Thanks! 🥝`;let encoded=encodeURIComponent(text);window.open(`https://wa.me/${o.userPhone.replace(/\D/g,"")}?text=${encoded}`,"_blank")}

function exportOrders(){let blob=new Blob([JSON.stringify(orders,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="mr-yoghurt-orders.json";a.click()}

// ===== PRINT ORDER FUNCTION =====
function printOrder(orderId){let order=orders.find(o=>o.id===orderId);if(!order){toast("Order not found.");return}let printWindow=window.open('','','height=600,width=700');let itemsHtml=order.items.map(i=>`<tr><td>${i.name}</td><td style="text-align:center">${i.qty}</td><td style="text-align:right">${money(i.price)}</td><td style="text-align:right">${money(i.price*i.qty)}</td></tr>`).join("");let html=`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Order #${order.id}</title>
<style>
  body { font-family: Arial, sans-serif; margin: 20px; max-width: 800px; }
  .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
  .header h1 { margin: 0; color: #101510; }
  .header p { margin: 5px 0; color: #666; }
  .order-info { margin: 20px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .info-block { padding: 10px; background: #f5f5f5; border-radius: 6px; }
  .info-block b { display: block; color: #666; font-size: 12px; margin-bottom: 5px; }
  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  th { background: #101510; color: white; padding: 10px; text-align: left; font-weight: bold; }
  td { padding: 10px; border-bottom: 1px solid #ddd; }
  tr:last-child td { border-bottom: 2px solid #333; }
  .total-row { font-size: 18px; font-weight: bold; text-align: right; }
  .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
  .status { font-size: 16px; font-weight: bold; color: #28a745; }
  @media print { body { margin: 0; } }
</style>
</head>
<body>
  <div class="header">
    <h1>🥝 Mr. Yoghurt</h1>
    <p>Fresh • Healthy • Delivered</p>
    <p>Order Receipt</p>
  </div>

  <div class="order-info">
    <div class="info-block">
      <b>Order ID</b>
      ${order.id}
      <b style="margin-top:10px">Date</b>
      ${order.date}
      <b style="margin-top:10px">Status</b>
      <span class="status">${order.status}</span>
    </div>
    <div class="info-block">
      <b>Customer Name</b>
      ${order.userName}
      <b style="margin-top:10px">Phone</b>
      ${order.userPhone}
      <b style="margin-top:10px">Payment Method</b>
      ${order.payment}
    </div>
  </div>

  <div class="order-info">
    <div class="info-block">
      <b>Delivery Location</b>
      ${order.location}
    </div>
    <div class="info-block">
      <b>Special Instructions</b>
      ${order.note||"None"}
    </div>
  </div>

  ${order.driver?`
  <div class="order-info">
    <div class="info-block">
      <b>Driver Name</b>
      ${order.driver.name}
      <b style="margin-top:10px">Driver Phone</b>
      ${order.driver.phone}
    </div>
  </div>
  `:""}

  <table>
    <tr>
      <th>Item</th>
      <th style="width:80px;text-align:center">Qty</th>
      <th style="width:100px;text-align:right">Unit Price</th>
      <th style="width:120px;text-align:right">Total</th>
    </tr>
    ${itemsHtml}
    <tr class="total-row">
      <td colspan="3" style="text-align:right">Grand Total:</td>
      <td style="text-align:right">${money(order.total)}</td>
    </tr>
  </table>

  <div class="footer">
    <p>Thank you for your order! 🎉</p>
    <p>Customer Service: 0697983933 | Orders: 0676475401</p>
    <p style="margin-top:20px">Printed on: ${new Date().toLocaleString()}</p>
  </div>

  <script>
    window.print();
    window.onafterprint = function() { window.close(); };
  </script>
</body>
</html>
  `;printWindow.document.write(html);printWindow.document.close()}

function whatsappOrder(){let items=cart.map(i=>{let p=products.find(x=>x.id===i.id);return `${p.name} x${i.qty}`}).join(", ");let msg=`Hello Mr. Yoghurt, I want to order: ${items||"a drink"}. Please deliver to [your location]. Thanks!`;let encoded=encodeURIComponent(msg);window.open(`https://wa.me/255697983933?text=${encoded}`,"_blank")}

function openAssistant(){document.getElementById("assistant").classList.remove("hidden");document.getElementById("chatInput").focus()}

function closeAssistant(){document.getElementById("assistant").classList.add("hidden")}

function changeAILanguage(){let lang=document.getElementById("aiLanguage").value;currentAILang=lang;let greeting=aiTranslations[lang]?.greeting||aiTranslations.en.greeting;document.getElementById("chatLog").innerHTML=`<div class="bot" id="botGreeting">${greeting}</div>`}

function sendChat(){let input=document.getElementById("chatInput"),q=input.value.trim();if(!q)return;let log=document.getElementById("chatLog");log.innerHTML+=`<div class="user-msg">${q}</div>`;let response=getAIResponse(q,currentAILang);log.innerHTML+=`<div class="bot">${response}</div>`;input.value="";log.scrollTop=log.scrollHeight}

renderMenu();renderCart();renderAccount();updateCartCount();
