#pragma strict

var speed = 20.0;
var arenaLength = 8.7;

function Start () {

}

function Update () {
	this.transform.Translate(0,Input.GetAxis("Horizontal") * -1 * speed * Time.deltaTime, 0);
	if (this.transform.position.x > arenaLength) {
		this.transform.position.x = arenaLength;	
	}
	if (this.transform.position.x < arenaLength * -1) {
		this.transform.position.x = arenaLength * -1;	
	}

}