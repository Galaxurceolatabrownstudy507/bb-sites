// @name reddit/thread
// @description 获取 Reddit 帖子的完整讨论树
// @domain www.reddit.com
// @args url
// @example bb-browser recipe run reddit/thread https://www.reddit.com/r/LocalLLaMA/comments/1rrisqn/...

async function(args) {
  const path = args.url.replace(/https?:\/\/[^/]*/, '').replace(/\?.*/, '').replace(/\/*$/, '/');
  const resp = await fetch(path + '.json?limit=500&depth=10&raw_json=1', {credentials: 'include'});
  if (!resp.ok) return {error: 'HTTP ' + resp.status};
  const d = await resp.json();
  const post = d[0].data.children[0].data;

  function flatten(children, depth) {
    let result = [];
    for (const child of children) {
      if (child.kind !== 't1') continue;
      const c = child.data;
      result.push({id: c.name, parent_id: c.parent_id, author: c.author, score: c.score, body: c.body, depth});
      if (c.replies?.data?.children)
        result = result.concat(flatten(c.replies.data.children, depth + 1));
    }
    return result;
  }

  const comments = flatten(d[1].data.children, 0);
  return {
    post: {id: post.name, title: post.title, author: post.author, subreddit: post.subreddit_name_prefixed,
      score: post.score, num_comments: post.num_comments, selftext: post.selftext, url: post.url, created_utc: post.created_utc},
    comments_total: comments.length,
    comments
  };
}
