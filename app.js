const waters=[["Zürichsee","Zürich",47.27,8.63,["Egli","Hecht","Felchen","Seeforelle"]],["Herrliberg-Uferbereich","Zürichsee",47.289,8.612,["Egli","Hecht","Felchen","Seeforelle"]],["Greifensee","Zürich",47.35,8.68,["Egli","Hecht","Weissfische"]],["Bodensee","Ostschweiz",47.62,9.35,["Egli","Hecht","Felchen","Forelle"]],["Vierwaldstättersee","Zentralschweiz",46.98,8.45,["Egli","Hecht","Felchen","Seeforelle"]],["Walensee","Ostschweiz",47.12,9.2,["Egli","Hecht","Felchen","Forelle"]],["Genfersee","Westschweiz",46.45,6.55,["Egli","Hecht","Felchen"]],["Thunersee","Bern",46.69,7.72,["Egli","Hecht","Felchen","Seeforelle"]],["Brienzersee","Bern",46.73,7.96,["Forelle","Felchen","Egli"]]];
const fish={Egli:["🐟","Leichtes Spinnfischen oder erlaubte Naturköder.","Kleine Gummiköder, Wobbler oder erlaubte Naturköder.","Leichte Spinnrute, passende Rolle und Vorfach."],Hecht:["🐊","Spinnfischen mit kräftigem, geeignetem Gerät.","Hechtgeeignete Kunstköder; bissfestes Vorfach.","Kräftige Rute, Rolle, bissfestes Vorfach, Hakenlöser."],Felchen:["🐠","Spezialisierte Felchenmethode gemäss lokalen Regeln.","Kleine Nymphen oder lokal erlaubte Köder.","Passende Felchenrute und feine Montage."],Forelle:["🐟","Spinn- oder Fliegenfischen, sofern zugelassen.","Kleine Kunstköder oder Fliegen.","Leichte Rute, feines Vorfach, Hakenlöser."],Seeforelle:["🐟","Gewässerspezifische Methode und Vorschriften beachten.","Geeignete Kunstköder gemäss erlaubter Methode.","Passende Rute, Rolle und Vorfach."],Alet:["🐟","Posen- oder Grundmontage, sofern erlaubt.","Erlaubte Naturköder.","Mittlere Rute und passende Schnur."],Barbe:["🐟","Nur an erlaubten, sicheren Flussabschnitten.","Erlaubte Naturköder.","Robuste Rute und passende Montage."]};
const $=id=>document.getElementById(id), read=k=>JSON.parse(localStorage.getItem("ss_"+k)||"[]"), save=(k,v)=>localStorage.setItem("ss_"+k,JSON.stringify(v));let selected=["Egli","Hecht"],map;
function toast(s){$("toast").textContent=s;$("toast").style.display="block";setTimeout(()=>$("toast").style.display="none",2200)}
function tab(t){document.querySelectorAll(".page").forEach(x=>x.classList.toggle("active",x.id===t));if(t==="map")initMap();window.scrollTo(0,0)}
document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>tab(b.dataset.tab));document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>tab(b.dataset.open));
waters.forEach(w=>$("water").add(new Option(w[0],w[0])));
function choices(){$("choices").innerHTML=Object.keys(fish).map(f=>`<button type="button" data-f="${f}" class="${selected.includes(f)?"sel":""}">${fish[f][0]} ${f}</button>`).join("");document.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{selected=selected.includes(b.dataset.f)?selected.filter(x=>x!==b.dataset.f):[...selected,b.dataset.f];choices()})}choices();
$("createPlan").onclick=()=>{if(!selected.length)return toast("Bitte Fisch auswählen.");let w=waters.find(x=>x[0]===$("water").value),method=$("method").value,items=[...new Set(selected.flatMap(f=>[fish[f][2],fish[f][3]])), "Zange und Hakenlöser","Massband","Ausweis und nötige Bewilligung","Wettergerechte Kleidung","Trinkwasser"];let plans=read("plans");plans.push({water:w[0],fish:selected,method,date:$("date").value});save("plans",plans);$("planResult").innerHTML=`<h3>Unsere Empfehlungen für ${w[0]}</h3><p>Zielfische: ${selected.join(", ")} · ${method}</p><p class="note">Beispiel-Empfehlung: Fischvorkommen, Zugang und Angelrecht bitte offiziell prüfen. Keine Fanggarantie.</p><h3>Köder & Ausrüstung</h3>${selected.map(f=>`<p><b>${f}:</b> ${fish[f][1]} ${fish[f][2]} ${fish[f][3]}</p>`).join("")}<h3>Deine Packliste</h3>${items.map((x,i)=>`<label><input type="checkbox" style="width:auto"> ${x}</label>`).join("")}`;updateStats();toast("Angelplan erstellt.")};
$("fishList").innerHTML=Object.keys(fish).map(f=>`<article data-fish="${f}">${fish[f][0]} <b>${f}</b><small>Details ansehen</small></article>`).join("");document.querySelectorAll("#fishList article").forEach(a=>a.onclick=()=>{let f=a.dataset.fish,d=fish[f];$("fishDetail").innerHTML=`<h3>${d[0]} ${f}</h3><p>${d[1]}</p><p><b>Köder:</b> ${d[2]}</p><p><b>Ausrüstung:</b> ${d[3]}</p><p class="note">Schonzeiten, Mindestmasse und Vorkommen immer kantonal und gewässerspezifisch prüfen.</p>`});
function initMap(){if(map||!window.L){$("mapbox").textContent="Kartenbibliothek lädt nicht. Internetverbindung prüfen.";return} $("mapbox").innerHTML="";map=L.map("mapbox").setView([20,0],2);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(map);drawMap()}
let userMarkers=[];
function drawMap(){if(!map)return;map.eachLayer(l=>{if(l instanceof L.Marker)map.removeLayer(l)});let q=$("search").value.toLowerCase(),f=$("filter").value;waters.filter(w=>(!f||w[4].includes(f))&&(!q||w[0].toLowerCase().includes(q)||w[1].toLowerCase().includes(q))).forEach(w=>L.marker([w[2],w[3]]).addTo(map).bindPopup(`<b>${w[0]}</b><br>${w[4].join(", ")}<br><small>Nur regionaler Beispiel-Pin, kein bestätigter Spot.</small>`));userMarkers.forEach(m=>L.marker([m.lat,m.lon]).addTo(map).bindPopup(`<b>${m.name}</b><br><small>Von dir gesuchter Ort. Fischbestand, Angelrecht und Zugang nicht geprüft.</small>`))}
async function globalSearch(){
 let q=$("search").value.trim();
 if(!q)return toast("Bitte einen Ort oder ein Gewässer eingeben.");
 $("globalResults").innerHTML="<p class='muted'>Suche weltweit …</p>";
 try{
  let data=[];
  // Open-Meteo geocoding supports worldwide place-name searches and browser requests.
  const om=await fetch("https://geocoding-api.open-meteo.com/v1/search?count=8&language=de&format=json&name="+encodeURIComponent(q));
  if(om.ok){
   const j=await om.json();
   data=(j.results||[]).map(r=>({
    lat:String(r.latitude),lon:String(r.longitude),
    name:[r.name,r.admin1,r.country].filter(Boolean).join(", "),
    display_name:[r.name,r.admin1,r.country].filter(Boolean).join(", ")
   }));
  }
  // Also query OpenStreetMap so lakes, rivers and other named features can be found,
  // not just settlements returned by the place-name geocoder.
  try{
   const n=await fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&q="+encodeURIComponent(q),{headers:{"Accept-Language":"de"}});
   if(n.ok){
    const osm=await n.json();
    const known=new Set(data.map(r=>`${Number(r.lat).toFixed(4)},${Number(r.lon).toFixed(4)}`));
    osm.forEach(r=>{
     const key=`${Number(r.lat).toFixed(4)},${Number(r.lon).toFixed(4)}`;
     if(!known.has(key)){data.push(r);known.add(key);}
    });
   }
  }catch(_e){/* Keep any successful Open-Meteo results. */}
  data=data.slice(0,10);
  if(!data.length){$("globalResults").innerHTML="<p>Keine Treffer gefunden. Bitte einen genaueren Orts- oder Gewässernamen eingeben.</p>";return;}
  $("globalResults").innerHTML=data.map((r,i)=>`<article><b>${String(r.display_name||r.name||"Treffer").replace(/[<>]/g,"")}</b><p><button type="button" data-global="${i}">Auf Karte zeigen</button></p></article>`).join("");
  document.querySelectorAll("[data-global]").forEach(b=>b.onclick=()=>{
   let r=data[+b.dataset.global],lat=Number(r.lat),lon=Number(r.lon);
   if(!Number.isFinite(lat)||!Number.isFinite(lon))return;
   let placeName=String(r.name||r.display_name).replace(/[<>]/g,"");
   userMarkers.push({lat,lon,name:placeName});
   $("checkName").value=String(r.display_name||r.name).replace(/[<>]/g,"");
   $("checkLat").value=lat;$("checkLon").value=lon;
   if(!map)initMap();
   if(map){map.setView([lat,lon],12);drawMap();}
   toast("Ort markiert. Fischbestand und Angelrecht bitte separat prüfen.");
  });
 }catch(e){
  $("globalResults").innerHTML="<p>Die weltweite Suche konnte nicht geladen werden. Prüfe die Internetverbindung und versuche es erneut.</p>";
 }
}
$("globalSearch").onclick=globalSearch;

