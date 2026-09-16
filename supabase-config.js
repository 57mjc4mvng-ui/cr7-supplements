// CR7 Supplements — Supabase browser configuration
// IMPORTANT: use ONLY the Supabase PUBLISHABLE key here. Never put a secret/service_role key in this file.
window.CR7_SUPABASE_URL = 'https://fjjuemmfpcqexjxbijok.supabase.co';
window.CR7_SUPABASE_KEY = 'sb_publishable_Da5krg6AYg3pnLoJDeCrWQ_St2Va1Ge';
/* Prevent old fallback product images from flashing before live Supabase data arrives. */
(function(){
  const host='fjjuemmfpcqexjxbijok.supabase.co/storage/';
  const style=document.createElement('style');
  style.id='cr7-live-image-guard';
  style.textContent=`
    .featuredStage img:not([src*="${host}"]),
    .featuredThumbs img:not([src*="${host}"]),
    .pic img:not([src*="${host}"]),
    .detailimg > img:not([src*="${host}"]),
    .detailThumbs img:not([src*="${host}"]){
      opacity:0!important;
    }
  `;
  document.head.appendChild(style);

  let done=false;
  const release=()=>{
    if(done)return;
    done=true;
    style.remove();
    observer.disconnect();
  };

  const check=()=>{
    const imgs=[...document.querySelectorAll('img[src*="'+host+'"]')];
    if(imgs.some(img=>img.complete && img.naturalWidth>0)) release();
  };

  const observer=new MutationObserver(check);
  observer.observe(document.documentElement,{
    subtree:true,
    childList:true,
    attributes:true,
    attributeFilter:['src']
  });

  setTimeout(release,5000);
})();
