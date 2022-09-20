---
layout: default
title: Binary Search
---
<div id="binarySearch-sortableTrash" class="sortable-code"></div>
<div id="binarySearch-sortable" class="sortable-code"></div>
<div style="clear:both;"></div>
<p>
    <input id="binarySearch-feedbackLink" value="Get Feedback" type="button" />
    <input id="binarySearch-newInstanceLink" value="Reset Problem" type="button" />
</p>
<script type="text/javascript">
(function(){
  var initial = "def binary_search(list1, n):  \n" +
    "    low = 0  \n" +
    "    high = len(list1) - 1  \n" +
    "    mid = 0  \n" +
    "  	\n" +
    "    while low &lt;= high:  \n" +
    "        # first find the middle point in the list of items  \n" +
    "        mid = (high + low) // 2  \n" +
    "  \n" +
    "        # Check if n is present at mid   \n" +
    "        if list1[mid] &lt; n:  \n" +
    "            low = mid + 1  \n" +
    "  \n" +
    "        # If n is greater, compare to the right of mid   \n" +
    "        elif list1[mid] &gt; n:  \n" +
    "            high = mid - 1  \n" +
    "  \n" +
    "        # If n is smaller, compared to the left of mid  \n" +
    "        else:  \n" +
    "            return mid  \n" +
    "  \n" +
    "            # element was not present in the list, return -1  \n" +
    "    return -1 ";
  var parsonsPuzzle = new ParsonsWidget({
    "sortableId": "binarySearch-sortable",
    "max_wrong_lines": 10,
    "grader": ParsonsWidget._graders.UnitTestGrader,
    "exec_limit": 2500,
    "can_indent": true,
    "x_indent": 50,
    "lang": "en",
    "show_feedback": true,
    "trashId": "binarySearch-sortableTrash",
    "unittests": "import unittestparson\nclass myTests(unittestparson.unittest):\n  def test_0(self):\n    self.assertEqual(binary_search([12, 24, 32, 39, 45, 50, 54], 45),4,)\n_test_result = myTests().main()"
  });
  parsonsPuzzle.init(initial);
  parsonsPuzzle.shuffleLines();
  $("#binarySearch-newInstanceLink").click(function(event){
      event.preventDefault();
      parsonsPuzzle.shuffleLines();
  });
  $("#binarySearch-feedbackLink").click(function(event){
      event.preventDefault();
      parsonsPuzzle.getFeedback();
  });
})();
</script>
[Previous](./example1.html)