// Gewässer-Check: GBIF-Beobachtungen sind Hinweise auf dokumentierte Vorkommen,
// keine Garantie für aktuellen Bestand oder Fangbarkeit. Angelrecht wird nie geraten.
$("runCheck").onclick=async()=>{
 const name=$("checkName").value.trim(),lat=Number($("checkLat").value),lon=Number($("checkLon").value);
 if(!name||!$("checkLat").value||!$("checkLon").value||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180){toast("Bitte Ort und gültige Koordinaten angeben.");return;}
 const out=$("checkResult");out.innerHTML="<p class='muted'>Suche in der globalen Biodiversitäts-Datenbank …</p>";
 const rulesQuery=encodeURIComponent(name+" fishing regulations official government fishing license seasons protected areas");
 const rulesUrl="https://www.google.com/search?q="+rulesQuery;
 try{
  const api=`https://api.gbif.org/v1/occurrence/search?decimalLatitude=${lat}&decimalLongitude=${lon}&geoDistance=10km&class=Actinopterygii&occurrenceStatus=PRESENT&limit=300`;
  const response=await fetch(api,{headers:{"Accept":"application/json"}});if(!response.ok)throw new Error("GBIF nicht erreichbar");
  const data=await response.json();const records=data.results||[];const grouped=new Map();
  records.forEach(r=>{const sci=r.species||r.scientificName;if(!sci)return;const common=r.vernacularName||"Kein deutscher/örtlicher Name in diesem Datensatz";if(!grouped.has(sci))grouped.set(sci,{common,sci,count:0,year:r.year||null});const x=grouped.get(sci);x.count++;if(r.year&&(!x.year||r.year>x.year))x.year=r.year;});
  const species=[...grouped.values()].sort((a,b)=>b.count-a.count).slice(0,25);
  const list=species.length?`<ul>${species.map(x=>`<li><b>${x.common}</b> <i>(${x.sci})</i> – ${x.count} Datensatz/Datensätze${x.year?`, jüngstes Jahr im Treffer: ${x.year}`:""}</li>`).join("")}</ul>`:"<p>Keine passenden Fisch-Beobachtungen im gewählten Suchradius gefunden. Das bedeutet nicht, dass dort keine Fische leben.</p>";
  out.innerHTML=`<h3>Ergebnis für ${name.replace(/[<>]/g,"")}</h3><p><b>Fisch-Nachweise:</b> ${records.length} GBIF-Datensätze im Umkreis von 10 km.</p>${list}<p class='note'>Diese Liste zeigt dokumentierte Beobachtungen (GBIF), nicht den sicheren aktuellen Fischbestand. Ein fehlender Eintrag beweist nicht, dass eine Art fehlt. Meldungen können alt sein oder aus dem weiteren Umfeld stammen.</p><h3>🎣 Darf man dort angeln?</h3><p><b>Status: Nicht bestätigt.</b> SeeScout kann das Angelrecht an diesem Ort noch nicht zuverlässig automatisch feststellen. Bitte erst nach Prüfung einer zuständigen offiziellen Behörde angeln.</p><p><a href="${rulesUrl}" target="_blank" rel="noopener">Offizielle Angelregeln für diesen Ort suchen ↗</a></p><p class='muted'>Prüfe dort insbesondere: benötigtes Patent/Lizenz, erlaubte Ufer- und Wasserzonen, Schonzeiten, Mindestmasse, Fanglimiten, erlaubte Methoden sowie Schutzgebiete und lokale Sperren.</p><small>Datenquelle Fischbeobachtungen: <a href="https://www.gbif.org/" target="_blank" rel="noopener">GBIF</a> · geprüft am ${new Date().toLocaleDateString("de-CH")}. Die offizielle Rechtslage wurde nicht automatisch verifiziert.</small>`;
 }catch(e){out.innerHTML=`<p>Die Fischdaten konnten gerade nicht geladen werden. Bitte Internetverbindung prüfen und erneut versuchen.</p><p><b>Angelrecht: Nicht bestätigt.</b> <a href="${rulesUrl}" target="_blank" rel="noopener">Offizielle Angelregeln für diesen Ort suchen ↗</a></p>`;}
};

