#pragma strict

var score: int;
var level: int = 1;
var TextState: String = "None";
var TextGrowSpeed: int = 2;
var TextMinSize: int = 10;

var TextStyle: GUIStyle;

@HideInInspector
var TextSize: float;

var blockType : Transform;


@HideInInspector
var blockCount: int;


@HideInInspector
var levels = new Level[1];


function Start () {
	TextSize = 50;
	score = 0;
	blockCount = 0;
	LoadLevels();
	level--;
	NextLevel();
}

function Update () {
	if (TextState == "Growing") {
		this.guiText.fontSize = this.guiText.fontSize + TextGrowSpeed;
		if (this.guiText.fontSize >= TextSize) {
			TextState = "Normal";
		}
	} else if (TextState == "Shrinking") {
		this.guiText.fontSize = this.guiText.fontSize - TextGrowSpeed;
		if (this.guiText.fontSize <= TextMinSize) {
			TextState = "None";
			this.guiText.text = "";
		}
	}
}

function OnGUI ()
{
	var scoreText: String = "Score: " + this.score;
	GUI.Label(new Rect(10,10,100,20), scoreText, TextStyle);

	var levelText: String = "Level: " + this.level;
	GUI.Label(new Rect(10,40,100,20), levelText, TextStyle);
}

function AddScore(value: int) {
	score += value;
	blockCount --;
	if (blockCount == 0) {
		NextLevel();
	}
}

function LoadLevels() {
	this.levels = [
	new Level("Easy Peasy", [
			"  R  ",
			"RRBRR",
			"  R  "
		]),
	new Level("Getting Harder", [
			" YRRY ",
			"YRBBRY",
			" YBBY ",
			"  Y  "
		])
	];
}

function NextLevel()
{
	level++;
	var blockSpacingX: float = 2.3;
	var blockSpacingZ: float = 1.4;
	var blockY: float = 0.5;
	
	var levelToLoad = level-1;
	while(levelToLoad >= levels.Length) {
		levelToLoad -= levels.Length;
	}
	var levelData: Level = levels[levelToLoad];
	var rows: int = levelData.Rows.length;
	for (var row: int = 0 ; row < rows ; row++) {
		var rowText = levelData.Rows[row];
		var cols: float = rowText.length;
		for (var col = 0 ; col < cols ; col++) {
			var blockColor = rowText[col];
			if (blockColor != " " && blockColor != "_") {
				var x: float = (cols * blockSpacingX / -2) + (blockSpacingX * (col + .5));
				var z: float = -6.7 - blockSpacingZ * row;
				var points = (rows - row) * 5;
				var pos: Vector3 = new Vector3(x, blockY, z);
			    var rot: Quaternion = new Quaternion();
				var block = Instantiate(blockType, pos, rot);
				block.transform.GetChild(0).gameObject.BroadcastMessage("SetPoints", points);
				block.transform.GetChild(0).gameObject.BroadcastMessage("SetColor", blockColor);
				blockCount++;
			}
		}
	}
	
	ShowText(levelData.Name);
}

function ShowText(text: String)
{
	this.guiText.text = text;
	this.guiText.fontSize = TextMinSize;
	this.TextState = "Growing";
	Invoke("HideLevelTitle", 2);
}

function HideLevelTitle()
{
	TextState = "Shrinking";
}

