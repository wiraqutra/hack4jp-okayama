$(function(){
	// color set
	var defaultc = '#999999';
	var focusc = '#333333';
	
	// form default color and focus or blur
	$('textarea,input[type="text"]').css('color',defaultc).focus(function(){
		if($(this).val() == this.defaultValue){
			$(this).val('').css('color', focusc);
		}
	})
	.blur(function(){
		if($(this).val() == this.defaultValue | $(this).val() == ''){
			$(this).val(this.defaultValue).css('color',defaultc);
		};
	});
	
	// about
	$('#a_about').click(function(){
		$('#about').css('display', 'block');
		return false;
	})
	$('#about').click(function(){
		$('#about').css('display', 'none');
		return false;
	})
	
	// insert
	$('#a_insert').click(function(){
		$('#insert').css('display', 'block');
		return false;
	})
});

// corner
$('.corner').corner();
