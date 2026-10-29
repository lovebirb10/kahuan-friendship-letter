import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,dimensions,calculateResult} from '../data.js';
const pick=(groups)=>questions.map((q,i)=>q.options.findIndex(o=>o.group===groups[i]));
test('18 questions, six shuffled choices, stable unique IDs and two choices per group',()=>{
 assert.equal(questions.length,18);assert.equal(new Set(questions.flatMap(q=>q.options.map(o=>o.id))).size,108);
 dimensions.forEach((_,i)=>assert.equal(questions.filter(q=>q.dimension===i).length,3));
 questions.forEach(q=>{assert.equal(q.options.length,6);for(const group of ['huang','ka','mixed'])assert.equal(q.options.filter(o=>o.group===group).length,2);assert.ok(q.options.every(o=>!/[〔〕]/.test(o.text)));assert.notDeepEqual(q.options.map(o=>o.id.slice(-1)),['a','b','c','d','e','f']);});
});
test('each pure group gets its own 100% result',()=>{
 for(const group of ['huang','ka','mixed']){const r=calculateResult(pick(Array(18).fill(group)));assert.equal(r.type,group);assert.equal(r[group],100);}
});
test('all possible vote distributions have correct winner, exact percentages and distinct tie reason',()=>{
 for(let h=0;h<=18;h++)for(let k=0;k<=18-h;k++){
  const m=18-h-k,groups=[...Array(h).fill('huang'),...Array(k).fill('ka'),...Array(m).fill('mixed')];
  const r=calculateResult(pick(groups));assert.deepEqual(r.votes,{huang:h,ka:k,mixed:m});assert.equal(r.huang+r.ka+r.mixed,100);
  const votes={huang:h,ka:k,mixed:m},w=Object.keys(votes).filter(g=>votes[g]===Math.max(h,k,m));
  assert.equal(r.type,w.length===1?w[0]:'mixed');assert.equal(r.reason,w.length>1?'tie':w[0]==='mixed'?'mixed':'dominant');
 }
});
test('mixed selections are not conflated with alternating endpoints; changed answers recompute',()=>{
 const a=pick(questions.map((_,i)=>i%2?'ka':'huang'));let r=calculateResult(a);assert.equal(r.type,'mixed');assert.equal(r.mixed,0);assert.equal(r.reason,'tie');
 a[0]=questions[0].options.findIndex(o=>o.group==='ka');r=calculateResult(a);assert.equal(r.type,'ka');assert.deepEqual(r.votes,{huang:8,ka:10,mixed:0});
});
test('incomplete, old, sparse and invalid answers cannot generate a result',()=>{
 for(const a of [null,[],Array(18),Array(18).fill(null),Array(18).fill(6),Array(18).fill(-1),Array(18).fill('0'),Array(24).fill(0)])assert.throws(()=>calculateResult(a));
});
