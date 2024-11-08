let catBtn= document.querySelector("#catbtn");
catBtn.addEventListener("click",factGenerator);

let dogBtn= document.querySelector("#dogbtn");
dogBtn.addEventListener("click",pictureGenerator);


let catUrl="https://catfact.ninja/fact";
let dogUrl="https://dog.ceo/api/breeds/image/random";

async function pictureGenerator(){
        try{
                let res= await axios.get(dogUrl);
                let img=document.querySelector("#dogimg");
                img.setAttribute("src", res.data.message);
                // console.log(res.data.message);
        } catch(e){
                console.log(e);
        }
}

async function factGenerator(){
        try{
                let res= await axios.get(catUrl);
                catBtn.nextElementSibling.innerHTML=res.data.fact;
        } catch(e){
                console.log(e);
        }
}
