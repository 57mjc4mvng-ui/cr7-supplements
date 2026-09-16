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
/* Mobile product gallery: swipe main image */
(function(){
  const css=document.createElement('style');
  css.textContent=`
    .detailimg > img{
      touch-action:pan-y;
    }

    @media (max-width:700px){
      .detailThumbs{
        display:none!important;
      }
      .detailimg{
        touch-action:pan-y;
      }
    }
  `;
  document.head.appendChild(css);

  let startX=0;
  let startY=0;

  const getGallery=()=>[
    ...document.querySelectorAll('.detailThumb')
  ];

  const moveGallery=(direction)=>{
    const thumbs=getGallery();
    if(thumbs.length<2)return;

    let current=thumbs.findIndex(
      t=>t.classList.contains('active')
    );

    if(current<0) current=0;

    const next=
      (current+direction+thumbs.length)%thumbs.length;

    thumbs[next].click();
  };

  const bind=()=>{
    document.querySelectorAll('.detailimg > img').forEach(img=>{
      if(img.dataset.swipeBound)return;
      img.dataset.swipeBound='1';

      img.addEventListener('touchstart',e=>{
        startX=e.touches[0].clientX;
        startY=e.touches[0].clientY;
      },{passive:true});

      img.addEventListener('touchend',e=>{
        const dx=e.changedTouches[0].clientX-startX;
        const dy=e.changedTouches[0].clientY-startY;

        if(Math.abs(dx)<45 || Math.abs(dx)<Math.abs(dy))return;

        moveGallery(dx<0 ? 1 : -1);
      },{passive:true});
    });
  };

  bind();

  new MutationObserver(bind).observe(
    document.body,
    {subtree:true,childList:true}
  );
})();
