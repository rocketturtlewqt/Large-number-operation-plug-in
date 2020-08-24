function Cal(){}
Cal.prototype={
    constructor:Cal,
    //version
    version:1.0,
    //Addition of large positive integers
    //Allow leading zeros
    add:function(a,b){
        if(typeof a != 'string' || typeof b != 'string') throw new TypeError("Type is not a string"); 
        else{
            let len_a=a.length,                            
                len_b=b.length,             
                /*
                 * Splits string into array
                 */               
                arr_a=a.split(''),                         
                arr_b=b.split(''),                        
                max_length=Math.max(len_a,len_b),          
                arr=new Array();
            for(let i=0;i<len_a;i++) if(arr_a[i]<'0'||arr_a[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            for(let i=0;i<len_b;i++) if(arr_b[i]<'0'||arr_b[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            arr_a.reverse();arr_b.reverse();
            /* 
             * Convert array elements to numeric types
             */
            for(let i=0;i<len_a;i++){
                if(arr_a[i]<'0'||arr_a[i]>'9') throw new Error('There are non-numeric characters in the string');
                else arr_a[i]=parseInt(arr_a[i]);     
            }
            for(let i=0;i<len_b;i++){
                if(arr_b[i]<'0'||arr_b[i]>'9') throw new Error('There are non-numeric characters in the string');
                arr_b[i]=parseInt(arr_b[i]);
            }
            /*
             * Set the array length to the maximum of both
             */
            while(len_a<max_length+1) arr_a.push(0),len_a++;
            while(len_b<max_length+1) arr_b.push(0),len_b++;
            for(let i=0;i<max_length;i++) arr[i]=arr_a[i]+arr_b[i];
            for(let i=0;i<max_length;i++){
                if(arr[i]>9) arr[i]-=10,arr[i+1]++;
            }
            //Remove leading zeros
            let pos=max_length-1;
            while(arr[pos]===0){
                arr.pop();
                pos--;
            }
            return arr.reverse().join('');
        }
    },
    //Multiplication of large positive integers
    //Allow leading zeros
    mul:function(a,b){
        if(typeof a != 'string' || typeof b != 'string') throw new TypeError("Type is not a string"); 
        else{
            let len_a=a.length,
                len_b=b.length,
                /*
                 * Splits string into array
                 */               
                arr_a=a.split(''),                         
                arr_b=b.split(''),
                arr=new Array(len_b),
                p=new Array(len_a+len_b).fill(0),
                pos=-1;
            for(let i=0;i<len_a;i++){
                if(arr_a[i]<'0'||arr_a[i]>'9') throw new Error("There are characters in the string that are not numbers.");
                arr_a[i]=parseInt(arr_a[i]);
            }
            for(let i=0;i<len_b;i++){
                if(arr_b[i]<'0'||arr_b[i]>'9') throw new Error("There are characters in the string that are not numbers.");
                arr_b[i]=parseInt(arr_b[i]);
            }
            //The maximum length of each array is less than or equal to the length of multiplier plus the length of multiplicand
            for(let i=0;i<arr.length;i++) arr[i]=new Array(len_a+len_b).fill(0);
            arr_a.reverse();arr_b.reverse();
            for(let i=0;i<len_b;i++){
                pos++;
                for(let j=0;j<len_a;j++){
                    let k=j+pos;
                    arr[i][k]+=arr_b[i]*arr_a[j];
                    if(arr[i][k]>9){
                        arr[i][k+1]+=Math.floor(arr[i][k]/10);
                        arr[i][k]%=10;
                    }
                }
            }
            for(let i=0;i<len_a+len_b;i++){
                for(let j=0;j<len_b;j++){
                    p[i]+=arr[j][i];
                    if(p[i]>9){
                        p[i+1]+=Math.floor(p[i]/10);
                        p[i]%=10;
                    }
                }
            }
            //Remove leading zeros
            let pos_p=len_a+len_b-1;
            while(p[pos_p]===0){
                p.pop();
                pos_p--;
            }
            return p.reverse().join('');
        }
    },
    //Large integer subtraction
    minus:function(a,b){
        if(typeof a != 'string' || typeof b != 'string') throw new TypeError("Type is not a string");
        else{
            let len_a=a.length,
                len_b=b.length,
                /*
                 * Splits string into array
                 */               
                arr_a,arr_b,arr=[],
                flag=0;
            if((len_a===len_b&&a<b)||len_a<len_b){
                //Exchange the values of a and b
                let c=a;a=b;b=c;
                len_a=a.length;len_b=b.length;
                flag=1;
            }
            arr_a=a.split('').reverse();arr_b=b.split('').reverse();
            for(let i=0;i<len_a;i++){
                if(arr_a[i]<'0'||arr_a[i]>'9') throw new Error("There are characters in the string that are not numbers.");
                arr_a[i]=parseInt(arr_a[i]);
            }
            for(let i=0;i<len_b;i++){
                if(arr_b[i]<'0'||arr_b[i]>'9') throw new Error("There are characters in the string that are not numbers.");
                arr_b[i]=parseInt(arr_b[i]);
            }
            for(let i=0;i<len_b;i++){
                let num=arr_a[i]-arr_b[i];
                if(num<0) num+=10,arr_a[i+1]--;
                arr.push(num);
            }
            for(let i=len_b;i<len_a;i++) arr.push(arr_a[i]);
            while(arr[arr.length-1]===0&&arr.length!==1) arr.pop();
            if(flag&&!(arr.length===1&&arr[0]===0)) arr.push('-');
            return arr.reverse().join('');
        }
    },
    //Large positive integer division
    divide:function(a,b){
        if(typeof a != 'string' || typeof b != 'string') throw new TypeError("Type is not a string");
        else{
            let len_a=a.length,
                len_b=b.length,
                /*
                 * Splits string into array
                 */               
                arr_a=a.split(''),                         
                arr_b=b.split(''),
                arr=[];
            for(let i=0;i<len_a;i++) if(arr_a[i]<'0'||arr_a[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            for(let i=0;i<len_b;i++) if(arr_b[i]<'0'||arr_b[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            if((len_a===len_b&&a<b)||len_a<len_b) return '0';
            //If the length of two strings A and B is equal and the dictionary order of A is smaller than that of B, output 0 directly
            while((a.length===b.length&&a>b)||a.length>b.length){
                let ans=0,cnt=0,bb;
                //Construct an appropriate divisor
                arr_b=b.split('');
                while(arr_b.length<a.length) arr_b.push(0),ans++;
                bb=arr_b.join('');
                if(bb>a) bb=bb.substr(0,bb.length-1),ans--;
                //Subtract the divisor until a is negative
                while(true){
                    let num=this.minus(a,bb);
                    if(num[0]==='-') break;
                    else a=num,cnt++;
                }
                let s=cnt.toString();
                for(let i=0;i<ans;i++) s+='0';
                arr.push(s);
            }
            let sum='0';
            for(let i=0;i<arr.length;i++){
                sum=this.add(sum,arr[i]);
            }
            return sum;
        }
    },
    //Large integer remainder
    mod:function(a,b){
        if(typeof a != 'string' || typeof b != 'string') throw new TypeError("Type is not a string");
        else{
            let len_a=a.length,
                len_b=b.length,         
                arr_a=a.split(''),                         
                arr_b=b.split('');
            for(let i=0;i<len_a;i++) if(arr_a[i]<'0'||arr_a[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            for(let i=0;i<len_b;i++) if(arr_b[i]<'0'||arr_b[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            if((len_a===len_b&&a<b)||len_a<len_b) return '0';
            while((a.length===b.length&&a>b)||a.length>b.length){
                let ans=0,cnt=0,bb;
                arr_b=b.split('');
                while(arr_b.length<a.length) arr_b.push(0),ans++;
                bb=arr_b.join('');
                if(bb>a) bb=bb.substr(0,bb.length-1),ans--;
                while(true){
                    let num=this.minus(a,bb);
                    if(num[0]==='-') break;
                    else a=num,cnt++;
                }
            }
            return a;
        }
    }
}
module.exports=Cal;