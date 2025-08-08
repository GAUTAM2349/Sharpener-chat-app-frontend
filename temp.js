const arr = [1,2,3];

function temp(){
    const y = 25;
    setTimeout(()=>{
        for(let i =0; i < 5; i++ ) arr[0]++;
        console.log(arr[0]);
    })
    return function temp2(){
        console.log(arr[1]++);
    }
}

const fn = temp();
fn();

console.log(arr);