"use strict";
const SAVE_VERSION = 6;
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
    "ruddy-kingfisher": { id: "ruddy-kingfisher", name: "호반새", englishName: "Ruddy Kingfisher", scientificName: "Halcyon coromanda", emoji: "🐦", diet: { primary: ["frog", "lizard", "fish"], secondary: ["aquaticInsect", "beetle"], rare: ["mouse"], never: ["smallBird"] }, note: "숲과 물가가 만나는 곳에서 양서·파충류를 폭넓게 이용하는 특별 손님." }
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
    20: { id: 20, world: 2, icon: "⛈️", name: "폭풍우 치는 강", habitat: "World 2 Finale", duration: 190, maxOrders: 6, spawnMin: 1950, spawnMax: 3250, maxRecipeLength: 4, specialChance: .28, feedingTimeAt: 98, feedingDuration: 34, starScores: [4300, 6300], event: "STORM SERVICE", weather: [{ at: 28, duration: 25, type: "rain" }, { at: 70, duration: 24, type: "wind" }, { at: 116, duration: 20, type: "sun" }, { at: 148, duration: 28, type: "rain" }], guestPool: ["common-kingfisher", "little-egret", "black-crowned-night-heron", "common-sandpiper", "barn-swallow", "grey-headed-lapwing", "grey-heron", "ruddy-kingfisher"], foodAvailability: { fish: 1, frog: .95, aquaticInsect: 1, grasshopper: .65, beetle: .7, lizard: .55, mouse: .45, smallBird: .2 } }
};
const $ = (id) => document.getElementById(id);
const coverScreen = $("coverScreen"), enterGameButton = $("enterGameButton"), installAppButton = $("installAppButton");
const startScreen = $("startScreen"), gameScreen = $("gameScreen"), resultScreen = $("resultScreen");
const startButton = $("startButton"), restartButton = $("restartButton"), backButton = $("backButton"), quitButton = $("quitButton"), pauseButton = $("pauseButton");
const resetSaveButton = $("resetSaveButton"), finishSkewerButton = $("finishSkewerButton"), clearSkewerButton = $("clearSkewerButton"), burnButton = $("burnButton");
const helpButton = $("helpButton"), helpDialog = $("helpDialog"), closeHelpButton = $("closeHelpButton");
const restaurantButton = $("restaurantButton"), restaurantDialog = $("restaurantDialog"), closeRestaurantButton = $("closeRestaurantButton");
const birdBookButton = $("birdBookButton"), birdBookDialog = $("birdBookDialog"), closeBirdBookButton = $("closeBirdBookButton"), birdBookList = $("birdBookList");
const shrikeDexButton = $("shrikeDexButton"), shrikeDexDialog = $("shrikeDexDialog"), closeShrikeDexButton = $("closeShrikeDexButton"), shrikeDexList = $("shrikeDexList");
const ordersEl = $("orders"), burnersEl = $("burners"), skewerEl = $("skewer"), foodButtonsEl = $("foodButtons"), stageButtonsEl = $("stageButtons"), shrikeButtonsEl = $("shrikeButtons"), upgradeList = $("upgradeList");
const selectedOrderSummary = $("selectedOrderSummary"), statusMessage = $("statusMessage"), floatingJudge = $("floatingJudge"), eventBanner = $("eventBanner"), timeLabel = $("timeLabel"), scoreLabel = $("scoreLabel"), comboLabel = $("comboLabel"), bestComboLabel = $("bestComboLabel"), burnGaugeFill = $("burnGaugeFill"), burnGaugeText = $("burnGaugeText"), saveSummary = $("saveSummary"), currentStageLabel = $("currentStageLabel"), currentShrikeLabel = $("currentShrikeLabel"), stageEcology = $("stageEcology"), totalXpHeader = $("totalXpHeader"), careerStatsHeader = $("careerStatsHeader"), xpHudLabel = $("xpHudLabel"), resultTotalXp = $("resultTotalXp"), recordNotice = $("recordNotice"), weatherLabel = $("weatherLabel"), world1Button = $("world1Button"), world2Button = $("world2Button");
function defaultSave() { return { version: SAVE_VERSION, unlockedStage: 1, unlockedShrikes: ["bull-headed"], xp: 0, bestStars: {}, bestCombos: {}, bestScores: {}, upgrades: { branch: 0, fire: 0, perch: 0 }, discoveredBirds: [], stats: { plays: 0, served: 0, perfect: 0, failed: 0 } }; }
function loadSave() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw)
            return defaultSave();
        const parsed = JSON.parse(raw), base = defaultSave();
        const merged = { ...base, ...parsed, version: SAVE_VERSION,
            unlockedShrikes: Array.isArray(parsed.unlockedShrikes) ? parsed.unlockedShrikes.filter((x) => ["bull-headed", "tiger", "brown", "chinese-grey", "long-tailed"].includes(x)) : base.unlockedShrikes,
            bestStars: { ...base.bestStars, ...(parsed.bestStars || {}) }, bestCombos: { ...base.bestCombos, ...(parsed.bestCombos || {}) }, bestScores: { ...base.bestScores, ...(parsed.bestScores || {}) }, upgrades: { ...base.upgrades, ...(parsed.upgrades || {}) },
            discoveredBirds: Array.isArray(parsed.discoveredBirds) ? parsed.discoveredBirds.filter((x) => x in guests) : [], stats: { ...base.stats, ...(parsed.stats || {}) } };
        if (!merged.unlockedShrikes.includes("bull-headed"))
            merged.unlockedShrikes.unshift("bull-headed");
        merged.unlockedStage = Math.max(1, Math.min(20, Number(merged.unlockedStage) || 1));
        return merged;
    }
    catch {
        return defaultSave();
    }
}
function persist() { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); renderMeta(); }
let save = loadSave();
let selectedStage = Math.min(save.unlockedStage, 20);
let selectedWorld = selectedStage > 10 ? 2 : 1;
let selectedShrike = save.unlockedShrikes.includes("long-tailed") ? "long-tailed" : save.unlockedShrikes.includes("chinese-grey") ? "chinese-grey" : save.unlockedShrikes.includes("brown") ? "brown" : save.unlockedShrikes.includes("tiger") ? "tiger" : "bull-headed";
let stage = stages[selectedStage], orders = [], selectedOrderId = null, currentSkewer = [], pendingSkewer = null, burners = [];
let score = 0, combo = 0, bestCombo = 0, served = 0, perfectCount = 0, failed = 0, specialServed = 0;
let startedAt = 0, gameEndAt = 0, nextOrderAt = 0, orderSequence = 1, animationFrame = 0;
let running = false, paused = false, pausedAt = 0, burningGauge = 0, burningActiveUntil = 0, burningStartedAt = 0, feedingActiveUntil = 0, feedingTriggered = false, eventShown = false;
let currentWeather = "clear", weatherEndAt = 0, weatherTriggered = new Set(), lastFrameAt = 0, tripleBurnerPerfect = 0;
const rand = (a, b) => Math.random() * (b - a) + a;
const choice = (a) => a[Math.floor(Math.random() * a.length)];
const fmt = (s) => { const x = Math.max(0, Math.ceil(s)); return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`; };
const recipeEmoji = (r) => r.map(x => foods[x].emoji).join("");
const eq = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
const isBurning = () => Date.now() < burningActiveUntil, isFeeding = () => Date.now() < feedingActiveUntil, elapsed = () => running ? (Date.now() - startedAt) / 1000 : 0;
function weatherCookMult() { return currentWeather === "rain" ? .80 : currentWeather === "sun" ? 1.10 : 1; }
function cookMult() { let up = (1 + save.upgrades.fire * .03) * weatherCookMult(); if (selectedShrike === "tiger")
    return up * (isBurning() ? 1.40 : 1.10); if (selectedShrike === "long-tailed")
    return up * .90 * (isBurning() ? 1.20 : 1); if (selectedShrike === "bull-headed")
    return up * (isBurning() ? 1.20 : 1); return up * (isBurning() ? 1.12 : 1); }
function deadlineMult() { let m = 1 + save.upgrades.perch * .04; if (selectedShrike === "chinese-grey")
    m *= 1.10; if (selectedShrike === "bull-headed" && isBurning())
    m *= 1.15; return m; }
function totalCook(r) { return r.reduce((s, id) => s + foods[id].cookSeconds, 0) / cookMult(); }
function baseScore(r) { return r.reduce((s, id) => s + foods[id].score, 0); }
function stageFoodPool() { return Object.keys(stage.foodAvailability).filter(id => (stage.foodAvailability[id] || 0) > 0); }
function recipeLength() { const p = Math.min(1, elapsed() / stage.duration), r = Math.random(); if (stage.maxRecipeLength <= 3)
    return p < .45 ? (r < .55 ? 1 : 2) : (r < .15 ? 1 : r < .70 ? 2 : 3); return p < .3 ? (r < .35 ? 2 : 3) : (r < .15 ? 2 : r < .6 ? 3 : 4); }
function dietWeight(g, id) { if (g.diet.primary.includes(id))
    return 1; if (g.diet.secondary.includes(id))
    return .55; if (g.diet.rare.includes(id))
    return .18; if (g.diet.never.includes(id))
    return 0; return .08; }
function weightedFood(g) {
    const pool = stageFoodPool();
    const weighted = pool.map(id => ({ id, w: dietWeight(g, id) * (stage.foodAvailability[id] || 0) })).filter(x => x.w > 0);
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
function scheduleNext() { const wind = currentWeather === "wind" ? .72 : 1; nextOrderAt = Date.now() + rand(stage.spawnMin, stage.spawnMax) * (isFeeding() ? .46 : 1) * wind; }
function discoverBird(id) { if (save.discoveredBirds.includes(id))
    return; save.discoveredBirds.push(id); localStorage.setItem(SAVE_KEY, JSON.stringify(save)); showEvent(`✨ NEW BIRD · ${guests[id].name}`); renderMeta(); }
function spawnOrder(force = false) {
    const max = stage.maxOrders + save.upgrades.branch + (isFeeding() ? 1 : 0);
    if (!running || paused || (!force && orders.length >= max))
        return;
    const special = Math.random() < stage.specialChance;
    const guest = guests[choice(stage.guestPool)];
    const recipe = makeRecipe(guest, special);
    orders.push({ id: orderSequence++, guest, recipe, createdAt: Date.now(), deadlineSeconds: BASE_ORDER_DEADLINE * deadlineMult(), special });
    discoverBird(guest.id);
    if (selectedOrderId === null)
        selectedOrderId = orders[0].id;
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
function startGame() {
    document.body.classList.add("in-game");
    stage = stages[selectedStage];
    orders = [];
    selectedOrderId = null;
    currentSkewer = [];
    pendingSkewer = null;
    score = combo = bestCombo = served = perfectCount = failed = specialServed = tripleBurnerPerfect = 0;
    burningGauge = 0;
    burningActiveUntil = burningStartedAt = feedingActiveUntil = 0;
    feedingTriggered = eventShown = false;
    currentWeather = "clear";
    weatherEndAt = 0;
    weatherTriggered.clear();
    orderSequence = 1;
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
            weatherLabel.textContent = "☀️ 맑음";
            gameScreen.classList.remove("weather-rain", "weather-wind", "weather-sun");
        }
        (stage.weather || []).forEach((w, i) => { if (!weatherTriggered.has(i) && elapsed() >= w.at) {
            weatherTriggered.add(i);
            currentWeather = w.type;
            weatherEndAt = now + w.duration * 1000;
            gameScreen.classList.remove("weather-rain", "weather-wind", "weather-sun");
            gameScreen.classList.add(`weather-${w.type}`);
            weatherLabel.textContent = w.type === "rain" ? "🌧 비 · 조리 -20%" : w.type === "wind" ? "💨 바람 · 손님 유입 증가" : "☀️ 햇빛 · 조리 +10%";
            showEvent(weatherLabel.textContent || "WEATHER");
        } });
        syncBurners();
        if (now >= gameEndAt) {
            finishStage();
            return;
        }
        if (now >= nextOrderAt)
            spawnOrder();
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
function finishStage() { running = false; cancelAnimationFrame(animationFrame); const stars = score >= stage.starScores[1] ? 3 : score >= stage.starScores[0] ? 2 : score > 0 ? 1 : 0; const xpGain = Math.round(score * .10 + perfectCount * 8 + specialServed * 20 + stars * 50); const prevBest = save.bestScores[String(stage.id)] || 0, prevCombo = save.bestCombos[String(stage.id)] || 0, prevStars = save.bestStars[String(stage.id)] || 0; save.xp += xpGain; save.stats.plays++; save.stats.served += served; save.stats.perfect += perfectCount; save.stats.failed += failed; save.bestScores[String(stage.id)] = Math.max(prevBest, score); save.bestStars[String(stage.id)] = Math.max(prevStars, stars); save.bestCombos[String(stage.id)] = Math.max(prevCombo, bestCombo); if (stage.id < 20 && stars > 0)
    save.unlockedStage = Math.max(save.unlockedStage, (stage.id + 1)); const unlocked = []; if (stage.id >= 3 && stars >= 2 && !save.unlockedShrikes.includes("tiger")) {
    save.unlockedShrikes.push("tiger");
    unlocked.push("🐅 칡때까치 해금!");
} if ((save.bestCombos["6"] || 0) >= 12 && !save.unlockedShrikes.includes("brown")) {
    save.unlockedShrikes.push("brown");
    unlocked.push("🟤 노랑때까치 해금!");
} if (stage.id >= 15 && stars >= 2 && !save.unlockedShrikes.includes("chinese-grey")) {
    save.unlockedShrikes.push("chinese-grey");
    unlocked.push("🩶 물때까치 해금! · 주문 제한시간 +10%");
} if (stage.id >= 18 && tripleBurnerPerfect >= 3 && !save.unlockedShrikes.includes("long-tailed")) {
    save.unlockedShrikes.push("long-tailed");
    unlocked.push("🐦 긴꼬리때까치 해금! · 화구 +2");
} persist(); gameScreen.classList.add("hidden"); resultScreen.classList.remove("hidden"); $("resultStage").textContent = `Stage ${stage.id} · ${stage.name}`; $("resultStars").textContent = `${"★".repeat(stars)}${"☆".repeat(3 - stars)}`; $("resultScore").textContent = score.toLocaleString(); $("resultServed").textContent = String(served); $("resultPerfect").textContent = String(perfectCount); $("resultCombo").textContent = `×${bestCombo}`; $("resultFailed").textContent = String(failed); $("resultXp").textContent = `+${xpGain}`; resultTotalXp.textContent = save.xp.toLocaleString(); const records = []; if (score > prevBest)
    records.push(`🏆 최고점수 ${score.toLocaleString()}`); if (bestCombo > prevCombo)
    records.push(`🔥 최고 Combo ×${bestCombo}`); if (stars > prevStars)
    records.push(`⭐ 최고 별점 ${stars}`); recordNotice.textContent = records.length ? `NEW RECORD · ${records.join(" · ")}` : ""; $("unlockNotice").textContent = unlocked.join(" · ") || `Bird Book ${save.discoveredBirds.length}/${Object.keys(guests).length} · 진행도 저장 완료`; }
function expireOrder(id) { var _a, _b; const o = orders.find(x => x.id === id); if (!o)
    return; orders = orders.filter(x => x.id !== id); failed++; combo = 0; if (selectedOrderId === id)
    selectedOrderId = (_b = (_a = orders[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null; if ((pendingSkewer === null || pendingSkewer === void 0 ? void 0 : pendingSkewer.orderId) === id)
    pendingSkewer = null; judge("TOO LATE", false); renderSelected(); }
function selectOrder(id) { if (paused)
    return; selectedOrderId = id; currentSkewer = []; pendingSkewer = null; renderSkewer(); renderSelected(); renderOrders(); setStatus("주문 선택. 재료를 같은 순서로 꽂으세요."); }
function addFood(id) { if (paused)
    return; if (!selectedOrderId) {
    setStatus("먼저 주문을 선택하세요.");
    return;
} if (currentSkewer.length >= 4)
    return; currentSkewer.push(id); renderSkewer(); }
function finishSkewer() { if (paused)
    return; const order = orders.find(o => o.id === selectedOrderId); if (!order) {
    setStatus("주문을 선택하세요.");
    return;
} if (!eq(currentSkewer, order.recipe)) {
    combo = 0;
    failed++;
    burningGauge = Math.max(0, burningGauge - 10);
    judge("WRONG ORDER", false);
    setStatus("순서가 틀렸습니다. 다시 조립하세요.");
    currentSkewer = [];
    renderSkewer();
    return;
} pendingSkewer = { orderId: order.id, recipe: [...currentSkewer] }; currentSkewer = []; renderSkewer(); setStatus("꼬치 완성! 빈 화구를 클릭하세요."); }
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
function serveBurner(b) { var _a, _b; const order = orders.find(o => o.id === b.orderId); if (!order) {
    resetBurner(b);
    return;
} const perfect = b.state === "ready", specialMult = order.special ? 2 : 1, comboMult = 1 + Math.min(combo, 20) * .03; let pts = Math.round(baseScore(order.recipe) * 10 * specialMult * comboMult); if (!perfect)
    pts = Math.round(pts * .55); if (selectedShrike === "brown")
    pts = Math.round(pts * (1 + Math.min(.15, combo * .015))); score += pts; served++; if (order.special)
    specialServed++; if (perfect) {
    if (burners.filter(x => x.state !== "empty").length >= 3)
        tripleBurnerPerfect++;
    combo++;
    perfectCount++;
    burningGauge = Math.min(100, burningGauge + 14 + (order.special ? 8 : 0));
    judge(order.special ? `SPECIAL PERFECT +${pts}` : `PERFECT +${pts}`, true);
}
else {
    combo = 0;
    failed++;
    judge(`OVERCOOKED +${pts}`, false);
} bestCombo = Math.max(bestCombo, combo); orders = orders.filter(o => o.id !== order.id); if (selectedOrderId === order.id)
    selectedOrderId = (_b = (_a = orders[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null; resetBurner(b); renderSelected(); setStatus(perfect ? "깔끔한 서빙!" : "조금 탔지만 서빙했습니다."); }
function resetBurner(b) { b.state = "empty"; b.orderId = null; b.recipe = []; b.startedAt = b.cookSeconds = b.readyAt = 0; }
function activateBurning() { if (paused || burningGauge < 100 || isBurning())
    return; const now = Date.now(); burningGauge = 0; burningStartedAt = now; burningActiveUntil = now + 15000; syncBurners(); showEvent(`🔥 ${shrikeName(selectedShrike)} BURNING!`); setStatus(selectedShrike === "tiger" ? "조리속도 +40%!" : selectedShrike === "brown" ? "콤보 점수 가속!" : selectedShrike === "chinese-grey" ? "8초 주문 타이머 정지 → 7초 절반 속도!" : selectedShrike === "long-tailed" ? "임시 화구 +2 · 조리 +20%!" : "균형 강화!"); }
function renderAll() { renderMeta(); renderFoodButtons(); renderSkewer(); renderOrders(); renderBurners(); renderSelected(); updateHud(); }
function renderMeta() { const totalStars = Object.values(save.bestStars).reduce((a, b) => a + b, 0); saveSummary.innerHTML = `<div class="career-grid"><div><span>누적 XP</span><strong>${save.xp.toLocaleString()}</strong></div><div><span>총 플레이</span><strong>${save.stats.plays}</strong></div><div><span>누적 서빙</span><strong>${save.stats.served}</strong></div><div><span>PERFECT</span><strong>${save.stats.perfect}</strong></div></div><p>Stage ${save.unlockedStage}/20 · Shrikes ${save.unlockedShrikes.length}/5 · Bird Book ${save.discoveredBirds.length}/${Object.keys(guests).length} · Stars ${totalStars}/60</p>`; totalXpHeader.textContent = `${save.xp.toLocaleString()} XP`; careerStatsHeader.textContent = `${save.stats.plays}회 플레이 · ${save.stats.served}명 서빙`; xpHudLabel.textContent = save.xp.toLocaleString(); renderStages(); renderShrikes(); renderUpgrades(); renderStageEcology(); }
function renderStages() { var _a; stageButtonsEl.innerHTML = ""; world1Button.classList.toggle("selected", selectedWorld === 1); world2Button.classList.toggle("selected", selectedWorld === 2); world2Button.disabled = save.unlockedStage < 11; const start = selectedWorld === 1 ? 1 : 11, end = selectedWorld === 1 ? 10 : 20; for (let i = start; i <= end; i++) {
    const id = i, c = stages[id], btn = document.createElement("button");
    btn.className = "stage-card" + (selectedStage === id ? " selected" : "");
    btn.disabled = id > save.unlockedStage;
    const stars = save.bestStars[String(id)] || 0, bc = save.bestCombos[String(id)] || 0;
    const bs = save.bestScores[String(id)] || 0;
    btn.innerHTML = `<span class="stage-icon">${c.icon}</span><b>${id}. ${c.name}</b><small>${c.habitat}</small><span class="stage-stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</span><small class="stage-record">Best ${bs.toLocaleString()} · Combo ×${bc}</small><small>손님 ${c.guestPool.length}종${((_a = c.weather) === null || _a === void 0 ? void 0 : _a.length) ? " · 🌦 날씨" : ""}</small>`;
    btn.onclick = () => { selectedStage = id; renderStages(); renderStageEcology(); };
    stageButtonsEl.appendChild(btn);
} }
function renderStageEcology() { const c = stages[selectedStage]; const foodsSorted = stageFoodEntries(c).slice(0, 5).map(([id, v]) => `${foods[id].emoji}${foods[id].name} ${Math.round(v * 100)}%`).join(" · "); const guestNames = c.guestPool.slice(0, 5).map(id => guests[id].name).join(" · "); const wx = (c.weather || []).map(w => `${w.type === "rain" ? "🌧 비" : w.type === "wind" ? "💨 바람" : "☀️ 햇빛"} ${w.duration}s`).join(" · ") || "고정 날씨"; stageEcology.innerHTML = `<div><span class="eco-label">${c.icon} HABITAT</span><b>${c.habitat}</b><p>World ${c.world}</p></div><div><span class="eco-label">🍽 FOOD AVAILABILITY</span><p>${foodsSorted}</p></div><div><span class="eco-label">🐦 EXPECTED GUESTS</span><p>${guestNames}${c.guestPool.length > 5 ? " 외" : ""}</p></div><div><span class="eco-label">🌦 WEATHER</span><p>${wx}</p></div>`; }
function stageFoodEntries(c) { return Object.entries(c.foodAvailability).sort((a, b) => b[1] - a[1]); }
function renderShrikes() { const defs = [{ id: "bull-headed", emoji: "🐦", name: "때까치", desc: "균형형 · Burning 시 전반 강화", unlock: "기본" }, { id: "tiger", emoji: "🐅", name: "칡때까치", desc: "조리속도 +10%", unlock: "Stage 3 이상에서 ★★ 달성" }, { id: "brown", emoji: "🟤", name: "노랑때까치", desc: "Combo가 높을수록 점수 증가", unlock: "Stage 6에서 Best Combo ×12" }, { id: "chinese-grey", emoji: "🩶", name: "물때까치", desc: "주문 제한시간 +10% · 시간 제어 Burning", unlock: "Stage 15 ★★" }, { id: "long-tailed", emoji: "🐦", name: "긴꼬리때까치", desc: "화구 +2 · 조리속도 -10%", unlock: "Stage 18+에서 3화구 동시 PERFECT 3회" }]; shrikeButtonsEl.innerHTML = ""; defs.forEach(d => { const btn = document.createElement("button"); btn.className = "select-card" + (selectedShrike === d.id ? " selected" : ""); btn.disabled = !save.unlockedShrikes.includes(d.id); btn.innerHTML = `<b>${d.emoji} ${d.name}</b><span>${d.desc}</span><small>${btn.disabled ? `LOCKED · ${d.unlock}` : "사용 가능"}</small>`; btn.onclick = () => { selectedShrike = d.id; renderShrikes(); }; shrikeButtonsEl.appendChild(btn); }); }
function upgradeCost(id) { return 250 + save.upgrades[id] * 250; }
function renderUpgrades() { const defs = [{ id: "branch", name: "🌿 나뭇가지", desc: "동시 주문 +1 / Lv", max: 2 }, { id: "fire", name: "🔥 좋은 장작", desc: "조리속도 +3% / Lv", max: 5 }, { id: "perch", name: "🪺 편안한 횃대", desc: "주문 대기시간 +4% / Lv", max: 5 }]; upgradeList.innerHTML = ""; defs.forEach(d => { const lv = save.upgrades[d.id], cost = upgradeCost(d.id), card = document.createElement("div"); card.className = "upgrade-card"; card.innerHTML = `<div><b>${d.name} · Lv.${lv}/${d.max}</b><small>${d.desc}</small></div>`; const btn = document.createElement("button"); btn.className = "primary-button"; btn.textContent = lv >= d.max ? "MAX" : `${cost} XP`; btn.disabled = lv >= d.max || save.xp < cost; btn.onclick = () => { if (save.xp >= cost && lv < d.max) {
    save.xp -= cost;
    save.upgrades[d.id]++;
    persist();
    renderUpgrades();
} }; card.appendChild(btn); upgradeList.appendChild(card); }); }
function renderFoodButtons() { foodButtonsEl.innerHTML = ""; stageFoodPool().forEach(id => { const f = foods[id], btn = document.createElement("button"); btn.className = "food-button"; btn.innerHTML = `<span>${f.emoji}</span>${f.name}<small>${f.cookSeconds}s</small>`; btn.onclick = () => addFood(id); foodButtonsEl.appendChild(btn); }); foodButtonsEl.style.gridTemplateColumns = `repeat(${Math.min(5, Math.max(3, stageFoodPool().length))},1fr)`; }
function renderSkewer() { skewerEl.innerHTML = currentSkewer.length ? currentSkewer.map(id => `<span class="skewer-item">${foods[id].emoji}</span>`).join("") : `<span class="empty-skewer">재료를 순서대로 꽂으세요</span>`; }
function renderSelected() { const o = orders.find(x => x.id === selectedOrderId); selectedOrderSummary.innerHTML = o ? `${o.guest.emoji} <b>${o.guest.name}</b> · <span class="recipe-inline">${recipeEmoji(o.recipe)}</span>${o.special ? " · ⭐ SPECIAL" : ""}` : "주문을 선택하세요"; }
function renderOrders() { const now = Date.now(); ordersEl.innerHTML = ""; orders.forEach(o => { const left = o.deadlineSeconds - (now - o.createdAt) / 1000, p = Math.max(0, Math.min(100, left / o.deadlineSeconds * 100)), btn = document.createElement("button"); btn.className = `order-card${selectedOrderId === o.id ? " selected" : ""}${left < 10 ? " urgent" : ""}${o.special ? " special" : ""}`; btn.innerHTML = `${o.special ? '<span class="special-badge">SPECIAL ×2</span>' : ""}<span class="bird">${o.guest.emoji}</span><div class="name">${o.guest.name}</div><div class="bird-en">${o.guest.englishName}</div><div class="recipe">${recipeEmoji(o.recipe)}</div><div class="timer"><span>남은 시간</span><strong>${Math.max(0, left).toFixed(1)}s</strong></div><div class="order-progress" style="width:${p}%"></div>`; btn.dataset.orderId = String(o.id); ordersEl.appendChild(btn); }); if (!orders.length)
    ordersEl.innerHTML = '<div class="hint">다음 손님을 기다리는 중...</div>'; }
