interface Title {
  en: string;
}

interface AltTitle {
  [key: string]: string;
}

interface Description {
  da?: string;
  de?: string;
  en?: string;
  fi?: string;
  fr?: string;
  id?: string;
  lt?: string;
  no?: string;
  pl?: string;
  ru?: string;
  uk?: string;
  zh?: string;
  "es-la"?: string;
  "pt-br"?: string;
  "zh-hk"?: string;
}

interface Links {
  al?: string;
  ap?: string;
  bw?: string;
  kt?: string;
  mu?: string;
  amz?: string;
  cdj?: string;
  ebj?: string;
  mal?: string;
  raw?: string;
  engtl?: string;
}

interface TagAttributes {
  name: {
    en: string;
  };
  description: Record<string, unknown>;
  group: string;
  version: number;
}

interface Tag {
  id: string;
  type: string;
  attributes: TagAttributes;
  relationships: any[];
}

interface Attributes {
  title: Title;
  altTitles: AltTitle[];
  description: Description;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: string;
  year: number;
  contentRating: string;
  tags: Tag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
}

interface Relationship {
  id: string;
  type: string;
}

interface MangaData {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

interface MangaResponse {
  result: string;
  response: string;
  data: MangaData[];
  limit: number;
  offset: number;
  total: number;
}

const manga: MangaResponse = {
  result: "ok",
  response: "collection",
  data: [
    {
      id: "40bc649f-7b49-4645-859e-6cd94136e722",
      type: "manga",
      attributes: {
        title: {
          en: "Dragon Ball",
        },
        altTitles: [
          {
            ja: "ドラゴンボール",
          },
        ],
        description: {
          da: "Den fantastiske historie starter...",
          de: "Der kleine Einsiedler Son-Goku...",
          en: "Dragon Ball follows the adventures of Goku...",
          fi: "Pieni mutta vahva Son Goku...",
          fr: "Les Dragon Ball, boules de cristal magiques...",
          id: "Son Goku adalah seorang anak laki-laki...",
          lt: "Susipažinkite su tyros širdies beždžionuodegiu berniuku Sangoku...",
          no: "Den lille enstøingen Son-Goku møter...",
          pl: "Manga stworzona przez Akirę Toriyamę...",
          ru: "Манга «Жемчуг дракона» во многом перекликается...",
          uk: "Кулі Дракона... Сім містичних сфер...",
          zh: "相传，有七颗龙珠散落在世界的各个角落...",
          "es-la": "Por fin! Edición nacional de DragonBall...",
          "pt-br": "Dragon Ball segue as aventuras de Son Goku...",
          "zh-hk": "從前從前，在距離都市數千公里外的某座深山裡住著...",
        },
        isLocked: false,
        links: {
          al: "30042",
          ap: "dragon-ball",
          bw: "series/13022",
          kt: "dragon-ball",
          mu: "3106",
          amz: "https://www.amazon.co.jp/gp/product/B0756ZH5JZ",
          cdj: "https://www.cdjapan.co.jp/product/NEOBK-2443629",
          ebj: "https://ebookjapan.yahoo.co.jp/books/134323/",
          mal: "42",
          raw: "https://shonenjumpplus.com/episode/10833519556325021841",
          engtl: "https://www.viz.com/dragon-ball",
        },
        originalLanguage: "ja",
        lastVolume: "42",
        lastChapter: "519",
        publicationDemographic: "shounen",
        status: "completed",
        year: 1984,
        contentRating: "suggestive",
        tags: [
          {
            id: "0a39b5a1-b235-4886-a747-1d05d216532d",
            type: "tag",
            attributes: {
              name: {
                en: "Award Winning",
              },
              description: {},
              group: "format",
              version: 1,
            },
            relationships: [],
          },
        ],
        state: "published",
        chapterNumbersResetOnNewVolume: false,
        createdAt: "2018-03-23T06:56:41+00:00",
        updatedAt: "2024-04-09T19:22:05+00:00",
        version: 38,
        availableTransla
