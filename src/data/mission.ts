export const site = {
  name: 'Toufic Abou Ali',
  identity: 'Lebanese Founder-Athlete',
  age: 20,
  email: 'protoufic@gmail.com',
  whatsapp: 'https://wa.me/96176923943?text=Hello%20Toufic%2C%20I%20would%20like%20to%20discuss%20a%20possible%20partnership%20for%20the%20Six%20Continents%20mission.',
  instagram: 'https://www.instagram.com/touficaa/',
  linkedin: 'https://www.linkedin.com/in/touficabouali',
  strava: 'https://www.strava.com/athletes/109556347',
  sira: 'https://siracareers.com',
  recordSource: 'https://www.guinnessworldrecords.com/world-records/764002-youngest-person-to-complete-an-ironman%C2%AE-triathlon-on-six-continents-male',
  ironmanSource: 'https://www.ironman.com/news/about-ironman',
};

export const mission = {
  headline: '6 continents. 6 full IRONMAN races. 1 world-record attempt.',
  distances: {
    swim: 3.8,
    bike: 180,
    run: 42.2,
    total: 226,
    swimTotal: 22.8,
    bikeTotal: 1080,
    runTotal: 253.2,
    missionTotal: 1356,
  },
  deadlines: {
    main: '2027-11-27T23:59:59+02:00',
    mainLabel: 'Main world-record target',
    extreme: '2027-06-13T23:59:59+02:00',
    extremeLabel: 'Extreme target: complete all six before turning 21',
  },
  benchmark: {
    holder: 'Taeyoung Lee',
    age: '21 years and 167 days',
    achieved: 'September 28, 2025',
  },
  recordStatus: 'Application and final rules pending',
  continents: [
    { name: 'North America', x: 22.5, y: 34, summary: 'One full IRONMAN chapter. Race selection is being secured.' },
    { name: 'South America', x: 31, y: 66, summary: 'One full IRONMAN chapter. Race selection is being secured.' },
    { name: 'Europe', x: 49.5, y: 31, summary: 'One full IRONMAN chapter. Race selection is being secured.' },
    { name: 'Africa', x: 52.5, y: 59, summary: 'One full IRONMAN chapter. Race selection is being secured.' },
    { name: 'Asia', x: 72.5, y: 41, summary: 'One full IRONMAN chapter. Race selection is being secured.' },
    { name: 'Oceania', x: 85.5, y: 70, summary: 'One full IRONMAN chapter. Race selection is being secured.' },
  ],
};

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
  { value: '25+', label: 'expert team members' },
  { value: '60,000+', label: 'empowered members' },
  { value: '12,000+', label: 'careers transformed' },
  { value: '1,850+', label: 'candidates hired' },
  { value: '7,281+', label: 'consultation calls' },
  { value: '150+', label: 'partnerships' },
];

export const quotes = [
  'I had many reasons to quit. I chose one reason not to.',
  'I trained my fitness. I did not train the sport.',
  'Toughness got me to the finish line. Execution will get me the result.',
  'The first race exposed the gap. The next one proves the work.',
  'Born in Lebanon. Building globally. Racing across six continents.',
];

export const media = {
  heroPoster: '/assets/img/mission/mission-first-frame.jpg',
  heroFinal: '/assets/img/mission/mission-final-frame.jpg',
  heroVideoDesktop: '/assets/media/mission-scroll-1080.mp4',
  heroVideoMobile: '/assets/media/mission-scroll-720.mp4',
  map: '/assets/img/mission/world-map-reference.png',
  missionFinal: '/assets/img/mission/map-final.webp',
  missionWide: '/assets/img/mission/map-wide.webp',
  flag: '/assets/img/mission/flag-frame.webp',
  founder: '/assets/img/identity/headshot.webp',
  founderWarsaw: '/assets/img/identity/founder-warsaw.webp',
  founderRunning: '/assets/img/identity/running.webp',
  siraWorkshops: '/assets/img/identity/sira-workshops.webp',
  guinness: '/assets/img/brand/guinness-world-records.png',
  warsaw: {
    finishLebanon: '/assets/img/warsaw/finish-lebanon.webp',
    finishWide: '/assets/img/warsaw/finish-wide.webp',
    finishUp: '/assets/img/warsaw/finish-up.webp',
    finishDown: '/assets/img/warsaw/finish-down.webp',
    postFlag: '/assets/img/warsaw/post-flag.webp',
    swimCap: '/assets/img/warsaw/swim-cap.webp',
    swimExit: '/assets/img/warsaw/swim-exit.webp',
    swimFocus: '/assets/img/warsaw/swim-focus.webp',
    t1: '/assets/img/warsaw/t1-run.webp',
    bikeCity: '/assets/img/warsaw/bike-city.webp',
    bikeCourse: '/assets/img/warsaw/bike-course.webp',
    run: '/assets/img/warsaw/run-course.webp',
    result: '/assets/img/warsaw/result.webp',
    finisherVideo: '/assets/media/warsaw-finisher-zone.mp4',
  },
};
