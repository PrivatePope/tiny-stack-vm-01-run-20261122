import f,{readFileSync as B,writeFileSync as C}from'node:fs'
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env
let o
function R(p,q){
let s=[],r=[],m=[],pc=0,ip=0,n=0,a,b,u,w,i,P=x=>s.push(x),Q=()=>s.pop()
o=[]
for(;;){
if(n++>=1e6)return 10
if(pc>>>0>=p.length)return 9
let k=p[pc++],L=k<2?k:k==2?4:k>47&&k<52?2:0,v=0
if(pc+L>p.length)return 9
for(i=0;i<L;)v|=p[pc++]<<8*i++
if(k<8){
if(!k)return 0
if(k<3)P(k==1?v<<24>>24:v)
else{let l=s.length;if(l<"11223"[k-3])return 2;k==3?Q():P(k%2?s.splice(l-(k-1)/2,1)[0]:s[l-(k-2)/2])}
}else if(k==23||k==27){
if(!s.length)return 2
P(k-23?~Q():-Q()|0)
}else if(k>47&&k<53){
if(k>50){if(k==51){r.push(pc);pc=v}else{if(!r.length)return 8;pc=r.pop()}}
else{v=v<<16>>16;if(k==48)pc+=v;else{if(!s.length)return 2;if(!Q()==(k<50))pc+=v}}
}else if(k==64||k==65){
if(s.length<k-63)return 2
a=Q()
if(a>>>0>255)return 6
k==64?P(m[a]|0):m[a]=Q()
}else if(k>79&&k<84){
if(k==82)P(q[ip++]??-1)
else{if(!s.length)return 2
a=Q()
if(k==80){if(o.length+(a+'').length>65536)return 11;o.push(...Buffer.from(a+''))}
else if(k==81){if(o.length>65535)return 11;o.push(a&255)}
else return a&255}}
else if(k>15&&k<35&&k-31){
if(s.length<2)return 2
b=Q(),a=Q(),u=a>>>0,w=b>>>0
if(!b&&k>18&&k<23)return 4
P([a+b|0,a-b|0,Math.imul(a,b),a/b|0,a%b,u/w|0,u%w|0,,a&b,a|b,a^b,,a<<b,a>>b,a>>>b|0,,+(a==b),+(a<b),+(u<w)][k-16])
}
else return 5
if(s.length>256)return 3
if(r.length>64)return 7
}}
for(const d of f.readdirSync(I)){
let P=I+'/'+d,Q=O+'/'+d
const x=R(B(P+'/program.bin'),B(P+'/input.bin'))
f.mkdirSync(Q,{recursive:!0})
C(Q+'/stdout.bin',Buffer.from(o))
C(Q+'/exit.txt',x+'')
}
