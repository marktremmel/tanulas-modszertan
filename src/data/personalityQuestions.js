export const personalityQuestions = [
    // Strengths (1-20)
    {
        id: 1,
        options: [
            { text: "kalandvágyó", type: "kolerikus" },
            { text: "alkalmazkodó", type: "flegmatikus" },
            { text: "eleven", type: "szangvinikus" },
            { text: "elemző", type: "melankolikus" }
        ]
    },
    {
        id: 2,
        options: [
            { text: "kitartó", type: "melankolikus" },
            { text: "játékos", type: "szangvinikus" },
            { text: "meggyőző", type: "kolerikus" },
            { text: "békés", type: "flegmatikus" }
        ]
    },
    {
        id: 3,
        options: [
            { text: "behódoló", type: "flegmatikus" },
            { text: "önfeláldozó", type: "melankolikus" },
            { text: "társas lény", type: "szangvinikus" },
            { text: "erős akaratú", type: "kolerikus" }
        ]
    },
    {
        id: 4,
        options: [
            { text: "előzékeny", type: "flegmatikus" },
            { text: "megfontolt", type: "melankolikus" },
            { text: "versengő", type: "kolerikus" },
            { text: "megnyerő", type: "szangvinikus" }
        ]
    },
    {
        id: 5,
        options: [
            { text: "üdítő", type: "szangvinikus" },
            { text: "tiszteletteljes", type: "melankolikus" },
            { text: "visszafogott", type: "flegmatikus" },
            { text: "talpraesett", type: "kolerikus" }
        ]
    },
    {
        id: 6,
        options: [
            { text: "belenyugvó", type: "flegmatikus" },
            { text: "érzékeny", type: "melankolikus" },
            { text: "magában bízó", type: "kolerikus" }, // Note: Table says "magabízó" (likely typo in source or here, using question text) -> Table: magabízó (Kolerikus)
            { text: "tüzes", type: "szangvinikus" }
        ]
    },
    {
        id: 7,
        options: [
            { text: "tervező", type: "melankolikus" },
            { text: "türelmes", type: "flegmatikus" },
            { text: "határozott", type: "kolerikus" },
            { text: "előmozdító", type: "szangvinikus" }
        ]
    },
    {
        id: 8,
        options: [
            { text: "magabiztos", type: "kolerikus" },
            { text: "Keresetlen", type: "szangvinikus" }, // Table: keresetlen
            { text: "menetrendszerű", type: "melankolikus" },
            { text: "tartózkodó", type: "flegmatikus" }
        ]
    },
    {
        id: 9,
        options: [
            { text: "rendszerető", type: "melankolikus" },
            { text: "készséges", type: "flegmatikus" },
            { text: "szókimondó", type: "kolerikus" },
            { text: "derűlátó", type: "szangvinikus" }
        ]
    },
    {
        id: 10,
        options: [
            { text: "barátságos", type: "flegmatikus" },
            { text: "hűséges", type: "melankolikus" },
            { text: "mókás", type: "szangvinikus" },
            { text: "erélyes", type: "kolerikus" }
        ]
    },
    {
        id: 11,
        options: [
            { text: "merész", type: "kolerikus" },
            { text: "elragadó", type: "szangvinikus" },
            { text: "diplomatikus", type: "flegmatikus" },
            { text: "precíz", type: "melankolikus" }
        ]
    },
    {
        id: 12,
        options: [
            { text: "vidám", type: "szangvinikus" },
            { text: "állhatatos", type: "flegmatikus" },
            { text: "kulturált", type: "melankolikus" },
            { text: "öntudatos", type: "kolerikus" }
        ]
    },
    {
        id: 13,
        options: [
            { text: "maximalista", type: "melankolikus" }, // Table: idealista (Melankolikus). Question says "maximalista". Assuming mapping.
            { text: "független", type: "kolerikus" },
            { text: "semleges", type: "flegmatikus" },
            { text: "ösztönző", type: "szangvinikus" }
        ]
    },
    {
        id: 14,
        options: [
            { text: "közlékeny", type: "szangvinikus" },
            { text: "döntésképes", type: "kolerikus" },
            { text: "fanyar", type: "flegmatikus" },
            { text: "elmélyült", type: "melankolikus" }
        ]
    },
    {
        id: 15,
        options: [
            { text: "békítő", type: "flegmatikus" },
            { text: "muzikális", type: "melankolikus" },
            { text: "aktív", type: "kolerikus" },
            { text: "társaságkedvelő", type: "szangvinikus" }
        ]
    },
    {
        id: 16,
        options: [
            { text: "figyelmes", type: "melankolikus" },
            { text: "fáradhatatlan", type: "kolerikus" },
            { text: "beszédes", type: "szangvinikus" },
            { text: "megértő", type: "flegmatikus" }
        ]
    },
    {
        id: 17,
        options: [
            { text: "jó hallgatóság", type: "flegmatikus" },
            { text: "lojális", type: "melankolikus" },
            { text: "vezető egyéniség", type: "kolerikus" },
            { text: "friss", type: "szangvinikus" }
        ]
    },
    {
        id: 18,
        options: [
            { text: "megelégedett", type: "flegmatikus" },
            { text: "főnökösködő", type: "kolerikus" },
            { text: "listaíró", type: "melankolikus" },
            { text: "helyes", type: "szangvinikus" }
        ]
    },
    {
        id: 19,
        options: [
            { text: "tökéletességre törekvő", type: "melankolikus" }, // Table: perfekcionista
            { text: "kellemes", type: "flegmatikus" },
            { text: "eredményes", type: "kolerikus" },
            { text: "népszerű", type: "szangvinikus" }
        ]
    },
    {
        id: 20,
        options: [
            { text: "életvidám", type: "szangvinikus" },
            { text: "vakmerő", type: "kolerikus" },
            { text: "illemtudó", type: "melankolikus" },
            { text: "kiegyensúlyozott", type: "flegmatikus" }
        ]
    },
    // Weaknesses (21-40)
    {
        id: 21,
        options: [
            { text: "fapofa", type: "flegmatikus" },
            { text: "szégyenlős", type: "melankolikus" },
            { text: "magamutogató", type: "szangvinikus" },
            { text: "parancsolgató", type: "kolerikus" }
        ]
    },
    {
        id: 22,
        options: [
            { text: "fegyelmezetlen", type: "szangvinikus" },
            { text: "érzéketlen", type: "kolerikus" },
            { text: "fanyalgó", type: "flegmatikus" },
            { text: "haragtartó", type: "melankolikus" }
        ]
    },
    {
        id: 23,
        options: [
            { text: "zárkózott", type: "flegmatikus" },
            { text: "sértődékeny", type: "melankolikus" },
            { text: "ellenálló", type: "kolerikus" },
            { text: "önismétlő", type: "szangvinikus" }
        ]
    },
    {
        id: 24,
        options: [
            { text: "szőrszálhasogató", type: "melankolikus" },
            { text: "félős", type: "flegmatikus" },
            { text: "feledékeny", type: "szangvinikus" },
            { text: "kíméletlenül őszinte", type: "kolerikus" }
        ]
    },
    {
        id: 25,
        options: [
            { text: "türelmetlen", type: "kolerikus" },
            { text: "bizonytalan", type: "melankolikus" },
            { text: "határozatlan", type: "flegmatikus" },
            { text: "közbeszóló", type: "szangvinikus" }
        ]
    },
    {
        id: 26,
        options: [
            { text: "népszerűtlen", type: "flegmatikus" },
            { text: "érdektelen", type: "melankolikus" },
            { text: "kiszámíthatatlan", type: "szangvinikus" },
            { text: "szeretetlen", type: "kolerikus" }
        ]
    },
    {
        id: 27,
        options: [
            { text: "csökönyös", type: "kolerikus" },
            { text: "rendszertelen", type: "szangvinikus" },
            { text: "kielégíthetetlen", type: "melankolikus" },
            { text: "habozó", type: "flegmatikus" }
        ]
    },
    {
        id: 28,
        options: [
            { text: "szürke", type: "flegmatikus" },
            { text: "borúlátó", type: "melankolikus" },
            { text: "öntelt", type: "kolerikus" },
            { text: "engedékeny", type: "szangvinikus" }
        ]
    },
    {
        id: 29,
        options: [
            { text: "lobbanékony", type: "szangvinikus" },
            { text: "céltalan", type: "flegmatikus" },
            { text: "vitatkozó", type: "kolerikus" },
            { text: "távolságtartó", type: "melankolikus" }
        ]
    },
    {
        id: 30,
        options: [
            { text: "naiv", type: "szangvinikus" },
            { text: "elutasító", type: "melankolikus" },
            { text: "izgága", type: "kolerikus" },
            { text: "nemtörődöm", type: "flegmatikus" }
        ]
    },
    {
        id: 31,
        options: [
            { text: "aggodalmaskodó", type: "flegmatikus" },
            { text: "visszahúzódó", type: "melankolikus" },
            { text: "munkamániás", type: "kolerikus" },
            { text: "népszerűség hajhászó", type: "szangvinikus" }
        ]
    },
    {
        id: 32,
        options: [
            { text: "túlérzékeny", type: "melankolikus" },
            { text: "tapintatlan", type: "kolerikus" },
            { text: "félénk", type: "flegmatikus" },
            { text: "fecsegő", type: "szangvinikus" }
        ]
    },
    {
        id: 33,
        options: [
            { text: "kétkedő", type: "flegmatikus" }, // Table: kétkedő (Flegmatikus)
            { text: "szétszórt", type: "szangvinikus" },
            { text: "hatalmaskodó", type: "kolerikus" },
            { text: "levert", type: "melankolikus" }
        ]
    },
    {
        id: 34,
        options: [
            { text: "következetlen", type: "szangvinikus" },
            { text: "befelé forduló", type: "melankolikus" },
            { text: "intoleráns", type: "kolerikus" },
            { text: "közönyös", type: "flegmatikus" }
        ]
    },
    {
        id: 35,
        options: [
            { text: "rendetlen", type: "szangvinikus" },
            { text: "szeszélyes", type: "melankolikus" },
            { text: "motyogó", type: "flegmatikus" },
            { text: "másokat befolyásoló", type: "kolerikus" } // Table: manipulatív
        ]
    },
    {
        id: 36,
        options: [
            { text: "lassú", type: "flegmatikus" },
            { text: "makacs", type: "kolerikus" },
            { text: "feltűnősködő", type: "szangvinikus" },
            { text: "hitetlenkedő", type: "melankolikus" }
        ]
    },
    {
        id: 37,
        options: [
            { text: "magának való", type: "melankolikus" },
            { text: "rátarti", type: "kolerikus" },
            { text: "lusta", type: "flegmatikus" },
            { text: "hangoskodó", type: "szangvinikus" }
        ]
    },
    {
        id: 38,
        options: [
            { text: "tunya", type: "flegmatikus" },
            { text: "gyanakvó", type: "melankolikus" },
            { text: "indulatos", type: "kolerikus" },
            { text: "szórakozott", type: "szangvinikus" }
        ]
    },
    {
        id: 39,
        options: [
            { text: "bosszúálló", type: "melankolikus" },
            { text: "nyughatatlan", type: "szangvinikus" },
            { text: "húzódozó", type: "flegmatikus" },
            { text: "kapkodó", type: "kolerikus" }
        ]
    },
    {
        id: 40,
        options: [
            { text: "megalkuvó", type: "flegmatikus" },
            { text: "gáncsoskodó", type: "melankolikus" },
            { text: "ravasz", type: "kolerikus" }, // Table: körmönfont
            { text: "állhatatlan", type: "szangvinikus" }
        ]
    }
];

