$(document).ready(function() {

    // var oggi = moment().locale('it').format('dddd');
    // console.log(oggi);
    //
    // var oggi2 = moment();
    // console.log(oggi2.endOf('month'));
    //
    // var dataAttuale = moment();
    // var dataAttuale1 = dataAttuale;
    // var dataAttualeMoment = moment(dataAttuale);
    // var dataAttualeClone = dataAttuale.clone();
    // console.log(dataAttuale.format('DD'));
    // console.log(dataAttuale1.format('DD'));
    //
    // dataAttuale.add(7, 'days');
    // console.log(dataAttuale.format('DD'));
    // console.log(dataAttuale1.format('DD'));
    // console.log(dataAttualeMoment.format('DD'));
    // console.log(dataAttualeClone.format('DD'));

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);

    var dataIniziale = moment('2018-01-01');
    stampaGiorniMese(dataIniziale);
    stampaFestivi();

    $('.mese-succ').click(function () {
        dataIniziale.add(1, 'month');
        stampaGiorniMese(dataIniziale);
    });

    $('.mese-prec').click(function () {
        dataIniziale.subtract(1, 'month');
        stampaGiorniMese(dataIniziale);
    });

    function stampaFestivi() {
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: 2018,
                month: 0
            },
            success: function(data) {
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i];
                    var nomeFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    $('#calendar li[data-day="'+ dataFestivo +'"]').addClass('festivo').append(' - ' + nomeFestivo);
                }
            }
        });
    }

    function stampaGiorniMese(meseDaStampare) {
        $('#calendar').empty();
        var standardDay = meseDaStampare.clone();
        var giorniMese = meseDaStampare.daysInMonth();
        var nomeMese = meseDaStampare.format('MMMM');
        $('#nome-mese').text(nomeMese);

        for (var i = 1; i <= giorniMese; i++) {
            var giornoDaInserire = {
                day: i + ' ' + nomeMese,
                dataDay: standardDay.format('YYYY-MM-DD')
            }
            var templateFinale = templateGiorno(giornoDaInserire);
            $('#calendar').append(templateFinale);
            standardDay.add(1, 'day');
        }
    }

});
