import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,dimensions,calculateResult} from '../data.js';
test('24 unique questions, four per dimension and four balanced choices per question',()=>{
 assert.equal(questions.length,24);assert.equal(new Set(questions.map(q=>q.title)).size,24);
 dimensions.forEach((_,i)=>assert.equal(questions.filter(q=>q.dimension===i).length,4));
 questions.forEach(q=>{assert.deepEqual(q.options.map(o=>o.score).sort((a,b)=>a-b),[-2,-1,1,2]);assert.match(q.sourceId,/^\d{8}$/);});
});
test('all maximum/minimum choices produce the correct extremes',()=>{
 for(const [score,type] of [[2,'ka'],[-2,'huang']]){
  const answers=questions.map(q=>q.options.findIndex(o=>o.score===score));
  const r=calculateResult(answers);assert.equal(r.type,type);assert.equal(r.ka,score===2?100:0);assert.ok(r.dimensions.every(n=>n===(score===2?100:0)));
 }
});
test('opposite choices balance to mixed; changing answers replaces the old contribution',()=>{
 const a=questions.map((q,i)=>q.options.findIndex(o=>o.score===(i%2?-2:2)));
 assert.equal(calculateResult(a).type,'mixed');assert.equal(calculateResult(a).ka,50);
 const before=calculateResult(a).ka;a[0]=questions[0].options.findIndex(o=>o.score===-2);assert.ok(calculateResult(a).ka<before);
});
test('incomplete, sparse, malformed, and out-of-range answers cannot yield a result',()=>{
 for(const a of [[],Array(24).fill(null),Array(24),Array(24).fill(4),Array(24).fill('0'),null])assert.throws(()=>calculateResult(a));
});
