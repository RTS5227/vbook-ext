function execute() {
    return Response.success([
        {title: "总点击榜-优书网", input: "https://youshu.me/top/allvisit/", script: "gen.js"},
        {title: "总推荐榜-优书网", input: "https://youshu.me/top/allvote/", script: "gen.js"},
        {title: "月推荐榜-优书网", input: "https://youshu.me/top/monthvote/", script: "gen.js"},
        {title: "小说评分-优书网", input: "https://youshu.me/top/ratesum/", script: "gen.js"},

    ]);
}
