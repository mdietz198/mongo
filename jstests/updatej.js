// Test use positional operator to update all items of an array 
// SERVER-1243
t = db.updatej;
t.drop();

/*
orig1 = {"title":"first post", "comments":[{"by":"joe", "votes":2}, {"by":"jane", "votes":8}]}
orig2 = {"title":"second post", "comments":[{"by":"mark", "votes":3}, {"by":"joe", "votes":1}]}
t.save(orig1)
t.save(orig2)
t.update({"title":"first post"}, {$set:{"comments.$.votes":3}}, false, true)
orig1.comments[0].votes=3
orig1.comments[1].votes=8
assert.eq( orig1 , t.findOne() , "A1" );
t.drop()
*/

orig1 = {"_id":1, "title":"first post", "comments":[{"by":"joe", "votes":3}, {"by":"jane", "votes":3}]}
orig2 = {"_id":2, "title":"second post", "comments":[{"by":"mark", "votes":3}, {"by":"joe", "votes":1}]}
t.save(orig1)
t.save(orig2)
t.update({"comments.votes":3}, {$set:{"comments.$.votes":4}}, false, true)
orig1.comments[0].votes=4
//orig1.comments[1].votes=4     TODO enable this
orig2.comments[0].votes=4
result = t.find()
assert.eq(orig1, result[0], "A2");
assert.eq(orig2, result[1], "A2");
t.drop()

orig1 = {"_id":1, "title":"first post", "comments":[{"by":"joe", "votes":4}, {"by":"jane", "votes":3}]}
orig2 = {"_id":2, "title":"second post", "comments":[{"by":"joe", "votes":4}, {"by":"joe", "votes":1}]}
t.save(orig1)
t.save(orig2)
t.update({"comments.by":"joe"}, {$set:{"comments.$.votes":5}}, false, true)
orig1.comments[0].votes=5
orig2.comments[0].votes=5
// orig2.comments[1].votes=5   TODO enable this
result = t.find()
assert.eq(orig1, result[0], "A3");
assert.eq(orig2, result[1], "A3");
t.drop()