function renderWaters(){let q=$("search").value.toLowerCase(),f=$("filter").value;$("waters").innerHTML=waters.filter(w=>(!f||w[4].includes(f))&&(!q||w[0].toLowerCase().includes(q)||w[1].toLowerCase().includes(q))).map(w=>`<article><b>${w[0]}</b><p>${w[1]} · ${w[4].join(", ")}</p><button data-plan="${w[0]}">Angelplan erstellen</button></article>`).join("");document.querySelectorAll("[data-plan]").forEach(b=>b.onclick=()=>{$("water").value=b.dataset.plan;tab("planner")})}["search","filter"].forEach(id=>$(id).oninput=()=>{renderWaters();drawMap()});renderWaters();
$("catchDate").value=new Date().toISOString().slice(0,10);$("date").value=$("catchDate").value;
$("catchForm").onsubmit=async e=>{e.preventDefault();let photo="",f=$("photo").files[0];if(f)photo=await new Promise(r=>{let rd=new FileReader();rd.onload=()=>r(rd.result);rd.readAsDataURL(f)});let a=read("catches");a.unshift({fish:$("catchFish").value,date:$("catchDate").value,place:$("place").value,length:$("length").value,bait:$("bait").value,note:$("note").value,photo});save("catches",a);e.target.reset();renderCatches();updateStats();toast("Fang lokal gespeichert.")};
function renderCatches(){$("catches").innerHTML=read("catches").map((c,i)=>`<article><b>${c.fish}</b> · ${c.date}<p>${c.place||""} ${c.length?c.length+" cm":""} ${c.bait||""}</p><p>${c.note||""}</p>${c.photo?`<img src="${c.photo}" style="max-width:100%;max-height:180px;border-radius:10px">`:""}<button data-del="${i}">Löschen</button></article>`).join("")||"<p>Noch keine Fänge eingetragen.</p>";document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{let a=read("catches");a.splice(+b.dataset.del,1);save("catches",a);renderCatches();updateStats()})}renderCatches();
$("postForm").onsubmit=e=>{e.preventDefault();let t=$("postText").value.trim();if(!t)return;let a=read("posts");a.unshift({text:t,date:new Date().toLocaleString("de-CH")});save("posts",a);$("postText").value="";renderPosts()};function renderPosts(){$("posts").innerHTML=read("posts").map(p=>`<article><small>${p.date}</small><p>${p.text.replace(/[<>]/g,"")}</p></article>`).join("")||"<p>Noch keine Beiträge.</p>"}renderPosts();
$("chatForm").onsubmit=e=>{e.preventDefault();let q=$("question").value.trim();if(!q)return;$("chat").innerHTML+=`<p><b>Du:</b> ${q.replace(/[<>]/g,"")}</p><p><b>SeeScout:</b> Ich bin die lokale Demo. Ich kann allgemeine Hinweise geben: Zielfisch wählen, offizielle Regeln prüfen und Köder an Gewässer und Methode anpassen. Für echte KI-Antworten braucht es später einen sicheren Server.</p>`;$("question").value=""};
function updateStats(){$("countCatch").textContent=read("catches").length;$("countSaved").textContent=read("saved").length;$("countPlans").textContent=read("plans").length}updateStats();
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));

