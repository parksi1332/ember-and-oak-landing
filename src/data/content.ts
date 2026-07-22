// Copy is the Korean translation (C1 01_content_brief.md "한국어 번역본 (revision 2)"),
// applied verbatim — no ad-hoc rewording, no abridging. Brand name EMBER & OAK stays as-is.
// Ranges use `~` per C1's stated convention (no hyphen ranges).

import cherriesPicked from "../assets/images/cherries-picked.jpg";
import greenBeansScoop from "../assets/images/green-beans-scoop.jpg";
import beansSea from "../assets/images/beans-sea.jpg";
import roastBeanLight from "../assets/images/roast-bean-light.jpg";
import roastBeanMedium from "../assets/images/roast-bean-medium.jpg";
import roastBeanDark from "../assets/images/roast-bean-dark.jpg";

export const nav = {
  logo: "EMBER & OAK",
  links: [
    { label: "산지", href: "#origins" },
    { label: "로스팅", href: "#roast" },
    { label: "브루잉", href: "#brew" },
    { label: "브랜드 이야기", href: "#our-story" },
    { label: "스토어", href: "#shop" },
  ],
  cta: "원두 구매하기",
};

export const hero = {
  eyebrow: "소량 배치 · 첫 크랙에서 시작된 이야기",
  headline: "산이 멈춘 곳에서, 우리의 로스팅이 시작됩니다.",
  sub: "모든 원두는 해발 1,500m 화산 비탈에서 첫 크랙 200°C까지 여정을 거칩니다 — 한 알 한 알 맛볼 수 있을 만큼 작은 배치로, 손으로 굽습니다.",
  cta1: "이번 주 로스팅 원두 만나기",
  cta2: "로스팅 지켜보기",
};

export const story = {
  label: "브랜드 이야기",
  title: "커피는 제품이 아니라, 과정입니다.",
  body: "대부분의 원두는 톤 단위로 볶여 잊혀집니다. 우리는 느린 길을 택합니다. 생두는 아직 농장의 향을 머금은 채, 종이 자루에 담겨 우리 문 앞에 도착합니다. 우리는 모든 로트를 커핑하고, 로스팅 커브를 손으로 그리며, 드럼 앞에 서서 크랙 소리에 귀를 기울입니다. 그렇게 나온 커피는 두 번 다시 같지 않습니다 — 그리고 바로 그 점이 핵심입니다.",
};

export const origins = {
  label: "원두가 자라는 곳",
  title: "최고의 커피는 희박한 공기 속에서 자랍니다.",
  body: "해발 1,200m 위에서는 체리가 천천히 익습니다. 서늘한 밤과 희박한 공기가 열매의 시간을 딱 그만큼 늦춰, 당은 응축되고 씨앗은 조밀해집니다 — 향미는 바로 그 밀도 속에 깃듭니다. 우리는 이름을 부를 수 있는 농장에서, 해발 1,200~1,800m 고지대 로트만을 소싱합니다.",
  mapCaption: "커피 벨트 · 1,200~1,800m",
  cards: [
    {
      country: "에티오피아",
      region: "예가체프",
      altitude: "1,900m",
      notes: "블루베리, 재스민, 베르가못",
      accent: "var(--org-ethiopia)",
      image: cherriesPicked,
      imageAlt: "나무의 초록 잎 사이로 갓 수확한 붉은 커피 체리를 두 손에 담은 모습",
      pin: { top: "34%", left: "56%" },
    },
    {
      country: "콜롬비아",
      region: "우일라",
      altitude: "1,600m",
      notes: "카라멜, 홍사과, 코코아",
      accent: "var(--org-colombia)",
      image: greenBeansScoop,
      imageAlt: "나무 스쿱으로 삼베 자루 속 생두를 퍼내는 모습",
      pin: { top: "58%", left: "27%" },
    },
    {
      country: "케냐",
      region: "니에리",
      altitude: "1,750m",
      notes: "블랙커런트, 토마토, 사탕수수",
      accent: "var(--org-kenya)",
      image: beansSea,
      imageAlt: "햇볕에 넓게 펼쳐 말리는 잘 익은 커피 체리",
      pin: { top: "46%", left: "58%" },
    },
  ],
};

export const roast = {
  label: "우리의 로스팅",
  title: "첫 크랙에서 마지막 1도까지.",
  body: "로스팅은 열과 나누는 대화입니다. 약 200°C에서 원두는 첫 크랙을 맞습니다 — 원두가 활짝 열리고, 진짜 결정이 시작되는 순간이죠. 일찍 배출하면 과일향과 산미가 남고, 조금 더 머물면 당이 카라멜화되어 바디와 깊이가 생깁니다. 세 가지 프로파일을 슬라이더로 옮기며 원두가 변하는 모습을 지켜보세요.",
  levels: [
    {
      key: "light",
      name: "라이트",
      temp: "196~205°C",
      time: "6~9분",
      notes: "과일향 · 산미",
      color: "var(--roast-light)",
      weight: 300,
      image: roastBeanLight,
    },
    {
      key: "medium",
      name: "미디엄",
      temp: "210~219°C",
      time: "7~11분",
      notes: "단맛 · 균형",
      color: "var(--roast-medium)",
      weight: 600,
      image: roastBeanMedium,
    },
    {
      key: "dark",
      name: "다크",
      temp: "225~245°C",
      time: "12~15분",
      notes: "바디 · 카라멜",
      color: "var(--roast-dark)",
      weight: 700,
      image: roastBeanDark,
    },
  ],
};

