var PlayerStats = function()
{
    this.allStats = [];
};

PlayerStats.prototype = Object.create(PlayerStats.prototype);

PlayerStats.prototype.constructor = PlayerStats;

PlayerStats.prototype.GiveStat = function(name, value)
{
    this.allStats[name] = value;
}

PlayerStats.prototype.GetStat = function(name)
{
    return this.allStats[name];
}

PlayerStats.prototype.ChangeStat = function(name, value)
{
    this.GiveStat(name, value);
}

PlayerStats.prototype.ChangeStatLevelUp = function()
{
    this.allStats["xp"] -= (this.allStats["level"] * 100);
    this.allStats["speed"] ++;
    this.allStats["level"] ++;
    this.allStats["maxHp"] += 10;
    this.allStats["maxMana"] += 5;
    this.allStats["hp"] = this.allStats["maxHp"];
    this.allStats["mana"] = this.allStats["maxMana"];
    this.allStats["attack"] += 5;
    ui.increaseBars(this.allStats["hp"], this.allStats["mana"], this.allStats["level"] * 100);
}