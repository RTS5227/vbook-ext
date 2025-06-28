function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select("#content .book-detail-img img").get(0).attr("src");
        let title = doc.select("#content .divbox div").get(1);
        return Response.success({
            name: title.select('span').get(0).text(),
            author: title.select('span').get(1).select('a').text(),
            cover: coverImg,
            description: doc.select("#content .tabcontent").select('.tabvalue').get(0).html(),
            detail: doc.select("#content .tabcontent").select('.tabvalue').get(1).html(),
            host: "https://youshu.me"
        });
    }
    return null;
}
