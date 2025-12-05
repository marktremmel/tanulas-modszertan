export const timeManagementData = {
    meta: {
        test_name: "Gitlin-féle időgazdálkodási alapkérdőív",
        version: "1.0",
        source_document: "idomenedzseles.pdf"
    },
    scoring_config: {
        points_mapping: {
            a: 4,
            b: 3,
            c: 2,
            d: 1
        },
        options: [
            { label: "Teljesen egyetértek", value_key_positive: "a", value_key_negative: "d" },
            { label: "Részben egyetértek", value_key_positive: "b", value_key_negative: "c" },
            { label: "Részben nem értek egyet", value_key_positive: "c", value_key_negative: "b" },
            { label: "Egyáltalán nem értek egyet", value_key_positive: "d", value_key_negative: "a" }
        ]
    },
    categories: [
        { id: "goals", name: "Célok és fontossági sorrend", type: "basic" },
        { id: "work_style", name: "Munkastílus", type: "basic" },
        { id: "task_org", name: "Feladatok rendszerezése", type: "basic" },
        { id: "interruptions", name: "A megszakítások kezelése", type: "basic" },
        { id: "paperwork", name: "A papírmunka kézbentartása", type: "basic" },
        { id: "relationships", name: "Kapcsolat másokkal", type: "basic" },
        { id: "action", name: "Azonnali cselekvés", type: "basic" },
        { id: "private_life", name: "Magánélet időbeosztása", type: "basic" },
        { id: "mgmt_task_org", name: "Vezetői feladat rendszerezés", type: "supplementary" },
        { id: "mgmt_interruptions", name: "Vezetői megszakítások kezelése", type: "supplementary" },
        { id: "mgmt_relationships", name: "Vezetői kapcsolat másokkal", type: "supplementary" }
    ],
    questions: [
        { id: 1, text: "Nem tudom elvégezni minden feladatomat, mert mindig valami másba kapok bele.", polarity: "negative", category_id: "goals" },
        { id: 2, text: "Rengeteg időmet elviszik a megszakítások.", polarity: "negative", category_id: "interruptions" },
        { id: 3, text: "Rendszeresen elkészítem a napi tennivalók listáját.", polarity: "positive", category_id: "task_org" },
        { id: 4, text: "Napi tennivalóm listáján jelzem az egyes feladatok sürgősségét is.", polarity: "positive", category_id: "task_org" },
        { id: 5, text: "Munkámban rendszeresen visszatérő válságokkal kell megküzdenem.", polarity: "negative", category_id: "work_style" },
        { id: 6, text: "Az elmúlt év során módszeresen megvizsgáltam, hogy az általam végzett papírmunkából mit lehetne elhagyni, egyszerűsíteni vagy fejleszteni.", polarity: "positive", category_id: "paperwork" },
        { id: 7, text: "A múlt hónap során megbeszéltem a főnökeimmel, a kollégáimmal és a beosztottaimmal, hogy kerülhetnének ki az időzavarból.", polarity: "positive", category_id: "relationships" },
        { id: 8, text: "Hajlamos vagyok a gyors, könnyű és élvezetes munkákat venni előre.", polarity: "negative", category_id: "action" },
        { id: 9, text: "Azt tartják rólam, hogy nagy az indulósebességem.", polarity: "positive", category_id: "private_life" },
        { id: 10, text: "Van egy listám a hosszú távú személyes célkitűzéseimről.", polarity: "positive", category_id: "goals" },
        { id: 11, text: "A múlt évben legalább egy héten át vezettem tevékenységi naplót, hogy pontosan lássam, mivel töltöttem az időmet.", polarity: "positive", category_id: "work_style" },
        { id: 12, text: "Sok időmet elviszik az értekezletek.", polarity: "negative", category_id: "interruptions" },
        { id: 13, text: "Nehezen végzek az olvasnivalómmal.", polarity: "negative", category_id: "paperwork" },
        { id: 14, text: "Gyakran kell rám vagy az általam benyújtandó munkára várni.", polarity: "negative", category_id: "relationships" },
        { id: 15, text: "Megfelelő hangulatba kell kerülnöm ahhoz, hogy alkotó munkát tudjak végezni.", polarity: "negative", category_id: "action" },
        { id: 16, text: "Általában könnyen mondok nemet másoknak.", polarity: "positive", category_id: "private_life" },
        { id: 17, text: "Van egy listám a munkám vagy a pályám célkitűzéseiről, és ezek konkrétak, mérhetők és pontos határidőhöz kötöttek.", polarity: "positive", category_id: "goals" },
        { id: 18, text: "Jellemző rám a kapkodás, ezért gyakran befejezetlenül hagyom a munkáimat.", polarity: "negative", category_id: "work_style" },
        { id: 19, text: "Kidolgoztam egy módszert, amellyel nyomon tudom követni, hol tartnak az elintézendő, kiemelkedő fontosságú ügyek.", polarity: "positive", category_id: "task_org" },
        { id: 20, text: "Túl sok időm megy el felesleges csevegéssel.", polarity: "negative", category_id: "interruptions" },
        { id: 21, text: "Első olvasásra el tudom intézni az aktákat, így csak egyszer kell elővennem őket.", polarity: "positive", category_id: "paperwork" },
        { id: 22, text: "Gyakran önkéntelenül is átvállalom mások munkáját, és olyasmit csinálok, amit nekik kellene elvégezni.", polarity: "negative", category_id: "relationships" },
        { id: 23, text: "Halogatom a nem túl sürgős ügyek intézését, még akkor is, ha esetleg fontosak.", polarity: "negative", category_id: "action" },
        { id: 24, "text": "Gyorsan nagy fordulatszámra tudok kapcsolni, és azt sokáig fenn is tudom tartani.", polarity: "positive", category_id: "private_life" },
        { id: 25, text: "Listát készítettem azokról a kisebb jelentőségű feladatokról, munkákról és megbízásokról, amelyeket a következő néhány héten kell elvégeznem.", polarity: "positive", category_id: "goals" },
        { id: 26, text: "Nem kell esténként vagy hétvégeken hazavinni a munkámat ahhoz, hogy elkészüljek vele.", polarity: "positive", category_id: "work_style" },
        { id: 27, text: "Úgy tűnik, mindenhez több időre van szükség, mint ahogy eredetileg terveztem, s a végén rendszerint túl sok mindent próbálok megcsinálni egyszerre.", polarity: "negative", category_id: "task_org" },
        { id: 28, text: "Mindig találok magamnak időt, amikor csak erre szükségem van.", polarity: "positive", category_id: "interruptions" },
        { id: 29, text: "Sikerült csökkentenem az akták elintézéséhez szükséges időt.", polarity: "positive", category_id: "paperwork" },
        { id: 30, text: "Rendszeresen megkérdezem másoktól, mivel pocsékolom az idejüket, hogy ezzel is javítsam mindannyiunk munkakörülményeit.", polarity: "positive", category_id: "relationships" },
        { id: 31, text: "Gyakran érzek bűntudatot az el nem végzett munka miatt.", polarity: "negative", category_id: "action" },
        { id: 32, text: "Szívesen változom és változtatok a szokásaimon.", polarity: "positive", category_id: "private_life" },
        { id: 33, text: "Legalább egyszer egy héten felülvizsgálom hosszú távú teljesítmény-célkitűzéseimet.", polarity: "positive", category_id: "goals" },
        { id: 34, text: "Korábban kell bemennem, vagy túlóráznom kell ahhoz, hogy el tudjam végezni a munkám.", polarity: "negative", category_id: "work_style" },
        { id: 35, text: "Minden héten tervet készítek, amelyben a konkrét célok mellett az is szerepel, hogy hogyan fogom megvalósítani ezeket.", polarity: "positive", category_id: "task_org" },
        { id: 36, text: "Általában felveszem a telefont, még ha fontos beszélgetést szakít is félbe.", polarity: "negative", category_id: "interruptions" },
        { id: 37, text: "Az íróasztalom vagy munkaterületem meglehetősen rendetlen; úgy érzem, nagyobb rendet kellene tartanom.", polarity: "negative", category_id: "paperwork" },
        { id: 38, text: "Összegyűjtöm az ügyeket, és egyszerre intézem el őket, hogy ritkábban zavarjam a kollégáimat munka közben.", polarity: "positive", category_id: "relationships" },
        { id: 39, text: "Hajlamos vagyok halogatni a kellemetlen munkákat.", polarity: "negative", category_id: "action" },
        { id: 40, text: "Nehezen küzdöm le a stresszt, a feszültséget és a szorongást.", polarity: "negative", category_id: "private_life" },
        { id: 41, text: "Teljesen tisztában vagyok összes tevékenységem céljával és tervezett eredményével.", polarity: "positive", category_id: "goals" },
        { id: 42, text: "Rendszerint kávézással, beszélgetéssel vagy újságolvasással kezdem a munkanapot.", polarity: "negative", category_id: "work_style" },
        { id: 43, text: "Gyakran nem sikerül az elején vagy a legfontosabb részénél kezdenem a munkát.", polarity: "negative", category_id: "task_org" },
        { id: 44, text: "Sok időmet viszi el a nem elég hatékony kommunikáció.", polarity: "negative", category_id: "interruptions" },
        { id: 45, text: "Leveleimhez, emlékeztetőimhez és beszámolóimhoz rendszeresen diktafont használok vagy magam gépelem őket.", polarity: "positive", category_id: "paperwork" },
        { id: 46, text: "Napi vagy heti rendszerességgel találkozom főnökeimmel, kollégáimmal vagy akivel kell hogy egyeztessük terveinket, az elsőbbséget élvező ügyeket vagy a napi tevékenységünket.", polarity: "positive", category_id: "relationships" },
        { id: 47, text: "Kényszerre vagy közelgő határidőre van szükségem ahhoz, hogy hozzáfogjak egy nehéz vagy bonyolult munkához.", polarity: "negative", category_id: "action" },
        { id: 48, text: "Nincs elég időm a családomra, a barátaimra vagy életem más fontos dolgaira.", polarity: "negative", category_id: "private_life" },
        { id: 49, text: "Elveszek a részletekben, s hajlamos vagyok lassítani embereim munkáját.", polarity: "negative", category_id: "mgmt_relationships" },
        { id: 50, text: "Minden értekezlet után figyelemmel kísérem a munkát, hogy megbizonyosodhassak a kiadott feladatok elvégzéséről.", polarity: "positive", category_id: "mgmt_interruptions" },
        { id: 51, text: "Van egy határozott tervem a beosztottjaim továbbképzésére, hogy több feladatot bízhassak rájuk.", polarity: "positive", category_id: "mgmt_task_org" },
        { id: 52, text: "Ha összehívok egy értekezletet, nem írom le a konkrét célokat, és nem készítek napirendet.", polarity: "negative", category_id: "mgmt_interruptions" },
        { id: 53, text: "Minden héten találkozom legfontosabb munkatársaimmal, hogy egyeztessük a heti terveinket, céljainkat és azok fontossági sorrendjét.", polarity: "positive", category_id: "mgmt_task_org" },
        { id: 54, text: "Sokszor gyorsabb és egyszerűbb, ha magam csinálok meg valamit, mintha másokat bíznék meg vele.", polarity: "negative", category_id: "mgmt_relationships" },
        { id: 55, text: "Minden reggel átnézem a napi teendőket és célokat a titkárnőmmel vagy valamelyik munkatársammal.", polarity: "positive", category_id: "mgmt_task_org" },
        { id: 56, text: "Gyakran elfelejtem nyomon követni vagy ellenőrizni a kiadott munkát.", polarity: "negative", category_id: "mgmt_relationships" },
        { id: 57, text: "Az általam összehívott értekezletek időben kezdődnek és időben érnek véget.", polarity: "positive", category_id: "mgmt_interruptions" },
        { id: 58, text: "Nem elemzem és tervezem meg jó előre a dolgokat, mielőtt másokra bízok egy munkát.", polarity: "negative", category_id: "mgmt_relationships" },
        { id: 59, text: "Az értekezleteim nem igazán jól szervezettek, s nem tudunk annyit elvégezni, amennyit kellene.", polarity: "negative", category_id: "mgmt_interruptions" },
        { id: 60, text: "Minden beosztottam ismeri csapatunk célkitűzéseit és saját szerepét azok elérésében.", polarity: "positive", category_id: "mgmt_task_org" }
    ],
    results_logic: {
        basic_only: [
            { level: "I", min: 48, max: 67, description: "Nagyon alacsony időhasznosítás" },
            { level: "II", min: 68, max: 96, description: "Alacsony időhasznosítás" },
            { level: "III", min: 97, max: 144, description: "Közepes időhasznosítás" },
            { level: "IV", min: 145, max: 173, description: "Jó időhasznosítás" },
            { level: "V", min: 174, max: 192, description: "Kiváló időhasznosítás" }
        ],
        supplementary_only: [
            { level: "I", min: 12, max: 17 },
            { level: "II", min: 18, max: 24 },
            { level: "III", min: 25, max: 36 },
            { level: "IV", min: 37, max: 43 },
            { level: "V", min: 44, max: 48 }
        ],
        combined: [
            { level: "I", min: 60, max: 84 },
            { level: "II", min: 85, max: 120 },
            { level: "III", min: 121, max: 180 },
            { level: "IV", min: 181, max: 216 },
            { level: "V", min: 217, max: 240 }
        ]
    }
};
