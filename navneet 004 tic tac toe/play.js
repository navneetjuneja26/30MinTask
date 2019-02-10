
var url=new URL(window.location.href);
var id=url.searchParams.get('Id');

var scr=document.getElementById('scores');
var temp =0; 

console.log(id); 

function getName()
{
	$.ajax({ 
          url : "http://localhost:51543/api/People/"+id,
          type : 'GET',
          datatype : 'json',
	      success : function(res){
	      	temp=res;
	      	unm.innerHTML="welcome @"+res.username+" (as a 'X')";
	      	scr.innerHTML="score is = "+res.score;
	      
	      }
	   });
}

let score=0;
$(document).ready(function(){
	$("#board, #scores").hide();


	
	var human;
	var comp;

	var p1 = [1,'X',0]; 
	var p2 = [2,'O',0];

	var current;
	var firstTurn;

	var winners = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
	];

	var boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];

	var gameWon = false;

	var turnCount=0;


	
	$('#chooseP > .btn').click(function(){
		if($(this).attr('id') === "chooseP1"){
  		human = p1;
  		comp = p2;
  		current = human;
  		firstTurn = 'human';
  	} else {
  		human = p2;
  		comp = p1;
  		current = comp;
  		firstTurn = 'comp';
  		
  		var x = setTimeout(compTurn, 500);
  	}
  	$('#chooseP').hide();
  	$("#board, #scores").show();

  });

	
	$("td").hover(function() {
		var pos = $(this).attr("id");
    
    if (boardArr[pos] == "#") {
    	$(this).css("cursor", "crosshair");
    }
});

  
  
  $("td").click(function(){
  	var tile = $(this).attr('id');
  	if(boardArr[tile]==='#'){
  		
  		humanTurn(tile);
  		
  	}
  })
	

  
  function pickEmpty(){
  	var emptyArr = [];
  	for(i=0;i<boardArr.length;i++){
  		if(boardArr[i] === '#'){
  			emptyArr.push(i);
  		}
  	}
  	var x = Math.round(Math.random() * emptyArr.length);
  	var choice = emptyArr[x];
  	if (choice === undefined) {
  		choice = emptyArr[x - 1];
  	}
  	return choice;
  };
  
  function compTurn(winner){
  	let current = comp;
  	var tile = pickEmpty();
  	$('#'+tile).html(comp[1]);
  	boardArr[tile] = comp[1];
  	checkWin(current);
  	if(gameWon === 1 || gameWon ===2){
          alert("Computer wins!");
		  score-=5; 
		  put(score);
  		winReset(comp);

  	} 
  	else {
  		turnCount ++;
  		checkDraw();
  		if(turnCount===0 && human[0]===2){
  			compTurn();
  		}
  		
  	}

  	
  	
  };


  function humanTurn(tile,winner){
  	let current = human;
   	$('#'+tile).html(human[1]);
  	boardArr[tile] = human[1];
  	checkWin(current);
  	
  	if(gameWon === 1 || gameWon ===2){
          alert("Nice one, you win!");
		  score+=10; 
		  put(score);
  		var reset = setTimeout(winReset(human),1000);
  	} 
  	else {
  		turnCount ++;
  		checkDraw();
  		if(turnCount!== 0){
  		var compGo = setTimeout(compTurn,800);
  		}else if(turnCount===0 && human[0]===2){
  			compTurn();
  		}
  		
  	}
  	
  }



  function checkWin(curr){
  	var currentTiles = [];
  	
  	for(i = 0; i<boardArr.length; i++){
  		if(boardArr[i]===curr[1]){
  			currentTiles.push(i);
  		}
  	}

  	
  	for(x=0; x<winners.length; x++){
  		var count = 0;
  		for(j=0;j<winners[x].length;j++){
  			if(currentTiles.indexOf(winners[x][j])!= -1){
  				count ++;
  			}
  			
  			if(count == 3){
  				
  				gameWon = current[0];
  				
  			}	
  		}
  	}

  }

  
  function winReset(){
  	turnCount=0;
  	$('td').html('');
  	boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
  	if(human === p1){
  		current = human;
  	}else{
  		
  		let current = comp;
  	var tile = pickEmpty();
  	$('#'+tile).html(comp[1]);
  	boardArr[tile] = comp[1];
  	turnCount++;

  	}
  	gameWon = false;
  }

  
  function checkDraw(){
  	if(turnCount > 8){
  		alert("It's a Draw!");
  		$('td').html('');
  		boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
  		if(human === p1){
  		current = human;
  		}else{
  		current = comp;
  		}
  		turnCount = 0;
  	}
  }
});

function put(tt){
	temp.score=temp.score+tt; 
	document.getElementById("scores").value = score;
	$.ajax({ 
         url : "http://localhost:51543/api/People/"+id,
         type : 'PUT',
         datatype : 'json',
         data: temp,
         success : function(res){
         	         
                           }
				}); 
			}
