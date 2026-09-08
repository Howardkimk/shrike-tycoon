"use strict";
var _a;
const SAVE_VERSION = 11;
// Keep the 0.3 key so existing Prototype 0.3.3 saves migrate automatically.
const SAVE_KEY = "shrikeTycoonPrototype03Stable";
const OVERCOOK_GRACE = 2.8;
const BASE_ORDER_DEADLINE = 60;
const ORDER_KEYS = ["1", "2", "3", "4", "5", "6"];
const FOOD_KEYS = ["q", "w", "e", "r", "t", "y", "u", "i", "o"];
const BURNER_KEYS = ["a", "s", "d", "f", "g", "h", "j"];
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
    "great-tit": { id: "great-tit", name: "박새", englishName: "Asian Tit", scientificName: "Parus cinereus", emoji: "🐦", diet: { primary: ["caterpillar", "beetle"], secondary: ["grasshopper"], rare: ["aquaticInsect"], never: ["frog", "lizard", "mouse", "fish", "smallBird"] }, note: "곤충의 성충·유충을 폭넓게 이용하는 수목성 손님." },
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
    "european-roller": { id: "european-roller", name: "파랑새", englishName: "Dollarbird", scientificName: "Eurystomus orientalis", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["frog", "mouse"], rare: ["smallBird"], never: ["fish"] }, note: "개방지에서 큰 곤충과 소형 척추동물을 노리는 사냥형 손님." },
    "little-owl": { id: "little-owl", name: "금눈쇠올빼미", englishName: "Little Owl", scientificName: "Athene noctua", emoji: "🦉", diet: { primary: ["mouse", "beetle", "grasshopper"], secondary: ["lizard", "smallBird"], rare: ["frog"], never: ["fish"] }, note: "건조 농경지와 초원의 야간 포식자. 설치류와 대형 곤충을 주문한다." },
    "steppe-eagle": { id: "steppe-eagle", name: "초원수리", englishName: "Steppe Eagle", scientificName: "Aquila nipalensis", emoji: "🦅", diet: { primary: ["mouse"], secondary: ["smallBird", "lizard"], rare: ["frog"], never: ["caterpillar", "aquaticInsect", "fish"] }, note: "초원에서 소형 포유류를 중심으로 먹는 대형 포식자 손님." },
    "common-greenshank": { id: "common-greenshank", name: "청다리도요", englishName: "Common Greenshank", scientificName: "Tringa nebularia", emoji: "🐦", diet: { primary: ["aquaticInsect"], secondary: ["frog", "fish", "beetle"], rare: ["grasshopper"], never: ["mouse", "smallBird"] }, note: "길고 약간 위로 휜 부리와 녹색빛 긴 다리가 특징인 습지 도요류 손님." },
    "red-tailed-shrike": { id: "red-tailed-shrike", name: "붉은꼬리때까치", englishName: "Red-tailed Shrike", scientificName: "Lanius phoenicuroides", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["mouse", "caterpillar"], rare: ["smallBird"], never: ["fish"] }, note: "중앙아시아 건조지의 이동성 때까치 손님." },
    "isabelline-shrike": { id: "isabelline-shrike", name: "사막때까치", englishName: "Isabelline Shrike", scientificName: "Lanius isabellinus", emoji: "🐦", diet: { primary: ["grasshopper", "beetle", "lizard"], secondary: ["mouse", "caterpillar"], rare: ["smallBird"], never: ["fish"] }, note: "사막과 반사막 가장자리에서 큰 곤충과 작은 척추동물을 사냥하는 때까치 손님." }
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
    13: { id: 13, world: 2, icon: "🪨", name: "자갈 하천", habitat: "자갈톱과 얕은 여울", duration: 135, maxOrders: 4, spawnMin: 2750, spawnMax: 4300, maxRecipeLength: 4, specialChance: .13, feedingTimeAt: 72, feedingDuration: 18, starScores: [1800, 2850], weather: [{ at: 52, duration: 22, type: "wind" }], guestPool: ["common-sandpiper", "grey-wagtail", "white-wagtail", "grey-headed-lapwing", "common-greenshank"], foodAvailability: { aquaticInsect: 1, beetle: .8, grasshopper: .65, caterpillar: .55, frog: .3 } },
    14: { id: 14, world: 2, icon: "🌾", name: "갈대밭 식당", habitat: "하천 갈대밭", duration: 140, maxOrders: 4, spawnMin: 2600, spawnMax: 4150, maxRecipeLength: 4, specialChance: .14, feedingTimeAt: 75, feedingDuration: 19, starScores: [2000, 3150], weather: [{ at: 55, duration: 24, type: "rain" }], guestPool: ["oriental-reed-warbler", "barn-swallow", "black-crowned-night-heron"], foodAvailability: { aquaticInsect: 1, caterpillar: .9, beetle: .8, grasshopper: .75, frog: .55, fish: .45 } },
    15: { id: 15, world: 2, icon: "🌿", name: "범람원 초지", habitat: "범람원과 습윤 초지", duration: 145, maxOrders: 5, spawnMin: 2500, spawnMax: 3950, maxRecipeLength: 4, specialChance: .16, feedingTimeAt: 78, feedingDuration: 20, starScores: [2250, 3500], event: "RIVER FEEDING TIME", weather: [{ at: 38, duration: 18, type: "sun" }, { at: 96, duration: 18, type: "wind" }], guestPool: ["barn-swallow", "grey-headed-lapwing", "eastern-cattle-egret", "common-kestrel"], foodAvailability: { grasshopper: 1, beetle: .85, aquaticInsect: .8, frog: .55, mouse: .45, lizard: .35 } },
    16: { id: 16, world: 2, icon: "🪷", name: "갈대 습지", habitat: "얕은 습지와 갈대섬", duration: 150, maxOrders: 5, spawnMin: 2400, spawnMax: 3850, maxRecipeLength: 4, specialChance: .18, feedingTimeAt: 82, feedingDuration: 21, starScores: [2500, 3850], weather: [{ at: 58, duration: 26, type: "rain" }], guestPool: ["little-egret", "black-crowned-night-heron", "oriental-reed-warbler", "ruddy-kingfisher", "common-greenshank"], foodAvailability: { frog: 1, fish: .85, aquaticInsect: .9, beetle: .55, lizard: .5, mouse: .25 } },
    17: { id: 17, world: 2, icon: "🌊", name: "큰 저수지", habitat: "저수지 개방수면 가장자리", duration: 155, maxOrders: 5, spawnMin: 2300, spawnMax: 3700, maxRecipeLength: 4, specialChance: .20, feedingTimeAt: 84, feedingDuration: 22, starScores: [2800, 4300], weather: [{ at: 42, duration: 18, type: "sun" }, { at: 110, duration: 20, type: "rain" }], guestPool: ["common-kingfisher", "little-egret", "grey-heron", "black-crowned-night-heron"], foodAvailability: { fish: 1, frog: .85, aquaticInsect: .75, mouse: .3, lizard: .25, smallBird: .15 } },
    18: { id: 18, world: 2, icon: "🌉", name: "큰 강의 바람", habitat: "넓은 하천과 모래톱", duration: 160, maxOrders: 5, spawnMin: 2200, spawnMax: 3550, maxRecipeLength: 4, specialChance: .22, feedingTimeAt: 86, feedingDuration: 23, starScores: [3100, 4700], event: "RIVER RUSH", weather: [{ at: 48, duration: 26, type: "wind" }, { at: 118, duration: 20, type: "sun" }], guestPool: ["common-sandpiper", "grey-headed-lapwing", "little-egret", "common-kestrel", "grey-heron", "common-greenshank"], foodAvailability: { aquaticInsect: .85, fish: .8, grasshopper: .7, beetle: .75, frog: .55, mouse: .5, lizard: .35 } },
    19: { id: 19, world: 2, icon: "🌇", name: "강변의 석양", habitat: "석양의 강변과 갈대숲", duration: 170, maxOrders: 5, spawnMin: 2100, spawnMax: 3450, maxRecipeLength: 4, specialChance: .24, feedingTimeAt: 90, feedingDuration: 25, starScores: [3500, 5200], event: "SUNSET SERVICE", weather: [{ at: 35, duration: 22, type: "sun" }, { at: 105, duration: 22, type: "wind" }], guestPool: ["black-crowned-night-heron", "ruddy-kingfisher", "common-kingfisher", "oriental-reed-warbler", "grey-heron"], foodAvailability: { fish: 1, frog: .9, aquaticInsect: .85, lizard: .6, mouse: .45, beetle: .55 } },
    20: { id: 20, world: 2, icon: "⛈️", name: "폭풍우 치는 강", habitat: "World 2 Finale", duration: 190, maxOrders: 6, spawnMin: 1950, spawnMax: 3250, maxRecipeLength: 4, specialChance: .28, feedingTimeAt: 98, feedingDuration: 34, starScores: [4300, 6300], event: "STORM SERVICE", weather: [{ at: 28, duration: 25, type: "rain" }, { at: 70, duration: 24, type: "wind" }, { at: 116, duration: 20, type: "sun" }, { at: 148, duration: 28, type: "rain" }], guestPool: ["common-kingfisher", "little-egret", "black-crowned-night-heron", "common-sandpiper", "barn-swallow", "grey-headed-lapwing", "grey-heron", "ruddy-kingfisher", "common-greenshank"], foodAvailability: { fish: 1, frog: .95, aquaticInsect: 1, grasshopper: .65, beetle: .7, lizard: .55, mouse: .45, smallBird: .2 } },
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
const $ = (id) => document.getElementById(id);
const coverScreen = $("coverScreen"), enterGameButton = $("enterGameButton"), installAppButton = $("installAppButton");
const startScreen = $("startScreen"), gameScreen = $("gameScreen"), resultScreen = $("resultScreen");
const startButton = $("startButton"), nextStageButton = $("nextStageButton"), restartButton = $("restartButton"), backButton = $("backButton"), quitButton = $("quitButton"), pauseButton = $("pauseButton");
const resetSaveButton = $("resetSaveButton"), finishSkewerButton = $("finishSkewerButton"), clearSkewerButton = $("clearSkewerButton"), burnButton = $("burnButton");
const keyboardGuideButton = $("keyboardGuideButton"), keyboardGuideGameButton = $("keyboardGuideGameButton"), keyboardGuideDialog = $("keyboardGuideDialog"), closeKeyboardGuideButton = $("closeKeyboardGuideButton");
const chefSprite = $("chefSprite"), chefActionLabel = $("chefActionLabel"), guestAnimationLane = $("guestAnimationLane");
let chefActionTimer = 0;
function chefAction(action) { if (!chefSprite)
    return; window.clearTimeout(chefActionTimer); chefSprite.className = `chef-sprite ${action}`; chefActionLabel.textContent = action.toUpperCase(); chefActionTimer = window.setTimeout(() => { chefSprite.className = `chef-sprite ${isBurning() ? "burning" : "idle"}`; chefActionLabel.textContent = isBurning() ? "BURNING" : "IDLE"; }, action === "burning" ? 15000 : 620); }
