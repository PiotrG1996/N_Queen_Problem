var N = 8;
var los = new Array();
var kkk = new Array();
var dsp = new Array();
var rr = new Array();
var old = new Array(8);
var current = new Array(8);
var click_los = new Array(8);
var found_solutions = new Array(92);
var f_s_count = 0;
var delay;
var count = 0;
var alt = 0;
var sol =0;
var ls = 0;

var sol = 0;
var mode_flag = 1;
var board_flag = 0;
var print_count = 0;
var click_count=0;

found_solutions[0]="";
found_solutions[1]="";
found_solutions[2]="";
found_solutions[3]="";
found_solutions[4]="";
found_solutions[5]="";

los[0]=0;
los[1]=0;
los[2]=0;
los[3]=0;
los[4]=0;
los[5]=0;
los[6]=0;
los[7]=0;

// Create image of queen
var bild = new Image();
bild.src="queen.png";

// Initialization
function init(x,y) {
  click_count = 0;
  f_s_count = 0;
  board_flag = 0;
  count = 0;
  print_count = 0;
  alt = 0;
  sol = 0;
  ls = 0;
  cc = 0;
  delay = 100;
  document.getElementById("p1").innerHTML = sol;

  for (var j=0; j<x; j++)
        rr[j] = new Array(y);

  for (var j=0; j<y; j++) {
        dsp[j]=0;
        old[j]=0;
        current[j]=0;
        los[j]=0;
  }
  for (j=0; j<N; j++)
         for (i=0; i<N; i++)
                   document.getElementsByTagName("TR")[i].getElementsByTagName("TD")[j].style.backgroundImage="none";

                        document.speed_form.choice_velo[0].checked = true;

for (i=0; i<92; i++)
        found_solutions[i]="";
        deleteSolutions();
}

// Check radioGroup
function get_radio(radioGroup) {
        var chosen = null;
        for (i = 0; i < radioGroup.length; i++) {
                if (radioGroup[i].checked)
                        chosen = radioGroup[i];
        }
        return chosen;
}

// Check velocity of simulation (100,60,10)
function question() {
        var r = get_radio(document.speed_form.choice_velo);
        if (r != null) {
                delay = r.value;
        }
}

// Check simulation = 1 , game mode = 0
function mode_question() {
        var r = get_radio(document.mode_form.choice_mode);
        if (r != null) {

                if (r.value == 1) {
                        mode_flag = 1;
                        init(100000,N);

                }
                if (r.value == 0){
                        mode_flag = 0;
                        init(100000,N);
                        solve(0);
                        queenPosition();
                }

        }
}

// Create board N x N
function modeEdit(choice) {
        var i = choice.selectedIndex;

        if (i==0)
                N = 8;
        if (i==1)
                N = 7;
        if (i==2)
                N = 6;
        if (i==3)
                N = 5;
        if (i==4)
                N = 4;

        board_flag = 1;
        deleteBoard();
        paintBoard(N);
        init(100000,N);
        document.mode_form.choice_mode[0].checked = true;
        mode_flag = 1;
}

 // Declare variables and create the header, footer
function paintBoard(n) {
 
  var oTable = document.createElement("TABLE");
      oTable.id="test";

  var oTBody0 = document.createElement("TBODY");

  var oRow, oCell;
  var i, j;

  // Insert the created elements into oTable.

  oTable.appendChild(oTBody0);

  // Insert rows and cells into bodies.
  for (i=0; i<n; i++) {
    var oBody = oTBody0;
        oRow = document.createElement("TR");
         oBody.appendChild(oRow);

    for (j=0; j<n; j++) {
      oCell = document.createElement("TD");
         if (((i+j) % 2) !=0)
                oCell.className="c2";
         else
                oCell.className="c1";
      oRow.appendChild(oCell);

    }

  }

  // Set the background color of the first body.
  oTable.className="board";

  // Insert the table into the document tree.
  document.getElementById("oTableContainer").appendChild(oTable);
}

