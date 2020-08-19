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
            for(var i=0;i<len_a;i++) if(arr_a[i]<'0'||arr_a[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            for(var i=0;i<len_b;i++) if(arr_b[i]<'0'||arr_b[i]>'9') throw new Error("There are characters in the string that are not numbers.");
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
            var pos=max_length-1;
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
            for(var i=0;i<len_a;i++) if(arr_a[i]<'0'||arr_a[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            for(var i=0;i<len_b;i++) if(arr_b[i]<'0'||arr_b[i]>'9') throw new Error("There are characters in the string that are not numbers.");
            //The maximum length of each array is less than or equal to the length of multiplier plus the length of multiplicand
            for(var i=0;i<arr.length;i++) arr[i]=new Array(len_a+len_b).fill(0);
            arr_a.reverse();arr_b.reverse();
            for(var i=0;i<len_a;i++) arr_a[i]=parseInt(arr_a[i]);
            for(var i=0;i<len_b;i++) arr_b[i]=parseInt(arr_b[i]);
            for(var i=0;i<len_b;i++){
                pos++;
                for(var j=0;j<len_a;j++){
                    var k=j+pos;
                    arr[i][k]+=arr_b[i]*arr_a[j];
                    if(arr[i][k]>9){
                        arr[i][k+1]+=Math.floor(arr[i][k]/10);
                        arr[i][k]%=10;
                    }
                }
            }
            for(var i=0;i<len_a+len_b;i++){
                for(var j=0;j<len_b;j++){
                    p[i]+=arr[j][i];
                    if(p[i]>9){
                        p[i+1]+=Math.floor(p[i]/10);
                        p[i]%=10;
                    }
                }
            }
            //Remove leading zeros
            var pos_p=len_a+len_b-1;
            while(p[pos_p]===0){
                p.pop();
                pos_p--;
            }
            return p.reverse().join('');
        }
    }
}