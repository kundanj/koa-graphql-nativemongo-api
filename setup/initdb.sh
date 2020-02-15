sudo service mongod start
mongo <<EOF
use blogdb

db.blogs.insertOne({ post_id: 1, post_title: "First Post", post_text: "... Lorem ipsum..", post_date: ISODate('2019-10-09'),  author: "John S", comments : [{ comment_id: 1, parent: 0, comment_text: "...First comment on Lorem ipsum..", author:"Mark S."}, {comment_id: 2, parent: 0, comment_text: "...Second  comment on Lorem ipsum..", author:"Jill"}, {comment_id: 3,  parent: 2, comment_text: "...something to add to the comment by Jill..",author: "Bruce P."}, {comment_id: 4,  parent: 3, comment_text: "...something to add to the comment by Bruce on the comment by Jill..", author:"Brian"}, {comment_id: 5,  parent: 1, comment_text: "...comment on first comment on Lorem Ipsum..", author:"Ravi K"}]})

db.blogs.insertOne({ post_id: 2, post_title: "Just another Post", post_text: "... Lorem ipsum once again..", post_date: ISODate('2019-10-09'),  author: "Bill M", comments : [{ comment_id: 1, parent: 0, comment_text: "...First comment on Lorem ipsum once again..", author:"Brian S."}, {comment_id: 2, parent: 0, comment_text: "...Second  comment on Lorem ipsum once again..", author:"Jill"}]})
EOF
