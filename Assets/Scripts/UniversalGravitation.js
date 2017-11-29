#pragma strict

var gravity_constant : int;

var cam;
var space_objs : GameObject[];
var visibal_objs : GameObject[];

var player_mass : float;
var player_rb : Rigidbody;
var rb : Rigidbody;

function Awake() {
    gravity_constant = 1.5;
    cam = GameObject.FindWithTag("MainCamera");
    space_objs = GameObject.FindGameObjectsWithTag("SpaceObjects");
}

function Start() {
    // var radius = GetComponent.<SphereCollider>().radius;
    // player_mass = volumn_of_sphere(radius);
    player_rb = GetComponent.<Rigidbody>();
    player_mass = player_rb.mass;
}

function Update() {
    // find_visible_objs();
    space_objs = GameObject.FindGameObjectsWithTag("SpaceObjects");
    for each (var obj in space_objs) {
        calculate_gravity(obj);
    }
    // calculate_gravity(space_objs[0]);
    // space_objs[1].GetComponent.<Renderer>().enabled = false;
}

function calculate_gravity(obj : GameObject) {
    // var size = obj.GetComponent.<Renderer>().bounds.size;
    // var obj_mass = size.x * size.y * size.z;
    rb = obj.GetComponent.<Rigidbody>();
    var distance = distance_to_player(obj);
    // if (obj.tag == "Untagged")
    //     distance = 0;
    // if (distance < 0.1) {
    //     obj.transform.SetParent(transform);
    //     rb.isKinematic = true;
    //     obj.tag = "Untagged";
    //     // obj.transform.position = transform.position;
    //     // rb.MovePosition(new Vector3 (0, -10, 0));
    // } else {
    //     var gravity = gravity_constant * rb.mass * player_mass / (distance * distance);
    //     var movement = (transform.position - obj.transform.position) * gravity * Time.deltaTime;
    //     // Debug.Log("Difference : " + (transform.position - obj.transform.position).ToString());
    //     // Debug.Log("obj_mass= " + rb.mass.ToString() + " Distance = " + distance.ToString() + " Gravity = " + gravity + " Movement = " + movement);

    //     rb.MovePosition(rb.position + movement);
    //     // player_rb.MovePosition(player_rb.position - movement);
    // }
    var gravity = gravity_constant * rb.mass * player_mass / (distance * distance);
    var movement = (transform.position - obj.transform.position) * gravity * Time.deltaTime;
    rb.MovePosition(rb.position + movement);
}

function find_visible_objs() {
    visibal_objs = [];
    // var gos : GameObject[];
    // gos = GameObject.FindGameObjectsWithTag("SpaceObjects");
    // for each (var obj : GameObject in objs) {
    //     if (obj.isVisible == true) {
    //         visibal_objs.push(obj);
    //     }
    // }
}

// EXAMPLE FOUND ONLINE
function FindClosestObejct() {
    var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("SpaceObjects");
    var closest = null;
    var distance = Mathf.Infinity;
    var position = transform.position;
    for each (var go in gos) {
        var diff = go.transform.position - position;
        var curDistance = diff.sqrMagnitude;
        if (curDistance < distance) {
            closest = go;
            distance = curDistance;
        }
    }
    return closest;
}

// Distace to player regardless of z axis
function distance_to_player(obj : GameObject) {
    var distance = Mathf.Pow((transform.position.x - obj.transform.position.x), 2)
                    + Mathf.Pow((transform.position.y - obj.transform.position.y), 2);
    return Mathf.Sqrt(distance);
}

function volumn_of_sphere(radius) {
    return 4 / 3 * Mathf.PI * Mathf.Pow(radius, 3);
}