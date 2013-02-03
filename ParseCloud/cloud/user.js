exports.MonsterFunc = function () {

	// A complex subclass of Parse.Object
var Monster = Parse.Object.extend("Monster", {
  // Instance methods
  hasSuperHumanStrength: function() {
    return this.get("strength") > 18;
  }
}, {
  // Class methods
  spawn: function(strength) {
    var monster = new Monster();
    monster.set("strength", strength);
    return monster;
  }
});

return Monster;
}