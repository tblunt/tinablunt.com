function getCVData() {
    var l = 75,
       data = [
         {
             "title": "Gymnasiet",
             "yPos": l+5,
             "width": 0.8,
             "underTitle": "Norra Real",
             "description": "Naturvetenskapliga linjen med inriktining mot naturvetenskap.",
             "period": "2002-2005",
             "img": "/App/Modules/Portfolio/CvGame/img/bok1.png"
         },
         {
             "title": "Ica Grisslehamn",
             "yPos": l+30,
             "width": 0.8,
             "underTitle": "Butiksbiträde",
             "description": "Sommarjobb sju somrar i rad med främst kassarelaterade arbetsuppgifter.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok2.png"
         },
         {
             "title": "Vikariepoolen",
             "yPos": l+100,
             "width": 0.7,
             "underTitle": "Vikarierande barnskötare och elevassistent",
             "description": "Vikarierande barnskötare och elevassistent på förskolor och grundskolor i hela Stockholm.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok3.png"
         },
          {
              "title": "Ica Bromma Kyrka",
              "yPos": l+150,
              "width": 0.9,
              "underTitle": "Butiksbiträde",
              "description": "Främst kassarelaterade arbetsuppgifter.",
              "img": "/App/Modules/Portfolio/CvGame/img/bok4.png"
          },
         {
             "title": "Wiktor Rydberg Education",
             "underTitle": "Vikarierande barnskötare och elevassistent",
             "yPos": l+100,
             "width": 1,
             "description": "Vikarierande elevassistent, fritidspedagog och barnskötare på förskolor, gymnasieskolor och grundskolor i Stockholm.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok5.png"
         },
         {
             "title": "Universitetsutbildning",
             "underTitle": "Civilingenjör i Medieteknik",
             "yPos": l+40,
             "width": 0.6,
             "description": "Med inrikting mot användbarhet, projektledning och mjukvaruutveckling.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok6.png"
         },
         {
             "title": "PR-utskottet",
             "yPos": l+100,
             "width": 0.7,
             "underTitle": "Medlem",
             "description": "Medietekniksektionens utskott för PR. Deltog i marknadsföring och planering av event och möten inom sektionen.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok7.png"
         },
        {
             "title": "3Cant",
             "yPos": l+20,
             "width": 0.6,
             "underTitle": "Styrelsemedlem, Festerichef MT",
             "description": "Föreningen för Norrköpings civilingenjörer, 3Cant, med huvuduppgift att arrangera olika event under hela avarsåret. Jag ansvarade för allt Medieteknikrelaterat inom föreningen.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok8.png"
         },
         {
             "title": "Medietekniks sketionsstyrelse",
             "yPos": l+100,
             "width": 0.8,
             "underTitle": "Styrelsemedlem, Festerichef och eventansvarig",
             "description": "Sektionsstyrelsen är ansvarig för allt som har med medietekniksektionen att göra, bland annat kursutvärderingar, sektionsmöten och mottagningen av nya studenter. I styrelsen ansvarade jag för alla event inom sektionen och ledde även eventutskottet.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok9.png"
         },
         {
             "title": "Eventutskottet",
             "yPos": l+170,
             "width": 0.6,
             "underTitle": "Ordförande",
             "description": "Ordförande i eventutskottet som gemensamt höll i alla event inom medietekniksektionen.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok10.png"
         },
         {
             "title": "Mette",
             "yPos": l+20,
             "width": 0.5,
             "underTitle": "Styrelsemedlem, Informationsavarig",
             "description": "Mette annordnar träffar och aktiviteter för all tjejer inom medieteknik. Vi var även med och hjälpte till under kvinnliga ingenjörernas arbetsmarknadsdagar i Norrköping.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok11.png"
         },
         {
             "title": "Vargtass",
             "yPos": l+30,
             "width": 0.8,
             "underTitle": "Styrelsemedlem, Spons och tryck-ansvarig",
             "description": "Linköpings universitets största nation som varje år annordnar en Åreresa för ca 150 personer. Jag var informations- och tryckansavrig och gjorde utöver planerandet av resan både flyers och affisher.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok12.png"
         },
          {
              "title": "Fadder",
              "underTitle": "",
              "yPos": l+110,
              "width": 0.8,
              "description": "Fadder för nya studenter under mottagningskommittén för hela tekniska fakulteten.",
              "img": "/App/Modules/Portfolio/CvGame/img/bok13.png"
          },
         {
             "title": "Mottagnigskomittén",
             "yPos": l+100,
             "width": 0.8,
             "underTitle": "Styrelsemedlem",
             "description": "Styrelsemedlem i mottagningskommittén för nya studenter på tekniskt basårutbildningen i Norrköping.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok14.png"
         },
         {
             "title": "Revisor",
             "yPos": l+170,
             "width": 0.6,
             "underTitle": "",
             "description": "Revisor för  Norrlands nation, granskade bland annat årsredovisningen.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok15.png"
         },
         {
             "title": "Guide",
             "yPos":l+100,
             "width": 0.5,
             "underTitle": "",
             "description": "Guide för nya studenter under besöksdagar annordande av kåren på universitetet.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok16.png"
         },
         {
             "title": "Examearbete",
             "yPos": l+50,
             "width": 0.6,
             "underTitle": "Personalized visualization of blog statistics",
             "description": "Avslutande examearbete på data-miningföretaget Twingly med inriktning mot informationsvisualisering. Fick i uppdrag att göra en personlig visualisering för att bloggare på ett roligt och lätt sätt ska kunna få information om sin bloggs statistik.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok17.png"
         },
         {
             "title": "Twingly",
             "yPos": l,
             "width": 0.5,
             "underTitle": "IT-support",
             "description": "Hade ansvar för IT-supporten där jag hjälpte både bloggare och Twinglys kunder med tekniska problem kopplat till Twinglys bloggindexeringstjänster.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok18.png"
         },
         {
             "title": "Leon",
             "yPos": l+50,
             "width": 0.5,
             "underTitle": "Front-endutvecklare",
             "description": "Programmerar främst webb och har bland annat jobbat med kunder som Scania, Schnider och Norrköpings flygplats.",
             "img": "/App/Modules/Portfolio/CvGame/img/bok19.png"
         }
    ];
    return data;
}

