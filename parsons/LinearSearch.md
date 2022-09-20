---
layout: default
title: Linear Search
---
<div id="linearSearch-sortableTrash" class="sortable-code"></div> 
<div id="linearSearch-sortable" class="sortable-code"></div>
<div style="clear:both;"></div>
<p>
    <input id="linearSearch-feedbackLink" value="Get Feedback" type="button" />
    <input id="linearSearch-newInstanceLink" value="Reset Problem" type="button" />
</p>
<script type="text/javascript">
(function(){
  var initial = "def linear_search(list, target):\n" +
    "   index = 0\n" +
    "   while index &lt; len(list):\n" +
    "      if list[index] == target:\n" +
    "        return index\n" +
    "      else:\n" +
    "        index = index + 1\n" +
    "   return -1";
  var parsonsPuzzle = new ParsonsWidget({
    "sortableId": "linearSearch-sortable",
    "max_wrong_lines": 10,
    "grader": ParsonsWidget._graders.UnitTestGrader,
    "exec_limit": 2500,
    "can_indent": true,
    "x_indent": 50,
    "lang": "en",
    "show_feedback": true,
    "trashId": "linearSearch-sortableTrash",
    "unittests": "import unittestparson\nclass myTests(unittestparson.unittest):\n  def test_0(self):\n    self.assertEqual(linear_search([64, 34, 25, 12, 22, 11, 90], 12),3,)\n_test_result = myTests().main()"
  });
  parsonsPuzzle.init(initial);
  parsonsPuzzle.shuffleLines();
  $("#linearSearch-newInstanceLink").click(function(event){
      event.preventDefault();
      parsonsPuzzle.shuffleLines();
  });
  $("#linearSearch-feedbackLink").click(function(event){
      event.preventDefault();
      parsonsPuzzle.getFeedback();
  });
})();
</script>
[Previous](./example1.html)