// SeeScout 3.0: activity estimate, photo preview, and optional Supabase account sync.
const activityProfiles={
 "Egli":[45,60,72,55,35,30,48,68,82,70,52,40],
 "Hecht":[35,45,62,70,55,35,30,42,65,78,60,45],
 "Felchen":[30,45,60,55,40,35,48,62,70,58,42,30],
 "Forelle":[55,70,62,45,30,28,42,60,75,65,48,40],
 "Seeforelle":[35,45,58,62,50,35,40,55,68,60,45,32],
 "Zander":[35,50,68,75,55,30,25,45,72,85,60,40],
 "Alet":[45,55,62,50,40,35,45,55,60,52,45,38],
 "Barbe":[40,50,62,55,45,35,42,55,65,58,45,35]
};
$("makeActivity").onclick=()=>{
 const place=$("activityPlace").value.trim(),fishName=$("activityFish").value,season=$("activitySeason").value;
 if(!place){toast("Bitte zuerst einen Ort eingeben.");return;}
 const base=activityProfiles[fishName]||activityProfiles.Egli;
 const seasonFactor={spring:1.0,summer:0.92,autumn:1.04,winter:0.72}[season];
 const labels=["00","02","04","06","08","10","12","14","16","18","20","22"];
 const vals=base.map((v,i)=>Math.max(8,Math.min(95,Math.round(v*seasonFactor + ((i%3)-1)*3))));
 $("activityResult").innerHTML=`<h3>${fishName} – ${place.replace(/[<>]/g,"")}</h3><div id="activityBars">${vals.map((v,i)=>`<div class="activity-col"><span class="activity-score">${v}%</span><div class="activity-bar" style="height:${v}%"></div><small>${labels[i]} h</small></div>`).join("")}</div><p class="note">Illustrative Aktivitätsschätzung anhand allgemeiner Tages- und Saisonmuster. Keine Messdaten für diesen Ort, keine Wetter-/Wassertemperaturmessung und keine Fanggarantie. Lokale Fischbestände und Regeln separat prüfen.</p>`;
};
$("fishPhoto").onchange=()=>{
 const f=$("fishPhoto").files&&$("fishPhoto").files[0];if(!f)return;
 if(!f.type.startsWith("image/")){toast("Bitte eine Bilddatei auswählen.");return;}
 const url=URL.createObjectURL(f);$("fishPhotoPreview").src=url;$("fishPhotoPreview").style.display="block";
 $("photoResult").innerHTML="<p><b>Foto geladen.</b> Die automatische Fisch-Erkennung ist noch nicht verbunden. Dieses Foto wurde nicht an einen Erkennungsdienst gesendet.</p>";
};

