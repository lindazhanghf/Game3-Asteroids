#pragma strict

var speed : float = 2;
var rb : Rigidbody;
var keys : boolean[];
var newX : float;

var left_volcano : GameObject; // Sparks of volcano
var right_volcano : GameObject; // Sparks of volcano

function Start() {
    rb = GetComponent.<Rigidbody>();
    keys = [false, false];
         // left   right
}

function Update() {
    speed = transform.localScale.x * 0.1;
    if (Input.GetKeyDown(KeyCode.LeftArrow)) {
        keys[0] = true;
        right_volcano.GetComponent.<ParticleSystem>().Play();
    }
    if (Input.GetKeyDown(KeyCode.RightArrow)) {
        keys[1] = true;
        left_volcano.GetComponent.<ParticleSystem>().Play();
    }

    if (Input.GetKeyUp(KeyCode.LeftArrow)) {
        keys[0] = false;
    }
    if (Input.GetKeyUp(KeyCode.RightArrow)) {
        keys[1] = false;
    }

    newX = 0;
    if (keys[0]) {
        newX = newX - speed;
    }
    if (keys[1]) {
        newX = newX + speed;
    }

    var movement = new Vector3 (newX, 0, 0);
    rb.MovePosition (rb.position + movement);

    // speed = transform.localScale.x * 10;
    // if (Input.acceleration.x > 0) {
    //     right_volcano.GetComponent.<ParticleSystem>().Play();
    // } else {
    //     left_volcano.GetComponent.<ParticleSystem>().Play();
    // }
    // var movement = new Vector3(Input.acceleration.x * speed * Time.deltaTime, 0, 0);
    // rb.MovePosition(rb.position + movement);

    // transform.Translate(Input.acceleration.x * 1.5, 0, 0);
    // Debug.Log("x=" + Input.acceleration.x + " y=" + Input.acceleration.y + " z=" + Input.acceleration.z);


    // rb.AddForce (movement); DOES NOT WORK

    // if (Input.GetAxis("Horizontal") != 0) {
    //     var translation = Input.GetAxis("Horizontal") * speed;
    //     translation *= Time.deltaTime;
    //     // Debug.Log(translation);
    //     transform.Translate(translation, 0, 0);
    //     Debug.Log("Moved " + translation.ToString());
    // }

}