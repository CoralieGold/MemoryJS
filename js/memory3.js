//constantes
const NBLIG = 3; //nombre de lignes afficher
const NBCOL = 8; //nombre de colonnes afficher
const NBMELANGE = 20; //nombre de fois où les cartes seront interverties

//variables globales
var monCanvas;
var gc;
var plateau;
var premiereCarte;
var secondeCarte;
var nbPairesTrouvees;
var compte;
var seconde; //initialise les secondes
var minute;//initialise les minutes

function init()  //fonction appelée par le body
{
	monCanvas = document.getElementById("mon_canvas"); //on crée le canvas
	gc = monCanvas.getContext("2d");
	
	plateau = []; //on met un tableau dans la variable plateau
	nbPairesTrouvees = 0; //on dit que le nombre de paires trouvées est égal à 0 au départ
	premiereCarte = undefined; //les cartes ne sont pas définies au départ
	secondeCarte = undefined;
	
	soundManager.url = 'swf/';
	soundManager.debugMode = true;

	seconde=0; //initialise les secondes
	minute=0;
	
	creerPlateau(); //on crée le plateau de jeu
	melangerPlateau(); //puis on mélange les cartes
	
	soundManager.play("fond","musiques/nightmare_before_christmas2.mp3"); //on met une musique de fond
	
	monCanvas.addEventListener('click', choisirCarte, true); //on lance le choix des cartes si l'utilisateur a cliqué sur une carte

}

function choisirCarte(event)
{
	if(seconde == 0 && minute ==0)
	{
		chrono(); //la fonction est relancée toutes les secondes
	}
	var x = event.clientX; //position en x et y de la souris
	var y = event.clientY;
	
	x -= monCanvas.offsetLeft; //on enlève le positionnement du canevas dedans
	y -= monCanvas.offsetTop;
	
	var carte = undefined;
	
	
	for (var i = 0; i < NBLIG*NBCOL; i ++)
	{
		carte = plateau[i]; //pour chaque case du tableau on dit que la carte courante est égale à cette case
		if( ( (carte.posX <= x) && (carte.posX + CARTEW >= x) ) //si l'utilisateur a bien cliqué sur une carte
			&&
			( (carte.posY <= y) && (carte.posY + CARTEH >= y) )
		)
		{
			if(premiereCarte == undefined) // et si la première carte n'est pas encore choisie
			{
				premiereCarte = carte;
				premiereCarte.visible = true; //alors on la rend visible
				afficherPlateau(); //et on affiche toutes les cartes avec cette modification
			}
			else if(secondeCarte == undefined) //sinon, on regarde si la seconde carte n'est pas encore choisie
			{
			
				if (carte != premiereCarte) //si la première et la seconde cartes sont différentes
				{
					secondeCarte = carte;
					secondeCarte.visible = true;
					afficherPlateau(); // on affiche cette carte
					
					if(secondeCarte.face != premiereCarte.face) // si les images visibles des cartes ne sont pas pareilles
					{
						soundManager.play("erreur","musiques/erreur.mp3"); //on met un son d'erreur
						setTimeout(reinitCartes, 1000); //et on réinitialise les cartes au bout de 750 ms
					}
					else
					{
						soundManager.play("bon","musiques/bon.mp3"); //sinon on met un son de réussite
						nbPairesTrouvees += 1; //on augmente le nombre de paires trouvées
						secondeCarte.trouve = true;
						premiereCarte.trouve = true; //on dit que les deux cartes ont été trouvées
						premiereCarte = undefined; //puis on redéfinit les deux cartes comme undefined pour que l'utilisateur puisse continuer
						secondeCarte = undefined;
					}
					
				}
				
				
			}
			if(nbPairesTrouvees == 12) //si on a trouvé toutes les paires
			{
				window.clearTimeout(compte); //on arrête le compteur de temps
				soundManager.play("gagne","musiques/gagne.mp3"); //on met une musique de réussite
				document.getElementById("gagne").innerHTML = '<span class="deco">Vous avez réussi</span><br /> en ' + minute + ' minutes et ' 
				+ seconde + ' secondes.'; //on affiche le temps qu'à mis le joueur pour gagner
				document.getElementById("jouer").innerHTML = '<input type="submit" value="Rejouer"/>'; //on propose un bouton pour rejouer
			}
			
			
		}
		
	}

	
}

