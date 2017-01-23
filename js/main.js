$( document ).ready(function() {

  // Hide all the questions
  $(".question").hide();

  // Add the current class to the first one and show it
  $(".question").first().addClass("current");
  $(".current").show();
  // Hide the current explaination
  $(".current .explaination").hide();

  // Start to calculate the score, finalscore is based on the number of questions
  var finalscore = $(".question").length;
  var score = 0;

  // Add the current score to the article with class .score, by default 0
  $(".score").append("<p>" + score + "/" + finalscore + "</p>");

  // When the user choose an answer it taken has userAnswer and seek for the answer with the right class
  $("input").focus(function (){
    var userAnswer = $(this).val();
    var correctAnswer = $(".current .right").val();

  // When the user decides to validate his answer it is compared to the correctAnswer
    $(".validate").click(function() {
      $(".result").remove();
      if (userAnswer === correctAnswer) {
        $(this).after("<p class='result'>Bonne réponse</p>");
        score = score + 1;
        $(".score p").html( score + "/" + finalscore );
      }
      else {
        $(this).after("<p class='result'>Mauvaise réponse</p>");
      }

      // Show the explaination paragraphe and hide the validate button
      $(".current .explaination").fadeIn();
      $(this).hide();
      // Add the next button
      $(".current .explaination").after("<button class='next'>Suivant</button>");

      $(".next").click(function(){
        $(".current").next().addClass("current").show();
        $(".current").first().removeClass("current").hide();
        $(".current .explaination").hide();
        return false;
      });
      return false;
    });
    return false;
  });

});
