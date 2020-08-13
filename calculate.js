function Cal(){}
Cal.prototype={
    constructor:Cal,
    //version
    version:1.0,
    //Positive integer addition
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
            if(arr[max_length]===0) arr.pop();
            return arr.reverse().join('');
        }
    }
}