function renderBurners() { const now = Date.now(); burnersEl.innerHTML = ""; burners.forEach(b => { const btn = document.createElement("button"); btn.className = `burner ${b.state}`; let state = "빈 화구", pct = 0; if (b.state === "cooking") {
    const e = (now - b.startedAt) / 1000;
    pct = Math.min(100, e / b.cookSeconds * 100);
    state = `조리 중 ${Math.max(0, b.cookSeconds - e).toFixed(1)}s`;
} if (b.state === "ready") {
    pct = 100;
    state = "READY · 클릭해 서빙";
} if (b.state === "overcooked") {
    pct = 100;
    state = "OVERCOOKED · 지금 서빙";
} btn.innerHTML = `<span class="flame">🔥</span><div class="burner-title">화구 ${b.index + 1}</div><div class="burner-recipe">${b.recipe.length ? recipeEmoji(b.recipe) : "EMPTY"}</div><div class="burner-state">${state}</div><div class="cook-bar"><div class="cook-fill" style="width:${pct}%"></div></div>`; btn.dataset.burnerIndex = String(b.index); burnersEl.appendChild(btn); }); }
function renderBirdBook() { birdBookList.innerHTML = ""; Object.keys(guests).forEach(id => { const g = guests[id], seen = save.discoveredBirds.includes(id), card = document.createElement("article"); card.className = "bird-card" + (seen ? "" : " locked"); if (!seen) {
    card.innerHTML = `<div class="bird-card-emoji">❔</div><div><b>미발견 조류</b><small>World 1에서 만나보세요.</small></div>`;
}
else {
    const primary = g.diet.primary.map(x => foods[x].emoji + foods[x].name).join(" · "), secondary = g.diet.secondary.slice(0, 3).map(x => foods[x].emoji + foods[x].name).join(" · ");
    card.innerHTML = `<div class="bird-card-emoji">${g.emoji}</div><div><b>${g.name} <span>${g.englishName}</span></b><i>${g.scientificName}</i><p>${g.note}</p><small>주요 먹이 · ${primary}</small>${secondary ? `<small>보조 먹이 · ${secondary}</small>` : ""}</div>`;
} birdBookList.appendChild(card); }); }
function renderShrikeDex() { const defs = [{ id: "bull-headed", emoji: "🐦", ko: "때까치", en: "Bull-headed Shrike", role: "⚖️ Balance", passive: "기본 능력 없음", burn: "15초간 조립·조리·대기시간을 균형 강화", unlock: "기본 캐릭터" }, { id: "tiger", emoji: "🐅", ko: "칡때까치", en: "Tiger Shrike", role: "🔥 Cooking", passive: "조리속도 +10%", burn: "15초간 조리속도 +40%", unlock: "Stage 3 이상 ★★" }, { id: "brown", emoji: "🟤", ko: "노랑때까치", en: "Brown Shrike", role: "⚡ Combo", passive: "Combo가 높을수록 점수 증가", burn: "Burning 중 콤보 기반 보너스 강화", unlock: "Stage 6 Best Combo ×12" }, { id: "chinese-grey", emoji: "🩶", ko: "물때까치", en: "Chinese Grey Shrike", role: "⏱ Control", passive: "주문 제한시간 +10%", burn: "8초 주문 타이머 정지 + 7초 50% 감속", unlock: "Stage 15 ★★" }, { id: "long-tailed", emoji: "🐦", ko: "긴꼬리때까치", en: "Long-tailed Shrike", role: "🍢 Capacity", passive: "화구 +2, 조리속도 -10%", burn: "15초간 임시 화구 +2 + 조리속도 +20%", unlock: "Stage 18+ 3화구 동시 PERFECT 3회" }]; shrikeDexList.innerHTML = ""; defs.forEach(d => { const open = save.unlockedShrikes.includes(d.id), card = document.createElement("article"); card.className = "dex-card" + (open ? "" : " locked"); card.innerHTML = open ? `<div class="dex-emoji">${d.emoji}</div><div><b>${d.ko} <span>${d.en}</span></b><small>${d.role}</small><p><strong>Passive</strong> · ${d.passive}</p><p><strong>Burning</strong> · ${d.burn}</p><small>Unlock · ${d.unlock}</small></div>` : `<div class="dex-emoji">❔</div><div><b>LOCKED SHRIKE</b><small>${d.unlock}</small></div>`; shrikeDexList.appendChild(card); }); }
function updateHud() { scoreLabel.textContent = score.toLocaleString(); xpHudLabel.textContent = save.xp.toLocaleString(); comboLabel.textContent = `×${combo}`; bestComboLabel.textContent = `×${bestCombo}`; burnGaugeFill.style.width = `${burningGauge}%`; burnGaugeText.textContent = isBurning() ? "ACTIVE" : `${Math.round(burningGauge)}%`; burnButton.disabled = burningGauge < 100 || isBurning() || paused; }
function setStatus(t) { statusMessage.textContent = t; }
function judge(t, good) { floatingJudge.textContent = t; floatingJudge.style.color = good ? "var(--accent)" : "var(--danger)"; floatingJudge.classList.remove("pop"); void floatingJudge.offsetWidth; floatingJudge.classList.add("pop"); }
function showEvent(t) { eventBanner.textContent = t; eventBanner.classList.add("show"); setTimeout(() => eventBanner.classList.remove("show"), 2200); }
function shrikeName(id) { return id === "tiger" ? "🐅 칡때까치" : id === "brown" ? "🟤 노랑때까치" : id === "chinese-grey" ? "🩶 물때까치" : id === "long-tailed" ? "🐦 긴꼬리때까치" : "🐦 때까치"; }
ordersEl.addEventListener("pointerdown", event => { const target = event.target.closest(".order-card[data-order-id]"); if (!target)
    return; event.preventDefault(); selectOrder(Number(target.dataset.orderId)); });
