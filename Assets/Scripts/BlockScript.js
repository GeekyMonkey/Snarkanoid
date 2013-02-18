#pragma strict

var explosionPrefab : Transform;
var points: int = 2;
var materials: Material[];

@HideInInspector
var initialScale: float;

@HideInInspector
var state: String;

function Start () {
}

function Awake() {
	state = "Growing";
	initialScale = transform.localScale.magnitude;
	transform.localScale /= 10;
    gameObject.collider.enabled = false;
}

function Update () {
	 if (state == "Growing") {
	 	if (transform.localScale.magnitude < initialScale) {
	 		transform.localScale *= 1.1;
	 	} else {
            gameObject.collider.enabled = true;
	 		state = "Normal";
	 	}
	 }
	 if (state == "Dying") {
	 	transform.localScale *= .9;
	 	if (transform.localScale.magnitude < (initialScale * .1)) {
			Destroy(this.transform.parent.gameObject);
	 	}
	 }
}

function OnCollisionEnter(collision: Collision) {
	if (collision.gameObject.name == "Ball" ) {
		var scene = GameObject.FindGameObjectWithTag("GameController");
		scene.BroadcastMessage("AddScore", points);
		
		/*
		var contact : ContactPoint = collision.contacts[0];
	    var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);
	    var pos : Vector3 = contact.point;
	    Instantiate(explosionPrefab, pos, rot);
	    */
		
		// Destroy the block
		gameObject.collider.enabled = false;
		state = "Dying";
	}
}

function SetPoints(p: int)
{
	this.points = p;
}

function SetColor(c: char) {
	var matIndex: int;
	switch (c) {
		case "R":
			matIndex = 0;
			break;
		case "G":
			matIndex = 1;
			break;
		case "B":
			matIndex = 2;
			break;
		case "Y":
			matIndex = 3;
			break;
	}
	Debug.Log(c + " = " + matIndex);
	this.renderer.material = this.materials[matIndex];
}
