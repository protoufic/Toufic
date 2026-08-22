export const site = {
  name: 'Toufic Abou Ali',
  identity: 'Lebanese founder and athlete',
  age: 20,
  email: 'protoufic@gmail.com',
  whatsapp: 'https://wa.me/96176923943?text=Hello%20Toufic%2C%20I%20would%20like%20to%20discuss%20a%20possible%20partnership%20for%20the%20Six%20Continents%20World%20Record%20mission.',
  instagram: 'https://www.instagram.com/touficaa/',
  linkedin: 'https://www.linkedin.com/in/touficabouali',
  strava: 'https://www.strava.com/athletes/109556347',
  federationFeature: 'https://www.instagram.com/p/DZXwxDAonHS/',
  sira: 'https://siracareers.com',
  recordSource: 'https://www.guinnessworldrecords.com/world-records/764002-youngest-person-to-complete-an-ironman%C2%AE-triathlon-on-six-continents-male',
  ironmanSource: 'https://www.ironman.com/news/about-ironman',
};

export const mission = {
  headline: '6 full distance IRONMAN races. 6 continents. 1 world record attempt.',
  name: 'Six Continents World Record',
  recordTitle: 'Youngest person to complete an IRONMAN® triathlon on six continents (male)',
  applicationStatus: 'Application accepted • Guidelines issued 5 August 2026 • Pending Evidence',
  disclaimer: 'No record is claimed. Recognition depends on completing the attempt and passing Guinness World Records’ evidence review.',
  distances: {
    swim: 3.85,
    bike: 180,
    run: 42.19,
    total: 226.04,
    swimTotal: 23.1,
    bikeTotal: 1080,
    runTotal: 253.14,
    missionTotal: 1356.24,
  },
  deadlines: {
    main: '2027-06-14T00:00:00+03:00',
    mainLabel: 'Time left to finish before turning 21',
  },
  benchmark: {
    holder: 'Taeyoung Lee',
    age: '21 years and 167 days',
    achieved: 'September 28, 2025',
  },
  recordStatus: 'Application accepted • Guidelines issued 5 August 2026 • Pending Evidence',
  continents: [
    { name: 'North America', x: 20.0, y: 38.8, race: 'Jacksonville, United States', date: '16 May 2027', status: 'Preferred route · Being secured', secured: false, summary: 'Jacksonville is the preferred North America race. A flexible backup protects the attempt if the final combination must change.' },
    { name: 'South America', x: 30.5, y: 66.8, race: 'San Juan, Argentina', date: '1 November 2026', status: 'Entry secured', secured: true, summary: 'San Juan is the opening race and the first full distance chapter of the mission.' },
    { name: 'Europe', x: 49.0, y: 36.0, race: 'Hamburg, Germany', date: '6 June 2027', status: 'Preferred route · Being secured', secured: false, summary: 'Hamburg is the preferred final race, eight days before Toufic turns 21. A flexible backup route protects the deadline.' },
    { name: 'Africa', x: 53.7, y: 63.0, race: 'South Africa', date: '18 April 2027', status: 'Entry secured', secured: true, summary: 'South Africa is the fourth secured race and the African chapter of the attempt.' },
    { name: 'Asia', x: 75.5, y: 40.5, race: 'Oman', date: '5 December 2026', status: 'Entry secured', secured: true, summary: 'Oman is the second secured race, five weeks after the opening chapter in Argentina.' },
    { name: 'Australasia', x: 85.0, y: 73.5, race: 'New Zealand', date: '6 March 2027', status: 'Entry secured', secured: true, summary: 'New Zealand is the third secured race and begins the final four month push to the deadline.' },
  ],
};

