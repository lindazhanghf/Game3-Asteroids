#pragma strict

var PrevLevel : int = -1;

function Awake() {
    DontDestroyOnLoad(transform.gameObject);
    PrevLevel = -1;
}

function saveLevel(level) {
	PrevLevel = level;
}

function Update(){

}
