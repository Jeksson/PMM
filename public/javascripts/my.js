/**
 * Created by jekss on 27.03.17.
 */

var myMap = new Map();

$(document).ready(function () {
    $.getJSON('/fs', function (data) {
        var items = data.map(function (item) {
            myMap.set(item[0], item[1]);
        });
        for (var [key, value] of myMap) {
            $("select.form-control").append("<option>" + key + "</option>");
        }
        ;

    });

    $("#inlineCheckbox1").click(function () {
        $(".procent").text(0 + " %");
        var procent = procentPro($("#inlineCheckbox1").is(':checked'), $("#inlineCheckbox2").is(':checked'), $("#inlineCheckbox3").is(':checked'), $("#inlineCheckbox4").is(':checked'));
        $(".procent").text(procent * 100 + " %");
    });

    $("#inlineCheckbox2").click(function () {
        $(".procent").text(0 + " %");
        var procent = procentPro($("#inlineCheckbox1").is(':checked'), $("#inlineCheckbox2").is(':checked'), $("#inlineCheckbox3").is(':checked'), $("#inlineCheckbox4").is(':checked'));
        $(".procent").text(procent * 100 + " %");
    });

    $("#inlineCheckbox3").click(function () {
        $(".procent").text(0 + " %");
        var procent = procentPro($("#inlineCheckbox1").is(':checked'), $("#inlineCheckbox2").is(':checked'), $("#inlineCheckbox3").is(':checked'), $("#inlineCheckbox4").is(':checked'));
        $(".procent").text(procent * 100 + " %");
    });

    $("#inlineCheckbox4").click(function () {
        $(".procent").text(0 + " %");
        var procent = procentPro($("#inlineCheckbox1").is(':checked'), $("#inlineCheckbox2").is(':checked'), $("#inlineCheckbox3").is(':checked'), $("#inlineCheckbox4").is(':checked'));
        $(".procent").text(procent * 100 + " %");
    });


    $(".isp").click(function () {
        $(".rast").val("");
        //$(".stron").text(0);
    });

    $(".rast").click(function () {
        $(".isp").val("");
        //$(".stron").text(0);
    });

    $(".buttonLitr").click(function () {

        //$(".stron").text(0);
        $(".isp").val("");


        var km = $(".rast").val();
        var kolHod = $(".kolHod").val();
        if (kolHod == "" || kolHod == null) kolHod = 0;
        var radio1 = $("#inlineCheckbox1").is(':checked');
        var radio2 = $("#inlineCheckbox2").is(':checked');
        var radio3 = $("#inlineCheckbox3").is(':checked');
        var radio4 = $("#inlineCheckbox4").is(':checked');

        var litrOtv;

        $('.mySelect option:selected').each(function () {
            litrOtv = "$${{" + km +
                " * (" + rashodForFormul(this.text, myMap) +
                " + " + procentPro(radio1, radio2, radio3, radio4) +
                ") \\over 100} + 0,25 * " + kolHod +
                " = " + litrOtvet(this.text, myMap, km, kolHod, radio1, radio2, radio3, radio4) + "}$$";
            $(".stron").text(litrOtv);
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    });

    $(".buttonKil").click(function () {
        //$(".stron").text(0);
        $(".rast").val("");

        var litr = $(".isp").val();
        var kolHod = $(".kolHod").val();
        if (kolHod == "" || kolHod == null) kolHod = 0;
        var radio1 = $("#inlineCheckbox1").is(':checked');
        var radio2 = $("#inlineCheckbox2").is(':checked');
        var radio3 = $("#inlineCheckbox3").is(':checked');
        var radio4 = $("#inlineCheckbox4").is(':checked');

        var kmOtv;


        $('.mySelect option:selected').each(function () {

            kmOtv = "$${{{(" + litr +
                "+ 0,25 * " + kolHod +
                ") * 100} \\over {" + rashodForFormul(this.text, myMap) +
                " + " + procentPro(radio1, radio2, radio3, radio4) +
                "}} = " + kmOtvet(this.text, myMap, litr, kolHod, radio1, radio2, radio3, radio4) + " }$$";

            $(".stron").text(kmOtv);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });
    });

});


$(".search").keyup(function () {
    if ($(this).val() != "") {
        var sel = $(".mySelect option");

        $(sel).prop('selected', false);

        for (var i = 0; i < sel.length; i++) {
            $(sel[i]).hide();

            if (sel[i].text.match(new RegExp($(this).val(), "gi")) != null && $(this).val() != "") {

                $(sel[i]).prop('selected', true);
                $(sel[i]).show();
            }
        }
    }
});

function procentPro(radio1, radio2, radio3, checkBox) {
    var procent;
    if (radio1 == true && radio2 == true && radio3 == true) {
        procent = 0.3;
        if (checkBox != false) {
            procent = procent * -1;
        }
    } else if (radio1 == true && radio2 == true && radio3 == false) {
        procent = 0.15;
        if (checkBox != false) {
            procent = procent * -1;
        }
    } else if (radio1 == true && radio2 == false && radio3 == true) {
        procent = 0.20;
        if (checkBox != false) {
            procent = procent * -1;
        }
    } else if (radio1 == true && radio2 == false && radio3 == false) {
        procent = 0.05;
        if (checkBox != false) {
            procent = procent * -1;
        }
    } else if (radio1 == false && radio2 == true && radio3 == false) {
        procent = 0.1;
        if (checkBox != false) {
            procent = procent * -1;
        }
    } else if (radio1 == false && radio2 == false && radio3 == true) {
        procent = 0.15;
        if (checkBox != false) {
            procent = procent * -1;
        }
    } else if (radio1 == false && radio2 == true && radio3 == true) {
        procent = 0.25;
        if (checkBox != false) {
            procent = procent * -1;
        }
    } else if (radio1 == false && radio2 == false && radio3 == false) {
        procent = 0;
        if (checkBox != false) {
            procent = procent * -1;
        }
    }
    return procent;
}

function kmOtvet(nameAvto, map, litr, kolHod, radio1, radio2, radio3, checkbox) {
    var km = 0;
    km = ((litr - 0.25 * kolHod) * 100) / rashod(nameAvto, map, radio1, radio2, radio3, checkbox);
    return km;
}

function rashod(nameAvto, map, radio1, radio2, radio3, checkbox) {

    var rash = 0;
    for (var [key1, value1] of myMap) {
        if (key1.trim() === nameAvto.trim()) {
            var proc = procentPro(radio1, radio2, radio3, checkbox);
            var val1 = parseFloat(value1);
            proc *= val1;
            rash = val1 + proc;
        }
    }
    return rash;
}
function rashodForFormul(nameAvto, map) {

    var rash = 0;
    for (var [key1, value1] of myMap) {
        if (key1.trim() === nameAvto.trim()) {

            var val1 = parseFloat(value1);

            rash = val1;
        }
    }
    return rash;
}

function litrOtvet(nameAvto, map, km, kolHod, radio1, radio2, radio3, checkbox) {
    var litr = 0;
    litr = ((km * rashod(nameAvto, map, radio1, radio2, radio3, checkbox)) / 100) + 0.25 * kolHod;
    return litr;
}


