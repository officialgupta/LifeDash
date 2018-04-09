var daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var minDays = 1;
// maxDays depends on year
var minHours = 0;
var maxHours = 24;
var minMinutes = 0;
var maxMinutes = 60;
var minSeconds = 0;
var maxSeconds = 60;
var mouseoverLocked = false;
function isLeap(year) {
	return ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0)));
}
function getDayOfYear(month, day, isLeapYear) {
	// month is 0-based, day is 1-based
	dayNumber = 0;
	for (i = 0; i < month; i++)
	{
		dayNumber += daysOfMonths[i];
	}
	dayNumber += day;
	if ((month >= 2) && isLeapYear)
	{
		++dayNumber;
	}
	return dayNumber;
}
function setMaxDays(d) {
	var maxDays = (isLeap(d.getFullYear())) ? 366 : 365;
	$('#day').attr('max', maxDays);
	$('#dayTotal').html(maxDays);
}
function setDay(d) {
	var days = getDayOfYear(d.getMonth(), d.getDate(), isLeap(d.getFullYear()));
	$('#day').attr('value', days);
	$('#dayCount').html(days);
	return days;
}
function setDefaults() {
	var d = new Date();

	setMaxDays(d);
	setDay(d);

	//$('#hour').attr('min', minHours); // for meter tag
	$('#hour').attr('max', maxHours);
	$('#hourTotal').html(maxHours);

	//$('#minute').attr('min', minMinutes); // for meter tag
	$('#minute').attr('max', maxMinutes);
	$('#minuteTotal').html(maxMinutes);

	//$('#second').attr('min', minSeconds); // for meter tag
	$('#second').attr('max', maxSeconds);
	$('#secondTotal').html(maxSeconds);
}
function setProgressBars() {
	var d = new Date();

	var hours = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();

	if (seconds == minSeconds && minutes == minMinutes && hours == minHours) {
		days = setDay(d);
		if (days == minDays) {
			setMaxDays(d);
		}
	}

	$('#hour').attr('value', hours);
	$('#hourCount').html(hours);

	$('#minute').attr('value', minutes);
	$('#minuteCount').html(minutes);

	$('#second').attr('value', seconds);
	$('#secondCount').html(seconds);
}
$(document).ready(function(){
	setDefaults();
	setProgressBars();
	setInterval(setProgressBars, 500);
});