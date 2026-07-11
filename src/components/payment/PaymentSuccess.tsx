import { CheckCircle, MapPin, Receipt } from "lucide-react";



interface Props{

total:number;

orderId:number;

method:string;

onClose:()=>void;

}




export default function PaymentSuccess({

total,

orderId,

method,

onClose

}:Props){



return(



<div className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
">





<div className="
bg-white
rounded-[32px]
w-[430px]
p-8
text-center
shadow-2xl
animate-in
zoom-in
">







<div className="
w-20
h-20
bg-green-100
rounded-full
flex
items-center
justify-center
mx-auto
">


<CheckCircle

size={55}

className="text-green-500"

/>


</div>







<h2 className="
text-3xl
font-serif
font-bold
mt-5
text-stone-900
">


¡Pago confirmado!


</h2>







<p className="
text-stone-500
mt-3
">


Tu pedido

<b>

 #{orderId}

</b>

fue registrado correctamente.


</p>







<div className="
bg-stone-50
rounded-2xl
p-5
mt-6
text-left
">





<div className="
flex
items-center
gap-2
mb-4
">


<Receipt

size={18}

className="text-[#A44B0C]"

/>


<span className="font-semibold">

Detalle del pedido

</span>



</div>







<div className="
flex
justify-between
text-sm
">


<span>

Total

</span>


<b className="text-[#A44B0C]">

S/ {total.toFixed(2)}

</b>


</div>






<div className="
flex
justify-between
text-sm
mt-2
">


<span>

Método

</span>


<b>

{method==="yape"?"Yape":"Tarjeta"}

</b>


</div>





</div>







<div className="
flex
items-center
justify-center
gap-2
text-sm
text-stone-500
mt-5
">


<MapPin size={16}/>


Prepararemos tu pedido


</div>









<button

onClick={onClose}

className="
mt-6
w-full
bg-[#A44B0C]
text-white
rounded-xl
py-3.5
font-bold
hover:bg-[#8B4513]
transition
"


>


Seguir comprando


</button>







</div>





</div>



);


}