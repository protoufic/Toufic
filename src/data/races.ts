// Detailed race and proof database
// This is the central source of truth for the website

export type ProofStatus =
  | "Verified"
  | "Verified placing"
  | "Proof reviewed"
  | "Tracked"
  | "Documented"
  | "GPS incomplete"
  | "Proof pending";

export type LinkType = "proof" | "strava" | "media" | "official";

export interface RaceLink {
  label: string;
  url: string;
  type: LinkType;
}

export interface Race {
  id: string;
  year: number;
  name: string;
  date: string;
  location: string;
  country: string;
  discipline: string;
  distance: string;
  time: string;
  result: string;
  status: ProofStatus;
  note: string;
  images: string[];
  links: RaceLink[];
  featured: boolean;
  podium: boolean;
  order: number;
  sourceSummary: string;
}

export const races: Race[] = [
  {
    year: 2022,
    name: "Beirut 10K Women's Race",
    distance: "10K",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Documented",
    note: "Early race-history entry.",
    id: "2022-beirut-10k-women-s-race",
    date: "2022",
    location: "Beirut, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 0,
    sourceSummary: "Race archive"
  },
  {
    year: 2022,
    name: "Nabu Race",
    distance: "10K",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Documented",
    note: "Early race-history entry.",
    id: "2022-nabu-race",
    date: "2022",
    location: "Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 1,
    sourceSummary: "Race archive"
  },
  {
    year: 2022,
    name: "Beirut Marathon",
    distance: "10K",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified",
    note: "Certificate and pacing document available.",
    id: "2022-beirut-marathon",
    date: "2022",
    location: "Beirut, Lebanon",
    images: [],
    links: [
      {
        label: "Pacing document",
        url: "https://drive.google.com/file/d/1rSXZRRMbWwzPyZoMzF9E8i2gaIWUuwdm/view",
        type: "proof"
      },
      {
        label: "Certificate",
        url: "https://drive.google.com/file/d/1Uiy4RLExR921spJcokm0PHPFn8DWE_cN/view",
        type: "proof"
      }
    ],
    featured: false,
    podium: false,
    order: 2,
    sourceSummary: "Pacing document · Certificate"
  },
  {
    year: 2023,
    name: "Barja Race",
    distance: "6K",
    time: "27:25 tracked",
    result: "1st U18",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 6.309 km.",
    id: "2023-barja-race",
    date: "2023",
    location: "Barja, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/9070409508",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 3,
    sourceSummary: "Strava activity"
  },
  {
    year: 2023,
    name: "Batroun Multisport Race",
    distance: "5K run + 10K bike",
    time: "—",
    result: "1st overall — 10K bike",
    country: "Lebanon",
    discipline: "Multisport",
    status: "Proof reviewed",
    note: "A run and bike multisport event. The confirmed public result shown here is the 10K bike win.",
    id: "2023-batroun-multisport-race",
    date: "2023",
    location: "Batroun, Lebanon",
    images: [],
    links: [
      {
        label: "View proof",
        url: "https://drive.google.com/file/d/1Wbitsd12WCQq7eGjPyzy8UOvR6Ph85kk/view",
        type: "proof"
      }
    ],
    featured: false,
    podium: true,
    order: 4,
    sourceSummary: "View proof"
  },
  {
    year: 2023,
    name: "Kharbe Race",
    distance: "6K race · 6.13K tracked",
    time: "22:52 tracked",
    result: "2nd U18",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified",
    note: "Placement proof available.",
    id: "2023-kharbe-race",
    date: "2023",
    location: "Kharbe, Lebanon",
    images: [],
    links: [
      {
        label: "Placement proof",
        url: "https://drive.google.com/file/d/16M5ECdzUF4-fdbijPctmg5ftALNHA0pO/view",
        type: "proof"
      }
    ],
    featured: false,
    podium: true,
    order: 5,
    sourceSummary: "Placement proof"
  },
  {
    year: 2023,
    name: "Beirut Rebirth",
    distance: "4K",
    time: "17:36 tracked",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 4.202 km.",
    id: "2023-beirut-rebirth",
    date: "2023",
    location: "Beirut, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/9145647026",
        type: "strava"
      }
    ],
    featured: false,
    podium: false,
    order: 6,
    sourceSummary: "Strava activity"
  },
  {
    year: 2023,
    name: "Etihad / Lebanese Athletics Federation",
    distance: "3000m",
    time: "11:58",
    result: "8th",
    country: "Lebanon",
    discipline: "Track",
    status: "Documented",
    note: "U20 competition.",
    id: "2023-etihad-lebanese-athletics-federation",
    date: "2023",
    location: "Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 7,
    sourceSummary: "Race archive"
  },
  {
    year: 2023,
    name: "Beirut 10K Women's Race",
    distance: "10K",
    time: "46:51 official",
    result: "4th U18",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava moving time: 46:58.",
    id: "2023-beirut-10k-women-s-race",
    date: "2023",
    location: "Beirut, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/8738751224",
        type: "strava"
      }
    ],
    featured: false,
    podium: false,
    order: 8,
    sourceSummary: "Strava activity"
  },
  {
    year: 2023,
    name: "Hasbaya 5K",
    distance: "5K",
    time: "22:34 tracked",
    result: "1st U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 4.819 km.",
    id: "2023-hasbaya-5k",
    date: "2023",
    location: "Hasbaya, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/8857753791",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 9,
    sourceSummary: "Strava activity"
  },
  {
    year: 2023,
    name: "ISF Half Marathon",
    distance: "Half marathon",
    time: "20.00 km tracked in 1:49:25",
    result: "1st U18",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified placing",
    note: "The activity did not record the full half-marathon distance, so 1:49:25 is not presented as an official half-marathon result.",
    id: "2023-isf-half-marathon",
    date: "2023",
    location: "Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/9244356817",
        type: "strava"
      },
      {
        label: "Race video",
        url: "https://drive.google.com/file/d/19f3iBEP61NYeUJm9q3ojovNpnOSHSqa5/view",
        type: "media"
      }
    ],
    featured: true,
    podium: true,
    order: 10,
    sourceSummary: "Strava activity · Race video"
  },
  {
    year: 2023,
    name: "Jounieh Run to Rise",
    distance: "10K",
    time: "51:32 tracked",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 10.299 km.",
    id: "2023-jounieh-run-to-rise",
    date: "2023",
    location: "Jounieh, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/9026753473",
        type: "strava"
      }
    ],
    featured: false,
    podium: false,
    order: 11,
    sourceSummary: "Strava activity"
  },
  {
    year: 2023,
    name: "Al Jabal Race",
    distance: "Unknown",
    time: "Unknown",
    result: "4th overall - archive claim",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Keep in the complete archive, but do not use the placement in headline totals until reliable proof is linked.",
    id: "2023-al-jabal-race-archive",
    date: "2023",
    location: "Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 12,
    sourceSummary: "Detailed race archive; proof still required"
  },
  {
    year: 2023,
    name: "Let's Run Beirut",
    distance: "10K",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Race documented in the archive; no public placement proof is linked yet.",
    id: "2023-let-s-run-beirut",
    date: "2023",
    location: "Beirut, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 13,
    sourceSummary: "Race archive"
  },
  {
    year: 2023,
    name: "Sarba Race",
    distance: "10K",
    time: "50:23 tracked",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 10.002 km.",
    id: "2023-sarba-race",
    date: "2023",
    location: "Sarba, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/8994913746",
        type: "strava"
      }
    ],
    featured: false,
    podium: false,
    order: 14,
    sourceSummary: "Strava activity"
  },
  {
    year: 2023,
    name: "Tripoli Race",
    distance: "10K",
    time: "58:02 tracked",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Likely activity match; Strava recorded 11.577 km.",
    id: "2023-tripoli-race",
    date: "2023",
    location: "Tripoli, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/8699942701",
        type: "strava"
      }
    ],
    featured: false,
    podium: false,
    order: 15,
    sourceSummary: "Strava activity"
  },
  {
    year: 2023,
    name: "Yanta Race",
    distance: "5K",
    time: "—",
    result: "1st overall",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Documented in the race archive; public proof link still needed.",
    id: "2023-yanta-race",
    date: "2023",
    location: "Yanta, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: true,
    order: 16,
    sourceSummary: "Photo proof"
  },
  {
    year: 2023,
    name: "Bekaa Race",
    distance: "16K",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Completed before the leg fracture.",
    id: "2023-bekaa-race",
    date: "2023",
    location: "Bekaa, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 17,
    sourceSummary: "Photo proof"
  },
  {
    year: 2023,
    name: "Beirut Marathon",
    distance: "8.5K event entry",
    time: "—",
    result: "Completed while recovering from a broken leg",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified",
    note: "Featured for running 10K with a broken leg. Certificate, race video and MTV interview are linked.",
    id: "2023-beirut-marathon",
    date: "2023",
    location: "Beirut, Lebanon",
    images: [],
    links: [
      {
        label: "Pacing document",
        url: "https://drive.google.com/file/d/1YVeVrXoB6nvQ1_2YOFuA90TqxNdd-uK9/view",
        type: "proof"
      },
      {
        label: "Certificate",
        url: "https://drive.google.com/file/d/1qPQ5et4JEW1H9rbbPpixwn5y1WaN7lKX/view",
        type: "proof"
      },
      {
        label: "Beirut Marathon feature",
        url: "https://www.instagram.com/p/C7dydJ9o-rX",
        type: "media"
      },
      {
        label: "MTV interview",
        url: "https://drive.google.com/file/d/1W_I4RUVhz04VKROsbZ7kSvHRx3eSAiA4/view",
        type: "media"
      },
      {
        label: "Race video",
        url: "https://drive.google.com/file/d/1l3xM8-kKrCTFT1z15XUr3Eipa9FsWx6x/view",
        type: "media"
      }
    ],
    featured: false,
    podium: false,
    order: 18,
    sourceSummary: "Pacing document · Certificate · Beirut Marathon feature"
  },
  {
    year: 2023,
    name: "Mayfuq Race",
    distance: "Unknown",
    time: "Unknown",
    result: "Documented archive entry",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Include in the complete archive. Do not publish a time or placement until proof is added.",
    id: "2023-mayfuq-race",
    date: "2023",
    location: "Mayfuq, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 19,
    sourceSummary: "Detailed race archive; proof still required"
  },
  {
    year: 2024,
    name: "Anjar Race",
    distance: "10K",
    time: "—",
    result: "2nd U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Documented result.",
    id: "2024-anjar-race",
    date: "2024",
    location: "Anjar, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: true,
    order: 20,
    sourceSummary: "Race archive"
  },
  {
    year: 2024,
    name: "Barja Race & Etihad U14–18",
    distance: "6.3K",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Documented",
    note: "Race-history entry.",
    id: "2024-barja-race-and-etihad-u14-18",
    date: "2024",
    location: "Barja, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 21,
    sourceSummary: "Race archive"
  },
  {
    year: 2024,
    name: "Etihad / Lebanese Athletics Federation",
    distance: "3000m",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Track",
    status: "Documented",
    note: "U20 track competition.",
    id: "2024-etihad-lebanese-athletics-federation",
    date: "2024",
    location: "Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 22,
    sourceSummary: "Race archive"
  },
  {
    year: 2024,
    name: "Hasbaya 5K",
    distance: "5K",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Documented",
    note: "Race-history entry.",
    id: "2024-hasbaya-5k",
    date: "2024",
    location: "Hasbaya, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 23,
    sourceSummary: "Race archive"
  },
  {
    year: 2024,
    name: "ISF Half Marathon",
    distance: "21K",
    time: "2:09:07 tracked",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 21.616 km.",
    id: "2024-isf-half-marathon",
    date: "2024",
    location: "Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/11231987432",
        type: "strava"
      }
    ],
    featured: false,
    podium: false,
    order: 24,
    sourceSummary: "Strava activity"
  },
  {
    year: 2024,
    name: "Kharbe Race",
    distance: "6.5K",
    time: "—",
    result: "1st U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified",
    note: "Podium photo in the proof archive.",
    id: "2024-kharbe-race",
    date: "2024",
    location: "Kharbe, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: true,
    order: 25,
    sourceSummary: "Photo proof"
  },
  {
    year: 2024,
    name: "Qabr Shmoon Race",
    distance: "10K",
    time: "47:34 tracked",
    result: "1st U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 10.322 km.",
    id: "2024-qabr-shmoon-race",
    date: "2024",
    location: "Qabr Shmoon, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/11883061898",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 26,
    sourceSummary: "Strava activity"
  },
  {
    year: 2024,
    name: "Run The City — Beirut Marathon",
    distance: "10K",
    time: "44:18 tracked",
    result: "3rd U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified",
    note: "Certificate and pacing document available.",
    id: "2024-run-the-city-beirut-marathon",
    date: "2024",
    location: "Beirut, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/11826433045",
        type: "strava"
      },
      {
        label: "Pacing document",
        url: "https://drive.google.com/file/d/12JMhGaAAIHJuZwoNH8t6WJsZXNwXHi2n/view",
        type: "proof"
      },
      {
        label: "Certificate",
        url: "https://drive.google.com/file/d/1Q80Efpetn8CSOgmwG--M49GJNg3dsxbF/view",
        type: "proof"
      }
    ],
    featured: false,
    podium: true,
    order: 27,
    sourceSummary: "Strava activity · Pacing document · Certificate"
  },
  {
    year: 2024,
    name: "The Rolling Half",
    distance: "21K",
    time: "—",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified",
    note: "Certificate and pacing document available.",
    id: "2024-the-rolling-half",
    date: "2024",
    location: "Lebanon",
    images: [],
    links: [
      {
        label: "Pacing document",
        url: "https://drive.google.com/file/d/1rpjmRpoqYfHDBbnAd5xPx3Zyg5Id812h/view",
        type: "proof"
      },
      {
        label: "Certificate",
        url: "https://drive.google.com/file/d/1kcznqT8kcoaPfIbmgu7v9xdbmwEG5-EX/view",
        type: "proof"
      }
    ],
    featured: false,
    podium: false,
    order: 28,
    sourceSummary: "Pacing document · Certificate"
  },
  {
    year: 2024,
    name: "Tripoli Race",
    distance: "10K",
    time: "48:48 tracked",
    result: "1st U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Featured by North Lebanon Sports.",
    id: "2024-tripoli-race",
    date: "2024",
    location: "Tripoli, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/11716619875",
        type: "strava"
      },
      {
        label: "North Lebanon Sports feature",
        url: "https://www.instagram.com/reel/C8lQcxLoLO8/",
        type: "media"
      }
    ],
    featured: false,
    podium: true,
    order: 29,
    sourceSummary: "Strava activity · North Lebanon Sports feature"
  },
  {
    year: 2024,
    name: "Yanta Race",
    distance: "10K",
    time: "46:04 in activity title",
    result: "1st U20",
    country: "Lebanon",
    discipline: "Run",
    status: "GPS incomplete",
    note: "The saved GPS recording is incomplete. The activity title records 46:04.",
    id: "2024-yanta-race",
    date: "2024",
    location: "Yanta, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/11954396964",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 30,
    sourceSummary: "Strava activity"
  },
  {
    year: 2024,
    name: "Hossam Badreddine Race",
    distance: "Unknown",
    time: "Unknown",
    result: "Documented archive entry",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Include in the complete archive. Do not publish a time or placement until proof is added.",
    id: "2024-hossam-badreddine-race",
    date: "2024",
    location: "Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 31,
    sourceSummary: "Detailed race archive; proof still required"
  },
  {
    year: 2024,
    name: "Mayfuq Race",
    distance: "Unknown",
    time: "Unknown",
    result: "Documented archive entry",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Include in the complete archive. Do not publish a time or placement until proof is added.",
    id: "2024-mayfuq-race",
    date: "2024",
    location: "Mayfuq, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 32,
    sourceSummary: "Detailed race archive; proof still required"
  },
  {
    year: 2024,
    name: "Nabil Halabi Race",
    distance: "Unknown",
    time: "Unknown",
    result: "Documented archive entry",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Include in the complete archive. Do not publish a time or placement until proof is added.",
    id: "2024-nabil-halabi-race",
    date: "2024",
    location: "Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 33,
    sourceSummary: "Detailed race archive; proof still required"
  },
  {
    year: 2024,
    name: "Rashaya-Hasbaya Race",
    distance: "28K",
    time: "Unknown",
    result: "Completed - archive entry",
    country: "Lebanon",
    discipline: "Run",
    status: "Proof pending",
    note: "Include in the complete archive. Confirm the official event name, date, time and proof before using it in public performance totals.",
    id: "2024-rashaya-hasbaya-28k",
    date: "2024",
    location: "Rashaya-Hasbaya, Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 34,
    sourceSummary: "Detailed race archive; proof still required"
  },
  {
    year: 2025,
    name: "Montpellier Run Festival",
    distance: "Half marathon",
    time: "1:39:48 tracked",
    result: "13th U23 · 550th overall",
    country: "France",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 21.199 km.",
    id: "2025-montpellier-run-festival",
    date: "2025",
    location: "Montpellier, France",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/14201589345",
        type: "strava"
      },
      {
        label: "Instagram post",
        url: "https://www.instagram.com/p/DIj0kvit-cu/",
        type: "media"
      }
    ],
    featured: false,
    podium: false,
    order: 35,
    sourceSummary: "Strava activity · Instagram post"
  },
  {
    year: 2025,
    name: "OMT Beirut Marathon",
    distance: "Marathon",
    time: "3:48:22 official",
    result: "2nd U20 · 1st in 542 Training Program · 51st overall",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified",
    note: "Strava moving time: 3:48:09.",
    id: "2025-omt-beirut-marathon",
    date: "2025",
    location: "Beirut, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/14353285281",
        type: "strava"
      },
      {
        label: "Pacing document",
        url: "https://drive.google.com/file/d/1Kd15i2W2jYJbJTf_Rtt3Jhdk8giFEfZy/view",
        type: "proof"
      },
      {
        label: "Certificate",
        url: "https://drive.google.com/file/d/1xoZ9SkEOzDKE-uh8yNPV9N8ooOP5Y7C2/view",
        type: "proof"
      },
      {
        label: "Instagram post",
        url: "https://www.instagram.com/p/DJkCunPN0bS/",
        type: "media"
      }
    ],
    featured: true,
    podium: true,
    order: 36,
    sourceSummary: "Strava activity · Pacing document · Certificate"
  },
  {
    year: 2025,
    name: "Anjar Race",
    distance: "10K",
    time: "48:55 tracked",
    result: "1st U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 10.328 km.",
    id: "2025-anjar-race",
    date: "2025",
    location: "Anjar, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/14507254400",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 37,
    sourceSummary: "Strava activity"
  },
  {
    year: 2025,
    name: "Al Jabal — Al Jurd",
    distance: "5K",
    time: "17:40 tracked",
    result: "2nd overall · 1st U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Verified",
    note: "Strava recorded 4.807 km.",
    id: "2025-al-jabal-al-jurd",
    date: "2025",
    location: "Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/14593818386",
        type: "strava"
      }
    ],
    featured: true,
    podium: true,
    order: 38,
    sourceSummary: "Strava activity"
  },
  {
    year: 2025,
    name: "Etihad / Lebanese Athletics Federation",
    distance: "5000m + 800m",
    time: "—",
    result: "U20",
    country: "Lebanon",
    discipline: "Track",
    status: "Documented",
    note: "Two track events.",
    id: "2025-etihad-lebanese-athletics-federation",
    date: "2025",
    location: "Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: false,
    order: 39,
    sourceSummary: "Race archive"
  },
  {
    year: 2025,
    name: "Al Jabal Race",
    distance: "4.4K",
    time: "18:53 tracked",
    result: "3rd overall · 1st U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 4.419 km.",
    id: "2025-al-jabal-race",
    date: "2025",
    location: "Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/14879059148",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 40,
    sourceSummary: "Strava activity"
  },
  {
    year: 2025,
    name: "Tripoli Race",
    distance: "10K",
    time: "44:42 tracked",
    result: "3rd U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 10.602 km.",
    id: "2025-tripoli-race",
    date: "2025",
    location: "Tripoli, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/14956075031",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 41,
    sourceSummary: "Strava activity"
  },
  {
    year: 2025,
    name: "Barja Race",
    distance: "6K",
    time: "25:07 tracked",
    result: "2nd U20",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 6.329 km.",
    id: "2025-barja-race",
    date: "2025",
    location: "Barja, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/15027210101",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 42,
    sourceSummary: "Strava activity"
  },
  {
    year: 2025,
    name: "Biathle Triathle World Tour",
    distance: "Multisport",
    time: "—",
    result: "1st overall",
    country: "Lebanon",
    discipline: "Multisport",
    status: "Verified",
    note: "Proof image in the archive.",
    id: "2025-biathle-triathle-world-tour",
    date: "2025",
    location: "Lebanon",
    images: [],
    links: [],
    featured: false,
    podium: true,
    order: 43,
    sourceSummary: "Photo proof"
  },
  {
    year: 2026,
    name: "Envolez-Vous",
    distance: "10K",
    time: "39:42",
    result: "3rd ESM · 23rd overall",
    country: "France",
    discipline: "Run",
    status: "Tracked",
    note: "Current 10K best.",
    id: "2026-envolez-vous",
    date: "2026",
    location: "France",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/17249976869",
        type: "strava"
      }
    ],
    featured: true,
    podium: true,
    order: 44,
    sourceSummary: "Strava activity"
  },
  {
    year: 2026,
    name: "Allure Bleue",
    distance: "5K",
    time: "19:48",
    result: "2nd overall",
    country: "France",
    discipline: "Run",
    status: "Tracked",
    note: "Strava recorded 5.03 km.",
    id: "2026-allure-bleue",
    date: "2026",
    location: "France",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/17472316459",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 45,
    sourceSummary: "Strava activity"
  },
  {
    year: 2026,
    name: "Montpellier Run Festival",
    distance: "Half marathon",
    time: "1:29:26 official",
    result: "9th U23 · 140th overall",
    country: "France",
    discipline: "Run",
    status: "Verified",
    note: "Current official half-marathon best.",
    id: "2026-montpellier-run-festival",
    date: "April 19, 2026",
    location: "Montpellier, France",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/18175504201",
        type: "strava"
      },
      {
        label: "Instagram post",
        url: "https://www.instagram.com/p/DXxQx_Xjfnv/",
        type: "media"
      }
    ],
    featured: true,
    podium: false,
    order: 46,
    sourceSummary: "Strava activity · Instagram post"
  },
  {
    year: 2026,
    name: "Prague Marathon",
    distance: "Marathon",
    time: "3:42:37 official",
    result: "2346th overall",
    country: "Czech Republic",
    discipline: "Run",
    status: "Verified",
    note: "Completed with the left leg taped; 35 days before Warsaw.",
    id: "2026-prague-marathon",
    date: "May 3, 2026",
    location: "Prague, Czech Republic",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/18717374673",
        type: "strava"
      },
      {
        label: "Instagram post",
        url: "https://www.instagram.com/p/DZA9Btqjdw3/",
        type: "media"
      }
    ],
    featured: true,
    podium: false,
    order: 47,
    sourceSummary: "Strava activity · Instagram post"
  },
  {
    year: 2026,
    name: "IRONMAN 70.3 Warsaw",
    distance: "1.9K swim · 90K bike · 21.1K run",
    time: "6:08:15 official",
    result: "Finisher · 113th M18–24",
    country: "Poland",
    discipline: "Triathlon",
    status: "Verified",
    note: "Swim 44:26 · T1 4:46 · Bike 3:21:42 · T2 5:24 · Run 1:51:56.",
    id: "2026-ironman-70-3-warsaw",
    date: "June 7, 2026",
    location: "Warsaw, Poland",
    images: [],
    links: [
      {
        label: "Official results",
        url: "https://www.ironman.com/races/im703-warsaw/results",
        type: "official"
      },
      {
        label: "Swim on Strava",
        url: "https://www.strava.com/activities/19047493856",
        type: "strava"
      },
      {
        label: "Bike on Strava",
        url: "https://www.strava.com/activities/19047574543",
        type: "strava"
      },
      {
        label: "Run on Strava",
        url: "https://www.strava.com/activities/19047780272",
        type: "strava"
      },
      {
        label: "Instagram story post",
        url: "https://www.instagram.com/p/DagOijLDcz0/",
        type: "media"
      },
      {
        label: "Official photo archive",
        url: "https://drive.google.com/drive/folders/10jMQ54OlpboTtlp_i8Pkc3VhA-_lUzt1",
        type: "media"
      },
      {
        label: "Race video archive",
        url: "https://drive.google.com/drive/folders/1kO5ab9jcbeG9-M8piuXP_rxBhctjHfDz",
        type: "media"
      }
    ],
    featured: true,
    podium: false,
    order: 48,
    sourceSummary: "Official results · Swim on Strava · Bike on Strava"
  },
  {
    year: 2026,
    name: "Al Gharb Race",
    distance: "6.5K",
    time: "24:46 tracked",
    result: "2nd 20–34 · 6th overall",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Average pace: 3:48/km.",
    id: "2026-al-gharb-race",
    date: "2026",
    location: "Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/19046982488",
        type: "strava"
      }
    ],
    featured: false,
    podium: true,
    order: 49,
    sourceSummary: "Strava activity"
  },
  {
    year: 2026,
    name: "Run The City — Beirut Marathon",
    distance: "10.24K tracked",
    time: "40:47",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Average pace: 3:59/km.",
    id: "2026-run-the-city-beirut-marathon",
    date: "2026",
    location: "Beirut, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/19214760696",
        type: "strava"
      }
    ],
    featured: false,
    podium: false,
    order: 50,
    sourceSummary: "Strava activity"
  },
  {
    year: 2026,
    name: "Batroun Race",
    distance: "10.09K tracked",
    time: "41:46",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "Average pace: 4:08/km.",
    id: "2026-batroun-race",
    date: "2026",
    location: "Batroun, Lebanon",
    images: [],
    links: [
      {
        label: "Strava activity",
        url: "https://www.strava.com/activities/19280218080",
        type: "strava"
      }
    ],
    featured: false,
    podium: false,
    order: 51,
    sourceSummary: "Strava activity"
  },
  {
    year: 2026,
    name: "Tripoli Race",
    distance: "21K race · 26.14K tracked",
    time: "2:00:52 tracked",
    result: "Completed",
    country: "Lebanon",
    discipline: "Run",
    status: "Tracked",
    note: "The official race distance was 21K. Course organisation sent Toufic beyond the intended route, so Strava recorded 26.14 km. No unverified placing is claimed.",
    id: "2026-tripoli-race-21k",
    date: "2026",
    location: "Tripoli, Lebanon",
    images: [],
    links: [{ label: "Strava activity", url: "https://www.strava.com/activities/19374417401", type: "strava" }],
    featured: false,
    podium: false,
    order: 52,
    sourceSummary: "Strava activity"
  },
  {
    year: 2026,
    name: "Kharbe Race",
    distance: "6K race · 6.13K tracked",
    time: "22:52 tracked",
    result: "1st place",
    country: "Lebanon",
    discipline: "Run",
    status: "Photo and activity verified",
    note: "First place is shown by the podium photograph. Strava recorded 6.13 km in 22:52 with 173 m of elevation gain.",
    id: "2026-kharbe-race",
    date: "August 9, 2026",
    location: "Kharbe, Lebanon",
    images: ["/assets/img/races/2026-kharbe.webp"],
    links: [{ label: "Strava activity", url: "https://www.strava.com/activities/19672294552", type: "strava" }],
    featured: false,
    podium: true,
    order: 53,
    sourceSummary: "Podium photograph · Strava activity"
  },
  {
    year: 2026,
    name: "Mzaar Cross Duathlon",
    distance: "16.11K tracked",
    time: "1:41:49",
    result: "3rd place · 20–29",
    country: "Lebanon",
    discipline: "Duathlon",
    status: "Result supplied · Activity tracked",
    note: "Third place in the 20–29 age group. Strava recorded 16.11 km and 737 m of elevation gain.",
    id: "2026-mzaar-cross-duathlon",
    date: "August 1, 2026",
    location: "Mzaar, Lebanon",
    images: [],
    links: [{ label: "Strava activity", url: "https://www.strava.com/activities/19671481606", type: "strava" }],
    featured: false,
    podium: true,
    order: 54,
    sourceSummary: "Placing supplied · Strava activity"
  },
  {
    year: 2026,
    name: "Olympic Duathlon",
    distance: "10K run · 40K bike · 5K run",
    time: "2:50:01 tracked total",
    result: "Completed",
    country: "Lebanon",
    discipline: "Duathlon",
    status: "Tracked",
    note: "Official format: 10K run, 40K bike, 5K run. Tracked: 10.05 km in 39:28, 44.71 km in 1:45:26, and 5 km in 25:07.",
    id: "2026-olympic-duathlon",
    date: "July 26, 2026",
    location: "Lebanon",
    images: [],
    links: [
      { label: "First run on Strava", url: "https://www.strava.com/activities/19671863507", type: "strava" },
      { label: "Bike on Strava", url: "https://www.strava.com/activities/19671872528", type: "strava" },
      { label: "Second run on Strava", url: "https://www.strava.com/activities/19671909823", type: "strava" }
    ],
    featured: false,
    podium: false,
    order: 55,
    sourceSummary: "Three Strava activities"
  },
  {
    year: 2026,
    name: "Saghbine Race",
    distance: "6.06K tracked",
    time: "23:31",
    result: "1st place",
    country: "Lebanon",
    discipline: "Run",
    status: "Photo and activity verified",
    note: "First place is shown by the podium photographs. Strava recorded 6.06 km, 23:31, and 119 m of elevation gain.",
    id: "2026-saghbine-race",
    date: "August 16, 2026",
    location: "Saghbine, Lebanon",
    images: ["/assets/img/races/2026-saghbine-award.webp", "/assets/img/races/2026-saghbine-podium.webp"],
    links: [{ label: "Strava activity", url: "https://www.strava.com/activities/19763633727", type: "strava" }],
    featured: false,
    podium: true,
    order: 56,
    sourceSummary: "Podium photographs · Strava activity"
  }
];
