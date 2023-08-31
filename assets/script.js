
$(document).ready(function () {

  let saveButtonEl = $('.saveBtn');
  // use setItem(keyName, keyValue) where keyName is the id and keyValue is the text area corresponding to your timeslot
  // 'this' applies to the thing that calls it (executes the function), in this case the savebtn
  saveButtonEl.on('click', function () {
    let input = $(this).siblings(".description").val(); // get the textarea value of the tag with class of description
    let timeSlot = $(this).parent().attr('id'); // get the time block ID
    localStorage.setItem(timeSlot, input);
  });

  let currentTime = parseInt(dayjs().format('HH')); // parse into integer
  // for each timeID, convert to a number and compare to currentTime
  $('.time-block').each(function () { // select all elements with class "time-block"
    let timeId = parseInt($(this).attr('id').split('-')[1]); // parse id of "hour-#" and just grab # using split, turn that into an integer
    if (currentTime > timeId)
      $(this).addClass('past') // for each time less than current time, set class to past
    if (currentTime === timeId)
      $(this).addClass('present') // for time equal to current time, set class to present
    if (currentTime < timeId)
      $(this).addClass('future') // for time greater than current time, set class to future
  });

$('.time-block').each(function(){
  let timeSlot = $(this).attr('id'); // gets value of id of current time block (ie: hour-9)
  let savedInput = localStorage.getItem(timeSlot); // gets value associated with key value of id
  if (savedInput !== null) { // if saved input isn't empty 
    $(this).find(".description").val(savedInput); // then find element with description class and set value to savedInput
  }
});

  let currentDay = dayjs();
  $('#currentDay').text(currentDay.format('dddd, MMM D, YYYY h:m a'));
});
