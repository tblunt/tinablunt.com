/// <autosync enabled="true" />

module TinasApp {
    'use strict';

    export interface IReceptDirectiveScope extends ng.IScope {
        recepts: any;
        selectedRecept: any;

        receptClick: (recept:any) => void;
    }

    export class ReceptDirective extends BaseDirective<IReceptDirectiveScope> {

        constructor() {
           
            super();

            this.restrict = 'E';
            this.templateUrl = '/App/Modules/Creative/Recept/Templates/ReceptList.html';
        }

        public initialize(scope: IReceptDirectiveScope, element: JQuery, attributes: ng.IAttributes): void {
          
            scope.recepts = this.getData();

            scope.receptClick = (recept) => { this.receptClick(recept, scope);}

        }
      
        private receptClick(recept: any, scope: IReceptDirectiveScope) {
            if (!scope.selectedRecept || scope.selectedRecept.title != recept.title) {
                scope.selectedRecept = recept;
            }
            else {
                scope.selectedRecept = null;
            }
            
        }

        private getData():any {
            return [
                {
                    "title": "Sås & soppa",
                    "icon": "soup",
                    "img": "/img/Recept/soppa.png",
                    "items": [
                        {
                            "title": "Sparrissoppa",
                            "ingress": "",
                            "ing": ["500 g grön sparris ", "5 st schalottenlökar, hackade", "5 dl grädde eller creme fraiche", "5 dl kycklingbuljong", "1 dl vitt vin", "1 krm salt", "1 krm svartpeppar"],
                            "desc": "Skala sparrisen och skär upp i små bitar.Koka upp lättsaltat vatten i en kastrull och koka sparrisbitarna cirka 2-3 minuter. Häll bort vattnet. Hacka löken grovt och fräs lätt i en kastrull. Tillsätt grädde, kycklingbuljong och vitt vin. Koka upp och lägg sparrisbitarna i gräddsåsen. Låt soppan koka i cirka 10 minuter. Mixa soppan i matberedare och sila för finare konsistens. Smaksätt med salt och peppar. Servera gärna med bröd.<span>Färskost</span>Ställ ett oöppnat paket filmjölk i en kastrull med vatten. Koka i cirka 2 timmar. Öppna paketet och häll av vattnet. Smaksätt osten med vitlök och färska örter. Tillsätt salt och peppar efter smak."
                        },
                        {
                            "title": "Rödvinssås",
                            "ingress": "Man behöver inte ha i alla ingredienser. Jag har samlat lite vad man kan ha i bara.",
                            "ing": ["0,5 gul löl/scharlottenlök", "2st morötter", "smör", "0,5 dl oxfond/kalvfond", "4dl rött vin", "4 dl vatten", "1 tsk soja", "lite socker", "rödvinsvinäger"],
                            "desc": "1. Grovhacka 2 morötter samt en halv gul lök (spara andra halvan till gratängen), 1 knippe timjan och 1 knippe rosmarin. Resten av kryddorna använder du till lammet. 2. Fräs i en panna med smör i ca 2 minuter. 3. Tillsätt oxfonden, rödvin, vatten, soja, vinäger och socker. 4. Låt koka ner på medelhög värme i ca 1 timme. 5. Sila såsen så du bara har den klara delen kvar. 6. Fortsätt koka ner den tills den fått en lagom konsistens. Är man otålig kan man fuska och använda sig av lite lite redning på slutet."
                        },
                        {
                            "title": "Sötpotatissoppa",
                            "ingress": "",
                            "ing": ["2 stora sötpotatisar", "1 ansad purjolök", "2 gula lökar", "2 msk olivolja", "1 liter vatten + 3-4 msk kycklingfond", "4 msk pumpafrön", "1/2 röd chilifrukt, finhackad", "4 dl kokta, röda linser"],
                            "desc": "Börja med att skala sötpotatisen, ansa purjolöken och skala de gula lökarna. Tärna potatisen i ca 1×1 cm stora tärningar. Strimla purjon och finhacka löken. Lägg allt i en stor kastrull, häll på oljan och fräs på medelvärme i ca 5 minuter under omrörning. Häll på vatten och fond och låt alltsammans puttra på medelvärme i ca 20-25 minuter. Häll över allt i en stor bunke och mixa med mixerstav till en slät soppa. Smaka av med salt och peppar. Tillsätt finhackad chili. Koka linserna 10 minuter. Häll av överflödig vätska genom en sil. Fördela 1 dl linser i botten på fyra djupa skålar. Häll på varm soppa och toppa med pumpafrön. Servera."
                        },
                        {
                            "title": "Morotssoppa",
                            "ingress": "",
                            "ing": ["10-12 morötter", "1 msk olivolja", "2 vitlöksklyftor", "2 gula lökar", "2 msk färsk strimlad ingefära", "1 liter vatten", "2 tärningar klar grönsaksbuljong", "ca 2 tsk sambal oelek", "1/2 pressad lime", "1/2 dl finhackad färsk koriander"],
                            "desc": "Börja med att skala morötter, vitlök, lök och ingefära. Skär i mindre bitar, strimla ingefäran och fräs alltsammans i olivoljan i en stor kastrull på medelvärme. Tillsätt vatten och buljong, låt puttra i ca 15 minuter eller tills morotsbitarna mjuknat. Mixa soppan med mixerstav. Krydda med havssalt, vitpeppar och sambal oelek. Smaka av och rör ner finhackad koriander och nypressad lime precis innan servering. Servera med philadelphiacremen nedan. Philadelphiacreme med ingefära & honung 1 dl philadelphia light  1/2 msk svensk honung  1 finhackad vitlöksklyfta  1 msk riven ingefära  1 msk finhackad färsk koriander Rör i hop samtliga ingredienser och ställ kallt fram till servering. Klicka i en matsked creme i den varma soppan, rör om och njut."
                        },
                        {
                            "title": "Annas ärtsoppa",
                            "ingress": "Koka 15 minuter",
                            "ing": ["1 gul lök", "2 vitlöksklyftor", "8 dl vatten", "2 hönsbuljongtärningar", "600 g ärtor", "65 g ruccula", "2 dl creme fraise", "salt", "ost t.ex parmesan"],
                            "desc": "Fräs lök och vitlök. Tillsätt vatten, smula i buljongtärningarna och häll i ärtorna. Låt koka i 15 minuter. Häll i ruccula och creme fraise och mixa. Toppa med ost. Mums!"
                        },
                        {
                            "title": "Svinagoda tomatsoppan",
                            "link": "http://www.nlife.se/soppa/het-tomatsoppa-med-grillad-halloumi/"
                        }
                    ]
                },
                {
                    "title": "Efterrätt",
                    "icon": "dessert",
                    "img": "/img/Recept/dessert1.png",
                    "items": [
                        {
                            "title": "Smulpajen",
                            "ingress": "250 grader, 10-12 minuter",
                            "ing": ["5 dl rabarber ", "3 dl jordgubbar", "2 msk potatismjöl ", "100 g vit choklad", "1 dl mandel, skalad ", "2 dl havregryn ", "1 dl råsocker ", "100 g smör "],
                            "desc": "1. Skala och skiva rabarbern tunt och skär jordgubbarna i bitar. Blanda sedan rabarber, jordgubbar och potatismjöl i små ugnsfasta formar, ca 6-8 styck.2. Hacka vit choklad och mandel grovt, blanda med havregryn, socker och smöret i bitar. 3. Nyp ihop till en smuldeg och strö över rabarbern och jordgubbarna. 4. Baka pajerna i 250° varm ugn i ca 10-12 minuter. Servera med en klick grädde eller glass."
                        },
                        {
                            "title": "Kladdkaka",
                            "ingress": "175 grader i 17 minuter",
                            "ing": ["2 ägg", "100g smör", "2,5 dl socker", "1,5 dl mjöl", "4 msk kakao", "1tsk vaniljsocker", "1tsk havssalt"],
                            "desc": "Gör det du ska"
                        },
                        {
                            "title": "Snabb cheezecake",
                            "ingress": "Kyl i en timme",
                            "ing": ["2 msk smör", "4 st digestive", "1 dl vispgrädde", "1 dl florsocker", "1 tsk vaniljsocker", "250 g kvarg eller philadelphia"],
                            "desc": "Smält smöret. Mixa kexen med smöret. Fördela i fyra glas. Vispa grädden med florsocker, vaniljsocker och valfi smaksättning(kakao, citron). Rör i kvarg/philladelphia. Klicka i glasen. kyl i en timme"
                        },
                        {
                            "title": "ChokladMousse",
                            "ingress": "Kyl i minst en timme",
                            "ing": ["125g choklad(70%)", "2 msk florsocker", "3 msk starkt varmt kaffe", "1 st äggula", "2 dl vispgrädde", "Hallon"],
                            "desc": "Smält choklad i vattenbad, rör sedan ner socker, kaffe och äggula. Låt svalna. Vispa grädden lätt. Häll i 1/3-del i chokladsmeten. Vänd i. I med resten av grädden. Vänd i. Hallon i botten av formar och häll på smeten. Låt stå i kylen i minst en timme."
                        }

                    ]
                },
                {
                    "title": "Bröd & bak",
                    "icon": "bread",
                    "img": "/img/Recept/bread.png",
                    "items": [
                        {
                            "title": "Lindas foccacia",
                            "ingress": "225 grader, 25 minuter",
                            "ing": ["50 g jäst", "5 dl vatten, 37grader", "1,5tsk salt", "2msk smör", "250g kesella kvarg", "5dl durumvete", "9dl vetemjöl", "150g soltorkade tomater", "300g feta", "2msk grovhackad färsk rosmarin", "2tsk gourmetsalt"],
                            "desc": "1. Rör ut jästen i vattnet i en bunke. Tillsätt salt, smör, kvarg, durumvetemjöl och vetemjöl. Arbeta degen tills den knns smidig. Den ska vara ganska lös. Låt jäsa ca 30 minuter. 2. Skär tomat och ost i bitar. Tryck ut degen med mjölad hand i en väl smord långpanna. Pensla degen med oljan från de marinerade tomaterna. Strö över tomat, ost, rosmarin och salt. Tryck ner det i degen med fingertopparna. 3. Sätt ugnen på 225 grader. Låt degen jäsa ca 15 minuter. Grädda i mitten av ugnen ca 25 minuter. Låt svalna på galler."
                        },
                        {
                            "title": "Valnötsbröd",
                            "ingress": "200 grader, 35 minuter",
                            "ing": ["25 g jäst", "2 1⁄2 dl vatten , max 37°", "1 tsk salt", "25 g Svenskt Smör från Arla", "1 dl kvarg", "1 msk honung", "3 dl grovt rågmjöl", "3 dl vetemjöl special", "2 dl valnötter"],
                            "desc": "Rör ut jästen i vattnet i en bunke. Tillsätt salt, smör, kvarg, honung och det mesta av mjölet. Arbeta degen smidig, ca 10 min. Låt jäsa ca 45 min. Sätt ugnen på 200°. Rosta valnötterna på en plåt i övre delen av ugnen ca 10 min. Platta ut degen på mjölad bänk. Strö över hälften av nötterna. Vik degen på mitten och strö över resten. Vik på mitten och forma ett runt bröd. Låt jäsa på plåt med bakplåtspapper ca 30 min. Mjöla och snitta brödet. Grädda i nedre delen av ugnen ca 35 min. Låt brödet svalna på galler."
                        },
                        {
                            "title": "Lussebullar",
                            "ingress": "225 grader, 5-8 minuter",
                            "ing": ["50 g jäst", "100 g Smör", "5 dl mjölk", "250 g kvarg", "1 g saffran", "1 1⁄2 dl strösocker", "1⁄2 tsk salt", "ca 17 dl vetemjöl", "russin", "1 st ägg"],
                            "desc": "Smula jästen i en bunke. Smält smöret, tillsätt mjölken och värm till max 37°. Häll det över jästen. Tillsätt övriga ingredienser. Arbeta degen smidig. Låt jäsa under bakduk ca 30 min. Sätt ugnen på 225°. Ta upp degen på mjölad arbetsbänk. Dela den i 35 bitar och baka ut enkla lussekatter. Lägg på plåtar med bakplåtspapper. Garnera med russin. Låt jäsa ca 20 min.<br /> Pensla med uppvispat ägg. Grädda i mitten av ugnen 5-8 min. Låt svalna på galler."
                        },
                        {
                            "title": "Pizzadeg",
                            "ingress": "275 grader, 10-15 minuter",
                            "ing": ["50 g färsk jäst ", "2 tsk socker", "1 tsk flingsalt ", "0.5 dl olivolja ", "3 dl ljummet vatten", "7 dl vetemjöl special"],
                            "desc": "1. Blanda jäst, socker, salt, olja och fingervarmt vatten (37 grader) i en degbunke. 2. Rör i mjöl, lite i taget, tills du får en fast och elastisk deg. Spara resten av mjölet till utbakning.3. Jäs pizzadegen i bunken under bakduk i cirka 25 minuter. 4. Dela degen på 4 bitar och baka ut dem med kavel på mjölat bakbord."
                        },
                        {
                            "title": "Scones",
                            "ingress": "250 grader i 10 minuter, 2 st",
                            "ing": ["40 g smör ", "1,5 d filmjölk", "3 dl vetemjöl", "1 dl grahamsmjöl", "2 tsk bakpulver", "0,5 tsk salt"],
                            "desc": "Blanda allt med fingrarna och in i ugnen."
                        }
                    ]
                },
                {
                    "title": "Mat",
                    "icon": "food",
                    "img": "/img/Recept/food.png",
                    "items": [
                        {
                            "title": "Laxrullar",
                            "ingress": "",
                            "ing": ["2 st tunnbröd", "4 skivor kallrökt lax", "3 msk lättkesella", "3 msk färsk dill, hackad", "1 tsk honung", "1 msk pressad citron", "1 msk dijonsenap", "1 päron, klyftat", "1 palsternacka, i stavar", "2 dl rödkål, finstrimlad"],
                            "desc": "Lägg ut tunnbröden på tallrikar. Blanda kesella, hackad dill, honung, citron och senap till en bredbar smet. Bred bröden med smeten. Klyfta päronet och rosta lätt i en medelvarm panna med lite olivolja och strimlad rödkål i några minuter. Låt svalna. Skär palsternackan i stavar, salta lätt och rosta i ugn, 200 grader 10-15 minuter. Låt svalna. Lägg ut laxskivorna på bröden. Fördela päron, rödkål och palsternacka uppå. Rulla i hop bröden och servera."
                        },
                        {
                            "title": "Fiskburgare",
                            "ingress": "",
                            "ing": ["ca 500 g fisk", "0,5 gul lök", "0,5 matlagningsgrädde", "1 msk potatismjöl", "3-5 krm salt", "vitpeppar", "cayennepeppar"],
                            "desc": "Mixa allt och stek på"
                        },
                        {
                            "title": "Spenat/fetalasagne",
                            "ingress": "20-25 minuter, 200 grader",
                            "ing": ["lasagneplattor", "500 g hackad spenat", "1-2 paket fetaost", "200 g keso", "1 burk creme fresh", "körsbärstomater", "Riven ost", "salt+peppar"],
                            "desc": "Blanda allt(inte plattorna eller osten). Lagra med lasagneplattor och avsluta med ost på toppen. Grädda."
                        },
                        {
                            "title": "Sötpotatisgratäng",
                            "ingress": "200 grader i 10 minuter",
                            "ing": ["5 st sötpotatisar", "0,5 st röd chilli", "0,5 st gul lök", "2 st vitlöksklyftor", "1 msk smör", "3 dl grädde", "1 dl mjölk", "1,5 dl riven ost", "0,5 st purjolök"],
                            "desc": "Stek potatis, chilli, gullök, mjölk, vitlök i kastrull tillsätt grädde+mjölk. Kok 10 min. Lägg i ungnsform. Strö över purjo+ost. Grädda 10 min i ugn."
                        },
                        {
                            "title": "Karros bananplättar",
                            "ingress": "",
                            "ing": ["4 bananer", "4 dl havregryn", "2 tsk bakpulver", "1 krm kardemumma", "1 krm kanel", "0,5 tsk salt"],
                            "desc": "Mixa alla torra ingredienser i en skål. Mosa bananer och blanda med alla otorra ingredienser i en annan skål. Bland sen båda rörorna, låt stå i 10 min och stek sedan."
                        },
                        {
                            "title": "Baby back ribs",
                            "ingress": "6 portioner. Koka 1,5 timmar -> grilla",
                            "ing": ["1 dl farinsocker", "1 dl japask soya", "1 dl ketchup", "1 dl honung", "1 tum stor färsk ingefära", "4 st vitlöksklyftor", "1 tsk tabasco", "5 kg tunna revbensspjäll", "3st gula lökar", "1 st hel vitlök", "salt+peppar"],
                            "desc": "Glaze: Blanda farinsocker, soya, ketchup och honung i ne skål. Skala och riv ingefära och vitlök och blanda det i glazen. Smaksätt med tabasco. <span>Ribs:</span> Koka upp en stor kastrull med vatten. Halvera lökarna och vitlöken, lägg dem i kastrullen. Tillsätt svartpepparkorn och rikligt med salt. Dela revbenen på mitten så att de ryms i kastrullen och täcks helt med vatten. Koka dem långsamt under lock i cirka 1 ½ timme. De är färdiga när köttet börjar lossa från benen. Ta upp revbenen och torka det med hushållspapper, lägg dem på en ugnsplåt och pensla med BBQ glaze. Grilla dem och pensla på mer glaze under grillningen. "
                        }

                    ]
                }
            ];

    }



    }
}  
