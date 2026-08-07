const spots = [
  ['해운대 해수욕장','해운대구 · 해운대해변로','paddle',35.1587,129.1604,'96%','파도 0.5m','바람 3m/s','수온 23°','보통이에요','렌탈샵 12곳'],
  ['송정 해수욕장','해운대구 · 송정동','surf',35.1788,129.1996,'98%','파도 0.8m','바람 5m/s','수온 23°','여유로워요','렌탈샵 3곳'],
  ['광안리 해수욕장','수영구 · 광안해변로','paddle',35.1532,129.1188,'94%','파도 0.4m','바람 3m/s','수온 24°','보통이에요','렌탈샵 5곳'],
  ['다대포 해수욕장','사하구 · 다대동','kayak',35.0464,128.9658,'91%','파도 0.6m','바람 4m/s','수온 22°','여유로워요','렌탈샵 2곳'],
  ['일광 해수욕장','기장군 · 일광읍','kayak',35.2645,129.2336,'90%','파도 0.4m','바람 3m/s','수온 22°','한적해요','렌탈샵 2곳'],
  ['임랑 해수욕장','기장군 · 장안읍','surf',35.3200,129.2670,'88%','파도 0.7m','바람 5m/s','수온 22°','한적해요','렌탈샵 1곳'],
  ['송도 해수욕장','서구 · 송도해변로','paddle',35.0750,129.0170,'86%','파도 0.3m','바람 3m/s','수온 23°','보통이에요','렌탈샵 4곳'],
  ['대변항 해안','기장군 · 기장읍','kayak',35.2240,129.2240,'84%','파도 0.3m','바람 2m/s','수온 22°','한적해요','대여점 1곳'],
  ['오륙도 해맞이공원','남구 · 오륙도로','kayak',35.1000,129.1230,'82%','파도 0.5m','바람 4m/s','수온 23°','확인 필요','편의시설 2곳'],
  ['태종대 감지해변','영도구 · 태종대','kayak',35.0540,129.0870,'80%','파도 0.6m','바람 4m/s','수온 22°','한적해요','대여점 1곳'],
  ['기장 연화리','기장군 · 연화리','paddle',35.2250,129.2440,'79%','파도 0.3m','바람 3m/s','수온 22°','한적해요','대여점 1곳'],
  ['청사포 해변','해운대구 · 청사포','surf',35.1590,129.2000,'78%','파도 0.5m','바람 4m/s','수온 23°','한적해요','렌탈샵 1곳'],
  ['신호 해수욕장','강서구 · 신호동','paddle',35.0800,128.8800,'77%','파도 0.3m','바람 3m/s','수온 23°','한적해요','편의시설 2곳'],
  ['몰운대 해안','사하구 · 몰운대','kayak',35.0480,128.9665,'76%','파도 0.5m','바람 4m/s','수온 22°','확인 필요','대여점 1곳'],
  ['가덕도 대항항','강서구 · 가덕도','kayak',34.9950,128.8110,'75%','파도 0.4m','바람 3m/s','수온 22°','한적해요','대여점 1곳'],
  ['공수마을 해안','기장군 · 공수마을','paddle',35.1900,129.2200,'74%','파도 0.3m','바람 2m/s','수온 22°','한적해요','편의시설 1곳'],
  ['해동용궁사 해안','기장군 · 시랑리','kayak',35.1880,129.2230,'73%','파도 0.4m','바람 3m/s','수온 22°','보통이에요','편의시설 3곳'],
  ['칠암 해안','기장군 · 일광면','surf',35.2750,129.2650,'71%','파도 0.6m','바람 4m/s','수온 22°','한적해요','대여점 1곳']
].map((item,index)=>({name:item[0],location:`부산 ${item[1]}`,activity:item[2],lat:item[3],lng:item[4],score:item[5],wave:item[6],wind:item[7],water:item[8],crowd:item[9],rental:item[10],rating:(4.9-index*.04).toFixed(1),views:1540-index*83+(index%3)*47,baseDistance:Math.max(.8,Math.round((Math.abs(35.16-item[3])*95+Math.abs(129.14-item[4])*70)*10)/10),query:`${item[0]} 부산`,visual:index%3===0?'visual-songjeong':index%3===1?'visual-gwangalli':'visual-dadaepo'}))
const fallbackImages=['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82','https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=82','https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=82','https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=82'];const commonsFile=name=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1200`;const preferredImages={'해운대 해수욕장':commonsFile('Haeundae Beach in Busan.jpg'),'송정 해수욕장':commonsFile('Songjeong Beach.jpg'),'광안리 해수욕장':commonsFile('Gwangalli Beach and Gwangan Bridge Busan.jpg'),'다대포 해수욕장':commonsFile('Dadaepo Beach, Busan, Korea.jpg'),'일광 해수욕장':commonsFile('일광해수욕장.jpg'),'송도 해수욕장':commonsFile('Songdo Beach Area and Namhang Bridge in Busan.jpg'),'오륙도 해맞이공원':commonsFile('Oryukdo, Busan, South Korea 01.jpg'),'해동용궁사 해안':commonsFile('Haedong Yonggungsa Temple view on sea.JPG')};
const grid=document.querySelector('#recommendationGrid'),toast=document.querySelector('#toast'),pageView=document.querySelector('#pageView'),detailView=document.querySelector('#detailView'),profileView=document.querySelector('#profileView'),moreButton=document.querySelector('#moreSpotsButton');
const maps=[],markers=[],infos=[];let sortMode='match',showAll=false,detailMap=null,pageMap=null;const getImage=spot=>spot.image||preferredImages[spot.name]||fallbackImages[spots.indexOf(spot)%fallbackImages.length];const refreshSpotImage=spot=>{document.querySelectorAll(`[data-image-for="${spot.name}"]`).forEach(n=>n.style.backgroundImage=`url('${getImage(spot)}')`)};const favorites=()=>JSON.parse(localStorage.getItem('seaPickFavorites')||'[]');
function toastMessage(text){toast.textContent=text;toast.classList.add('show');clearTimeout(window.seaToast);window.seaToast=setTimeout(()=>toast.classList.remove('show'),2400)}
const busanCenter={lat:35.1796,lng:129.0756};const regionCenters={'부산 전체':busanCenter,'중구':{lat:35.1063,lng:129.0324},'서구':{lat:35.0967,lng:129.0244},'동구':{lat:35.1293,lng:129.0457},'영도구':{lat:35.0912,lng:129.0679},'부산진구':{lat:35.1628,lng:129.0531},'동래구':{lat:35.205,lng:129.0836},'남구':{lat:35.1366,lng:129.0848},'북구':{lat:35.1972,lng:128.9904},'해운대구':{lat:35.1631,lng:129.1635},'사하구':{lat:35.1046,lng:128.9747},'금정구':{lat:35.243,lng:129.0921},'강서구':{lat:35.2122,lng:128.9804},'연제구':{lat:35.1762,lng:129.0798},'수영구':{lat:35.1455,lng:129.1132},'사상구':{lat:35.1526,lng:128.991},'기장군':{lat:35.2446,lng:129.2223}};function distanceFor(spot){const region=localStorage.getItem('seaPickRegion')||'';const origin=regionCenters[region]||busanCenter;const latDistance=(spot.lat-origin.lat)*111;const lngDistance=(spot.lng-origin.lng)*91;return Math.round(Math.sqrt(latDistance*latDistance+lngDistance*lngDistance)*10)/10}
function sorted(items){return [...items].sort((a,b)=>sortMode==='distance'?distanceFor(a)-distanceFor(b):sortMode==='views'?b.views-a.views:Number(b.score.replace('%',''))-Number(a.score.replace('%','')))}
function cardHtml(spot,index,compact=false){return `<article class="spot-card${compact?' saved-card':''}" data-spot="${spot.name}"><div class="spot-visual ${spot.visual}" data-image-for="${spot.name}" style="background-image:url('${getImage(spot)}')"><span class="rank">${String(index+1).padStart(2,'0')} PICK</span><button class="favorite" aria-label="${spot.name} 찜하기" data-favorite="${spot.name}">${favorites().includes(spot.name)?'♥':'♡'}</button></div><div class="spot-info"><div class="spot-title-row"><h3>${spot.name}</h3><span class="rating">★ ${spot.rating}</span></div><p class="spot-location">${spot.location}</p><div class="condition-row"><span class="condition">${spot.wave}</span><span class="condition">${spot.wind}</span><span class="condition">${spot.water}</span></div><div class="spot-footer"><span>${spot.crowd} · ${spot.rental}</span><strong>적합도 ${spot.score}</strong></div></div></article>`}
function render(activity='all',query=''){const key=query.toLowerCase();const filtered=sorted(spots.filter(s=>(activity==='all'||s.activity===activity)&&(!key||`${s.name} ${s.location}`.toLowerCase().includes(key))));const visible=showAll?filtered:filtered.slice(0,6);grid.innerHTML=visible.length?visible.map((s,i)=>cardHtml(s,i)).join(''):`<div class="empty-state">검색 결과가 없어요. 다른 지역이나 해변을 찾아보세요.</div>`;moreButton.hidden=filtered.length<=6||showAll;moreButton.textContent=`부산 해수욕장 더보기 (${Math.max(0,filtered.length-6)}곳) ＋`;bindCards();updateMarkers(filtered)}
function bindCards(){grid.querySelectorAll('[data-spot]').forEach(card=>card.addEventListener('click',e=>{if(e.target.closest('button'))return;openDetail(spots.find(s=>s.name===card.dataset.spot))}));grid.querySelectorAll('[data-favorite]').forEach(button=>button.addEventListener('click',e=>{e.stopPropagation();const name=button.dataset.favorite;const saved=favorites();const next=saved.includes(name)?saved.filter(v=>v!==name):[...saved,name];localStorage.setItem('seaPickFavorites',JSON.stringify(next));button.textContent=next.includes(name)?'♥':'♡';button.style.color=next.includes(name)?'#f48e68':'';toastMessage(next.includes(name)?`${name}을(를) 찜했어요.`:`${name}을(를) 찜 목록에서 삭제했어요.`)}))}
function initMap(){const center={lat:35.16,lng:129.14};['googleMapMini','googleMapLarge'].forEach((id,i)=>{const node=document.querySelector(`#${id}`);if(node){const map=new google.maps.Map(node,{center,zoom:i?11:10,mapTypeControl:true,streetViewControl:false,fullscreenControl:true,gestureHandling:'greedy'});maps.push(map);node.parentElement.classList.add('google-maps-ready')}});updateMarkers(spots);loadPlacePhotos();loadCommonsPhotos()}
function updateMarkers(items){markers.forEach(m=>m.setMap(null));markers.length=0;infos.forEach(i=>i.close());infos.length=0;if(!maps.length)return;items.forEach(spot=>maps.forEach(map=>{const marker=new google.maps.Marker({map,position:{lat:spot.lat,lng:spot.lng},title:spot.name});const info=new google.maps.InfoWindow({content:`<div class="map-info-window"><img src="${getImage(spot)}" alt="${spot.name}"><div><strong>${spot.name}</strong><span>${spot.location}</span><div class="map-info-stats"><b>${spot.water}</b><b>${spot.wind}</b><b>${spot.wave}</b></div><small>${spot.crowd} · ${spot.rental}</small></div></div>`});marker.addListener('click',()=>{info.open({map,anchor:marker});map.panTo({lat:spot.lat,lng:spot.lng});map.setZoom(14);toastMessage(`${spot.name}의 바다 정보를 확인하세요.`)});markers.push(marker);infos.push(info)}))}
async function loadPlacePhotos(){try{const {Place}=await google.maps.importLibrary('places');for(const spot of spots){try{const result=await Place.searchByText({textQuery:`${spot.name}, 부산`,fields:['displayName','photos','location'],language:'ko',region:'KR',maxResultCount:1});const photo=result.places?.[0]?.photos?.[0];if(photo){spot.image=photo.getURI({maxWidth:900,maxHeight:500});document.querySelectorAll(`[data-image-for="${spot.name}"]`).forEach(n=>n.style.backgroundImage=`url('${spot.image}')`)}}catch(e){}}}catch(e){}}
async function loadCommonsPhotos(){for(const spot of spots){if(preferredImages[spot.name]){refreshSpotImage(spot);continue}try{const response=await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(`${spot.name} Busan`)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json&origin=*`);const data=await response.json();const page=Object.values(data.query?.pages||{})[0];const image=page?.imageinfo?.[0]?.thumburl||page?.imageinfo?.[0]?.url;if(image){spot.image=image;refreshSpotImage(spot)}}catch(e){}}}
function loadMaps(){if(!window.GOOGLE_MAPS_API_KEY)return;const script=document.createElement('script');script.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(window.GOOGLE_MAPS_API_KEY)}&libraries=places&callback=initGoogleMap`;script.async=true;script.defer=true;document.head.appendChild(script)}window.initGoogleMap=initMap;
function runSearch(){const q=document.querySelector('#searchInput').value.trim();showAll=false;render(document.querySelector('.activity-tab.active').dataset.activity,q);if(q)toastMessage(`'${q}' 위치를 찾았어요.`)}
function openDetail(spot){detailView.innerHTML=`<button class="detail-back" id="detailBack" type="button">← 추천 목록으로 돌아가기</button><div class="detail-hero"><div class="detail-photo" style="background-image:url('${getImage(spot)}')"></div><div class="detail-copy"><p class="eyebrow">SEA PICK DETAIL</p><h2>${spot.name}</h2><p class="detail-location">⌖ ${spot.location}</p><div class="detail-score"><strong>${spot.score}</strong><span>오늘의 활동 적합도<br>현재 컨디션 기준</span></div><div class="detail-stats"><div class="detail-stat"><span>수온</span><strong>${spot.water}</strong></div><div class="detail-stat"><span>풍속</span><strong>${spot.wind}</strong></div><div class="detail-stat"><span>파도</span><strong>${spot.wave}</strong></div></div></div></div><div class="detail-grid"><div class="detail-map-card"><h3>해수욕장 위치</h3><div class="detail-map" id="detailMap"></div></div><div class="detail-info-card"><h3>현장 정보</h3><ul class="detail-list"><li><span>혼잡도</span><strong>${spot.crowd}</strong></li><li><span>장비·편의시설</span><strong>${spot.rental}</strong></li><li><span>조회수</span><strong>${spot.views.toLocaleString()}회</strong></li><li><span>평점</span><strong>★ ${spot.rating}</strong></li></ul><div class="detail-note">출발 전 기상 특보와 장비 상태를 확인하고, 해가 지기 전에 물에서 나와 주세요.</div></div></div>`;document.body.classList.add('detail-active');detailView.hidden=false;history.pushState({detail:spot.name},'',`#place=${encodeURIComponent(spot.name)}`);document.querySelector('#detailBack').onclick=()=>history.back();if(window.google?.maps)setTimeout(()=>{detailMap=new google.maps.Map(document.querySelector('#detailMap'),{center:{lat:spot.lat,lng:spot.lng},zoom:14,streetViewControl:false});new google.maps.Marker({map:detailMap,position:{lat:spot.lat,lng:spot.lng},title:spot.name})},100)}
function openPage(page){document.body.classList.add('page-active');pageView.hidden=false;if(page==='map'){pageView.innerHTML='<button class="detail-back" id="pageBack" type="button">← 홈으로 돌아가기</button><div class="page-heading"><p class="eyebrow">ALL BEACHES MAP</p><h2>부산 해수욕장 지도</h2><p>마커를 눌러 해수욕장 정보를 확인하세요.</p></div><div class="full-page-map" id="googleMapPage"></div>';setTimeout(()=>{if(window.google?.maps){pageMap=new google.maps.Map(document.querySelector('#googleMapPage'),{center:{lat:35.16,lng:129.14},zoom:10,fullscreenControl:true});maps.push(pageMap);updateMarkers(spots)}},100)}else{const saved=spots.filter(s=>favorites().includes(s.name));pageView.innerHTML='<button class="detail-back" id="pageBack" type="button">← 홈으로 돌아가기</button><div class="page-heading"><p class="eyebrow">SAVED BEACHES</p><h2>찜한 장소</h2><p>다시 보고 싶은 해수욕장을 모아두었어요.</p></div>'+(saved.length?`<div class="saved-grid">${saved.map((s,i)=>cardHtml(s,i,true)).join('')}</div>`:'<div class="saved-empty"><span>♡</span><h3>아직 찜한 장소가 없어요.</h3><p>추천 카드의 하트를 눌러 마음에 드는 바다를 저장해 보세요.</p></div>');pageView.querySelectorAll('.saved-card').forEach(card=>card.addEventListener('click',e=>{if(!e.target.closest('button'))openDetail(spots.find(s=>s.name===card.dataset.spot))}))}history.pushState({page},'',`#${page==='map'?'map-page':'saved-page'}`);document.querySelector('#pageBack').onclick=()=>history.back()}
function closeViews(){document.body.classList.remove('detail-active','page-active','profile-active');detailView.hidden=true;pageView.hidden=true;profileView.hidden=true}
function openProfile(){profileView.hidden=false;document.body.classList.add('profile-active');const name=localStorage.getItem('seaPickName')||'민지';document.querySelector('#profileNameInput').value=name;document.querySelector('#regionInput').value=localStorage.getItem('seaPickRegion')||'';document.querySelector('#ageInput').value=localStorage.getItem('seaPickAge')||'';document.querySelector('#genderInput').value=localStorage.getItem('seaPickGender')||'';const chosen=JSON.parse(localStorage.getItem('seaPickActivities')||'[]');document.querySelectorAll('.preference-options input').forEach(i=>i.checked=chosen.includes(i.value));history.pushState({profile:true},'',`${location.pathname}${location.search}#profile`)}
document.querySelectorAll('.activity-tab').forEach(tab=>tab.onclick=()=>{document.querySelectorAll('.activity-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');showAll=false;render(tab.dataset.activity,document.querySelector('#searchInput').value.trim())});document.querySelector('#searchButton').onclick=runSearch;document.querySelector('#searchInput').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();runSearch()}};moreButton.onclick=()=>{showAll=true;render(document.querySelector('.activity-tab.active').dataset.activity,document.querySelector('#searchInput').value.trim())};document.querySelector('#profileButton').onclick=openProfile;document.querySelector('#navMap').onclick=e=>{e.preventDefault();openPage('map')};document.querySelector('#navSaved').onclick=e=>{e.preventDefault();openPage('saved')};document.querySelectorAll('.sort-button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.sort-button').forEach(x=>x.classList.remove('active'));b.classList.add('active');sortMode=b.dataset.sort;showAll=false;render(document.querySelector('.activity-tab.active').dataset.activity,document.querySelector('#searchInput').value.trim())});document.querySelector('#profileBack').onclick=()=>history.back();document.querySelector('#saveProfile').onclick=()=>{const name=document.querySelector('#profileNameInput').value.trim()||'민지';const region=document.querySelector('#regionInput').value;localStorage.setItem('seaPickName',name);localStorage.setItem('seaPickRegion',region);localStorage.setItem('seaPickAge',document.querySelector('#ageInput').value);localStorage.setItem('seaPickGender',document.querySelector('#genderInput').value);localStorage.setItem('seaPickActivities',JSON.stringify([...document.querySelectorAll('.preference-options input:checked')].map(i=>i.value)));document.querySelector('#visitorName').textContent=name;document.querySelector('#profileName').textContent=name;history.back();document.querySelector('#searchInput').value=region&&region!=='부산 전체'?region:'';render(document.querySelector('.activity-tab.active').dataset.activity,document.querySelector('#searchInput').value);toastMessage(`${name}님 프로필을 저장했어요.`)};window.onpopstate=()=>{closeViews()};
Object.assign(preferredImages,{'대변항 해안':commonsFile('Daebyeon Port 2.jpg'),'청사포 해변':commonsFile('Cheongsapo.jpg')});const photoQueries={'칠암 해안':'칠암항 부산','공수마을 해안':'공수마을 부산 기장','가덕도 대항항':'대항항 가덕도 부산','몰운대 해안':'몰운대 부산','신호 해수욕장':'신호해변 부산','기장 연화리':'연화리 부산 기장','태종대 감지해변':'태종대 감지해변 부산','임랑 해수욕장':'임랑해수욕장 부산'};const originalLoadCommonsPhotos=loadCommonsPhotos;loadCommonsPhotos=async()=>{for(const spot of spots){if(preferredImages[spot.name]){refreshSpotImage(spot);continue}try{const response=await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(photoQueries[spot.name]||`${spot.name} Busan`)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json&origin=*`);const data=await response.json();const page=Object.values(data.query?.pages||{})[0];const image=page?.imageinfo?.[0]?.thumburl||page?.imageinfo?.[0]?.url;if(image){spot.image=image;refreshSpotImage(spot)}}catch(e){}}};moreButton.onclick=()=>{showAll=!showAll;render(document.querySelector('.activity-tab.active').dataset.activity,document.querySelector('#searchInput').value.trim());if(showAll){moreButton.hidden=false;moreButton.textContent='부산 해수욕장 접기 ↑'}};render();loadMaps();
const saveProfileButton=document.querySelector('#saveProfile');const originalSaveProfile=saveProfileButton.onclick;saveProfileButton.onclick=()=>{const searchValue=document.querySelector('#searchInput').value;originalSaveProfile();document.querySelector('#searchInput').value=searchValue;render(document.querySelector('.activity-tab.active').dataset.activity,searchValue.trim())};
Object.assign(preferredImages,{'대변항 해안':commonsFile('Daebyeon Port 2.jpg'),'청사포 해변':commonsFile('Cheongsapo.jpg'),'가덕도 대항항':commonsFile('Gadeokdo.jpg'),'태종대 감지해변':commonsFile('Taejongdae in Busan.jpg')});
Object.assign(preferredImages,{'임랑 해수욕장':'https://loremflickr.com/900/600/beach,busan,korea?lock=81','기장 연화리':'https://loremflickr.com/900/600/coast,gijang,busan?lock=82','신호 해수욕장':'https://loremflickr.com/900/600/beach,saha,busan?lock=83','공수마을 해안':'https://loremflickr.com/900/600/coast,gijang,busan?lock=84','칠암 해안':'https://loremflickr.com/900/600/coast,gijang,busan?lock=85'});
Object.assign(preferredImages,{'기장 연화리':commonsFile('Haedong Yonggungsa Temple view on sea.JPG'),'신호 해수욕장':commonsFile('Dadaepo Beach, Busan, Korea.jpg'),'공수마을 해안':commonsFile('Songjeong Beach.jpg'),'칠암 해안':commonsFile('일광해수욕장.jpg')});
preferredImages['임랑 해수욕장']='https://www.visitbusan.net/upload_data/board_data/BBS_0000014/163903711526433.png';
const setupSaveProfile=saveProfileButton.onclick;saveProfileButton.onclick=()=>{setupSaveProfile();localStorage.setItem('seaPickProfileComplete','1')};
const safetyModal=document.querySelector('#safetyModal');const checklistInputs=[...document.querySelectorAll('#checklist input')];const updateChecklist=()=>{const done=checklistInputs.filter(input=>input.checked).length;document.querySelector('#checklistProgress').textContent=`${done}/${checklistInputs.length}`;return done};checklistInputs.forEach(input=>input.addEventListener('change',updateChecklist));document.querySelector('#safetyButton').onclick=()=>{safetyModal.classList.add('open');safetyModal.setAttribute('aria-hidden','false');updateChecklist()};document.querySelectorAll('[data-close-safety]').forEach(button=>button.addEventListener('click',()=>{safetyModal.classList.remove('open');safetyModal.setAttribute('aria-hidden','true')}));document.querySelector('#checkComplete').onclick=()=>{if(updateChecklist()===checklistInputs.length){safetyModal.classList.remove('open');safetyModal.setAttribute('aria-hidden','true');toastMessage('안전 체크리스트를 모두 확인했어요. 안전하게 다녀오세요!')}else{toastMessage(`${checklistInputs.length-updateChecklist()}개 항목을 더 확인해주세요.`)}};
if(!localStorage.getItem('seaPickProfileComplete')){localStorage.setItem('seaPickName',localStorage.getItem('seaPickName')||'사용자');setTimeout(()=>openProfile(),0)}
function showMapFallback(){document.querySelectorAll('.map-art,.large-map-art,.full-page-map').forEach(node=>{node.classList.add('map-fallback');if(node.querySelector('.google-map-error'))return;const panel=document.createElement('div');panel.className='google-map-error';panel.innerHTML='<div><strong>부산 해안 지도를 준비 중이에요.</strong><span>Google 지도 사용량 한도를 초과해 기본 해안 지도로 전환했어요.<br>아래 장소를 눌러 위치와 해양 정보를 확인할 수 있어요.</span><div class="fallback-place-list">'+spots.map(spot=>`<button type="button" data-fallback-place="${spot.name}">${spot.name}</button>`).join('')+'</div><a href="https://www.google.com/maps/search/?api=1&query=부산 해수욕장" target="_blank" rel="noreferrer">Google 지도에서 부산 해안 열기 ↗</a></div>';node.appendChild(panel);panel.querySelectorAll('[data-fallback-place]').forEach(button=>button.onclick=()=>{const spot=spots.find(item=>item.name===button.dataset.fallbackPlace);if(spot)openDetail(spot)})})}window.gm_authFailure=showMapFallback;setTimeout(()=>{if(!document.querySelector('.google-maps-ready'))showMapFallback()},4500);
Object.assign(preferredImages,{'기장 연화리':commonsFile('Yongungsa Coast View, Busan, Korea.jpg'),'신호 해수욕장':commonsFile('Sunset at Dadaepo Beach.jpg'),'공수마을 해안':commonsFile('Haedong Yonggungsa Temple, Busan - HaedongYonggungsa2706.jpg'),'칠암 해안':commonsFile('일광해수욕장 수상레저.jpg'),'몰운대 해안':'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/BS-D2.jpg/1280px-BS-D2.jpg'});loadPlacePhotos=async()=>{};
Object.assign(preferredImages,{'임랑 해수욕장':'https://www.visitbusan.net/upload_data/board_data/BBS_0000014/163903711526433.png','공수마을 해안':'https://www.xn--ob0b66vnogvydg9bu8mura767c.kr/files/attach/images/vill_common/4f4fc9174d4e87c9220024c333fa283f.jpg','기장 연화리':'https://visitbusan.net/archive/upload/2025/11/12/20251112152253297582_m.png'});['임랑 해수욕장','공수마을 해안','기장 연화리'].forEach(name=>refreshSpotImage(spots.find(spot=>spot.name===name)));
let mapApiFailed=false;window.gm_authFailure=()=>{mapApiFailed=true;showMapFallback()};const mapPageObserver=new MutationObserver(()=>{setTimeout(()=>{if(document.querySelector('#googleMapPage .gm-err-container')||mapApiFailed)showMapFallback()},250)});mapPageObserver.observe(pageView,{childList:true,subtree:true});
new MutationObserver(()=>{if(document.querySelector('#googleMapPage'))showMapFallback()}).observe(pageView,{childList:true,subtree:true});
function addFallbackMapVisual(){const minLat=34.95,maxLat=35.34,minLng=128.78,maxLng=129.31;document.querySelectorAll('.google-map-error').forEach(panel=>{if(panel.querySelector('.fallback-coast-map'))return;const visual=document.createElement('div');visual.className='fallback-coast-map';visual.innerHTML=spots.map(spot=>{const left=Math.max(5,Math.min(95,((spot.lng-minLng)/(maxLng-minLng))*100));const top=Math.max(6,Math.min(94,(1-(spot.lat-minLat)/(maxLat-minLat))*100));return `<button class="fallback-map-pin" style="left:${left}%;top:${top}%" title="${spot.name}" data-fallback-place="${spot.name}">●<span>${spot.name}</span></button>`}).join('');panel.firstElementChild.insertBefore(visual,panel.querySelector('.fallback-place-list'));visual.querySelectorAll('[data-fallback-place]').forEach(button=>button.onclick=()=>{const spot=spots.find(item=>item.name===button.dataset.fallbackPlace);if(spot)openDetail(spot)})})}new MutationObserver(addFallbackMapVisual).observe(document.body,{childList:true,subtree:true});setTimeout(addFallbackMapVisual,100);
const hiddenSpots=new Set(['대변항 해안','임랑 해수욕장','공수마을 해안','기장 연화리','신호 해수욕장','칠암 해안','가덕도 대항항','몰운대 해안']);for(let i=spots.length-1;i>=0;i--)if(hiddenSpots.has(spots[i].name))spots.splice(i,1);showAll=false;render();
const googleBusanMapUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('부산 해수욕장');document.querySelector('#miniNaverLink').href=googleBusanMapUrl;document.querySelector('#largeNaverLink').href=googleBusanMapUrl;document.querySelector('#openMap').onclick=()=>openPage('map');const mapCountLabel=document.querySelector('#mapPlaceCount');if(mapCountLabel)mapCountLabel.textContent=`${spots.length}곳`;
const viewCounterNamespace='sea-pick-busan-views-v1';const viewCounterKey=spot=>encodeURIComponent(spot.name);const viewCounterUrl=(action,spot)=>`https://api.countapi.xyz/${action}/${viewCounterNamespace}/${viewCounterKey(spot)}`;async function readSpotView(spot){try{const response=await fetch(viewCounterUrl('get',spot));const data=await response.json();if(typeof data.value==='number')spot.views=data.value}catch(error){}}async function recordSpotView(spot){try{const response=await fetch(viewCounterUrl('hit',spot));const data=await response.json();if(typeof data.value==='number'){spot.views=data.value;const countNode=document.querySelector('.detail-list li:nth-child(3) strong');if(countNode&&location.hash.includes(encodeURIComponent(spot.name)))countNode.textContent=`${data.value.toLocaleString()}회`}}catch(error){}}async function loadSpotViews(){await Promise.all(spots.map(readSpotView));if(sortMode==='views')render(document.querySelector('.activity-tab.active').dataset.activity,document.querySelector('#searchInput').value.trim())}spots.forEach(spot=>spot.views=0);const originalOpenDetailForViews=openDetail;openDetail=function(spot){originalOpenDetailForViews(spot);recordSpotView(spot)};loadSpotViews();

// Use CounterAPI's public V1 counter so view counts are shared across visitors.
const liveViewNamespace='sea-pick-busan-views-live';
const liveViewKey=spot=>encodeURIComponent(spot.name);
const liveViewUrl=(action,spot)=>`https://api.counterapi.dev/v1/${liveViewNamespace}/${liveViewKey(spot)}/${action==='up'?'up':''}`;
function liveViewValue(data){return typeof data?.value==='number'?data.value:typeof data?.count==='number'?data.count:typeof data?.data==='number'?data.data:typeof data?.data?.count==='number'?data.data.count:null}
async function readLiveSpotView(spot){try{const response=await fetch(liveViewUrl('get',spot));if(!response.ok)return;const data=await response.json();const value=liveViewValue(data);if(value!==null)spot.views=value}catch(error){}}
async function recordLiveSpotView(spot){try{const response=await fetch(liveViewUrl('up',spot));if(!response.ok)return;const data=await response.json();const value=liveViewValue(data);if(value!==null){spot.views=value;const countNode=document.querySelector('.detail-list li:nth-child(3) strong');if(countNode&&location.hash.includes(encodeURIComponent(spot.name)))countNode.textContent=`${value.toLocaleString()}회`}}catch(error){}}
async function loadLiveSpotViews(){await Promise.all(spots.map(readLiveSpotView));if(sortMode==='views'){const active=document.querySelector('.activity-tab.active');if(active)render(active.dataset.activity,document.querySelector('#searchInput').value.trim())}}
openDetail=function(spot){originalOpenDetailForViews(spot);recordLiveSpotView(spot)};
loadLiveSpotViews();

// Beach-specific rental shop locations. These markers are intentionally kept separate
// from beach markers so the map can show both types without losing either detail.
const rentalShopsBySpot = [
  [{name:'해운대 서프 렌탈',lat:35.1582,lng:129.1600,activity:'서핑·패들보드'}],
  [{name:'송정 서핑하우스',lat:35.1794,lng:129.2005,activity:'서핑·보드'},{name:'송정 SUP 스테이션',lat:35.1778,lng:129.1988,activity:'패들보드'}],
  [{name:'광안리 SUP 렌탈',lat:35.1538,lng:129.1195,activity:'패들보드·카약'}],
  [{name:'다대포 카약 렌탈',lat:35.0458,lng:128.9664,activity:'카약·패들보드'}],
  [{name:'일광 바다렌탈',lat:35.2649,lng:129.2340,activity:'카약·SUP'}],
  [{name:'임랑 서프 렌탈',lat:35.3204,lng:129.2674,activity:'서핑·보드'}],
  [{name:'송도 해양레저 렌탈',lat:35.0754,lng:129.0175,activity:'카약·패들보드'}],
  [{name:'대변항 카약 대여점',lat:35.2244,lng:129.2245,activity:'카약·구명조끼'}],
  [{name:'오륙도 해양레저 렌탈',lat:35.1005,lng:129.1237,activity:'카약·스노클링'}],
  [{name:'태종대 감지 렌탈',lat:35.0544,lng:129.0874,activity:'카약·구명조끼'}],
  [{name:'연화리 SUP 렌탈',lat:35.2254,lng:129.2445,activity:'패들보드·카약'}],
  [{name:'청사포 서프 렌탈',lat:35.1594,lng:129.2006,activity:'서핑·보드'}],
  [{name:'신호 해양레저 대여점',lat:35.0804,lng:128.8805,activity:'패들보드·카약'}],
  [{name:'몰운대 해안 렌탈',lat:35.0484,lng:128.9669,activity:'카약·구명조끼'}],
  [{name:'가덕도 바다체험 렌탈',lat:34.9955,lng:128.8115,activity:'카약·스노클링'}],
  [{name:'공수마을 해양레저 렌탈',lat:35.1904,lng:129.2205,activity:'패들보드·카약'}],
  [{name:'시랑리 카약 대여점',lat:35.1884,lng:129.2235,activity:'카약·구명조끼'}],
  [{name:'칠암 서프 렌탈',lat:35.2754,lng:129.2655,activity:'서핑·보드'}]
];
spots.forEach((spot,index)=>{spot.rentalShops=rentalShopsBySpot[index]||[]});
const rentalShopsByName = {
  '해운대 해수욕장':[{name:'해운대 서프 렌탈',lat:35.1582,lng:129.1600,activity:'서핑·패들보드'}],
  '송정 해수욕장':[{name:'송정 서핑하우스',lat:35.1794,lng:129.2005,activity:'서핑·보드'},{name:'송정 SUP 스테이션',lat:35.1778,lng:129.1988,activity:'패들보드'}],
  '광안리 해수욕장':[{name:'광안리 SUP 렌탈',lat:35.1538,lng:129.1195,activity:'패들보드·카약'}],
  '다대포 해수욕장':[{name:'다대포 카약 렌탈',lat:35.0458,lng:128.9664,activity:'카약·패들보드'}],
  '일광 해수욕장':[{name:'일광 바다렌탈',lat:35.2649,lng:129.2340,activity:'카약·SUP'}],
  '송도 해수욕장':[{name:'송도 해양레저 렌탈',lat:35.0754,lng:129.0175,activity:'카약·패들보드'}],
  '오륙도 해맞이공원':[{name:'오륙도 해양레저 렌탈',lat:35.1005,lng:129.1237,activity:'카약·스노클링'}],
  '태종대 감지해변':[{name:'태종대 감지 렌탈',lat:35.0544,lng:129.0874,activity:'카약·구명조끼'}],
  '청사포 해변':[{name:'청사포 서프 렌탈',lat:35.1594,lng:129.2006,activity:'서핑·보드'}],
  '해동용궁사 해안':[{name:'시랑리 카약 대여점',lat:35.1884,lng:129.2235,activity:'카약·구명조끼'}],
  '임랑 해수욕장':[{name:'임랑 서프 렌탈',lat:35.3204,lng:129.2674,activity:'서핑·보드'}],
  '대변항 해안':[{name:'대변항 카약 대여점',lat:35.2244,lng:129.2245,activity:'카약·구명조끼'}],
  '기장 연화리':[{name:'연화리 SUP 렌탈',lat:35.2254,lng:129.2445,activity:'패들보드·카약'}],
  '신호 해수욕장':[{name:'신호 해양레저 대여점',lat:35.0804,lng:128.8805,activity:'패들보드·카약'}],
  '몰운대 해안':[{name:'몰운대 해안 렌탈',lat:35.0484,lng:128.9669,activity:'카약·구명조끼'}],
  '가덕도 대항항':[{name:'가덕도 바다체험 렌탈',lat:34.9955,lng:128.8115,activity:'카약·스노클링'}],
  '공수마을 해안':[{name:'공수마을 해양레저 렌탈',lat:35.1904,lng:129.2205,activity:'패들보드·카약'}],
  '칠암 해안':[{name:'칠암 서프 렌탈',lat:35.2754,lng:129.2655,activity:'서핑·보드'}]
};
spots.forEach(spot=>{spot.rentalShops=rentalShopsByName[spot.name]||[]});
const rentalMarkers=[],rentalInfos=[];
const rentalMarkerIcon=()=>({path:google.maps.SymbolPath.CIRCLE,scale:8,fillColor:'#ef8b68',fillOpacity:1,strokeColor:'#fff',strokeWeight:2});
const clearRentalMarkers=()=>{rentalMarkers.forEach(marker=>marker.setMap(null));rentalMarkers.length=0;rentalInfos.forEach(info=>info.close());rentalInfos.length=0};
const beachMarkerUpdate=updateMarkers;
updateMarkers=function(items){
  beachMarkerUpdate(items);
  clearRentalMarkers();
  if(!maps.length||!window.google?.maps)return;
  items.forEach(spot=>maps.forEach(map=>spot.rentalShops.forEach(shop=>{
    const marker=new google.maps.Marker({map,position:{lat:shop.lat,lng:shop.lng},title:`${shop.name} · ${spot.name}`,icon:rentalMarkerIcon()});
    const info=new google.maps.InfoWindow({content:`<div class="rental-info-window"><strong>${shop.name}</strong><span>${spot.name} 주변 렌탈샵</span><small>${shop.activity}</small></div>`});
    marker.addListener('click',()=>{info.open({map,anchor:marker});map.panTo({lat:shop.lat,lng:shop.lng});map.setZoom(15);toastMessage(`${shop.name} 위치를 확인하세요.`)});
    rentalMarkers.push(marker);rentalInfos.push(info);
  })));
};
const detailWithBeachMarker=openDetail;
openDetail=function(spot){
  detailWithBeachMarker(spot);
  setTimeout(()=>{
    const card=document.querySelector('.detail-info-card');
    if(card&&!card.querySelector('.rental-shop-panel')){
      const panel=document.createElement('div');panel.className='rental-shop-panel';
      panel.innerHTML=`<h4>주변 렌탈샵</h4>${spot.rentalShops.map(shop=>`<div class="rental-shop-row"><strong>${shop.name}</strong><span>${shop.activity}</span></div>`).join('')}`;
      card.appendChild(panel);
    }
    if(detailMap&&window.google?.maps){
      spot.rentalShops.forEach(shop=>{
        const marker=new google.maps.Marker({map:detailMap,position:{lat:shop.lat,lng:shop.lng},title:shop.name,icon:rentalMarkerIcon()});
        const info=new google.maps.InfoWindow({content:`<div class="rental-info-window"><strong>${shop.name}</strong><span>${spot.name} 주변 렌탈샵</span><small>${shop.activity}</small></div>`});
        marker.addListener('click',()=>info.open({map:detailMap,anchor:marker}));
      });
    }
  },260);
};
const rentalStyle=document.createElement('style');
rentalStyle.textContent='.rental-info-window{display:grid;gap:4px;min-width:155px;padding:3px;color:#173042;font-family:"DM Sans","Noto Sans KR",sans-serif}.rental-info-window strong{font-size:13px}.rental-info-window span,.rental-info-window small{color:#6c8490;font-size:10px}.rental-shop-panel{margin-top:20px;padding-top:17px;border-top:1px solid var(--line)}.rental-shop-panel h4{margin:0 0 10px;color:var(--deep);font-size:15px}.rental-shop-row{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid var(--line);font-size:11px}.rental-shop-row span{color:var(--muted);text-align:right}';
document.head.appendChild(rentalStyle);

function openRentalPage(spot){
  const shops=spot.rentalShops||[];
  closeViews();
  document.body.classList.add('page-active');
  pageView.hidden=false;
  pageView.innerHTML=`<button class="detail-back" id="rentalBack" type="button">← ${spot.name} 상세로 돌아가기</button><div class="page-heading"><p class="eyebrow">RENTAL SHOP GUIDE</p><h2>${spot.name} 주변 렌탈샵</h2><p>해수욕장 위치와 주변 렌탈샵 위치를 함께 확인하세요.</p></div><div class="rental-page-layout"><div class="rental-page-map" id="rentalPageMap"></div><div class="rental-page-list"><div class="rental-page-list-heading"><strong>${shops.length}곳</strong><span>등록된 렌탈샵</span></div>${shops.map((shop,index)=>`<article class="rental-page-card"><span class="rental-number">${String(index+1).padStart(2,'0')}</span><div><h3>${shop.name}</h3><p>${spot.name} 주변 · ${shop.activity}</p><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name} ${spot.name} 부산`)}" target="_blank" rel="noreferrer">Google 지도에서 위치 보기 ↗</a></div></article>`).join('')}</div></div>`;
  history.pushState({rental:spot.name},'',`#rentals=${encodeURIComponent(spot.name)}`);
  document.querySelector('#rentalBack').onclick=()=>history.back();
  setTimeout(()=>{
    if(!window.google?.maps)return;
    const map=new google.maps.Map(document.querySelector('#rentalPageMap'),{center:{lat:spot.lat,lng:spot.lng},zoom:15,mapTypeControl:true,streetViewControl:false,fullscreenControl:true});
    new google.maps.Marker({map,position:{lat:spot.lat,lng:spot.lng},title:spot.name,icon:{path:google.maps.SymbolPath.CIRCLE,scale:10,fillColor:'#147080',fillOpacity:1,strokeColor:'#fff',strokeWeight:3}});
    shops.forEach(shop=>{const marker=new google.maps.Marker({map,position:{lat:shop.lat,lng:shop.lng},title:shop.name,icon:rentalMarkerIcon()});const info=new google.maps.InfoWindow({content:`<div class="rental-info-window"><strong>${shop.name}</strong><span>${spot.name} 주변 렌탈샵</span><small>${shop.activity}</small></div>`});marker.addListener('click',()=>info.open({map,anchor:marker}))});
  },120);
}
const detailWithRentalButton=openDetail;
openDetail=function(spot){
  detailWithRentalButton(spot);
  setTimeout(()=>{
    const row=[...document.querySelectorAll('.detail-list li')].find(item=>item.textContent.includes('장비·편의시설'));
    if(!row||row.querySelector('.rental-open-button'))return;
    row.innerHTML=`<span>현장 렌탈샵</span><button class="rental-open-button" type="button">렌탈샵 ${spot.rentalShops.length}곳 보기 →</button>`;
    row.querySelector('.rental-open-button').onclick=()=>openRentalPage(spot);
  },380);
}
const rentalPageStyle=document.createElement('style');
rentalPageStyle.textContent='.rental-open-button{padding:7px 9px;color:#147080;background:#eef7f4;border:1px solid #b8ddd2;border-radius:4px;font-size:10px;font-weight:700;cursor:pointer}.rental-open-button:hover{color:#fff;background:#147080}.rental-page-layout{display:grid;grid-template-columns:1.2fr .8fr;gap:20px;margin-top:28px}.rental-page-map{min-height:520px;overflow:hidden;background:#e7f2ee;border-radius:10px;box-shadow:var(--shadow)}.rental-page-list{padding:22px;background:#fff;border:1px solid var(--line);border-radius:9px}.rental-page-list-heading{display:flex;align-items:baseline;gap:8px;padding-bottom:16px;border-bottom:1px solid var(--line)}.rental-page-list-heading strong{color:var(--deep);font:700 25px "Space Grotesk"}.rental-page-list-heading span{color:var(--muted);font-size:11px}.rental-page-card{display:flex;gap:12px;padding:17px 0;border-bottom:1px solid var(--line)}.rental-page-card:last-child{border-bottom:0}.rental-number{display:grid;place-items:center;width:27px;height:27px;color:#fff;background:#ef8b68;border-radius:50%;font:700 10px "Space Grotesk";flex:none}.rental-page-card h3{margin:0;color:var(--ink);font-size:14px}.rental-page-card p{margin:5px 0;color:var(--muted);font-size:10px}.rental-page-card a{color:var(--deep);font-size:10px;font-weight:700;text-decoration:none}.rental-page-card a:hover{text-decoration:underline}@media(max-width:850px){.rental-page-layout{grid-template-columns:1fr}.rental-page-map{min-height:380px}}';
document.head.appendChild(rentalPageStyle);

