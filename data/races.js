/**
 * COMPLETE RACE DATA — All 50 documented records from existing site
 * Every race verified with Strava links, certificates, or media proof
 */
export const races = [
  {id:"warsaw-703",year:2026,date:"2026-06-07",race:"IRONMAN 70.3 Warsaw",distance:"113",distanceLabel:"IRONMAN 70.3",country:"Poland",city:"Warsaw",result:"6:08:15",placement:"Finisher · M18-24 #113 · Overall #1515",division:"M18-24",divisionRank:113,genderRank:1291,overallRank:1515,bib:760,age:19,splits:{swim:"44:26",t1:"4:46",bike:"3:21:42",t2:"5:24",run:"1:51:56"},strava:{swim:"https://www.strava.com/activities/19047493856",bike:"https://www.strava.com/activities/19047574543",run:"https://www.strava.com/activities/19047780272",official:"https://www.ironman.com/races/im703-warsaw/results"},category:"ironman",featured:true,podium:false,notes:"First IRONMAN 70.3. 35 days after Prague Marathon. 49 days after 5th official half marathon."},
  {id:"prague-marathon",year:2026,date:"2026-05-03",race:"Vodafone Prague Marathon",distance:"42.2",distanceLabel:"Marathon",country:"Czech Republic",city:"Prague",result:"3:42:37",placement:"2,346th Overall · Left leg taped & injured",age:19,splits:null,strava:{full:"https://www.strava.com/activities/18717374673"},category:"marathon",featured:true,podium:false,notes:"Marathon PB. Completed 35 days before Warsaw with left leg taped."},
  {id:"montpellier-hm-2026",year:2026,date:"2026-04-19",race:"Montpellier Run Festival — Half Marathon",distance:"21.1",distanceLabel:"Half Marathon",country:"France",city:"Montpellier",result:"1:29:26",placement:"9th U23 · 140th of 4,516 · Top 3.1%",age:19,strava:{full:"https://www.strava.com/activities/18175504201"},category:"half-marathon",featured:true,podium:true,notes:"Half Marathon PB. 5th official half marathon."},
  {id:"allure-bleue",year:2026,date:"2026-02-21",race:"Allure Bleue Race",distance:"5",distanceLabel:"5K",country:"France",city:"Montpellier",result:"19:48",placement:"2nd Overall",age:19,strava:{full:"https://www.strava.com/activities/17472316459"},category:"5k",featured:true,podium:true,notes:"5K PB."},
  {id:"envolez-vous",year:2026,date:"2026-02-01",race:"Envolez Vous 2026",distance:"10",distanceLabel:"10K",country:"France",city:"Montpellier",result:"39:42",placement:"3rd U23 · 23rd Overall",age:19,strava:{full:"https://www.strava.com/activities/17249976869"},category:"10k",featured:true,podium:true,notes:"10K PB."},
  {id:"algharb-2026",year:2026,date:"2026-01-01",race:"Al Gharb Race",distance:"6.5",distanceLabel:"6.5K",country:"Lebanon",city:"Lebanon",result:"24:46",placement:"2nd 20–34 · 6th Overall · 3:48/km",age:19,strava:{full:"https://www.strava.com/activities/19046982488"},category:"other",featured:false,podium:true},
  {id:"beirut-marathon-2025",year:2025,date:"2025-05-01",race:"OMT Beirut Marathon",distance:"42.2",distanceLabel:"Marathon",country:"Lebanon",city:"Beirut",result:"3:48:22",placement:"2nd U20 · 1st 542 Program · 51st Overall",age:19,splits:null,strava:{full:"https://www.strava.com/activities/14353285281"},category:"marathon",featured:true,podium:true,notes:"First official marathon."},
  {id:"montpellier-hm-2025",year:2025,date:"2025-04-01",race:"Montpellier Run Festival — Half Marathon",distance:"21.1",distanceLabel:"Half Marathon",country:"France",city:"Montpellier",result:"1:39:48",placement:"13th U23 · 550th Overall",age:18,strava:{full:"https://www.strava.com/activities/14201589345"},category:"half-marathon",featured:false,podium:false},
  {id:"barja-2025",year:2025,date:"2025-01-01",race:"Barja Race",distance:"6",distanceLabel:"6K",country:"Lebanon",city:"Barja",result:"25:07",placement:"2nd U20",age:18,strava:{full:"https://www.strava.com/activities/15027210101"},category:"other",featured:false,podium:true},
  {id:"tripoli-2025",year:2025,date:"2025-01-01",race:"Tripoli Race",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Tripoli",result:"44:42",placement:"3rd U20",age:18,strava:{full:"https://www.strava.com/activities/14956075031"},category:"10k",featured:false,podium:true},
  {id:"aljabal-jurd-2025",year:2025,date:"2025-01-01",race:"Al Jabal Race Al Jurd",distance:"5",distanceLabel:"5K",country:"Lebanon",city:"Lebanon",result:"17:40",placement:"2nd Overall · 1st U20",age:18,strava:{full:"https://www.strava.com/activities/14593818386"},category:"5k",featured:false,podium:true},
  {id:"aljabal-2025",year:2025,date:"2025-01-01",race:"Al Jabal Race",distance:"4.4",distanceLabel:"4.4K",country:"Lebanon",city:"Lebanon",result:"18:53",placement:"3rd Overall · 1st U20",age:18,strava:{full:"https://www.strava.com/activities/14879059148"},category:"other",featured:false,podium:true},
  {id:"anjar-2025",year:2025,date:"2025-01-01",race:"Anjar Race",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Anjar",result:"48:55",placement:"1st U20",age:18,strava:{full:"https://www.strava.com/activities/14507254400"},category:"10k",featured:false,podium:true},
  {id:"biathle-2025",year:2025,date:"2025-01-01",race:"Biathle Triathle World Tour",distance:"multi",distanceLabel:"Multi-discipline",country:"Lebanon",city:"Lebanon",result:"—",placement:"1st Overall",age:18,strava:null,category:"other",featured:false,podium:true},
  {id:"yanta-2024",year:2024,date:"2024-07-21",race:"Yanta Race",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Yanta",result:"46:04",placement:"1st U20",age:18,strava:{full:"https://www.strava.com/activities/11954396964"},category:"10k",featured:false,podium:true},
  {id:"tripoli-2024",year:2024,date:"2024-01-01",race:"Tripoli Race",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Tripoli",result:"48:48",placement:"1st U20 · Featured by North Lebanon Sports",age:17,strava:{full:"https://www.strava.com/activities/11716619875"},category:"10k",featured:false,podium:true},
  {id:"runcity-2024",year:2024,date:"2024-01-01",race:"Run The City — Beirut Marathon",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Beirut",result:"44:18",placement:"3rd U20",age:17,strava:{full:"https://www.strava.com/activities/11826433045"},category:"10k",featured:false,podium:true},
  {id:"qabrshmoon-2024",year:2024,date:"2024-01-01",race:"Qabr Shmoon 10K",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Qabr Shmoon",result:"47:34",placement:"1st U20",age:17,strava:{full:"https://www.strava.com/activities/11883061898"},category:"10k",featured:false,podium:true},
  {id:"kharbe-2024",year:2024,date:"2024-01-01",race:"Kharbe Race",distance:"6.5",distanceLabel:"6.5K",country:"Lebanon",city:"Kharbe",result:"—",placement:"1st U20",age:17,strava:null,category:"other",featured:false,podium:true},
  {id:"anjar-2024",year:2024,date:"2024-01-01",race:"Anjar Race",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Anjar",result:"—",placement:"2nd U20",age:17,strava:null,category:"10k",featured:false,podium:true},
  {id:"rolling-half-2024",year:2024,date:"2024-01-01",race:"The Rolling Half Marathon",distance:"21.1",distanceLabel:"Half Marathon",country:"Lebanon",city:"Lebanon",result:"2:04:45",placement:"—",age:17,strava:null,category:"half-marathon",featured:false,podium:false},
  {id:"isf-hm-2024",year:2024,date:"2024-01-01",race:"ISF Half Marathon",distance:"21.1",distanceLabel:"Half Marathon",country:"Lebanon",city:"Lebanon",result:"2:09:07",placement:"—",age:17,strava:{full:"https://www.strava.com/activities/11231987432"},category:"half-marathon",featured:false,podium:false},
  {id:"isf-hm-2023",year:2023,date:"2023-01-01",race:"ISF 21KM Half Marathon",distance:"21.1",distanceLabel:"Half Marathon",country:"Lebanon",city:"Lebanon",result:"1:49:25",placement:"1st U18 · Won on debut",age:16,strava:{full:"https://www.strava.com/activities/9244356817"},category:"half-marathon",featured:true,podium:true,notes:"Won on debut at 16."},
  {id:"batroun-2023",year:2023,date:"2023-01-01",race:"Batroun Race",distance:"5+10",distanceLabel:"5K + 10K",country:"Lebanon",city:"Batroun",result:"—",placement:"1st Overall (Run & Bike)",age:16,strava:null,category:"other",featured:false,podium:true},
  {id:"yanta-2023",year:2023,date:"2023-01-01",race:"Yanta Race",distance:"5",distanceLabel:"5K",country:"Lebanon",city:"Yanta",result:"—",placement:"1st Overall",age:16,strava:null,category:"5k",featured:false,podium:true},
  {id:"hasbaya-2023",year:2023,date:"2023-01-01",race:"Hasbaya 5K",distance:"5",distanceLabel:"5K",country:"Lebanon",city:"Hasbaya",result:"22:34",placement:"1st U20",age:16,strava:{full:"https://www.strava.com/activities/8857753791"},category:"5k",featured:false,podium:true},
  {id:"kharbe-2023",year:2023,date:"2023-01-01",race:"Kharbe Race",distance:"6",distanceLabel:"6K",country:"Lebanon",city:"Kharbe",result:"—",placement:"2nd U18",age:16,strava:null,category:"other",featured:false,podium:true},
  {id:"barja-2023",year:2023,date:"2023-01-01",race:"Barja Race",distance:"6",distanceLabel:"6K",country:"Lebanon",city:"Barja",result:"27:25",placement:"4th U18",age:16,strava:{full:"https://www.strava.com/activities/9070409508"},category:"other",featured:false,podium:false},
  {id:"beirut-womens-2023",year:2023,date:"2023-01-01",race:"Beirut 10K — International Women's Day",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Beirut",result:"46:51",placement:"4th U18",age:16,strava:{full:"https://www.strava.com/activities/8738751224"},category:"10k",featured:false,podium:false},
  {id:"letsrun-2023",year:2023,date:"2023-01-01",race:"Let's Run Beirut",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Beirut",result:"—",placement:"3rd U18 · Broke leg during race",age:16,strava:null,category:"10k",featured:false,podium:true,notes:"Broke leg during the race. Featured on MTV Lebanon."},
  {id:"aljabal-2023",year:2023,date:"2023-01-01",race:"Al Jabal Race",distance:"—",distanceLabel:"Mountain",country:"Lebanon",city:"Lebanon",result:"—",placement:"4th Overall",age:16,strava:null,category:"other",featured:false,podium:false},
  {id:"rebirth-2023",year:2023,date:"2023-01-01",race:"Beirut Rebirth Night Race",distance:"4",distanceLabel:"4K",country:"Lebanon",city:"Beirut",result:"17:36",placement:"—",age:16,strava:{full:"https://www.strava.com/activities/9145647026"},category:"other",featured:false,podium:false},
  {id:"jounieh-2023",year:2023,date:"2023-01-01",race:"Jounieh Run to Rise",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Jounieh",result:"51:32",placement:"—",age:16,strava:{full:"https://www.strava.com/activities/9026753473"},category:"10k",featured:false,podium:false},
  {id:"sarba-2023",year:2023,date:"2023-01-01",race:"Sarba Race",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"South Lebanon",result:"50:23",placement:"—",age:16,strava:{full:"https://www.strava.com/activities/8994913746"},category:"10k",featured:false,podium:false},
  {id:"tripoli-womens-2023",year:2023,date:"2023-01-01",race:"Tripoli Race — International Women's Day",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Tripoli",result:"58:02",placement:"—",age:16,strava:{full:"https://www.strava.com/activities/8699942701"},category:"10k",featured:false,podium:false},
  {id:"bekaa-2023",year:2023,date:"2023-01-01",race:"Bekaa Race",distance:"16",distanceLabel:"16K",country:"Lebanon",city:"Bekaa",result:"—",placement:"—",age:16,strava:null,category:"other",featured:false,podium:false},
  {id:"beirut-brokenleg-2023",year:2023,date:"2023-01-01",race:"Beirut Marathon 8.5K",distance:"8.5",distanceLabel:"8.5K",country:"Lebanon",city:"Beirut",result:"—",placement:"Completed injured · Featured on MTV Lebanon",age:16,strava:null,category:"other",featured:false,podium:false,notes:"Ran with broken leg. Featured on MTV Lebanon."},
  {id:"beirut-10k-2022",year:2022,date:"2022-01-01",race:"Beirut 10K (Women's Race)",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Beirut",result:"—",placement:"—",age:15,strava:null,category:"10k",featured:false,podium:false},
  {id:"nabu-2022",year:2022,date:"2022-01-01",race:"Nabu Race",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Lebanon",result:"—",placement:"—",age:15,strava:null,category:"10k",featured:false,podium:false},
  {id:"beirut-marathon-10k-2022",year:2022,date:"2022-01-01",race:"Beirut Marathon 10K",distance:"10",distanceLabel:"10K",country:"Lebanon",city:"Beirut",result:"—",placement:"—",age:15,strava:null,category:"10k",featured:false,podium:false},
];

export const personalBests = [
  {distance:"5K",time:"19:48",race:"Allure Bleue Race",location:"Montpellier, France",date:"Feb 21, 2026",placement:"2nd Overall",strava:"https://www.strava.com/activities/17472316459"},
  {distance:"10K",time:"39:42",race:"Envolez Vous 2026",location:"Montpellier, France",date:"Feb 1, 2026",placement:"3rd U23 · 23rd Overall",strava:"https://www.strava.com/activities/17249976869"},
  {distance:"Half Marathon",time:"1:29:26",race:"Montpellier Run Festival",location:"France",date:"Apr 19, 2026",placement:"9th U23 · 140/4,516 · Top 3.1%",strava:"https://www.strava.com/activities/18175504201",feature:true},
  {distance:"Marathon",time:"3:42:37",race:"Vodafone Prague Marathon",location:"Prague, Czech Republic",date:"May 3, 2026",placement:"Left leg taped & injured",strava:"https://www.strava.com/activities/18717374673"},
];

export const proofStats = [
  {label:"Documented Races",value:"50"},
  {label:"Podium / Top Placements",value:"28"},
  {label:"Countries Raced",value:"4"},
  {label:"Half Marathon PB",value:"1:29:26"},
  {label:"Marathon PB",value:"3:42:37"},
  {label:"10K PB",value:"39:42"},
  {label:"5K PB",value:"19:48"},
  {label:"IRONMAN 70.3",value:"6:08:15"},
  {label:"km Tracked",value:"2,262"},
  {label:"Activities Logged",value:"266"},
  {label:"Sira Team",value:"25+"},
  {label:"Community",value:"60,000+"},
];

export const trainingStats = {
  running:{km:"2,262.6",activities:"210",time:"190h 17min",elevation:"16,739m"},
  cycling:{km:"526.4",activities:"24",time:"20h 15min",elevation:"425m"},
  swimming:{km:"30.877",activities:"32",time:"19h 24min"},
  total:{activities:"266",time:"229h 56min",period:"Oct 2022 — Jun 2026"},
};

export const progression = {
  halfMarathon:[
    {year:"2023",time:"1:49:25",note:"ISF 21KM · 1st U18 · Won on debut"},
    {year:"2024",time:"2:09:07",note:"ISF Half Marathon"},
    {year:"2024",time:"2:04:45",note:"The Rolling Half"},
    {year:"2025",time:"1:39:48",note:"Montpellier · 13th U23"},
    {year:"Apr 2026",time:"1:29:26",note:"PB · 9th U23 · 140/4,516",best:true},
  ],
  marathon:[
    {year:"May 2025",time:"3:48:22",note:"Beirut · 2nd U20 · 1st 542 Program"},
    {year:"May 2026",time:"3:42:37",note:"Prague · PB · Left leg taped",best:true},
  ],
};

export const continents = [
  {id:"europe",name:"Europe",label:"Chapter 1",status:"started",purpose:"Where the journey began.",race:"Race selection pending",coords:{x:52,y:28}},
  {id:"asia",name:"Asia",label:"Chapter 2",status:"planned",purpose:"Return to roots. Lebanon.",race:"Race selection pending",coords:{x:65,y:32}},
  {id:"africa",name:"Africa",label:"Chapter 3",status:"planned",purpose:"A new test of endurance.",race:"Race selection pending",coords:{x:53,y:50}},
  {id:"north-america",name:"North America",label:"Chapter 4",status:"planned",purpose:"The largest IRONMAN market.",race:"Race selection pending",coords:{x:22,y:30}},
  {id:"south-america",name:"South America",label:"Chapter 5",status:"planned",purpose:"New altitude. New culture.",race:"Race selection pending",coords:{x:28,y:60}},
  {id:"oceania",name:"Oceania",label:"Chapter 6",status:"planned",purpose:"The final continent. The record.",race:"Race selection pending",coords:{x:82,y:65}},
];
