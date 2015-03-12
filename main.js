	$(document).ready(function(){
		//Create an empty to hold each person later
		var peopleArray = [];
		//get the json
		$.get( "names.json", function( data ) {
			//loop through the returned data
			$.each(data.people, function(i, person){
				//add person to array peopleArray
				peopleArray.push(person);
				//add li to dom with each individual name
				$(".result ul").append('<li><span id="'+person.id+'" class="person">'+person.name+'</span></li>');

			});

		});

		//Show person detail when name is clicked
		var showDetails = function(e){

			e.preventDefault();
			//get the clicked name id
			var id = $(this).attr('id');
			//serch for the specific entry in the array according to the id
			var result = $.grep(peopleArray, function(e){ return e.id == id; });
			//append an overlay to the body with the relevant info
			$("body").append('<div class="overlay"><ul><li>Name: '+result[0].name+'</lI><li>Title: '+result[0].title+'</lI><li>Company: '+result[0].company+'</lI><li>Email: '+result[0].email+'</lI><li>Phone: '+result[0].phone+'</lI></ul><span class="close" href="#">X</span></div>');
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
		var filterNames = function(name){
			//get all the spans inside the list
			var namesList = $('#namesList').children().children();
			//check if should highlight insted of hiding
			var doHighlight = $('#doHighlight').is(':checked');
			//Loop through the spans
			$.each(namesList, function(index, thename){
				//lowercase the text
				var itemText = $(thename).html().toLowerCase();
				//if want to hilight instead of hiding
				if(doHighlight){

					//be sure to show all hidden names in casa user change her mind half way
					$(thename).parent().show();

					if( itemText.match(name) &&  $('#search').val()){
						//if name match the one in the search and search is not empty highlight
						$(document).find(thename).parent().css({'background':'red'});

					}else{
						//otherwise remove highlight
						$(document).find(thename).parent().css({'background':''});

					}

				}else{
					
					//be sure to remove the bg color in casa user change his mind half way
					$(document).find(thename).parent().css({'background':''});

					if( ! itemText.match(name) ){
						//if name does not mach the name in search hide
					 	$(document).find(thename).parent().hide();

					}else{
						//otherwise show
						$(thename).parent().show();

					}

				}
			});	
		};

		//Clear serch when x is clicked
		var clearSearch = function(){

			$('#search').val("");
			//reset the list filter
			filterNames();

		};

		//run filter names at keyUp
		var checkList = function(){
			//get the value from the input
			var name = $('#search').val().toLowerCase();
			//run the filter function
			filterNames(name);
		};

		//Just adding all the events
		
		$(document).on('keyup', '#search', checkList);

		$(document).on('click', 'input[type="radio"]', checkList);

		$(document).on('click', '.person', showDetails);

		$(document).on('click', '.close', removeOverlay);
		
		$(document).on('click', '.clear', clearSearch);

	});