const weatherCodes={0:['맑음','☀'],1:['대체로 맑음','🌤'],2:['부분적으로 흐림','⛅'],3:['흐림','☁'],45:['안개','〰'],48:['안개','〰'],51:['약한 이슬비','🌦'],53:['이슬비','🌦'],55:['강한 이슬비','🌧'],61:['약한 비','🌦'],63:['비','🌧'],65:['강한 비','🌧'],71:['약한 눈','🌨'],73:['눈','🌨'],75:['강한 눈','❄'],80:['소나기','🌦'],81:['소나기','🌧'],82:['강한 소나기','🌧'],95:['뇌우','⛈'],96:['우박 동반 뇌우','⛈'],99:['강한 뇌우','⛈']};
function updateWeather(data){
  const current=data.current||{};const code=Number(current.weather_code);const weather=weatherCodes[code]||['정보 없음','•'];
  const times=data.hourly?.time||[];const probabilities=data.hourly?.precipitation_probability||[];const now=new Date();let nearest=0;let nearestGap=Infinity;
  times.forEach((time,index)=>{const gap=Math.abs(new Date(time).getTime()-now.getTime());if(gap<nearestGap){nearest=index;nearestGap=gap}});
  document.querySelector('#weatherIcon').textContent=weather[1];document.querySelector('#weatherSummary').textContent=weather[0];document.querySelector('#weatherTemperature').textContent=`${Math.round(current.temperature_2m??23)}°`;document.querySelector('#weatherRain').textContent=`${Number(current.precipitation??0).toFixed(1)}mm`;document.querySelector('#weatherProbability').textContent=`${Math.round(probabilities[nearest]??20)}%`;document.querySelector('#weatherStrip').classList.remove('is-loading');
}
async function loadWeather(){
  const strip=document.querySelector('#weatherStrip');if(!strip)return;
  try{const response=await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.1796&longitude=129.0756&current=temperature_2m,precipitation,weather_code,wind_speed_10m&hourly=precipitation_probability&forecast_days=1&timezone=Asia%2FSeoul');if(!response.ok)throw new Error('weather');updateWeather(await response.json())}
  catch(error){updateWeather({current:{temperature_2m:23,precipitation:0,weather_code:1},hourly:{time:[],precipitation_probability:[20]}})}
}
loadWeather();

let deviceLocation=null;
function travelOrigin(){
  if(deviceLocation)return {lat:deviceLocation.lat,lng:deviceLocation.lng,label:'현재 기기 위치 기준'};
  const region=localStorage.getItem('seaPickRegion')||'';
  const center=regionCenters[region]||busanCenter;
  return {lat:center.lat,lng:center.lng,label:region?`${region} 거주지 기준`:'부산 중심 기준'};
}
function travelMinutes(distanceKm){
  const routeKm=Math.max(1,Math.round((distanceKm*1.35+1.2)*10)/10);
  return {routeKm,walk:Math.max(6,Math.round(routeKm/4.5*60)),transit:Math.max(8,Math.round(8+routeKm/24*60)),car:Math.max(5,Math.round(5+routeKm/34*60))};
}
function todayBeachStatus(spot){
  const wave=Number((spot.wave.match(/[\d.]+/)||['0'])[0]);const wind=Number((spot.wind.match(/[\d.]+/)||['0'])[0]);
  const condition=wave<=.5&&wind<=3?'잔잔한 편이라 패들보드와 가벼운 물놀이에 좋아요.':wave<=.8?'파도가 적당해 초·중급 서핑과 카약 활동 전 장비 점검이 필요해요.':'파도와 바람이 있는 편이니 경험자 중심 활동을 추천해요.';
  return `오늘 ${spot.name}은 ${spot.crowd} 상태예요. ${spot.wave}, ${spot.wind}, ${spot.water}로 ${condition}`;
}
function showTravelInfo(spot){
  const card=document.querySelector('.detail-info-card');if(!card)return;
  card.querySelector('.travel-info-card')?.remove();
  const origin=travelOrigin();const latDistance=(spot.lat-origin.lat)*111;const lngDistance=(spot.lng-origin.lng)*91;const directKm=Math.sqrt(latDistance*latDistance+lngDistance*lngDistance);const times=travelMinutes(directKm);
  const panel=document.createElement('section');panel.className='travel-info-card';
  panel.innerHTML=`<div class="travel-heading"><div><p>HOW TO GET THERE</p><h4>현재 위치에서 예상 이동 시간</h4></div><button type="button" class="location-use-button">⌖ 내 위치 사용</button></div><span class="travel-origin">${origin.label} · 약 ${times.routeKm}km</span><div class="travel-time-grid"><div><span>🚶 도보</span><strong>약 ${times.walk}분</strong></div><div><span>🚌 대중교통</span><strong>약 ${times.transit}분</strong></div><div><span>🚗 차량</span><strong>약 ${times.car}분</strong></div></div><div class="today-beach-status"><span>오늘의 ${spot.name}</span><p>${todayBeachStatus(spot)}</p></div>`;
  const note=card.querySelector('.detail-note');card.insertBefore(panel,note);
  panel.querySelector('.location-use-button').onclick=()=>{
    if(!navigator.geolocation){toastMessage('이 기기에서는 위치 정보를 사용할 수 없어요.');return}
    const button=panel.querySelector('.location-use-button');button.disabled=true;button.textContent='위치 확인 중…';
    navigator.geolocation.getCurrentPosition(position=>{deviceLocation={lat:position.coords.latitude,lng:position.coords.longitude};showTravelInfo(spot);toastMessage('현재 위치 기준으로 이동 시간을 계산했어요.');},()=>{button.disabled=false;button.textContent='⌖ 내 위치 사용';toastMessage('위치 권한을 허용하면 현재 위치 기준으로 계산할 수 있어요.');},{enableHighAccuracy:false,timeout:8000,maximumAge:300000});
  };
}
const detailWithTravelInfo=openDetail;
openDetail=function(spot){detailWithTravelInfo(spot);setTimeout(()=>showTravelInfo(spot),520)};
const travelStyle=document.createElement('style');
travelStyle.textContent='.travel-info-card{margin:20px 0;padding:16px;background:#f4faf7;border:1px solid #cbe4db;border-radius:7px}.travel-heading{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.travel-heading p{margin:0;color:#4d8b84;font:700 9px "Space Grotesk";letter-spacing:.7px}.travel-heading h4{margin:4px 0 0;color:#173042;font-size:15px}.location-use-button{padding:7px 9px;color:#147080;background:#fff;border:1px solid #b8ddd2;border-radius:4px;font-size:10px;font-weight:700;cursor:pointer}.location-use-button:disabled{opacity:.65;cursor:wait}.travel-origin{display:block;margin:11px 0 9px;color:#6c8490;font-size:10px}.travel-time-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.travel-time-grid div{padding:10px 8px;background:#fff;border:1px solid #d9ebe5;border-radius:5px}.travel-time-grid span,.travel-time-grid strong{display:block}.travel-time-grid span{color:#6c8490;font-size:9px}.travel-time-grid strong{margin-top:5px;color:#147080;font-size:12px}.today-beach-status{margin-top:12px;padding:11px;color:#4b6670;background:#fff;border-left:3px solid #ef8b68;border-radius:4px;font-size:10px;line-height:1.55}.today-beach-status span{color:#a45d45;font-weight:700}.today-beach-status p{margin:4px 0 0}@media(max-width:560px){.travel-heading{display:block}.location-use-button{margin-top:10px}.travel-time-grid{gap:5px}.travel-time-grid div{padding:8px 5px}.travel-time-grid strong{font-size:11px}}';
document.head.appendChild(travelStyle);

const activitySafetyGuides={
  surf:{icon:'〰',title:'서핑 전 주의사항',summary:'파도와 바람이 바뀌기 쉬우니 입수 전 꼭 해양 상태를 다시 확인하세요.',items:['초보자는 허리 높이 이하의 파도에서 시작하세요.','리쉬(발목 줄)와 구명조끼 상태를 확인하세요.','해변 구조요원 안내 구역 안에서만 활동하세요.']},
  kayak:{icon:'◇',title:'카약 전 주의사항',summary:'바람과 조류의 영향을 크게 받으니, 출발 지점과 복귀 시간을 미리 정해두세요.',items:['구명조끼는 출발부터 복귀까지 착용하세요.','바람이 강하거나 특보가 있으면 출항하지 마세요.','혼자 먼 곳으로 이동하지 말고 일행과 시야를 유지하세요.']},
  paddle:{icon:'⌁',title:'패들보드 전 주의사항',summary:'균형을 잡기 어려운 날씨에는 앉거나 무릎을 꿇은 자세로 시작하는 것이 안전해요.',items:['보드 리쉬를 발목에 단단히 연결하세요.','수온이 낮거나 바람이 강하면 보온 장비를 챙기세요.','수영 구역과 선박 항로를 피해서 이동하세요.']}
};
const activityGuide=document.createElement('section');activityGuide.className='activity-safety-guide';activityGuide.hidden=true;document.querySelector('.activity-tabs').insertAdjacentElement('afterend',activityGuide);
function renderActivityGuide(activity){
  const guide=activitySafetyGuides[activity];
  if(!guide){activityGuide.hidden=true;activityGuide.innerHTML='';return}
  activityGuide.hidden=false;
  activityGuide.innerHTML=`<div class="activity-guide-icon">${guide.icon}</div><div><p class="eyebrow">ACTIVITY SAFETY GUIDE</p><h3>${guide.title}</h3><p class="activity-guide-summary">${guide.summary}</p><ul>${guide.items.map(item=>`<li>${item}</li>`).join('')}</ul></div>`;
}
document.querySelectorAll('.activity-tab').forEach(tab=>tab.addEventListener('click',()=>renderActivityGuide(tab.dataset.activity)));
const activityGuideStyle=document.createElement('style');
activityGuideStyle.textContent='.activity-safety-guide{display:grid;grid-template-columns:auto 1fr;gap:15px;margin:16px 0 4px;padding:17px 18px;background:#f2f8f5;border:1px solid #cce5dc;border-radius:7px}.activity-safety-guide[hidden]{display:none}.activity-guide-icon{display:grid;place-items:center;width:34px;height:34px;color:#fff;background:#147080;border-radius:50%;font-size:19px}.activity-safety-guide .eyebrow{margin:0;color:#4d8b84;font-size:9px}.activity-safety-guide h3{margin:4px 0 5px;color:#173042;font-size:16px}.activity-guide-summary{margin:0;color:#627b80;font-size:11px;line-height:1.5}.activity-safety-guide ul{display:grid;gap:4px;margin:10px 0 0;padding-left:16px;color:#526b70;font-size:10px;line-height:1.45}.activity-safety-guide li::marker{color:#ef8b68}@media(max-width:560px){.activity-safety-guide{gap:10px;padding:14px}.activity-safety-guide h3{font-size:14px}}';
document.head.appendChild(activityGuideStyle);

const safetyQuizQuestions=[
  {question:'풍랑 특보가 있어도 파도가 낮아 보이면 바로 입수해도 된다.',answer:false,tip:'특보가 발효 중이면 입수를 미루고 안내를 따라야 해요.'},
  {question:'카약과 패들보드는 구명조끼를 출발부터 복귀까지 착용해야 한다.',answer:true,tip:'장비 활동은 항상 구명조끼를 착용해요.'},
  {question:'음주 후 수상 레저 활동은 판단력이 괜찮다면 가능하다.',answer:false,tip:'음주 후 수상 활동은 절대 하지 않아요.'},
  {question:'서핑할 때 리쉬는 보드와 연결되어 있는지 확인해야 한다.',answer:true,tip:'리쉬는 보드 유실과 충돌 위험을 줄여줘요.'},
  {question:'해가 지기 시작해도 인원이 많으면 계속 활동해도 된다.',answer:false,tip:'해 지기 전에는 물에서 나와 시야가 확보될 때 마무리해요.'}
];
let safetyQuizAnswers={},safetyQuizFinished=false,safetyQuizReady=false;
const quizList=document.querySelector('#checklist'),quizProgress=document.querySelector('#checklistProgress'),quizResult=document.querySelector('#quizResult'),quizComplete=document.querySelector('#checkComplete');
function updateQuizProgress(){quizProgress.textContent=`${Object.keys(safetyQuizAnswers).length}/${safetyQuizQuestions.length}`}
function renderSafetyQuiz(){
  safetyQuizAnswers={};safetyQuizFinished=false;safetyQuizReady=false;quizResult.hidden=true;quizResult.innerHTML='';quizComplete.textContent='결과 확인하기';
  quizList.innerHTML=safetyQuizQuestions.map((item,index)=>`<article class="quiz-item" data-question="${index}"><div class="quiz-question"><span>${index+1}</span><strong>${item.question}</strong></div><div class="quiz-actions"><button type="button" data-answer="true">O</button><button type="button" data-answer="false">X</button></div><small class="quiz-tip" hidden></small></article>`).join('');
  quizList.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>{const row=button.closest('.quiz-item');const index=Number(row.dataset.question);safetyQuizAnswers[index]=button.dataset.answer==='true';row.querySelectorAll('[data-answer]').forEach(action=>action.classList.toggle('selected',action===button));updateQuizProgress()});
  updateQuizProgress();
}
document.querySelector('#safetyButton').addEventListener('click',renderSafetyQuiz);
quizComplete.onclick=()=>{
  if(safetyQuizFinished){if(safetyQuizReady){safetyModal.classList.remove('open');safetyModal.setAttribute('aria-hidden','true');toastMessage('바다에서 놀 준비가 충분히 되었습니다!');}else renderSafetyQuiz();return}
  if(Object.keys(safetyQuizAnswers).length<safetyQuizQuestions.length){toastMessage(`아직 ${safetyQuizQuestions.length-Object.keys(safetyQuizAnswers).length}문제를 더 풀어주세요.`);return}
  let score=0;quizList.querySelectorAll('.quiz-item').forEach(row=>{const index=Number(row.dataset.question);const item=safetyQuizQuestions[index];const correct=safetyQuizAnswers[index]===item.answer;if(correct)score++;row.classList.add(correct?'is-correct':'is-wrong');row.querySelector('.quiz-tip').textContent=correct?'정답이에요. '+item.tip:'다시 확인해요. '+item.tip;row.querySelector('.quiz-tip').hidden=false;row.querySelectorAll('button').forEach(button=>button.disabled=true)});
  const ready=score>=4;safetyQuizFinished=true;safetyQuizReady=ready;quizResult.hidden=false;quizResult.className=`quiz-result ${ready?'is-ready':'needs-review'}`;quizResult.innerHTML=`<strong>${ready?'🎉 바다에서 놀 준비가 충분히 되었습니다!':'🛟 한 번 더 안전을 확인해요.'}</strong><p>${score}/${safetyQuizQuestions.length}문제 정답 · ${ready?'준비 완료를 누르면 퀴즈 창이 닫혀요.':'4문제 이상 정답이면 준비 완료예요. 틀린 항목을 다시 확인해보세요.'}</p><button type="button" id="quizRetry">다시 풀기</button>`;
  quizResult.querySelector('#quizRetry').onclick=renderSafetyQuiz;quizComplete.textContent=ready?'준비 완료':'다시 풀기';
};
renderSafetyQuiz();
const quizStyle=document.createElement('style');
quizStyle.textContent='.quiz-list{gap:9px}.quiz-item{padding:13px;background:#fff;border:1px solid var(--line);border-radius:7px}.quiz-question{display:flex;gap:9px;align-items:flex-start}.quiz-question>span{display:grid;place-items:center;width:20px;height:20px;flex:none;color:#fff;background:#147080;border-radius:50%;font:700 10px "Space Grotesk"}.quiz-question strong{color:var(--ink);font-size:12px;line-height:1.45}.quiz-actions{display:flex;gap:6px;margin:10px 0 0 29px}.quiz-actions button{width:42px;padding:6px;color:#547278;background:#f7faf8;border:1px solid #d3e5df;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer}.quiz-actions button.selected{color:#fff;background:#147080;border-color:#147080}.quiz-item.is-correct{border-color:#8bcbb9;background:#f1faf5}.quiz-item.is-wrong{border-color:#efb496;background:#fff8f2}.quiz-item.is-correct .quiz-question>span{background:#55af94}.quiz-item.is-wrong .quiz-question>span{background:#ef8b68}.quiz-tip{display:block;margin:8px 0 0 29px;color:#6b7e7e;font-size:10px;line-height:1.45}.quiz-result{margin-top:14px;padding:14px;border-radius:6px}.quiz-result strong{font-size:14px}.quiz-result p{margin:6px 0 10px;font-size:11px;line-height:1.55}.quiz-result.is-ready{color:#216b5c;background:#eaf8f1;border:1px solid #a8d9c5}.quiz-result.needs-review{color:#985a43;background:#fff3e9;border:1px solid #f0c4a7}.quiz-result button{padding:7px 10px;color:inherit;background:rgba(255,255,255,.65);border:1px solid currentColor;border-radius:4px;font-size:10px;font-weight:700;cursor:pointer}@media(max-width:560px){.quiz-item{padding:11px}.quiz-question strong{font-size:11px}.quiz-actions{margin-left:27px}.quiz-tip{margin-left:27px}}';
document.head.appendChild(quizStyle);

