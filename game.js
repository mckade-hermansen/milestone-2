// starter code form http://thecodeplayer.com/walkthrough/html5-game-tutorial-make-a-snake-game-using-html5-canvas-jquery

$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	var cw = 10;
	var d;
	var food;
	var score;

	var snake_array;

	function init()
	{
		d = "right";
		create_snake();
		create_food();
		score = 0;

		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();

	function create_snake()
	{
		var length = 5;
		snake_array = [];
		for(var i = length-1; i>=0; i--)
		{
			snake_array.push({x: i, y:0});
		}
	}

	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw),
			y: Math.round(Math.random()*(h-cw)/cw),
		};
	}

	function paint()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;

		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			game_over();
			return;
		}

		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			create_food();
		}
		else
		{
			var tail = snake_array.pop();
			tail.x = nx; tail.y = ny;
		}


		snake_array.unshift(tail);

		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			paint_cell(c.x, c.y);
		}

		paint_cell(food.x, food.y);
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, h-5);
	}

	function paint_cell(x, y)
	{
		ctx.fillStyle = "blue";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}

	function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y){
			return true;
      }
		}
		return false;
	}

  function game_over()
  {
    var saved_score = score;
	  var saved_score_text =  "Score" + saved_score;
	  clearInterval(game_loop);

    game_loop = setTimeout(function(){

			ctx.fillStyle = "blue";
			ctx.fillRect(w/3 + 20, h/2 + 40, 100, 40);
			console.log(w/3 + 20);
			ctx.fillStyle = "black";
			ctx.font = "30px Georgia";
			ctx.fillText("Game Over", w/3, h/2);
			ctx.fillText(saved_score_text, w/3 + 20, h/2 + 25);
			ctx.font = "20px Georgia";
			ctx.fillText("Play Again", w/3 + 25, h/2 + 65);
			}, 0);

		function getClickedPosition(e){
			console.log("click");
			var xpos = e.clientX;
			console.log(xpos);
			var ypos = e.clientY;
			if ((xpos >= w/3 + 470) && (xpos <= w/3 + 570) && (ypos >= h/2 + 100) && (ypos <= h/2 + 140)){
				init();
				console.log("init");
			}
		}
		canvas.addEventListener("click", getClickedPosition, false);

		if (saved_score > parseInt($("#highscore").html())){

				$.ajax({
    			url: '/users/updateHighScore',
    			type: 'POST',
    			contentType: 'application/json',
    			data: JSON.stringify({score: saved_score, name: $("#username").html()})
				})

				console.log("success");
				$("#highscore").html(saved_score);
		}
	}

	$(document).keydown(function(e){
		var key = e.which;
    e.preventDefault();
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
	})







})
