const CARTEW = 80; //largeur de la carte
const CARTEH = 110; //hauteur de la carte
const DX = 20; //écart en x entre deux cartes
const DY = 20; //écart en y entre deux cartes


function Carte(f) //prototype carte
{
	//initialisation des paramètres
	this.posX = DX; //la position en X
	this.posY = DY; //la position en Y
	this.face = f; //la face cachée de la carte
	this.visible = false; //si la carte est ou non visible
	this.trouve = false; // si la carte a trouve ou non son double
	
	this.dessinerCarte = function() //méthode qui dessine un rectangle dans le canvas
	{
		gc.clearRect(this.posX,this.posY,CARTEW,CARTEH);
		if (this.visible == true) //si la carte est visible
		{
			switch(this.face) //selon le numéro de face, on met une face visible différente
			{
				case 0:
					var face0 = new Image(); //on crée une nouvelle image
					face0.src = "img/face0.png"; //on met sa source
					face0.posX = this.posX; //sa position en x et y
					face0.posY = this.posY;
					face0.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);} //on met l'image dans le canvas
					break;
				case 1:
					var face1 = new Image();
					face1.src = "img/face1.png";
					face1.posX = this.posX;
					face1.posY = this.posY;
					face1.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 2:
					var face2 = new Image();
					face2.src = "img/face2.png";
					face2.posX = this.posX;
					face2.posY = this.posY;
					face2.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 3:
					var face3 = new Image();
					face3.src = "img/face3.png";
					face3.posX = this.posX;
					face3.posY = this.posY;
					face3.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 4:
					var face4 = new Image();
					face4.src = "img/face4.png";
					face4.posX = this.posX;
					face4.posY = this.posY;
					face4.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 5:
					var face5 = new Image();
					face5.src = "img/face5.png";
					face5.posX = this.posX;
					face5.posY = this.posY;
					face5.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 6:
					var face5 = new Image();
					face5.src = "img/face6.png";
					face5.posX = this.posX;
					face5.posY = this.posY;
					face5.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 7:
					var face5 = new Image();
					face5.src = "img/face7.png";
					face5.posX = this.posX;
					face5.posY = this.posY;
					face5.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 8:
					var face5 = new Image();
					face5.src = "img/face8.png";
					face5.posX = this.posX;
					face5.posY = this.posY;
					face5.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 9:
					var face5 = new Image();
					face5.src = "img/face9.png";
					face5.posX = this.posX;
					face5.posY = this.posY;
					face5.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 10:
					var face5 = new Image();
					face5.src = "img/face10.png";
					face5.posX = this.posX;
					face5.posY = this.posY;
					face5.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 11:
					var face5 = new Image();
					face5.src = "img/face11.png";
					face5.posX = this.posX;
					face5.posY = this.posY;
					face5.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				case 12:
					var face5 = new Image();
					face5.src = "img/face12.png";
					face5.posX = this.posX;
					face5.posY = this.posY;
					face5.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
					break;
				default:
					gc.fillStyle = "black";
					var face = new Image();
					face.src = "img/face.png";
					face.posX = this.posX;
					face.posY = this.posY;
					face.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
			}
		}
		else //si la carte n'est pas visible, on met la même chose sur la face
		{
			gc.fillStyle = "black";
			var face = new Image();
			face.src = "img/face.jpg";
			face.posX = this.posX;
			face.posY = this.posY;
			face.onload = function(){gc.drawImage(this, this.posX, this.posY,CARTEW,CARTEH);}
		}
		gc.fillRect(this.posX,this.posY,CARTEW,CARTEH); //on affiche le rectangle
	}

}

