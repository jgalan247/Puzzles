<div id="Turtle1-sortableTrash" class="sortable-code"></div> 
<div id="Turtle1-sortable" class="sortable-code"></div> 
<div style="clear:both;"></div> 
<p> 
    <input id="Turtle1-feedbackLink" value="Get Feedback" type="button" /> 
    <input id="Turtle1-newInstanceLink" value="Reset Problem" type="button" /> 
</p> 
<script type="text/javascript"> 
(function(){
  var initial = "import turtle               \n" +
    "wn = turtle.Screen()        \n" +
    "alex = turtle.Turtle()      \n" +
    "alex.left(90)               \n" +
    "alex.forward(75)            ";
  var parsonsPuzzle = new ParsonsWidget({
    "sortableId": "Turtle1-sortable",
    "max_wrong_lines": 10,
    "grader": ParsonsWidget._graders.LineBasedGrader,
    "exec_limit": 2500,
    "can_indent": true,
    "x_indent": 50,
    "lang": "en",
    "show_feedback": true
  });
  parsonsPuzzle.init(initial);
  parsonsPuzzle.shuffleLines();
  $("#Turtle1-newInstanceLink").click(function(event){ 
      event.preventDefault(); 
      parsonsPuzzle.shuffleLines(); 
  }); 
  $("#Turtle1-feedbackLink").click(function(event){ 
      event.preventDefault(); 
      parsonsPuzzle.getFeedback(); 
  }); 
})(); 
</script>
