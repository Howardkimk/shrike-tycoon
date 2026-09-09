"use strict";
var _a;
const SAVE_VERSION = 10;
// Keep the 0.3 key so existing Prototype 0.3.3 saves migrate automatically.
const SAVE_KEY = "shrikeTycoonPrototype03Stable";
const OVERCOOK_GRACE = 2.8;
const BASE_ORDER_DEADLINE = 60;
const foods = {
    grasshopper: { id: "grasshopper", name: "메뚜기", emoji: "🦗", cookSeconds: 2, score: 10 },
    caterpillar: { id: "caterpillar", name: "애벌레", emoji: "🐛", cookSeconds: 2.2, score: 12 },
    beetle: { id: "beetle", name: "딱정벌레", emoji: "🪲", cookSeconds: 2.7, score: 15 },
    aquaticInsect: { id: "aquaticInsect", name: "수서곤충", emoji: "🦟", cookSeconds: 2.4, score: 14 },
    frog: { id: "frog", name: "개구리", emoji: "🐸", cookSeconds: 3.2, score: 20 },
    lizard: { id: "lizard", name: "도마뱀", emoji: "🦎", cookSeconds: 3, score: 18 },
    mouse: { id: "mouse", name: "쥐", emoji: "🐭", cookSeconds: 4, score: 26 },
    fish: { id: "fish", name: "작은 물고기", emoji: "🐟", cookSeconds: 3.6, score: 24 },
    smallBird: { id: "smallBird", name: "작은 새", emoji: "🐦", cookSeconds: 4.4, score: 32 }
};
const guests = {
    "great-tit": { id: "great-tit", name: "박새", englishName: "Great Tit", scientificName: "Parus major", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["aquaticInsect"], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "곤충의 성충·유충을 폭넓게 이용하는 수목성 손님." },
    "marsh-tit": { id: "marsh-tit", name: "쇠박새", englishName: "Marsh Tit", scientificName: "Poecile palustris", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: [], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "작은 곤충류를 중심으로 주문하는 짧은 주문형 손님." },
    "white-wagtail": { id: "white-wagtail", name: "알락할미새", englishName: "White Wagtail", scientificName: "Motacilla alba", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["aquaticInsect", "caterpillar"], rare: [], never: ["mouse", "smallBird"] }, note: "농경지와 물가에서 작은 무척추동물을 찾는 손님." },
    "grey-wagtail": { id: "grey-wagtail", name: "노랑할미새", englishName: "Grey Wagtail", scientificName: "Motacilla cinerea", emoji: "🐦", diet: { primary: ["aquaticInsect"], secondary: ["beetle", "grasshopper"], rare: ["caterpillar"], never: ["mouse", "smallBird"] }, note: "흐르는 물 주변의 수서곤충 주문 비중이 높은 손님." },
    "eastern-cattle-egret": { id: "eastern-cattle-egret", name: "황로", englishName: "Eastern Cattle Egret", scientificName: "Bubulcus coromandus", emoji: "🕊️", diet: { primary: ["grasshopper", "frog", "beetle"], secondary: ["lizard", "mouse"], rare: ["fish"], never: ["smallBird"] }, note: "논과 초지에서 곤충과 작은 척추동물을 폭넓게 이용하는 대형 손님." },
    "common-kingfisher": { id: "common-kingfisher", name: "물총새", englishName: "Common Kingfisher", scientificName: "Alcedo atthis", emoji: "🐦", diet: { primary: ["fish"], secondary: ["frog", "aquaticInsect"], rare: [], never: ["mouse", "smallBird"] }, note: "물고기를 중심으로 주문해 패턴을 예측하기 쉬운 전문 손님." },
    "great-spotted-woodpecker": { id: "great-spotted-woodpecker", name: "오색딱따구리", englishName: "Great Spotted Woodpecker", scientificName: "Dendrocopos major", emoji: "🐦", diet: { primary: ["beetle", "caterpillar"], secondary: ["grasshopper"], rare: [], never: ["frog", "mouse", "fish", "smallBird"] }, note: "나무껍질과 가지에서 찾는 곤충성 주문에 특화된 손님." },
    "eurasian-nuthatch": { id: "eurasian-nuthatch", name: "동고비", englishName: "Eurasian Nuthatch", scientificName: "Sitta europaea", emoji: "🐦", diet: { primary: ["beetle", "caterpillar"], secondary: ["grasshopper"], rare: [], never: ["frog", "mouse", "fish", "smallBird"] }, note: "나무줄기를 오가며 작은 곤충을 찾는 수목성 손님." },
    "brown-eared-bulbul": { id: "brown-eared-bulbul", name: "직박구리", englishName: "Brown-eared Bulbul", scientificName: "Hypsipetes amaurotis", emoji: "🐦", diet: { primary: ["caterpillar"], secondary: ["beetle", "grasshopper"], rare: [], never: ["mouse", "fish", "smallBird"] }, note: "잡식성이지만 이 식당에서는 동물성 먹이 중 곤충 주문만 받도록 단순화." },
    "oriental-magpie": { id: "oriental-magpie", name: "까치", englishName: "Oriental Magpie", scientificName: "Pica serica", emoji: "🐦", diet: { primary: ["beetle", "grasshopper", "mouse"], secondary: ["lizard", "frog", "caterpillar"], rare: ["smallBird", "fish"], never: [] }, note: "폭넓은 먹이를 주문하는 Wild Card 손님." },
    "daurian-redstart": { id: "daurian-redstart", name: "딱새", englishName: "Daurian Redstart", scientificName: "Phoenicurus auroreus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["caterpillar"], rare: [], never: ["mouse", "fish", "smallBird"] }, note: "개방지에서 곤충을 사냥하는 빠른 주문형 손님." },
    "grey-heron": { id: "grey-heron", name: "왜가리", englishName: "Grey Heron", scientificName: "Ardea cinerea", emoji: "🪶", diet: { primary: ["fish", "frog"], secondary: ["mouse", "smallBird"], rare: ["lizard", "aquaticInsect"], never: [] }, note: "물고기를 중심으로 양서류와 소형 척추동물까지 주문하는 Large Order 손님." },
    "eurasian-sparrowhawk": { id: "eurasian-sparrowhawk", name: "새매", englishName: "Eurasian Sparrowhawk", scientificName: "Accipiter nisus", emoji: "🦅", diet: { primary: ["smallBird"], secondary: ["mouse"], rare: ["lizard"], never: ["caterpillar", "aquaticInsect", "frog", "fish"] }, note: "소형 조류 주문 비중이 매우 높은 포식자 손님." },
    "oriental-scops-owl": { id: "oriental-scops-owl", name: "큰소쩍새", englishName: "Oriental Scops-Owl", scientificName: "Otus sunia", emoji: "🦉", diet: { primary: ["grasshopper", "beetle"], secondary: ["mouse", "frog", "lizard"], rare: ["smallBird"], never: ["fish"] }, note: "World 1 Finale의 야간 특별 손님. 곤충과 작은 척추동물을 함께 주문한다." },
    "little-egret": { id: "little-egret", name: "쇠백로", englishName: "Little Egret", scientificName: "Egretta garzetta", emoji: "🕊️", diet: { primary: ["fish", "frog", "aquaticInsect"], secondary: ["grasshopper", "lizard"], rare: ["mouse"], never: ["smallBird"] }, note: "얕은 물에서 작은 물고기와 수서동물을 빠르게 사냥하는 습지 손님." },
    "black-crowned-night-heron": { id: "black-crowned-night-heron", name: "해오라기", englishName: "Black-crowned Night Heron", scientificName: "Nycticorax nycticorax", emoji: "🪶", diet: { primary: ["fish", "frog"], secondary: ["aquaticInsect", "mouse"], rare: ["lizard", "smallBird"], never: [] }, note: "해질녘과 밤에 활발해지는 수변 포식자. 비교적 긴 주문을 낸다." },
    "common-sandpiper": { id: "common-sandpiper", name: "깝작도요", englishName: "Common Sandpiper", scientificName: "Actitis hypoleucos", emoji: "🐦", diet: { primary: ["aquaticInsect", "beetle"], secondary: ["caterpillar", "grasshopper"], rare: ["frog"], never: ["mouse", "fish", "smallBird"] }, note: "자갈 하천 가장자리에서 작은 무척추동물을 찾는 손님." },
    "oriental-reed-warbler": { id: "oriental-reed-warbler", name: "개개비", englishName: "Oriental Reed Warbler", scientificName: "Acrocephalus orientalis", emoji: "🐦", diet: { primary: ["caterpillar", "beetle", "grasshopper"], secondary: ["aquaticInsect"], rare: [], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "갈대밭의 곤충성 손님. 짧고 빠른 곤충 주문을 주로 낸다." },
    "barn-swallow": { id: "barn-swallow", name: "제비", englishName: "Barn Swallow", scientificName: "Hirundo rustica", emoji: "🐦", diet: { primary: ["aquaticInsect", "grasshopper"], secondary: ["beetle"], rare: [], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "하천과 범람원 상공에서 비행곤충을 잡는 속도형 손님." },
    "grey-headed-lapwing": { id: "grey-headed-lapwing", name: "민댕기물떼새", englishName: "Grey-headed Lapwing", scientificName: "Vanellus cinereus", emoji: "🐦", diet: { primary: ["beetle", "grasshopper"], secondary: ["aquaticInsect", "caterpillar"], rare: ["frog"], never: ["mouse", "fish", "smallBird"] }, note: "범람원과 습윤 초지에서 무척추동물을 찾는 계절 손님." },
    "common-kestrel": { id: "common-kestrel", name: "황조롱이", englishName: "Common Kestrel", scientificName: "Falco tinnunculus", emoji: "🦅", diet: { primary: ["mouse", "grasshopper"], secondary: ["lizard", "smallBird"], rare: ["beetle"], never: ["fish"] }, note: "개방된 강변 초지에서 설치류와 대형 곤충을 노리는 포식자 손님." },
    "ruddy-kingfisher": { id: "ruddy-kingfisher", name: "호반새", englishName: "Ruddy Kingfisher", scientificName: "Halcyon coromanda", emoji: "🐦", diet: { primary: ["frog", "lizard", "fish"], secondary: ["aquaticInsect", "beetle"], rare: ["mouse"], never: ["smallBird"] }, note: "숲과 물가가 만나는 곳에서 양서·파충류를 폭넓게 이용하는 특별 손님." },
    "coal-tit": { id: "coal-tit", name: "진박새", englishName: "Coal Tit", scientificName: "Periparus ater", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["aquaticInsect"], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "침엽수림과 산림 가장자리에서 작은 곤충을 찾는 산림성 손님." },
    "varied-tit": { id: "varied-tit", name: "곤줄박이", englishName: "Varied Tit", scientificName: "Sittiparus varius", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["lizard"], never: ["mouse", "fish", "smallBird"] }, note: "산림과 숲 가장자리에서 곤충성 먹이를 폭넓게 이용하는 손님." },
    "eurasian-jay": { id: "eurasian-jay", name: "어치", englishName: "Eurasian Jay", scientificName: "Garrulus glandarius", emoji: "🐦", diet: { primary: ["beetle", "caterpillar"], secondary: ["grasshopper", "lizard", "mouse"], rare: ["smallBird", "frog"], never: ["fish"] }, note: "산림의 잡식성 손님. 곤충부터 작은 척추동물까지 주문 폭이 넓다." },
    "pale-thrush": { id: "pale-thrush", name: "흰배지빠귀", englishName: "Pale Thrush", scientificName: "Turdus pallidus", emoji: "🐦", diet: { primary: ["beetle", "caterpillar", "grasshopper"], secondary: ["frog"], rare: ["lizard"], never: ["mouse", "fish", "smallBird"] }, note: "산림 바닥에서 무척추동물을 찾는 지상성 손님." },
    "whites-thrush": { id: "whites-thrush", name: "호랑지빠귀", englishName: "White's Thrush", scientificName: "Zoothera aurea", emoji: "🐦", diet: { primary: ["beetle", "caterpillar"], secondary: ["frog", "grasshopper"], rare: ["lizard"], never: ["mouse", "fish", "smallBird"] }, note: "어두운 산림 바닥에서 먹이를 찾는 대형 지빠귀류 손님." },
    "japanese-pygmy-woodpecker": { id: "japanese-pygmy-woodpecker", name: "쇠딱따구리", englishName: "Japanese Pygmy Woodpecker", scientificName: "Yungipicus kizuki", emoji: "🐦", diet: { primary: ["beetle", "caterpillar"], secondary: ["grasshopper"], rare: [], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "나무껍질의 작은 곤충을 집중적으로 주문하는 산림 손님." },
    "eurasian-treecreeper": { id: "eurasian-treecreeper", name: "나무발발이", englishName: "Eurasian Treecreeper", scientificName: "Certhia familiaris", emoji: "🐦", diet: { primary: ["beetle", "caterpillar"], secondary: ["grasshopper"], rare: [], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "나무줄기를 타고 오르며 작은 절지동물을 찾는 전문 손님." },
    "grey-nightjar": { id: "grey-nightjar", name: "쏙독새", englishName: "Grey Nightjar", scientificName: "Caprimulgus jotaka", emoji: "🌙", diet: { primary: ["beetle", "grasshopper"], secondary: ["caterpillar", "aquaticInsect"], rare: [], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "해질녘 이후 활발해지는 야행성 곤충식 손님." },
    "brown-hawk-owl": { id: "brown-hawk-owl", name: "솔부엉이", englishName: "Brown Hawk-Owl", scientificName: "Ninox scutulata", emoji: "🦉", diet: { primary: ["beetle", "grasshopper"], secondary: ["mouse", "smallBird", "frog"], rare: ["lizard"], never: ["fish"] }, note: "밤에 곤충과 작은 척추동물을 사냥하는 야행성 손님." },
    "himalayan-bulbul": { id: "himalayan-bulbul", name: "히말라야직박구리", englishName: "Himalayan Bulbul", scientificName: "Pycnonotus leucogenys", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["aquaticInsect"], never: ["mouse", "fish", "smallBird"] }, note: "히말라야 산기슭과 관목대에서 곤충을 이용하는 손님." },
    "blue-whistling-thrush": { id: "blue-whistling-thrush", name: "파랑지빠귀", englishName: "Blue Whistling Thrush", scientificName: "Myophonus caeruleus", emoji: "🐦", diet: { primary: ["aquaticInsect", "beetle"], secondary: ["frog", "caterpillar"], rare: ["fish", "lizard"], never: ["smallBird"] }, note: "산악 계류에서 수서무척추동물과 작은 동물을 찾는 손님." },
    "white-capped-redstart": { id: "white-capped-redstart", name: "흰머리딱새", englishName: "White-capped Redstart", scientificName: "Phoenicurus leucocephalus", emoji: "🐦", diet: { primary: ["aquaticInsect", "beetle"], secondary: ["grasshopper", "caterpillar"], rare: [], never: ["mouse", "fish", "smallBird"] }, note: "빠른 산악 하천을 따라 곤충을 사냥하는 고산성 손님." },
    "plumbeous-water-redstart": { id: "plumbeous-water-redstart", name: "납빛딱새", englishName: "Plumbeous Water Redstart", scientificName: "Phoenicurus fuliginosus", emoji: "🐦", diet: { primary: ["aquaticInsect"], secondary: ["beetle", "caterpillar"], rare: ["grasshopper"], never: ["mouse", "fish", "smallBird"] }, note: "계류 가장자리에서 수서곤충을 집중적으로 주문하는 손님." },
    "rufous-sibia": { id: "rufous-sibia", name: "붉은배시비아", englishName: "Rufous Sibia", scientificName: "Heterophasia capistrata", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: [], never: ["frog", "mouse", "fish", "smallBird"] }, note: "히말라야 중산림의 수관에서 곤충을 찾는 손님." },
    "green-backed-tit": { id: "green-backed-tit", name: "초록등박새", englishName: "Green-backed Tit", scientificName: "Parus monticolus", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: [], never: ["frog", "mouse", "fish", "smallBird"] }, note: "산림대의 작은 곤충과 유충을 주로 주문하는 손님." },
    "red-billed-chough": { id: "red-billed-chough", name: "붉은부리까마귀", englishName: "Red-billed Chough", scientificName: "Pyrrhocorax pyrrhocorax", emoji: "🐦", diet: { primary: ["beetle", "grasshopper"], secondary: ["caterpillar", "lizard"], rare: ["mouse"], never: ["fish", "smallBird"] }, note: "고산 초지와 절벽에서 무척추동물을 찾는 군집성 손님." },
    "himalayan-woodpecker": { id: "himalayan-woodpecker", name: "히말라야오색딱따구리", englishName: "Himalayan Woodpecker", scientificName: "Dendrocopos himalayensis", emoji: "🐦", diet: { primary: ["beetle", "caterpillar"], secondary: ["grasshopper"], rare: [], never: ["frog", "mouse", "fish", "smallBird"] }, note: "고지대 침엽수림에서 딱정벌레와 유충을 찾는 손님." },
    "grey-backed-shrike": { id: "grey-backed-shrike", name: "회색등때까치", englishName: "Grey-backed Shrike", scientificName: "Lanius tephronotus", emoji: "🩶", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["mouse", "caterpillar"], rare: ["smallBird", "frog"], never: ["fish"] }, note: "히말라야와 티베트 고원의 개방지에서 곤충과 소형 척추동물을 사냥하는 손님." },
    "isabelline-wheatear": { id: "isabelline-wheatear", name: "사막딱새", englishName: "Isabelline Wheatear", scientificName: "Oenanthe isabellina", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["caterpillar", "lizard"], rare: ["mouse"], never: ["fish", "smallBird"] }, note: "건조 초원과 반사막에서 땅 위 곤충을 쫓는 이동성 손님." },
    "eurasian-hoopoe": { id: "eurasian-hoopoe", name: "후투티", englishName: "Eurasian Hoopoe", scientificName: "Upupa epops", emoji: "🐦", diet: { primary: ["beetle", "grasshopper"], secondary: ["caterpillar", "lizard"], rare: ["frog"], never: ["fish", "smallBird"] }, note: "땅을 탐색해 큰 곤충과 유충을 먹는 초원·농경지 손님." },
    "european-roller": { id: "european-roller", name: "파랑새", englishName: "European Roller", scientificName: "Coracias garrulus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["frog", "mouse"], rare: ["smallBird"], never: ["fish"] }, note: "개방지에서 큰 곤충과 소형 척추동물을 노리는 사냥형 손님." },
    "little-owl": { id: "little-owl", name: "금눈쇠올빼미", englishName: "Little Owl", scientificName: "Athene noctua", emoji: "🦉", diet: { primary: ["mouse", "beetle", "grasshopper"], secondary: ["lizard", "smallBird"], rare: ["frog"], never: ["fish"] }, note: "건조 농경지와 초원의 야간 포식자. 설치류와 대형 곤충을 주문한다." },
    "steppe-eagle": { id: "steppe-eagle", name: "초원수리", englishName: "Steppe Eagle", scientificName: "Aquila nipalensis", emoji: "🦅", diet: { primary: ["mouse"], secondary: ["smallBird", "lizard"], rare: ["frog"], never: ["caterpillar", "aquaticInsect", "fish"] }, note: "초원에서 소형 포유류를 중심으로 먹는 대형 포식자 손님." },
    "red-tailed-shrike": { id: "red-tailed-shrike", name: "붉은꼬리때까치", englishName: "Red-tailed Shrike", scientificName: "Lanius phoenicuroides", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["mouse", "caterpillar"], rare: ["smallBird"], never: ["fish"] }, note: "중앙아시아 건조지의 이동성 때까치 손님." },
    "isabelline-shrike": { id: "isabelline-shrike", name: "사막때까치", englishName: "Isabelline Shrike", scientificName: "Lanius isabellinus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["mouse", "caterpillar"], rare: ["smallBird"], never: ["fish"] }, note: "사막과 반사막 가장자리에서 큰 곤충과 작은 척추동물을 사냥하는 때까치 손님." },
    "european-robin": { id: "european-robin", name: "유럽울새", englishName: "European Robin", scientificName: "Erithacus rubecula", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["aquaticInsect"], never: ["mouse", "fish", "smallBird"] }, note: "유럽의 숲 가장자리와 정원에서 작은 무척추동물을 찾는 손님." },
    "common-blackbird": { id: "common-blackbird", name: "Common Blackbird", englishName: "Common Blackbird", scientificName: "Turdus merula", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["frog"], never: ["mouse", "fish", "smallBird"] }, note: "낙엽층과 초지에서 벌레를 찾는 유럽의 대표적인 지상 채식성·동물식 혼합 손님." },
    "european-bee-eater": { id: "european-bee-eater", name: "European Bee-eater", englishName: "European Bee-eater", scientificName: "Merops apiaster", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["aquaticInsect"], rare: ["caterpillar"], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "큰 비행성 곤충 주문 비중이 높은 지중해권 손님." },
    "red-backed-shrike": { id: "red-backed-shrike", name: "Red-backed Shrike", englishName: "Red-backed Shrike", scientificName: "Lanius collurio", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["lizard", "mouse", "caterpillar"], rare: ["smallBird"], never: ["fish"] }, note: "유럽의 관목 초지에서 큰 곤충과 작은 척추동물을 사냥하는 때까치 손님." },
    "lesser-grey-shrike": { id: "lesser-grey-shrike", name: "Lesser Grey Shrike", englishName: "Lesser Grey Shrike", scientificName: "Lanius minor", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["lizard", "mouse"], rare: ["smallBird"], never: ["fish"] }, note: "개방된 초원에서 대형 곤충 중심 주문을 내는 때까치 손님." },
    "european-nightjar": { id: "european-nightjar", name: "European Nightjar", englishName: "European Nightjar", scientificName: "Caprimulgus europaeus", emoji: "🌙", diet: { primary: ["beetle", "grasshopper"], secondary: ["aquaticInsect"], rare: ["caterpillar"], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "해질녘과 밤의 비행성 곤충 주문에 특화된 손님." },
    "loggerhead-shrike": { id: "loggerhead-shrike", name: "Loggerhead Shrike", englishName: "Loggerhead Shrike", scientificName: "Lanius ludovicianus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["mouse", "smallBird"], rare: ["caterpillar"], never: ["fish"] }, note: "북미 개방지에서 곤충·도마뱀·소형 척추동물을 사냥하는 전문 포식자." },
    "american-kestrel": { id: "american-kestrel", name: "American Kestrel", englishName: "American Kestrel", scientificName: "Falco sparverius", emoji: "🦅", diet: { primary: ["grasshopper", "mouse"], secondary: ["lizard", "smallBird", "beetle"], rare: ["frog"], never: ["fish"] }, note: "북미 초지의 소형 맹금 손님. 곤충과 쥐 주문이 강하다." },
    "eastern-bluebird": { id: "eastern-bluebird", name: "Eastern Bluebird", englishName: "Eastern Bluebird", scientificName: "Sialia sialis", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "caterpillar"], secondary: [], rare: ["aquaticInsect"], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "초지와 숲 가장자리에서 곤충을 잡는 북미 손님." },
    "american-robin": { id: "american-robin", name: "American Robin", englishName: "American Robin", scientificName: "Turdus migratorius", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["frog"], never: ["mouse", "fish", "smallBird"] }, note: "잔디밭과 숲 가장자리에서 무척추동물을 찾는 북미 손님." },
    "belted-kingfisher": { id: "belted-kingfisher", name: "Belted Kingfisher", englishName: "Belted Kingfisher", scientificName: "Megaceryle alcyon", emoji: "🐦", diet: { primary: ["fish"], secondary: ["frog", "aquaticInsect"], rare: [], never: ["mouse", "smallBird"] }, note: "물고기 주문에 강하게 전문화된 북미 물총새." },
    "northern-mockingbird": { id: "northern-mockingbird", name: "Northern Mockingbird", englishName: "Northern Mockingbird", scientificName: "Mimus polyglottos", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["caterpillar"], rare: ["lizard"], never: ["mouse", "fish", "smallBird"] }, note: "개방지와 관목지에서 다양한 곤충을 이용하는 북미 손님." },
    "lilac-breasted-roller": { id: "lilac-breasted-roller", name: "Lilac-breasted Roller", englishName: "Lilac-breasted Roller", scientificName: "Coracias caudatus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["frog", "mouse"], rare: ["smallBird"], never: ["fish"] }, note: "동아프리카 사바나에서 큰 곤충과 작은 척추동물을 사냥하는 손님." },
    "african-grey-hornbill": { id: "african-grey-hornbill", name: "African Grey Hornbill", englishName: "African Grey Hornbill", scientificName: "Lophoceros nasutus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["caterpillar", "lizard"], rare: ["mouse"], never: ["fish", "smallBird"] }, note: "건조 사바나와 숲 가장자리의 대형 곤충 주문형 손님." },
    "african-pygmy-kingfisher": { id: "african-pygmy-kingfisher", name: "African Pygmy Kingfisher", englishName: "African Pygmy Kingfisher", scientificName: "Ispidina picta", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "frog"], secondary: ["lizard"], rare: ["aquaticInsect"], never: ["mouse", "fish", "smallBird"] }, note: "육상 곤충과 작은 양서·파충류를 이용하는 동아프리카 물총새류 손님." },
    "northern-fiscal": { id: "northern-fiscal", name: "Northern Fiscal", englishName: "Northern Fiscal", scientificName: "Lanius humeralis", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["mouse", "smallBird"], rare: ["caterpillar"], never: ["fish"] }, note: "동아프리카 개방지의 대표적인 피스컬 때까치 손님." },
    "mackinnons-shrike": { id: "mackinnons-shrike", name: "Mackinnon's Shrike", englishName: "Mackinnon's Shrike", scientificName: "Lanius mackinnoni", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["lizard", "mouse", "caterpillar"], rare: ["smallBird"], never: ["fish"] }, note: "동아프리카 고지대와 숲 가장자리에서 곤충 중심 주문을 내는 때까치 손님." },
    "superb-starling": { id: "superb-starling", name: "Superb Starling", englishName: "Superb Starling", scientificName: "Lamprotornis superbus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["caterpillar"], rare: ["lizard"], never: ["mouse", "fish", "smallBird"] }, note: "동아프리카 초원에서 곤충을 적극적으로 이용하는 잡식성 손님." },
    "southern-fiscal": { id: "southern-fiscal", name: "Southern Fiscal", englishName: "Southern Fiscal", scientificName: "Lanius collaris", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["mouse", "smallBird"], rare: ["caterpillar"], never: ["fish"] }, note: "남아프리카의 개방지에서 다양한 동물성 먹이를 사냥하는 피스컬 때까치." },
    "cape-wagtail": { id: "cape-wagtail", name: "Cape Wagtail", englishName: "Cape Wagtail", scientificName: "Motacilla capensis", emoji: "🐦", diet: { primary: ["aquaticInsect", "beetle"], secondary: ["grasshopper", "caterpillar"], rare: [], never: ["mouse", "fish", "smallBird"] }, note: "남아프리카 물가와 초지에서 작은 무척추동물을 찾는 손님." },
    "cape-robin-chat": { id: "cape-robin-chat", name: "Cape Robin-Chat", englishName: "Cape Robin-Chat", scientificName: "Cossypha caffra", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["lizard"], never: ["mouse", "fish", "smallBird"] }, note: "덤불과 정원에서 곤충을 찾는 남아프리카 손님." },
    "fiscal-flycatcher": { id: "fiscal-flycatcher", name: "Fiscal Flycatcher", englishName: "Fiscal Flycatcher", scientificName: "Melaenornis silens", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["caterpillar"], rare: ["aquaticInsect"], never: ["frog", "mouse", "fish", "smallBird"] }, note: "개방된 남아프리카 서식지에서 곤충을 사냥하는 손님." },
    "cape-crow": { id: "cape-crow", name: "Cape Crow", englishName: "Cape Crow", scientificName: "Corvus capensis", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "mouse"], secondary: ["lizard", "frog", "caterpillar"], rare: ["smallBird"], never: [] }, note: "잡식성이 강해 혼합 주문이 자주 나타나는 남아프리카 손님." },
    "karoo-scrub-robin": { id: "karoo-scrub-robin", name: "Karoo Scrub-Robin", englishName: "Karoo Scrub-Robin", scientificName: "Cercotrichas coryphoeus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle"], secondary: ["caterpillar"], rare: ["lizard"], never: ["mouse", "fish", "smallBird"] }, note: "카루 건조 관목지의 곤충성 손님." },
    "sao-tome-fiscal": { id: "sao-tome-fiscal", name: "São Tomé Fiscal", englishName: "São Tomé Fiscal", scientificName: "Lanius newtoni", emoji: "🐦", diet: { primary: ["beetle", "grasshopper", "lizard"], secondary: ["caterpillar", "mouse"], rare: ["smallBird"], never: ["fish"] }, note: "상투메 섬의 숲에 제한적으로 서식하는 섬 고유 때까치 손님." },
    "sao-tome-thrush": { id: "sao-tome-thrush", name: "São Tomé Thrush", englishName: "São Tomé Thrush", scientificName: "Turdus olivaceofuscus", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["frog"], never: ["mouse", "fish", "smallBird"] }, note: "상투메 숲 바닥에서 무척추동물을 찾는 섬 고유 손님." },
    "sao-tome-oriole": { id: "sao-tome-oriole", name: "São Tomé Oriole", englishName: "São Tomé Oriole", scientificName: "Oriolus crassirostris", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["lizard"], never: ["mouse", "fish", "smallBird"] }, note: "상투메 숲의 수관에서 곤충을 찾는 섬 고유 손님." },
    "madagascar-kingfisher": { id: "madagascar-kingfisher", name: "Madagascar Kingfisher", englishName: "Madagascar Kingfisher", scientificName: "Corythornis vintsioides", emoji: "🐦", diet: { primary: ["fish", "aquaticInsect"], secondary: ["frog"], rare: ["lizard"], never: ["mouse", "smallBird"] }, note: "마다가스카르 수변의 물고기·수서동물 전문 손님." },
    "madagascar-kestrel": { id: "madagascar-kestrel", name: "Madagascar Kestrel", englishName: "Madagascar Kestrel", scientificName: "Falco newtoni", emoji: "🦅", diet: { primary: ["grasshopper", "lizard", "mouse"], secondary: ["beetle", "smallBird"], rare: ["frog"], never: ["fish"] }, note: "마다가스카르의 개방지에서 작은 척추동물과 곤충을 사냥하는 맹금 손님." },
    "madagascar-magpie-robin": { id: "madagascar-magpie-robin", name: "Madagascar Magpie-Robin", englishName: "Madagascar Magpie-Robin", scientificName: "Copsychus albospecularis", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "caterpillar"], secondary: ["lizard"], rare: [], never: ["mouse", "fish", "smallBird"] }, note: "마다가스카르 숲 가장자리의 곤충성 손님." }
};
const stages = {
    1: { id: 1, world: 1, icon: "🌾", name: "처음 연 꼬치집", habitat: "밭 가장자리", duration: 100, maxOrders: 3, spawnMin: 3800, spawnMax: 5800, maxRecipeLength: 3, specialChance: 0, feedingTimeAt: null, feedingDuration: 0, starScores: [650, 1100], guestPool: ["great-tit", "marsh-tit", "daurian-redstart"], foodAvailability: { caterpillar: 1, beetle: .9, grasshopper: .7 } },
    2: { id: 2, world: 1, icon: "🌱", name: "논둑의 점심시간", habitat: "논둑", duration: 115, maxOrders: 3, spawnMin: 3400, spawnMax: 5200, maxRecipeLength: 3, specialChance: .04, feedingTimeAt: 58, feedingDuration: 14, starScores: [850, 1450], guestPool: ["eastern-cattle-egret", "white-wagtail", "daurian-redstart"], foodAvailability: { grasshopper: 1, frog: .8, beetle: .7, mouse: .25, lizard: .25 } },
    3: { id: 3, world: 1, icon: "💧", name: "농수로의 손님", habitat: "농수로", duration: 120, maxOrders: 3, spawnMin: 3200, spawnMax: 5000, maxRecipeLength: 4, specialChance: .08, feedingTimeAt: 63, feedingDuration: 15, starScores: [1050, 1750], guestPool: ["common-kingfisher", "grey-wagtail", "white-wagtail"], foodAvailability: { fish: 1, aquaticInsect: .95, frog: .65, beetle: .35, grasshopper: .25 } },
    4: { id: 4, world: 1, icon: "🍎", name: "과수원의 벌레잔치", habitat: "과수원", duration: 125, maxOrders: 4, spawnMin: 3000, spawnMax: 4700, maxRecipeLength: 4, specialChance: .10, feedingTimeAt: 66, feedingDuration: 16, starScores: [1250, 2050], event: "INSECT RUSH", guestPool: ["great-tit", "marsh-tit", "great-spotted-woodpecker", "eurasian-nuthatch", "brown-eared-bulbul"], foodAvailability: { caterpillar: 1, beetle: 1, grasshopper: .5 } },
    5: { id: 5, world: 1, icon: "🏡", name: "농촌 마을", habitat: "농촌 마을", duration: 130, maxOrders: 4, spawnMin: 2850, spawnMax: 4500, maxRecipeLength: 4, specialChance: .12, feedingTimeAt: 69, feedingDuration: 18, starScores: [1450, 2350], guestPool: ["oriental-magpie", "brown-eared-bulbul", "great-tit", "daurian-redstart"], foodAvailability: { beetle: .9, grasshopper: .9, caterpillar: .7, mouse: .55, lizard: .45, frog: .25 } },
    6: { id: 6, world: 1, icon: "🌿", name: "휴경지 피버", habitat: "휴경지", duration: 135, maxOrders: 4, spawnMin: 2700, spawnMax: 4300, maxRecipeLength: 4, specialChance: .14, feedingTimeAt: 72, feedingDuration: 20, starScores: [1700, 2700], event: "GRASSHOPPER FEVER", guestPool: ["white-wagtail", "daurian-redstart", "eastern-cattle-egret", "oriental-magpie"], foodAvailability: { grasshopper: 1, caterpillar: .55, beetle: .7, frog: .45, mouse: .35, lizard: .4 } },
    7: { id: 7, world: 1, icon: "🌊", name: "저수지 가장자리", habitat: "저수지", duration: 140, maxOrders: 4, spawnMin: 2600, spawnMax: 4150, maxRecipeLength: 4, specialChance: .16, feedingTimeAt: 74, feedingDuration: 20, starScores: [1950, 3050], guestPool: ["common-kingfisher", "grey-heron", "grey-wagtail", "eastern-cattle-egret"], foodAvailability: { fish: 1, frog: .9, aquaticInsect: .85, mouse: .25, lizard: .2 } },
    8: { id: 8, world: 1, icon: "🌳", name: "관목대의 큰 주문", habitat: "농경지 관목대", duration: 145, maxOrders: 4, spawnMin: 2450, spawnMax: 4000, maxRecipeLength: 4, specialChance: .22, feedingTimeAt: 77, feedingDuration: 22, starScores: [2200, 3450], event: "LARGE ORDER", guestPool: ["eurasian-sparrowhawk", "oriental-magpie", "great-tit", "daurian-redstart"], foodAvailability: { smallBird: 1, mouse: .7, lizard: .55, beetle: .45, grasshopper: .5, caterpillar: .4 } },
    9: { id: 9, world: 1, icon: "🌾", name: "수확철 논", habitat: "수확철 논", duration: 150, maxOrders: 5, spawnMin: 2300, spawnMax: 3800, maxRecipeLength: 4, specialChance: .20, feedingTimeAt: 80, feedingDuration: 26, starScores: [2550, 3900], event: "HARVEST FEVER", guestPool: ["eastern-cattle-egret", "oriental-magpie", "white-wagtail", "daurian-redstart", "grey-heron"], foodAvailability: { grasshopper: 1, mouse: .8, frog: .65, beetle: .7, lizard: .45, fish: .25 } },
    10: { id: 10, world: 1, icon: "🌅", name: "오래된 느티나무", habitat: "World 1 Finale", duration: 180, maxOrders: 5, spawnMin: 2150, spawnMax: 3600, maxRecipeLength: 4, specialChance: .25, feedingTimeAt: 92, feedingDuration: 32, starScores: [3300, 5000], event: "FINAL FEEDING TIME", guestPool: ["great-tit", "common-kingfisher", "eastern-cattle-egret", "oriental-magpie", "grey-heron", "eurasian-sparrowhawk", "oriental-scops-owl"], foodAvailability: { grasshopper: .8, caterpillar: .7, beetle: .8, aquaticInsect: .45, frog: .7, lizard: .55, mouse: .7, fish: .75, smallBird: .65 } },
    11: { id: 11, world: 2, icon: "💦", name: "농수로의 끝", habitat: "농수로 합류부", duration: 125, maxOrders: 4, spawnMin: 3000, spawnMax: 4650, maxRecipeLength: 4, specialChance: .10, feedingTimeAt: 68, feedingDuration: 16, starScores: [1400, 2250], guestPool: ["white-wagtail", "common-kingfisher", "little-egret"], foodAvailability: { fish: .8, aquaticInsect: 1, frog: .65, grasshopper: .45, beetle: .45 } },
    12: { id: 12, world: 2, icon: "🏞️", name: "작은 하천", habitat: "완만한 소하천", duration: 130, maxOrders: 4, spawnMin: 2850, spawnMax: 4450, maxRecipeLength: 4, specialChance: .11, feedingTimeAt: 70, feedingDuration: 17, starScores: [1600, 2550], weather: [{ at: 45, duration: 20, type: "sun" }], guestPool: ["grey-wagtail", "common-sandpiper", "common-kingfisher"], foodAvailability: { aquaticInsect: 1, fish: .75, beetle: .55, frog: .5, grasshopper: .35 } },
    13: { id: 13, world: 2, icon: "🪨", name: "자갈 하천", habitat: "자갈톱과 얕은 여울", duration: 135, maxOrders: 4, spawnMin: 2750, spawnMax: 4300, maxRecipeLength: 4, specialChance: .13, feedingTimeAt: 72, feedingDuration: 18, starScores: [1800, 2850], weather: [{ at: 52, duration: 22, type: "wind" }], guestPool: ["common-sandpiper", "grey-wagtail", "white-wagtail", "grey-headed-lapwing"], foodAvailability: { aquaticInsect: 1, beetle: .8, grasshopper: .65, caterpillar: .55, frog: .3 } },
    14: { id: 14, world: 2, icon: "🌾", name: "갈대밭 식당", habitat: "하천 갈대밭", duration: 140, maxOrders: 4, spawnMin: 2600, spawnMax: 4150, maxRecipeLength: 4, specialChance: .14, feedingTimeAt: 75, feedingDuration: 19, starScores: [2000, 3150], weather: [{ at: 55, duration: 24, type: "rain" }], guestPool: ["oriental-reed-warbler", "barn-swallow", "black-crowned-night-heron"], foodAvailability: { aquaticInsect: 1, caterpillar: .9, beetle: .8, grasshopper: .75, frog: .55, fish: .45 } },
    15: { id: 15, world: 2, icon: "🌿", name: "범람원 초지", habitat: "범람원과 습윤 초지", duration: 145, maxOrders: 5, spawnMin: 2500, spawnMax: 3950, maxRecipeLength: 4, specialChance: .16, feedingTimeAt: 78, feedingDuration: 20, starScores: [2250, 3500], event: "RIVER FEEDING TIME", weather: [{ at: 38, duration: 18, type: "sun" }, { at: 96, duration: 18, type: "wind" }], guestPool: ["barn-swallow", "grey-headed-lapwing", "eastern-cattle-egret", "common-kestrel"], foodAvailability: { grasshopper: 1, beetle: .85, aquaticInsect: .8, frog: .55, mouse: .45, lizard: .35 } },
    16: { id: 16, world: 2, icon: "🪷", name: "갈대 습지", habitat: "얕은 습지와 갈대섬", duration: 150, maxOrders: 5, spawnMin: 2400, spawnMax: 3850, maxRecipeLength: 4, specialChance: .18, feedingTimeAt: 82, feedingDuration: 21, starScores: [2500, 3850], weather: [{ at: 58, duration: 26, type: "rain" }], guestPool: ["little-egret", "black-crowned-night-heron", "oriental-reed-warbler", "ruddy-kingfisher"], foodAvailability: { frog: 1, fish: .85, aquaticInsect: .9, beetle: .55, lizard: .5, mouse: .25 } },
    17: { id: 17, world: 2, icon: "🌊", name: "큰 저수지", habitat: "저수지 개방수면 가장자리", duration: 155, maxOrders: 5, spawnMin: 2300, spawnMax: 3700, maxRecipeLength: 4, specialChance: .20, feedingTimeAt: 84, feedingDuration: 22, starScores: [2800, 4300], weather: [{ at: 42, duration: 18, type: "sun" }, { at: 110, duration: 20, type: "rain" }], guestPool: ["common-kingfisher", "little-egret", "grey-heron", "black-crowned-night-heron"], foodAvailability: { fish: 1, frog: .85, aquaticInsect: .75, mouse: .3, lizard: .25, smallBird: .15 } },
    18: { id: 18, world: 2, icon: "🌉", name: "큰 강의 바람", habitat: "넓은 하천과 모래톱", duration: 160, maxOrders: 5, spawnMin: 2200, spawnMax: 3550, maxRecipeLength: 4, specialChance: .22, feedingTimeAt: 86, feedingDuration: 23, starScores: [3100, 4700], event: "RIVER RUSH", weather: [{ at: 48, duration: 26, type: "wind" }, { at: 118, duration: 20, type: "sun" }], guestPool: ["common-sandpiper", "grey-headed-lapwing", "little-egret", "common-kestrel", "grey-heron"], foodAvailability: { aquaticInsect: .85, fish: .8, grasshopper: .7, beetle: .75, frog: .55, mouse: .5, lizard: .35 } },
    19: { id: 19, world: 2, icon: "🌇", name: "강변의 석양", habitat: "석양의 강변과 갈대숲", duration: 170, maxOrders: 5, spawnMin: 2100, spawnMax: 3450, maxRecipeLength: 4, specialChance: .24, feedingTimeAt: 90, feedingDuration: 25, starScores: [3500, 5200], event: "SUNSET SERVICE", weather: [{ at: 35, duration: 22, type: "sun" }, { at: 105, duration: 22, type: "wind" }], guestPool: ["black-crowned-night-heron", "ruddy-kingfisher", "common-kingfisher", "oriental-reed-warbler", "grey-heron"], foodAvailability: { fish: 1, frog: .9, aquaticInsect: .85, lizard: .6, mouse: .45, beetle: .55 } },
    20: { id: 20, world: 2, icon: "⛈️", name: "폭풍우 치는 강", habitat: "World 2 Finale", duration: 190, maxOrders: 6, spawnMin: 1950, spawnMax: 3250, maxRecipeLength: 4, specialChance: .28, feedingTimeAt: 98, feedingDuration: 34, starScores: [4300, 6300], event: "STORM SERVICE", weather: [{ at: 28, duration: 25, type: "rain" }, { at: 70, duration: 24, type: "wind" }, { at: 116, duration: 20, type: "sun" }, { at: 148, duration: 28, type: "rain" }], guestPool: ["common-kingfisher", "little-egret", "black-crowned-night-heron", "common-sandpiper", "barn-swallow", "grey-headed-lapwing", "grey-heron", "ruddy-kingfisher"], foodAvailability: { fish: 1, frog: .95, aquaticInsect: 1, grasshopper: .65, beetle: .7, lizard: .55, mouse: .45, smallBird: .2 } },
    21: { id: 21, world: 3, icon: "⛰️", name: "산기슭의 오후", habitat: "산기슭 농경지", duration: 145, maxOrders: 4, spawnMin: 2700, spawnMax: 4200, maxRecipeLength: 4, specialChance: .15, feedingTimeAt: 78, feedingDuration: 18, starScores: [2200, 3400], guestPool: ["daurian-redstart", "varied-tit", "eurasian-jay"], foodAvailability: { grasshopper: .9, caterpillar: .9, beetle: 1, lizard: .45, mouse: .35 }, timePhases: [{ at: 0, type: "day" }, { at: 105, type: "dusk", guestPool: ["daurian-redstart", "varied-tit", "pale-thrush", "grey-nightjar"], foodModifier: { beetle: 1.15, grasshopper: 1.1 } }], subGoal: { kind: "perfect", target: 5, label: "PERFECT 5회" } },
    22: { id: 22, world: 3, icon: "🌲", name: "숲 가장자리", habitat: "활엽수림 가장자리", duration: 150, maxOrders: 4, spawnMin: 2600, spawnMax: 4100, maxRecipeLength: 4, specialChance: .16, feedingTimeAt: 80, feedingDuration: 19, starScores: [2400, 3700], guestPool: ["great-tit", "varied-tit", "japanese-pygmy-woodpecker", "eurasian-jay"], foodAvailability: { caterpillar: 1, beetle: 1, grasshopper: .65, lizard: .35 }, timePhases: [{ at: 0, type: "day" }, { at: 100, type: "dusk", guestPool: ["varied-tit", "pale-thrush", "whites-thrush", "grey-nightjar"], foodModifier: { beetle: 1.2, caterpillar: .9 } }], subGoal: { kind: "combo", target: 8, label: "Combo ×8" } },
    23: { id: 23, world: 3, icon: "🌤️", name: "숲속 공터", habitat: "햇빛 드는 산림 공터", duration: 155, maxOrders: 5, spawnMin: 2500, spawnMax: 3950, maxRecipeLength: 4, specialChance: .18, feedingTimeAt: 82, feedingDuration: 20, starScores: [2650, 4050], guestPool: ["coal-tit", "varied-tit", "eurasian-jay", "daurian-redstart"], foodAvailability: { grasshopper: 1, caterpillar: .9, beetle: .95, lizard: .5, mouse: .25 }, timePhases: [{ at: 0, type: "day" }, { at: 82, type: "dusk", guestPool: ["pale-thrush", "whites-thrush", "grey-nightjar", "varied-tit"] }, { at: 128, type: "night", guestPool: ["grey-nightjar", "brown-hawk-owl", "whites-thrush"], foodModifier: { beetle: 1.25, grasshopper: 1.2, caterpillar: .8, mouse: 1.15 } }], subGoal: { kind: "served", target: 10, label: "손님 10마리 서빙" } },
    24: { id: 24, world: 3, icon: "🏞️", name: "산골 계곡", habitat: "산림 계곡과 바위지대", duration: 160, maxOrders: 5, spawnMin: 2400, spawnMax: 3850, maxRecipeLength: 4, specialChance: .19, feedingTimeAt: 84, feedingDuration: 21, starScores: [2850, 4350], guestPool: ["grey-wagtail", "eurasian-treecreeper", "varied-tit", "whites-thrush"], foodAvailability: { aquaticInsect: .8, caterpillar: .9, beetle: 1, frog: .65, lizard: .45 }, timePhases: [{ at: 0, type: "day" }, { at: 98, type: "dusk", guestPool: ["whites-thrush", "pale-thrush", "grey-nightjar", "brown-hawk-owl"], foodModifier: { beetle: 1.2, frog: 1.1 } }], subGoal: { kind: "special", target: 2, label: "SPECIAL 주문 2회 서빙" } },
    25: { id: 25, world: 3, icon: "🌼", name: "산지 초원", habitat: "산지 초원과 숲 경계", duration: 165, maxOrders: 5, spawnMin: 2300, spawnMax: 3700, maxRecipeLength: 4, specialChance: .20, feedingTimeAt: 86, feedingDuration: 22, starScores: [3100, 4700], event: "MOUNTAIN FEEDING TIME", guestPool: ["daurian-redstart", "eurasian-jay", "coal-tit", "common-kestrel"], foodAvailability: { grasshopper: 1, beetle: .9, caterpillar: .75, lizard: .55, mouse: .55 }, timePhases: [{ at: 0, type: "day" }, { at: 108, type: "dusk", guestPool: ["pale-thrush", "grey-nightjar", "brown-hawk-owl", "common-kestrel"], foodModifier: { grasshopper: 1.2, beetle: 1.15, mouse: 1.1 } }], subGoal: { kind: "noFailed", target: 0, label: "실패 없이 클리어" } },
    26: { id: 26, world: 3, icon: "🌿", name: "고지대 관목", habitat: "산지 관목대", duration: 170, maxOrders: 5, spawnMin: 2200, spawnMax: 3600, maxRecipeLength: 4, specialChance: .21, feedingTimeAt: 90, feedingDuration: 23, starScores: [3350, 5050], guestPool: ["varied-tit", "eurasian-jay", "pale-thrush", "eurasian-sparrowhawk"], foodAvailability: { beetle: 1, caterpillar: .85, grasshopper: .8, lizard: .6, mouse: .6, smallBird: .25 }, timePhases: [{ at: 0, type: "day" }, { at: 95, type: "dusk", guestPool: ["pale-thrush", "whites-thrush", "grey-nightjar", "eurasian-sparrowhawk"] }, { at: 145, type: "night", guestPool: ["grey-nightjar", "brown-hawk-owl", "whites-thrush"], foodModifier: { beetle: 1.25, grasshopper: 1.15, mouse: 1.2, smallBird: 1.1 } }], subGoal: { kind: "combo", target: 10, label: "Combo ×10" } },
    27: { id: 27, world: 3, icon: "🌇", name: "해질녘 숲", habitat: "해질녘 활엽수림", duration: 170, maxOrders: 5, spawnMin: 2100, spawnMax: 3450, maxRecipeLength: 4, specialChance: .23, feedingTimeAt: 88, feedingDuration: 24, starScores: [3600, 5400], event: "DUSK SHIFT", guestPool: ["pale-thrush", "whites-thrush", "varied-tit", "grey-nightjar"], foodAvailability: { beetle: 1, caterpillar: .85, grasshopper: .9, frog: .45, lizard: .5, mouse: .35 }, timePhases: [{ at: 0, type: "dusk", guestPool: ["pale-thrush", "whites-thrush", "varied-tit", "grey-nightjar"] }, { at: 88, type: "night", guestPool: ["grey-nightjar", "brown-hawk-owl", "whites-thrush", "oriental-scops-owl"], foodModifier: { beetle: 1.3, grasshopper: 1.2, mouse: 1.15, caterpillar: .75 } }], subGoal: { kind: "nightServed", target: 5, label: "밤 손님 5마리 서빙" } },
    28: { id: 28, world: 3, icon: "🌙", name: "밤의 산림", habitat: "달빛 아래 산림 가장자리", duration: 175, maxOrders: 5, spawnMin: 2050, spawnMax: 3350, maxRecipeLength: 4, specialChance: .24, feedingTimeAt: 92, feedingDuration: 25, starScores: [3900, 5800], event: "NIGHT INSECT RUSH", guestPool: ["grey-nightjar", "brown-hawk-owl", "oriental-scops-owl", "whites-thrush"], foodAvailability: { beetle: 1, grasshopper: 1, caterpillar: .65, frog: .55, lizard: .55, mouse: .65, smallBird: .35 }, timePhases: [{ at: 0, type: "night", guestPool: ["grey-nightjar", "brown-hawk-owl", "oriental-scops-owl", "whites-thrush"], foodModifier: { beetle: 1.3, grasshopper: 1.25, mouse: 1.15, smallBird: 1.1 } }], subGoal: { kind: "perfect", target: 8, label: "PERFECT 8회" } },
    29: { id: 29, world: 3, icon: "🌌", name: "깊은 산의 밤", habitat: "깊은 산림 야간", duration: 180, maxOrders: 6, spawnMin: 1950, spawnMax: 3250, maxRecipeLength: 4, specialChance: .26, feedingTimeAt: 96, feedingDuration: 28, starScores: [4250, 6250], event: "DEEP NIGHT SERVICE", guestPool: ["brown-hawk-owl", "grey-nightjar", "oriental-scops-owl", "whites-thrush", "eurasian-sparrowhawk"], foodAvailability: { beetle: 1, grasshopper: .95, caterpillar: .6, frog: .65, lizard: .65, mouse: .8, smallBird: .55 }, timePhases: [{ at: 0, type: "night", guestPool: ["brown-hawk-owl", "grey-nightjar", "oriental-scops-owl", "whites-thrush", "eurasian-sparrowhawk"], foodModifier: { beetle: 1.3, grasshopper: 1.2, mouse: 1.25, smallBird: 1.2 } }], subGoal: { kind: "noFailed", target: 0, label: "실패 없이 클리어" } },
    30: { id: 30, world: 3, icon: "🌳", name: "정상 아래 오래된 나무", habitat: "World 3 Finale · 정상 아래 고목", duration: 200, maxOrders: 6, spawnMin: 1850, spawnMax: 3100, maxRecipeLength: 4, specialChance: .30, feedingTimeAt: 104, feedingDuration: 34, starScores: [5000, 7300], event: "MIDNIGHT FEAST", guestPool: ["coal-tit", "varied-tit", "eurasian-jay", "pale-thrush", "whites-thrush", "japanese-pygmy-woodpecker", "eurasian-treecreeper"], foodAvailability: { grasshopper: .85, caterpillar: .85, beetle: 1, aquaticInsect: .35, frog: .6, lizard: .65, mouse: .7, smallBird: .5 }, timePhases: [{ at: 0, type: "day", guestPool: ["coal-tit", "varied-tit", "eurasian-jay", "japanese-pygmy-woodpecker", "eurasian-treecreeper"] }, { at: 72, type: "dusk", guestPool: ["pale-thrush", "whites-thrush", "grey-nightjar", "eurasian-jay"], foodModifier: { beetle: 1.15, grasshopper: 1.1 } }, { at: 128, type: "night", guestPool: ["grey-nightjar", "brown-hawk-owl", "oriental-scops-owl", "whites-thrush", "eurasian-sparrowhawk"], foodModifier: { beetle: 1.35, grasshopper: 1.25, mouse: 1.25, smallBird: 1.2, caterpillar: .7 } }], subGoal: { kind: "nightServed", target: 8, label: "밤 손님 8마리 서빙" } },
    31: { id: 31, world: 4, icon: "🏔️", name: "히말라야 산기슭", habitat: "히말라야 남사면 산기슭", duration: 150, maxOrders: 5, spawnMin: 2550, spawnMax: 4050, maxRecipeLength: 4, specialChance: .16, feedingTimeAt: 80, feedingDuration: 20, starScores: [2700, 4100], guestPool: ["himalayan-bulbul", "green-backed-tit", "rufous-sibia", "grey-backed-shrike"], foodAvailability: { grasshopper: .8, caterpillar: 1, beetle: 1, lizard: .45, mouse: .25 }, altitude: 1, subGoal: { kind: "perfect", target: 6, label: "PERFECT 6회" } },
    32: { id: 32, world: 4, icon: "🌲", name: "소나무 비탈", habitat: "중고도 침엽수림 비탈", duration: 155, maxOrders: 5, spawnMin: 2450, spawnMax: 3900, maxRecipeLength: 4, specialChance: .18, feedingTimeAt: 82, feedingDuration: 20, starScores: [3000, 4500], weather: [{ at: 78, duration: 24, type: "cold" }], guestPool: ["green-backed-tit", "himalayan-woodpecker", "rufous-sibia", "grey-backed-shrike"], foodAvailability: { caterpillar: 1, beetle: 1, grasshopper: .65, lizard: .35, mouse: .25 }, altitude: 1, subGoal: { kind: "combo", target: 10, label: "Combo ×10" } },
    33: { id: 33, world: 4, icon: "💧", name: "빙하수 계류", habitat: "차가운 산악 계류", duration: 160, maxOrders: 5, spawnMin: 2350, spawnMax: 3800, maxRecipeLength: 4, specialChance: .18, feedingTimeAt: 84, feedingDuration: 21, starScores: [3250, 4850], weather: [{ at: 52, duration: 22, type: "cold" }], guestPool: ["blue-whistling-thrush", "white-capped-redstart", "plumbeous-water-redstart"], foodAvailability: { aquaticInsect: 1, beetle: .75, caterpillar: .65, frog: .55, fish: .25 }, altitude: 1, subGoal: { kind: "served", target: 12, label: "손님 12마리 서빙" } },
    34: { id: 34, world: 4, icon: "🌺", name: "진달래 숲", habitat: "히말라야 진달래 산림", duration: 165, maxOrders: 5, spawnMin: 2250, spawnMax: 3650, maxRecipeLength: 4, specialChance: .20, feedingTimeAt: 86, feedingDuration: 22, starScores: [3500, 5200], weather: [{ at: 96, duration: 25, type: "cold" }], guestPool: ["rufous-sibia", "green-backed-tit", "himalayan-bulbul", "himalayan-woodpecker"], foodAvailability: { caterpillar: 1, beetle: 1, grasshopper: .7, lizard: .3 }, altitude: 2, subGoal: { kind: "noFailed", target: 1, label: "주문 실패 없이 클리어" } },
    35: { id: 35, world: 4, icon: "🏞️", name: "높은 계곡", habitat: "고산 계곡과 관목대", duration: 170, maxOrders: 5, spawnMin: 2150, spawnMax: 3500, maxRecipeLength: 4, specialChance: .24, feedingTimeAt: 88, feedingDuration: 23, starScores: [3800, 5600], event: "THIN AIR", weather: [{ at: 62, duration: 26, type: "cold" }], guestPool: ["white-capped-redstart", "blue-whistling-thrush", "red-billed-chough", "grey-backed-shrike"], foodAvailability: { grasshopper: .8, beetle: 1, aquaticInsect: .75, lizard: .6, mouse: .4, caterpillar: .6 }, altitude: 2, subGoal: { kind: "special", target: 3, label: "SPECIAL 3회 서빙" } },
    36: { id: 36, world: 4, icon: "🪨", name: "절벽 초지", habitat: "고산 절벽과 건조 초지", duration: 175, maxOrders: 5, spawnMin: 2100, spawnMax: 3400, maxRecipeLength: 4, specialChance: .23, feedingTimeAt: 90, feedingDuration: 23, starScores: [4100, 6000], weather: [{ at: 44, duration: 20, type: "wind" }, { at: 118, duration: 24, type: "cold" }], guestPool: ["red-billed-chough", "grey-backed-shrike", "himalayan-bulbul", "white-capped-redstart"], foodAvailability: { grasshopper: 1, beetle: .9, lizard: .8, mouse: .55, caterpillar: .45, smallBird: .2 }, altitude: 2, subGoal: { kind: "perfect", target: 8, label: "PERFECT 8회" } },
    37: { id: 37, world: 4, icon: "🌲", name: "아고산 침엽수림", habitat: "아고산대 침엽수림", duration: 180, maxOrders: 6, spawnMin: 2050, spawnMax: 3300, maxRecipeLength: 4, specialChance: .24, feedingTimeAt: 92, feedingDuration: 24, starScores: [4400, 6400], weather: [{ at: 70, duration: 28, type: "cold" }], guestPool: ["himalayan-woodpecker", "green-backed-tit", "rufous-sibia", "grey-backed-shrike", "red-billed-chough"], foodAvailability: { beetle: 1, caterpillar: 1, grasshopper: .65, lizard: .45, mouse: .4 }, altitude: 3, subGoal: { kind: "combo", target: 14, label: "Combo ×14" } },
    38: { id: 38, world: 4, icon: "❄️", name: "설선 아래 관목", habitat: "설선 직하부 고산 관목대", duration: 185, maxOrders: 6, spawnMin: 2000, spawnMax: 3200, maxRecipeLength: 4, specialChance: .26, feedingTimeAt: 94, feedingDuration: 25, starScores: [4700, 6850], event: "COLD SNAP", weather: [{ at: 38, duration: 28, type: "cold" }, { at: 126, duration: 30, type: "cold" }], guestPool: ["grey-backed-shrike", "red-billed-chough", "white-capped-redstart", "green-backed-tit"], foodAvailability: { grasshopper: .75, beetle: 1, caterpillar: .65, lizard: .7, mouse: .6, smallBird: .3 }, altitude: 3, subGoal: { kind: "noFailed", target: 1, label: "주문 실패 없이 클리어" } },
    39: { id: 39, world: 4, icon: "🌬️", name: "고산 고개", habitat: "강풍이 부는 높은 산길", duration: 190, maxOrders: 6, spawnMin: 1950, spawnMax: 3150, maxRecipeLength: 4, specialChance: .28, feedingTimeAt: 98, feedingDuration: 28, starScores: [5100, 7350], event: "HIGH PASS RUSH", weather: [{ at: 34, duration: 24, type: "wind" }, { at: 82, duration: 26, type: "cold" }, { at: 145, duration: 24, type: "wind" }], guestPool: ["red-billed-chough", "grey-backed-shrike", "white-capped-redstart", "himalayan-woodpecker"], foodAvailability: { grasshopper: .85, beetle: 1, lizard: .75, mouse: .65, caterpillar: .55, smallBird: .35 }, altitude: 3, subGoal: { kind: "served", target: 16, label: "손님 16마리 서빙" } },
    40: { id: 40, world: 4, icon: "🏔️", name: "히말라야 정상 만찬", habitat: "World 4 Finale · 고산 능선", duration: 205, maxOrders: 6, spawnMin: 1850, spawnMax: 3000, maxRecipeLength: 4, specialChance: .32, feedingTimeAt: 106, feedingDuration: 34, starScores: [5800, 8200], event: "SUMMIT FEAST", weather: [{ at: 30, duration: 24, type: "cold" }, { at: 74, duration: 22, type: "wind" }, { at: 118, duration: 28, type: "cold" }, { at: 164, duration: 26, type: "wind" }], guestPool: ["grey-backed-shrike", "red-billed-chough", "blue-whistling-thrush", "white-capped-redstart", "plumbeous-water-redstart", "himalayan-woodpecker", "rufous-sibia", "green-backed-tit"], foodAvailability: { grasshopper: .85, caterpillar: .8, beetle: 1, aquaticInsect: .65, frog: .45, lizard: .8, mouse: .7, fish: .25, smallBird: .4 }, altitude: 3, subGoal: { kind: "perfect", target: 10, label: "PERFECT 10회" } },
    41: { id: 41, world: 5, icon: "🌾", name: "끝없는 초원", habitat: "중앙아시아 온대 초원", duration: 155, maxOrders: 5, spawnMin: 2450, spawnMax: 3900, maxRecipeLength: 4, specialChance: .18, feedingTimeAt: null, feedingDuration: 0, starScores: [3100, 4650], guestPool: ["isabelline-wheatear", "eurasian-hoopoe", "common-kestrel"], foodAvailability: { grasshopper: 1, beetle: .95, caterpillar: .55, lizard: .6, mouse: .5 }, migrationWaves: [82], subGoal: { kind: "served", target: 12, label: "손님 12마리 서빙" } },
    42: { id: 42, world: 5, icon: "🐎", name: "목초지의 바람", habitat: "방목지와 낮은 구릉", duration: 160, maxOrders: 5, spawnMin: 2350, spawnMax: 3750, maxRecipeLength: 4, specialChance: .18, feedingTimeAt: null, feedingDuration: 0, starScores: [3400, 5050], weather: [{ at: 52, duration: 22, type: "wind" }], guestPool: ["isabelline-wheatear", "eurasian-hoopoe", "european-roller", "common-kestrel"], foodAvailability: { grasshopper: 1, beetle: .9, lizard: .7, mouse: .55, caterpillar: .45 }, migrationWaves: [92], subGoal: { kind: "combo", target: 12, label: "Combo ×12" } },
    43: { id: 43, world: 5, icon: "💧", name: "초원의 오아시스", habitat: "작은 하천과 오아시스 초지", duration: 165, maxOrders: 5, spawnMin: 2250, spawnMax: 3600, maxRecipeLength: 4, specialChance: .20, feedingTimeAt: null, feedingDuration: 0, starScores: [3650, 5450], guestPool: ["isabelline-wheatear", "european-roller", "common-kestrel", "grey-wagtail"], foodAvailability: { grasshopper: .9, beetle: .85, aquaticInsect: .65, frog: .45, lizard: .6, mouse: .45 }, migrationWaves: [70, 128], subGoal: { kind: "perfect", target: 8, label: "PERFECT 8회" } },
    44: { id: 44, world: 5, icon: "🌿", name: "관목 초원", habitat: "사막 가장자리 관목 초원", duration: 170, maxOrders: 5, spawnMin: 2150, spawnMax: 3500, maxRecipeLength: 4, specialChance: .22, feedingTimeAt: null, feedingDuration: 0, starScores: [3950, 5850], guestPool: ["isabelline-shrike", "isabelline-wheatear", "eurasian-hoopoe", "european-roller"], foodAvailability: { grasshopper: 1, beetle: 1, lizard: .8, mouse: .55, caterpillar: .4, smallBird: .2 }, migrationWaves: [88, 145], subGoal: { kind: "special", target: 3, label: "SPECIAL 3회 서빙" } },
    45: { id: 45, world: 5, icon: "☀️", name: "건조 초원", habitat: "건조한 스텝 지대", duration: 175, maxOrders: 6, spawnMin: 2050, spawnMax: 3350, maxRecipeLength: 4, specialChance: .23, feedingTimeAt: null, feedingDuration: 0, starScores: [4300, 6300], guestPool: ["isabelline-shrike", "red-tailed-shrike", "isabelline-wheatear", "european-roller"], foodAvailability: { grasshopper: 1, beetle: .95, lizard: .9, mouse: .65, caterpillar: .35, smallBird: .25 }, migrationWaves: [64, 132], subGoal: { kind: "noFailed", target: 1, label: "실패 없이 클리어" } },
    46: { id: 46, world: 5, icon: "🪨", name: "바위 초원", habitat: "암석지와 메마른 풀밭", duration: 180, maxOrders: 6, spawnMin: 2000, spawnMax: 3250, maxRecipeLength: 4, specialChance: .24, feedingTimeAt: null, feedingDuration: 0, starScores: [4650, 6800], guestPool: ["red-tailed-shrike", "european-roller", "eurasian-hoopoe", "little-owl"], foodAvailability: { grasshopper: .95, beetle: 1, lizard: 1, mouse: .75, smallBird: .3 }, migrationWaves: [76, 148], subGoal: { kind: "perfect", target: 9, label: "PERFECT 9회" } },
    47: { id: 47, world: 5, icon: "🏜️", name: "반사막의 낮", habitat: "건조 반사막과 관목", duration: 185, maxOrders: 6, spawnMin: 1950, spawnMax: 3150, maxRecipeLength: 4, specialChance: .26, feedingTimeAt: null, feedingDuration: 0, starScores: [5000, 7250], event: "DESERT CROSSING", guestPool: ["isabelline-shrike", "red-tailed-shrike", "isabelline-wheatear", "little-owl", "common-kestrel"], foodAvailability: { grasshopper: 1, beetle: .9, lizard: 1, mouse: .8, smallBird: .35 }, migrationWaves: [58, 118, 166], subGoal: { kind: "served", target: 16, label: "손님 16마리 서빙" } },
    48: { id: 48, world: 5, icon: "🌇", name: "황혼의 이동길", habitat: "반사막 중간기착지", duration: 190, maxOrders: 6, spawnMin: 1900, spawnMax: 3050, maxRecipeLength: 4, specialChance: .27, feedingTimeAt: null, feedingDuration: 0, starScores: [5350, 7700], guestPool: ["red-tailed-shrike", "isabelline-shrike", "little-owl", "european-roller"], foodAvailability: { grasshopper: .9, beetle: 1, lizard: .85, mouse: .9, smallBird: .45 }, migrationWaves: [52, 108, 164], timePhases: [{ at: 0, type: "day" }, { at: 126, type: "dusk", guestPool: ["red-tailed-shrike", "little-owl", "isabelline-shrike"], foodModifier: { mouse: 1.25, beetle: 1.15 } }], subGoal: { kind: "combo", target: 16, label: "Combo ×16" } },
    49: { id: 49, world: 5, icon: "🦅", name: "초원의 포식자", habitat: "광활한 이동 경로", duration: 195, maxOrders: 6, spawnMin: 1850, spawnMax: 3000, maxRecipeLength: 4, specialChance: .30, feedingTimeAt: null, feedingDuration: 0, starScores: [5750, 8250], guestPool: ["steppe-eagle", "common-kestrel", "red-tailed-shrike", "isabelline-shrike", "european-roller"], foodAvailability: { grasshopper: .8, beetle: .75, lizard: .9, mouse: 1, smallBird: .75 }, migrationWaves: [46, 104, 162], subGoal: { kind: "special", target: 4, label: "SPECIAL 4회 서빙" } },
    50: { id: 50, world: 5, icon: "🪽", name: "대이동 식당", habitat: "World 5 Finale · 초원 중간기착지", duration: 210, maxOrders: 7, spawnMin: 1750, spawnMax: 2850, maxRecipeLength: 4, specialChance: .32, feedingTimeAt: null, feedingDuration: 0, starScores: [6500, 9200], event: "GREAT MIGRATION", guestPool: ["isabelline-wheatear", "eurasian-hoopoe", "european-roller", "common-kestrel", "steppe-eagle", "red-tailed-shrike", "isabelline-shrike", "oriental-magpie"], foodAvailability: { grasshopper: 1, caterpillar: .5, beetle: 1, lizard: .95, mouse: .95, smallBird: .7 }, migrationWaves: [60, 125, 185], subGoal: { kind: "perfect", target: 12, label: "PERFECT 12회" } }
};
const expansionNames = {
    6: ["지중해 과수원", "돌담 목초지", "올리브 숲", "포도밭 가장자리", "코르크참나무 모자이크", "해안 관목지", "건조 초원", "오래된 마을 가장자리", "가을 이동길", "지중해 피날레"],
    7: ["프레리 울타리", "겨울 생울타리", "개방림 가장자리", "눈 덮인 초지", "강변 완충림", "목장 지대", "한랭전선", "해질녘 프레리", "블리자드 가장자리", "북미 대륙 피날레"],
    8: ["사바나 가장자리", "아카시아 관목지", "계절성 하천", "미옴보 숲 공터", "흰개미 평원", "바위 언덕", "고지 농경지", "해질녘 사바나", "곤충 대발생", "동아프리카 피날레"],
    9: ["핀보스 가장자리", "케이프 초지", "카루 관목지", "포도원 변두리", "뜨거운 농가", "가시덤불 평원", "사막 경계", "폭염의 정오", "해질녘 냉각", "남아프리카 피날레"],
    10: ["상투메 저지대 숲", "상투메 산지 숲", "섬 플랜테이션 가장자리", "마다가스카르 숲 가장자리", "마다가스카르 습지", "건조 가시숲", "섬의 밤", "폭풍 섬", "보전구역", "WORLD JOURNEY FINALE"]
};
const expansionIcons = { 6: ["🍊", "🧱", "🫒", "🍇", "🌳", "🌊", "🌾", "🏘️", "🪽", "🌅"], 7: ["🌾", "❄️", "🌲", "☃️", "🏞️", "🐄", "🌬️", "🌇", "🌨️", "🗺️"], 8: ["🦒", "🌿", "💧", "🌳", "🐜", "🪨", "⛰️", "🌇", "🦗", "🌍"], 9: ["🌺", "🌾", "🏜️", "🍇", "☀️", "🌵", "🏜️", "🔥", "🌇", "🌍"], 10: ["🌴", "⛰️", "🌿", "🌳", "💧", "🌵", "🌙", "⛈️", "🛡️", "🌍"] };
const expansionGuests = {
    6: ["european-robin", "common-blackbird", "european-bee-eater", "red-backed-shrike", "lesser-grey-shrike", "european-nightjar", "little-owl", "common-kestrel"],
    7: ["loggerhead-shrike", "american-kestrel", "eastern-bluebird", "american-robin", "belted-kingfisher", "northern-mockingbird"],
    8: ["lilac-breasted-roller", "african-grey-hornbill", "african-pygmy-kingfisher", "northern-fiscal", "mackinnons-shrike", "superb-starling"],
    9: ["southern-fiscal", "cape-wagtail", "cape-robin-chat", "fiscal-flycatcher", "cape-crow", "karoo-scrub-robin"],
    10: ["sao-tome-fiscal", "sao-tome-thrush", "sao-tome-oriole", "madagascar-kingfisher", "madagascar-kestrel", "madagascar-magpie-robin"]
};
const expansionFood = {
    6: [{ beetle: 1, caterpillar: .9, grasshopper: .65, lizard: .3 }, { grasshopper: 1, beetle: .85, mouse: .45, lizard: .55 }, { beetle: 1, caterpillar: .9, grasshopper: .7, lizard: .35 }, { grasshopper: 1, beetle: .9, caterpillar: .65, mouse: .35 }, { beetle: 1, caterpillar: .85, grasshopper: .75, lizard: .5 }, { grasshopper: 1, beetle: .8, lizard: .65, mouse: .35 }, { grasshopper: 1, beetle: .9, lizard: .7, mouse: .5 }, { beetle: .9, grasshopper: .85, mouse: .65, lizard: .5 }, { grasshopper: 1, beetle: 1, caterpillar: .55, lizard: .5 }, { grasshopper: 1, beetle: 1, caterpillar: .8, lizard: .7, mouse: .65, smallBird: .35 }],
    7: [{ grasshopper: 1, beetle: .9, mouse: .7, lizard: .55 }, { beetle: 1, mouse: .8, smallBird: .45, grasshopper: .5 }, { caterpillar: 1, beetle: .9, grasshopper: .75, smallBird: .25 }, { grasshopper: .65, beetle: .75, mouse: 1, smallBird: .5 }, { fish: 1, aquaticInsect: .85, frog: .65, beetle: .45 }, { grasshopper: 1, mouse: .85, lizard: .75, beetle: .8 }, { mouse: 1, beetle: .8, smallBird: .55, grasshopper: .55 }, { grasshopper: .9, beetle: .9, mouse: .75, smallBird: .45 }, { mouse: 1, beetle: .7, smallBird: .65, grasshopper: .45 }, { grasshopper: 1, beetle: 1, mouse: 1, lizard: .8, fish: .7, smallBird: .65 }],
    8: [{ grasshopper: 1, beetle: 1, lizard: .7, mouse: .35 }, { grasshopper: 1, beetle: .95, lizard: .8, caterpillar: .55 }, { aquaticInsect: .9, frog: .8, beetle: .8, grasshopper: .75 }, { beetle: 1, caterpillar: .85, grasshopper: .8, lizard: .55 }, { grasshopper: 1, beetle: 1, caterpillar: .75, lizard: .45 }, { grasshopper: .9, beetle: .85, lizard: 1, mouse: .55 }, { beetle: 1, grasshopper: .9, caterpillar: .8, mouse: .45 }, { grasshopper: 1, beetle: 1, lizard: .75, mouse: .55 }, { grasshopper: 1, beetle: 1, caterpillar: .9, lizard: .6 }, { grasshopper: 1, beetle: 1, caterpillar: .8, lizard: .85, mouse: .75, frog: .55 }],
    9: [{ beetle: 1, grasshopper: .9, caterpillar: .75, lizard: .45 }, { grasshopper: 1, beetle: .9, aquaticInsect: .55, mouse: .35 }, { grasshopper: 1, beetle: .95, lizard: .7, mouse: .55 }, { beetle: 1, caterpillar: .9, grasshopper: .8, mouse: .35 }, { grasshopper: 1, beetle: .85, lizard: .75, mouse: .7 }, { grasshopper: 1, beetle: 1, lizard: .9, mouse: .75 }, { grasshopper: 1, beetle: .9, lizard: 1, mouse: .8 }, { grasshopper: 1, beetle: .8, lizard: .95, mouse: .75 }, { beetle: .95, grasshopper: .9, caterpillar: .65, lizard: .55 }, { grasshopper: 1, beetle: 1, lizard: 1, mouse: .9, smallBird: .55, aquaticInsect: .45 }],
    10: [{ beetle: 1, caterpillar: .95, grasshopper: .75, lizard: .55 }, { beetle: 1, caterpillar: .9, lizard: .7, mouse: .45 }, { beetle: 1, grasshopper: .85, caterpillar: .8, lizard: .55 }, { beetle: 1, caterpillar: .9, grasshopper: .8, lizard: .65 }, { fish: 1, aquaticInsect: 1, frog: .8, beetle: .45 }, { grasshopper: 1, beetle: .9, lizard: 1, mouse: .65 }, { beetle: 1, grasshopper: .9, caterpillar: .8, mouse: .45 }, { aquaticInsect: 1, frog: .9, beetle: .85, fish: .75 }, { beetle: 1, caterpillar: .9, grasshopper: .85, lizard: .65, mouse: .55 }, { grasshopper: 1, beetle: 1, caterpillar: .9, lizard: .9, mouse: .85, fish: .8, aquaticInsect: .8, smallBird: .65 }]
};
const favouriteRotation = ["beetle", "grasshopper", "caterpillar", "lizard", "mouse", "fish", "aquaticInsect", "frog", "smallBird", "beetle"];
for (let id = 51; id <= 100; id++) {
    const world = (6 + Math.floor((id - 51) / 10)), index = (id - 51) % 10, finale = index === 9;
    const difficulty = (id - 51) / 49, pool = expansionGuests[world], guestCount = Math.min(pool.length, 3 + Math.floor(index / 2) + (finale ? 1 : 0));
    const config = { id: id, world, icon: expansionIcons[world][index], name: expansionNames[world][index], habitat: expansionNames[world][index], duration: Math.round(165 + index * 4 + (finale ? 10 : 0)), maxOrders: Math.min(7, 5 + Math.floor(index / 4)), spawnMin: Math.round(2350 - difficulty * 650), spawnMax: Math.round(3650 - difficulty * 700), maxRecipeLength: 4, specialChance: .18 + index * .016, feedingTimeAt: null, feedingDuration: 0, starScores: [Math.round(4300 + (id - 50) * 95), Math.round(6300 + (id - 50) * 135)], guestPool: pool.slice(0, guestCount), foodAvailability: expansionFood[world][index], finale };
    if (world === 6) {
        config.favoriteFood = favouriteRotation[index];
        if (index === 8)
            config.weather = [{ at: 65, duration: 24, type: "wind" }];
        if (finale)
            config.weather = [{ at: 55, duration: 22, type: "sun" }, { at: 128, duration: 22, type: "wind" }];
    }
    if (world === 7) {
        config.frost = (index < 3 ? 1 : index < 7 ? 2 : 3);
        config.weather = [{ at: 45 + index * 2, duration: 24, type: "cold" }];
        if (index === 8 || finale)
            config.weather.push({ at: 120, duration: 26, type: "wind" });
    }
    if (world === 8) {
        config.feedingTimeAt = 48 + index * 5;
        config.feedingDuration = 20 + (index % 3) * 4;
        config.event = index === 4 || index === 8 || finale ? "TERMITE EMERGENCE" : "INSECT EMERGENCE";
        if (index === 2)
            config.weather = [{ at: 72, duration: 20, type: "rain" }];
    }
    if (world === 9) {
        config.heat = (index < 3 ? 1 : index < 7 ? 2 : 3);
        config.weather = [{ at: 40 + index * 3, duration: 24, type: "sun" }];
        if (index === 8)
            config.timePhases = [{ at: 95, type: "dusk" }];
        if (finale)
            config.timePhases = [{ at: 95, type: "dusk" }, { at: 155, type: "night" }];
    }
    if (world === 10) {
        config.favoriteFood = favouriteRotation[(index + 3) % favouriteRotation.length];
        if (index >= 6)
            config.timePhases = [{ at: 80, type: "dusk" }, { at: 135, type: "night" }];
        if (index === 7 || finale)
            config.weather = [{ at: 50, duration: 22, type: "rain" }, { at: 112, duration: 22, type: "wind" }];
        if (index === 8 || finale)
            config.migrationWaves = finale ? [55, 115, 175] : [70, 145];
        config.finale = true;
    }
    config.subGoal = finale ? { kind: "perfect", target: 14, label: "PERFECT 14회" } : index % 3 === 0 ? { kind: "served", target: 12 + Math.floor(index / 2), label: `손님 ${12 + Math.floor(index / 2)}명 서빙` } : index % 3 === 1 ? { kind: "combo", target: 9 + index, label: `Best Combo ×${9 + index}` } : { kind: "special", target: 3 + Math.floor(index / 3), label: `SPECIAL ${3 + Math.floor(index / 3)}회 서빙` };
    stages[id] = config;
}
// 0.6.5.11 World Identity pass: every stage gets a readable secondary objective.
// Existing hand-authored goals remain authoritative; only missing goals are filled here.
for (let i = 1; i <= 50; i++) {
    const c = stages[i];
    if (c.subGoal)
        continue;
    const tier = Math.floor((i - 1) % 10 / 3);
    if (c.world === 1) {
        c.subGoal = i % 3 === 1
            ? { kind: "perfect", target: 3 + tier, label: `PERFECT ${3 + tier}회` }
            : i % 3 === 2
                ? { kind: "served", target: 7 + tier * 2, label: `손님 ${7 + tier * 2}명 서빙` }
                : { kind: "noFailed", target: 1, label: "주문 실패 없이 영업" };
    }
    else if (c.world === 2) {
        c.subGoal = i % 3 === 0
            ? { kind: "special", target: 2 + tier, label: `SPECIAL ${2 + tier}회 서빙` }
            : i % 3 === 1
                ? { kind: "perfect", target: 5 + tier, label: `PERFECT ${5 + tier}회` }
                : { kind: "noFailed", target: 1, label: "날씨 속 주문 실패 0회" };
    }
    else if (c.world === 3) {
        const hasNight = (c.timePhases || []).some(p => p.type === "night");
        c.subGoal = hasNight
            ? { kind: "nightServed", target: 3 + tier, label: `야간 손님 ${3 + tier}명 서빙` }
            : { kind: "combo", target: 6 + tier * 2, label: `Best Combo ×${6 + tier * 2}` };
    }
    else if (c.world === 4) {
        c.subGoal = i % 2 === 0
            ? { kind: "combo", target: 7 + tier * 2, label: `고산 Combo ×${7 + tier * 2}` }
            : { kind: "perfect", target: 6 + tier, label: `PERFECT ${6 + tier}회` };
    }
    else {
        c.subGoal = i % 3 === 0
            ? { kind: "special", target: 3 + tier, label: `SPECIAL ${3 + tier}회 서빙` }
            : i % 3 === 1
                ? { kind: "served", target: 10 + tier * 2, label: `이동기 손님 ${10 + tier * 2}명 서빙` }
                : { kind: "perfect", target: 7 + tier, label: `PERFECT ${7 + tier}회` };
    }
}
function worldRuleDescription(world) {
    if (world === 1)
        return "🌿 Feeding Time · 지역의 주 먹이가 주문에 더 강하게 반영됩니다.";
    if (world === 2)
        return "🌦 Weather Ecology · 날씨가 조리와 주문 먹이 구성을 바꿉니다.";
    if (world === 3)
        return "🌙 Night Service · 해질녘 +10%, 야간 +20% 점수 보너스.";
    if (world === 4)
        return "🏔 Acclimatisation · PERFECT 3연속마다 고도 페널티가 완화됩니다.";
    if (world === 5)
        return "🪽 Migration Momentum · Wave 중 서빙 +15%, PERFECT 시 Burning +4%.";
    if (world === 6)
        return "⭐ Favourite Dish · 스테이지 대표 먹이가 포함된 주문은 점수 +20%.";
    if (world === 7)
        return "❄️ Fire Warmth · 추위가 화력을 떨어뜨립니다. PERFECT로 화력을 회복하세요.";
    if (world === 8)
        return "🐜 Insect Emergence · 곤충 대발생 시간에는 주문 러시와 서빙 +20%.";
    if (world === 9)
        return "🔥 Heat Management · 화구가 많을수록 과열됩니다. 빠르지만 PERFECT 창이 짧아집니다.";
    return "🌍 Grand Tour · Favourite·시간대·날씨·Rush가 한 스테이지 안에서 결합됩니다.";
}
function guestDisplayName(g) { return /[가-힣]/.test(g.name) ? g.name : g.englishName; }
function guestVisual(g) {
    const id = g.id;
    const base = { body: "#9a8d78", belly: "#d8ccb4", wing: "#655d52", head: "#6b6257", cheek: "#efe5d0", mask: "#2d2b29", accent: "#d8793c", beak: "#b36b32", tail: "#4f4a44", outline: "#2a251f", beakLength: 15, tailLength: 19, eyeSize: 3.2, crest: false, longNeck: false, owlEyes: false, forkTail: false, spotted: false };
    const apply = (p) => Object.assign(base, p);
    if (id.includes("tit")) {
        apply({ body: "#e0c74e", belly: "#f0d75c", wing: "#455849", head: "#151817", cheek: "#f2eddd", mask: "#151817", tail: "#2f3a34", beak: "#342f28" });
        if (id === "marsh-tit")
            apply({ body: "#b9afa0", belly: "#d9d0bf", wing: "#77766e", head: "#181918", cheek: "#eee9da" });
        if (id === "coal-tit")
            apply({ body: "#9f9b8f", belly: "#d9d4c7", wing: "#3f4440", head: "#111413", cheek: "#f4efe0" });
        if (id === "varied-tit")
            apply({ body: "#d98d47", belly: "#e7a65e", wing: "#43505b", head: "#17191b", cheek: "#efe6d2", accent: "#d8843f" });
        if (id === "green-backed-tit")
            apply({ body: "#d7ca53", belly: "#e7dc6c", wing: "#4d6d4b", head: "#1c211e", cheek: "#f0ead9" });
    }
    else if (id.includes("wagtail")) {
        apply({ body: id === "grey-wagtail" ? "#d9c95a" : "#e8e6df", belly: id === "grey-wagtail" ? "#eddc62" : "#f4f2eb", wing: "#3e4344", head: id === "grey-wagtail" ? "#777d7e" : "#242728", cheek: "#f1eee5", mask: "#202324", tail: "#222628", tailLength: 31, beak: "#353535" });
        if (id === "cape-wagtail")
            apply({ body: "#8d8c83", belly: "#dedbd2", head: "#6e706b" });
    }
    else if (id.includes("egret")) {
        apply({ body: "#f1eee3", belly: "#fffaf0", wing: "#e9e6dc", head: "#f7f3e9", cheek: "#fffaf0", mask: "#f7f3e9", tail: "#ded9cf", beak: id === "little-egret" ? "#232322" : "#d99b38", beakLength: 23, longNeck: true });
    }
    else if (id.includes("heron")) {
        apply({ body: "#949ba0", belly: "#c5c9c8", wing: "#747d84", head: "#ece9df", cheek: "#f5f1e6", mask: "#2d3437", tail: "#697176", beak: "#c99a47", beakLength: 24, longNeck: true });
        if (id.includes("night-heron"))
            apply({ body: "#a9adb0", wing: "#646d75", head: "#292f34", cheek: "#e9e8df", mask: "#292f34" });
    }
    else if (id.includes("kingfisher")) {
        apply({ body: "#d8793e", belly: "#ed9954", wing: "#177ea2", head: "#247ea0", cheek: "#e9ddd0", mask: "#245e76", tail: "#17617b", beak: "#222524", beakLength: 27 });
        if (id === "ruddy-kingfisher")
            apply({ body: "#b95a45", belly: "#d36d55", wing: "#563e55", head: "#9f493e", cheek: "#d79782", beak: "#b94639" });
        if (id === "african-pygmy-kingfisher")
            apply({ body: "#d46c3e", wing: "#3f6ca1", head: "#5976b0", cheek: "#f2d8b0" });
        if (id === "madagascar-kingfisher")
            apply({ body: "#d66a3f", wing: "#4f63a0", head: "#6e6bb1" });
        if (id === "belted-kingfisher")
            apply({ body: "#d8d7ce", belly: "#f0eee6", wing: "#486b78", head: "#4f6f7b", cheek: "#f2eee4", crest: true });
    }
    else if (id.includes("woodpecker")) {
        apply({ body: "#e8e4d8", belly: "#f3efe4", wing: "#1f2424", head: "#202424", cheek: "#f4efe3", mask: "#181d1d", accent: "#c94534", tail: "#1e2222", beak: "#383733", beakLength: 20, crest: true });
        if (id === "japanese-pygmy-woodpecker")
            apply({ body: "#b0a995", wing: "#5e5c53", head: "#767267", accent: "#a54e36", crest: false });
    }
    else if (id.includes("owl")) {
        apply({ body: "#8b765f", belly: "#c8b596", wing: "#665747", head: "#786650", cheek: "#d8c3a2", mask: "#8a7258", tail: "#5a4c40", beak: "#c59a45", eyeSize: 4.2, owlEyes: true, spotted: true });
        if (id === "oriental-scops-owl")
            apply({ body: "#8a6b50", head: "#775c48", crest: true });
    }
    else if (id.includes("kestrel") || id.includes("sparrowhawk") || id.includes("eagle")) {
        apply({ body: "#9e7450", belly: "#d4b48c", wing: "#6f543f", head: "#796150", cheek: "#d9c7ac", mask: "#5c493c", tail: "#5c4b40", beak: "#d3a84b", beakLength: 13, spotted: true });
        if (id === "eurasian-sparrowhawk")
            apply({ body: "#9ca0a0", belly: "#d6c2a7", wing: "#656d73", head: "#68747a" });
        if (id === "steppe-eagle")
            apply({ body: "#5a4637", belly: "#6b5140", wing: "#42372f", head: "#4b3d33", cheek: "#806c59" });
    }
    else if (id.includes("shrike") || id.includes("fiscal")) {
        apply({ body: "#d7d6cf", belly: "#ece9df", wing: "#31373a", head: "#a8aaab", cheek: "#ecebe3", mask: "#171b1d", tail: "#242a2d", beak: "#272b2c", beakLength: 15 });
        if (id.includes("red-tailed") || id.includes("isabelline"))
            apply({ body: "#c9a47d", belly: "#e1c3a0", head: "#b79875", wing: "#78685b", tail: "#a86844" });
        if (id === "mackinnons-shrike")
            apply({ body: "#b7aaa1", head: "#9d8f87", wing: "#4a4b49" });
    }
    else if (id.includes("roller")) {
        apply({ body: "#4189a5", belly: "#64aeb9", wing: "#326f96", head: "#4ca2b7", cheek: "#78c2c9", mask: "#355d73", tail: "#2c6384", beak: "#333335", beakLength: 20 });
        if (id === "lilac-breasted-roller")
            apply({ body: "#9a72aa", belly: "#b77caa", wing: "#3a8a9a", head: "#4b9da5", cheek: "#b8d8cf" });
    }
    else if (id.includes("magpie") || id.includes("crow") || id.includes("chough")) {
        apply({ body: "#202426", belly: id.includes("magpie") ? "#e8e7df" : "#343536", wing: "#1b2228", head: "#1a1e20", cheek: id.includes("magpie") ? "#f0eee7" : "#333536", mask: "#181b1d", tail: "#172027", tailLength: 30, beak: id.includes("chough") ? "#c33d2f" : "#2b2d2e", beakLength: 18 });
        if (id === "madagascar-magpie-robin")
            apply({ body: "#242729", belly: "#e9e7df", cheek: "#f2eee5" });
    }
    else if (id.includes("hoopoe")) {
        apply({ body: "#d9995c", belly: "#e8b172", wing: "#292b2b", head: "#d59a61", cheek: "#e6b37a", mask: "#6f5746", accent: "#242526", tail: "#282a2a", beak: "#3e3b34", beakLength: 28, crest: true });
    }
    else if (id.includes("bee-eater")) {
        apply({ body: "#6e9e54", belly: "#7fc16e", wing: "#3c8f91", head: "#a07154", cheek: "#d3a970", mask: "#2b3a3a", tail: "#306f71", beak: "#2b2926", beakLength: 21 });
    }
    else if (id.includes("starling")) {
        apply({ body: "#3a6f72", belly: "#486e78", wing: "#3c4c5a", head: "#365e68", cheek: "#547b80", mask: "#2b3d48", tail: "#313b46", beak: "#d29b42", spotted: true });
    }
    else if (id.includes("hornbill")) {
        apply({ body: "#8d8a7f", belly: "#bdb9ad", wing: "#5d5f59", head: "#76766e", cheek: "#d4d0c5", mask: "#343638", tail: "#51534f", beak: "#d9a749", beakLength: 31 });
    }
    else if (id.includes("robin") || id.includes("redstart") || id.includes("bluebird")) {
        apply({ body: "#d77d49", belly: "#ea955f", wing: "#4c5660", head: "#59626b", cheek: "#c9d0ca", mask: "#394047", tail: "#8f4d39", beak: "#343332" });
        if (id === "european-robin")
            apply({ head: "#877464", body: "#d97545", wing: "#756654", cheek: "#d6c6b4" });
        if (id === "eastern-bluebird")
            apply({ head: "#3a72a7", wing: "#315f8c", body: "#c7774d", belly: "#e1a174", cheek: "#8bb2c9" });
        if (id === "cape-robin-chat")
            apply({ head: "#5e6b73", wing: "#4c555c", body: "#d77c49" });
    }
    else if (id.includes("thrush") || id.includes("blackbird")) {
        apply({ body: "#8e7056", belly: "#c4a783", wing: "#6d5949", head: "#776252", cheek: "#d2bea3", mask: "#5d4e42", tail: "#57483f", beak: "#c28b3f", spotted: id !== "common-blackbird" });
        if (id === "blue-whistling-thrush")
            apply({ body: "#394e77", belly: "#435b86", wing: "#303f67", head: "#35496e", cheek: "#5a6d91", beak: "#d69a49" });
        if (id === "common-blackbird")
            apply({ body: "#2b2c2d", belly: "#333435", wing: "#242628", head: "#27292a", cheek: "#3a3b3c", beak: "#e0a23b" });
    }
    else if (id.includes("swallow")) {
        apply({ body: "#d8e0df", belly: "#eef1ed", wing: "#253a4d", head: "#24394c", cheek: "#d9e0df", mask: "#253744", tail: "#1f3244", tailLength: 31, forkTail: true, beak: "#343434" });
    }
    else if (id.includes("sandpiper") || id.includes("lapwing") || id.includes("wheatear") || id.includes("scrub-robin")) {
        apply({ body: "#aa9275", belly: "#d7c4a6", wing: "#7e6a57", head: "#927c67", cheek: "#e1d1b7", mask: "#665647", tail: "#635345", beak: "#4a433a", beakLength: 19 });
        if (id.includes("lapwing"))
            apply({ body: "#a9a89d", head: "#8e918c", wing: "#6e736d" });
    }
    else if (id.includes("warbler") || id.includes("treecreeper")) {
        apply({ body: "#958767", belly: "#c9b994", wing: "#6f6753", head: "#85795f", cheek: "#d8c9a7", mask: "#655d4c", tail: "#655d50", beak: "#4c453b", beakLength: id.includes("treecreeper") ? 22 : 16 });
    }
    else if (id.includes("bulbul")) {
        apply({ body: "#8b8176", belly: "#b7a998", wing: "#66645f", head: "#5e5f5d", cheek: "#ad987d", mask: "#4d4d4a", tail: "#555651", beak: "#3c3c3a", crest: true });
        if (id === "himalayan-bulbul")
            apply({ head: "#34393b", cheek: "#e1d6c1", body: "#a99b85" });
    }
    else if (id.includes("jay")) {
        apply({ body: "#bd9a78", belly: "#d6b99a", wing: "#597e9b", head: "#a58a70", cheek: "#d9c2aa", mask: "#4f443b", tail: "#403d39", beak: "#383633" });
    }
    else if (id.includes("nightjar")) {
        apply({ body: "#776553", belly: "#a28c70", wing: "#5d5043", head: "#6b5a4d", cheek: "#a99579", mask: "#51453c", tail: "#53483f", beak: "#3c3631", spotted: true });
    }
    else if (id.includes("oriole")) {
        apply({ body: "#e3c54c", belly: "#efd761", wing: "#24292a", head: "#d8b940", cheek: "#f1db72", mask: "#232729", tail: "#292d2e", beak: "#9d4d37" });
    }
    else if (id.includes("flycatcher") || id.includes("mockingbird")) {
        apply({ body: "#9b9b94", belly: "#d5d4ca", wing: "#666a6b", head: "#858783", cheek: "#deddd4", mask: "#565b5c", tail: "#515657", beak: "#353839" });
    }
    if (id === "eurasian-nuthatch")
        apply({ body: "#c88d62", belly: "#dca87e", wing: "#617d8e", head: "#6f8794", cheek: "#d7d2c1", mask: "#2d3336" });
    if (id === "brown-eared-bulbul")
        apply({ body: "#8d8277", belly: "#b5aa9e", wing: "#65645f", head: "#666864", cheek: "#9a765d", mask: "#545452" });
    if (id === "daurian-redstart")
        apply({ body: "#d77a47", belly: "#e69762", wing: "#2c3338", head: "#7e888b", cheek: "#c3c7c2", mask: "#33383b", tail: "#a74e34" });
    if (id === "oriental-magpie")
        apply({ body: "#24292d", belly: "#f0eee6", wing: "#1f3a4a", head: "#1b2023", cheek: "#f4f0e8", tail: "#18313f", tailLength: 34 });
    if (id === "common-sandpiper")
        apply({ body: "#9b8064", belly: "#e1d4bd", wing: "#74614f", head: "#87715b", cheek: "#e6d9c4", mask: "#6b5949" });
    if (id === "grey-headed-lapwing")
        apply({ body: "#b7a783", belly: "#e2d5b7", wing: "#745f4e", head: "#8e9290", cheek: "#d8d3c7" });
    if (id === "eurasian-jay")
        apply({ body: "#bb9978", wing: "#4f75a3", head: "#a5836e", cheek: "#d8bda5" });
    if (id === "white-capped-redstart")
        apply({ body: "#a73f34", belly: "#ca4e3d", wing: "#23272a", head: "#f0ede4", cheek: "#f5f0e4", mask: "#1f2224", tail: "#8d312b" });
    if (id === "plumbeous-water-redstart")
        apply({ body: "#6d7783", belly: "#7f8993", wing: "#58626d", head: "#67727e", cheek: "#9ba2a8", tail: "#b64e3c" });
    if (id === "red-billed-chough")
        apply({ body: "#1f2224", belly: "#292b2c", wing: "#16191a", head: "#1c1e20", cheek: "#343537", tail: "#111416", beak: "#cf3d2d", beakLength: 22 });
    if (id === "superb-starling")
        apply({ body: "#2f7e87", belly: "#c56e48", wing: "#314f76", head: "#2d6777", cheek: "#4fa6a7", mask: "#1c3348" });
    return base;
}
function guestPortraitSvg(g, compact = false) {
    const v = guestVisual(g), tailX = 24 - v.tailLength * .35, tailY = 62, headY = v.longNeck ? 25 : 31, bodyY = v.longNeck ? 58 : 56, headR = v.owlEyes ? 20 : 18;
    const tail = v.forkTail
        ? `<path d="M39 58 L${tailX} 69 L34 70 L${tailX - 7} 80 L47 65 Z" fill="${v.tail}" stroke="${v.outline}" stroke-width="2"/>`
        : `<path d="M40 57 L${tailX} ${tailY + 5} L${tailX + 4} ${tailY + 14} L48 64 Z" fill="${v.tail}" stroke="${v.outline}" stroke-width="2"/>`;
    const spots = v.spotted ? `<g fill="${v.accent}" opacity=".72"><circle cx="53" cy="54" r="2.2"/><circle cx="61" cy="61" r="1.8"/><circle cx="47" cy="64" r="1.6"/></g>` : "";
    const crest = v.crest ? `<path d="M70 ${headY - 13} L75 ${headY - 27} L80 ${headY - 13} L85 ${headY - 24} L88 ${headY - 10}" fill="${v.accent}" stroke="${v.outline}" stroke-width="2" stroke-linejoin="round"/>` : "";
    const beakTip = 96 + v.beakLength * .55;
    const beak = `<path d="M91 ${headY + 1} L${beakTip} ${headY - 2} L91 ${headY + 7} Z" fill="${v.beak}" stroke="${v.outline}" stroke-width="2" stroke-linejoin="round"/>`;
    const face = v.owlEyes
        ? `<ellipse cx="74" cy="${headY}" rx="12" ry="13" fill="${v.cheek}" opacity=".92"/><ellipse cx="88" cy="${headY}" rx="12" ry="13" fill="${v.cheek}" opacity=".92"/><circle cx="75" cy="${headY}" r="${v.eyeSize}" fill="#151515"/><circle cx="87" cy="${headY}" r="${v.eyeSize}" fill="#151515"/><circle cx="76" cy="${headY - 1}" r="1.1" fill="#fff"/><circle cx="88" cy="${headY - 1}" r="1.1" fill="#fff"/>`
        : `<ellipse cx="82" cy="${headY + 5}" rx="11" ry="9" fill="${v.cheek}"/><path d="M66 ${headY - 2} Q76 ${headY - 8} 91 ${headY - 2} Q80 ${headY + 2} 69 ${headY + 4} Z" fill="${v.mask}" opacity=".88"/><circle cx="84" cy="${headY - 2}" r="${v.eyeSize}" fill="#111"/><circle cx="85" cy="${headY - 3}" r="1.1" fill="#fff"/>`;
    return `<svg class="guest-bird-svg${compact ? " compact" : ""}" viewBox="0 0 120 90" aria-hidden="true" focusable="false">
    <ellipse cx="59" cy="79" rx="35" ry="4.5" fill="rgba(22,17,11,.18)"/>
    ${tail}
    <ellipse cx="58" cy="${bodyY}" rx="31" ry="24" fill="${v.body}" stroke="${v.outline}" stroke-width="2.2"/>
    <ellipse cx="65" cy="${bodyY + 7}" rx="21" ry="16" fill="${v.belly}" opacity=".95"/>
    <ellipse cx="42" cy="${bodyY + 1}" rx="18" ry="12" transform="rotate(-18 42 ${bodyY + 1})" fill="${v.wing}" stroke="${v.outline}" stroke-width="2"/>
    ${spots}
    ${crest}
    <circle cx="80" cy="${headY}" r="${headR}" fill="${v.head}" stroke="${v.outline}" stroke-width="2.2"/>
    ${face}${beak}
    <path d="M51 76 q2 5 6 0 M68 76 q2 5 6 0" fill="none" stroke="${v.outline}" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}
function shrikeVisual(id) {
    const base = {
        body: "#b5b0a5", belly: "#eee8d9", wing: "#33383a", head: "#a7a39a", cheek: "#efe9dc",
        mask: "#191d1f", accent: "#b46f42", beak: "#25292a", tail: "#252a2c", outline: "#29241f",
        tailLength: 26, barred: false, paleWingPatch: true
    };
    const apply = (p) => Object.assign(base, p);
    if (id === "bull-headed")
        apply({ body: "#8c8e88", belly: "#ead7b8", wing: "#272c2d", head: "#a85f3d", cheek: "#e8d4ba", tail: "#2c3031", accent: "#b56642", tailLength: 25 });
    if (id === "tiger")
        apply({ body: "#a86745", belly: "#e5c6a4", wing: "#654536", head: "#a66040", cheek: "#e7c6a8", tail: "#624537", accent: "#3c3028", tailLength: 24, barred: true, paleWingPatch: false });
    if (id === "brown")
        apply({ body: "#a17658", belly: "#e6c9a6", wing: "#725544", head: "#9d7458", cheek: "#e8cdb0", tail: "#a35c3c", accent: "#c2764e", tailLength: 27, paleWingPatch: false });
    if (id === "chinese-grey")
        apply({ body: "#c8cbca", belly: "#f3f0e6", wing: "#272c2f", head: "#bfc3c2", cheek: "#f4f1e8", tail: "#23292c", accent: "#ffffff", tailLength: 31 });
    if (id === "long-tailed")
        apply({ body: "#9ea4a5", belly: "#e9e3d7", wing: "#252a2c", head: "#272c2d", cheek: "#f1ece2", tail: "#202629", accent: "#c6784e", tailLength: 39 });
    if (id === "northern")
        apply({ body: "#b8bcbd", belly: "#f0eee6", wing: "#343a3c", head: "#b6babb", cheek: "#f3efe6", tail: "#313638", accent: "#ffffff", tailLength: 31 });
    if (id === "grey-backed")
        apply({ body: "#727d81", belly: "#e9dfd0", wing: "#30383b", head: "#7f898b", cheek: "#eee8db", tail: "#293034", accent: "#c88760", tailLength: 29 });
    if (id === "isabelline")
        apply({ body: "#bea17e", belly: "#e4c9a5", wing: "#806c58", head: "#b69a78", cheek: "#e6cfad", mask: "#4d4036", tail: "#b5643e", accent: "#d18150", tailLength: 28, paleWingPatch: false });
    if (id === "red-tailed")
        apply({ body: "#b18e6d", belly: "#e6c7a0", wing: "#755c4b", head: "#a98768", cheek: "#e7caaa", mask: "#3f3731", tail: "#b34f35", accent: "#d76643", tailLength: 30, paleWingPatch: false });
    if (id === "great-grey")
        apply({ body: "#c0c4c3", belly: "#f4f1e8", wing: "#252b2e", head: "#bfc3c2", cheek: "#f6f2e9", tail: "#242a2d", accent: "#ffffff", tailLength: 33 });
    return base;
}
function shrikeVisualMeta(id) {
    if (id === "tiger")
        return { ko: "칡때까치", en: "Tiger Shrike", role: "🔥 Cooking" };
    if (id === "brown")
        return { ko: "노랑때까치", en: "Brown Shrike", role: "⚡ Combo" };
    if (id === "chinese-grey")
        return { ko: "물때까치", en: "Chinese Grey Shrike", role: "⏱ Control" };
    if (id === "long-tailed")
        return { ko: "긴꼬리때까치", en: "Long-tailed Shrike", role: "🍢 Capacity" };
    if (id === "northern")
        return { ko: "재때까치", en: "Northern Shrike", role: "📈 Growth" };
    if (id === "grey-backed")
        return { ko: "회색등때까치", en: "Grey-backed Shrike", role: "🏔️ Altitude" };
    if (id === "isabelline")
        return { ko: "사막때까치", en: "Isabelline Shrike", role: "🪽 Migration" };
    if (id === "red-tailed")
        return { ko: "붉은꼬리때까치", en: "Red-tailed Shrike", role: "⚡ Rush" };
    if (id === "great-grey")
        return { ko: "초원때까치", en: "Great Grey Shrike", role: "🌍 Environment" };
    return { ko: "때까치", en: "Bull-headed Shrike", role: "⚖️ Balance" };
}
function shrikePortraitSvg(id, state = "idle", chef = false) {
    const v = shrikeVisual(id), tailX = Math.max(8, 34 - v.tailLength * .55), barred = v.barred
        ? `<g stroke="${v.accent}" stroke-width="2" opacity=".82"><path d="M38 47 l19 7"/><path d="M36 53 l19 7"/><path d="M38 59 l16 6"/></g>`
        : "";
    const patch = v.paleWingPatch ? `<path d="M37 50 q10 -6 20 1 q-8 1 -16 8 z" fill="#eee9dc" opacity=".94"/>` : "";
    const chefHat = chef ? `<g class="chef-hat" fill="#fff9e9" stroke="#66543f" stroke-width="1.6"><rect x="65" y="13" width="27" height="8" rx="3"/><circle cx="70" cy="12" r="7"/><circle cx="79" cy="9" r="8"/><circle cx="88" cy="12" r="7"/></g>` : "";
    const scarf = chef ? `<path d="M69 51 q12 7 23 0 l-3 11 q-9 4 -17 0 z" fill="#d84e38" stroke="${v.outline}" stroke-width="1.5"/>` : "";
    const stateFx = state === "assemble"
        ? `<g class="chef-tool"><path d="M83 67 L111 53" stroke="#a77745" stroke-width="3" stroke-linecap="round"/><circle cx="96" cy="60" r="4" fill="#75a44c"/><circle cx="104" cy="56" r="4" fill="#d77b42"/></g>`
        : state === "cook"
            ? `<g class="chef-flame"><path d="M103 70 q-7 -8 1 -17 q-1 7 5 9 q4 -8 7 -2 q5 11 -7 17 q-5 2 -6 -7z" fill="#ef7e32"/><path d="M106 70 q-2 -5 3 -9 q0 5 4 6 q1 5 -4 7z" fill="#ffd45d"/></g>`
            : state === "perfect"
                ? `<g class="chef-stars" fill="#ffd95a" stroke="#8a5d20" stroke-width="1"><path d="M22 18 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/><path d="M102 24 l2 4 5 1-4 3 1 5-4-2-4 2 1-5-4-3 5-1z"/></g>`
                : state === "burning"
                    ? `<g class="chef-burning-aura" fill="#f28a34" opacity=".86"><path d="M16 69 q-8-13 4-24 q-2 10 6 13 q4-14 11-20 q0 17 9 23 q-3 13-15 18z"/><path d="M96 71 q-7-11 3-21 q-1 9 5 11 q3-10 7-14 q2 14 8 18 q-3 12-12 15z"/></g>`
                    : "";
    return `<svg class="chef-shrike-svg state-${state}" viewBox="0 0 126 92" aria-hidden="true" focusable="false">
    <ellipse cx="61" cy="82" rx="38" ry="4" fill="rgba(22,17,11,.18)"/>
    ${stateFx}
    <path d="M42 58 L${tailX} 67 L${tailX + 2} 77 L50 66 Z" fill="${v.tail}" stroke="${v.outline}" stroke-width="2.1"/>
    <ellipse cx="57" cy="57" rx="31" ry="23" fill="${v.body}" stroke="${v.outline}" stroke-width="2.2"/>
    <ellipse cx="66" cy="64" rx="20" ry="14" fill="${v.belly}" opacity=".96"/>
    <ellipse cx="42" cy="54" rx="19" ry="12" transform="rotate(-18 42 54)" fill="${v.wing}" stroke="${v.outline}" stroke-width="2"/>
    ${barred}${patch}
    ${scarf}
    <circle cx="80" cy="34" r="18" fill="${v.head}" stroke="${v.outline}" stroke-width="2.2"/>
    <ellipse cx="84" cy="40" rx="10" ry="8" fill="${v.cheek}"/>
    <path d="M64 31 Q77 24 96 30 Q84 36 67 37 Z" fill="${v.mask}" opacity=".94"/>
    <circle cx="86" cy="30" r="3.2" fill="#111"/><circle cx="87" cy="29" r="1.1" fill="#fff"/>
    <path d="M95 35 q10 -2 18 2 l-11 4 q-4 5 -8 1 l4 -4 z" fill="${v.beak}" stroke="${v.outline}" stroke-width="1.8" stroke-linejoin="round"/>
    ${chefHat}
    <path d="M52 77 q2 5 6 0 M70 77 q2 5 6 0" fill="none" stroke="${v.outline}" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}
function chefState() {
    if (isBurning())
        return "burning";
    if (Date.now() < chefReactionUntil)
        return "perfect";
    if (burners.some(b => b.state !== "empty"))
        return "cook";
    if (currentSkewer.length || pendingSkewer)
        return "assemble";
    return "idle";
}
function chefStateLabel(state) {
    return state === "burning" ? "🔥 BURNING" : state === "perfect" ? "✨ PERFECT!" : state === "cook" ? "🔥 굽는 중" : state === "assemble" ? "🍢 꼬치 조립" : "🌿 주문 대기";
}
function renderChefVisual(force = false) {
    if (!chefVisualEl)
        return;
    const state = chefState(), key = `${selectedShrike}|${state}`;
    if (!force && key === chefVisualKey)
        return;
    chefVisualKey = key;
    const meta = shrikeVisualMeta(selectedShrike);
    chefVisualEl.className = `chef-visual state-${state}`;
    chefVisualEl.innerHTML = `<div class="chef-visual-art">${shrikePortraitSvg(selectedShrike, state, true)}</div><div class="chef-visual-copy"><span class="chef-kicker">SHRIKE CHEF · ${meta.role}</span><strong>${meta.ko}</strong><small>${meta.en}</small><em>${chefStateLabel(state)}</em></div>`;
}
function renderGuestPerch() {
    const now = Date.now(), active = new Set(orders.map(o => String(o.id)));
    Array.from(guestPerchEl.querySelectorAll(".guest-visitor")).forEach(node => {
        if (!active.has(node.dataset.orderId || "") && !node.classList.contains("leaving")) {
            node.classList.add("leaving");
            setTimeout(() => node.remove(), 260);
        }
    });
    orders.forEach(o => {
        const key = String(o.id), left = o.deadlineSeconds - (now - o.createdAt) / 1000;
        let node = guestPerchEl.querySelector(`.guest-visitor[data-order-id="${key}"]`);
        if (!node) {
            node = document.createElement("div");
            node.dataset.orderId = key;
            node.className = "guest-visitor entering";
            node.innerHTML = `<div class="guest-visitor-art">${guestPortraitSvg(o.guest)}</div><div class="guest-visitor-copy"><strong>${guestDisplayName(o.guest)}</strong>${/[가-힣]/.test(o.guest.name) ? `<span>${o.guest.englishName}</span>` : ""}</div><div class="guest-mood" aria-hidden="true"></div>`;
            guestPerchEl.appendChild(node);
            requestAnimationFrame(() => node === null || node === void 0 ? void 0 : node.classList.remove("entering"));
        }
        node.classList.toggle("urgent", left < 10);
        node.classList.toggle("selected", selectedOrderId === o.id);
        node.classList.toggle("special", o.special);
        node.classList.toggle("signature", o.signature);
        const mood = node.querySelector(".guest-mood");
        if (mood)
            mood.textContent = left < 10 ? "!" : selectedOrderId === o.id ? "★" : o.signature ? "✦" : "";
    });
    guestPerchEl.classList.toggle("empty", orders.length === 0);
}
const $ = (id) => document.getElementById(id);
const coverScreen = $("coverScreen"), enterGameButton = $("enterGameButton"), installAppButton = $("installAppButton");
const startScreen = $("startScreen"), gameScreen = $("gameScreen"), resultScreen = $("resultScreen");
const startButton = $("startButton"), nextStageButton = $("nextStageButton"), restartButton = $("restartButton"), backButton = $("backButton"), quitButton = $("quitButton"), pauseButton = $("pauseButton");
const resetSaveButton = $("resetSaveButton"), finishSkewerButton = $("finishSkewerButton"), clearSkewerButton = $("clearSkewerButton"), burnButton = $("burnButton");
const helpButton = $("helpButton"), helpDialog = $("helpDialog"), closeHelpButton = $("closeHelpButton");
const restaurantButton = $("restaurantButton"), restaurantDialog = $("restaurantDialog"), closeRestaurantButton = $("closeRestaurantButton");
const birdBookButton = $("birdBookButton"), birdBookDialog = $("birdBookDialog"), closeBirdBookButton = $("closeBirdBookButton"), birdBookList = $("birdBookList");
const shrikeDexButton = $("shrikeDexButton"), shrikeDexDialog = $("shrikeDexDialog"), closeShrikeDexButton = $("closeShrikeDexButton"), shrikeDexList = $("shrikeDexList");
const ordersEl = $("orders"), guestPerchEl = $("guestPerch"), chefVisualEl = $("chefVisual"), burnersEl = $("burners"), skewerEl = $("skewer"), foodButtonsEl = $("foodButtons"), stageButtonsEl = $("stageButtons"), shrikeButtonsEl = $("shrikeButtons"), upgradeList = $("upgradeList");
const worldStep = $("worldStep"), stageStep = $("stageStep"), chefStep = $("chefStep"), readyStep = $("readyStep");
const backToWorldButton = $("backToWorldButton"), backToStageButton = $("backToStageButton"), backToChefButton = $("backToChefButton");
const selectedWorldFlowTitle = $("selectedWorldFlowTitle"), selectedStageFlowTitle = $("selectedStageFlowTitle"), startChoiceSummary = $("startChoiceSummary");
const flowDotWorld = $("flowDotWorld"), flowDotStage = $("flowDotStage"), flowDotChef = $("flowDotChef"), flowDotReady = $("flowDotReady");
const selectedOrderSummary = $("selectedOrderSummary"), statusMessage = $("statusMessage"), floatingJudge = $("floatingJudge"), eventBanner = $("eventBanner"), timeLabel = $("timeLabel"), scoreLabel = $("scoreLabel"), comboLabel = $("comboLabel"), bestComboLabel = $("bestComboLabel"), burnGaugeFill = $("burnGaugeFill"), burnGaugeText = $("burnGaugeText"), saveSummary = $("saveSummary"), currentStageLabel = $("currentStageLabel"), currentShrikeLabel = $("currentShrikeLabel"), stageEcology = $("stageEcology"), totalXpHeader = $("totalXpHeader"), careerStatsHeader = $("careerStatsHeader"), xpHudLabel = $("xpHudLabel"), resultTotalXp = $("resultTotalXp"), recordNotice = $("recordNotice"), weatherLabel = $("weatherLabel"), world1Button = $("world1Button"), world2Button = $("world2Button"), world3Button = $("world3Button"), world4Button = $("world4Button"), world5Button = $("world5Button"), world6Button = $("world6Button"), world7Button = $("world7Button"), world8Button = $("world8Button"), world9Button = $("world9Button"), world10Button = $("world10Button"), devModeButton = $("devModeButton"), devModeBanner = $("devModeBanner");
function defaultSave() { return { version: SAVE_VERSION, unlockedStage: 1, unlockedShrikes: ["bull-headed"], xp: 0, bestStars: {}, bestCombos: {}, bestScores: {}, bestSubGoals: {}, upgrades: { branch: 0, fire: 0, perch: 0 }, discoveredBirds: [], stats: { plays: 0, served: 0, perfect: 0, failed: 0 } }; }
function loadSave() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw)
            return defaultSave();
        const parsed = JSON.parse(raw), base = defaultSave();
        const merged = { ...base, ...parsed, version: SAVE_VERSION,
            unlockedShrikes: Array.isArray(parsed.unlockedShrikes) ? parsed.unlockedShrikes.map(x => (Number(parsed.version || 0) < 8 && x === "great-grey") ? "northern" : x).filter((x) => ["bull-headed", "tiger", "brown", "chinese-grey", "long-tailed", "northern", "grey-backed", "isabelline", "red-tailed", "great-grey"].includes(x)) : base.unlockedShrikes,
            bestStars: { ...base.bestStars, ...(parsed.bestStars || {}) }, bestCombos: { ...base.bestCombos, ...(parsed.bestCombos || {}) }, bestScores: { ...base.bestScores, ...(parsed.bestScores || {}) }, bestSubGoals: { ...base.bestSubGoals, ...(parsed.bestSubGoals || {}) }, upgrades: { ...base.upgrades, ...(parsed.upgrades || {}) },
            discoveredBirds: Array.isArray(parsed.discoveredBirds) ? parsed.discoveredBirds.filter((x) => x in guests) : [], stats: { ...base.stats, ...(parsed.stats || {}) } };
        if (!merged.unlockedShrikes.includes("bull-headed"))
            merged.unlockedShrikes.unshift("bull-headed");
        merged.unlockedStage = Math.max(1, Math.min(100, Number(merged.unlockedStage) || 1));
        return merged;
    }
    catch {
        return defaultSave();
    }
}
function persist() { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); renderMeta(); }
let save = loadSave();
let devMode = sessionStorage.getItem("shrikeTycoonDevMode") === "1";
function setDevMode(enabled) { devMode = enabled; sessionStorage.setItem("shrikeTycoonDevMode", enabled ? "1" : "0"); if (!enabled) {
    if (selectedStage > save.unlockedStage)
        selectedStage = save.unlockedStage;
    selectedWorld = Math.min(10, Math.ceil(selectedStage / 10));
    if (!save.unlockedShrikes.includes(selectedShrike))
        selectedShrike = save.unlockedShrikes.includes("red-tailed") ? "red-tailed" : save.unlockedShrikes.includes("isabelline") ? "isabelline" : save.unlockedShrikes.includes("grey-backed") ? "grey-backed" : save.unlockedShrikes.includes("northern") ? "northern" : save.unlockedShrikes.includes("long-tailed") ? "long-tailed" : save.unlockedShrikes.includes("chinese-grey") ? "chinese-grey" : save.unlockedShrikes.includes("brown") ? "brown" : save.unlockedShrikes.includes("tiger") ? "tiger" : "bull-headed";
} document.body.classList.toggle("dev-mode", enabled); devModeButton.classList.toggle("active", enabled); devModeButton.textContent = enabled ? "🛠 DEV ON" : "🛠 DEV MODE"; devModeBanner.classList.toggle("hidden", !enabled); renderMeta(); }
let selectedStage = Math.min(save.unlockedStage, 100);
let selectedWorld = Math.min(10, Math.ceil(selectedStage / 10));
let selectedShrike = save.unlockedShrikes.includes("red-tailed") ? "red-tailed" : save.unlockedShrikes.includes("isabelline") ? "isabelline" : save.unlockedShrikes.includes("grey-backed") ? "grey-backed" : save.unlockedShrikes.includes("northern") ? "northern" : save.unlockedShrikes.includes("long-tailed") ? "long-tailed" : save.unlockedShrikes.includes("chinese-grey") ? "chinese-grey" : save.unlockedShrikes.includes("brown") ? "brown" : save.unlockedShrikes.includes("tiger") ? "tiger" : "bull-headed";
let stage = stages[selectedStage], orders = [], selectedOrderId = null, currentSkewer = [], pendingSkewer = null, burners = [];
let chefReactionUntil = 0, chefVisualKey = "";
let score = 0, combo = 0, bestCombo = 0, served = 0, perfectCount = 0, failed = 0, specialServed = 0, perfectStreak = 0, nightServed = 0, fireWarmth = 100, heatLevel = 0;
let startedAt = 0, gameEndAt = 0, nextOrderAt = 0, orderSequence = 1, animationFrame = 0;
let running = false, paused = false, pausedAt = 0, burningGauge = 0, burningActiveUntil = 0, burningStartedAt = 0, feedingActiveUntil = 0, feedingTriggered = false, eventShown = false;
let currentWeather = "clear", weatherEndAt = 0, weatherTriggered = new Set(), migrationTriggered = new Set(), lastFrameAt = 0, tripleBurnerPerfect = 0, currentPhase = "day", currentPhaseIndex = -1;
const rand = (a, b) => Math.random() * (b - a) + a;
const choice = (a) => a[Math.floor(Math.random() * a.length)];
const fmt = (s) => { const x = Math.max(0, Math.ceil(s)); return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`; };
const recipeEmoji = (r) => r.map(x => foods[x].emoji).join("");
const eq = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
const isBurning = () => Date.now() < burningActiveUntil, isFeeding = () => Date.now() < feedingActiveUntil, elapsed = () => running ? (Date.now() - startedAt) / 1000 : 0;
function weatherCookMult() { if (currentWeather === "rain")
    return selectedShrike === "great-grey" ? (isBurning() ? 1 : .90) : .80; if (currentWeather === "sun")
    return 1.10; if (currentWeather === "cold")
    return selectedShrike === "great-grey" ? (isBurning() ? 1 : .91) : selectedShrike === "grey-backed" ? (isBurning() ? 1 : .92) : .82; return 1; }
