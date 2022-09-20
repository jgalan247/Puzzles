---
layout: default
title: Calculator
---
<div id="calculator-sortableTrash" class="sortable-code"></div>
<div id="calculator-sortable" class="sortable-code"></div>
<div style="clear:both;"></div>
<p>
    <input id="calculator-feedbackLink" value="Get Feedback" type="button" />
    <input id="calculator-newInstanceLink" value="Reset Problem" type="button" />
</p>
<script type="text/javascript">
(function(){
  var initial = "def calculator(a,b):\n" +
    "  mulTable = [[0 for x in range(11)] for y in range(11)]\n" +
    "  for x in range(1, 11):\n" +
    "    for y in range(1,11):\n" +
    "      mulTable [x][y]=x*y\n" +
    "  return(mulTable[a][b])";
  var parsonsPuzzle = new ParsonsWidget({
    "sortableId": "calculator-sortable",
    "max_wrong_lines": 10,
    "grader": ParsonsWidget._graders.UnitTestGrader,
    "exec_limit": 2500,
    "can_indent": true,
    "x_indent": 50,
    "lang": "en",
    "show_feedback": true,
    "trashId": "calculator-sortableTrash",
    "unittests": "import unittestparson\nclass myTests(unittestparson.unittest):\n  def test_0(self):\n    self.assertEqual(calculator(8,7),56,)\n_test_result = myTests().main()"
  });
  parsonsPuzzle.init(initial);
  parsonsPuzzle.shuffleLines();
  $("#calculator-newInstanceLink").click(function(event){
      event.preventDefault();
      parsonsPuzzle.shuffleLines();
  });
  $("#calculator-feedbackLink").click(function(event){
      event.preventDefault();
      parsonsPuzzle.getFeedback();
  });
})();
</script>
[Previous](./example1.html)