export const preferredRoute = [
  { number: '01', continent: 'South America', race: 'San Juan', country: 'Argentina', date: '1 Nov 2026', status: 'Entry secured', secured: true },
  { number: '02', continent: 'Asia', race: 'Oman', country: 'Oman', date: '5 Dec 2026', status: 'Entry secured', secured: true },
  { number: '03', continent: 'Australasia', race: 'New Zealand', country: 'New Zealand', date: '6 Mar 2027', status: 'Entry secured', secured: true },
  { number: '04', continent: 'Africa', race: 'South Africa', country: 'South Africa', date: '18 Apr 2027', status: 'Entry secured', secured: true },
  { number: '05', continent: 'North America', race: 'Jacksonville', country: 'United States', date: '16 May 2027', status: 'Being secured', secured: false },
  { number: '06', continent: 'Europe', race: 'Hamburg', country: 'Germany', date: '6 Jun 2027', status: 'Being secured', secured: false },
];

export const warsawRace = {
  date: 'June 7, 2026',
  total: '6:08:15',
  bib: '760',
  division: 'M18–24',
  divisionRank: '113',
  genderRank: '1,291',
  overallRank: '1,515',
  splits: {
    swim: '44:26',
    t1: '4:46',
    bike: '3:21:42',
    t2: '5:24',
    run: '1:51:56',
  },
  links: {
    official: 'https://www.ironman.com/races/im703-warsaw/results',
    swim: 'https://www.strava.com/activities/19047493856',
    bike: 'https://www.strava.com/activities/19047574543',
    run: 'https://www.strava.com/activities/19047780272',
    photos: 'https://drive.google.com/drive/folders/10jMQ54OlpboTtlp_i8Pkc3VhA-_lUzt1',
    videos: 'https://drive.google.com/drive/folders/1kO5ab9jcbeG9-M8piuXP_rxBhctjHfDz',
  },
};

export const siraMetrics = [
  { value: '25', label: 'team members' },
  { value: '60K+', label: 'WhatsApp community' },
  { value: '120K+', label: 'job seeker database' },
  { value: '900+', label: 'interviews created' },
  { value: '300', label: 'job offers' },
  { value: '150+', label: 'people landed jobs' },
  { value: '140+', label: 'workshops delivered' },
  { value: '5K+', label: 'workshop attendees' },
  { value: '15M+', label: 'content impressions' },
];

export const quotes = [
  'I had many reasons to quit. I chose one reason not to.',
  'I trained my fitness. I did not train the sport.',
  'Toughness got me to the finish line. Execution will get me the result.',
  'The first race exposed the gap. The next one proves the work.',
  'Born in Lebanon. Building globally. Racing across six continents.',
];

export const media = {
  sceneOne: {
    poster: '/assets/img/mission/scene-01-poster.webp',
  },
  sceneTwo: {
    poster: '/assets/img/mission/scene-02-poster.webp',
  },
  sceneThree: {
    final: '/assets/img/mission/scene-03-final.webp',
  },
  map: '/assets/img/mission/world-map-dark.webp',
  missionWide: '/assets/img/mission/mission-page-cover.webp',
  partnerCover: '/assets/img/warsaw/finish-lebanon.webp',
  founder: '/assets/img/identity/headshot.webp',
  founderWarsaw: '/assets/img/identity/founder-warsaw.webp',
  founderRunning: '/assets/img/identity/running.webp',
  guinness: '/assets/img/brand/guinness-world-records-transparent.png',
  warsaw: {
    finishLebanon: '/assets/img/warsaw/finish-lebanon.webp',
    finishWide: '/assets/img/warsaw/finish-wide.webp',
    finishUp: '/assets/img/warsaw/finish-up.webp',
    finishDown: '/assets/img/warsaw/finish-down.webp',
    postFlag: '/assets/img/warsaw/post-flag.webp',
    swimExit: '/assets/img/warsaw/swim-exit.webp',
    t1: '/assets/img/warsaw/t1-run.webp',
    bikeCourse: '/assets/img/warsaw/bike-course.webp',
    run: '/assets/img/warsaw/run-course.webp',
    result: '/assets/img/warsaw/result.webp',
    preBikeHold: '/assets/img/warsaw/pre-bike-hold.webp',
    preBikeStand: '/assets/img/warsaw/pre-bike-stand.webp',
  },
};