export const personalityTypes = {
    szangvinikus: {
        name: "Szangvinikus",
        strengths: [
            "társas lény", "lelkesítő", "meggyőző", "beszédes", "derűlátó", "szórakoztató"
        ],
        weaknesses: [
            "az önelfogadtatás érdekében kerüli a szembehelyezkedést", "túloz", "hurráoptimizmusra hajlamos", "túl sokat fecseg", "nehezen összpontosít"
        ]
    },
    kolerikus: {
        name: "Kolerikus",
        strengths: [
            "célratörő és magabiztos", "elfogadja a kihívásokat", "versengő", "eredményközpontú", "nem fél szembehelyezkedni"
        ],
        weaknesses: [
            "kérkedő", "önkényeskedő", "nyers", "szeret vitatkozni", "nem figyel mások szavaira"
        ]
    },
    melankolikus: {
        name: "Melankolikus",
        strengths: [
            "kritikus gondolkodó", "ügyel a részletekre", "körültekintő", "gondos, pontos", "problémamegoldó"
        ],
        weaknesses: [
            "perfekcionista", "túlontúl kritikus", "szélsőségekben gondolkodik", "nehézkesen változik", "zárkózott, tartózkodó"
        ]
    },
    flegmatikus: {
        name: "Flegmatikus",
        strengths: [
            "figyelmesen hallgat", "következetes", "ragaszkodó, támogató", "türelmes", "kitartó"
        ],
        weaknesses: [
            "rendkívül érzékeny", "passzív", "határozatlan", "ellenáll a változásoknak", "túlontúl elnéző"
        ]
    }
};
