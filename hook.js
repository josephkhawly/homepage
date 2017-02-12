function hook(str, args) {
    var url;
    if (str[0] == '~') {
        eval(str.slice(1, str.length))
        return true
    }

    //check for a subreddit
    if (str.slice(0,3) === "/r/" || str.slice(0,3) === "/u/") {
        url = "https://www.reddit.com" + str;
    }

    //check for a 4chan board
    if(str[0] === "/" && (str[str.length-1] === "/" || str.length < 5)) {
        //then it's not guaranteed to be a 4chan board, but let's try it anyway
        //everything but the slash at the beginning
        url = "https://boards.4chan.org/" + str.substr(1)
    }

    if (hookCommands.indexOf(str) > -1 || fileFunctions.indexOf(str) > -1) {
        //call it as a function
        //args are an array
        window[str](args.join(" "));
        return true
    }

    //and now check for bookmarks
    if (typeof bookmarks != "undefined" && bookmarks.length > 0)
        for (var i = 0; i < bookmarks.length; i++)
            if(bookmarks[i][0] === str) url = bookmarks[i][1]

    if (typeof uni != "undefined" && uni.length > 0)
        for (var i = 0; i < uni.length; i++)
            if(uni[i][0] === str) url = uni[i][1]

    if (typeof tech != "undefined" && tech.length > 0)
        for (var i = 0; i < tech.length; i++)
            if(tech[i][0] === str) url = tech[i][1]

    if (typeof social != "undefined" && social.length > 0)
        for (var i = 0; i < social.length; i++)
            if(social[i][0] === str) url = social[i][1]

    var modifier = url.substring(url.length-3)
    
    if (modifier === "-t") {
        url = url.slice(0, url.length-3); //remove " -t"
        window.open(url, '_blank');
        return true;
    } else {
        loadURL(url)
        return true;
    }

    //regex for dice matching, either straight or with a modifier (+x)
    if (/^[0-9]*[d][0-9]+$/.test(str)) {

        var tempArr = str.split('d')
        var numDice = Number(tempArr[0])
        if (numDice === 0) numDice = 1
        var numSides = Number(tempArr[1])
        var output = ""
        for (var i=0; i<numDice; i++) {
            var outcome = randRange(numSides)
            //highlight max rolls
            if (outcome === numSides) outcome = cssColor(outcome, "#b0b0b0")
            output += outcome + " "
        }
        print(output);
        return true
    } else if (/^[0-9]*[d][0-9]+[+][0-9]+$/.test(str)) {
        var regex = /[+][0-9]+/.exec(str)[0];
        modifier = Number(regex.slice(1)) //remove the + to get the modifier
        console.log(modifier)

        var tempArr = str.split('d')
        var numDice = Number(tempArr[0])
        if (numDice === 0) numDice = 1
        var numSides = Number(tempArr[1].split("+")[0]) //gross, but works
        var output = ""
        for (var i=0; i<numDice; i++) {
            var outcome = randRange(numSides)
            var temp = outcome + modifier
            //highlight max rolls
            if (outcome === numSides) temp = cssColor(temp, "#b0b0b0")
            output += temp + " "
        }
        print(output);
        return true
    }

}