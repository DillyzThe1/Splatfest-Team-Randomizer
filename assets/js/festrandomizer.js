// Splatoon 1 Fest Regions
var s1_us = true;
var s1_eu = true;
var s1_jp = true;

// Splatoon 2 Fest Regions
var s2_us = true;
var s2_eu = true;
var s2_jp = true;

// Splatoon 3 Fests
var s3 = true;

// 2 or 3 for chosen count, other for random.
var teamCount = 2;
var teams = [];

// Output Data
var festTeams = ["Spongebob", "Patrick"];

//
var altData = {"alts":[]};

function cycleTeamCount() {
    if (teamCount == 2 || teamCount == 3)
        teamCount = (teamCount + 1) % 4;
    else
        teamCount = 2;

    document.getElementById("cycleTeamCount").textContent = `team count: ${teamCount == 0 ? "Any" : teamCount}`;
}

async function fetchFile(file) {
    if (!file) {
        console.log("fetchFile() was not given a file!");
        return null;
    }
    const response = await fetch(`./${file}`);
    const gamejson = await response.json();
    //console.log(gamejson);
    return gamejson;
}

async function fetchTeams(game) {
    if (!game) {
        console.log("fetchTeams() was not given a game!");
        return null;
    }
    const response = await fetch(`./assets/teams/${game}.json`);
    const gamejson = await response.json();
    //console.log(gamejson);
    return gamejson;
}

async function gatherFests() {
    console.log("Attempting to gather fests!");

    const s1_data = await fetchTeams("splatoon");
    const s2_data = await fetchTeams("splatoon_2");
    const s3_data = await fetchTeams("splatoon_3");
    const newAltData = await fetchFile("assets/banner_alts.json);
    altData = newAltData;   

    while (festTeams.length > 0)
        festTeams.pop();

    if (s1_data && (s1_us || s1_eu || s1_jp)) {
        console.log(`Gathering fests for ${s1_data.name.en_us}! (${s1_data.name.jp_jp})`);
        for (var i = 0; i < s1_data.teams.length; i++) {
            var allowedForAnyRegion = (s1_us && s1_data.teams[i].na) || (s1_eu && s1_data.teams[i].eu) || (s1_jp && s1_data.teams[i].jp);
            if (!allowedForAnyRegion)
                continue;
            if (!festTeams.includes(s1_data.teams[i].alpha))
                festTeams.push(s1_data.teams[i].alpha);
            if (!festTeams.includes(s1_data.teams[i].bravo))
                festTeams.push(s1_data.teams[i].bravo);
        }
    }

    if (s2_data && (s2_us || s2_eu || s2_jp)) {
        console.log(`Gathering fests for ${s2_data.name.en_us}! (${s2_data.name.jp_jp})`);
        for (var i = 0; i < s2_data.teams.length; i++) {
            var allowedForAnyRegion = (s2_us && s2_data.teams[i].na) || (s2_eu && s2_data.teams[i].eu) || (s2_jp && s2_data.teams[i].jp);
            if (!allowedForAnyRegion)
                continue;
            if (!festTeams.includes(s2_data.teams[i].alpha))
                festTeams.push(s2_data.teams[i].alpha);
            if (!festTeams.includes(s2_data.teams[i].bravo))
                festTeams.push(s2_data.teams[i].bravo);
        }
    }

    if (s3_data && s3) {
        console.log(`Gathering fests for ${s3_data.name.en_us}! (${s3_data.name.jp_jp})`);
        for (var i = 0; i < s3_data.teams.length; i++) {
            if (!festTeams.includes(s3_data.teams[i].alpha))
                festTeams.push(s3_data.teams[i].alpha);
            if (!festTeams.includes(s3_data.teams[i].bravo))
                festTeams.push(s3_data.teams[i].bravo);
            if (!festTeams.includes(s3_data.teams[i].charlie))
                festTeams.push(s3_data.teams[i].charlie);
        }
    }

    console.log(festTeams);
}

function generateFest() {
    var _teamcount = teamCount;
    if (_teamcount == 0)
        _teamcount = Math.round(2 + Math.random());
    console.log(_teamcount);

    while (teams.length > 0)
        teams.pop();

    for (var i = 0; i < _teamcount; i++)
        teams.push(festTeams[Math.round(Math.random() * festTeams.length)]);
    console.log(teams);

    //document.getElementById("bannerAlpha").hidden = false;
    //document.getElementById("bannerBravo").hidden = false;
    document.getElementById("bannerCharlie").hidden = _teamcount < 3;

    document.getElementById("bannerAlpha").setAttribute("src", `./assets/banners/${teams[0]}.png`);
    document.getElementById("bannerBravo").setAttribute("src", `./assets/banners/${teams[1]}.png`);
    if (_teamcount == 3)
        document.getElementById("bannerCharlie").setAttribute("src", `./assets/banners/${teams[2]}.png`);

    document.getElementById("festname").textContent = _teamcount == 2 ? (`${teams[0]} vs ${teams[1]}`) : (`${teams[0]} vs ${teams[1]} vs ${teams[2]}`);
}
