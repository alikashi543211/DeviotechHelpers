
// START Jahaan par khaaali ho gi to wohaan par error aa jaaey ga this filed requried 
function validate() {
    var valid = true;
    $("form").find('.alert-warning').remove();
    $(".job_field:visible").each(function () {
        if ($(this).val() == "") {
            $(this).closest("div").find(".alert-danger").remove();
            $(this)
            .closest("div")
            .append('<div class="alert-danger mb-2">This field is required</div>');
            valid = false;
        } 
        else {
            $(this).closest("div").find(".alert-danger").remove();
        }
    });
    if (!valid) {
        $("html, body").animate(
            {
                scrollTop: $(".alert-danger:first").offset().top-80,
            },
            100
        );
    }
    return valid;
}
// END Jahaan par khaaali ho gi to wohaan par error aa jaaey ga this filed requried

// START ADD MORE
function add_more()
{
  var limit = 1;
  $(document).on("click",".btn-add",function (e) 
  {
      // alert(limit);
      e.preventDefault();
      if (limit < 10) 
      {
          var pointer = getLineItemsBlockLength();
          var content = $('#job_row-1').html();
          $(".job_block").append('<div class="shadow row my-3" id="job_row-'+(pointer+1)+'">'+content+'</div>');
          $('#job_row-'+(pointer+1)).find('.item-count').text(pointer+1);
          $('#job_row-'+(pointer+1)).find('.btn-del').removeClass('d-none');
          $('#job_row-'+(pointer+1)).find('.time').clockpicker(
          {
              placement: 'bottom',
              align: 'left',
              autoclose: true,
              default: 'now',
              donetext: "Select",
              afterShow: function() 
              {
                  $(".clockpicker-minutes").find(".clockpicker-tick").filter(function(index,element)
                  {
                      return !($.inArray($(element).text(), choices)!=-1)
                  }).remove();
              }
          });
          limit++;
          if(limit == 10)
          $(this).fadeOut();
      }
  });
}

function refreshCounter()
{
    var count = 1;
    $('.job_block .shadow').each(function()
    {
        $(this).find('.item-count').text(count);
        count++;
    });
    if(limit == 10)
        $('.btn-add').fadeIn();
    limit--;
    $(".hidden_item_count").val(limit);
}

function getLineItemsBlockLength()
{

    return $(".job_block .shadow").length;
}

$(document).on('click', '.btn-del', function(){
    $(this).closest('.shadow').remove();
    refreshCounter();
});

// END ADD MORE

// Start Jab Enter karen to kUCH b na ho jesey petro issue me huwa tha
$(document).ready(function() {
  $(window).keydown(function(event){
      if(event.keyCode == 13) {
          event.preventDefault();
          return false;
      }
  });
});
// End Jab Enter karen to kUCH b na ho jesey petro issue me huwa tha

// Start Convert Time Function ye clock picker se aney waley time ko convert karta he
function time_converter()
{
    var T=["0.00", "0.02", "0.03", "0.05", "0.07", "0.08", "0.1", "0.12", "0.13", "0.15", "0.17", "0.18", "0.2", "0.22", "0.23", "0.25", "0.27", "0.28", "0.3", "0.32", "0.33", "0.35", "0.37", "0.38", "0.4", "0.42", "0.43", "0.45", "0.47", "0.48", "0.5", "0.52", "0.53", "0.55", "0.57", "0.58", "0.6", "0.62", "0.63", "0.65", "0.67", "0.68", "0.7", "0.72", "0.73", "0.75", "0.77", "0.78", "0.8", "0.82", "0.83", "0.85", "0.87", "0.88", "0.9", "0.92", "0.93", "0.95", "0.97", "0.98"];
    var time;
    $('.time').each(function(){
    if($(this).val() !== ''){
    time = $(this).val().split(':')
    $(this).val(parseInt(time[0])+parseFloat(T[parseInt(time[1])]));
    }
    });
}

// End Convert Time Function ye clock picker se aney waley time ko convert karta he

// START Save Data By Ajax POST Method Se
$(document).on("click", '.save_job_btn', function(){
  var form = $('#job_form').serialize();
  if(validate())
  {
      $.ajax({
          type: "POST",
          url: "{{ route('save_job') }}",
          data: form,
          success: function (response) {
               toastr.success(response);
               window.location.reload(true);
          },
      });
  }
});
// END Save Data By Ajax

// START GET METHOD AJAX
function loadPhoneForm()
{
    $.ajax({
        type: "GET",
        url: "{{ route('load.phone.form') }}",
        success: function (response) {
            $('.profileModal-body').html(response);
        }
    });
}
// END GET METHOD AJAX