// Supabase setup is optional. The public anon key belongs in config.js; never put a service-role key in the app.
const ssConfig=window.SEESCOUT_CONFIG||{};
let ssClient=null;
function accountMessage(msg){$("accountStatus").textContent=msg;}
function initAccount(){
 if(!window.supabase||!ssConfig.url||!ssConfig.anonKey||ssConfig.url.includes("DEINE_")||ssConfig.anonKey.includes("DEIN_")){
  accountMessage("Noch nicht eingerichtet. Für echte Anmeldung und Synchronisierung zuerst die Schritte in SETUP_KONTO.txt ausführen.");return;
 }
 try{
  ssClient=window.supabase.createClient(ssConfig.url,ssConfig.anonKey);
  ssClient.auth.getSession().then(({data})=>accountMessage(data.session?"Angemeldet: "+data.session.user.email:"Noch nicht angemeldet."));
  ssClient.auth.onAuthStateChange((_event,session)=>accountMessage(session?"Angemeldet: "+session.user.email:"Nicht angemeldet."));
 }catch(e){accountMessage("Kontodienst konnte nicht gestartet werden. Konfiguration prüfen.");}
}
async function authAction(mode){
 if(!ssClient){accountMessage("Kontodienst noch nicht eingerichtet. Bitte SETUP_KONTO.txt beachten.");return;}
 const email=$("authEmail").value.trim(),password=$("authPassword").value;
 if(!email||password.length<8){accountMessage("Bitte E-Mail und ein Passwort mit mindestens 8 Zeichen eingeben.");return;}
 const result=mode==="signup"?await ssClient.auth.signUp({email,password}):await ssClient.auth.signInWithPassword({email,password});
 if(result.error){accountMessage("Anmeldung fehlgeschlagen: "+result.error.message);return;}
 accountMessage(mode==="signup"?"Konto erstellt. Falls E-Mail-Bestätigung aktiviert ist, bitte Postfach prüfen.":"Erfolgreich angemeldet.");
}
$("signupForm").onsubmit=async e=>{e.preventDefault();await authAction("signup");};
$("loginBtn").onclick=()=>authAction("login");
$("logoutBtn").onclick=async()=>{if(!ssClient){accountMessage("Kontodienst noch nicht eingerichtet.");return;}const r=await ssClient.auth.signOut();accountMessage(r.error?r.error.message:"Abgemeldet.");};
$("syncBtn").onclick=async()=>{
 if(!ssClient){accountMessage("Kontodienst noch nicht eingerichtet.");return;}
 const {data:{user}}=await ssClient.auth.getUser();if(!user){accountMessage("Bitte zuerst anmelden.");return;}
 const payload={catches:read("catches"),posts:read("posts"),plans:read("plans"),saved:read("saved")};
 const r=await ssClient.from("user_data").upsert({user_id:user.id,data:payload,updated_at:new Date().toISOString()},{onConflict:"user_id"});
 if(r.error){accountMessage("Synchronisierung fehlgeschlagen: "+r.error.message);return;}
 const fetched=await ssClient.from("user_data").select("data").eq("user_id",user.id).maybeSingle();
 if(!fetched.error&&fetched.data&&fetched.data.data){
  Object.entries(fetched.data.data).forEach(([k,v])=>save(k,v));
  renderCatches();renderPosts();updateStats();
 }
 accountMessage("Synchronisierung abgeschlossen. Auf dem zweiten Gerät mit demselben Konto anmelden und ebenfalls synchronisieren.");
};
initAccount();