// Change size of board  N x N and clear all
function deleteBoard () {
  var i = 0;
  var Node;

  if (document.getElementById("oTableContainer").childNodes[0].nodeName != "TABLE")
          Node = document.getElementById("oTableContainer").childNodes[1];
  else
        Node = document.getElementById("oTableContainer").childNodes[0];

  remove = document.getElementById("oTableContainer").removeChild(Node);


}

// Remove the list of solutions [xxxxxx]
function deleteSolutions () {
        var parent = document.getElementById("xxxxxx_left").parentNode;

        var kn_xxxxxx_left = document.getElementById("xxxxxx_left");
        var remove = document.getElementById("xxxxxx_left").parentNode.removeChild(kn_xxxxxx_left);
        var y = document.createElement("div");
        parent.appendChild(y).id="xxxxxx_left";

        var kn_xxxxxx_mid = document.getElementById("xxxxxx_mid");
        var remove = document.getElementById("xxxxxx_mid").parentNode.removeChild(kn_xxxxxx_mid);
        var y = document.createElement("div");
        parent.appendChild(y).id="xxxxxx_mid";

        var kn_xxxxxx_right = document.getElementById("xxxxxx_right");
        var remove = document.getElementById("xxxxxx_right").parentNode.removeChild(kn_xxxxxx_right);
        var y = document.createElement("div");
        parent.appendChild(y).id="xxxxxx_right";

}

// Check free position in simulation
function free_f(px,py) {
        var x;

        for (x=0; x<py; x++){
                if ((los[x] == px) || (Math.abs(los[x] - px) == Math.abs(x - py)))

                                return 0;
                }
    return 1;
}

// Check current  position and move queen from the last column
function solve(col) {
        var i;
        var j;
        var flag;

        if (col == N) {
                        count++;
        rr[alt][N]="L";
        }
        else {
                for (i=0; i<N; i++) {
                        kkk[col] = i;
                        dsp[col] = i+1;

                        flag = free_f(i,col);
                        if (flag == 1) {
                                los[col] = i;
                                kkk[col] = i;
                                dsp[col] = i+1;

                                for (j=0; j<N; j++) {
                                        rr[alt][j] = dsp[j];
                                }
                                alt++;
                               
                                solve(col+1);
                        }
                        for (j=0; j<N; j++) {
                                        rr[alt][j] = dsp[j];
                        }
                        alt++;
                                
                    kkk[col]=0;
                    dsp[col]=0;
                }
        }
}

// Wait for a while to remember found position
function sleep(milliSeconds) {
var startTime = new Date().getTime(); // get the current time
while (new Date().getTime() < startTime + milliSeconds); // hog cpu
}

// Next position of queen in simulation
function moveQueen () {
        for (var i=0; i<N; i++) {
                var cell_del = current[i] - old[i];
                if (cell_del != 0)  {
                var cell_col = i;
                        if (old[i] != 0) {
                                var cell_row = old[i] - 1 ;
                                document.getElementsByTagName("TR")[cell_row].getElementsByTagName("TD")[cell_col].style.backgroundImage="none";
                        }
                }
        }
}

// Set position coordinates in game
function click_free(rr,cc) {
var i;
var tmp;
rr = rr + 1;

// alert(rr + " " + cc);
for (i=0; i<N ; i++) {
        tmp = los[i];
        if ( tmp != 0) {
                if ( (tmp == rr) || (i == cc) || (Math.abs(tmp - rr) == Math.abs(i - cc)))
                        return 0;
        }
}
return 1;
}

