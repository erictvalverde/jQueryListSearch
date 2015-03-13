	$(document).ready(function(){
		//Create an empty to hold each person later
		var peopleArray = [];
		//get the json
		$.get( "names.json", function( data ) {
			//loop through the returned data
			
			peopleArray = data.people;

			$.each(data.people, function(i, person){

				//add li to dom with each individual name
				$(".result ul").append('<li><span id="'+i+'" class="person">'+person.name+'</span></li>');

			});

		});

		//Show person detail when name is clicked
		var showDetails = function(e){

		
			//get the clicked name id
			var id = $(this).attr('id');
			//The specific entry in the array according to the id
			var result = peopleArray[id];

			//append an overlay to the body with the relevant info
			$("body").append('<div class="overlay"><ul><li>Name: '+result.name+'</lI><li>Title: '+result.title+'</lI><li>Company: '+result.company+'</lI><li>Email: '+result.email+'</lI><li>Phone: '+result.phone+'</lI></ul><span class="close" href="#">X</span></div>');
			//show the overlay
			$('.overlay').fadeIn();

		};

		var removeOverlay = function(){
			//fade the overlay out when x is clicked
			$('.overlay').fadeOut(function(){
				//then remove from DOM to avoid duplication
				this.remove();

			});

		}

		//Filter the list according to the serch input
		var filterNames = function(){
			
			//Get the search val
			var name = $('#search').val().toLowerCase();
			
			//get all the spans inside the list
			var namesList = $('#namesList').children().children();
			
			//check if should highlight insted of hiding
			var doHighlight = $('#doHighlight').is(':checked');
			
			//Loop through the spans
			$.each(namesList, function(index, thename){
				
				//lowercase the text
				var itemText = $(thename).html().toLowerCase();
				
				//if want to hilight instead of hiding
				if (!doHighlight && !itemText.match(name)) {
					$(document).find(thename).parent().hide();
				} else {
					$(thename).parent().show();
				}
				var bgColor = doHighlight && itemText.match(name) && $('#search').val() ? 'red' : 'transparent';
				$(document).find(thename).parent().css({'background':bgColor});

			});	
		};

		//Clear serch when x is clicked
		var clearSearch = function(){

			$('#search').val("");
			//reset the list filter
			filterNames();

		};

		//Just adding all the events
		
		$(document).on('keyup', '#search', filterNames);

		$(document).on('click', 'input[type="radio"]', filterNames);

		$(document).on('click', '.person', showDetails);

		$(document).on('click', '.close', removeOverlay);
		
		$(document).on('click', '.clear', clearSearch);

	});
