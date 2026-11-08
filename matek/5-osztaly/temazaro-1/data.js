// ===================================================================
// 5. OSZTÁLY MATEMATIKA - 1. TÉMAZÁRÓ GYAKORLÓ FELADATBÁZIS
// Témák: Természetes számok, írás és olvasás, helyiérték,
//        számegyenes, fejszámolás, ügyes csoportosítás, műveleti sorrend
// ===================================================================

const QUIZ_DATA = {
  meta: {
    title: "5. osztályos matematika témazáró gyakorló",
    subtitle: "Természetes számok, helyiérték, számegyenes, fejszámolás, műveleti sorrend",
    grade: "5. osztály",
    topicCode: "MAT-5-TZ1"
  },
  blocks: [
    {
      id: "block-1",
      number: "1.",
      title: "Számok írása és olvasása",
      badge: "Helyesírás & Számjegyek",
      description: "A természetes számok helyes leírása betűkkel és számjegyekkel a magyar helyesírási szabályok szerint.",
      ruleHint: "Emlékeztető szabály: 2000-ig minden számot egybeírunk (pl. 1802: ezernyolcszázkettő, 2000: kétezer). Kétezernél nagyobb számokat hátulról hármas csoportokba tagoljuk és kötőjellel választjuk el (pl. 3 045: háromezer-negyvenöt, 123 916: százhuszonháromezer-kilencszáztizenhat). Kivétel: a kerek ezresek és milliók egybeíródnak (pl. 53 000: ötvenháromezer, 9 000 000: kilencmillió).",
      tasks: [
        {
          id: "t1_digits",
          title: "Írd le a számokat számjegyekkel!",
          instructions: "Írd be a számot számjegyekkel (pl. 896 vagy 1305).",
          items: [
            { id: "1a", label: "a)", prompt: "nyolcszázkilencvenhat", expected: "896", explanation: "800 + 90 + 6 = 896" },
            { id: "1b", label: "b)", prompt: "ezerháromszázöt", expected: "1305", explanation: "1000 + 300 + 0 tízes + 5 = 1 305" },
            { id: "1c", label: "c)", prompt: "kettőezer-tizenhét", expected: "2017", explanation: "2000 + 17 = 2 017" },
            { id: "1d", label: "d)", prompt: "kilencvenezer-négyszázharmincegy", expected: "90431", explanation: "90 000 + 431 = 90 431" },
            { id: "1e", label: "e)", prompt: "kétszáznegyvenötezer-huszonkilenc", expected: "245029", explanation: "245 000 + 0 százas + 29 = 245 029 (figyelj a 0 százasra!)" },
            { id: "1f", label: "f)", prompt: "hatvanhárommillió-négyszáztízezer", expected: "63410000", explanation: "63 000 000 + 410 000 = 63 410 000" },
            { id: "1g", label: "g)", prompt: "kétmillió-kilencszáznegyvenkétezer-hatvanöt", expected: "2942065", explanation: "2 000 000 + 942 000 + 0 százas + 65 = 2 942 065" },
            { id: "1h", label: "h)", prompt: "ötmillió-hetvenháromezer-tizenkettő", expected: "5073012", explanation: "5 000 000 + 073 000 + 012 = 5 073 012" },
            { id: "1i", label: "i)", prompt: "hétszáznyolcvanháromezer-ötvenkilenc", expected: "783059", explanation: "783 000 + 059 = 783 059" },
            { id: "1j", label: "j)", prompt: "négymillió-négyezer-négy", expected: "4004004", explanation: "4 000 000 + 004 000 + 004 = 4 004 004" }
          ]
        },
        {
          id: "t1_words",
          title: "Írd le a számokat betűkkel a helyesírási szabályok szerint!",
          instructions: "Ügyelj az egybeírásra és a kötőjelekre!",
          items: [
            { id: "1w_a", label: "a)", prompt: "107", expected: "százhét", explanation: "2000 alatti szám, egybeírjuk." },
            { id: "1w_b", label: "b)", prompt: "1 070", expected: "ezerhetven", explanation: "2000 alatti szám, egybeírjuk." },
            { id: "1w_c", label: "c)", prompt: "2 000", expected: "kétezer", explanation: "2000-ig egybeírjuk." },
            { id: "1w_d", label: "d)", prompt: "2 089", expected: "kétezer-nyolcvankilenc", explanation: "2000 feletti szám, nem kerek ezres: a 2 000 és a 89 közé kötőjel jön." },
            { id: "1w_e", label: "e)", prompt: "2 980", expected: "kétezer-kilencszáznyolcvan", explanation: "2000 feletti szám: hármas csoportok szerint kétezer-kilencszáznyolcvan." },
            { id: "1w_f", label: "f)", prompt: "20 809", expected: "húszezer-nyolcszázkilenc", explanation: "20 000 és 809 csoportosítás: húszezer-nyolcszázkilenc." },
            { id: "1w_g", label: "g)", prompt: "62 305", expected: "hatvankétezer-háromszázöt", explanation: "62 000 és 305 csoportosítás: hatvankétezer-háromszázöt." },
            { id: "1w_h", label: "h)", prompt: "1 200 000", expected: "egymillió-kétszázezer", explanation: "1 000 000 és 200 000: egymillió-kétszázezer." }
          ]
        }
      ]
    },
    {
      id: "block-2",
      number: "2.",
      title: "Helyiérték-fiókok és a gép",
      badge: "Helyiérték fogalma",
      description: "A számológép fiókjaiba különböző címleteket teszünk. Számold ki, milyen számot ír ki a gép!",
      ruleHint: "Jelölések: E = ezres (1 000), sz = százas (100), t = tízes (10), e = egyes (1). Számolás: minden címletet szorozz be az értékével, majd add össze őket!",
      tasks: [
        {
          id: "t2_drawers",
          title: "Mit ír ki a gép, ha a fiókokba ennyit teszünk bele?",
          instructions: "Írd be az összeadott végeredményt!",
          items: [
            {
              id: "2a",
              label: "a)",
              prompt: "45 E, 5 e, 13 sz, 92 t",
              expected: "47225",
              explanation: "45 · 1000 + 5 · 1 + 13 · 100 + 92 · 10 = 45 000 + 5 + 1 300 + 920 = 47 225"
            },
            {
              id: "2b",
              label: "b)",
              prompt: "2000 t, 38 sz",
              expected: "23800",
              explanation: "2000 · 10 + 38 · 100 = 20 000 + 3 800 = 23 800"
            },
            {
              id: "2c",
              label: "c)",
              prompt: "28 sz, 532 E, 23 e",
              expected: "534823",
              explanation: "28 · 100 + 532 · 1000 + 23 · 1 = 2 800 + 532 000 + 23 = 534 823"
            },
            {
              id: "2d",
              label: "d)",
              prompt: "25 E, 13 sz, 29 t, 78 e",
              expected: "26668",
              explanation: "25 · 1000 + 13 · 100 + 29 · 10 + 78 · 1 = 25 000 + 1 300 + 290 + 78 = 26 668"
            },
            {
              id: "2e",
              label: "e)",
              prompt: "120 sz, 15 t, 6 e",
              expected: "12156",
              explanation: "120 · 100 + 15 · 10 + 6 · 1 = 12 000 + 150 + 6 = 12 156"
            },
            {
              id: "2f",
              label: "f)",
              prompt: "4 E, 70 t, 12 e",
              expected: "4712",
              explanation: "4 · 1000 + 70 · 10 + 12 · 1 = 4 000 + 700 + 12 = 4 712"
            }
          ]
        }
      ]
    },
    {
      id: "block-3",
      number: "3.",
      title: "Számegyenes és számhalmazok",
      badge: "Grafikus ábrázolás",
      description: "Számok leolvasása a számegyenesről és számhalmazok leírása matematikai egyenlőtlenségekkel.",
      ruleHint: "Először keresd meg a beosztás egységét! Két ismert szám távolságát oszd el a közöttük lévő közök számával. A piros pontok értékeit ennek alapján számold ki!",
      tasks: [
        {
          id: "t3_read",
          title: "1. Olvasd le a számegyenesről a megjelölt pontok értékét!",
          instructions: "Határozd meg az egységközt, majd add meg a betűkkel jelölt piros pontok értékét!",
          type: "numberline_read",
          lines: [
            {
              id: "nl_a",
              label: "a)",
              min: -15, max: 25,
              step: 5,
              known: [{ val: 0, label: "0" }, { val: 10, label: "10" }],
              points: [
                { id: "3a_1", name: "A", val: -15, label: "A pont:" },
                { id: "3a_2", name: "B", val: 20, label: "B pont:" }
              ],
              explanation: "A 0 és 10 között 2 egységköz van, így 1 egységköz = 10 : 2 = 5. A = 0 - 3·5 = -15; B = 10 + 2·5 = 20."
            },
            {
              id: "nl_b",
              label: "b)",
              min: 1100, max: 1450,
              step: 50,
              known: [{ val: 1150, label: "1150" }, { val: 1300, label: "1300" }],
              points: [
                { id: "3b_1", name: "A", val: 1100, label: "A pont:" },
                { id: "3b_2", name: "B", val: 1200, label: "B pont:" },
                { id: "3b_3", name: "C", val: 1250, label: "C pont:" },
                { id: "3b_4", name: "D", val: 1400, label: "D pont:" }
              ],
              explanation: "1300 - 1150 = 150. Közöttük 3 egységköz van, tehát 1 köz = 150 : 3 = 50. A = 1100, B = 1200, C = 1250, D = 1400."
            },
            {
              id: "nl_c",
              label: "c)",
              min: 0, max: 45,
              step: 3,
              known: [{ val: 12, label: "12" }, { val: 21, label: "21" }],
              points: [
                { id: "3c_1", name: "A", val: 0, label: "A pont:" },
                { id: "3c_2", name: "B", val: 33, label: "B pont:" },
                { id: "3c_3", name: "C", val: 42, label: "C pont:" }
              ],
              explanation: "21 - 12 = 9. Közöttük 3 köz van, tehát 1 köz = 9 : 3 = 3. A = 12 - 4·3 = 0, B = 21 + 4·3 = 33, C = 21 + 7·3 = 42."
            },
            {
              id: "nl_d",
              label: "d)",
              min: 1, max: 37,
              step: 4,
              known: [{ val: 5, label: "5" }, { val: 29, label: "29" }],
              points: [
                { id: "3d_1", name: "A", val: 1, label: "A pont:" },
                { id: "3d_2", name: "B", val: 9, label: "B pont:" },
                { id: "3d_3", name: "C", val: 13, label: "C pont:" },
                { id: "3d_4", name: "D", val: 17, label: "D pont:" },
                { id: "3d_5", name: "E", val: 21, label: "E pont:" },
                { id: "3d_6", name: "F", val: 33, label: "F pont:" }
              ],
              explanation: "29 - 5 = 24. Közöttük 6 köz van, tehát 1 köz = 24 : 6 = 4. Pontok: 1, 9, 13, 17, 21, 33."
            }
          ]
        },
        {
          id: "t3_intervals",
          title: "2. Add meg matematikai jelekkel az ábrázolt számhalmazokat!",
          instructions: "Válaszd ki vagy írd be a helyes egyenlőtlenséget (teli pont = zárt határ, üres karika = nyitott határ)!",
          type: "interval_select",
          items: [
            {
              id: "3int_a",
              label: "a)",
              description: "Számegyenes: 7-nél teli karika, 19-nél üres karika, közöttük a szakasz piros.",
              options: [
                { val: "7 <= x < 19", label: "7 ≤ x < 19" },
                { val: "7 < x <= 19", label: "7 < x ≤ 19" },
                { val: "7 <= x <= 19", label: "7 ≤ x ≤ 19" },
                { val: "x > 7", label: "x > 7" }
              ],
              expected: "7 <= x < 19",
              explanation: "A 7-nél teli karika van, így oda tartozik (≤), a 19-nél üres karika, így nem tartozik oda (<): 7 ≤ x < 19."
            },
            {
              id: "3int_b",
              label: "b)",
              description: "Számegyenes: 0-nál üres karika, balra húzódik a piros nyíl.",
              options: [
                { val: "x < 0", label: "x < 0 (a negatív számok)" },
                { val: "x <= 0", label: "x ≤ 0" },
                { val: "x > 0", label: "x > 0" },
                { val: "x >= 0", label: "x ≥ 0" }
              ],
              expected: "x < 0",
              explanation: "A 0-nál üres karika van és balra megy a nyíl: x < 0."
            },
            {
              id: "3int_c",
              label: "c)",
              description: "Számegyenes: 22 és 28 között csak az egész pontok vannak bejelölve (23, 24, 25, 26, 27).",
              options: [
                { val: "22 < x < 28 egesz", label: "22 < x < 28 és x egész szám (23, 24, 25, 26, 27)" },
                { val: "22 <= x <= 28", label: "22 ≤ x ≤ 28 minden szám" },
                { val: "x >= 22", label: "x ≥ 22" },
                { val: "x = 25", label: "x = 25" }
              ],
              expected: "22 < x < 28 egesz",
              explanation: "Mivel csak pontok vannak bejelölve, a halmaz a 22 és 28 közötti egész számokból áll: 23, 24, 25, 26, 27."
            },
            {
              id: "3int_d",
              label: "d)",
              description: "Számegyenes: 0 és 50 között 5 köz = 10/köz. Teli pont 10-nél, üres karika 20-nál.",
              options: [
                { val: "10 <= x < 20", label: "10 ≤ x < 20" },
                { val: "0 <= x < 20", label: "0 ≤ x < 20" },
                { val: "10 < x <= 20", label: "10 < x ≤ 20" },
                { val: "x < 20", label: "x < 20" }
              ],
              expected: "10 <= x < 20",
              explanation: "Az 1. köz a 10 (teli karika), a 2. köz a 20 (üres karika): 10 ≤ x < 20."
            },
            {
              id: "3int_e",
              label: "e)",
              description: "Számegyenes: 9-nél üres karika, jobbra húzódik a piros nyíl.",
              options: [
                { val: "x > 9", label: "x > 9" },
                { val: "x >= 9", label: "x ≥ 9" },
                { val: "x < 9", label: "x < 9" },
                { val: "9 <= x <= 10", label: "9 ≤ x ≤ 10" }
              ],
              expected: "x > 9",
              explanation: "Üres karika a 9-nél és jobbra nyíl: x > 9."
            },
            {
              id: "3int_f",
              label: "f)",
              description: "Számegyenes: 1 000 000-nál teli karika és 8 000 000-nál teli karika, közöttük piros.",
              options: [
                { val: "1000000 <= x <= 8000000", label: "1 000 000 ≤ x ≤ 8 000 000" },
                { val: "1000000 < x < 8000000", label: "1 000 000 < x < 8 000 000" },
                { val: "x >= 1000000", label: "x ≥ 1 000 000" },
                { val: "x <= 8000000", label: "x ≤ 8 000 000" }
              ],
              expected: "1000000 <= x <= 8000000",
              explanation: "Mindkét végponton teli karika van, így mindkettő zárt: 1 000 000 ≤ x ≤ 8 000 000."
            }
          ]
        }
      ]
    },
    {
      id: "block-4",
      number: "4.",
      title: "Fejszámolás: Kerek számok szorzása",
      badge: "Szorzás 10-zel, 100-zal, 1000-rel",
      description: "Számold ki fejben a szorzatokat kerek tízesekkel, százasokkal és ezresekkel!",
      ruleHint: "Szabály: Szorozd össze a nullák előtti számokat, majd a végére írd oda az összes tényezőből az összes nullát! (Pl. 500 · 300 = (5 · 3) és 2 + 2 = 4 nulla = 150 000).",
      tasks: [
        {
          id: "t4_round_mult",
          title: "Szorozz fejben!",
          instructions: "Írd be a helyes szorzatot!",
          items: [
            { id: "4_1", prompt: "10 · 9 =", expected: "90", explanation: "10 · 9 = 90" },
            { id: "4_2", prompt: "10 · 81 =", expected: "810", explanation: "81 · 10 = 810" },
            { id: "4_3", prompt: "1000 · 16 =", expected: "16000", explanation: "16 · 1000 = 16 000" },
            { id: "4_4", prompt: "1000 · 5812 =", expected: "5812000", explanation: "5812 után 3 nulla = 5 812 000" },
            { id: "4_5", prompt: "100 · 20 =", expected: "2000", explanation: "2 · 1 és 1 + 2 = 3 nulla = 2 000" },
            { id: "4_6", prompt: "1000 · 498 =", expected: "498000", explanation: "498 után 3 nulla = 498 000" },
            { id: "4_7", prompt: "249 · 10 =", expected: "2490", explanation: "249 után 1 nulla = 2 490" },
            { id: "4_8", prompt: "10 · 200 =", expected: "2000", explanation: "200 · 10 = 2 000" },
            { id: "4_9", prompt: "10 · 3560 =", expected: "35600", explanation: "3560 után 1 nulla = 35 600" },
            { id: "4_10", prompt: "7 · 100 =", expected: "700", explanation: "7 · 100 = 700" },
            { id: "4_11", prompt: "8077 · 100 =", expected: "807700", explanation: "8077 után 2 nulla = 807 700" },
            { id: "4_12", prompt: "500 · 300 =", expected: "150000", explanation: "5 · 3 = 15, utána 2+2=4 db nulla: 150 000" },
            { id: "4_13", prompt: "1000 · 3 =", expected: "3000", explanation: "3 · 1000 = 3 000" },
            { id: "4_14", prompt: "351 · 100 =", expected: "35100", explanation: "351 után 2 nulla = 35 100" },
            { id: "4_15", prompt: "300 · 1000 =", expected: "300000", explanation: "300 után 3 nulla = 300 000" },
            { id: "4_16", prompt: "320 · 2000 =", expected: "640000", explanation: "32 · 2 = 64, utána 1+3=4 db nulla: 640 000" }
          ]
        }
      ]
    },
    {
      id: "block-5",
      number: "5.",
      title: "Ügyes csoportosítás: Szorzás és osztás",
      badge: "Műveleti trükkök",
      description: "Ezek a számítások könnyen elvégezhetők fejben, ha ügyesen változtatod a műveletek sorrendjét és csoportosítod a számokat!",
      ruleHint: "Keresd az összetartozó párokat: 4 · 25 = 100, 2 · 5 = 10, 8 · 125 = 1000! Ha a szorzatban 0 szerepel tényezőként, az egész eredmény 0. Egyszerűsíts osztásnál azonos számokkal!",
      tasks: [
        {
          id: "t5_smart_mult",
          title: "Számolj fejben ügyes csoportosítással!",
          instructions: "Írd be az eredményt!",
          items: [
            {
              id: "5a",
              label: "a)",
              prompt: "13 · 4 · 25 =",
              expected: "1300",
              explanation: "Ügyes csoportosítás: 4 · 25 = 100, így 13 · 100 = 1 300."
            },
            {
              id: "5b",
              label: "b)",
              prompt: "25 · 30 · 15 · 4 =",
              expected: "45000",
              explanation: "Csoportosítás: (25 · 4) · (30 · 15) = 100 · 450 = 45 000."
            },
            {
              id: "5c",
              label: "c)",
              prompt: "12 · 3 · 13 · 2 : 26 =",
              expected: "36",
              explanation: "Vegyük észre, hogy 13 · 2 = 26! Mivel 26 : 26 = 1, csak 12 · 3 = 36 marad."
            },
            {
              id: "5d",
              label: "d)",
              prompt: "2 · 19 · 5 =",
              expected: "190",
              explanation: "2 · 5 = 10, így 10 · 19 = 190."
            },
            {
              id: "5e",
              label: "e)",
              prompt: "8 · 5 · 7 · 125 =",
              expected: "35000",
              explanation: "8 · 125 = 1000, 5 · 7 = 35. Eredmény: 35 · 1000 = 35 000."
            },
            {
              id: "5f",
              label: "f)",
              prompt: "47 · 12 · 0 : 35 : 7 =",
              expected: "0",
              explanation: "Bármilyen szorzat, amiben 0 tényező van, 0 lesz! (0 : 35 : 7 = 0)."
            },
            {
              id: "5g",
              label: "g)",
              prompt: "5 · 195 · 20 =",
              expected: "19500",
              explanation: "5 · 20 = 100, így 195 · 100 = 19 500."
            },
            {
              id: "5h",
              label: "h)",
              prompt: "3 · 5 · 29 · 20 : 29 : 2 =",
              expected: "150",
              explanation: "29 : 29 = 1. A maradék: 3 · (5 · 20) : 2 = 3 · 100 : 2 = 300 : 2 = 150."
            },
            {
              id: "5i",
              label: "i)",
              prompt: "7 · 15 · 7 : 49 : 3 =",
              expected: "5",
              explanation: "7 · 7 = 49, ami osztva 49-cel = 1. Marad: 15 : 3 = 5."
            },
            {
              id: "5j",
              label: "j)",
              prompt: "43 · 2 · 5 · 0 · 21 =",
              expected: "0",
              explanation: "Nullával való szorzás eredménye mindig 0."
            },
            {
              id: "5k",
              label: "k)",
              prompt: "43 · 12 · 5 : 43 · 2 =",
              expected: "120",
              explanation: "43 : 43 = 1. Marad: 12 · 5 · 2 = 12 · 10 = 120."
            },
            {
              id: "5l",
              label: "l)",
              prompt: "99 · 110 : 33 : 33 =",
              expected: "10",
              explanation: "99 : 33 = 3. Utána: 3 · 110 = 330. Végül: 330 : 33 = 10."
            }
          ]
        }
      ]
    },
    {
      id: "block-6",
      number: "6.",
      title: "Ügyes csoportosítás: Összeadás és kivonás",
      badge: "Kerek összegek képzése",
      description: "Párosítsd a számokat úgy, hogy kerek tízeseket vagy százasokat kapj!",
      ruleHint: "Keresd azokat az utolsó számjegyeket, amelyek összege 10: (3 + 7 = 10, 5 + 5 = 10, 8 + 2 = 10). Kivonásnál vond össze az azonos végűeket!",
      tasks: [
        {
          id: "t6_smart_add",
          title: "Ügyes csoportosítással fejben számítsd ki az összeget!",
          instructions: "Írd be a végeredményt!",
          items: [
            {
              id: "6a",
              label: "a)",
              prompt: "143 + 127 + 105 + 95 + 73 + 57 =",
              expected: "600",
              explanation: "(143 + 57) + (127 + 73) + (105 + 95) = 200 + 200 + 200 = 600."
            },
            {
              id: "6b",
              label: "b)",
              prompt: "400 + 565 + 178 + 235 + 622 =",
              expected: "2000",
              explanation: "400 + (565 + 235) + (178 + 622) = 400 + 800 + 800 = 2 000."
            },
            {
              id: "6c",
              label: "c)",
              prompt: "45 + 54 + 63 + 72 + 81 + 90 + 99 + 108 + 117 + 126 + 135 =",
              expected: "990",
              explanation: "Szimmetrikus párok: (45 + 135) + (54 + 126) + (63 + 117) + (72 + 108) + (81 + 99) + 90 = 5 · 180 + 90 = 900 + 90 = 990."
            },
            {
              id: "6d",
              label: "d)",
              prompt: "547 - 253 + 457 - 343 + 453 - 347 + 543 - 257 =",
              expected: "800",
              explanation: "Csoportosítsuk az azonos végűeket: (547 - 347) + (457 - 257) + (453 - 253) + (543 - 343) = 200 + 200 + 200 + 200 = 800."
            },
            {
              id: "6e",
              label: "e)",
              prompt: "200 - 197 + 194 - 191 + 188 - 185 + 182 - 179 + 176 - 173 =",
              expected: "15",
              explanation: "Kettesével párosítva minden különbség 3: (200-197) + (194-191) + (188-185) + (182-179) + (176-173) = 3 + 3 + 3 + 3 + 3 = 15."
            }
          ]
        }
      ]
    },
    {
      id: "block-7",
      number: "7.",
      title: "Hiányzó tényező és hányados összefüggései",
      badge: "Szorzat & Hányados változásai",
      description: "Figyeld meg, hogyan változik a szorzat vagy a hányados, ha az egyik tag változik!",
      ruleHint: "Ha a szorzásnál az egyik tényezőt megszorozzuk 10-zel, a szorzat is 10-szeres lesz. Ha az osztandó nő, a hányados nő; ha az osztó nő, a hányados csökken!",
      tasks: [
        {
          id: "t7_factors",
          title: "Számítsd ki a hiányzó tényezőt!",
          instructions: "Írd be a pontozott helyre illő számot!",
          items: [
            { id: "7a_1", prompt: "4 · _____ = 48", expected: "12", explanation: "48 : 4 = 12" },
            { id: "7a_2", prompt: "40 · _____ = 4800", expected: "120", explanation: "4800 : 40 = 120 (a tényező 10-szeres, mert 40 a tízszerese a 4-nek és 4800 a százszorosa)" },
            { id: "7a_3", prompt: "400 · _____ = 4800", expected: "12", explanation: "4800 : 400 = 12" },
            { id: "7a_4", prompt: "80 · _____ = 2400", expected: "30", explanation: "2400 : 80 = 30" },
            { id: "7a_5", prompt: "1600 · _____ = 19200", expected: "12", explanation: "19 200 : 1600 = 12" },
            { id: "7b_1", prompt: "_____ · 9 = 54", expected: "6", explanation: "54 : 9 = 6" },
            { id: "7b_2", prompt: "_____ · 900 = 5400", expected: "6", explanation: "5400 : 900 = 6" },
            { id: "7b_3", prompt: "_____ · 900 = 54 000", expected: "60", explanation: "54 000 : 900 = 60" },
            { id: "7b_4", prompt: "_____ · 450 = 5400", expected: "12", explanation: "Mivel 450 fele a 900-nak, a másik tényező a duplája (6 · 2 = 12)." }
          ]
        },
        {
          id: "t7_quotients",
          title: "Számítsd ki a hiányzó értéket az osztásnál!",
          instructions: "Írd be a pontozott helyre illő hiányzó számot!",
          items: [
            { id: "7q_1", prompt: "_____ : 3 = 18", expected: "54", explanation: "18 · 3 = 54" },
            { id: "7q_2", prompt: "_____ : 30 = 18", expected: "540", explanation: "18 · 30 = 540" },
            { id: "7q_3", prompt: "_____ : 300 = 180", expected: "54000", explanation: "180 · 300 = 54 000" },
            { id: "7q_4", prompt: "72 : _____ = 24", expected: "3", explanation: "72 : 24 = 3" },
            { id: "7q_5", prompt: "7200 : _____ = 240", expected: "30", explanation: "7200 : 240 = 30" },
            { id: "7q_6", prompt: "72 000 : _____ = 240", expected: "300", explanation: "72 000 : 240 = 300" },
            { id: "7q_7", prompt: "_____ : 45 = 3", expected: "135", explanation: "3 · 45 = 135" },
            { id: "7q_8", prompt: "750 : _____ = 50", expected: "15", explanation: "750 : 50 = 15" },
            { id: "7q_9", prompt: "75 000 : _____ = 2500", expected: "30", explanation: "75 000 : 2500 = 30" }
          ]
        }
      ]
    },
    {
      id: "block-8",
      number: "8.",
      title: "Műveleti sorrend és a zárójelek szerepe",
      badge: "Zárójelezés szabályai",
      description: "Figyeld meg, hogyan változik meg a kifejezés értéke a zárójelek elhelyezésétől függően!",
      ruleHint: "Műveleti sorrend: 1. Zárójelben lévő műveletek, 2. Szorzás és osztás balról jobbra haladva, 3. Összeadás és kivonás balról jobbra haladva.",
      tasks: [
        {
          id: "t8_brackets_1",
          title: "Számítsd ki az eredményeket a zárójelek figyelembevételével! (1. csoport)",
          instructions: "Végezd el a számításokat a helyes műveleti sorrendben!",
          items: [
            {
              id: "8a_1",
              label: "a)",
              prompt: "600 - 200 : 8 + 2 =",
              expected: "577",
              explanation: "1. 200 : 8 = 25. Majd balról jobbra: 600 - 25 = 575, és 575 + 2 = 577."
            },
            {
              id: "8a_2",
              label: "b)",
              prompt: "(600 - 200) : 8 + 2 =",
              expected: "52",
              explanation: "1. Zárójel: 600 - 200 = 400. 2. Osztás: 400 : 8 = 50. 3. Összeadás: 50 + 2 = 52."
            },
            {
              id: "8a_3",
              label: "c)",
              prompt: "600 - 200 : (8 + 2) =",
              expected: "580",
              explanation: "1. Zárójel: 8 + 2 = 10. 2. Osztás: 200 : 10 = 20. 3. Kivonás: 600 - 20 = 580."
            },
            {
              id: "8a_4",
              label: "d)",
              prompt: "(600 - 200) : (8 + 2) =",
              expected: "40",
              explanation: "1. Zárójelek: 600 - 200 = 400 és 8 + 2 = 10. 2. Osztás: 400 : 10 = 40."
            },
            {
              id: "8a_5",
              label: "e)",
              prompt: "600 - (200 : 8 + 2) =",
              expected: "573",
              explanation: "A zárójelen belül: 200 : 8 = 25, 25 + 2 = 27. Végül: 600 - 27 = 573."
            }
          ]
        },
        {
          id: "t8_brackets_2",
          title: "Számítsd ki az eredményeket! (2. csoport)",
          instructions: "Ügyelj a műveleti sorrendre és a zárójelekre!",
          items: [
            {
              id: "8b_1",
              label: "a)",
              prompt: "200 · 3 + 2 · 300 - 100 =",
              expected: "1100",
              explanation: "Szorzások: 200 · 3 = 600 és 2 · 300 = 600. Majd: 600 + 600 - 100 = 1 100."
            },
            {
              id: "8b_2",
              label: "b)",
              prompt: "200 · (3 + 2) · 300 - 100 =",
              expected: "299900",
              explanation: "Zárójel: 3 + 2 = 5. Szorzás: 200 · 5 = 1000, 1000 · 300 = 300 000. Végül: 300 000 - 100 = 299 900."
            },
            {
              id: "8b_3",
              label: "c)",
              prompt: "200 · 3 + 2 · (300 - 100) =",
              expected: "1000",
              explanation: "Zárójel: 300 - 100 = 200. Szorzások: 200 · 3 = 600 és 2 · 200 = 400. Összeg: 600 + 400 = 1 000."
            },
            {
              id: "8b_4",
              label: "d)",
              prompt: "200 · (3 + 2) · (300 - 100) =",
              expected: "200000",
              explanation: "Zárójelek: 3 + 2 = 5 és 300 - 100 = 200. Szorzás: 200 · 5 · 200 = 1000 · 200 = 200 000."
            },
            {
              id: "8b_5",
              label: "e)",
              prompt: "(5600 - 1600) : (50 + 30) =",
              expected: "50",
              explanation: "Zárójelek: 5600 - 1600 = 4000 és 50 + 30 = 80. Osztás: 4000 : 80 = 50."
            },
            {
              id: "8b_6",
              label: "f)",
              prompt: "7200 : (60 + 40 · 3) =",
              expected: "40",
              explanation: "Zárójelen belül a szorzás az első: 40 · 3 = 120, majd 60 + 120 = 180. Végül: 7200 : 180 = 40."
            }
          ]
        }
      ]
    }
  ]
};

// Exportálás böngésző és modul kompatibilis formában
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QUIZ_DATA;
}
