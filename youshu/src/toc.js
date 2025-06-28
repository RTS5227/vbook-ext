function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    const data = [];
    let bookID = url.split(/[/ ]+/).pop();
    url = "https://youshu.me/reviews/"+bookID+"/1.html";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let last = doc.select("#pagelink .last").text()
        let total  = parseInt(last, 10);
        for (let i = 0;i < total; i++) {
            let page = i + 1
            data.push({
                name: "Page " + page,
                url: "https://youshu.me/reviews/"+bookID+"/"+page+".html",
                host: "https://youshu.me",
            })
        }
        return Response.success(data);
    }
    return null;
}
