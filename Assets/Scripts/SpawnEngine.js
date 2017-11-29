#pragma strict
import System.Collections.Generic;

var player : GameObject;

var models : List.<String>;
var rocks : List.<String>;
var materials : List.<String>;
var spawned_objs : List.<GameObject>;

var max_height : float;
var player_height : float;

var spawn_range : float = 20.0;
var spawn_number : int = 20;
var spawn_counter : int = 0;
var last_spawned_height : int = 0;

function Awake() {
    models.Add("VoxelEffects_Big_01");
    models.Add("VoxelEffects_Circle_01");
    models.Add("VoxelEffects_GunFire_02");
    models.Add("VoxelEffects_Small_01");

    rocks.Add("a");
    rocks.Add("b");
    rocks.Add("c");
    rocks.Add("d");
    rocks.Add("e");
    rocks.Add("f");
    rocks.Add("g");
    rocks.Add("h");
    rocks.Add("i");
    rocks.Add("j");
    rocks.Add("k");
    rocks.Add("l");
    rocks.Add("m");
    rocks.Add("n");
    rocks.Add("o");
    rocks.Add("p");

    // material = "VoxelEffects01"; // NOT USING ANYMORE
    materials.Add("rocks_b");
    materials.Add("Lavapattern");
    materials.Add("Groundpattern02");
    materials.Add("Groundpattern01");
    materials.Add("Ground&weeds");
    materials.Add("Ground&rockspattern03");
    materials.Add("Ground&rockspattern02");
    materials.Add("Ground&rockspattern01");
    // materials.Add("Ground&mosspattern");
    materials.Add("Drygroundpattern");
}

function Start() {
    Debug.Log(player);
    max_height = player.transform.position.y + 1;
    player_height = player.transform.position.y;
    last_spawned_height = max_height;

    init_asteroid_field(max_height);
}

function init_asteroid_field (max_height : float) {
    // var spawn_number = Mathf.Floor(max_height / 10);
    var spawn_number = 50;
    var spawned = 0;

    var x : float;
    var y : float;
    var range_x : float;
    var size : float;
    var counter : int = 0;
    while (spawned < spawn_number) {
        y = Random.Range(200.0, max_height);

        // Size
        range_x = (max_height - y) / 2.2;
        if (range_x < 50)
            size = Random.Range(0, 1.0) + range_x / 20;
        else
            size = Random.Range(-1.0, 3.0) + range_x / 20;

        // x
        x = Random.Range(-range_x, range_x);
        counter = 0;
        while (is_overlapping(x, y, size) && counter < 10) {
            x = Random.Range(-range_x, range_x);
            counter += 1;
        }
        // Debug.Log("x=" + x + " y=" + y + " range_x=" + range_x + " size=" + size);
        randomly_spawn(x, y, size + 1);
        spawned += 1;
    }
}


// Destroy objects off screen
function Update() {
    // player_height = Mathf.Floor(player.transform.position.y);

    // Generate objs at runtime FAILED
    // if (player_height % spawn_range == 0 && player_height < last_spawned_height) {
    //     Debug.Log("SPAWNING player_height = " + player_height + " last_spawned_height = " + last_spawned_height + " spawn_range = " + spawn_range);
    //     spawn(spawn_number);
    //     if (spawn_number > 5)
    //         spawn_number -= 1;
    //     spawn_counter += 1;
    //     spawn_range += 5;
    //     last_spawned_height = player_height;
    // }

    for each (var obj in spawned_objs) {
        if (obj != null) {
            var renderer : Renderer = obj.GetComponent.<MeshRenderer>();
            if (obj.transform.position.y - renderer.bounds.size.y - 50 > player.transform.position.y) {
                Destroy(obj);
            }
        }
    }

    for (var i = spawned_objs.Count - 1; i > -1; i--) {
        if (spawned_objs[i] == null)
            spawned_objs.RemoveAt(i);  // remove destroyed
    }
}

    // Spawn this many objects
