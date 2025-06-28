function execute(key, page) {
    if (!page) page = '1';
    let formBody = "searchkey="+encodeURIComponent(key)+"&searchtype=all";

    let response = fetch('https://youshu.me/modules/article/search.php', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: 'manual',
      body: formBody,
    });

    if (response.status === 302) {
        let location = response.headers.get("Location");
        if (location.slice(0, 1) != "/") {
            location = location + "/"
        }
        return Response.success([{
            name: key,
            link: "https://youshu.me" + location,
            description: "Redirect",
            host: "https://youshu.me"
        }]);
    }
    if (response.ok) {
        let doc = response.html();
        let books = [];

        let coverImg = doc.select("#content .book-detail-img img").get(0).attr("src");
        if (coverImg != "") {
            let title = doc.select("#content .divbox div").get(1);
            let link = doc.select('#content .container a').attr("href");
            const match = link.match(/\/reviews\/(\d+)\//);
            const bookID = match ? match[1] : null;
            return Response.success([{
                name: title.select('span').get(0).text(),
                link: "/book/"+bookID,
                cover: coverImg,
                description: doc.select("#content .tabcontent").select('.tabvalue').get(0).text(),
                host: "https://youshu.me"
            }]);
        }
        doc.select("#content .c_row").forEach(e =>
        {
            books.push({
                name: e.select(".c_subject").text(),
                link: e.select(".c_subject a").attr('href'),
                cover: e.select(".fl img").attr("src"),
                description: e.select(".c_description").text(),
                host: "https://youshu.me"
            })

        });
        return Response.success(books);
    }
}