function getdates() {
    var dates = [
        {
            year: "2002",
            index: 0
        },
         {
             year: "2005",
             index: 1
         },
         {
             year: "2006",
             index: 3
         },
         {
             year: "2007",
             index: 4
         },
         {
             year: "2008",
             index: 7
         },
         {
             year: "2009",
             index: 11
         },
         {
             year: "2010",
             index: 14
         },
         {
             year: "2011",
             index: 15
         },
         {
             year: "2012",
             index: 16
         },
         {
            year: "2013",
            index: 18
         },
    ]
    return dates;
}

function coins() {
    var data = [
       { "title": "Körkort", "ind": 3, "yPos": 10, "description": ["Innehar B-körkort"] },
       { "title": "Språk", "ind": 6, "yPos": 15, "description": ["Sveka, modersmål","Engelska, flytande i tal och skrift", "Spaka, grundläggande","Fraka, grundläggande","Estniska, grundläggande"] },
       { "title": "Programmeringsspråk", "ind": 16, "yPos": 150, "description": ["JavaScript/jQuery","HTML/CSS","C++","C#/ASP/.net","Java","Ada","Knockout/Bootstrap"] },
       { "title": "Datorkukaper", "ind": 10, "yPos": 150, "description": ["Adobe Creative Suite","Microsoft Office","Visual Studio","SVN","3DStudio-Max","Matlab"] },
       { "title": "Personligt", "ind": 8, "yPos": 100, "description": ["Idrottstjej i grunden med 12 års basketspelande på nacken, varav de sista på allsvek nivå. Ägnar numer fritid åt klättring och golf."] },
       { "title": "Refereer", "ind": 19, "yPos": 150, "description": ["Refereer lämnas på begäran"] }
    ];
    return data;
};