// Free map layer: Leaflet + OpenStreetMap. It replaces the Google Maps dependent views.
showMapFallback=()=>{};
const leafletMaps=new Map();
const leafletBeachIcon=L.divIcon({className:'leaflet-beach-marker',html:'<span>🏖</span>',iconSize:[34,34],iconAnchor:[17,17],popupAnchor:[0,-16]});
const leafletRentalIcon=L.divIcon({className:'leaflet-rental-marker',html:'<span>⌂</span>',iconSize:[28,28],iconAnchor:[14,14],popupAnchor:[0,-14]});
function createLeafletMap(element,center={lat:35.16,lng:129.14},zoom=10){
  if(!element||!window.L)return null;
  const existing=leafletMaps.get(element.id);if(existing){existing.remove();leafletMaps.delete(element.id)}
  element.parentElement?.classList.add('google-maps-ready');element.querySelectorAll('.google-map-error').forEach(node=>node.remove());
  const map=L.map(element,{zoomControl:true,scrollWheelZoom:true}).setView([center.lat,center.lng],zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);
  leafletMaps.set(element.id,map);return map;
}
function addLeafletSpotMarkers(map,items,focusSpot=null){
  if(!map)return;
  items.forEach(spot=>{
    const beach=L.marker([spot.lat,spot.lng],{icon:leafletBeachIcon,title:spot.name}).addTo(map);
    beach.bindPopup(`<div class="leaflet-info"><strong>${spot.name}</strong><span>${spot.location}</span><div><b>${spot.water}</b><b>${spot.wind}</b><b>${spot.wave}</b></div><small>🏖 해수욕장 · ${spot.rental}</small></div>`);
    spot.rentalShops.forEach(shop=>{const rental=L.marker([shop.lat,shop.lng],{icon:leafletRentalIcon,title:`${shop.name} · ${spot.name}`}).addTo(map);rental.bindPopup(`<div class="leaflet-info"><strong>${shop.name}</strong><span>${spot.name} 주변 렌탈샵</span><small>${shop.activity}</small></div>`)});
  });
  if(focusSpot){const points=[[focusSpot.lat,focusSpot.lng],...focusSpot.rentalShops.map(shop=>[shop.lat,shop.lng])];map.fitBounds(L.latLngBounds(points),{padding:[35,35],maxZoom:15})}
}
function initLeafletOverviewMaps(){
  [['googleMapMini',10],['googleMapLarge',11]].forEach(([id,zoom])=>{const node=document.querySelector(`#${id}`);const map=createLeafletMap(node,{lat:35.16,lng:129.14},zoom);addLeafletSpotMarkers(map,spots)});
}
function showLeafletDetailMap(spot){const node=document.querySelector('#detailMap');const map=createLeafletMap(node,{lat:spot.lat,lng:spot.lng},14);addLeafletSpotMarkers(map,[spot],spot)}
function showLeafletRentalMap(spot){const node=document.querySelector('#rentalPageMap');const map=createLeafletMap(node,{lat:spot.lat,lng:spot.lng},15);addLeafletSpotMarkers(map,[spot],spot)}
function showLeafletFullMap(){const node=document.querySelector('#googleMapPage');const map=createLeafletMap(node,{lat:35.16,lng:129.14},10);addLeafletSpotMarkers(map,spots)}
const detailWithLeafletMap=openDetail;
openDetail=function(spot){detailWithLeafletMap(spot);setTimeout(()=>showLeafletDetailMap(spot),140)};
const rentalPageWithLeafletMap=openRentalPage;
openRentalPage=function(spot){rentalPageWithLeafletMap(spot);setTimeout(()=>showLeafletRentalMap(spot),140)};
const pageWithLeafletMap=openPage;
openPage=function(page){pageWithLeafletMap(page);if(page==='map')setTimeout(showLeafletFullMap,140)};
const openStreetMapBusanUrl='https://www.openstreetmap.org/#map=11/35.1600/129.1400';
document.querySelector('#miniNaverLink').href=openStreetMapBusanUrl;document.querySelector('#largeNaverLink').href=openStreetMapBusanUrl;
const leafletStyle=document.createElement('style');
leafletStyle.textContent='.leaflet-container{font-family:"DM Sans","Noto Sans KR",sans-serif;background:#dcefea}.leaflet-beach-marker,.leaflet-rental-marker{display:grid;place-items:center;border:3px solid #fff;border-radius:50%;box-shadow:0 3px 9px rgba(17,48,66,.32);font-size:14px;line-height:1}.leaflet-beach-marker{background:#147080}.leaflet-rental-marker{background:#ef8b68;font-size:13px}.leaflet-info{display:grid;gap:4px;min-width:160px;color:#173042}.leaflet-info strong{font-size:13px}.leaflet-info span,.leaflet-info small{color:#6c8490;font-size:10px}.leaflet-info div{display:flex;gap:4px}.leaflet-info b{padding:3px 4px;color:#147080;background:#eef7f4;border-radius:3px;font-size:9px}.leaflet-popup-content-wrapper{border-radius:7px}.leaflet-popup-content{margin:11px 13px}.leaflet-control-attribution{font-size:9px!important}.leaflet-control-attribution a{color:#147080!important}';
document.head.appendChild(leafletStyle);
setTimeout(initLeafletOverviewMaps,0);
