#pragma strict

var ballSpeed: float = 20;
var acceleration: float = 200;
var minXSpeed = 1;
var minZSpeed = 3;

var explosionPrefab : Transform;


function Start () {
	this.rigidbody.AddForce(Random.Range(-900,900),1500,Random.Range(-900,900));
}

function Update () {
	// Keep it moving at a constant-ish speed
	if (this.rigidbody.velocity.magnitude < ballSpeed) {
		this.rigidbody.AddForce(this.rigidbody.velocity.normalized * 500);
	}
	
	// Make sure it's always moving left or right
	if (Mathf.Abs(this.rigidbody.velocity.x) < minXSpeed) {
		if (this.rigidbody.velocity.x < 0) {
			this.rigidbody.AddForce(acceleration * -1, 0, 0);
		} else {
			this.rigidbody.AddForce(acceleration, 0, 0);
		}
	}

	// Make sure it's always moving up or down
	if (Mathf.Abs(this.rigidbody.velocity.z) < minZSpeed) {
		if (this.rigidbody.velocity.z < 0) {
			this.rigidbody.AddForce(0, 0, acceleration * -1);
		} else {
			this.rigidbody.AddForce(0, 0, acceleration);
		}
	}
}

function OnCollisionEnter(collision: Collision) {
	var contact : ContactPoint = collision.contacts[0];
	if (collision.gameObject.name != "Floor") {
	    var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);
	    var pos : Vector3 = contact.point;
	    Instantiate(explosionPrefab, pos, rot);
    }
}
