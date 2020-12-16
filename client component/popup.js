


var labelColor = {'0': 'red', '1': 'blue', '2': 'sandybrown', '3': 'green', '4': 'orange', '5': 'DimGray', '6': 'DarkCyan', '7': 'SaddleBrown', '8': 'black'};

var labelTag = {'A': '0', 'Ch': '1', 'Cr': '2', 'J': '3', 'Law': '4', 'Ltd': '5', 'Ter': '6', 'Use': '7', 'Neu':'8'};
var labelTagN = {'0': 'A', '1': 'Ch', '2': 'Cr', '3': 'J', '4': 'Law', '5': 'Ltd', '6': 'Ter', '7': 'Use', '8':'Neu'};
var labelTagTool = {'A': 'Arbitration ', 'Ch': 'Unilateral change', 'Cr': 'Content removal', 'J': 'Jurisdiction', 'Law': 'Choice of law', 'Ltd': 'Limitation of liability', 'Ter': 'Unilateral termination', 'Use': 'Contract by using', 'Neu': 'Neutral'};
var labelTagDesc = {
    'A': 'The arbitration clause requires or allows the parties to resolve their disputes through an arbitration process, before the case could go to court.',
    'Ch': 'The unilateral change clause specifies the conditions under which the service provider could amend and modify the terms of service and/or the service itself.',
    'Cr': 'The content removal gives the provider a right to modify/delete user’s content, including in-app purchases, and sometimes specifies the conditions under which the service provider may do so.',
    'J': 'The jurisdiction clause stipulates what courts will have the competence to adjudicate disputes under the contract.',
    'Law': 'The choice of law clause specifies what law will govern the contract, meaning also what law will be applied in potential adjudication of a dispute parising under the contract.',
    'Ltd': 'The limitation of liability clause stipulates that the duty to pay damages is limited or excluded, for certain kind of losses, under certain conditions.',
    'Ter': 'The unilateral termination clause gives provider the right to suspend and/or terminate the service and/or the contract, and sometimes details the circumstances under which the provider claims to have a right to do so.',
    'Use': 'The contract by using clause stipulates that the consumer is bound by the terms of use of a specific service, simply by using the service, without even being required to mark that he or she has read and accepted them.'
};
 function copri() {
        var elementi = document.getElementsByClassName("nascondi");


        if (elementi.length != 0) {

            var valoreatt = elementi[0].style.display;


            if (valoreatt == 'none') {
                $(".nascondi").show();
                $("#bottoneSH").remove();
                $("#bottoneSH2").remove();
                $("#descSH").remove();
                $("#divbottoneSH").append(" <button id='bottoneSH' class='btn btn-secondary' style='background: #C00001; color: #FFFFFF'> Show</button> </td>");
                $("#divbottoneSH").append(" <button id='bottoneSH2' class='btn btn-secondary' style='background: #f2f2f2; color: black'> Hide </button> </td>");
                $("#divbottoneSH").append(" <p id='descSH' align='center'> Show or Hide clauses FAIR </p>")

            } else {
                $(".nascondi").hide();
                $("#bottoneSH").remove();
                $("#bottoneSH2").remove();
                $("#descSH").remove();
                $("#divbottoneSH").append(" <button id='bottoneSH' class=' btn btn-secondary' style='background: #f2f2f2; color: black'> Show </button> </td>");
                $("#divbottoneSH").append(" <button id='bottoneSH2' class='btn btn-secondary' style='background: #C00001; color: #FFFFFF'> Hide </button> </td>");
                $("#divbottoneSH").append(" <p id='descSH' align='center'> Show or Hide clauses FAIR </p>")

            }
        }else{
            alert("no messages to show or hide")
        }

         $("#bottoneSH").click(copri);
         $("#bottoneSH2").click(copri);

}

            $(document).ready(function () {
                $("#bottoneSH").click(copri);
                $("#bottoneSH2").click(copri);
                $("#bottone").click(function () {
                   var valor = $("#subjectT").val();

                $.ajax({
                    type:"POST",
                    url:"http://127.0.0.1:8080/prendi",
                    data: {'testT' : valor },
                    dataType: "json",



                    success: function (msg) {
                        $("#tableS").empty();
                        var valore = msg;
                        var numcol = valore.cate;
                        var fra = valore.frase;
                        var fa =valore.fair;
                        var perc = valore.perc;

                         var i=0;

                        while (i < numcol.length) {
                            /*console.log("sono qui " + numcol[i]);
                            console.log("1 " + labelTagN[numcol[i]]);
                            console.log(labelTagTool[labelTagN[numcol[i]]]);
                            console.log("colore " + labelColor[labelTag[labelTagN[numcol[i]]]]);
                            console.log("3 " + fra[i]);*/


                            if (!(fra[i] == ' '|| fra[i] == '' || fra[i] == null || numcol[i]==8)) { //controllo se la frase non è vuota altrimenti mi fa vedere l'analisi di una frase che è vuota

                                $("#tableS").append("<tr align='center' id=" + i + ">" + "</tr>");
                                if(fa[i] == 0) {
                                    document.getElementById(i).className="nascondi";
                                    document.getElementById(i).style.display='none'
                                   // $("#" + i).className="nascondi";
                                    $("#" + i).append("<td id=" + i + "a" +">" + fra[i] + "</td>");
                                }else {
                                    $("#" + i).append(" <td  id=" + i + "a" + " >" + fra[i] + "</td>");
                                }


                               //$("#" + i).append(" <td id=" + i + "b" + " >" + labelTagTool[labelTagN[numcol[i]]] + "</td>");


                                if(numcol[i] == 0) {
                                    $("#" + i).append("<td id=" + i + "b" + ">" + "<img class=icone src=icone/a.png height='55' width='55'>" + "</td>");
                                }
                                if(numcol[i] == 1) {
                                    $("#" + i).append("<td id=" + i + "b" + ">" + "<img class=icone src=icone/ch.png height='55' width='55'>" + "</td>");
                                }
                                if(numcol[i] == 2) {
                                    $("#" + i).append("<td id=" + i + "b" + " >" + "<img class=icone src=icone/cr.png height='55' width='55'>" + "</td>");
                                }
                                if(numcol[i] == 3) {
                                    $("#" + i).append("<td id=" + i + "b" + ">" + "<img class=icone src=icone/j.png height='55' width='55'>" + "</td>");
                                }
                                if(numcol[i] == 4) {
                                    $("#" + i).append("<td id=" + i + "b" + ">" + "<img class=icone src=icone/law.png height='55' width='55'>" + "</td>");
                                }
                                if(numcol[i] == 5) {
                                    $("#" + i).append("<td id=" + i + "b" + ">" + "<img class=icone src=icone/ltd.png height='55' width='55'>" + "</td>");
                                }
                                if(numcol[i] == 6) {
                                    $("#" + i).append("<td id=" + i + "b" + ">" + "<img class=icone src=icone/ter.png height='55' width='55'>" + "</td>");
                                }
                                if(numcol[i] == 7) {
                                    $("#" + i).append("<td id=" + i + "b" + ">" + "<img class=icone src=icone/use.png height='55' width='55'>" + "</td>");
                                }

                                if (fa[i]==1)
                                //$("#" + i).append(" <td id=" + i + "c" + " >" +"<div style='float: left'><p class=potUN >Potentially Unfair</p>"+"<p  class=percentuale>"+perc[i]+"%"+"</p></div>"+"</td>");
                                  $("#" + i).append(" <td id=" + i + "c" + " >" +"<div style='float: left'><img src='fairness/PotUnfair.png' width='102' height='31' style='margin-bottom: 2px'>"+"</div><div><p class=percentuale>"+perc[i]+"%"+"</p></div>"+"</td>");

                                if (fa[i]==0)
                                $("#" + i).append(" <td id=" + i + "c" + " >" +"<div style='float: left'><img src='fairness/Fair.png' width='102' height='31' style='margin-bottom: 2px'>"+"</div><div><p class=percentuale>"+perc[i]+"%"+"</p></div>"+"</td>");
                                  if (fa[i]==2)
                                $("#" + i).append(" <td id=" + i + "c" + " >" +"<div style='float: left'><img src='fairness/Unfair.png' width='102' height='31' style='margin-bottom: 2px'>"+"</div><div><p class=percentuale>"+perc[i]+"%"+"</p></div>"+"</td>");


                                $("#" + i).css("color", labelColor[labelTag[labelTagN[numcol[i]]]]);


                                var td = document.getElementById( i+ "b");
                                var span = document.createElement("span");
                                td.className = "tooltip";
                                span.id = i + "c";
                                span.className = "tooltiptext";
                                span.innerText = labelTagN[numcol[i]] + ": " + labelTagDesc[labelTagN[numcol[i]]];
                                //console.log(span);
                                td.appendChild(span);
                            }

                                i++;
                        }
                        },
                    error: function () {
                        alert("Fallito");

                    }
                });

                 if(jQuery.isEmptyObject(valor)){
                     alert("Inserisci il testo");
                           }
            });
            });


