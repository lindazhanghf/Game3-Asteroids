#pragma strict
import System.Collections.Generic;

var rb : Rigidbody;
var sparks : GameObject;
var clones : List.<GameObject>;

function Start() {
    rb = GetComponent.<Rigidbody>();
}

function Update() {
    for (var i = clones.Count - 1; i > -1; i--) {
        if (clones[i] == null)
            clones.RemoveAt(i);  // remove destroyed
    }

    for each (var clone in clones) {
        if (clone.GetComponent.<ParticleSystem>().isPaused || clone.GetComponent.<ParticleSystem>().isStopped) {
            Destroy(clone);
        }
    }
}

function OnCollisionEnter(collision : Collision) {
    for each (var contact in collision.contacts) {
        // var sparks_prefab =  Resources.Load("CubeSpace/CubeSpace_Effects_Free/VFX/Ef_SparksParticle_01");
        var new_sparks = Instantiate(sparks, contact.point, new Quaternion(0, 0, 0, 0));
        new_sparks.GetComponent.<ParticleSystem>().loop = false;
        clones.Add(new_sparks);
    }
    var obj = collision.gameObject;
    if (obj.tag == "SpaceObjects") {
        var rb_obj = collision.rigidbody;
        var mass_obj = rb_obj.mass;

        if (rb.mass > mass_obj + 1) { // Collided object become part of player
            rb.mass += mass_obj * 0.1;
            obj.tag = "Untagged";
            Destroy(obj);
            var scale = mass_obj * 0.2;
            transform.localScale += new Vector3(scale, scale, scale);
        }
    }
}