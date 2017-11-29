#pragma strict

var player : Transform;
var x_distance : float = 0;
var y_distance : float = 0;
var z_distance : float = 0;

var init_distance : float = 0;
var target_distance : float = 0;
var zoom_speed : float;

function Start () {
    // x_distance = transform.position.x;
    y_distance = 8;
    z_distance = transform.position.z;

    // init_distance = z_distance;
    // zoom_speed = 1;
}

function Update () {
	// target_distance = init_distance - player.localScale.x * 15;

	// if (z_distance > target_distance) {
	// 	z_distance -= zoom_speed * Time.deltaTime;
	// }

    transform.position.z = player.position.z + z_distance;
    transform.position.y = player.position.y + y_distance;
    transform.position.x = player.position.x + x_distance;

}