function altitudeCookMult() { const level = stage.altitude || 0; if (!level)
    return 1; if (selectedShrike === "grey-backed" && isBurning())
    return 1; const acclimatisation = stage.world === 4 ? Math.min(.60, Math.floor(perfectStreak / 3) * .20) : 0; const penalty = .05 * level * (selectedShrike === "grey-backed" ? .5 : 1) * (1 - acclimatisation); return 1 - penalty; }
function cookMult() { let up = (1 + save.upgrades.fire * .03) * weatherCookMult() * altitudeCookMult(); if (stage.world === 7)
    up *= .72 + .28 * (fireWarmth / 100); if (stage.world === 9)
    up *= 1 + heatLevel * .002; if (selectedShrike === "tiger")
    return up * (isBurning() ? 1.40 : 1.10); if (selectedShrike === "long-tailed")
    return up * .90 * (isBurning() ? 1.20 : 1); if (selectedShrike === "bull-headed")
    return up * (isBurning() ? 1.20 : 1); if (selectedShrike === "red-tailed")
    return up * (isBurning() ? 1.25 : 1); return up * (isBurning() ? 1.12 : 1); }
function overcookGrace() { return stage.world === 9 ? OVERCOOK_GRACE * (1 - .45 * heatLevel / 100) : OVERCOOK_GRACE; }
function deadlineMult() { let m = 1 + save.upgrades.perch * .04; if (selectedShrike === "chinese-grey")
    m *= 1.10; if (selectedShrike === "bull-headed" && isBurning())
    m *= 1.15; return m; }
