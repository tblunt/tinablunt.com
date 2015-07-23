$(function () {
    var skolProjekt = [
               {
                   title: "Design",
                   img: ["/img/bob0488.jpg"],
                   shortTitle: "Design",
                   underTitle: "Skolprojekt",
                   x: 50,
                   y: 150,
                   thumbNail: "/img/ThumbNails/bob.png",
                   description: "Designprojekt då jag med tre andra planerade och skapade designkonceptet runt en handhållen enhet vi ville uppfinna. Vi skapde Bob, the Book of Books, som var ett digitalt sätt att läsa och lagra böcker (Detta var 2007, långt innan läsplattorna kom ut på marknaden)."
               },
                {
                    title: "3D-Datorgrafik",
                    img: ["/img/9126_146136472200_3911258_n.jpg"],
                    shortTitle: "3D-Datorgrafik",
                    underTitle: "Skolprojekt",
                    x: 320,
                    y: 160,
                    thumbNail: "/img/ThumbNails/3d2.jpg",
                    description: "Tillsammans med fyra klasskamrater var jag med och skapade dataspelet Volksball, som går ut på att två folkabussar spelar fotboll med en badboll. Spelet är skrivet i C++ med egen fysikmotor och 3D-grafik. Jag arbetade främst i Photoshop och ritade alla texturer, framsidan och hightmapen, men deltogäven i arbetet i 3dStudio Max med bilar och spelplan."
                },
                {
                    title: "Avancerad Bildbehandling",
                    img: ["/img/im8c.jpg",
                            "/img/prickarochbalkar.png",
                            "/img/boundingbox.png",
                            "/img/klarr.png"],
                    shortTitle: "Bildbehandling",
                    underTitle: "Skolprojekt",
                    x: 480,
                    y: 140,
                    thumbNail: "/img/ThumbNails/abob.png",
                    description: "Skapade i en grupp om tre ett program i  Matlab som, med hjälp av olika bildbehandlingsalgoritmer, tar in en bild på ett notblad och skriver sedan ut noterna i text. Bilderna visar några av stegen som utfördes för att hitta och klassificera noterna."
                },
                {
                    title: "Concept Art",
                    img: ["/img/39082_432445227200_533537200_5292360_2457477_n.jpg",
                                "/img/flicka.jpg",
                                "/img/37718_428134417200_533537200_5170752_2208684_n.jpg"],
                    shortTitle: "Concept Art",
                    underTitle: "Skolprojekt",
                    x: 550,
                    y: 170,
                    thumbNail: "/img/ThumbNails/concept.png",
                    description: "Målade koncept i Photoshop, bland annat på huvudkaraktären, miljön, vapen och tillbehör, utifrån en given TV-spelsidé. (Sommarkurs på Gotlands universitet)"
                },
                {
                    title: "Bilddatabaser",
                    img: ["/img/intensity_result.jpg",
                                "/img/query1_facit.jpg",
                                "/img/pojke.jpg"],
                    shortTitle: "Bilddatabaser",
                    underTitle: "Skolprojekt",
                    x: 677,
                    y: 150,
                    thumbNail: "/img/ThumbNails/bdb.png",
                    description: "Tillsammans med två klasskamrater skapade jag program i Matlab som med hjälp av bildbehandlingsalgoritmer, bland annat 3D-histogram, sökte i stora bilddatabaser(5000 bilder stora). Programmen tog in en referebild och spottade ut de 20 bilder som var mest lika referensen. Vi avslutade kursen med att skriva ett program som hittade bilder i bilddatabasen med ansikten på."
                },
                {
                    title: "Agil användbarhetsutveckling för handhållna enheter",
                    img: ["/img/221790_10150185773562201_533537200_7281160_4615444_n.jpg",
                                "/img/meny.jpeg",
                                "/img/play1.jpeg",
                                "/img/screehot2.jpg"],
                    shortTitle: "Agil",
                    underTitle: "Skolprojekt",
                    x: 750,
                    y: 140,
                    thumbNail: "/img/ThumbNails/agil.jpg",
                    description: "Arbetade i en grupp om åtta enligt Scrum för att skapa Androidspelet ”Peas in war”. Spelet är skrivet i Java och går ut på att två spelare krigar genom att skjuta varandra, alternativt fly med sin lian. Det spelas på två olika androidtelefoner över nätverket. Jag gjorde all grafik till spelet(karaktärer, animationer, menyer och knappar samt spelplanen) i Photoshop och deltogäven i programmeringen."
                },
               {
                   title: "Informationsvisualisering",
                   img: ["/img/helaprogram.png",
                               "/img/karta.png",
                               "/img/Parallellkoordinate_2004.png",
                               "/img/scatterplot.jpg",
                               "/img/scattermatrix.jpg"],
                   shortTitle: "InfoVis",
                   underTitle: "Skolprojekt",
                   x: 810,
                   y: 130,
                   thumbNail: "/img/ThumbNails/infoVis.png",
                   description: "Tillsammans med en klasskamrat skapade jag ett program för att visualisera data från statistiska centralbyrån och på så sätt hitta möjliga samband mellan antalet aborter i ett län med andra sociala faktorer. Vi programmerade i C#/.net, i ett framework för informatiovisualisering som heter GAV, och skrev även makro till Excel för att bearbeta de stora mängder data vi hade att arbeta med."
               },
                  {
                      title: "3D-datorgrafik i 3D-Studio Max",
                      img: ["/img/render01.jpg", "/img/render02.jpg"],
                      shortTitle: "3D-Studio Max",
                      underTitle: "Skolprojekt",
                      x: 820,
                      y: 180,
                      thumbNail: "/img/ThumbNails/3D_Thumb.png",
                      description: "Lärde mig grunderna i 3D-studio Max där jag bland annat gjorde en delfin. Som miniprojekt skapade jag mitt plugg-”alter ego”, som är byggd av en gitarr, noter, penslar och en basketboll, instängd i en värld av matte. (Sommarkurs på Gotlands universitet)"
                  },
                {
                    title: "Grafisk Design och Kummunikation",
                    img: ["/img/sidan.jpg"],
                    shortTitle: "Grafisk Design",
                    underTitle: "Skolprojekt",
                    x: 950,
                    y: 160,
                    thumbNail: "/img/ThumbNails/isea.png",
                    description: "Gjorde, tillsammans med två klasskamrater, en grafisk profil för ett fiktivt företag, ISEA, som tillverkar lagerprodukter och planerade även en utförlig marknadsföringsplan för företaget och dess produkter. Jag var grafiskt ansvarig."
                },
                {
                    title: "Teknisk projektledning för Audiovisuell Medieproduktion",
                    img: ["/img/logga.png",
                            "/img/black.png",
                            "/img/Logga1.jpg",
                            "/img/black1.png",
                            "/img/black8.png",
                            "/img/black2.png",
                            "/img/black6.png",
                            "/img/black3.png"],
                    shortTitle: "Medieproduktion",
                    underTitle: "Skolprojekt",
                    x: 1210,
                    y: 150,
                    thumbNail: "/img/ThumbNails/black.png",
                    description: "Gjorde, med sex klasskamrater, en tre minuter lång informationsfilm för kaffemärket Black Royale. Vi filmade både mot green screen i studio och utomhus. Under inspelningen var jag kameraansvarig och i efterbearbetningen gjorde jag logga, klippte i Premiere och bearbetade film i After Effects."
                },
                    {
                        title: "Examensarbete",
                        img: ["/img/sida1_1.png",
                            "/img/sida1.png",
                               "/img/Sida2.jpg",
                               "/img/sida2_1.png",
                               "/img/sida2_2.png",
                               "/img/sida2_3.png"],
                        shortTitle: "Examensarbete",
                        underTitle: "Skolprojekt",
                        x: 1320,
                        y: 140,
                        thumbNail: "/img/ThumbNails/twingly.png",
                        description: "Jag fick i uppdrag av Twingly att skapa en webbaserad applikation för att visualisera bloggstatistik i relation till en specifik blogg. Programmet har som syfte att ge Bloggportalens användare feed-back över bloggens trafik och aktivitet och därmed öka engagemang och länkande hos bloggarna. I oktober 2013 belönades mitt arbete med Kaperos stipendium för Sveriges bästa exjobb inom medieteknik.",
                        rapportLink: "http://liu.diva-portal.org/smash/record.jsf?pid=diva2:623128",
                        demoLink: "/bloggportalen-stat/Main/main.html"
                    }
              
    ],
    kurser = [
                 {
                     title: "Bildbehandling och bildanalys(Matlab)",
                     "underTitle": "Kurs: Medieteknikinriktad",
                     img: ["/img/medieteknik.jpg"],
                     shortTitle: "Bildbehandling",
                     x: 720,
                     y: 0,
                     thumbNail: "/img/ThumbNails/mt.png",
                     description: "Kursens syfte är att ge en teoretisk och praktisk grund för datoriserad bearbetning och analys av digitala bilder."
                 },
                 {
                     title: "Modelleringsprojekt",
                     "underTitle": "Kurs: Medieteknikinriktad",
                     img: ["/img/medieteknik.jpg"],
                     shortTitle: "Modelleringsprojekt",
                     x: 620,
                     y: 0,
                     thumbNail: "/img/ThumbNails/mt.png",
                     description: "En dynamisk modell ska skapas för ett utvalt projektobjekt. Genom simulering med hjälp av modellen ska objektet studeras dynamiskt. Rapportskrivning och muntlig presentation på svenska."
                 },
                  {
                      title: "Kommunikation och användargräsnitt(Java)",
                      "underTitle": "Kurs: Medieteknikinriktad",
                      img: ["/img/medieteknik.jpg"],
                      shortTitle: "Användargräsnitt",
                      x: 500,
                      y: 10,
                      thumbNail: "/img/ThumbNails/mt.png",
                      description: "Kursen syftar till att ge studenterna grundläggande kännedom om kognitiva processer och interatkiva datorsystem samt kunskaper om principer, metoder och verktyg för att utveckla datorsystem anpassade till användaren. "
                  },
                   {
                       title: "Vetenskaplig visualisering(C++, Python)",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Vetenskaplig visualisering",
                       img: ["/img/medieteknik.jpg"],
                       x: 810,
                       y: 40,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Kursen syftar till att ge fördjupade insikter i metoder för visualisering av vetenskapliga data från experiment och beräkningar samt genom programmeringsövningar belysa dessa metoders möjligheter och begränsningar. "
                   },
                   {
                       title: "Modelleringsprojekt(Matlab, Simulink)",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Modelleringsprojekt",
                       img: ["/img/medieteknik.jpg"],
                       x: 657,
                       y: 10,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: ""
                   },
                     {
                         title: "VR-teknik",
                         "underTitle": "Kurs: Medieteknikinriktad",
                         shortTitle: "VR-teknik",
                         img: ["/img/medieteknik.jpg"],
                         x: 657,
                         y: 10,
                         thumbNail: "/img/ThumbNails/mt.png",
                         description: "Målet med kursenär att studenterna skall få insikt i vad VRär, hur det används och hur det kan implementeras och utnyttjas. De skalläven lära sig analysera behov och utmaningar, och lära sig att tillämpa teorier och principer för att realisera effektiva VR-gränssnitt och -interaktion. "
                     },
                   {
                       title: "Databaser(mySQL)",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Databaser",
                       img: ["/img/medieteknik.jpg"],
                       x: 245,
                       y: 0,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Grunderna inom databaser. Databasdesign och SQL-programering."
                   },
                   {
                       title: "Grafisk teknik(Matlab)",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Grafisk teknik",
                       img: ["/img/medieteknik.jpg"],
                       x: 110,
                       y: 0,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Informationsteknikens användning vid bildåtergivning och framställning av trycksaker."
                   },
                   {
                       title: "Elektronisk publicering(Html,css,php)",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Elektronisk publicering",
                       img: ["/img/medieteknik.jpg"],
                       x: 57,
                       y: 20,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Fokus på tekniker för innehållsutformning inom elektronisk publicering. Grundläggande märkspråk för innehållsutformning. Introduktion till klient-servermodellen och skriptspråk. Introduktion till layout och form inom elektronisk publicering, exempelvis formatmallar."
                   },
                   {
                       title: "Kompression av ljud och bild(Matlab)",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Kompression",
                       img: ["/img/medieteknik.jpg"],
                       x: 770,
                       y: 0,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Kursen ska ge kunskap om metoder för komprimering av data, samt hur dessa metoder tillämpas på ljud- och bildsignaler."
                   },
                   {
                       title: "Medierätt",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Medierätt",
                       img: ["/img/medieteknik.jpg"],
                       x: 960,
                       y:40,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Kursen syftar till att den studerande skall tillägna sig goda kunskaper om immaterialrätt, varmed olika former av resultatet av intellektuellt skapande avses. Kursen syftar därmed till att den studerande skall erhålla goda kunskaper om vad som krävs för att lagligt skyddad ensamrätt skall uppnås/föreligga samt att studenten skapar sig förståelse för immaterialrättsliga reglers roll i en marknadsekonomi. Den studerande skalläven förvärva god förmåga att identifiera, analysera och lösa praktiskt inriktade problemställningar inom de angivna rättsområdena."
                   },
                   {
                       title: "Projektledning",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Projektledning",
                       img: ["/img/medieteknik.jpg"],
                       x: 900,
                       y: 20,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Ledarskap i projekt. Projekt och organisation. Projektgruppens utveckling. Gruppnormer & grupproller i projekt. Konflikthantering. Motivation & drivkrafter. "
                   },
                   {
                       title: "Datorgrafik",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Datorgrafik",
                       img: ["/img/medieteknik.jpg"],
                       x: 190,
                       y: 0,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "2D-grafik: pixelgrafik kontra objektgrafik, primitiver, parametriska och implicita kurvor, transformationer, rendering. Grafikprogrammering i 2D. 3D-grafik: objekt, polygoner, kort om parametriska och implicita ytor, transformationer, projektion, perspektiv, gömda ytor, lokala ljusmodeller. Enklare grafikprogrammering i 3D."
                   },
                   {
                       title: "Videoproduktion",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Videoproduktion",
                       img: ["/img/medieteknik.jpg"],
                       x: 0,
                       y: 20,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Efter fullgjord kurs ska kursdeltagaren ha fått en inledande kunskap inom medieområdet. Inom ett område, som studenten själv väljer, erhålls en mer fördjupad kunskap. Efter kursen skall studenten vara bekant med en projektmodell som hjälpmedel och kunna grunderna i enklare rapportskrivning. Vidare skall studenten ha stiftat bekantskap med frågeställningar som rör informationssökning, etik, samt fusk och plagiat."
                   },
                   {
                       title: "Designmönster",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Designmönster",
                       img: ["/img/medieteknik.jpg"],
                       x: 700,
                       y: 20,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Efter kursen ska studenten kunna använda designmönster, det vill säga, utföra lösningar för standardproblem i objektorienterad programvaruutvekling. Studenten skaäven kunna använda programvaruevolutionsmetodik så som refactoring samt beskriva de implementationsmönster (idiom) som kan finnas i ett programspråk."
                   },
                   {
                       title: "Ljudteknik I(Matlab)",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "Ljudteknik",
                       img: ["/img/medieteknik.jpg"],
                       x: 730,
                       y: 50,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Grundläggande beskrivning av ljudvågor och fysikaliska fenomen relaterade till dessa. Ljudutberedning och rumsakustik. Psykoakustik: människans uppfattning av ljud. Egenskaper hos några olika ljudalstrare. Ljudmätteknik och elektroniska kretsar relaterade till ljud. Introduktion till digitalt ljud, olika digitala ljudformat och signalbehandling. Grunderna i ljudupptagning och ljudbearbetning."
                   },
                   {
                       title: "Datamodeller för kognitiva processer(Lisp)",
                       "underTitle": "Kurs: Medieteknikinriktad",
                       shortTitle: "AI",
                       img: ["/img/medieteknik.jpg"],
                       x: 850,
                       y: 10,
                       thumbNail: "/img/ThumbNails/mt.png",
                       description: "Grunder, tekniker och begrepp inom AI-programering."
                   },
                   {
                       title: "Programkotruktion(Ada)",
                       "underTitle": "Kurs: Programering",
                       shortTitle: "Programkotruktion",
                       img: ["/img/computer_icon.png"],
                       x: 30,
                       y: 200,
                       thumbNail: "/img/ThumbNails/computer_icon.png",
                       description: "Kursen skall ge grundläggande kunskaper om hur man konstruerar program i ett högnivåspråk, ada."
                   },
                   {
                       title: "Objektorienterad programmering(Java)",
                       "underTitle": "Kurs: Programering",
                       shortTitle: "Java",
                       img: ["/img/computer_icon.png"],
                       x: 155,
                       y: 250,
                       thumbNail: "/img/ThumbNails/computer_icon.png",
                       description: "Kursen ska ge kunskaper om objektorienterad programutveckling och programmering i ett objektorienterat programspråk, Java."
                   },
                    {
                        title: "C# och .net",
                        "underTitle": "Kurs: Programering",
                        shortTitle: "C# ",
                        img: ["/img/computer_icon.png"],
                        x: 1100,
                        y: 240,
                        thumbNail: "/img/ThumbNails/computer_icon.png",
                        description: "Kursens målär att ge en bra försåelse och grund inom C#/.net."
                    },
                     {
                         title: "Programmering i C++",
                         "underTitle": "Kurs: Programering",
                         shortTitle: "C++ ",
                         img: ["/img/computer_icon.png"],
                         x: 510,
                         y: 250,
                         thumbNail: "/img/ThumbNails/computer_icon.png",
                         description: "Kursens syfteär att ge kunskaper i att använda programspråket C++ för att utveckla program. "
                     },
                      {
                          title: "Matematisk grundkurs",
                          "underTitle": "Kurs: Matematik",
                          shortTitle: "Matematisk grundkurs",
                          img: ["/img/matte.png"],
                          x: 80,
                          y: 200,
                          thumbNail: "/img/ThumbNails/thumb.png",
                          description: "Kursen syftar till att bidra till en positiv start på universitetsstudierna, både då det gäller en social tillhörighet samt att få en repetition av matematik från tidigare studier. Dessutom skall några matematiska begrepp, som för mångaär nya, introduceras."
                      },
                        {
                            title: "Linjär algebra",
                            "underTitle": "Kurs: Matematik",
                            shortTitle: "Linjär algebra",
                            img: ["/img/matte.png"],
                            x: 90,
                            y: 250,
                            thumbNail: "/img/ThumbNails/thumb.png",
                            description: "Att ge sammanhållen begreppsram för geometrisk och algebraisk teknik med tillämpningar inom analys, datorgrafik, elektroteknik, reglerteknik, linjär optimering m fl.ämnen. Vidare ingår att utveckla förmågan att använda det matematiska språket, skriftligt och muntligt."
                        },
                         {
                             title: "Analys I",
                             "underTitle": "Kurs: Matematik",
                             shortTitle: "Analys I",
                             img: ["/img/matte.png"],
                             x: 220,
                             y: 240,
                             thumbNail: "/img/ThumbNails/thumb.png",
                             description: "Att du som student skall tillägna dig den förtrogenhet med matematiska begrepp, resonemang och samband som ryms inom envariabelsanalys samt den färdighet i kalkyl och problemlösning som behövs för de fortsatta studierna."
                         },
                         {
                             title: "Analys II",
                             "underTitle": "Kurs: Matematik",
                             shortTitle: "Analys II",
                             img: ["/img/matte.png"],
                             x: 260,
                             y: 210,
                             thumbNail: "/img/ThumbNails/thumb.png",
                             description: "Att du som student skall tillägna dig den förtrogenhet med matematiska begrepp, resonemang och samband som ryms inom envariabelsanalys samt den färdighet i kalkyl och problemlösning som behövs för de fortsatta studierna. "
                         },
                         {
                             title: "Analys III",
                             "underTitle": "Kurs: Matematik",
                             shortTitle: "Analys III",
                             img: ["/img/matte.png"],
                             x: 350,
                             y: 240,
                             thumbNail: "/img/ThumbNails/thumb.png",
                             description: "Kursen bygger på kursen i Analys I-II. Följaktligenär målen likartade: att ge de studerande förståelse för matematiska begrepp och förtrogenhet med matematiska metoder för funktioner av flera variabler som uppstår i alla grenar av fysik och teknik."
                         },
                         {
                             title: "Vektoranalys",
                             "underTitle": "Kurs: Matematik",
                             shortTitle: "Vektoranalys",
                             img: ["/img/matte.png"],
                             x: 380,
                             y: 180,
                             thumbNail: "/img/ThumbNails/thumb.png",
                             description: "Kursen bygger på kursen i flervariabelanalys. Följaktligenär målen likartade: att ge de studerande förståelse för matematiska begrepp och förtrogenhet med matematiska metoder för vektorfält som uppstår i alla grenar av fysik och teknik."
                         },
                         {
                             title: "Matematisk statistik",
                             "underTitle": "Kurs: Matematik",
                             shortTitle: "Matematisk statistik",
                             img: ["/img/matte.png"],
                             x: 450,
                             y: 200,
                             thumbNail: "/img/ThumbNails/thumb.png",
                             description: "Kursen avser att lära den studerande förstå och utnyttja grundläggande sannolikhetslära och statistik, dvs teorin för försök som påverkas av slumpmässiga faktorer. Kursen inriktas speciellt på sådana grundläggande kunskaper som krävs för tillämpningar inom teknik, ekonomi och naturvetenskap."
                         },
                        {
                            title: "Tillämpad Transformteori",
                            "underTitle": "Kurs: Matematik",
                            shortTitle: "Transformteori",
                            img: ["/img/matte.png"],
                            x: 410,
                            y: 220,
                            thumbNail: "/img/ThumbNails/thumb.png",
                            description: "Kursen skall ge de matematiska grunderna för de transformmetoder som används i kretsteori, reglerteori, signaler och system, bildbehandling och produktionsekonomi. "
                        },
                        {
                            title: "Signaler och system",
                            "underTitle": "Kurs: Civilingenjörsinriktad",
                            shortTitle: "Signaler och system",
                            img: ["/img/ciin.png"],
                            x: 650,
                            y: 250,
                            thumbNail: "/img/ThumbNails/ciin.png",
                            description: "Grundläggande signaler och deras egenskaper, LTI-system, Fouriertransformen och frekvensanalys, Samplingsvillkor och tidsdiskreta signaler, Laplacetransformen och systemanalys, Z-transformen för samplade signaler och system, Digitala filter, Adaptiva filter."
                        },
                        {
                            title: "Modellbygge och simulering",
                            "underTitle": "Kurs: Civilingenjörsinriktad",
                            shortTitle: "Simulering",
                            img: ["/img/ciin.png"],
                            x: 700,
                            y: 250,
                            thumbNail: "/img/ThumbNails/ciin.png",
                            description: "Kursen skall ge kunskaper om metoder och principer att bygga matematiska modeller för dynamiska system (dvs system som beskrivs med hjälp av differential och/eller differensekvationer). Kursen skall också ge kunskaper om hur modellernas egenskaper studeras genom simulering."
                        },
                        {
                            title: "Reglerteknik",
                            "underTitle": "Kurs: Civilingenjörsinriktad",
                            shortTitle: "Reglerteknik",
                            img: ["/img/ciin.png"],
                            x: 570,
                            y: 230,
                            thumbNail: "/img/ThumbNails/ciin.png",
                            description: "Kursen skall ge förståelse för dynamiska system och kunskaper om grundläggande metoder för att analysera och dimensionera återkopplade reglersystem."
                        },
                    {
                        title: "Industriell ekonomi",
                        "underTitle": "Kurs: Civilingenjörsinriktad",
                        shortTitle: "Industriell ekonomi",
                        img: ["/img/ciin.png"],
                        x: 1180,
                        y: 220,
                        thumbNail: "/img/ThumbNails/ciin.png",
                        description: "Kursen avser att ge de studerande en orientering i de sammanhang företag verkar."
                    },
                    {
                        title: "Retorik",
                        underTitle: "Kurs: Civilingenjörsinriktad",
                        shortTitle: "Retorik",
                        img: ["/img/ciin.png"],
                        x: 1250,
                        y: 250,
                        thumbNail: "/img/ThumbNails/ciin.png",
                        description: "Föreläsningar i retorikens teori och retorisk analys, med aktuella exempel. Seminarier kring retorikens genrer och dess klassiska och moderna uttrycksformer. Den studerande genomför egna presentationer, analyser samt skriver texter där retorikens olika grepp och stilmedel används."
                    },
                    {
                        title: "Tillämpad matematik i teknik och naturvetenskap",
                        "underTitle": "Kurs: Civilingenjörsinriktad",
                        shortTitle: "Matlab info",
                        img: ["/img/ciin.png"],
                        x: 340,
                        y: 250,
                        thumbNail: "/img/ThumbNails/ciin.png",
                        description: "Kursen avser att utgöra en brygga mellan de grundläggande matematikkurserna och kurser inom teknik och naturvetenskap. Genom att använda beräkningshjälpmedel som Matlab kan mer realistiska problem studeras och studenterna skall vänja sig vid att naturligt använda det språk som matematikstudierna ger dem för att tala om tillämpade problemställningar."
                    },
                    {
                        title: "Mekanik- och vågfysik",
                        "underTitle": "Kurs: Civilingenjörsinriktad",
                        shortTitle: "Fysik",
                        img: ["/img/ciin.png"],
                        x: 300,
                        y: 250,
                        thumbNail: "/img/ThumbNails/ciin.png",
                        description: "Kursen skall ge grundläggande kunskaper inom några centrala delar av den klassiska fysiken samt kännedom om viktiga tillämpningar. Laborationsdelen skall ge erfarenhet av att planera,utföra och redovisa experiment. "
                    }
    ],
    meriter = [
				{
				    title: "Civilingenjörerna i Norrköpings studentförening, 3Cant (08/09)",
				    img: ["/img/IMG_1151.jpg"],
				    shortTitle: "3Cant",
				    underTitle: "Övriga meriter",
				    x: 150,
				    y: 60,
				    thumbNail: "/img/ThumbNails/3Cant.png",
				    description: "Styrelsemedlem, Festerichef-MT. Deltog i mottagningen för nya studenter och anordnade även kravaller, sittningar och andra event under hela studieåret 08/09."
				},
                {
                    title: "Medietekniks Sektionsstyrelse (08/09)",
                    img: ["/img/medieteknik.jpg",
							"/img/P1010309.jpg",
							"/img/tina_stor.jpg"],
                    shortTitle: "MT-styrelsen",
                    underTitle: "Övriga meriter",
                    x: 400,
                    y: 80,
                    thumbNail: "/img/ThumbNails/mt.png",
                    description: "Styrelsemedlem, Eventavarig/Festerichef och ordförande i event-utskottet. Anordnade, med hjälp av eventutskottet, event för medietekniks sektionsmedlemmar. Bland annat två event för alla sektionsaktiva och även Medietekniks årliga sittning, MidsommarphesTen. Deltog även i alla de uppdrag som sektionsstyrelsen antog."
                },
                {
                    title: "Medietekniks tjejförening, Mette (08/09)",
                    img: ["/img/Mettemarket.png"],
                    shortTitle: "Mette",
                    underTitle: "Övriga meriter",
                    x: 250,
                    y: 80,
                    thumbNail: "/img/ThumbNails/Mette.png",
                    description: "Styrelsemedlem, informationsansvarig. Deltog i att arrangera event för alla tjejer i medietekniksektionen."
                },
                {
                    title: "Mottagningskommittén för tekniskt basår (09/10)",
                    img: ["/img/torsten.jpg"],
                    shortTitle: "Mottagningskommittén",
                    underTitle: "Övriga meriter",
                    x: 550,
                    y: 80,
                    thumbNail: "/img/ThumbNails/torsten.png",
                    description: "Deltog i mottagningskommittén för tekniskt basår i Norrköping. Anordnade olika event under hela introduktionstiden samt en avslutande sittning. Gruppen deltogäven i mottagningen för alla studenter på tekniska fakulteten som faddrar och skurkerister."
                },
				{
				    title: "Norrlands Nation, Vargtass (09/10)",
				    img: ["/img/affisch2.jpg",
								"/img/502738.jpg",
								"/img/underbart.jpg",
								"/img/vargtassvanster.jpg",
								"/img/vagtasshoger.jpg"
				    ],
				    shortTitle: "Vargtass",
				    underTitle: "Övriga meriter",
				    x: 480,
				    y: 60,
				    thumbNail: "/img/ThumbNails/vargtass.png",
				    description: "Styrelsemedlem, Informations- och tryckavnsarig. Deltog i arrangerandet av en  Åreresa (totalt 150 personer åkte med på resan) och andra event för universitetets största nation, Vargtass. Jag gjordeäven affischer, märke och flyers."
				},
				{
				    title: "Designuppdrag Sunset Sailors",
				    img: ["/img/sun.jpg"],
				    shortTitle: "Designuppdrag",
				    underTitle: "Övriga meriter",
				    x: 942,
				    y: 90,
				    thumbNail: "/img/ThumbNails/sunset.png",
				    description: "Skapade grafiska profilen till bandet Sunset Sailors."
				}
    ],
            h,
            w,
            top = 100,
            timeLineImageRatio = 1500/300,
            selectedIndex = skolProjekt.length-1,
            index = 0,
            imageSliderIndex = 0,
            selectedElement = skolProjekt[selectedIndex],
            selectedList = skolProjekt,
            skolProjektSelected = true, meriterSelected = true, kurserSelected = false,
                indexes =[],
                walkingIndex = selectedIndex;

    //----------------------init-----------------------
    
   
    addThumbnails(skolProjekt, "skolProjekt");
    addThumbnails(kurser, "kurser");
    addThumbnails(meriter, "meriter");
    checkRadioButtons();
    setSize();
    addThumbClickEvent();
    addIndexesToArray();
    displaySelected(skolProjekt);
    //----------------------funktioner-----------------------
    function setSize() {
        h = $(window).height()-100;
        w = $(window).width();
        var displayImageHeight = h - 180 - 100 - 50;

        var disp_w = $(".displayImage").width();
        var disp_h = $(".displayImage").height();
        var r = disp_w / disp_h;

        if (displayImageHeight * r > 514) {
            displayImageHeight = 514;
       //     $(".displayImage").removeAttr("height");
            $(".bottomRow").css("bottom", h - 514- 180 - 100 - 50);
        }
        else if (displayImageHeight < 250) {
            h = 579;
            displayImageHeight = 250;
          //  $(".displayImage").removeAttr("width");
        }
        else{
         //   $(".displayImage").removeAttr("width");
        }
        $(".displayImageDiv").css("height", displayImageHeight);
        $(".display").css("height", displayImageHeight + 70);
        $("#content").css("height", h);
    }

    jQuery(".displayImage").load(function () {
        setSize();
    });
    

    function displaySelected(dataList) {
        if (dataList == skolProjekt) {
            $(".skolProjektThumb").removeClass("thumbSelected");
            $(".kurserThumb").removeClass("thumbSelected");
            $(".meriterThumb").removeClass("thumbSelected");
            $($(".skolProjektThumb")[selectedIndex]).addClass("thumbSelected");
        }
        else if (dataList == kurser) {
            $(".skolProjektThumb").removeClass("thumbSelected");
            $(".kurserThumb").removeClass("thumbSelected");
            $(".meriterThumb").removeClass("thumbSelected");
            $($(".kurserThumb")[selectedIndex]).addClass("thumbSelected");
        }
        else {
            $(".skolProjektThumb").removeClass("thumbSelected");
            $(".kurserThumb").removeClass("thumbSelected");
            $(".meriterThumb").removeClass("thumbSelected");
            $($(".meriterThumb")[selectedIndex]).addClass("thumbSelected");
        }
        imageSliderIndex = 0;
        selectedList = dataList;
        selectedElement = selectedList[selectedIndex];
        
        $(".underHeader").text("");
        $(".underHeader").text(selectedElement.underTitle);
        $(".displayHeader").text(selectedElement.title);
        $(".displayBread").text(selectedElement.description);
        $(".links").children().remove();
        if (selectedElement.rapportLink) {
            $(".links").append("<div class='portfolioLink'><a  href='" + selectedElement.rapportLink + "' target='_blank'>Läs rapporten<div class='triangle'></div></a></div>");
            $(".links").append("<div class='portfolioLink hideOnPhone'><a  href='" + selectedElement.demoLink + "' target='_blank'>Titta på ett demo<div class='triangle'></div></a>"+
                                "<p>(Endast utvecklad för Google Chrome)</p></div>");
        }
        sliderImage(imageSliderIndex);
        if (selectedElement.img.length == 1) {
            $(".imageLeftArrow").hide();
            $(".imageRightArrow").hide();
        }
        else {
            $(".imageLeftArrow").show();
            $(".imageRightArrow").show();
        }
    }

    function addThumbnails(dataList, listName) {
        var html = "";
        var thumbClassName = listName + "Thumb";
        for (i = 0; i < dataList.length; i++) {
            html += "<div class='thumb " + thumbClassName + "'>" +
                    "<img class='thumbImg' src='" + dataList[i].thumbNail + "'/>"+
                    "<p class='thumbInfo'>"+dataList[i].shortTitle +"</p></div>";
        }
        $(".thumbnailDiv").append(html);
        placeThumbNails(dataList, thumbClassName);
        addThumbClickEvent(dataList, thumbClassName);
    }

    function placeThumbNails(dataList, thumbTitle) {
        var index,
            winWidth = $(window).width();
        if (winWidth < 480) {
            var zoom = winWidth / 1500;
            $("." + thumbTitle).each(function () {
                index = checkIndex($(this).index());
                $(this).css("top", dataList[index].y * zoom*0.8);
                $(this).css("left", dataList[index].x * zoom);
            });
        }
        else {
            $("." + thumbTitle).each(function () {
                index = checkIndex($(this).index());
                $(this).css("top", dataList[index].y * 0.6);
                $(this).css("left", dataList[index].x * 0.6);
            });
        }
    }

    function addThumbClickEvent(list, thumbTitle) {
        $("." + thumbTitle).click(function () {
            index = $(this).index();
            walkingIndex = indexes.indexOf(index);
            selectedIndex = checkIndex(index);
            displaySelected(list);
            checkArrows(walkingIndex);
        });
    }

    function checkIndex(ind) {
        if (ind >= 0 && ind < skolProjekt.length) {
            return ind;
        }
        else if (ind >= skolProjekt.length && ind < skolProjekt.length + kurser.length) {
            return ind - skolProjekt.length;
        }
        else {
            return ind - skolProjekt.length - kurser.length;
        }
    }

    function setSelectedList(ind) {
        if (ind >= 0 && ind < skolProjekt.length) {
            selectedList = skolProjekt;
        }
        else if (ind >= skolProjekt.length && ind < skolProjekt.length + kurser.length) {
            selectedList = kurser;
        }
        else {
            selectedList = meriter;
        }
    }

    function sliderImage(ind) {
        if (ind == 0) {
            $(".imageLeftArrow").attr("src", "/img/arrow_left_unsel.png");
            $(".imageRightArrow").attr("src", "/img/arrow_right_sel.png");
        }
        else if (ind == selectedElement.img.length-1) {
            $(".imageRightArrow").attr("src", "/img/arrow_right_unsel.png");
            $(".imageLeftArrow").attr("src", "/img/arrow_left_sel.png");
        }
        else {
            $(".imageLeftArrow").attr("src", "/img/arrow_left_sel.png");
            $(".imageRightArrow").attr("src", "/img/arrow_right_sel.png");
        }
        $(".displayImageDiv").css("background-image", "url("+selectedElement.img[ind]+")");
        setSize();
    }

    function checkRadioButtons() {
        if (skolProjektSelected) {
            $(".skolProjektImg").attr("src", "/img/radio_on.png");
            $(".skolProjektThumb").show();
        }
        else {
            $(".skolProjektImg").attr("src", "/img/radio_off.png");
            $(".skolProjektThumb").hide();
        }

        if (meriterSelected) {
            $(".meriterImg").attr("src", "/img/radio_on.png");
            $(".meriterThumb").show();
        }
        else {
            $(".meriterImg").attr("src", "/img/radio_off.png");
            $(".meriterThumb").hide();
        }

        if (kurserSelected) {
            $(".kurserImg").attr("src", "/img/radio_on.png");
            $(".kurserThumb").show();
        }
        else {
            $(".kurserImg").attr("src", "/img/radio_off.png");
            $(".kurserThumb").hide();
        }
    }

    function addIndexesToArray() {
        indexes = [];
        var grans_ett = skolProjekt.length,
            grans_tva = skolProjekt.length + kurser.length,
            grans_tre = skolProjekt.length + kurser.length + meriter.length;
        if (skolProjektSelected) {
            for (i = 0; i < grans_ett; i++) {
                indexes.push(i);
            }
        }
        if (kurserSelected) {
            for (i = grans_ett; i < grans_tva; i++) {
                indexes.push(i);
            }
        }
        if (meriterSelected) {
            for (i = grans_tva; i < grans_tre; i++) {
                indexes.push(i);
            }
        }
        if (!indexes.indexOf(index)) {
            index = 0;
        }
        else {
            walkingIndex = indexes.indexOf(index);
        }
        checkArrows(walkingIndex);
    }

    //------------------------klickevent---------------------------
    $(".imageLeftArrow").click(function () {
        if (imageSliderIndex > 0){
            imageSliderIndex--;
        }
        sliderImage(imageSliderIndex);
    });

    $(".imageRightArrow").click(function () {
        if (imageSliderIndex < selectedElement.img.length-1) {
            imageSliderIndex++;
        }
        sliderImage(imageSliderIndex);
    });

    $(".imageLeftArrow").mouseenter(function () {
        if (imageSliderIndex != 0) {
            $(".imageLeftArrow").attr("src", "/img/arrow_left_hover.png");
        }
    });

    $(".imageRightArrow").mouseenter(function () {
        if (imageSliderIndex != selectedElement.img.length - 1) {
            $(".imageRightArrow").attr("src", "/img/arrow_right_hover.png");
        }
    });

    $(".imageLeftArrow").mouseleave(function () {
        if (imageSliderIndex != 0) {
            $(".imageLeftArrow").attr("src", "/img/arrow_left_sel.png");
        }
    });

    $(".imageRightArrow").mouseleave(function () {
        if (imageSliderIndex != selectedElement.img.length - 1) {
            $(".imageRightArrow").attr("src", "/img/arrow_right_sel.png");
        }
    });

    $(".leftArrow").click(function () {
        if (walkingIndex > 0) {
            walkingIndex--;
        }
        checkArrows(walkingIndex);
        index = indexes[walkingIndex];
        selectedIndex = checkIndex(index);
        setSelectedList(index);
        displaySelected(selectedList);
    });

    $(".rightArrow").click(function () {
        if (walkingIndex < indexes.length-1) {
            walkingIndex++;
        }
        checkArrows(walkingIndex);
        index = indexes[walkingIndex];
        selectedIndex = checkIndex(index);
        setSelectedList(index);
        displaySelected(selectedList);
    });

    function checkArrows(ind) {
        if (ind < indexes.length - 1 && ind > 0) {
            $(".rightArrow").addClass("rightHoverAble");
            $(".leftArrow").addClass("leftHoverAble");
        }
        else if (ind == indexes.length - 1) {
            $(".rightArrow").removeClass("rightHoverAble");
            $(".leftArrow").addClass("leftHoverAble");
        }
        else if (ind == 0) {
            $(".leftArrow").removeClass("leftHoverAble");
            $(".rightArrow").addClass("rightHoverAble");
        }
    }

    $(window).resize(function () {
        setSize();
    });

    $(".skolProjket_li").click(function () {
        if (skolProjektSelected && (meriterSelected || kurserSelected)) {
            skolProjektSelected = false;
        }
        else {
            skolProjektSelected = true;
        }
        checkRadioButtons();
        addIndexesToArray();
    });

    $(".meriter_li").click(function () {
        if (meriterSelected && (skolProjektSelected || kurserSelected)) {
            meriterSelected = false;
        }
        else {
            meriterSelected = true;
        }
        checkRadioButtons();
        addIndexesToArray();
    });

    $(".kurser_li").click(function () {
        if (kurserSelected && (skolProjektSelected || meriterSelected)) {
            kurserSelected = false;
        }
        else {
            kurserSelected = true;
        }
        checkRadioButtons();
        addIndexesToArray();
    });

    $(".thumb").mouseenter(function () {
        $($(this).children()[0]).stop().animate({
            width: "40px"
        },300);
    });
    $(".thumb").mouseleave(function () {
        $($(this).children()[0]).stop().animate({
            width: "20px"
        }, 200);
    });



});