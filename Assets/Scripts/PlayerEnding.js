#pragma strict

var left_volcano : GameObject; // Sparks of volcano
var right_volcano : GameObject; // Sparks of volcano

function Start () {

}

function Update () {
	if (left_volcano.transform.localScale.x < 30) {
        left_volcano.transform.localScale += new Vector3(0.1, 0.1, 0.1);
        right_volcano.transform.localScale += new Vector3(0.1, 0.1, 0.1);
	}
}