function totalCook(r) { return r.reduce((s, id) => s + foods[id].cookSeconds, 0) / cookMult(); }
function baseScore(r) { return r.reduce((s, id) => s + foods[id].score, 0); }
function stageFoodPool() { return Object.keys(stage.foodAvailability).filter(id => phaseFoodAvailability(id) > 0); }
function phaseInfo() { const phases = stage.timePhases || []; let index = -1; for (let i = 0; i < phases.length; i++) {
    if (elapsed() >= phases[i].at)
        index = i;
} return { index, phase: index >= 0 ? phases[index] : null }; }
function weatherFoodMult(id) {
    if (stage.world !== 2)
        return 1;
    if (currentWeather === "rain") {
        if (id === "aquaticInsect")
            return 1.50;
        if (id === "frog")
            return 1.30;
        if (id === "fish")
            return 1.18;
        if (id === "grasshopper")
            return .72;
    }
    if (currentWeather === "wind") {
        if (id === "grasshopper")
            return 1.38;
        if (id === "beetle")
            return 1.20;
        if (id === "aquaticInsect")
            return 1.12;
    }
    if (currentWeather === "sun") {
        if (id === "grasshopper" || id === "lizard")
            return 1.28;
        if (id === "caterpillar")
            return 1.12;
        if (id === "aquaticInsect")
            return .82;
    }
    return 1;
}
function phaseFoodAvailability(id) { var _a, _b; const base = stage.foodAvailability[id] || 0; const phase = phaseInfo().phase; let mult = ((_b = (_a = phase === null || phase === void 0 ? void 0 : phase.foodModifier) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : 1) * weatherFoodMult(id); if (stage.world === 1 && isFeeding())
    mult *= 1.12; if (stage.world === 8 && isFeeding() && (id === "grasshopper" || id === "beetle" || id === "caterpillar"))
    mult *= 1.65; return base * mult; }
function currentGuestPool() { var _a; return ((_a = phaseInfo().phase) === null || _a === void 0 ? void 0 : _a.guestPool) || stage.guestPool; }
function phaseName(p) { return p === "night" ? "🌙 밤" : p === "dusk" ? "🌇 해질녘" : "☀️ 낮"; }
function syncTimePhase(force = false) { var _a; const info = phaseInfo(); const next = ((_a = info.phase) === null || _a === void 0 ? void 0 : _a.type) || "day"; if (force || info.index !== currentPhaseIndex) {
    currentPhaseIndex = info.index;
    currentPhase = next;
    gameScreen.classList.remove("phase-day", "phase-dusk", "phase-night");
    gameScreen.classList.add(`phase-${currentPhase}`);
    if (!force)
        showEvent(`${phaseName(currentPhase)} · GUEST POOL SHIFT`);
    renderFoodButtons();
} }
function subGoalComplete() { const g = stage.subGoal; if (!g)
    return false; if (g.kind === "perfect")
    return perfectCount >= g.target; if (g.kind === "combo")
    return bestCombo >= g.target; if (g.kind === "served")
    return served >= g.target; if (g.kind === "special")
    return specialServed >= g.target; if (g.kind === "noFailed")
    return failed === 0; if (g.kind === "nightServed")
    return nightServed >= g.target; return false; }
function recipeLength() { const p = Math.min(1, elapsed() / stage.duration), r = Math.random(), worldStage = (stage.id - 1) % 10 + 1; if (stage.maxRecipeLength <= 3)
    return p < .45 ? (r < .55 ? 1 : 2) : (r < .15 ? 1 : r < .70 ? 2 : 3); if (worldStage <= 3)
    return p < .45 ? (r < .28 ? 2 : 3) : (r < .18 ? 2 : r < .78 ? 3 : 4); if (worldStage <= 7)
    return p < .32 ? (r < .22 ? 2 : 3) : (r < .10 ? 2 : r < .58 ? 3 : 4); return p < .24 ? (r < .12 ? 2 : 3) : (r < .04 ? 2 : r < .42 ? 3 : 4); }
function dietWeight(g, id) { if (g.diet.primary.includes(id))
    return stage.world === 1 && isFeeding() ? 1.55 : 1; if (g.diet.secondary.includes(id))
    return .55; if (g.diet.rare.includes(id))
    return .18; if (g.diet.never.includes(id))
    return 0; return .08; }
function weightedFood(g) {
    const pool = stageFoodPool();
    const weighted = pool.map(id => ({ id, w: dietWeight(g, id) * phaseFoodAvailability(id) })).filter(x => x.w > 0);
    if (!weighted.length)
        return choice(pool);
    const total = weighted.reduce((sum, item) => sum + item.w, 0);
    let r = Math.random() * total;
    for (const item of weighted) {
        r -= item.w;
        if (r <= 0)
            return item.id;
    }
    return weighted[weighted.length - 1].id;
}
function guestEcologyFit(g) {
    const primary = g.diet.primary.reduce((sum, id) => sum + phaseFoodAvailability(id), 0);
    const secondary = g.diet.secondary.reduce((sum, id) => sum + phaseFoodAvailability(id), 0);
    const rare = g.diet.rare.reduce((sum, id) => sum + phaseFoodAvailability(id), 0);
    return .35 + primary * 1.35 + secondary * .48 + rare * .12;
}
function weightedGuest(pool) {
    const weighted = pool.map(id => ({ id, w: guestEcologyFit(guests[id]) }));
    const total = weighted.reduce((sum, item) => sum + item.w, 0);
    let r = Math.random() * total;
    for (const item of weighted) {
        r -= item.w;
        if (r <= 0)
            return item.id;
    }
    return weighted[weighted.length - 1].id;
}
function makeRecipe(g, special = false) {
    const len = special ? Math.min(4, Math.max(3, stage.maxRecipeLength)) : recipeLength();
    const recipe = [];
    const primaryAvailable = g.diet.primary.filter(id => phaseFoodAvailability(id) > 0);
    const specialist = g.diet.primary.length <= 1, focused = g.diet.primary.length === 2;
    for (let i = 0; i < len; i++) {
        let pick = weightedFood(g), tries = 0;
        const allowRepeat = specialist || (focused && Math.random() < .32) || (primaryAvailable.includes(pick) && Math.random() < .20);
        while (!allowRepeat && recipe.includes(pick) && tries++ < 5)
            pick = weightedFood(g);
        recipe.push(pick);
    }
    return recipe;
}
function isSignatureRecipe(g, recipe) { return recipe.length >= 2 && recipe.filter(id => g.diet.primary.includes(id)).length >= Math.ceil(recipe.length * .67); }
function baseEnvironmentLabel() { var _a; if (stage.world === 1)
    return isFeeding() ? "🌿 Feeding Time · 주 먹이 집중" : "🌾 농경지 생태"; if (stage.world === 2)
    return "🌦 날씨 생태"; if (stage.world === 3)
    return `${phaseName(currentPhase)} · ${currentPhase === "night" ? "+20%" : currentPhase === "dusk" ? "+10%" : "기본 점수"}`; if (stage.world === 4 && stage.altitude) {
    const step = Math.min(3, Math.floor(perfectStreak / 3));
    return `🏔️ 고도 ${stage.altitude} · 적응 ${step}/3`;
} if (stage.world === 5 && ((_a = stage.migrationWaves) === null || _a === void 0 ? void 0 : _a.length))
    return isFeeding() ? "🪽 MIGRATION WAVE · +15%" : "🪽 이동 파동 대기"; if (stage.world === 6)
    return `⭐ Favourite · ${stage.favoriteFood ? foods[stage.favoriteFood].emoji + foods[stage.favoriteFood].name : "-"}`; if (stage.world === 7)
    return `❄️ FIRE WARMTH · ${Math.round(fireWarmth)}%`; if (stage.world === 8)
    return isFeeding() ? "🐜 INSECT EMERGENCE · +20%" : "🦒 사바나 영업"; if (stage.world === 9)
    return `🔥 HEAT · ${Math.round(heatLevel)}%`; if (stage.world === 10)
    return isFeeding() ? "🌍 GRAND RUSH" : "🌴 GRAND TOUR"; return "☀️ 맑음"; }
function scheduleNext() { const wind = currentWeather === "wind" ? .72 : 1; nextOrderAt = Date.now() + rand(stage.spawnMin, stage.spawnMax) * (isFeeding() ? .46 : 1) * wind; }
function discoverBird(id) { if (devMode) {
    showEvent(`🛠 DEV GUEST · ${guests[id].name}`);
    return;
} if (save.discoveredBirds.includes(id))
    return; save.discoveredBirds.push(id); localStorage.setItem(SAVE_KEY, JSON.stringify(save)); showEvent(`✨ NEW BIRD · ${guests[id].name}`); renderMeta(); }
function spawnOrder(force = false) {
    const max = stage.maxOrders + save.upgrades.branch + (isFeeding() ? 1 : 0);
    if (!running || paused || (!force && orders.length >= max))
        return;
    const special = Math.random() < stage.specialChance;
    const guest = guests[weightedGuest(currentGuestPool())];
    const recipe = makeRecipe(guest, special);
    orders.push({ id: orderSequence++, guest, recipe, createdAt: Date.now(), deadlineSeconds: BASE_ORDER_DEADLINE * deadlineMult(), special, signature: isSignatureRecipe(guest, recipe) });
    discoverBird(guest.id);
    scheduleNext();
    renderOrders();
    renderSelected();
}
function baseBurnerCount() { return selectedShrike === "long-tailed" ? 5 : 3; }
function resetBurners() { burners = Array.from({ length: baseBurnerCount() }, (_, index) => ({ index, state: "empty", orderId: null, recipe: [], startedAt: 0, cookSeconds: 0, readyAt: 0 })); }
function syncBurners() { const wanted = baseBurnerCount() + (selectedShrike === "long-tailed" && isBurning() ? 2 : 0); while (burners.length < wanted) {
    const index = burners.length;
    burners.push({ index, state: "empty", orderId: null, recipe: [], startedAt: 0, cookSeconds: 0, readyAt: 0 });
} while (burners.length > wanted && burners[burners.length - 1].state === "empty")
    burners.pop(); burners.forEach((b, i) => b.index = i); }
async function preferMobileLandscape() {
    var _a;
    const coarse = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(pointer: coarse)").matches;
    if (!coarse || window.innerWidth > 1100)
        return;
    try {
        const root = document.documentElement;
        if (!document.fullscreenElement && root.requestFullscreen)
            await root.requestFullscreen();
    }
    catch { }
    try {
        const orientation = screen.orientation;
        if (orientation === null || orientation === void 0 ? void 0 : orientation.lock)
            await orientation.lock("landscape");
    }
    catch { }
}
function startGame() {
    closeAllDialogs();
    void preferMobileLandscape();
    document.body.classList.add("in-game");
    stage = stages[selectedStage];
    orders = [];
    selectedOrderId = null;
    currentSkewer = [];
    pendingSkewer = null;
    score = combo = bestCombo = served = perfectCount = failed = specialServed = tripleBurnerPerfect = perfectStreak = nightServed = 0;
    fireWarmth = 100;
    heatLevel = 0;
    burningGauge = 0;
    burningActiveUntil = burningStartedAt = feedingActiveUntil = 0;
    feedingTriggered = eventShown = false;
    currentWeather = "clear";
    weatherEndAt = 0;
    weatherTriggered.clear();
    migrationTriggered.clear();
    orderSequence = 1;
    currentPhase = "day";
    currentPhaseIndex = -1;
    chefReactionUntil = 0;
    chefVisualKey = "";
    paused = false;
    pauseButton.textContent = "⏸ 일시정지";
    resetBurners();
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    running = true;
    startedAt = Date.now();
    lastFrameAt = startedAt;
    gameEndAt = startedAt + stage.duration * 1000;
    nextOrderAt = startedAt + 600;
    currentStageLabel.textContent = `${stage.id}. ${stage.name}`;
    currentShrikeLabel.textContent = shrikeName(selectedShrike);
    setStatus(`${stage.habitat} 영업 시작!`);
    syncTimePhase(true);
    renderAll();
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(loop);
}
function togglePause() { if (!running)
    return; if (!paused) {
    paused = true;
    pausedAt = Date.now();
    pauseButton.textContent = "▶ 재개";
    setStatus("일시정지됨");
}
else {
    const delta = Date.now() - pausedAt;
    startedAt += delta;
    gameEndAt += delta;
    nextOrderAt += delta;
    burningActiveUntil += burningActiveUntil ? delta : 0;
    feedingActiveUntil += feedingActiveUntil ? delta : 0;
    weatherEndAt += weatherEndAt ? delta : 0;
    burningStartedAt += burningStartedAt ? delta : 0;
    orders.forEach(o => o.createdAt += delta);
    burners.forEach(b => { if (b.startedAt)
        b.startedAt += delta; if (b.readyAt)
        b.readyAt += delta; });
    paused = false;
    pauseButton.textContent = "⏸ 일시정지";
    setStatus("재개!");
} }
function loop() {
    if (!running)
        return;
    const now = Date.now();
    if (!paused) {
        const dt = Math.max(0, now - lastFrameAt);
        lastFrameAt = now;
        if (stage.world === 7)
            fireWarmth = Math.max(18, fireWarmth - dt / 1000 * (.38 + .16 * (stage.frost || 1)));
        if (stage.world === 9) {
            const active = burners.filter(b => b.state !== "empty").length;
            heatLevel = Math.max(0, Math.min(100, heatLevel + dt / 1000 * (active * 1.25 - 1.15)));
        }
        if (selectedShrike === "chinese-grey" && isBurning()) {
            const since = (now - burningStartedAt) / 1000, offset = since < 8 ? 1 : .5;
            orders.forEach(o => o.createdAt += dt * offset);
        }
        if (now >= weatherEndAt && currentWeather !== "clear") {
            currentWeather = "clear";
            weatherLabel.textContent = baseEnvironmentLabel();
            gameScreen.classList.remove("weather-rain", "weather-wind", "weather-sun", "weather-cold");
        }
        (stage.weather || []).forEach((w, i) => { if (!weatherTriggered.has(i) && elapsed() >= w.at) {
            weatherTriggered.add(i);
            currentWeather = w.type;
            weatherEndAt = now + w.duration * 1000;
            gameScreen.classList.remove("weather-rain", "weather-wind", "weather-sun", "weather-cold");
            gameScreen.classList.add(`weather-${w.type}`);
            weatherLabel.textContent = w.type === "rain" ? "🌧 비 · 조리 -20%" : w.type === "wind" ? "💨 바람 · 손님 유입 증가" : w.type === "cold" ? "❄️ 한기 · 조리 -18%" : "☀️ 햇빛 · 조리 +10%";
            showEvent(weatherLabel.textContent || "WEATHER");
        } });
        syncBurners();
        syncTimePhase();
        if (now >= gameEndAt) {
            finishStage();
            return;
        }
        if (now >= nextOrderAt)
            spawnOrder();
        (stage.migrationWaves || []).forEach((at, i) => { var _a; if (!migrationTriggered.has(i) && elapsed() >= at) {
            migrationTriggered.add(i);
            feedingActiveUntil = now + 26000;
            showEvent(`🪽 MIGRATION WAVE ${i + 1}/${((_a = stage.migrationWaves) === null || _a === void 0 ? void 0 : _a.length) || 1}`);
            scheduleNext();
        } });
        if (stage.feedingTimeAt !== null && !feedingTriggered && elapsed() >= stage.feedingTimeAt) {
            feedingTriggered = true;
            feedingActiveUntil = now + stage.feedingDuration * 1000;
            showEvent(`🌿 ${stage.event || "FEEDING TIME"}!`);
            scheduleNext();
        }
        if (stage.event && !eventShown && elapsed() > stage.duration * .28 && stage.id !== 10) {
            eventShown = true;
            showEvent(stage.event);
        }
        orders.slice().forEach(o => { if ((now - o.createdAt) / 1000 > o.deadlineSeconds)
            expireOrder(o.id); });
        burners.forEach(b => { if (b.state === "cooking" && now >= b.readyAt)
            b.state = "ready"; if (b.state === "ready" && now >= b.readyAt + overcookGrace() * 1000)
            b.state = "overcooked"; });
        if (stage.world === 7)
            weatherLabel.textContent = `${currentWeather === "cold" ? "❄️" : "🔥"} FIRE WARMTH · ${Math.round(fireWarmth)}%`;
        else if (stage.world === 9)
            weatherLabel.textContent = `${currentWeather === "sun" ? "☀️" : "🔥"} HEAT · ${Math.round(heatLevel)}%`;
        else if (currentWeather === "clear")
            weatherLabel.textContent = baseEnvironmentLabel();
        renderOrders();
        renderBurners();
        updateHud();
        renderChefVisual();
        timeLabel.textContent = fmt((gameEndAt - now) / 1000);
    }
    else {
        lastFrameAt = now;
    }
    animationFrame = requestAnimationFrame(loop);
}
function finishStage() {
    running = false;
    cancelAnimationFrame(animationFrame);
    const stars = score >= stage.starScores[1] ? 3 : score >= stage.starScores[0] ? 2 : score > 0 ? 1 : 0;
    const subDone = subGoalComplete();
    const growthMult = selectedShrike === "northern" ? 1.10 : 1;
    const xpGain = Math.round((score * .10 + perfectCount * 8 + specialServed * 20 + stars * 50 + (subDone ? 75 : 0)) * growthMult);
    const prevBest = save.bestScores[String(stage.id)] || 0, prevCombo = save.bestCombos[String(stage.id)] || 0, prevStars = save.bestStars[String(stage.id)] || 0;
    const unlocked = [];
    if (!devMode) {
        save.xp += xpGain;
        save.stats.plays++;
        save.stats.served += served;
        save.stats.perfect += perfectCount;
        save.stats.failed += failed;
        save.bestScores[String(stage.id)] = Math.max(prevBest, score);
        save.bestStars[String(stage.id)] = Math.max(prevStars, stars);
        save.bestCombos[String(stage.id)] = Math.max(prevCombo, bestCombo);
        if (stage.id < 100 && stars > 0)
            save.unlockedStage = Math.max(save.unlockedStage, (stage.id + 1));
        if (stage.subGoal && subDone)
            save.bestSubGoals[String(stage.id)] = true;
        if (stage.id >= 3 && stars >= 2 && !save.unlockedShrikes.includes("tiger")) {
            save.unlockedShrikes.push("tiger");
            unlocked.push("🐅 칡때까치 해금!");
        }
        if ((save.bestCombos["6"] || 0) >= 12 && !save.unlockedShrikes.includes("brown")) {
            save.unlockedShrikes.push("brown");
            unlocked.push("🟤 노랑때까치 해금!");
        }
        if (stage.id >= 15 && stars >= 2 && !save.unlockedShrikes.includes("chinese-grey")) {
            save.unlockedShrikes.push("chinese-grey");
            unlocked.push("🩶 물때까치 해금! · 주문 제한시간 +10%");
        }
        if (stage.id >= 18 && tripleBurnerPerfect >= 3 && !save.unlockedShrikes.includes("long-tailed")) {
            save.unlockedShrikes.push("long-tailed");
            unlocked.push("🐦 긴꼬리때까치 해금! · 화구 +2");
        }
        if (stage.id === 30 && stars >= 2 && !save.unlockedShrikes.includes("northern")) {
            save.unlockedShrikes.push("northern");
            unlocked.push("🩶 재때까치 해금! · XP +10%");
        }
        if (stage.id === 40 && stars >= 2 && !save.unlockedShrikes.includes("grey-backed")) {
            save.unlockedShrikes.push("grey-backed");
            unlocked.push("🏔️ 회색등때까치 해금! · 고산/한기 페널티 완화");
        }
        if (stage.id >= 44 && stars >= 2 && !save.unlockedShrikes.includes("isabelline")) {
            save.unlockedShrikes.push("isabelline");
            unlocked.push("🏜️ 사막때까치 해금! · Migration Wave 점수 +20%");
        }
        if (stage.id === 50 && stars >= 2 && !save.unlockedShrikes.includes("red-tailed")) {
            save.unlockedShrikes.push("red-tailed");
            unlocked.push("🪽 붉은꼬리때까치 해금! · Rush 특화");
        }
        if (stage.id === 60 && stars >= 2 && !save.unlockedShrikes.includes("great-grey")) {
            save.unlockedShrikes.push("great-grey");
            unlocked.push("🩶 초원때까치 해금! · 날씨 페널티 완화");
        }
        persist();
    }
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    const canAdvance = stage.id < 100 && (devMode || (stars > 0 && save.unlockedStage >= stage.id + 1));
    nextStageButton.classList.toggle("hidden", !canAdvance);
    $("resultStage").textContent = `Stage ${stage.id} · ${stage.name}`;
    $("resultStars").textContent = `${"★".repeat(stars)}${"☆".repeat(3 - stars)}`;
    $("resultScore").textContent = score.toLocaleString();
    $("resultServed").textContent = String(served);
    $("resultPerfect").textContent = String(perfectCount);
    $("resultCombo").textContent = `×${bestCombo}`;
    $("resultFailed").textContent = String(failed);
    $("resultXp").textContent = devMode ? `TEST +${xpGain}` : `+${xpGain}`;
    resultTotalXp.textContent = save.xp.toLocaleString();
    const records = [];
    if (!devMode) {
        if (score > prevBest)
            records.push(`🏆 최고점수 ${score.toLocaleString()}`);
        if (bestCombo > prevCombo)
            records.push(`🔥 최고 Combo ×${bestCombo}`);
        if (stars > prevStars)
            records.push(`⭐ 최고 별점 ${stars}`);
    }
    recordNotice.textContent = devMode ? "🛠 DEV MODE · 이 결과는 일반 진행도에 저장되지 않습니다." : records.length ? `NEW RECORD · ${records.join(" · ")}` : "";
    $("unlockNotice").textContent = devMode ? `전체 콘텐츠 테스트 활성 · Stage ${stage.id}/100 · ${shrikeName(selectedShrike)}` : [...(unlocked), ...(stage.subGoal ? [subDone ? `🎯 서브 목표 달성 · ${stage.subGoal.label} (+75 XP)` : `🎯 서브 목표 미달성 · ${stage.subGoal.label}`] : [])].join(" · ") || `Bird Book ${save.discoveredBirds.length}/${Object.keys(guests).length} · 진행도 저장 완료`;
}
function expireOrder(id) { const o = orders.find(x => x.id === id); if (!o)
    return; orders = orders.filter(x => x.id !== id); failed++; combo = 0; perfectStreak = 0; if (selectedOrderId === id)
    selectedOrderId = null; if ((pendingSkewer === null || pendingSkewer === void 0 ? void 0 : pendingSkewer.orderId) === id)
    pendingSkewer = null; judge("TOO LATE", false); renderSelected(); }
function selectOrder(id) { if (paused)
    return; selectedOrderId = selectedOrderId === id ? null : id; renderSelected(); renderOrders(); setStatus(selectedOrderId === id ? "우선 주문으로 지정했습니다. 꼬치 완성 시 먼저 매칭합니다." : "우선 주문 지정을 해제했습니다."); }
function addFood(id) { if (paused)
    return; if (currentSkewer.length >= 4)
    return; currentSkewer.push(id); renderSkewer(); }
function finishSkewer() {
    if (paused)
        return;
    if (!currentSkewer.length) {
        setStatus("재료를 먼저 꽂으세요.");
        return;
    }
    const preferred = selectedOrderId ? orders.find(o => o.id === selectedOrderId && eq(currentSkewer, o.recipe)) : undefined;
    const order = preferred || orders.filter(o => eq(currentSkewer, o.recipe)).sort((a, b) => a.createdAt - b.createdAt)[0];
    if (!order) {
        setStatus("일치하는 주문이 없습니다. 꼬치를 확인하거나 비우고 다시 조립하세요.");
        judge("NO MATCH", false);
        return;
    }
    pendingSkewer = { orderId: order.id, recipe: [...currentSkewer] };
    selectedOrderId = order.id;
    currentSkewer = [];
    renderSkewer();
    renderSelected();
    renderOrders();
    setStatus(`${order.guest.name} 주문과 자동 매칭! 빈 화구를 클릭하세요.`);
}
function clickBurner(index) { if (paused)
    return; const b = burners[index]; if (b.state === "empty") {
    if (!pendingSkewer) {
        setStatus("먼저 꼬치를 완성하세요.");
        return;
    }
    b.state = "cooking";
    b.orderId = pendingSkewer.orderId;
    b.recipe = pendingSkewer.recipe;
    b.startedAt = Date.now();
    b.cookSeconds = totalCook(b.recipe);
    b.readyAt = b.startedAt + b.cookSeconds * 1000;
    pendingSkewer = null;
    setStatus("🔥 굽기 시작!");
    renderBurners();
    return;
} if (b.state === "cooking") {
    setStatus("아직 덜 익었습니다.");
    return;
} serveBurner(b); }
function serveBurner(b) {
    const order = orders.find(o => o.id === b.orderId);
    if (!order) {
        resetBurner(b);
        return;
    }
    const perfect = b.state === "ready", specialMult = order.special ? 2 : 1, comboMult = 1 + Math.min(combo, 20) * .03;
    let pts = Math.round(baseScore(order.recipe) * 10 * specialMult * comboMult);
    if (order.signature)
        pts = Math.round(pts * 1.10);
    if ((stage.world === 6 || stage.world === 10) && stage.favoriteFood && order.recipe.includes(stage.favoriteFood))
        pts = Math.round(pts * 1.20);
    if (stage.world === 8 && isFeeding())
        pts = Math.round(pts * 1.20);
    if (stage.world === 10 && isFeeding())
        pts = Math.round(pts * 1.10);
    if (stage.world === 3 && currentPhase === "dusk")
        pts = Math.round(pts * 1.10);
    if (stage.world === 3 && currentPhase === "night")
        pts = Math.round(pts * 1.20);
    if (stage.world === 10 && currentPhase === "dusk")
        pts = Math.round(pts * 1.05);
    if (stage.world === 10 && currentPhase === "night")
        pts = Math.round(pts * 1.10);
    if (stage.world === 5 && isFeeding())
        pts = Math.round(pts * 1.15);
    if (!perfect)
        pts = Math.round(pts * .55);
    if (selectedShrike === "brown")
        pts = Math.round(pts * (1 + Math.min(.15, combo * .015)));
    if (selectedShrike === "isabelline" && isFeeding())
        pts = Math.round(pts * (isBurning() ? 1.40 : 1.20));
    if (selectedShrike === "red-tailed" && isFeeding())
        pts = Math.round(pts * 1.15);
    score += pts;
    served++;
    if (currentPhase === "night")
        nightServed++;
    if (order.special)
        specialServed++;
    if (perfect) {
        chefReactionUntil = Date.now() + 1100;
        if (burners.filter(x => x.state !== "empty").length >= 3)
            tripleBurnerPerfect++;
        combo++;
        perfectCount++;
        perfectStreak++;
        burningGauge = Math.min(100, burningGauge + 14 + (order.special ? 8 : 0) + ((stage.world === 5 || stage.world === 10) && isFeeding() ? 4 : 0));
        if (stage.world === 7)
            fireWarmth = Math.min(100, fireWarmth + 18);
        if (perfectStreak % 3 === 0) {
            score += 30;
            burningGauge = Math.min(100, burningGauge + 8);
            judge(`PERFECT STREAK ×${perfectStreak} · +30`, true);
        }
        else
            judge(order.special ? `SPECIAL PERFECT +${pts}` : `PERFECT +${pts}`, true);
    }
    else {
        combo = 0;
        perfectStreak = 0;
        failed++;
        judge(`OVERCOOKED +${pts}`, false);
    }
    bestCombo = Math.max(bestCombo, combo);
    orders = orders.filter(o => o.id !== order.id);
    if (selectedOrderId === order.id)
        selectedOrderId = null;
    resetBurner(b);
    renderSelected();
    setStatus(perfect ? "깔끔한 서빙!" : "조금 탔지만 서빙했습니다.");
}
function resetBurner(b) { b.state = "empty"; b.orderId = null; b.recipe = []; b.startedAt = b.cookSeconds = b.readyAt = 0; }
function activateBurning() { if (paused || burningGauge < 100 || isBurning())
    return; const now = Date.now(); burningGauge = 0; if (stage.world === 7)
    fireWarmth = 100; if (stage.world === 9)
    heatLevel = Math.max(0, heatLevel - 45); burningStartedAt = now; burningActiveUntil = now + 15000; syncBurners(); showEvent(`🔥 ${shrikeName(selectedShrike)} BURNING!`); setStatus(selectedShrike === "tiger" ? "조리속도 +40%!" : selectedShrike === "brown" ? "콤보 점수 가속!" : selectedShrike === "chinese-grey" ? "8초 주문 타이머 정지 → 7초 절반 속도!" : selectedShrike === "long-tailed" ? "임시 화구 +2 · 조리 +20%!" : selectedShrike === "grey-backed" ? "고도·한기 페널티 무효화!" : selectedShrike === "isabelline" ? "Migration Wave 점수 +40%!" : selectedShrike === "red-tailed" ? "Rush 조리속도 +25%!" : selectedShrike === "great-grey" ? "환경 페널티 완화 강화!" : "균형 강화!"); }
function renderAll() { renderMeta(); renderFoodButtons(); renderSkewer(); renderOrders(); renderBurners(); renderSelected(); updateHud(); renderChefVisual(true); }
let startFlowStep = "world", startWorldChosen = false, startStageChosen = false, startChefChosen = false;
function worldFlowName(world) { const names = ["", "🌾 WORLD 1 · 농경지", "🌿 WORLD 2 · 강을 따라서", "⛰️ WORLD 3 · 산과 밤", "🏔️ WORLD 4 · 히말라야", "🪽 WORLD 5 · 대초원", "🌻 WORLD 6 · 유럽·지중해", "❄️ WORLD 7 · 북미", "🦒 WORLD 8 · 동아프리카", "☀️ WORLD 9 · 남아프리카", "🌴 WORLD 10 · 아프리카 섬"]; return names[world]; }
function setStartFlow(step) {
    startFlowStep = step;
    worldStep.classList.toggle("hidden", step !== "world");
    stageStep.classList.toggle("hidden", step !== "stage");
    chefStep.classList.toggle("hidden", step !== "chef");
    readyStep.classList.toggle("hidden", step !== "ready");
    const order = [["world", flowDotWorld], ["stage", flowDotStage], ["chef", flowDotChef], ["ready", flowDotReady]];
    const ix = order.findIndex(([s]) => s === step);
    order.forEach(([s, el], i) => { el.classList.toggle("active", i === ix); el.classList.toggle("done", i < ix); });
    startScreen.scrollTop = 0;
}
function resetStartFlow() { startWorldChosen = startStageChosen = startChefChosen = false; renderStages(); renderShrikes(); setStartFlow("world"); }
function chooseWorldForFlow(world) {
    const first = (world - 1) * 10 + 1;
    if (!devMode && save.unlockedStage < first)
        return;
    selectedWorld = world;
    startWorldChosen = true;
    startStageChosen = false;
    startChefChosen = false;
    const last = first + 9;
    selectedStage = (devMode ? first : Math.max(first, Math.min(last, save.unlockedStage)));
    selectedWorldFlowTitle.textContent = worldFlowName(world);
    renderStages();
    setStartFlow("stage");
}
function updateReadySummary() { const c = stages[selectedStage]; startChoiceSummary.innerHTML = `<span class="ready-kicker">${worldFlowName(selectedWorld)}</span><strong>${c.icon} Stage ${c.id} · ${c.name}</strong><span>${c.habitat}</span><span>🐦 Chef · ${shrikeName(selectedShrike)}</span>${c.subGoal ? `<span>🎯 ${c.subGoal.label}</span>` : ""}`; startButton.textContent = `${c.icon} Stage ${c.id} 시작하기`; }
function renderMeta() { const totalStars = Object.values(save.bestStars).reduce((a, b) => a + b, 0); saveSummary.innerHTML = `<div class="career-grid"><div><span>누적 XP</span><strong>${save.xp.toLocaleString()}</strong></div><div><span>총 플레이</span><strong>${save.stats.plays}</strong></div><div><span>누적 서빙</span><strong>${save.stats.served}</strong></div><div><span>PERFECT</span><strong>${save.stats.perfect}</strong></div></div><p>${devMode ? "🛠 DEV MODE · World 1–10 / Stage 1–100 / Shrike 10종 전체 테스트 가능 · 진행도 미저장" : "Stage " + save.unlockedStage + "/100 · Shrikes " + save.unlockedShrikes.length + "/10 · Bird Book " + save.discoveredBirds.length + "/" + Object.keys(guests).length + " · Stars " + totalStars + "/300"}</p>`; totalXpHeader.textContent = `${save.xp.toLocaleString()} XP`; careerStatsHeader.textContent = devMode ? "DEV SESSION · 일반 세이브 보호" : `${save.stats.plays}회 플레이 · ${save.stats.served}명 서빙`; xpHudLabel.textContent = save.xp.toLocaleString(); renderStages(); renderShrikes(); renderUpgrades(); renderStageEcology(); }
function renderStages() { var _a, _b, _c; stageButtonsEl.innerHTML = ""; const worldButtons = [world1Button, world2Button, world3Button, world4Button, world5Button, world6Button, world7Button, world8Button, world9Button, world10Button]; worldButtons.forEach((btn, i) => { const w = i + 1; btn.classList.toggle("selected", startWorldChosen && selectedWorld === w); btn.disabled = !devMode && save.unlockedStage < (w - 1) * 10 + 1; }); const start = (selectedWorld - 1) * 10 + 1, end = start + 9; for (let i = start; i <= end; i++) {
    const id = i, c = stages[id], btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stage-card" + (startStageChosen && selectedStage === id ? " selected" : "");
    btn.disabled = !devMode && id > save.unlockedStage;
    btn.dataset.stageId = String(id);
    const stars = save.bestStars[String(id)] || 0, bc = save.bestCombos[String(id)] || 0, bs = save.bestScores[String(id)] || 0;
    btn.innerHTML = `<span class="stage-icon">${c.icon}</span><b>${id}. ${c.name}</b><small>${c.habitat}</small><span class="stage-stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</span><small class="stage-record">Best ${bs.toLocaleString()} · Combo ×${bc}</small><small>손님 ${c.guestPool.length}종${((_a = c.weather) === null || _a === void 0 ? void 0 : _a.length) ? " · 🌦 날씨" : ""}${((_b = c.timePhases) === null || _b === void 0 ? void 0 : _b.length) ? " · 🌓 시간대" : ""}${c.altitude ? ` · 🏔️ 고도 ${c.altitude}` : ""}${((_c = c.migrationWaves) === null || _c === void 0 ? void 0 : _c.length) ? ` · 🪽 이동 ${c.migrationWaves.length}파` : ""}${c.favoriteFood ? ` · ⭐ ${foods[c.favoriteFood].name}` : ""}${c.frost ? ` · ❄️ Frost ${c.frost}` : ""}${c.heat ? ` · 🔥 Heat ${c.heat}` : ""}</small>${c.subGoal ? `<small class="stage-goal">🎯 ${c.subGoal.label}${save.bestSubGoals[String(id)] ? " · ✓" : ""}</small>` : ""}${devMode ? `<small class="dev-badge">DEV · UNLOCKED</small>` : ""}`;
    btn.addEventListener("click", () => { selectedStage = id; startStageChosen = true; startChefChosen = false; renderStageEcology(); selectedStageFlowTitle.textContent = `${c.icon} Stage ${c.id} · ${c.name}`; renderShrikes(); setStartFlow("chef"); });
    stageButtonsEl.appendChild(btn);
} }
function renderStageEcology() { var _a; const c = stages[selectedStage]; const focusFoods = stageFoodEntries(c).slice(0, 3).map(([id, v]) => `${foods[id].emoji}${foods[id].name} ${Math.round(v * 100)}%`).join(" · "); const otherFoods = stageFoodEntries(c).slice(3, 6).map(([id, v]) => `${foods[id].emoji}${foods[id].name} ${Math.round(v * 100)}%`).join(" · "); const coreIds = coreGuests(c), core = coreIds.map(id => guests[id].name).join(" · "); const others = c.guestPool.filter(id => !coreIds.includes(id)).slice(0, 4).map(id => guests[id].name).join(" · "); const wx = (c.weather || []).map(w => `${w.type === "rain" ? "🌧 비" : w.type === "wind" ? "💨 바람" : w.type === "cold" ? "❄️ 한기" : "☀️ 햇빛"} ${w.duration}s`).join(" · ") || "고정 날씨"; const phases = (c.timePhases || []).map(p => `${phaseName(p.type)} ${p.at}s`).join(" → ") || "☀️ 낮"; const migration = ((_a = c.migrationWaves) === null || _a === void 0 ? void 0 : _a.length) ? `🪽 Migration Wave · ${c.migrationWaves.map(x => x + "s").join(" · ")}` : ""; stageEcology.innerHTML = `<div><span class="eco-label">${c.icon} HABITAT</span><b>${c.habitat}</b><p>World ${c.world}</p><p><b>${worldRuleDescription(c.world)}</b></p></div><div><span class="eco-label">🎯 ORDER FOCUS</span><p><b>${focusFoods}</b></p>${otherFoods ? `<p>${otherFoods}</p>` : ""}</div><div><span class="eco-label">🐦 CORE GUESTS</span><p><b>${core}</b></p>${others ? `<p>${others}${c.guestPool.length > 7 ? " 외" : ""}</p>` : ""}</div><div><span class="eco-label">🌓 TIME / WEATHER</span><p>${phases}</p><p>${c.altitude ? `🏔️ 고도 단계 ${c.altitude} · 기본 조리속도 -${c.altitude * 5}%` : wx}</p><p>${c.altitude ? wx : migration}</p>${c.favoriteFood ? `<p>⭐ Favourite · ${foods[c.favoriteFood].emoji}${foods[c.favoriteFood].name}</p>` : ""}${c.frost ? `<p>❄️ Frost 단계 ${c.frost}</p>` : ""}${c.heat ? `<p>🔥 Heat 단계 ${c.heat}</p>` : ""}${c.subGoal ? `<p><b>🎯 ${c.subGoal.label}</b></p>` : ""}</div>`; }
function stageFoodEntries(c) { return Object.entries(c.foodAvailability).sort((a, b) => b[1] - a[1]); }
function stageGuestFit(c, id) { const g = guests[id], availability = (food) => c.foodAvailability[food] || 0; return .35 + g.diet.primary.reduce((sum, food) => sum + availability(food), 0) * 1.35 + g.diet.secondary.reduce((sum, food) => sum + availability(food), 0) * .48 + g.diet.rare.reduce((sum, food) => sum + availability(food), 0) * .12; }
function coreGuests(c) { return [...c.guestPool].sort((a, b) => stageGuestFit(c, b) - stageGuestFit(c, a)).slice(0, 3); }
function renderShrikes() { const defs = [{ id: "bull-headed", emoji: "🐦", name: "때까치", desc: "균형형 · Burning 시 전반 강화", unlock: "기본" }, { id: "tiger", emoji: "🐅", name: "칡때까치", desc: "조리속도 +10%", unlock: "Stage 3 이상에서 ★★ 달성" }, { id: "brown", emoji: "🟤", name: "노랑때까치", desc: "Combo가 높을수록 점수 증가", unlock: "Stage 6에서 Best Combo ×12" }, { id: "chinese-grey", emoji: "🩶", name: "물때까치", desc: "주문 제한시간 +10% · 시간 제어 Burning", unlock: "Stage 15 ★★" }, { id: "long-tailed", emoji: "🐦", name: "긴꼬리때까치", desc: "화구 +2 · 조리속도 -10%", unlock: "Stage 18+에서 3화구 동시 PERFECT 3회" }, { id: "northern", emoji: "🩶", name: "재때까치", desc: "성장형 · 획득 XP +10%", unlock: "Stage 30 ★★" }, { id: "grey-backed", emoji: "🏔️", name: "회색등때까치", desc: "고산형 · 고도 페널티 50% 완화", unlock: "Stage 40 ★★" }, { id: "isabelline", emoji: "🏜️", name: "사막때까치", desc: "Migration Wave 중 점수 +20%", unlock: "Stage 44 ★★" }, { id: "red-tailed", emoji: "🪽", name: "붉은꼬리때까치", desc: "Rush 특화 · Burning 조리 +25%", unlock: "Stage 50 ★★" }, { id: "great-grey", emoji: "🩶", name: "초원때까치", desc: "환경형 · 비·한기 조리 페널티 50% 완화", unlock: "Stage 60 ★★" }]; shrikeButtonsEl.innerHTML = ""; defs.forEach(d => { const btn = document.createElement("button"); btn.type = "button"; btn.className = "select-card shrike-select-card" + (startChefChosen && selectedShrike === d.id ? " selected" : ""); btn.dataset.shrikeId = d.id; btn.disabled = !devMode && !save.unlockedShrikes.includes(d.id); const meta = shrikeVisualMeta(d.id); btn.innerHTML = `<div class="shrike-select-portrait">${shrikePortraitSvg(d.id, "idle", false)}</div><div class="shrike-select-copy"><b>${d.name}</b><small class="shrike-select-en">${meta.en} · ${meta.role}</small><span>${d.desc}</span><small>${devMode ? `DEV · ${d.unlock}` : btn.disabled ? `LOCKED · ${d.unlock}` : "사용 가능"}</small></div>`; btn.addEventListener("click", () => { selectedShrike = d.id; startChefChosen = true; renderShrikes(); updateReadySummary(); setStartFlow("ready"); }); shrikeButtonsEl.appendChild(btn); }); }
function upgradeCost(id) { return 250 + save.upgrades[id] * 250; }
function renderUpgrades() { const defs = [{ id: "branch", name: "🌿 나뭇가지", desc: "동시 주문 +1 / Lv", max: 2 }, { id: "fire", name: "🔥 좋은 장작", desc: "조리속도 +3% / Lv", max: 5 }, { id: "perch", name: "🪺 편안한 횃대", desc: "주문 대기시간 +4% / Lv", max: 5 }]; upgradeList.innerHTML = ""; defs.forEach(d => { const lv = save.upgrades[d.id], cost = upgradeCost(d.id), card = document.createElement("div"); card.className = "upgrade-card"; card.innerHTML = `<div><b>${d.name} · Lv.${lv}/${d.max}</b><small>${d.desc}</small></div>`; const btn = document.createElement("button"); btn.className = "primary-button"; btn.textContent = lv >= d.max ? "MAX" : `${cost} XP`; btn.disabled = devMode || lv >= d.max || save.xp < cost; if (devMode)
    btn.textContent = "DEV · SAVE LOCK"; btn.onclick = () => { if (devMode)
    return; if (save.xp >= cost && lv < d.max) {
    save.xp -= cost;
    save.upgrades[d.id]++;
    persist();
    renderUpgrades();
} }; card.appendChild(btn); upgradeList.appendChild(card); }); }
function renderFoodButtons() { foodButtonsEl.innerHTML = ""; stageFoodPool().forEach(id => { const f = foods[id], btn = document.createElement("button"); btn.className = "food-button"; btn.innerHTML = `<span class="food-emoji">${f.emoji}</span>${f.name}<small>${f.cookSeconds}s</small>`; btn.dataset.foodId = id; foodButtonsEl.appendChild(btn); }); foodButtonsEl.style.gridTemplateColumns = `repeat(${Math.min(5, Math.max(3, stageFoodPool().length))},1fr)`; }
function renderSkewer() { skewerEl.innerHTML = currentSkewer.length ? currentSkewer.map(id => `<span class="skewer-item">${foods[id].emoji}</span>`).join("") : `<span class="empty-skewer">재료를 순서대로 꽂으세요</span>`; }
function renderSelected() { const o = orders.find(x => x.id === selectedOrderId); selectedOrderSummary.innerHTML = o ? `🎯 우선 매칭 · <b>${o.guest.name}</b> · <span class="recipe-inline">${recipeEmoji(o.recipe)}</span>${o.special ? " · ⭐ SPECIAL" : ""}${o.signature ? " · 🌿 SIGNATURE" : ""}` : "✨ AUTO MATCH · 주문 선택 없이 조립 가능"; }
function renderOrders() { const now = Date.now(); ordersEl.innerHTML = ""; orders.forEach(o => { const left = o.deadlineSeconds - (now - o.createdAt) / 1000, p = Math.max(0, Math.min(100, left / o.deadlineSeconds * 100)), btn = document.createElement("button"), hasKorean = /[가-힣]/.test(o.guest.name), koreanName = hasKorean ? `<strong class="name primary-name">${o.guest.name}</strong>` : ""; btn.className = `order-card${selectedOrderId === o.id ? " selected" : ""}${left < 10 ? " urgent" : ""}${o.special ? " special" : ""}${o.signature ? " signature" : ""}`; btn.innerHTML = `${o.special ? '<span class="special-badge">SPECIAL ×2</span>' : ""}${o.signature ? '<span class="signature-badge">SIGNATURE +10%</span>' : ""}<div class="guest-order-portrait">${guestPortraitSvg(o.guest, true)}</div>${koreanName}${hasKorean ? `<div class="bird-en">${o.guest.englishName}</div>` : `<strong class="bird-en primary-name">${o.guest.englishName}</strong>`}<i class="bird-scientific">${o.guest.scientificName}</i><div class="recipe">${recipeEmoji(o.recipe)}</div><div class="timer"><span>남은 시간</span><strong>${Math.max(0, left).toFixed(1)}s</strong></div><div class="order-progress" style="width:${p}%"></div>`; btn.dataset.orderId = String(o.id); ordersEl.appendChild(btn); }); if (!orders.length)
    ordersEl.innerHTML = '<div class="hint">다음 손님을 기다리는 중...</div>'; renderGuestPerch(); }
function renderBurners() { const now = Date.now(); burnersEl.innerHTML = ""; burners.forEach(b => { const btn = document.createElement("button"); btn.className = `burner ${b.state}`; let state = "빈 화구", pct = 0; if (b.state === "cooking") {
    const e = (now - b.startedAt) / 1000;
    pct = Math.min(100, e / b.cookSeconds * 100);
    state = `조리 중 ${Math.max(0, b.cookSeconds - e).toFixed(1)}s`;
} if (b.state === "ready") {
    pct = 100;
    state = "READY · 클릭해서 서빙";
} if (b.state === "overcooked") {
    pct = 100;
    state = "OVERCOOKED · 지금 서빙";
} btn.innerHTML = `<span class="flame">🔥</span><div class="burner-title">화구 ${b.index + 1}</div><div class="burner-recipe">${b.recipe.length ? recipeEmoji(b.recipe) : "EMPTY"}</div><div class="burner-state">${state}</div><div class="cook-bar"><div class="cook-fill" style="width:${pct}%"></div></div>`; btn.dataset.burnerIndex = String(b.index); burnersEl.appendChild(btn); }); }
function renderBirdBook() { birdBookList.innerHTML = ""; Object.keys(guests).forEach(id => { const g = guests[id], seen = devMode || save.discoveredBirds.includes(id), card = document.createElement("article"); card.className = "bird-card" + (seen ? "" : " locked"); if (!seen) {
    card.innerHTML = `<div class="bird-card-emoji">❔</div><div><b>미발견 조류</b><small>새로운 월드와 스테이지에서 만나보세요.</small></div>`;
}
else {
    const primary = g.diet.primary.map(x => foods[x].emoji + foods[x].name).join(" · "), secondary = g.diet.secondary.slice(0, 3).map(x => foods[x].emoji + foods[x].name).join(" · ");
    card.innerHTML = `<div class="bird-card-emoji bird-card-portrait">${guestPortraitSvg(g)}</div><div><b>${g.name} <span>${g.englishName}</span></b><i>${g.scientificName}</i><p>${g.note}</p><small>주요 먹이 · ${primary}</small>${secondary ? `<small>보조 먹이 · ${secondary}</small>` : ""}</div>`;
} birdBookList.appendChild(card); }); }
function renderShrikeDex() { const defs = [{ id: "bull-headed", emoji: "🐦", ko: "때까치", en: "Bull-headed Shrike", role: "⚖️ Balance", passive: "기본 능력 없음", burn: "15초간 조립·조리·대기시간을 균형 강화", unlock: "기본 캐릭터" }, { id: "tiger", emoji: "🐅", ko: "칡때까치", en: "Tiger Shrike", role: "🔥 Cooking", passive: "조리속도 +10%", burn: "15초간 조리속도 +40%", unlock: "Stage 3 이상 ★★" }, { id: "brown", emoji: "🟤", ko: "노랑때까치", en: "Brown Shrike", role: "⚡ Combo", passive: "Combo가 높을수록 점수 증가", burn: "Burning 중 콤보 기반 보너스 강화", unlock: "Stage 6 Best Combo ×12" }, { id: "chinese-grey", emoji: "🩶", ko: "물때까치", en: "Chinese Grey Shrike", role: "⏱ Control", passive: "주문 제한시간 +10%", burn: "8초 주문 타이머 정지 + 7초 50% 감속", unlock: "Stage 15 ★★" }, { id: "long-tailed", emoji: "🐦", ko: "긴꼬리때까치", en: "Long-tailed Shrike", role: "🍢 Capacity", passive: "화구 +2, 조리속도 -10%", burn: "15초간 임시 화구 +2 + 조리속도 +20%", unlock: "Stage 18+ 3화구 동시 PERFECT 3회" }, { id: "northern", emoji: "🩶", ko: "재때까치", en: "Northern Shrike", role: "📈 Growth", passive: "스테이지 획득 XP +10%", burn: "15초간 기본 균형 강화", unlock: "Stage 30 ★★" }, { id: "grey-backed", emoji: "🏔️", ko: "회색등때까치", en: "Grey-backed Shrike", role: "🏔️ Altitude", passive: "고도 조리 페널티 50% 완화", burn: "Burning 동안 고도 페널티 제거 · 한기 페널티 제거", unlock: "Stage 40 ★★" }, { id: "isabelline", emoji: "🏜️", ko: "사막때까치", en: "Isabelline Shrike", role: "🪽 Migration", passive: "Migration Wave 중 점수 +20%", burn: "15초간 Migration/Rush 점수 +40%", unlock: "Stage 44 ★★" }, { id: "red-tailed", emoji: "🪽", ko: "붉은꼬리때까치", en: "Red-tailed Shrike", role: "⚡ Rush", passive: "Migration Wave 중 점수 +15%", burn: "15초간 조리속도 +25%", unlock: "Stage 50 ★★" }, { id: "great-grey", emoji: "🩶", ko: "초원때까치", en: "Great Grey Shrike", role: "🌍 Environment", passive: "비·한기 조리 페널티 50% 완화", burn: "Burning 동안 비·한기 페널티 제거", unlock: "Stage 60 ★★" }]; shrikeDexList.innerHTML = ""; defs.forEach(d => { const open = devMode || save.unlockedShrikes.includes(d.id), card = document.createElement("article"); card.className = "dex-card" + (open ? "" : " locked"); card.innerHTML = open ? `<div class="dex-emoji shrike-dex-portrait">${shrikePortraitSvg(d.id, "idle", false)}</div><div><b>${d.ko} <span>${d.en}</span></b><small>${d.role}</small><p><strong>Passive</strong> · ${d.passive}</p><p><strong>Burning</strong> · ${d.burn}</p><small>Unlock · ${d.unlock}</small></div>` : `<div class="dex-emoji">❔</div><div><b>LOCKED SHRIKE</b><small>${d.unlock}</small></div>`; shrikeDexList.appendChild(card); }); }
function updateHud() { scoreLabel.textContent = score.toLocaleString(); xpHudLabel.textContent = save.xp.toLocaleString(); comboLabel.textContent = `×${combo}`; bestComboLabel.textContent = `×${bestCombo}`; burnGaugeFill.style.width = `${burningGauge}%`; burnGaugeText.textContent = isBurning() ? "ACTIVE" : `${Math.round(burningGauge)}%`; burnButton.disabled = burningGauge < 100 || isBurning() || paused; }
function setStatus(t) { statusMessage.textContent = t; }
function judge(t, good) { floatingJudge.textContent = t; floatingJudge.style.color = good ? "var(--accent)" : "var(--danger)"; floatingJudge.classList.remove("pop"); void floatingJudge.offsetWidth; floatingJudge.classList.add("pop"); }
function showEvent(t) { eventBanner.textContent = t; eventBanner.classList.add("show"); setTimeout(() => eventBanner.classList.remove("show"), 2200); }
function shrikeName(id) { return id === "tiger" ? "🐅 칡때까치" : id === "brown" ? "🟤 노랑때까치" : id === "chinese-grey" ? "🩶 물때까치" : id === "long-tailed" ? "🐦 긴꼬리때까치" : id === "northern" ? "🩶 재때까치" : id === "grey-backed" ? "🏔️ 회색등때까치" : id === "isabelline" ? "🏜️ 사막때까치" : id === "red-tailed" ? "🪽 붉은꼬리때까치" : id === "great-grey" ? "🩶 초원때까치" : "🐦 때까치"; }
function activeDialog() { return document.querySelector("dialog[open]"); }
function openDialog(dialog) { closeAllDialogs(); try {
    dialog.showModal();
}
catch {
    dialog.setAttribute("open", "");
    dialog.classList.add("dialog-fallback-open");
} }
function closeDialog(dialog) { try {
    dialog.close();
}
catch {
    dialog.removeAttribute("open");
} dialog.classList.remove("dialog-fallback-open"); }
const coarsePointerQuery = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(pointer: coarse)");
const isCoarsePointer = () => Boolean(coarsePointerQuery === null || coarsePointerQuery === void 0 ? void 0 : coarsePointerQuery.matches);
function closeAllDialogs() { document.querySelectorAll("dialog[open]").forEach(dialog => { try {
    dialog.close();
}
catch {
    dialog.removeAttribute("open");
} }); }
function bindAdaptiveAction(el, action) {
    // Desktop uses native click activation for stable mouse/trackpad input. Touch keeps
    // the pointerdown path that fixed the iOS missed-tap issue in 0.5.2.1.
    el.addEventListener("pointerdown", event => {
        if (!isCoarsePointer())
            return;
        const pe = event;
        if (pe.button !== undefined && pe.button !== 0)
            return;
        event.preventDefault();
        event.stopPropagation();
        action();
    });
    el.addEventListener("click", event => { if (isCoarsePointer())
        return; event.stopPropagation(); action(); });
}
function bindDelegatedAdaptive(container, selector, action) {
    // Orders and burners are rebuilt every frame. Handle pointerdown for both
    // desktop and touch so the action fires before the pressed DOM node can be
    // replaced between pointerdown and click.
    container.addEventListener("pointerdown", event => {
        const target = event.target.closest(selector);
        if (!target)
            return;
        const pe = event;
        if (pe.button !== undefined && pe.button !== 0)
            return;
        event.preventDefault();
        event.stopPropagation();
        action(target);
    });
}
bindDelegatedAdaptive(ordersEl, ".order-card[data-order-id]", target => selectOrder(Number(target.dataset.orderId)));
bindDelegatedAdaptive(burnersEl, ".burner[data-burner-index]", target => clickBurner(Number(target.dataset.burnerIndex)));
bindDelegatedAdaptive(foodButtonsEl, ".food-button[data-food-id]", target => addFood(target.dataset.foodId));
enterGameButton.onclick = () => { coverScreen.classList.add("hidden"); resetStartFlow(); };
world1Button.onclick = () => chooseWorldForFlow(1);
world2Button.onclick = () => chooseWorldForFlow(2);
world3Button.onclick = () => chooseWorldForFlow(3);
world4Button.onclick = () => chooseWorldForFlow(4);
world5Button.onclick = () => chooseWorldForFlow(5);
world6Button.onclick = () => chooseWorldForFlow(6);
world7Button.onclick = () => chooseWorldForFlow(7);
world8Button.onclick = () => chooseWorldForFlow(8);
world9Button.onclick = () => chooseWorldForFlow(9);
world10Button.onclick = () => chooseWorldForFlow(10);
backToWorldButton.onclick = () => { startWorldChosen = startStageChosen = startChefChosen = false; renderStages(); setStartFlow("world"); };
backToStageButton.onclick = () => { startStageChosen = false; startChefChosen = false; renderStages(); setStartFlow("stage"); };
backToChefButton.onclick = () => { startChefChosen = false; renderShrikes(); setStartFlow("chef"); };
startButton.onclick = () => { if (!startWorldChosen || !startStageChosen || !startChefChosen)
    return; startGame(); };
nextStageButton.onclick = () => { if (stage.id >= 100)
    return; const next = (stage.id + 1); if (!devMode && save.unlockedStage < next)
    return; selectedStage = next; selectedWorld = Math.min(10, Math.ceil(next / 10)); startGame(); };
restartButton.onclick = startGame;
backButton.onclick = () => { closeAllDialogs(); document.body.classList.remove("in-game"); resultScreen.classList.add("hidden"); gameScreen.classList.add("hidden"); startScreen.classList.remove("hidden"); renderMeta(); resetStartFlow(); };
devModeButton.onclick = () => { setDevMode(!devMode); showEvent(devMode ? "🛠 DEV MODE ON · 모든 구현 콘텐츠 해금" : "🛠 DEV MODE OFF · 일반 진행도로 복귀"); };
resetSaveButton.onclick = () => { if (confirm("모든 Prototype 0.5 진행도, Bird Book과 업그레이드를 초기화할까요?")) {
    localStorage.removeItem(SAVE_KEY);
    save = defaultSave();
    selectedStage = 1;
    selectedWorld = 1;
    selectedShrike = "bull-headed";
    persist();
    resetStartFlow();
    setStatus("저장 데이터가 초기화되었습니다.");
} };
bindAdaptiveAction(clearSkewerButton, () => { if (paused)
    return; currentSkewer = []; renderSkewer(); });
bindAdaptiveAction(finishSkewerButton, finishSkewer);
bindAdaptiveAction(burnButton, activateBurning);
bindAdaptiveAction(pauseButton, togglePause);
bindAdaptiveAction(quitButton, () => { closeAllDialogs(); document.body.classList.remove("in-game"); running = false; paused = false; cancelAnimationFrame(animationFrame); gameScreen.classList.add("hidden"); resultScreen.classList.add("hidden"); startScreen.classList.remove("hidden"); renderMeta(); resetStartFlow(); });
helpButton.onclick = () => openDialog(helpDialog);
closeHelpButton.onclick = () => closeDialog(helpDialog);
restaurantButton.onclick = () => { renderUpgrades(); openDialog(restaurantDialog); };
closeRestaurantButton.onclick = () => closeDialog(restaurantDialog);
birdBookButton.onclick = () => { renderBirdBook(); openDialog(birdBookDialog); };
closeBirdBookButton.onclick = () => closeDialog(birdBookDialog);
shrikeDexButton.onclick = () => { renderShrikeDex(); openDialog(shrikeDexDialog); };
closeShrikeDexButton.onclick = () => closeDialog(shrikeDexDialog);
let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); deferredInstallPrompt = event; installAppButton.classList.remove("hidden"); });
installAppButton.onclick = async () => { if (!deferredInstallPrompt)
    return; deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; installAppButton.classList.add("hidden"); };
window.addEventListener("appinstalled", () => { deferredInstallPrompt = null; installAppButton.classList.add("hidden"); showEvent("📲 홈 화면에 설치되었습니다!"); });
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => { }));
}
// 모바일 플레이 중 브라우저의 스와이프/당김 새로고침이 게임 입력을 방해하지 않도록 제한한다.
document.addEventListener("touchmove", event => { if (document.body.classList.contains("in-game") && event.target.closest(".game-screen"))
    event.stopPropagation(); }, { passive: true });
document.addEventListener("visibilitychange", () => { if (document.hidden && running && !paused)
    togglePause(); });
window.addEventListener("beforeunload", () => { if (running && !devMode)
    persist(); });
document.body.classList.toggle("dev-mode", devMode);
devModeButton.classList.toggle("active", devMode);
devModeButton.textContent = devMode ? "🛠 DEV ON" : "🛠 DEV MODE";
devModeBanner.classList.toggle("hidden", !devMode);
renderMeta();
resetStartFlow();
stage = stages[selectedStage];
weatherLabel.textContent = baseEnvironmentLabel();
renderFoodButtons();
renderSkewer();
resetBurners();
renderBurners();