// START COPY TEXT CODE
function copyText() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}
// END COPY TEXT CODE

// START LARAVEL ME MASTER FILE ME SUCCESS FLASH SESSION PAR TOASTR SUCCESS OR ERROR PAR ERROR KA DIKHANA.
@if(session('success'))
    toastr.success("{{ session('success') }}");
@elseif(session('error'))
    toastr.error("{{ session('error') }}");
@endif
$( function() {
    $( ".datepicker" ).datepicker({ dateFormat: 'dd-mm-yy' });
});
// END LARAVEL ME MASTER FILE ME SUCCESS FLASH SESSION PAR TOASTR SUCCESS OR ERROR PAR ERROR KA DIKHANA.

// START JAB HAM KISI B FORM ELEMENT ME CHANGE KAREN TO FORM SUBMIT HO JAAEY OR FILTER APPLY HO JAEY.
    $(document).on("click",".clear",function(e){
        e.preventDefault();
        $('.filter-form').submit();
    });
  // END JAB HAM KISI B FORM ELEMENT ME CHANGE KAREN TO FORM SUBMIT HO JAAEY OR FILTER APPLY HO JAEY.

// START YE CODE BOOTSTRAP ME TABLES JO B LISTING K LYE SHOW HOTEY HEN UN KO EXCEL ME EXPORT KAR DETA HE
$(function() {
  $("#exporttable").click(function(e){
  var table = $("#htmltable");
    if(table && table.length){
      $(table).table2excel({
      exclude: ".noExl",
      name: "Excel Document Name",
      filename: "BBBootstrap" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
      fileext: ".xls",
      exclude_img: true,
      exclude_links: true,
      exclude_inputs: true,
      preserveColors: false
      });
    }
  });
// END YE CODE BOOTSTRAP ME TABLES JO B LISTING K LYE SHOW HOTEY HEN UN KO EXCEL ME EXPORT KAR DETA HE

// START GET DIFFERANCE BETWEEN TWO TIMES AND GET OUTPUT
function diffTimes() {
  var timeFrom = $('#timeFrom').data('timepicker');
  var timeTO = $('#timeTO').data('timepicker');
  var timeFromHH = (timeFrom.hour == 12 && timeFrom.meridian == "AM") ? 0 :
    (timeFrom.hour != 12 && timeFrom.meridian == "PM") ? timeFrom.hour + 12 :
    timeFrom.hour;
  var timeTOHH = (timeTO.hour == 12 && timeTO.meridian == "AM") ? 0 :
    (timeTO.hour != 12 && timeTO.meridian == "PM") ? timeTO.hour + 12 :
    timeTO.hour;

  var timeFromMM = timeFromHH * 60 + timeFrom.minute;
  var timeTOMM = timeTOHH * 60 + timeTO.minute;

  var diffMM = Math.abs(timeTOMM - timeFromMM);
  var diff = Math.floor(diffMM / 60) + ": " + (diffMM % 60) + "mins";
  
  $("#diff").text(diff);
}
// END GET DIFFERANCE BETWEEN TWO TIMES AND GET OUTPUT

// START HOURS ON SITE
function HoursOnSite()
        {
            var T=["0.00", "0.02", "0.03", "0.05", "0.07", "0.08", "0.1", "0.12", "0.13", "0.15", "0.17", "0.18", "0.2", "0.22", "0.23", "0.25", "0.27", "0.28", "0.3", "0.32", "0.33", "0.35", "0.37", "0.38", "0.4", "0.42", "0.43", "0.45", "0.47", "0.48", "0.5", "0.52", "0.53", "0.55", "0.57", "0.58", "0.6", "0.62", "0.63", "0.65", "0.67", "0.68", "0.7", "0.72", "0.73", "0.75", "0.77", "0.78", "0.8", "0.82", "0.83", "0.85", "0.87", "0.88", "0.9", "0.92", "0.93", "0.95", "0.97", "0.98"];
            var  charges = $('#hourly_rate').find(":selected").data('hourly_rate');
            var t1 = $(".time1").val();
            var t2 = $(".time2").val();
            var time,h,m;
            if(t1!=="" && t2!=="" && charges!==""){
                var time1,time2;
                time1=t1.split(':');
                time2=t2.split(':');
                if ((parseInt(time2[0])-parseInt(time1[0]))<0) {
                    h=parseInt(time2[0])-parseInt(time1[0])+24;
                }else{
                    h=parseInt(time2[0])-parseInt(time1[0]);
                }
                if ((parseInt(time2[1])-parseInt(time1[1]))<0) {
                    m=parseInt(time2[1])-parseInt(time1[1])+60;
                    h=h-1;
                }else{
                    m=parseInt(time2[1])-parseInt(time1[1]);
                }
                time = h+parseFloat(T[m]);
                $(".hrs").val(time);
                // var charges = $('#hourly_rate').find(":selected").data('hourly_rate');

                var total = time*charges;
                total=parseFloat(total);
                if(isNaN(total))
                {
                  total="";
                }
                $("#total_amnt").val(total);

            }else{
                $(".hrs").val("");

            }
        }
// END HOURS ON SITE

// START 2 TIMES K DARMIYAAAN DIFFFERACNE CALCULATE KARNEY KE LYE
$(function() {
    $('.timepicker').timepicker({
        timeFormat: 'HH:mm',
        interval: 15,
        startHour: 6,
        maxHour: 23,
        startTime: '06:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true,
        change: tmTotalHrsOnSite,
    });
 });
// END JQUERY TIME PICKER

function tmTotalHrsOnSite () 
{
    $(this).val($(this).val()+":00");
    if ($("#TmOnSite") && $("#TmOffSite")) 
    {
        var startTime = moment($("#TmOnSite").val(), "HH:mm");
        var endTime = moment($("#TmOffSite").val(), "HH:mm");
        var duration = moment.duration(endTime.diff(startTime));
        var diff=duration.asHours().toFixed(2).split(".");
        var diff_hour=diff[0];
        var diff_min="0."+diff[1];
        diff_min=diff_min*60;          
        $("#TmTotalHrsOnSite").val(diff_hour+":"+diff_min+":00");
    }
};
// END 2 TIMES K DARMIYAAAN DIFFFERACNE CALCULATE KARNEY KE LYE

// START Jquery Date Picker
function jquery_datepicker()
{
 var script_link='<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>';
 var css_link='<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">';
 $( function() {
    $( "#datepicker" ).datepicker();
  } );
}
// END Jquery Date Picker

// START Jquery CLOCK PICKER
function jquery_clockpicker()
{
  var css_link='<link rel="stylesheet" href="https://weareoutman.github.io/clockpicker/dist/jquery-clockpicker.min.css"></link>';
  var script_link='<script src="https://weareoutman.github.io/clockpicker/dist/jquery-clockpicker.min.js"></script>';
  $('#timepicker').clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    default: 'now',
    donetext: "Select",
    afterShow: function() {
        $(".clockpicker-minutes").find(".clockpicker-tick").filter(function(index,element){
            return !($.inArray($(element).text(), choices)!=-1)
        }).remove();
    }
  });
}
// END JQUERY CLOCK PICKER

