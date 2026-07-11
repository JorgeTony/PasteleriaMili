import { useState } from "react";
import PaymentMethod from "./PaymentMethod";
import YapePayment from "./YapePayment";
import CardPayment from "./CardPayment";


interface Props {

  total:number;

  orderId:number;

  onSuccess:()=>void;

  onCancel:()=>void;

}



export default function PaymentGateway({

  total,

  onSuccess,

  onCancel

}:Props){



const [method,setMethod]=useState("");

const [loading,setLoading]=useState(false);



const processPayment=()=>{


setLoading(true);


setTimeout(()=>{


setLoading(false);

onSuccess();


},2000);


};




return (

<div
className="
fixed
inset-0
bg-black/70
backdrop-blur-sm
flex
items-center
justify-center
z-50
p-4
"
>


<div
className="
bg-white
w-full
max-w-md
max-h-[90vh]
rounded-[32px]
shadow-2xl
overflow-hidden
flex
flex-col
"
>


{/* CABECERA */}

<div
className="
bg-gradient-to-r
from-[#8B4513]
to-[#B65A17]
p-7
text-center
text-white
shrink-0
"
>


<h2
className="
text-3xl
font-serif
font-bold
"
>

MILIS PAY

</h2>


<p className="
text-white/80
text-sm
mt-1
">

Compra segura y rápida

</p>


</div>





{/* CONTENIDO SCROLL */}

<div
className="
p-7
overflow-y-auto
"
>



<div
className="
bg-[#faf5ef]
rounded-2xl
p-5
mb-6
border
border-[#ead8c7]
"
>


<p className="
text-sm
text-stone-600
">

Total a pagar

</p>


<h3
className="
text-4xl
font-bold
text-[#A44B0C]
mt-2
"
>

S/ {total.toFixed(2)}

</h3>


</div>






{
loading ?


<div className="
py-12
text-center
">


<div
className="
w-14
h-14
border-4
border-[#A44B0C]
border-t-transparent
rounded-full
animate-spin
mx-auto
"
/>


<p className="
mt-5
font-semibold
"
>

Procesando pago...

</p>


</div>



:


!method ?


<PaymentMethod
selectMethod={setMethod}
/>


:


method==="yape" ?


<YapePayment

total={total}

onPay={processPayment}

/>


:


<CardPayment

total={total}

onPay={processPayment}

/>


}





<div
className="
mt-6
text-center
text-xs
text-stone-400
"
>

🔒 Pago protegido y seguro

</div>



</div>






{/* BOTÓN FIJO */}

<div
className="
border-t
p-4
bg-white
shrink-0
"
>


<button

onClick={onCancel}

className="
w-full
py-3
rounded-xl
text-stone-500
hover:text-[#A44B0C]
transition
font-medium
"

>

Cancelar

</button>


</div>




</div>


</div>


);


}