function creerPlateau() //on crée le plateau en mettant pour une face différentes toutes les deux cartes
{
	for (var i = 0; i <=1; i ++)
	{
		plateau[i] = new Carte(0);
	}
	for (i = 2; i <= 3; i ++)
	{
		plateau[i] = new Carte(1);
	}
	for (i = 4; i <= 5; i ++)
	{
		plateau[i] = new Carte(2);
	}
	for (i = 6; i <= 7; i ++)
	{
		plateau[i] = new Carte(3);
	}
	for (i = 8; i <= 9; i ++)
	{
		plateau[i] = new Carte(4);
	}
	for (i = 10; i <= 11; i ++)
	{
		plateau[i] = new Carte(5);
	}
	for (i = 12; i <= 13; i ++)
	{
		plateau[i] = new Carte(6);
	}
	for (i = 14; i <= 15; i ++)
	{
		plateau[i] = new Carte(7);
	}
	for (i = 16; i <= 17; i ++)
	{
		plateau[i] = new Carte(8);
	}
	for (i = 18; i <= 19; i ++)
	{
		plateau[i] = new Carte(9);
	}
	for (i = 20; i <= 21; i ++)
	{
		plateau[i] = new Carte(10);
	}
	for (i = 22; i <= 23; i ++)
	{
		plateau[i] = new Carte(11);
	}
	melangerPlateau(); //ensuite on mélange le plateau
	calculerCoordonnees(); //on calcule les coordonnées de chaque carte
	afficherPlateau(); //et on affiche, finalement, le plateau
	
}

function melangerPlateau() //on mélange le plateau de jeu
{
	for(var i = 0; i < NBMELANGE; i ++) //on mélange autant de fois que le nombre NBMELANGE
	{
		var i1 = Math.floor(Math.random() * (NBLIG*NBCOL)); //on choisit une première carte
		var i2 = Math.floor(Math.random() * (NBLIG*NBCOL)); //et une deuxième carte au hasard
				
		var reserve = plateau[i1]; //on met de côté la première carte
		plateau[i1] = plateau[i2]; //on fait l'échange
		plateau[i2] = reserve;

	}
}

function calculerCoordonnees() //on calcule les coordonnées de chaque carte
{
	for (var i = 0; i <= 7; i ++) //les premières cartes ont juste l'axe x de modifié
	{
		plateau[i].posX += i*(CARTEW + DX);
	}
	
	for (i = 8; i <= 15; i ++) //même axe y pour toutes, puis axe x différent pour chacune des cartes
	{
		plateau[i].posY = CARTEH + 2*DY;
	}
	plateau[8].posX += CARTEW + DX;
	plateau[9].posX += 2*(CARTEW + DX);
	plateau[10].posX += 3*(CARTEW + DX);
	plateau[12].posX += 4*(CARTEW + DX);
	plateau[13].posX += 5*(CARTEW + DX);
	plateau[14].posX += 6*(CARTEW + DX);
	plateau[15].posX += 7*(CARTEW + DX);
	
	for (i = 16; i <= 23; i ++) //idem
	{
		plateau[i].posY = 2*CARTEH + 3*DY;
	}
	plateau[16].posX += CARTEW + DX;
	plateau[17].posX += 2*(CARTEW + DX);
	plateau[18].posX += 3*(CARTEW + DX);
	plateau[19].posX += 4*(CARTEW + DX);
	plateau[20].posX += 5*(CARTEW + DX);
	plateau[21].posX += 6*(CARTEW + DX);
	plateau[22].posX += 7*(CARTEW + DX);
	
	
}

function afficherPlateau()//on affiche chaque carte du plateau en les dessinant
{
		for (var i = 0; i < NBCOL*NBLIG; i ++)
	{
		plateau[i].dessinerCarte();
	}
}

function reinitCartes() //on réinitialise les cartes en les rendant non définies et en réaffichant le plateau
{
	premiereCarte.visible = false;
	secondeCarte.visible = false;
	premiereCarte = undefined;
	secondeCarte = undefined;
	afficherPlateau();
}

function chrono()//chronomètre de jeu
{ 
	seconde ++; //on augmente les secondes de 1, car la fontion est appelée toutes les secondes
	if (seconde>59) //si on dépasse 59 secondes, on remet les secondes à 0 et on ajoute 1 aux minutes
	{
		seconde=0;
		minute++
	}
	document.forsec.seca.value=" "+seconde //on affiche les secondes
	document.forsec.secb.value=" "+minute //on affiche les minutes
	compte = setTimeout('chrono()',1000);//on rappelle la fonction chrono toutes les secondes
}
