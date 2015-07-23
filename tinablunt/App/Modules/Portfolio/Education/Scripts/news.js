/*global $, Class, console, document, Image, window */
var News = Class.extend({
    d: null,
    monthArray: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
    imageIndex: 0,
    lastImageIndex: 0,
    carousel_w : 662,
   
    init: function (data) {
        "use strict";
        this.d = data;
        this.drawNews();
        this.initIsotope();
    },

    drawNews: function(){
        "use strict";
        var i,s,newsItem,d,j,carouselString, self = this,activeClass, hideArrows, linkString;
        for (i = 0; i < this.d.length; i += 1) {
            s = this.d[i];
           // d = this.formatDate(s.date);
            hideArrows = "";
            activeClass = "";
            linkString = "";
            if (s.img.length <= 1) {
                hideArrows = "hideArrows";
            }
            carouselString = "<div id='case-carousel" + i + "' class='carousel slide hideArrows '>" +
                                "<div class='carousel-inner'>";
            for (j = 0; j < s.img.length; j++) {
                activeClass = "";
                if (j === 0) {
                    activeClass = "active";
                }
                carouselString += "<div class='item "+activeClass+"'><img class='carouselImg ' src='"+s.img[j]+"'/></div>";
            }
            if (s.rapportLink) {
                linkString += "<a class='exlink firstLink' href=" + s.rapportLink + " target='_blank'>Klicka här för att läsa rapporten</a>"
            }
            if (s.demoLink) {
                linkString += "<a class='exlink' href=" + s.demoLink + " target='_blank'>Klicka här för att titta på ett demo<span>(Obs! Endast utevcklat för Chrome)</span></a>"
            }

            carouselString += "</div><a class='left carousel-control' href='/#/Education/#case-carousel"+i+"' data-slide='prev'>"+
                                       "<img src='App/Modules/Portfolio/Education/Content/arrow_left_sel.png'></img></a>" +
                              "<a class='right carousel-control' href='#case-carousel" + i + "' data-slide='next'>" +
                                       "<img src='App/Modules/Portfolio/Education/Content/arrow_right_sel.png'></img></a>" +
                                     "</div>";
            $("#container").append("<div class='element small "+s.type+" ak"+s.date+"'>"+
                                    "<div class='headerDiv'>"+
                                    "<div class='headerImgDiv' style='background-image:url(" + s.img[0] + ");'></div>" +
                                    "<h2>" + s.title + "</h2>"+
                                     "<h3 class='symbol'>Årskurs " + s.date + "</h3></div>" +
                                    "<div class='expandContent'>" +
                                        carouselString +
                                    "<h4>" + s.title + "</h4>" +
                                    "<p>" + s.description + "</p>" +
                                    linkString+
                                    "</div></div>");
            $('.carousel').carousel({
                interval: 3000
            });
        }
        $("#case-carousel" + i + "").removeClass("small");

      
    },

    formatDate: function (date) {
        "use strict";
        var dateArray,i;
        dateArray = date.split("-");
        for (i = 0; i < dateArray.length; i += 1) {
            if (dateArray[i].substring(0, 1) === "0") {
                dateArray[i] = dateArray[i].replace("0", "");
            }
        }
        dateArray[1] = this.monthArray[dateArray[1]-1];
        return dateArray;
    },

    updateAfterBrowserResize: function () {
        "use strict";
       
        $(".newsWrapper").css({
            height: $("#container").height()
        });
    },
     
    initIsotope: function () {
        "use strict";

        var $container = $('#container'),
            filters = {},
            self = this;

        $container.isotope({
            itemSelector: '.element',
            masonry: {
                columnWidth: 240,
                columnHeight: 240
            }
        });

        // change size of clicked element
        $.proxy($container.delegate('.small', 'click', function (e) {
            $(".element").removeClass('large');
            $(".element").addClass('small');
            $(e.currentTarget).addClass('large');
            $(e.currentTarget).removeClass('small');
            $container.isotope('reLayout');
        }), this);

        // store filter value in object
        // i.e. filters.color = 'red'
        var group = 'category';
        filters[group] = '.project';
        // convert object into array
        var isoFilters = [];
        for (var prop in filters) {
            isoFilters.push(filters[prop])
        }
        var selector = isoFilters.join('');
        $container.isotope({ filter: selector });
      
        // filter buttons
        $('.filter a').click(function () {
            var $this = $(this);
            // don't proceed if already selected
            if ($this.hasClass('elemSelected')) {
                return;
            }

            var $optionSet = $this.parents('.option-set');
            // change selected class
            $optionSet.find('.elemSelected').removeClass('elemSelected');
            $this.addClass('elemSelected');

            // store filter value in object
            // i.e. filters.color = 'red'
            var group = $optionSet.attr('data-filter-group');
            filters[group] = $this.attr('data-filter-value');
            // convert object into array
            var isoFilters = [];
            for (var prop in filters) {
                isoFilters.push(filters[prop]);
            }
            var selector = isoFilters.join('');
            $container.isotope({ filter: selector });

            return false;
        });
    }
});
