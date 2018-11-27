function send() {
    event.preventDefault();
    fetch(document.getElementById("url").value).then(res=>res.json()).then(res=>{
        console.log(res);
        fetch("/store",{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"urlRespose":res,"priv":document.getElementById("pkey").value,"addressFrom":document.getElementById("ethaddr").value})
        }).then((res)=>res.json())
        .then(res=>{
            document.getElementsByClassName("json")[0].innerHTML="Your transaction id is "+res+"\nPlease wait for your transaction to reflect in etherscan"
        })
    })

}

function getJson() {
    fetch("/data").then(res=>res.json()).then(res=>{
        document.getElementsByClassName("json")[1].innerHTML=JSON.stringify(res);
    })
}