burnersEl.addEventListener("pointerdown", event => { const target = event.target.closest(".burner[data-burner-index]"); if (!target)
    return; event.preventDefault(); clickBurner(Number(target.dataset.burnerIndex)); });
enterGameButton.onclick = () => coverScreen.classList.add("hidden");
world1Button.onclick = () => { selectedWorld = 1; if (selectedStage > 10)
    selectedStage = Math.min(10, save.unlockedStage); renderStages(); renderStageEcology(); };
world2Button.onclick = () => { if (save.unlockedStage < 11)
    return; selectedWorld = 2; if (selectedStage < 11)
    selectedStage = Math.max(11, Math.min(20, save.unlockedStage)); renderStages(); renderStageEcology(); };
startButton.onclick = startGame;
restartButton.onclick = startGame;
backButton.onclick = () => { document.body.classList.remove("in-game"); resultScreen.classList.add("hidden"); startScreen.classList.remove("hidden"); renderMeta(); };
quitButton.onclick = () => { document.body.classList.remove("in-game"); running = false; paused = false; cancelAnimationFrame(animationFrame); gameScreen.classList.add("hidden"); startScreen.classList.remove("hidden"); renderMeta(); };
pauseButton.onclick = togglePause;
resetSaveButton.onclick = () => { if (confirm("모든 Prototype 0.5 진행도, Bird Book과 업그레이드를 초기화할까요?")) {
    localStorage.removeItem(SAVE_KEY);
    save = defaultSave();
    selectedStage = 1;
    selectedWorld = 1;
    selectedShrike = "bull-headed";
    persist();
    setStatus("저장 데이터가 초기화되었습니다.");
} };
clearSkewerButton.onclick = () => { if (paused)
    return; currentSkewer = []; renderSkewer(); };
finishSkewerButton.onclick = finishSkewer;
burnButton.onclick = activateBurning;
helpButton.onclick = () => helpDialog.showModal();
closeHelpButton.onclick = () => helpDialog.close();
restaurantButton.onclick = () => { renderUpgrades(); restaurantDialog.showModal(); };
closeRestaurantButton.onclick = () => restaurantDialog.close();
birdBookButton.onclick = () => { renderBirdBook(); birdBookDialog.showModal(); };
closeBirdBookButton.onclick = () => birdBookDialog.close();
shrikeDexButton.onclick = () => { renderShrikeDex(); shrikeDexDialog.showModal(); };
closeShrikeDexButton.onclick = () => shrikeDexDialog.close();
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
window.addEventListener("beforeunload", () => { if (running)
    persist(); });
renderMeta();
stage = stages[selectedStage];
weatherLabel.textContent = "☀️ 맑음";
renderFoodButtons();
renderSkewer();
resetBurners();
renderBurners();
