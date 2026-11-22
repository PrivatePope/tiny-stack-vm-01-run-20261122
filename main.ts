import*as f from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',T='12257;<@00000000:::::::6:::6:::0:::0000000000000155110000000000069000000000000005525'
for(const d of f.readdirSync(I)){
const P=f.readFileSync(I+'/'+d+'/program.bin'),N=f.readFileSync(I+'/'+d+'/input.bin')
let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536),s=0,c=0,p=0,t=0,q=0,x=0,y,a,b,r,z
let e=(()=>{for(;;){
if(t==1e6)return 10
if(p<0||p>=P.length)return 9
let k=P[p],v=T.charCodeAt(k)-48
if(!v)return 5
let m=k==1?1:k==2?4:k>47&&k<52?2:0
if(p+m>=P.length)return 9
t++
let u=(v-1)>>2,w=(v-1)&3
if(s<u)return 2
if(s-u+w>256)return 3
let n=p+1+m
p=n
switch(k){
case 0:return 0
case 1:D[s++]=P.readInt8(n-1);break
case 2:D[s++]=P.readInt32LE(n-4);break
case 3:s--;break
case 4:D[s]=D[s-1];s++;break
case 5:y=D[s-1];D[s-1]=D[s-2];D[s-2]=y;break
case 6:D[s]=D[s-2];s++;break
case 7:a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break
case 23:D[s-1]=-D[s-1]|0;break
case 27:D[s-1]=~D[s-1];break
case 48:p=n+P.readInt16LE(n-2);break
case 49:case 50:z=D[--s];if((k==49)==(z==0))p=n+P.readInt16LE(n-2);break
case 51:if(c==64)return 7;C[c++]=n;p=P[n-2]|P[n-1]<<8;break
case 52:if(!c)return 8;p=C[--c];break
case 64:a=D[s-1];if(a&~255)return 6;D[s-1]=M[a];break
case 65:a=D[s-1];y=D[s-2];if(a&~255)return 6;s-=2;M[a]=y;break
case 80:y=D[s-1]+'';if(q+y.length>65536)return 11;s--;o.set(Buffer.from(y),q);q+=y.length;break
case 81:if(q+1>65536)return 11;o[q++]=D[--s]&255;break
case 82:D[s++]=x<N.length?N[x++]:-1;break
case 83:return D[--s]&255
default:
b=D[s-1];a=D[s-2]
if(!b&&k>18&&k<23)return 4
r=k>27?k>30?k==32?a==b?1:0:k==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0:k==28?a<<(b&31):k==29?a>>(b&31):a>>>(b&31)|0:k>23?k==24?a&b:k==25?a|b:a^b:k>18?k==19?a/b|0:k==20?a%b|0:k==21?(a>>>0)/(b>>>0)|0:(a>>>0)%(b>>>0)|0:k==16?a+b|0:k==17?a-b|0:Math.imul(a,b)
s-=2;D[s++]=r
}
}})()
f.mkdirSync(O+'/'+d,{recursive:true})
f.writeFileSync(O+'/'+d+'/stdout.bin',o.subarray(0,q))
f.writeFileSync(O+'/'+d+'/exit.txt',e+'\n')
}
