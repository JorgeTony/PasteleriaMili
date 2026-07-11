import { Smartphone, CreditCard, ArrowRight } from "lucide-react";



interface Props{

selectMethod:(value:string)=>void;

}



export default function PaymentMethod({

selectMethod

}:Props){



return(



<div className="space-y-5">





<h3 className="
text-lg
font-bold
text-stone-800
">

Selecciona tu método de pago

</h3>








{/* YAPE */}



<button

onClick={()=>selectMethod("yape")}

className="
group
w-full
rounded-2xl
border
border-stone-200
p-5
flex
items-center
justify-between
hover:border-purple-500
hover:bg-purple-50
transition-all
hover:-translate-y-1
shadow-sm
"


>


<div className="
flex
items-center
gap-4
">


<div className="
w-14
h-14
rounded-2xl
bg-purple-100
flex
items-center
justify-center
">

<Smartphone

size={30}

className="
text-purple-600
"

/>


</div>





<div className="text-left">


<h4 className="
font-bold
text-stone-800
text-lg
">

Yape

</h4>



<p className="
text-sm
text-stone-500
">

Pago móvil instantáneo

</p>


</div>



</div>




<ArrowRight

className="
text-stone-300
group-hover:text-purple-600
transition
"

/>



</button>









{/* TARJETA */}





<button

onClick={()=>selectMethod("card")}


className="
group
w-full
rounded-2xl
border
border-stone-200
p-5
flex
items-center
justify-between
hover:border-blue-500
hover:bg-blue-50
transition-all
hover:-translate-y-1
shadow-sm
"


>



<div className="
flex
items-center
gap-4
">


<div className="
w-14
h-14
rounded-2xl
bg-blue-100
flex
items-center
justify-center
">


<CreditCard

size={30}

className="
text-blue-600
"

/>


</div>






<div className="text-left">


<h4 className="
font-bold
text-stone-800
text-lg
">

Tarjeta

</h4>



<p className="
text-sm
text-stone-500
">

Crédito o débito

</p>



</div>




</div>





<ArrowRight

className="
text-stone-300
group-hover:text-blue-600
transition
"

/>



</button>






</div>


);



}