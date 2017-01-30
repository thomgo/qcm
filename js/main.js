$( document ).ready(function() {

  //
  // ~~~~~~~ general functions ~~~~~~~~~~~
  //

  // When the user choose an answer it taken has userAnswer and seek for the answer with the right class
  function getAnswers() {
    $(".current input").click().focus(function (){
      $(this).siblings().prop('checked', false);
      userAnswer = $(this).val();
      correctAnswer = $(".current .right").val();
      });
    }

  // Clear the radio button on the whole page
  $("input").prop('checked', false);

  // Add the value as text after the input to avoid to copy it in html and clear tags
  $("input").each(function(){
    var answerContent = $(this).val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    answerContent = " " + answerContent + "<br>";
    $(this).after(answerContent);
  });

  // Add the light icon to make HTML lighter
  $(".explaination").prepend("<i class='fa fa-lightbulb-o fa-2x' aria-hidden='true'></i> ");

  // Hide all the questions
  $(".question").hide();

  // Add the current class to the first one and show it
  $(".question").first().addClass("current");
  $(".current").show();
  // Hide the current explaination
  // $(".current input").last().after("<button class='validate'>Valider</button>");
  $(".current .explaination").hide();

  // Start to calculate the score, finalscore is based on the number of questions
  var finalscore = $(".question").length;
  var score = 0;

  // Add the current score to the article with class .score, by default 0
  $(".score").append("<p>" + score + "/" + finalscore + "</p>");

  // Declare the variable to store the user answer and the correct one to compare
  var userAnswer;
  var correctAnswer;

  // Start to catch the user answer for comparaison
  getAnswers();

  // When the user decides to validate his answer it is compared to the correctAnswer
    $(".validate").click(function() {
      $(".result").remove();
      if (userAnswer === correctAnswer) {
        $(this).after("<p class='result good'>Bonne réponse</p>");
        score = score + 1;
        $(".score p").html( score + "/" + finalscore );
      }
      else {
        $(this).after("<p class='result bad'>Mauvaise réponse</p>");
      }

      // Show the explaination paragraphe and hide the validate button
      $(".current .explaination").fadeIn();
      $(this).hide();
      // Add the next button
      $(".current .explaination").after("<button class='next'>Suivant</button>");

      $(".next").click(function(){
        if($(this).parent(".question").index() === finalscore - 1) {
          var godAnswer = Math.round((score/finalscore)*100) ;
          var advice;

          if (godAnswer<50) {
            advice = "Il semble que plusieurs notions importantes ne soient pas comprises, il faut continuer à travailler";
          }
          else if (godAnswer >= 50 && godAnswer<75) {
            advice = "Les bases sont acquises mais il faudrait peut-être relire quelques chapitres";
          }
          else if (godAnswer >= 75 && godAnswer< 100) {
            advice = "Très bon score vous êtes prêt pour la suite";
          }
          else {
            advice = "Parfait rien ne vous a échappé foncez vers la suite";
          }

          alert("Test fini vous avez bien répondu à " + godAnswer + "% des questions. " + advice);
          location.reload();
        }
        else {
          $(".current").next().addClass("current").show();
          $(".current").first().removeClass("current").hide();
          $(".current .explaination").hide();

          getAnswers();
        }
      });

    });

});
