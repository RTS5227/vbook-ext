function execute(url, page) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(!page) page='1';

    url = url +"/" + page + ".html";
    console.log(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let ele1 = doc.select("#jieqi_page_contents tr")
        ele1.forEach(e => {
            let tds = e.select("td")
            let name = tds.get(0).select("a").get(1).text();
            let author = tds.get(2).text()
            let desc = tds.get(1).text()
            let link = tds.get(0).select("a").get(1).attr("href");
            console.log("link="+link);
            data.push({
                name: name + " - " + author,
                link: link,
                description: desc,
                host: "https://youshu.me"
            })
        });
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next+"")
    }
    return null;
}
