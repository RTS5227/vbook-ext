function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let htm = doc.select("#content .c_row")
        let content = ""
        let i = 0;
        htm.forEach(e => {
            i++;
            let name = e.select("div").get(0).select('a p').text();
            console.log("name="+name)
            content += i + ". " + name + ":<br>";
            content += e.select(".c_description").text() + "<br><hr>";
        })
    console.log("c="+content)
        return Response.success(content);
    }
    return null;
}