export const data = {
  label: "숫자로 보기",
  title: "소량 배치, 1도까지 계량하다.",
  body: "이 안에 짐작으로 만든 것은 없습니다. 모든 한 잔은 숫자 위에 놓입니다 — 자란 고도, 크랙이 일어난 온도, 추출한 비율까지. 이번 주 당신이 마실 가장 느린 커피, 그 뒤에 숨은 과학을 소개합니다.",
};

export const ig1 = {
  title: "로스트 레벨, 세 가지 비교",
  firstCrack: 200,
  axisMin: 190,
  axisMax: 250,
  rows: [
    { key: "light", name: "라이트", tempMin: 196, tempMax: 205, time: "6~9분", tag: "과일향 · 산미", color: "var(--roast-light)" },
    { key: "medium", name: "미디엄", tempMin: 210, tempMax: 219, time: "7~11분", tag: "단맛 · 균형", color: "var(--roast-medium)" },
    { key: "dark", name: "다크", tempMin: 225, tempMax: 245, time: "12~15분", tag: "바디 · 카라멜", color: "var(--roast-dark)" },
  ],
};

export const ig2 = {
  title: "재배 고도 스케일",
  axisMin: 1000,
  axisMax: 2000,
  bandMin: 1200,
  bandMax: 1800,
  label: "고도 ↑ = 생두 밀도 ↑ = 향미 화합물 ↑",
  pins: [
    { name: "예가체프", altitude: 1900, color: "var(--org-ethiopia)" },
    { name: "니에리", altitude: 1750, color: "var(--org-kenya)" },
    { name: "우일라", altitude: 1600, color: "var(--org-colombia)" },
  ],
};

export const ig3 = {
  title: "골든 레이쇼 브루잉 다이얼",
  ratio: "1 : 16",
  tempMin: 92,
  tempMax: 96,
  gaugeMin: 80,
  gaugeMax: 100,
  tds: "TDS 1.15~1.35%",
  unit: "커피 : 물",
  under: "과소추출",
  optimal: "최적 추출대",
  over: "과다추출",
};

export const ig4 = {
  title: "시장 성장",
  from: { year: 2025, value: 111.5 },
  to: { year: 2033, value: 251.7 },
  cagr: "CAGR 10.8%",
  ageShare: { label: "18~24세", value: 32.3 },
  regionShare: { label: "북미", value: 50.7 },
};

export const brew = {
  label: "제대로 내리기",
  title: "커피 1g, 물 16g, 그리고 좋은 아침 하나.",
  body: "원두를 잘 고른 순간, 어려운 부분은 이미 끝났습니다. 나머지는 비율의 문제입니다. 커피 1, 물 16의 비율로 계량하고, 92~96°C로 붓고, 4분을 기다리세요. 그게 바로 골든컵입니다 — 하마터면 살 뻔했던 에스프레소 머신보다 훨씬 쉽습니다.",
  mediaTag: "드립 블룸",
  steps: [
    { num: "01", name: "도징", detail: "커피 20g, 중간~가는 분쇄", atSeconds: 0 },
    { num: "02", name: "블룸", detail: "94°C 물 40g, 30초 대기", atSeconds: 30 },
    { num: "03", name: "푸어", detail: "320g까지 채우고, 3:30에 마무리", atSeconds: 210 },
  ],
  totalSeconds: 210,
  timerStart: "브루잉 시작",
  timerResume: "다시 시작",
  timerPause: "일시정지",
  timerReset: "초기화",
};

export const shop = {
  title: "이번 주 로스팅을 맛보세요.",
  body: "우리는 소량 배치로 볶고, 크랙 후 48시간 안에 배송합니다. 원하는 원두를 고르거나, 구독을 신청해 2주마다 갓 볶은 원두를 문 앞으로 받아보세요 — 언제나 이름이 붙고, 언제나 날짜가 적히며, 선반에 방치되는 법이 없습니다.",
  cta1: "싱글 오리진 둘러보기",
  cta2: "구독 시작하기",
  trust: [
    { icon: "package" as const, label: "주문 후 로스팅" },
    { icon: "truck" as const, label: "48시간 내 배송" },
    { icon: "coffee" as const, label: "$40 이상 무료배송" },
  ],
};

export const footer = {
  tagline: "EMBER & OAK — 산이 멈춘 곳에서 볶습니다.",
  columns: [
    { title: "스토어", links: ["싱글 오리진", "구독", "장비"] },
    { title: "배우기", links: ["산지", "로스팅", "브루잉"] },
    { title: "회사", links: ["브랜드 이야기", "지속가능성", "문의"] },
  ],
  newsletterTitle: "드롭 소식 받기.",
  newsletterSub: "새 로스팅이 나올 때 딱 한 통. 그 외엔 없습니다.",
  newsletterEmailLabel: "이메일 주소",
  newsletterSubmit: "구독하기",
  newsletterThanks: "감사합니다 — 받은편지함을 확인해주세요.",
  copyright: "© 2026 Ember & Oak Roasters",
  marquee: "소량 배치 · 주문 후 로스팅 · 48시간 내 배송 · ",
  sourcesLabel: "데이터 출처",
  sources: [
    "Grand View Research — Specialty Coffee Market Report",
    "Sweet Maria's — Use All Five Senses to Determine Degree of Roast",
    "notNot Coffee — Coffee Roasting Time & Temperature Chart",
    "Coffee Hero — Altitude & the V60 Golden Ratio",
    "Methodical Coffee — Coffee-to-Water Ratio Guide",
    "Daily Rise Coffee — SCA Brewing Standards",
  ],
};
