export const kolbQuestions = [
    {
        id: 1,
        prompt: "TANULÁS KÖZBEN",
        options: [
            { id: 'A', text: "saját élményeim foglalkoztatnak" },
            { id: 'B', text: "erősen figyelek (jól kinyitom a szemem és a fülem)" },
            { id: 'C', text: "szeretek elmerülni a gondolataimban" },
            { id: 'D', text: "szeretem csinálni is azt, amit tanulok" }
        ]
    },
    {
        id: 2,
        prompt: "AKKOR TANULOK A LEGJOBBAN, AMIKOR:",
        options: [
            { id: 'A', text: "benyomásaimra és megérzéseimre hagyatkozom" },
            { id: 'B', text: "mindent alaposan megnézek és meghallgatok" },
            { id: 'C', text: "a logikus gondolkodásra támaszkodom" },
            { id: 'D', text: "keményen dolgozom a sikerért" }
        ]
    },
    {
        id: 3,
        prompt: "AMIKOR TANULOK:",
        options: [
            { id: 'A', text: "érzékeim kiélesednek és reakcióim felfokozottak" },
            { id: 'B', text: "csendes és visszafogott vagyok" },
            { id: 'C', text: "hajlamos vagyok kikövetkeztetni a dolgokat" },
            { id: 'D', text: "felelősnek érzem magam a dolgokért" }
        ]
    },
    {
        id: 4,
        prompt: "AMIKOR TANULOK, FŐLEG:",
        options: [
            { id: 'A', text: "a saját tapasztalatomból" },
            { id: 'B', text: "szemlélődés útján" },
            { id: 'C', text: "saját általános következtetéseimből" },
            { id: 'D', text: "cselekvés által" }
        ]
    },
    {
        id: 5,
        prompt: "TANULÁS KÖZBEN:",
        options: [
            { id: 'A', text: "nyitott vagyok az új tapasztalatokra" },
            { id: 'B', text: "minden oldalról meg-vizsgálom a dolgot" },
            { id: 'C', text: "szeretem elemezni, felbontani a kérdést" },
            { id: 'D', text: "szeretek mindent kipróbálni" }
        ]
    },
    {
        id: 6,
        prompt: "AMIKOR TANULOK, FŐLEG:",
        options: [
            { id: 'A', text: "spontán (ösztönös) vagyok" },
            { id: 'B', text: "a megfigyelő szerepét játszom" },
            { id: 'C', text: "a logikára támaszkodom" },
            { id: 'D', text: "a tettek és a tények embere vagyok" }
        ]
    },
    {
        id: 7,
        prompt: "AKKOR TUDOK A LEG-JOBBAN TANULNI, AMIKOR:",
        options: [
            { id: 'A', text: "másokkal együtt vagyok" },
            { id: 'B', text: "saját megfigyeléseket végzek" },
            { id: 'C', text: "ésszerű elméletekkel dolgozom" },
            { id: 'D', text: "próbálkozhatok és gyakorolhatok" }
        ]
    },
    {
        id: 8,
        prompt: "TANULÁS KÖZBEN:",
        options: [
            { id: 'A', text: "személyes ismerősömmé válik az, amivel foglalkozom" },
            { id: 'B', text: "cselekvés előtt bizonyos felkészülési idôre van szükségem" },
            { id: 'C', text: "az elveket és eszméket kedvelem és keresem" },
            { id: 'D', text: "látni akarom, mi az eredménye annak, amit csinálok" }
        ]
    },
    {
        id: 9,
        prompt: "AKKOR TANULOK LEG-JOBBAN, MIKOR:",
        options: [
            { id: 'A', text: "hangulataimnak adom át magam" },
            { id: 'B', text: "megfigyeléseimből indulok ki" },
            { id: 'C', text: "saját elképzelése-imet követem" },
            { id: 'D', text: "kedvemre kísérletezhetek" }
        ]
    },
    {
        id: 10,
        prompt: "AMIKOR TANULOK, AKKOR:",
        options: [
            { id: 'A', text: "mindent elfogadok" },
            { id: 'B', text: "fenntartásaim vannak, gyanakvó vagyok" },
            { id: 'C', text: "ésszerűen gondolkodom, érveket keresek" },
            { id: 'D', text: "felelősséggel választok, döntök" }
        ]
    },
    {
        id: 11,
        prompt: "AMIKOR TANULOK, ÁLTALÁBAN:",
        options: [
            { id: 'A', text: "nem tudok közömbös maradni" },
            { id: 'B', text: "szeretek mindent ellenőrizni („hiszem. ha látom\")" },
            { id: 'C', text: "magasabb szem-pontból értékelem a dolgokat" },
            { id: 'D', text: "a cselekvéses, aktivizáló módszereket kedvelem" }
        ]
    },
    {
        id: 12,
        prompt: "AKKOR TANULOK A LEGJOBBAN, AMIKOR:",
        options: [
            { id: 'A', text: "fogékony, befogadó és elfogulatlan vagyok" },
            { id: 'B', text: "óvatos, elővigyázatos vagyok" },
            { id: 'C', text: "a fogalmakat elemzem" },
            { id: 'D', text: "gyakorlatias vagyok" }
        ]
    }
];

