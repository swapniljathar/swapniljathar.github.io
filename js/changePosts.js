$(function(){
	//DOM is loaded

	// if page one is clicked show certain previews
	$(".page_1").click(function(e){


		// if page 1 is already clicked do nothing

		var isClicked = $(".page_1").attr("class");

		if (isClicked.indexOf("active") >= 0){
			// do nothing and log that to the console
			console.log("This page is already active");
		}else{
			// if page 1 was not active then make it active. But first remove all active classes
			$(".pagination li").removeClass("active");

			$(".page_1").attr("class","page_1 active");

			e.preventDefault();

			// then call the change Post Preview function and change the posts shown
			// this is the first post to be previewed
			changePostPreview(".post_1","posts/helloworld.html","Hello World!","An introduction to my blog.","Posted on July 12, 2015");
			//changePostPreview(".post_2","posts/helloworld.html","Testing","test","Posted on July 15, 2020");


		}


	});

	// if page two is clicked show different previews

	$(".page_2").click(function(e){


		var isClicked = $(".page_2").attr("class");

		if (isClicked.indexOf("active") >= 0){
			// do nothing and log that to the console
			console.log("This page is already active");
		}else{
			// if page 2 was not active then make it active

			// if page 1 was not active then make it active. But first remove all active classes
			$(".pagination li").removeClass("active");

			$(".page_2").attr("class","page_2 active");


			e.preventDefault();

			// then call the change Post Preview function and change the posts shown
			// this is the first post to be previewed
			//changePostPreview(".post_1","posts/helloworld.html","Testing","test","Posted on July 15, 2020");
			//changePostPreview(".post_2","posts/helloworld.html","Testing","test","Posted on July 15, 2020");
		}


	});

	function changePostPreview(specifiedClass,reference,title,intro,date){

	// first hide all the elements so that they can be faded in
	




	// change the reference of the anchor tag given the class
	$(specifiedClass + " a").attr("href",reference);


	$(specifiedClass + " a h2").hide();
	// set value of title
	$(specifiedClass + " a h2").text(title).fadeIn(500);


	$(specifiedClass + " a h3").hide();
	// set value of intro
	$(specifiedClass + " a h3").text(intro).fadeIn(500);


	$(specifiedClass + " p").hide();
	//set date
	$(specifiedClass + " p").text(date).fadeIn(500);

}


});