function animateGuest(guest, kind) { if (!guestAnimationLane)
    return; const el = document.createElement("div"); el.className = `animated-guest ${kind}`; el.innerHTML = `<img src="assets/birds/${guest.id}.svg" alt=""><span>${kind === "happy" ? "♥" : kind === "sad" ? "…" : "!"}</span>`; guestAnimationLane.appendChild(el); window.setTimeout(() => el.remove(), kind === "arrive" ? 900 : 1200); }
const helpButton = $("helpButton"), helpDialog = $("helpDialog"), closeHelpButton = $("closeHelpButton");
const restaurantButton = $("restaurantButton"), restaurantDialog = $("restaurantDialog"), closeRestaurantButton = $("closeRestaurantButton");
const birdBookButton = $("birdBookButton"), birdBookDialog = $("birdBookDialog"), closeBirdBookButton = $("closeBirdBookButton"), birdBookList = $("birdBookList");
const shrikeDexButton = $("shrikeDexButton"), shrikeDexDialog = $("shrikeDexDialog"), closeShrikeDexButton = $("closeShrikeDexButton"), shrikeDexList = $("shrikeDexList");
const ordersEl = $("orders"), burnersEl = $("burners"), skewerEl = $("skewer"), foodButtonsEl = $("foodButtons"), stageButtonsEl = $("stageButtons"), shrikeButtonsEl = $("shrikeButtons"), upgradeList = $("upgradeList");
const selectedOrderSummary = $("selectedOrderSummary"), statusMessage = $("statusMessage"), floatingJudge = $("floatingJudge"), eventBanner = $("eventBanner"), timeLabel = $("timeLabel"), scoreLabel = $("scoreLabel"), comboLabel = $("comboLabel"), bestComboLabel = $("bestComboLabel"), burnGaugeFill = $("burnGaugeFill"), burnGaugeText = $("burnGaugeText"), saveSummary = $("saveSummary"), currentStageLabel = $("currentStageLabel"), currentShrikeLabel = $("currentShrikeLabel"), stageEcology = $("stageEcology"), totalXpHeader = $("totalXpHeader"), careerStatsHeader = $("careerStatsHeader"), xpHudLabel = $("xpHudLabel"), resultTotalXp = $("resultTotalXp"), recordNotice = $("recordNotice"), weatherLabel = $("weatherLabel"), world1Button = $("world1Button"), world2Button = $("world2Button"), world3Button = $("world3Button"), world4Button = $("world4Button"), world5Button = $("world5Button"), devModeButton = $("devModeButton"), devModeBanner = $("devModeBanner");
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
        merged.unlockedStage = Math.max(1, Math.min(50, Number(merged.unlockedStage) || 1));
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
    if (selectedStage <= 10)
        selectedWorld = 1;
    else if (selectedStage <= 20)
        selectedWorld = 2;
    else if (selectedStage <= 30)
        selectedWorld = 3;
    else if (selectedStage <= 40)
        selectedWorld = 4;
    else
        selectedWorld = 5;
    if (!save.unlockedShrikes.includes(selectedShrike))
        selectedShrike = save.unlockedShrikes.includes("red-tailed") ? "red-tailed" : save.unlockedShrikes.includes("isabelline") ? "isabelline" : save.unlockedShrikes.includes("grey-backed") ? "grey-backed" : save.unlockedShrikes.includes("northern") ? "northern" : save.unlockedShrikes.includes("long-tailed") ? "long-tailed" : save.unlockedShrikes.includes("chinese-grey") ? "chinese-grey" : save.unlockedShrikes.includes("brown") ? "brown" : save.unlockedShrikes.includes("tiger") ? "tiger" : "bull-headed";
} document.body.classList.toggle("dev-mode", enabled); devModeButton.classList.toggle("active", enabled); devModeButton.textContent = enabled ? "🛠 DEV ON" : "🛠 DEV MODE"; devModeBanner.classList.toggle("hidden", !enabled); renderMeta(); }
let selectedStage = Math.min(save.unlockedStage, 50);
let selectedWorld = selectedStage > 40 ? 5 : selectedStage > 30 ? 4 : selectedStage > 20 ? 3 : selectedStage > 10 ? 2 : 1;
let selectedShrike = save.unlockedShrikes.includes("red-tailed") ? "red-tailed" : save.unlockedShrikes.includes("isabelline") ? "isabelline" : save.unlockedShrikes.includes("grey-backed") ? "grey-backed" : save.unlockedShrikes.includes("northern") ? "northern" : save.unlockedShrikes.includes("long-tailed") ? "long-tailed" : save.unlockedShrikes.includes("chinese-grey") ? "chinese-grey" : save.unlockedShrikes.includes("brown") ? "brown" : save.unlockedShrikes.includes("tiger") ? "tiger" : "bull-headed";
let stage = stages[selectedStage], orders = [], selectedOrderId = null, currentSkewer = [], pendingSkewer = null, burners = [];
let score = 0, combo = 0, bestCombo = 0, served = 0, perfectCount = 0, failed = 0, specialServed = 0, perfectStreak = 0, nightServed = 0;
let startedAt = 0, gameEndAt = 0, nextOrderAt = 0, orderSequence = 1, animationFrame = 0;
let running = false, paused = false, pausedAt = 0, burningGauge = 0, burningActiveUntil = 0, burningStartedAt = 0, feedingActiveUntil = 0, feedingTriggered = false, eventShown = false;
let currentWeather = "clear", weatherEndAt = 0, weatherTriggered = new Set(), migrationTriggered = new Set(), lastFrameAt = 0, tripleBurnerPerfect = 0, currentPhase = "day", currentPhaseIndex = -1;
const rand = (a, b) => Math.random() * (b - a) + a;
const choice = (a) => a[Math.floor(Math.random() * a.length)];
const fmt = (s) => { const x = Math.max(0, Math.ceil(s)); return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`; };
const recipeEmoji = (r) => r.map(x => `<img class="food-pixel-mini" src="assets/foods/${x}.svg" alt="${foods[x].name}">`).join("");
const eq = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
const isBurning = () => Date.now() < burningActiveUntil, isFeeding = () => Date.now() < feedingActiveUntil, elapsed = () => running ? (Date.now() - startedAt) / 1000 : 0;
function weatherCookMult() { if (currentWeather === "rain")
    return .80; if (currentWeather === "sun")
    return 1.10; if (currentWeather === "cold")
    return selectedShrike === "grey-backed" ? (isBurning() ? 1 : .92) : .82; return 1; }
function altitudeCookMult() { const level = stage.altitude || 0; if (!level)
    return 1; if (selectedShrike === "grey-backed" && isBurning())
    return 1; const penalty = .05 * level * (selectedShrike === "grey-backed" ? .5 : 1); return 1 - penalty; }
function cookMult() { let up = (1 + save.upgrades.fire * .03) * weatherCookMult() * altitudeCookMult(); if (selectedShrike === "tiger")
    return up * (isBurning() ? 1.40 : 1.10); if (selectedShrike === "long-tailed")
    return up * .90 * (isBurning() ? 1.20 : 1); if (selectedShrike === "bull-headed")
    return up * (isBurning() ? 1.20 : 1); if (selectedShrike === "red-tailed")
    return up * (isBurning() ? 1.25 : 1); return up * (isBurning() ? 1.12 : 1); }
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
function phaseFoodAvailability(id) { var _a, _b; const base = stage.foodAvailability[id] || 0; const phase = phaseInfo().phase; return base * ((_b = (_a = phase === null || phase === void 0 ? void 0 : phase.foodModifier) === null || _a === void 0 ? void 0 : _a[id]) !== null && _b !== void 0 ? _b : 1); }
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
function recipeLength() { const p = Math.min(1, elapsed() / stage.duration), r = Math.random(); if (stage.maxRecipeLength <= 3)
    return p < .45 ? (r < .55 ? 1 : 2) : (r < .15 ? 1 : r < .70 ? 2 : 3); return p < .3 ? (r < .35 ? 2 : 3) : (r < .15 ? 2 : r < .6 ? 3 : 4); }
function dietWeight(g, id) { if (g.diet.primary.includes(id))
    return 1; if (g.diet.secondary.includes(id))
    return .55; if (g.diet.rare.includes(id))
    return .18; if (g.diet.never.includes(id))
    return 0; return .08; }
function weightedFood(g) {
    const pool = stageFoodPool();
    const weighted = pool.map(id => ({ id, w: dietWeight(g, id) * phaseFoodAvailability(id) })).filter(x => x.w > 0);
    if (!weighted.length)
        return choice(pool);
    const total = weighted.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * total;
    for (const item of weighted) {
        r -= item.w;
        if (r <= 0)
            return item.id;
    }
    return weighted[weighted.length - 1].id;
}
function makeRecipe(g, special = false) { const len = special ? Math.min(4, Math.max(3, stage.maxRecipeLength)) : recipeLength(); const recipe = []; for (let i = 0; i < len; i++)
    recipe.push(weightedFood(g)); return recipe; }
function baseEnvironmentLabel() { var _a; if (stage.world === 4 && stage.altitude)
    return `🏔️ 고도 ${stage.altitude} · 조리 -${stage.altitude * 5}%`; if (stage.world === 5 && ((_a = stage.migrationWaves) === null || _a === void 0 ? void 0 : _a.length))
    return `🪽 이동 파동 ${stage.migrationWaves.length}회`; return "☀️ 맑음"; }
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
    const guest = guests[choice(currentGuestPool())];
    const recipe = makeRecipe(guest, special);
    orders.push({ id: orderSequence++, guest, recipe, createdAt: Date.now(), deadlineSeconds: BASE_ORDER_DEADLINE * deadlineMult(), special });
    animateGuest(guest, "arrive");
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
    gameScreen.dataset.world = String(stage.world);
    orders = [];
    selectedOrderId = null;
    currentSkewer = [];
    pendingSkewer = null;
    score = combo = bestCombo = served = perfectCount = failed = specialServed = tripleBurnerPerfect = perfectStreak = nightServed = 0;
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
    chefSprite.src = `assets/shrikes/${selectedShrike}.svg`;
    chefSprite.alt = shrikeName(selectedShrike);
    chefAction("idle");
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
            gameScreen.classList.add("migration-wave");
            setTimeout(() => gameScreen.classList.remove("migration-wave"), 2600);
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
            b.state = "ready"; if (b.state === "ready" && now >= b.readyAt + OVERCOOK_GRACE * 1000)
            b.state = "overcooked"; });
        renderOrders();
        renderBurners();
        updateHud();
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
        if (stage.id < 50 && stars > 0)
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
        persist();
    }
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    const canAdvance = stage.id < 50 && (devMode || (stars > 0 && save.unlockedStage >= stage.id + 1));
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
    $("unlockNotice").textContent = devMode ? `전체 콘텐츠 테스트 활성 · Stage ${stage.id}/50 · ${shrikeName(selectedShrike)}` : [...(unlocked), ...(stage.subGoal ? [subDone ? `🎯 서브 목표 달성 · ${stage.subGoal.label} (+75 XP)` : `🎯 서브 목표 미달성 · ${stage.subGoal.label}`] : [])].join(" · ") || `Bird Book ${save.discoveredBirds.length}/${Object.keys(guests).length} · 진행도 저장 완료`;
}
function expireOrder(id) { const o = orders.find(x => x.id === id); if (!o)
    return; orders = orders.filter(x => x.id !== id); failed++; combo = 0; perfectStreak = 0; if (selectedOrderId === id)
    selectedOrderId = null; if ((pendingSkewer === null || pendingSkewer === void 0 ? void 0 : pendingSkewer.orderId) === id)
    pendingSkewer = null; animateGuest(o.guest, "sad"); judge("TOO LATE", false); renderSelected(); }
function selectOrder(id) { if (paused)
    return; selectedOrderId = selectedOrderId === id ? null : id; renderSelected(); renderOrders(); setStatus(selectedOrderId === id ? "우선 주문을 지정했습니다. 꼬치는 자유롭게 만든 뒤 자동 매칭됩니다." : "우선 주문 지정을 해제했습니다. 자동으로 가장 오래된 일치 주문에 매칭됩니다."); }
function addFood(id) { if (paused)
    return; if (currentSkewer.length >= 4) {
    setStatus("꼬치는 최대 4개 재료까지 꽂을 수 있습니다.");
    return;
} currentSkewer.push(id); chefAction("impale"); renderSkewer(); setStatus("꼬치를 자유롭게 조립 중입니다. 완성하면 주문과 자동 매칭됩니다."); }
function finishSkewer() {
    if (paused)
        return;
    if (!currentSkewer.length) {
        setStatus("먼저 재료를 꼬치에 꽂으세요.");
        return;
    }
    const matches = orders.filter(o => eq(currentSkewer, o.recipe)).sort((a, b) => a.createdAt - b.createdAt);
    const priority = selectedOrderId !== null ? matches.find(o => o.id === selectedOrderId) : undefined;
    const order = priority || matches[0];
    if (!order) {
        judge("NO MATCH", false);
        setStatus("이 꼬치와 일치하는 주문이 없습니다. 꼬치는 유지됩니다 — 재료를 비우고 다시 조립해보세요.");
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
    chefAction("grill");
    renderBurners();
    return;
} if (b.state === "cooking") {
    setStatus("아직 덜 익었습니다.");
    return;
} serveBurner(b); }
function serveBurner(b) { const order = orders.find(o => o.id === b.orderId); if (!order) {
    resetBurner(b);
    return;
} const perfect = b.state === "ready", specialMult = order.special ? 2 : 1, comboMult = 1 + Math.min(combo, 20) * .03; let pts = Math.round(baseScore(order.recipe) * 10 * specialMult * comboMult); if (!perfect)
    pts = Math.round(pts * .55); if (selectedShrike === "brown")
    pts = Math.round(pts * (1 + Math.min(.15, combo * .015))); if (selectedShrike === "isabelline" && isFeeding())
    pts = Math.round(pts * (isBurning() ? 1.40 : 1.20)); if (selectedShrike === "red-tailed" && isFeeding())
    pts = Math.round(pts * 1.15); score += pts; served++; if (currentPhase === "night")
    nightServed++; if (order.special)
    specialServed++; if (perfect) {
    if (burners.filter(x => x.state !== "empty").length >= 3)
        tripleBurnerPerfect++;
    combo++;
    perfectCount++;
    perfectStreak++;
    burningGauge = Math.min(100, burningGauge + 14 + (order.special ? 8 : 0));
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
} bestCombo = Math.max(bestCombo, combo); animateGuest(order.guest, perfect ? "happy" : "sad"); chefAction("serve"); orders = orders.filter(o => o.id !== order.id); if (selectedOrderId === order.id)
    selectedOrderId = null; resetBurner(b); renderSelected(); setStatus(perfect ? "깔끔한 서빙!" : "조금 탔지만 서빙했습니다."); }
function resetBurner(b) { b.state = "empty"; b.orderId = null; b.recipe = []; b.startedAt = b.cookSeconds = b.readyAt = 0; }
function activateBurning() { if (paused || burningGauge < 100 || isBurning())
    return; const now = Date.now(); burningGauge = 0; burningStartedAt = now; burningActiveUntil = now + 15000; syncBurners(); chefAction("burning"); showEvent(`🔥 ${shrikeName(selectedShrike)} BURNING!`); setStatus(selectedShrike === "tiger" ? "조리속도 +40%!" : selectedShrike === "brown" ? "콤보 점수 가속!" : selectedShrike === "chinese-grey" ? "8초 주문 타이머 정지 → 7초 절반 속도!" : selectedShrike === "long-tailed" ? "임시 화구 +2 · 조리 +20%!" : selectedShrike === "grey-backed" ? "고도·한기 페널티 무효화!" : selectedShrike === "isabelline" ? "Migration Wave 점수 +40%!" : selectedShrike === "red-tailed" ? "Rush 조리속도 +25%!" : "균형 강화!"); }
function renderAll() { renderMeta(); renderFoodButtons(); renderSkewer(); renderOrders(); renderBurners(); renderSelected(); updateHud(); }
function renderMeta() { const totalStars = Object.values(save.bestStars).reduce((a, b) => a + b, 0); saveSummary.innerHTML = `<div class="career-grid"><div><span>누적 XP</span><strong>${save.xp.toLocaleString()}</strong></div><div><span>총 플레이</span><strong>${save.stats.plays}</strong></div><div><span>누적 서빙</span><strong>${save.stats.served}</strong></div><div><span>PERFECT</span><strong>${save.stats.perfect}</strong></div></div><p>${devMode ? "🛠 DEV MODE · World 1–5 / Stage 1–50 / Shrike 10종 전체 테스트 가능 · 진행도 미저장" : "Stage " + save.unlockedStage + "/50 · Shrikes " + save.unlockedShrikes.length + "/10 · Bird Book " + save.discoveredBirds.length + "/" + Object.keys(guests).length + " · Stars " + totalStars + "/150"}</p>`; totalXpHeader.textContent = `${save.xp.toLocaleString()} XP`; careerStatsHeader.textContent = devMode ? "DEV SESSION · 일반 세이브 보호" : `${save.stats.plays}회 플레이 · ${save.stats.served}명 서빙`; xpHudLabel.textContent = save.xp.toLocaleString(); renderStages(); renderShrikes(); renderUpgrades(); renderStageEcology(); }
function renderStages() { var _a, _b, _c; stageButtonsEl.innerHTML = ""; startScreen.dataset.world = String(selectedWorld); world1Button.classList.toggle("selected", selectedWorld === 1); world2Button.classList.toggle("selected", selectedWorld === 2); world3Button.classList.toggle("selected", selectedWorld === 3); world4Button.classList.toggle("selected", selectedWorld === 4); world5Button.classList.toggle("selected", selectedWorld === 5); world2Button.disabled = !devMode && save.unlockedStage < 11; world3Button.disabled = !devMode && save.unlockedStage < 21; world4Button.disabled = !devMode && save.unlockedStage < 31; world5Button.disabled = !devMode && save.unlockedStage < 41; const start = selectedWorld === 1 ? 1 : selectedWorld === 2 ? 11 : selectedWorld === 3 ? 21 : selectedWorld === 4 ? 31 : 41, end = selectedWorld === 1 ? 10 : selectedWorld === 2 ? 20 : selectedWorld === 3 ? 30 : selectedWorld === 4 ? 40 : 50; for (let i = start; i <= end; i++) {
    const id = i, c = stages[id], btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stage-card" + (selectedStage === id ? " selected" : "");
    btn.dataset.world = String(c.world);
    btn.disabled = !devMode && id > save.unlockedStage;
    btn.dataset.stageId = String(id);
    const stars = save.bestStars[String(id)] || 0, bc = save.bestCombos[String(id)] || 0;
    const bs = save.bestScores[String(id)] || 0;
    btn.innerHTML = `<span class="stage-icon">${c.icon}</span><b>${id}. ${c.name}</b><small>${c.habitat}</small><span class="stage-stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</span><small class="stage-record">Best ${bs.toLocaleString()} · Combo ×${bc}</small><small>손님 ${c.guestPool.length}종${((_a = c.weather) === null || _a === void 0 ? void 0 : _a.length) ? " · 🌦 날씨" : ""}${((_b = c.timePhases) === null || _b === void 0 ? void 0 : _b.length) ? " · 🌓 시간대" : ""}${c.altitude ? ` · 🏔️ 고도 ${c.altitude}` : ""}${((_c = c.migrationWaves) === null || _c === void 0 ? void 0 : _c.length) ? ` · 🪽 이동 ${c.migrationWaves.length}파` : ""}</small>${c.subGoal ? `<small class="stage-goal">🎯 ${c.subGoal.label}${save.bestSubGoals[String(id)] ? " · ✓" : ""}</small>` : ""}${devMode ? `<small class="dev-badge">DEV · UNLOCKED</small>` : ""}`;
    btn.addEventListener("click", () => { selectedStage = id; renderStages(); renderStageEcology(); });
    stageButtonsEl.appendChild(btn);
} }
function renderStageEcology() { var _a; const c = stages[selectedStage]; const foodsSorted = stageFoodEntries(c).slice(0, 5).map(([id, v]) => `${foods[id].emoji}${foods[id].name} ${Math.round(v * 100)}%`).join(" · "); const guestNames = c.guestPool.slice(0, 5).map(id => guests[id].name).join(" · "); const wx = (c.weather || []).map(w => `${w.type === "rain" ? "🌧 비" : w.type === "wind" ? "💨 바람" : w.type === "cold" ? "❄️ 한기" : "☀️ 햇빛"} ${w.duration}s`).join(" · ") || "고정 날씨"; const phases = (c.timePhases || []).map(p => `${phaseName(p.type)} ${p.at}s`).join(" → ") || "☀️ 낮"; const migration = ((_a = c.migrationWaves) === null || _a === void 0 ? void 0 : _a.length) ? `🪽 Migration Wave · ${c.migrationWaves.map(x => x + "s").join(" · ")}` : ""; stageEcology.innerHTML = `<div><span class="eco-label">${c.icon} HABITAT</span><b>${c.habitat}</b><p>World ${c.world}</p></div><div><span class="eco-label">🍽 FOOD AVAILABILITY</span><p>${foodsSorted}</p></div><div><span class="eco-label">🐦 EXPECTED GUESTS</span><p>${guestNames}${c.guestPool.length > 5 ? " 외" : ""}</p></div><div><span class="eco-label">🌓 TIME / WEATHER</span><p>${phases}</p><p>${c.altitude ? `🏔️ 고도 단계 ${c.altitude} · 기본 조리속도 -${c.altitude * 5}%` : wx}</p><p>${c.altitude ? wx : migration}</p>${c.subGoal ? `<p><b>🎯 ${c.subGoal.label}</b></p>` : ""}</div>`; }
function stageFoodEntries(c) { return Object.entries(c.foodAvailability).sort((a, b) => b[1] - a[1]); }
function renderShrikes() { const defs = [{ id: "bull-headed", emoji: "🐦", name: "때까치", desc: "균형형 · Burning 시 전반 강화", unlock: "기본" }, { id: "tiger", emoji: "🐅", name: "칡때까치", desc: "조리속도 +10%", unlock: "Stage 3 이상에서 ★★ 달성" }, { id: "brown", emoji: "🟤", name: "노랑때까치", desc: "Combo가 높을수록 점수 증가", unlock: "Stage 6에서 Best Combo ×12" }, { id: "chinese-grey", emoji: "🩶", name: "물때까치", desc: "주문 제한시간 +10% · 시간 제어 Burning", unlock: "Stage 15 ★★" }, { id: "long-tailed", emoji: "🐦", name: "긴꼬리때까치", desc: "화구 +2 · 조리속도 -10%", unlock: "Stage 18+에서 3화구 동시 PERFECT 3회" }, { id: "northern", emoji: "🩶", name: "재때까치", desc: "성장형 · 획득 XP +10%", unlock: "Stage 30 ★★" }, { id: "grey-backed", emoji: "🏔️", name: "회색등때까치", desc: "고산형 · 고도 페널티 50% 완화", unlock: "Stage 40 ★★" }, { id: "isabelline", emoji: "🏜️", name: "사막때까치", desc: "Migration Wave 중 점수 +20%", unlock: "Stage 44 ★★" }, { id: "red-tailed", emoji: "🪽", name: "붉은꼬리때까치", desc: "Rush 특화 · Burning 조리 +25%", unlock: "Stage 50 ★★" }, { id: "great-grey", emoji: "🩶", name: "초원때까치", desc: "환경형 · World 6에서 등장 예정", unlock: "World 6 예정" }]; shrikeButtonsEl.innerHTML = ""; defs.forEach(d => { const btn = document.createElement("button"); btn.type = "button"; btn.className = "select-card" + (selectedShrike === d.id ? " selected" : ""); btn.dataset.shrikeId = d.id; btn.disabled = !devMode && !save.unlockedShrikes.includes(d.id); btn.innerHTML = `<span class="shrike-select-pixel"><img src="assets/shrikes/${d.id}.svg" alt="${d.name}"></span><b>${d.name}</b><span>${d.desc}</span><small>${devMode ? `DEV · ${d.unlock}` : btn.disabled ? `LOCKED · ${d.unlock}` : "사용 가능"}</small>`; btn.addEventListener("click", () => { selectedShrike = d.id; renderShrikes(); }); shrikeButtonsEl.appendChild(btn); }); }
function upgradeCost(id) { return 250 + save.upgrades[id] * 250; }
function renderUpgrades() { const defs = [{ id: "branch", name: "🌿 나뭇가지", desc: "동시 주문 +1 / Lv", max: 2 }, { id: "fire", name: "🔥 좋은 장작", desc: "조리속도 +3% / Lv", max: 5 }, { id: "perch", name: "🪺 편안한 횃대", desc: "주문 대기시간 +4% / Lv", max: 5 }]; upgradeList.innerHTML = ""; defs.forEach(d => { const lv = save.upgrades[d.id], cost = upgradeCost(d.id), card = document.createElement("div"); card.className = "upgrade-card"; card.innerHTML = `<div><b>${d.name} · Lv.${lv}/${d.max}</b><small>${d.desc}</small></div>`; const btn = document.createElement("button"); btn.className = "primary-button"; btn.textContent = lv >= d.max ? "MAX" : `${cost} XP`; btn.disabled = devMode || lv >= d.max || save.xp < cost; if (devMode)
    btn.textContent = "DEV · SAVE LOCK"; btn.onclick = () => { if (devMode)
    return; if (save.xp >= cost && lv < d.max) {
    save.xp -= cost;
    save.upgrades[d.id]++;
    persist();
    renderUpgrades();
} }; card.appendChild(btn); upgradeList.appendChild(card); }); }
function renderFoodButtons() { foodButtonsEl.innerHTML = ""; stageFoodPool().forEach((id, index) => { var _a; const f = foods[id], btn = document.createElement("button"), key = ((_a = FOOD_KEYS[index]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || ""; btn.className = "food-button"; btn.innerHTML = `${key ? `<span class="key-badge">${key}</span>` : ""}<span class="food-emoji"><img class="food-pixel" src="assets/foods/${id}.svg" alt="${f.name}"></span>${f.name}<small>${f.cookSeconds}s</small>`; btn.dataset.foodId = id; if (key)
    btn.setAttribute("aria-keyshortcuts", key); foodButtonsEl.appendChild(btn); }); foodButtonsEl.style.gridTemplateColumns = `repeat(${Math.min(5, Math.max(3, stageFoodPool().length))},1fr)`; }
function renderSkewer() { skewerEl.innerHTML = currentSkewer.length ? currentSkewer.map(id => `<span class="skewer-item"><img class="food-pixel-skewer" src="assets/foods/${id}.svg" alt="${foods[id].name}"></span>`).join("") : `<span class="empty-skewer">재료를 순서대로 꽂으세요</span>`; }
function renderSelected() { const o = orders.find(x => x.id === selectedOrderId); selectedOrderSummary.innerHTML = o ? `<span class="priority-label">우선 매칭</span> <img class="selected-guest-pixel" src="assets/birds/${o.guest.id}.svg" alt=""> <b>${o.guest.name}</b> · <span class="recipe-inline">${recipeEmoji(o.recipe)}</span>${o.special ? " · ⭐ SPECIAL" : ""}` : `<span class="auto-match-label">✨ AUTO MATCH</span> 주문 선택 없이 꼬치를 만들어도 됩니다.`; }
function renderOrders() { const now = Date.now(); ordersEl.innerHTML = ""; orders.forEach((o, index) => { const left = o.deadlineSeconds - (now - o.createdAt) / 1000, p = Math.max(0, Math.min(100, left / o.deadlineSeconds * 100)), btn = document.createElement("button"), key = ORDER_KEYS[index] || ""; btn.className = `order-card${selectedOrderId === o.id ? " selected" : ""}${left < 10 ? " urgent" : ""}${o.special ? " special" : ""}`; btn.innerHTML = `${key ? `<span class="key-badge">${key}</span>` : ""}${o.special ? '<span class="special-badge">SPECIAL ×2</span>' : ""}<span class="bird bird-order-pixel"><img src="assets/birds/${o.guest.id}.svg" alt=""></span><div class="name">${o.guest.name}</div><div class="bird-en">${o.guest.englishName}</div><div class="recipe">${recipeEmoji(o.recipe)}</div><div class="timer"><span>남은 시간</span><strong>${Math.max(0, left).toFixed(1)}s</strong></div><div class="order-progress" style="width:${p}%"></div>`; btn.dataset.orderId = String(o.id); if (key)
    btn.setAttribute("aria-keyshortcuts", key); ordersEl.appendChild(btn); }); if (!orders.length)
    ordersEl.innerHTML = '<div class="hint">다음 손님을 기다리는 중...</div>'; }
function renderBurners() { const now = Date.now(); burnersEl.innerHTML = ""; burners.forEach(b => { var _a; const btn = document.createElement("button"), key = ((_a = BURNER_KEYS[b.index]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || ""; btn.className = `burner ${b.state}`; let state = "빈 화구", pct = 0; if (b.state === "cooking") {
    const e = (now - b.startedAt) / 1000;
    pct = Math.min(100, e / b.cookSeconds * 100);
    state = `조리 중 ${Math.max(0, b.cookSeconds - e).toFixed(1)}s`;
} if (b.state === "ready") {
    pct = 100;
    state = "READY · 클릭/키로 서빙";
} if (b.state === "overcooked") {
    pct = 100;
    state = "OVERCOOKED · 지금 서빙";
} btn.innerHTML = `${key ? `<span class="key-badge">${key}</span>` : ""}<span class="flame">🔥</span><div class="burner-title">화구 ${b.index + 1}</div><div class="burner-recipe">${b.recipe.length ? recipeEmoji(b.recipe) : "EMPTY"}</div><div class="burner-state">${state}</div><div class="cook-bar"><div class="cook-fill" style="width:${pct}%"></div></div>`; btn.dataset.burnerIndex = String(b.index); if (key)
    btn.setAttribute("aria-keyshortcuts", key); burnersEl.appendChild(btn); }); }
function renderBirdBook() { birdBookList.innerHTML = ""; Object.keys(guests).forEach(id => { const g = guests[id], seen = devMode || save.discoveredBirds.includes(id), card = document.createElement("article"); card.className = "bird-card" + (seen ? "" : " locked"); if (!seen) {
    card.innerHTML = `<div class="bird-card-emoji">❔</div><div><b>미발견 조류</b><small>World 1에서 만나보세요.</small></div>`;
}
else {
    const primary = g.diet.primary.map(x => foods[x].emoji + foods[x].name).join(" · "), secondary = g.diet.secondary.slice(0, 3).map(x => foods[x].emoji + foods[x].name).join(" · ");
    card.innerHTML = `<div class="bird-card-emoji bird-pixel-frame"><img class="bird-pixel" src="assets/birds/${g.id}.svg" alt="${g.name} 도트 일러스트"></div><div><b>${g.name} <span>${g.englishName}</span></b><i>${g.scientificName}</i><p>${g.note}</p><small>주요 먹이 · ${primary}</small>${secondary ? `<small>보조 먹이 · ${secondary}</small>` : ""}</div>`;
} birdBookList.appendChild(card); }); }
function renderShrikeDex() { const defs = [{ id: "bull-headed", emoji: "🐦", ko: "때까치", en: "Bull-headed Shrike", role: "⚖️ Balance", passive: "기본 능력 없음", burn: "15초간 조립·조리·대기시간을 균형 강화", unlock: "기본 캐릭터" }, { id: "tiger", emoji: "🐅", ko: "칡때까치", en: "Tiger Shrike", role: "🔥 Cooking", passive: "조리속도 +10%", burn: "15초간 조리속도 +40%", unlock: "Stage 3 이상 ★★" }, { id: "brown", emoji: "🟤", ko: "노랑때까치", en: "Brown Shrike", role: "⚡ Combo", passive: "Combo가 높을수록 점수 증가", burn: "Burning 중 콤보 기반 보너스 강화", unlock: "Stage 6 Best Combo ×12" }, { id: "chinese-grey", emoji: "🩶", ko: "물때까치", en: "Chinese Grey Shrike", role: "⏱ Control", passive: "주문 제한시간 +10%", burn: "8초 주문 타이머 정지 + 7초 50% 감속", unlock: "Stage 15 ★★" }, { id: "long-tailed", emoji: "🐦", ko: "긴꼬리때까치", en: "Long-tailed Shrike", role: "🍢 Capacity", passive: "화구 +2, 조리속도 -10%", burn: "15초간 임시 화구 +2 + 조리속도 +20%", unlock: "Stage 18+ 3화구 동시 PERFECT 3회" }, { id: "northern", emoji: "🩶", ko: "재때까치", en: "Northern Shrike", role: "📈 Growth", passive: "스테이지 획득 XP +10%", burn: "15초간 기본 균형 강화", unlock: "Stage 30 ★★" }, { id: "grey-backed", emoji: "🏔️", ko: "회색등때까치", en: "Grey-backed Shrike", role: "🏔️ Altitude", passive: "고도 조리 페널티 50% 완화", burn: "Burning 동안 고도 페널티 제거 · 한기 페널티 제거", unlock: "Stage 40 ★★" }, { id: "isabelline", emoji: "🏜️", ko: "사막때까치", en: "Isabelline Shrike", role: "🪽 Migration", passive: "Migration Wave 중 점수 +20%", burn: "15초간 Migration/Rush 점수 +40%", unlock: "Stage 44 ★★" }, { id: "red-tailed", emoji: "🪽", ko: "붉은꼬리때까치", en: "Red-tailed Shrike", role: "⚡ Rush", passive: "Migration Wave 중 점수 +15%", burn: "15초간 조리속도 +25%", unlock: "Stage 50 ★★" }, { id: "great-grey", emoji: "🩶", ko: "초원때까치", en: "Great Grey Shrike", role: "🌍 Environment", passive: "유럽·북아프리카·서아시아 환경에 특화 예정", burn: "World 6에서 공개 예정", unlock: "World 6 예정" }]; shrikeDexList.innerHTML = ""; defs.forEach(d => { const open = devMode || save.unlockedShrikes.includes(d.id), card = document.createElement("article"); card.className = "dex-card" + (open ? "" : " locked"); card.innerHTML = open ? `<div class="dex-emoji dex-pixel-frame"><img class="shrike-pixel" src="assets/shrikes/${d.id}.svg" alt="${d.ko}"></div><div><b>${d.ko} <span>${d.en}</span></b><small>${d.role}</small><p><strong>Passive</strong> · ${d.passive}</p><p><strong>Burning</strong> · ${d.burn}</p><small>Unlock · ${d.unlock}</small></div>` : `<div class="dex-emoji">❔</div><div><b>LOCKED SHRIKE</b><small>${d.unlock}</small></div>`; shrikeDexList.appendChild(card); }); }
function updateHud() { scoreLabel.textContent = score.toLocaleString(); xpHudLabel.textContent = save.xp.toLocaleString(); comboLabel.textContent = `×${combo}`; bestComboLabel.textContent = `×${bestCombo}`; burnGaugeFill.style.width = `${burningGauge}%`; burnGaugeText.textContent = isBurning() ? "ACTIVE" : `${Math.round(burningGauge)}%`; burnButton.disabled = burningGauge < 100 || isBurning() || paused; }
function setStatus(t) { statusMessage.textContent = t; }
function judge(t, good) { floatingJudge.textContent = t; floatingJudge.style.color = good ? "var(--accent)" : "var(--danger)"; floatingJudge.classList.remove("pop"); void floatingJudge.offsetWidth; floatingJudge.classList.add("pop"); }
function showEvent(t) { eventBanner.textContent = t; eventBanner.classList.add("show"); setTimeout(() => eventBanner.classList.remove("show"), 2200); }
function shrikeName(id) { return id === "tiger" ? "🐅 칡때까치" : id === "brown" ? "🟤 노랑때까치" : id === "chinese-grey" ? "🩶 물때까치" : id === "long-tailed" ? "🐦 긴꼬리때까치" : id === "northern" ? "🩶 재때까치" : id === "grey-backed" ? "🏔️ 회색등때까치" : id === "isabelline" ? "🏜️ 사막때까치" : id === "red-tailed" ? "🪽 붉은꼬리때까치" : id === "great-grey" ? "🩶 초원때까치" : "🐦 때까치"; }
function flashKeyboardTarget(el) { if (!el)
    return; el.classList.remove("keyboard-hit"); void el.offsetWidth; el.classList.add("keyboard-hit"); setTimeout(() => el.classList.remove("keyboard-hit"), 180); }
function keyboardGuideOpen() { return keyboardGuideDialog.open; }
function toggleKeyboardGuide(force) { const shouldOpen = force !== null && force !== void 0 ? force : !keyboardGuideDialog.open; if (shouldOpen) {
    if (!keyboardGuideDialog.open)
        openDialog(keyboardGuideDialog);
}
else if (keyboardGuideDialog.open)
    closeDialog(keyboardGuideDialog); }
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
function clearSkewerKeyboard() { if (paused)
    return; currentSkewer = []; renderSkewer(); setStatus("꼬치를 비웠습니다."); }
function handleGameKeyboard(event) {
    if (event.ctrlKey || event.metaKey || event.altKey)
        return;
    const key = event.key.toLowerCase();
    // K and Escape remain available while the keyboard guide is open.
    if (key === "k") {
        event.preventDefault();
        toggleKeyboardGuide();
        return;
    }
    if (event.key === "Escape" && keyboardGuideOpen()) {
        event.preventDefault();
        toggleKeyboardGuide(false);
        return;
    }
    if (activeDialog())
        return;
    if (!running || gameScreen.classList.contains("hidden"))
        return;
    document.body.classList.add("keyboard-mode");
    if (key === "p") {
        event.preventDefault();
        togglePause();
        flashKeyboardTarget(pauseButton);
        return;
    }
    if (paused)
        return;
    const orderIndex = ORDER_KEYS.indexOf(event.key);
    if (orderIndex >= 0) {
        const order = orders[orderIndex];
        if (order) {
            event.preventDefault();
            selectOrder(order.id);
            flashKeyboardTarget(ordersEl.querySelector(`[data-order-id="${order.id}"]`));
        }
        return;
    }
    const foodIndex = FOOD_KEYS.indexOf(key);
    if (foodIndex >= 0) {
        const foodId = stageFoodPool()[foodIndex];
        if (foodId) {
            event.preventDefault();
            addFood(foodId);
            flashKeyboardTarget(foodButtonsEl.querySelector(`[data-food-id="${foodId}"]`));
        }
        return;
    }
    const burnerIndex = BURNER_KEYS.indexOf(key);
    if (burnerIndex >= 0) {
        if (burners[burnerIndex]) {
            event.preventDefault();
            clickBurner(burnerIndex);
            flashKeyboardTarget(burnersEl.querySelector(`[data-burner-index="${burnerIndex}"]`));
        }
        return;
    }
    if (event.code === "Space") {
        event.preventDefault();
        finishSkewer();
        flashKeyboardTarget(finishSkewerButton);
        return;
    }
    if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        clearSkewerKeyboard();
        flashKeyboardTarget(clearSkewerButton);
        return;
    }
    if (key === "b") {
        event.preventDefault();
        activateBurning();
        flashKeyboardTarget(burnButton);
        return;
    }
}
const coarsePointerQuery = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(pointer: coarse)");
const isCoarsePointer = () => Boolean(coarsePointerQuery === null || coarsePointerQuery === void 0 ? void 0 : coarsePointerQuery.matches);
function closeAllDialogs() { document.querySelectorAll("dialog[open]").forEach(dialog => { try {
    dialog.close();
}
catch {
    dialog.removeAttribute("open");
} }); }
function bindAdaptiveAction(el, action) {
    // Desktop uses the browser's native click activation. This keeps mouse, trackpad,
    // keyboard Enter/Space, focus and <dialog> behavior predictable. Touch keeps the
    // pointerdown path that fixed the iOS missed-tap issue in 0.5.2.1.
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
    container.addEventListener("pointerdown", event => {
        if (!isCoarsePointer())
            return;
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
    container.addEventListener("click", event => {
        if (isCoarsePointer())
            return;
        const target = event.target.closest(selector);
        if (!target)
            return;
        event.stopPropagation();
        action(target);
    });
}
bindDelegatedAdaptive(ordersEl, ".order-card[data-order-id]", target => selectOrder(Number(target.dataset.orderId)));
bindDelegatedAdaptive(burnersEl, ".burner[data-burner-index]", target => clickBurner(Number(target.dataset.burnerIndex)));
bindDelegatedAdaptive(foodButtonsEl, ".food-button[data-food-id]", target => addFood(target.dataset.foodId));
enterGameButton.onclick = () => coverScreen.classList.add("hidden");
world1Button.onclick = () => { selectedWorld = 1; if (selectedStage > 10)
    selectedStage = Math.min(10, save.unlockedStage); renderStages(); renderStageEcology(); };
world2Button.onclick = () => { if (!devMode && save.unlockedStage < 11)
    return; selectedWorld = 2; if (selectedStage < 11 || selectedStage > 20)
    selectedStage = (devMode ? 11 : Math.max(11, Math.min(20, save.unlockedStage))); renderStages(); renderStageEcology(); };
world3Button.onclick = () => { if (!devMode && save.unlockedStage < 21)
    return; selectedWorld = 3; if (selectedStage < 21 || selectedStage > 30)
    selectedStage = (devMode ? 21 : Math.max(21, Math.min(30, save.unlockedStage))); renderStages(); renderStageEcology(); };
world4Button.onclick = () => { if (!devMode && save.unlockedStage < 31)
    return; selectedWorld = 4; if (selectedStage < 31 || selectedStage > 40)
    selectedStage = (devMode ? 31 : Math.max(31, Math.min(40, save.unlockedStage))); renderStages(); renderStageEcology(); };
world5Button.onclick = () => { if (!devMode && save.unlockedStage < 41)
    return; selectedWorld = 5; if (selectedStage < 41 || selectedStage > 50)
    selectedStage = (devMode ? 41 : Math.max(41, Math.min(50, save.unlockedStage))); renderStages(); renderStageEcology(); };
startButton.onclick = startGame;
nextStageButton.onclick = () => { if (stage.id >= 40)
    return; const next = (stage.id + 1); if (!devMode && save.unlockedStage < next)
    return; selectedStage = next; selectedWorld = next > 30 ? 4 : next > 20 ? 3 : next > 10 ? 2 : 1; startGame(); };
restartButton.onclick = startGame;
backButton.onclick = () => { closeAllDialogs(); document.body.classList.remove("in-game"); resultScreen.classList.add("hidden"); gameScreen.classList.add("hidden"); startScreen.classList.remove("hidden"); renderMeta(); };
devModeButton.onclick = () => { setDevMode(!devMode); showEvent(devMode ? "🛠 DEV MODE ON · 모든 구현 콘텐츠 해금" : "🛠 DEV MODE OFF · 일반 진행도로 복귀"); };
resetSaveButton.onclick = () => { if (confirm("모든 Prototype 0.5 진행도, Bird Book과 업그레이드를 초기화할까요?")) {
    localStorage.removeItem(SAVE_KEY);
    save = defaultSave();
    selectedStage = 1;
    selectedWorld = 1;
    selectedShrike = "bull-headed";
    persist();
    setStatus("저장 데이터가 초기화되었습니다.");
} };
clearSkewerButton.setAttribute("aria-keyshortcuts", "Backspace Delete");
finishSkewerButton.setAttribute("aria-keyshortcuts", "Space");
burnButton.setAttribute("aria-keyshortcuts", "B");
pauseButton.setAttribute("aria-keyshortcuts", "P");
keyboardGuideGameButton.setAttribute("aria-keyshortcuts", "K");
bindAdaptiveAction(clearSkewerButton, () => { if (paused)
    return; currentSkewer = []; renderSkewer(); });
bindAdaptiveAction(finishSkewerButton, finishSkewer);
bindAdaptiveAction(burnButton, activateBurning);
bindAdaptiveAction(pauseButton, togglePause);
bindAdaptiveAction(quitButton, () => { closeAllDialogs(); document.body.classList.remove("in-game"); running = false; paused = false; cancelAnimationFrame(animationFrame); gameScreen.classList.add("hidden"); resultScreen.classList.add("hidden"); startScreen.classList.remove("hidden"); renderMeta(); });
keyboardGuideButton.onclick = () => toggleKeyboardGuide(true);
keyboardGuideGameButton.onclick = () => toggleKeyboardGuide(true);
closeKeyboardGuideButton.onclick = () => toggleKeyboardGuide(false);
document.addEventListener("keydown", handleGameKeyboard);
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
stage = stages[selectedStage];
weatherLabel.textContent = baseEnvironmentLabel();
renderFoodButtons();
renderSkewer();
resetBurners();
renderBurners();