// Set queen's position on the board (game mode)
function click_queenPosition(event) {
  var i;
  var f_row;
  var f_col;
  var p_flag = 0;
  if (mode_flag == 0)
        return;
  if(event.target){
        e1 = event.target.parentNode.rowIndex;
        e2 = event.target.cellIndex;
  } else {
        e1 = event.srcElement.parentElement.rowIndex;
        e2 = event.srcElement.cellIndex;

  }
  
  if (e1 == undefined)    
	return;
        if (los[e2] == (e1+1)) {

                                document.getElementsByTagName("TR")[e1].getElementsByTagName("TD")[e2].style.backgroundImage="none";
                                los[e2] = 0;
                                click_count--;
                                return;
                        }

        p_flag = click_free(e1,e2);

        if (p_flag == 1) {
                los[e2] = e1 + 1;
                click_count++;
                document.getElementsByTagName("TR")[e1].getElementsByTagName("TD")[e2].style.backgroundImage="url(queen.png)";
                if (click_count == N) {

                        alreadyFound();
                }
        }
        else
                alert("Pozycja niepoprawna");
}

// Write full coordinates of solution in 3 columns (simulation = 0, game mode = 1)
function printSolution() {
  var i;
  var s;

  if (mode_flag == 0) {
          s="[";
          for (i=0; i<N ; i++) {
                  s=s+rr[ls][i] + " ";
          }
          s=s+"]" + "<br/>";
        if (print_count < 30)
                document.getElementById("xxxxxx_left").innerHTML += s;
        if ((print_count >= 30) && (print_count < 60))
                document.getElementById("xxxxxx_mid").innerHTML += s;
        if (print_count >= 60)
                document.getElementById("xxxxxx_right").innerHTML += s;
        print_count++;
  }
  
  if (mode_flag == 1) {
          s="[";
          for (i=0; i<N ; i++) {
                  s=s+los[i] + " ";
          }
          s=s+"]" + "<br/>";
        if (print_count < 30)
                document.getElementById("xxxxxx_left").innerHTML += s;
        if ((print_count >= 30) && (print_count < 60))
                document.getElementById("xxxxxx_mid").innerHTML += s;
        if (print_count >= 60)
                document.getElementById("xxxxxx_right").innerHTML += s;
        print_count++;
  }
}

// Write and check coordinates (game mode)
function alreadyFound() {
  var tmp="";
  var f_flag=0;
  for (var i=0; i<N; i++) {
          tmp = tmp + los[i];

  }

  for (var j=0; j<92; j++) {

        if (found_solutions[j] == tmp)
                f_flag = 1;
  }
  if (f_flag == 1) {
        alert("Pozycja już odkryta");

  }
  else {
        found_solutions[f_s_count] = tmp;
        f_s_count++;
        document.getElementById("p1").innerHTML = f_s_count;
        if (N == 8)
                var all = 92;
        if (N == 7)
                var all = 40;
        if (N == 6)
                var all = 4;
        if (N == 5)
                var all = 10;
        if (N == 4)
                var all = 2;

        alert("Znaleziono pozycję "+" ("+f_s_count +" z "+ all +")");
        printSolution();
  }

}

// Move queen to new position (simulation) 
function queenPosition () {

  if (board_flag == 1)
        return;

  for (var i=0; i<N; i++) {
          current[i]=rr[ls][i];
  }

// Write the number of found postitions
  var x=rr[ls][cc];
  var z=rr[ls][N];
  if ((z == "L") && (cc == (N-1))) {
          sol++;
        printSolution();
        document.getElementById("p1").innerHTML = sol;
        sleep(2000);
  }

  if (x > 0) {
        var wiersz = x;
        var kolumna = cc;
        document.getElementsByTagName("TR")[wiersz-1].getElementsByTagName("TD")[kolumna].style.backgroundImage="url(queen.png)";
  }

  moveQueen();
  cc++;

  if (cc == N) {
        cc = 0;
        ls++;
        if (ls > 0) {
                for (var i=0; i<N; i++) {
                        old[i] = current[i];
                    }
        }
  }
  setTimeout("queenPosition()",delay);
}

// Simulation
function run() {
  init(100000,N);
  paintBoard(N);
  solve(0);
  queenPosition();
}

