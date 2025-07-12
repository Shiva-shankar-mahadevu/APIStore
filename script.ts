let code: string  = ''
let hint: string  = ''
let loggedIn = parseInt(sessionStorage.getItem('APILOGGEDIN')|| '')|| false
const storedKey: string | null = localStorage.getItem('APIBANK')
const ApiName:HTMLFormElement | null=document.querySelector('input[id="ApiName"]')
const ApiKey:HTMLFormElement | null=document.querySelector('input[id="ApiKey"]') 
const OtherDetails:HTMLFormElement | null=document.querySelector('textarea[id="other"]')
const SubmitButton=document.querySelector('input[type="submit"]')
const APISECTION =document.getElementById('apis') 
const getAPISButton:HTMLButtonElement  | null =document.querySelector('button[id="GetApi"]')
type API={
    name:string;
    key:string;
    other?:string;
    date:string
};
let APIS:API[]=[]

if(!loggedIn)
    AuthenticateOrAddUser()
else{
    const apiArray:API[]=JSON.parse(localStorage.getItem('APICOLLECTION')|| '[]') 
    APIS=[...APIS,...apiArray]
    console.log(APIS)
    SubmitButton?.addEventListener('click',(e)=>{
        e.preventDefault()
        AddKey()
    })
    getAPISButton?.addEventListener('click',()=>{
        getAPIS()
    })
}
function AddKey(){
    const apikey:string=ApiKey.value
    const apiname:string=ApiName.value
    const other:string=OtherDetails.value
    if(apikey.trim()==='' || apiname.trim()==='')
        alert('Please Fill Required Fields')
    else{
        const newAPI:API={
            name:apiname,
            key:apikey,
            other:other,
            date:getDate()
        }
        APIS.push(newAPI)
        console.log(APIS)
        localStorage.setItem('APICOLLECTION',JSON.stringify(APIS))
        ApiKey.value=''
        ApiName.value=''
        OtherDetails.value=''
    }
}


function AuthenticateOrAddUser() {
    if (storedKey) {
        for (let i = 1; i <= 3 && code === ""; i++)
            code = prompt('Enter the passcode: ') || ''
        if (code && code === "")
            setTimeout(() => {
                hint = prompt('Enter your first school name: ') || ''
                if (hint === localStorage.getItem('APISTOREHINT')){
                    loggedIn = true
                    sessionStorage.setItem('APILOGGEDIN','1')
                }
                else
                    alert("incorrect answer")
            }, 1000);
        else {
            if (storedKey === code) {
                loggedIn = true
                sessionStorage.setItem('APILOGGEDIN','1')
            }
            else {
                alert('Wrong passcode')
            }
        }
    }
    else {
        do {
            code = prompt('Set passcode: ') || ''
        } while (code === "")

        do {
            hint = prompt('Enter your first school name: ') || ''
        } while (hint === "")
        if (code && hint) {
            localStorage.setItem('APIBANK', code)
            localStorage.setItem('APISTOREHINT', hint)
        }

    }
}

function getDate():string{
    const date = new Date();
    function padLeft(input: string, length: number, padChar: string = '0'): string {
        let result = input.toString();
        while (result.length < length) {
            result = padChar + result;
        }
        return result;
    }
    
    
    const year = date.getFullYear();
    const month = padLeft(String(date.getMonth() + 1),2)
    const day = padLeft(String(date.getDate()),2)

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate 

}

function getAPIS():void{
    const apis:API[]=JSON.parse(localStorage.getItem('APICOLLECTION')|| '[]')
    if(APISECTION)
        APISECTION.innerHTML=``
    if(apis.length)
        apis.map(api=>(appendAPIS(api)))
    else
        alert('no apis stored yet')
}

function appendAPIS(api:API):void{
    const div=document.createElement('div')
    div.className='ApiList'
    div.innerHTML=`<h3>API NAME:${api.name}</h3>
    <p> <strong>API KEY:</strong>${api.key}</p> <p> <strong>Others:</strong>${api.other || '   null' }</p><p> <strong>UPLOAD DATE:</strong> ${api.date}</p>
    <button class="ApiDelete" >Delete</button>`
    APISECTION?.appendChild(div)
}