// START MOBILE PAR MOBILE WAALI SIDEBAR OPEN OR CLOSE KARNEY K LYE JQERY CODE
(function(){
        $('.navbar-toggler').on('click', function(){
            $(this).toggleClass('is-active');
            $('.side-nav').toggleClass('side-nav--show');
        });
    }());
    $(window).resize(function(){
        if ($(window).width() > 991) {
            $('.side-nav').removeClass('side-nav--show');
        }
    });
// END MOBILE PAR MOBILE WAALI SIDEBAR OPEN OR CLOSE KARNEY K LYE JQERY CODE

// START FORM KI OLD VALUES KO LARAVEL ME DIKHAANEY K LYE LAYOUT WAALI JQUERY FUNCTION
function mapDataToFields(data)
{
    $.map(data, function(value, index){
        var input = $('[name="'+index+'"]');
        if($(input).length && $(input).attr('type') !== 'file')
        {
          if(($(input).attr('type') == 'radio' || $(input).attr('type') == 'checkbox') && value == $(input).val())
            $(input).prop('checked', true);
          else
              $(input).val(value).change();
        }
    });
}
var data = <?php echo json_encode(session()->getOldInput()) ?>;
mapDataToFields(data);
// END FORM KI OLD VALUES KO LARAVEL ME DIKHAANEY K LYE LAYOUT WAALI JQUERY FUNCTION

// START Image Upload krney se pehley display karwana

function readURL(input) {
  	if (input.files && input.files[0]) {
      	var reader = new FileReader();
      	reader.onload = function(e) {
      		$('#testimonial_image').attr('src', e.target.result);
  		}
      	reader.readAsDataURL(input.files[0]); // convert to base64 string
  	}
}
$("#testimonial_img_input").change(function() {
	readURL(this);
});

// END Image Upload krney se pehley display karwana

