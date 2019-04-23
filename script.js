$(document).ready(function() {

//add items
	$('#add-btn').on('click', function(e){

		e.preventDefault();

		const value = $("#add-input").val();

		const note = '<li>' +
			'<p>' + value + '</p>'+  
			'<p><i class="fa fa-pencil-square-o"></i><i class="fa fa-times"></i></p>'+
			'<input class="edit-note" type="text">'+
		'</li>';

		if($("#add-input").val() !== "") {

			$('#list').append(note);
			$('#list li:last').hide().show('slow').css('display', 'block');
			$("#add-input").val("");
		}		
	});

//edit and delete items

	$('ul').on('click', function(e) {

		if($(e.target).hasClass('fa-pencil-square-o')) {

			const parentParagraph = $(e.target).parent();
			parentParagraph.hide();

			const note = parentParagraph.siblings('p');
			const input = parentParagraph.siblings('.edit-note');
			input.show('slow');
			input.val(note.text());

			input.on('keyup', function(e) {
				if(e.which === 13) {
					if(input.val() !== "") {
						note.text(input.val());
						parentParagraph.show();
						input.hide('slow');
					} else {
						$(e.target).parent().hide('slow');	
						setTimeout(function() {
						  $(e.target).parent().remove();
						}, 2000);
					}
				} 
				if(e.which === 27) {
					input.hide('slow');
					parentParagraph.show();
					
				}
			});

		} else if($(e.target).hasClass('fa-times')) {
		
			$(e.target).parent().parent().hide('slow');	
			setTimeout(function() {
				  $(e.target).parent().parent().remove();
			}, 2000);
		} 

	});

// hide/show notes

	$('#hide').on('click', function() {

		const text = $('label').text();
		$('label').text(text == "Hide notes" ? "Show notes" : "Hide notes");
		$('ul').slideToggle();
		
	});

// search filter

	$('#search-note input').on('keyup', function(e) {

		const searchCharacter = $(e.target).val().toUpperCase();

		const notes = $('ul li');

		notes.each(function(index, element) {

			const parText = $(this).text();

			if(parText.toUpperCase().indexOf(searchCharacter) !== -1) {
				element.style.display = "block";
			} else {
				element.style.display = "none";
			}

		});

	});

}) 


