(async function initHome(){
  const $next=document.querySelector('#next-event');
  const $upcoming=document.querySelector('#events-upcoming');
  const $past=document.querySelector('#events-past');
  let events=[];
  try{
    const res=await fetch('/events/events.json',{cache:'no-store'});
    if(!res.ok) throw new Error('No se pudo cargar events.json');
    events=await res.json();
  }catch(e){
    console.error(e);
    if($upcoming) $upcoming.innerHTML='<p>No es posible cargar los eventos en este momento.</p>';
    return;
  }
  const required=['slug','title','startDate','pageUrl','cardImage','description','status'];
  events=events.filter(ev=>required.every(k=>k in ev));
  events.sort((a,b)=> new Date(a.startDate)-new Date(b.startDate));
  const now=new Date();
  const upcomingList=events.filter(e=> new Date(e.startDate)>=now);
  const pastList=events.filter(e=> new Date(e.startDate)<now).reverse();
  const nextEvent=upcomingList[0]||pastList[0];
  if($next&&nextEvent){ $next.appendChild(renderHighlight(nextEvent)); }
  if($upcoming) renderCardGrid(upcomingList,$upcoming);
  if($past) renderCardGrid(pastList,$past);

  function renderHighlight(ev){
    const a=document.createElement('a');
    a.href=ev.pageUrl; a.className='block rounded-2xl overflow-hidden shadow-lg border border-cyan-400 hover:shadow-xl transition';
    a.innerHTML=`
      <div class="aspect-[16/9] overflow-hidden bg-black"><img src="${ev.cardImage}" alt="${escapeHtml(ev.title)}" style="width:100%;height:100%;object-fit:cover"></div>
      <div class="p-4 bg-[#111827]">
        <h2 class="text-xl font-bold text-cyan-300 mb-1">${escapeHtml(ev.title)}</h2>
        <p class="text-gray-300 text-sm mb-1">${formatDateRange(ev.startDate,ev.endDate)}</p>
        <p class="text-gray-400 text-sm">${escapeHtml(ev.venueName||'')}</p>
        <p class="text-gray-300 text-sm mt-2 line-clamp-2">${escapeHtml(ev.description)}</p>
        <span class="inline-block mt-3 px-4 py-2 rounded bg-cyan-400 text-black font-semibold">Ver detalles</span>
      </div>`;
    return a;
  }
  function renderCardGrid(list,mount){
    mount.innerHTML='';
    list.forEach(ev=>{
      const a=document.createElement('a');
      a.href=ev.pageUrl; a.className='event-card block rounded-xl overflow-hidden bg-[#0f172a] border border-cyan-400/30 hover:border-cyan-400 transition';
      a.innerHTML=`
        <img src="${ev.heroThumb||ev.cardImage}" alt="${escapeHtml(ev.title)}" style="width:100%;height:160px;object-fit:cover">
        <div class="p-3">
          <h3 class="text-lg font-semibold text-cyan-300">${escapeHtml(ev.title)}</h3>
          <p class="text-gray-400 text-sm">${formatDateRange(ev.startDate,ev.endDate)}</p>
        </div>`;
      mount.appendChild(a);
    });
  }
  function formatDateRange(startISO,endISO){
    const start=new Date(startISO); const end=endISO?new Date(endISO):null;
    const datePart=start.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const timeStart=start.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    const timeEnd=end?end.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}):'';
    return end?`${datePart} • ${timeStart}–${timeEnd}`:`${datePart} • ${timeStart}`;
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
})();