// START VALIDATION TO PUT ONLY NUMBERS WITH INPUT TYPE TEXT FLOAT NUMBER B AA SAKTA HE IS ME
    $(document).on("keyup", ".numbers", function () { 
        this.value = this.value.replace(/[^0-9\.]/g,'');
    });
// END VALIDATION TO PUT ONLY NUMBERS WITH INPUT TYPE text FLOAT NUMBER B AA SAKTA HE IS ME


// START VALIDATION TO PUT ONLY NUMBERS WITH INPUT TYPE text FLOAT NUMBER NAHI AA SAKTA HE IS ME

$('.whole-number').keypress(function() {
    return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57;
});

// END VALIDATION TO PUT ONLY NUMBERS WITH INPUT TYPE text FLOAT NUMBER NAHI AA SAKTA HE IS ME

// START REDIRECT BACK PAR ACTIVE TAB SHOW KARWAANEY K LYE JQUERY
$(document).ready(function(){
    activaTab('{{ $tab }}');
  });

  function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
  };
// START REDIRECT BACK PAR ACTIVE TAB SHOW KARWAANEY K LYE JQUERY

// START JQUERY SE FORM SUBMIT KRNA SERIALIZE K ELAWA FORM DATA K ZARIYE SE
function submit_ajax_form_with_form_data_object()
{
    $('#form_cv_builder').on('submit', function (event) {
    event.preventDefault();
    $.ajax({
    url: "{{ route('personal.info') }}",
    method: "POST",
    data: new FormData(this),
    dataType: 'JSON',
    contentType: false,
    cache: false,
    processData: false,
    success: function (data) {
    if (data.error) {
    console.log(data.error.msg);
    alert('Something Went Wrong! Try Again.');
    } else {

    html = data.html;
    cv_users_id = data.cvuserid;
    $("#cv_update_id").val(cv_users_id);
    $('iframe#preview-cv').attr('srcdoc', html);
    }

    }
    });
    });
}
// END JQUERY SE FORM SUBMIT KRNA SERIALIZE K ELAWA FORM DATA K ZARIYE SE


function multiselect_initalize()
{
        $(document).ready(function() {
            $('.multiselect').multiselect({
                buttonWidth: '100%',
                maxHeight: '100%',
                checkbox: true,
                enableHTML: true
            });
        });
}

function datetimepicker_initalize()
{
      $('.datepicker').datetimepicker({
            useCurrent: false,
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-angle-up',
                down: 'fa fa-angle-down',
                previous: 'fa fa-angle-left',
                next: 'fa fa-angle-right',
                today: 'fa fa-bullseye',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            },
            format: 'YYYY/MM/DD',
        });
}

// Map Multiple Records means AddMore and Call This Function

function map_multiple_records_means_Addmore(blind)
{
    if(blind.length > 0)
    {
        console.log(blind.length)
        for(var i = 0; i < blind.length; i++)
        {
            // console.log(i);
            console.log(blind[i]);
            $('#provided-item-'+(i + 1)).find('[name="mem_verse_type[]"]').val(blind[i]['mem_verse_type']).change();
            $('#provided-item-'+(i + 1)).find('[name="mem_verse_library_no[]"]').val(blind[i]['mem_verse_library_no']);//.change();
            // console.log(blind[i]['mem_verse_no_of_words']);
            // console.log($('#provided-item-'+(i + 1)).find('[name="mem_verse_no_of_words[]"]').val());
            $('#provided-item-'+(i + 1)).find('[name="mem_verse_no_of_words[]"]').val(blind[i]['mem_verse_no_of_words']);//.change();

            console.log($('#provided-item-'+(i + 1)).find('[name="mem_verse_no_of_words[]"]').val());
            $('#provided-item-'+(i + 1)).find('[name="mem_verse_price[]"]').val(blind[i]['mem_verse_price']);//.change();
            $('#provided-item-'+(i + 1)).find('[name="mem_verse_person_leaving_comment[]"]').val(blind[i]['mem_verse_person_leaving_comment']);//.change();
            $('#provided-item-'+(i + 1)).find('[name="mem_verse_message[]"]').val(blind[i]['mem_verse_message']);//.change();

            if(i !== blind.length - 1)
                providedVerseAddMore();
        }
    }
}

var qt_data = <?php echo json_encode($quotation->quotation_items->toArray()) ?>;
map_multiple_records_means_Addmore(qt_data);

// Javascript Image Upload
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#flag_img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}
$("#flag_input").change(function() {
    readURL(this);
});

// Allow only Letters and Space Not Numbers
$(document).on("keyup", ".txt_only", function () { 
    var node = $(this);
    node.val(node.val().replace(/[^A-Za-z_\s]/,'') );
});