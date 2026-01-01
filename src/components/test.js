
const dividePlayers = function(skill) {
    skill.sort((a, b) => a - b);
    let last = null;
    let res = 0;
    console.log(skill)
    for (let i = 0; i < skill.length/2; i++) {
        if(last !== null && skill[i] + skill[skill.length-1 - i] !== last) {
            return -1
        }
        res += skill[i] * skill[skill.length-1 - i];
        console.log(skill[i], skill[skill.length-1-i])
        last = skill[i] + skill[skill.length-1 - i];
    }

    return res
};

let skill = [13,1,14,3,2,15]
console.log(dividePlayers(skill));