// function spawn(number : int) {
//     var x;
//     var y;
//     for (var i = 0; i < number; i++) {
//         x = player.transform.position.x + Random.Range(-25.0, 25.0); //(-spawn_range * spawn_counter / 10, spawn_range * spawn_counter / 10);
//         y = player_height - 37 - Random.Range(0.0, spawn_range);
//         randomly_spawn(x, y);
//     }
// }

function randomly_spawn(x, y, scale) {

    // Randomize shape
    var new_obj : GameObject;
    if (Random.Range(0, 2) == 0) {
        new_obj = spawn_object(models[Random.Range(0, models.Count)]);
    } else {
        new_obj = spawn_object("rock_" + rocks[Random.Range(0, rocks.Count)]);
    }

    // Randomize rotation
    new_obj.transform.rotation = Random.rotation;

    // Randomize size (which impact mass)
    // var scale = (max_height - player_height) * 0.05;
    // if (scale <= 3)
    //     scale += Random.Range(0.0, 2.0);
    // else if (scale > 3)
    //     scale += Random.Range(-3.0, 3.0);
    // else if (scale > 10)
    //     scale = 10;
    // if (scale > 10)
    //     scale = 10;
    new_obj.transform.localScale += new Vector3(scale, scale, scale);

    // Set location
    new_obj.transform.position = new Vector3(x, y, 0);

    // Finishing up
    set_rigidbody_collider(new_obj);
    set_material(new_obj);
}

function spawn_object(prefab) {
    var asteroid : GameObject = Instantiate(Resources.Load(prefab, GameObject));
    asteroid.tag = "SpaceObjects";

    spawned_objs.Add(asteroid);
    return asteroid;
}

function set_rigidbody_collider(obj : GameObject) {
    var rb : Rigidbody = obj.AddComponent(Rigidbody);
    var collider : SphereCollider = obj.AddComponent(SphereCollider);
    // rb.mass = collider.radius * 10;
    rb.mass = obj.transform.localScale.x * 0.5;
    rb.useGravity = false;
    rb.constraints = RigidbodyConstraints.FreezePositionZ;
}

function set_material(obj : GameObject) {
    var renderer : Renderer = obj.GetComponent.<MeshRenderer>();
    if (renderer == null) {
        Debug.Log("Create new mesh renderer");
        renderer = obj.AddComponent(MeshRenderer);
    }
    var new_matrials = new Material[1];
    new_matrials[0] = Resources.Load("Materials/" + materials[Random.Range(0, materials.Count)]);
    renderer.materials = new_matrials;
}

function is_overlapping(x, y, size) {
    var is_overlapping = false;
    for each (var obj in spawned_objs) {
        if (isColliding(obj, x, y, size)) {
            is_overlapping = true;
            break;
        }
    }
    return is_overlapping;
}

//## Helper Methods ##
/* The following collision detection method is based on:
        Chapter 18 COLLISION DETECTION AND KEYBOARD/MOUSE INPUT
    by inventwithpython.com at inventwithpython.com/chapter18.html
*/
function isColliding(obj : GameObject, x : float, y : float, size : float) {
    var collider : SphereCollider = obj.GetComponent.<SphereCollider>();
    var obj_size = collider.radius * obj.transform.localScale.x;

    if ((isPointInsideObj(x, y, obj, obj_size)) ||
        (isPointInsideObj(x, y + size, obj, obj_size)) ||
        (isPointInsideObj(x + size, y, obj, obj_size)) ||
        (isPointInsideObj(x + size, y + size, obj, obj_size))) {
        return true;
    }
    return false;
}

function isPointInsideObj(x : float, y : float, obj : GameObject, obj_size : float) {
    if ((x >= obj.transform.position.x) && (x <= obj.transform.position.x + obj_size) && (y >= obj.transform.position.y) && (y <= obj.transform.position.y + obj_size)) {
        return true;
    } else {
        return false;
    }
}
//## End of Helper Methods ##