export const learningStyles = {
    A: {
        title: "KONKRÉT TAPASZTALAT (A)",
        description: "A tanulási ciklusnak ez a szakasza a személyes részvételt és érintettséget, átélést hangsúlyozza a mindennapi – általában társas – helyzetekben. Ebben a szakaszban ön hajlamos a problémák és a helyzetek szisztematikus megközelítése helyett az érzéseire, benyomásaira, megérzéseire hagyatkozni. Tanulási helyzetben ön valószínűleg nyitott az új dolgokra és alkalmazkodni tud a változásokhoz.",
        keywords: ["Tanulás élményekből", "Tanulás egyedi esetekből", "Másokkal összefüggésben", "Fogékonyság érzelmekre és emberekre"]
    },
    B: {
        title: "TUDATOS MEGFIGYELÉS (B)",
        description: "A tanulásnak ebben a szakaszban az emberek különböző nézőpontokból közelítik meg és értelmezik a helyzeteket. Tanulási helyzetben ön valószínűleg türelmes, tárgyilagos és gondos megállapításokat tesz, de nem szükségképpen vállalkozna bármilyen cselekvésre. Véleményalkotásában főleg saját gondolataira és értékeléseire támaszkodik.",
        keywords: ["Tanulás megfigyelésből, meghallgatásból, megtekintésből, olvasásból", "Ítéletalkotás előtt gondos megfigyelés", "Különböző távlatokból szemlélni a dolgokat", "A dolgok értelmét, jelentését keresni, megfejteni"]
    },
    C: {
        title: "ELVONT FOGALOMALKOTÁS (C)",
        description: "Ebben a szakaszban a tanulás, a problémák és helyzetek megértése érdekében logikára és elvekre támaszkodik inkább, mint megérzésekre. Ön általában általánosításokkal, következtetésekkel, szisztematikus tervezéssel, elméletalkotással, elképzelésekkel, eszmékkel oldaná meg legszívesebben a problémákat.",
        keywords: ["Gondolkodva tanulás", "Az elképzelések logikai elemzése", "Szisztematikus tervezés", "A cselekvés a helyzet előzetes és alapos szellemi elsajátításán, megértésén alapul"]
    },
    D: {
        title: "AKTÍV KÍSÉRLETEZÉS (D)",
        description: "A tanulás ebben a szakaszban aktív formát ölt – kísérleteket tesz az elképzelések kipróbálására és ellenőrzésére, ennek érdekében a helyzet befolyásolására vagy megváltoztatására vagy éppen a körülményekhez való alkalmazkodásra, ha erre van szükség. Az ön megközelítése gyakorlati, az érdekli, ami valóban működik, aminek haszna van — a szemlélődés jóval kevésbé. Szereti megvalósítani a jó ötleteket – bárkitől származzanak is azok –, véghezvinni a dolgokat, és látni saját hatásának és ügyességének, erőfeszítéseinek végeredményét.",
        keywords: ["Cselekedve tanulás", "A végrehajtás, érvényesülés képessége", "Kockáztatás", "Cselekvéssel hatni az emberekre és eseményekre, befolyásolni a dolgokat, beavatkozni"]
    }
};
