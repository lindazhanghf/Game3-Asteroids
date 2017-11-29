#pragma strict

var target : Transform;

function Start () {

}

function Update(){

    transform.position.z = target.position.z - 10;
    transform.position.y = target.position.y;
    transform.position.x = target.position.x;

}
