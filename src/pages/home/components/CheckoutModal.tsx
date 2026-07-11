import { useState, useEffect } from 'react';
import { CartItem } from '@/hooks/useCart';
import { supabase } from '@/lib/supabaseClient';
import PaymentGateway from '@/components/payment/PaymentGateway';


interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}


interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}


type Step = 'form' | 'payment' | 'success';



const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  notes: '',
};



export default function CheckoutModal({
  isOpen,
  items,
  total,
  onClose,
  onSuccess,
}: CheckoutModalProps) {



  const [step, setStep] = useState<Step>('form');

  const [form, setForm] = useState<FormData>(initialForm);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [loading, setLoading] = useState(false);


  const [orderId, setOrderId] = useState<number | null>(null);


  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  const [savedTotal, setSavedTotal] = useState(0);



  useEffect(() => {

    if (isOpen) {

      document.body.style.overflow = 'hidden';

      setStep('form');

      setForm(initialForm);

      setErrors({});

      setOrderId(null);

    } else {

      document.body.style.overflow = '';

    }


    return () => {

      document.body.style.overflow = '';

    };


  }, [isOpen]);





  const validate = (): boolean => {


    const newErrors: Partial<FormData> = {};


    if (!form.name.trim())
      newErrors.name = 'El nombre es requerido';


    if (!form.email.trim())
      newErrors.email = 'El correo es requerido';


    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Correo inválido';



    if (!form.phone.trim())
      newErrors.phone = 'El teléfono es requerido';



    if (!form.address.trim())
      newErrors.address = 'La dirección es requerida';



    if (!form.city.trim())
      newErrors.city = 'La ciudad es requerida';



    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;


  };





  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {


    const { name, value } = e.target;


    setForm(prev => ({
      ...prev,
      [name]: value
    }));


    if (errors[name as keyof FormData]) {


      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));


    }


  };







  const handleSubmit = async () => {


    if (!validate())
      return;



    setLoading(true);



    try {


      const subtotal = items.reduce((sum, i) => {

        const price = i.product.price;

        return sum + price * i.quantity;


      }, 0);




      const recipient = {


        name: form.name.trim(),

        email: form.email.trim(),

        phone: form.phone.trim(),

        address: form.address.trim(),

        city: form.city.trim(),


      };





      const { data: orderHeader, error: headerError } =
        await supabase

        .from('order_headers')

        .insert({

          currency: 'PEN',

          payment_provider: 'manual',

          status: 'pending_payment',

          subtotal_items: subtotal,

          shipping_total: 0,

          tax_total: 0,

          customer_notes: form.notes.trim() || null,

          recipient,

          customer_id: null,


        })

        .select('id')

        .single();





      if (headerError || !orderHeader)
        throw headerError;







      const orderItems = items.map(i => ({


        order_id: orderHeader.id,

        product_id: String(i.product.id),

        product_name: i.product.name,

        quantity: i.quantity,

        unit_price: i.product.price,

        final_price: i.product.price,

        subtotal: i.product.price * i.quantity,



      }));






      const { error: itemsError } = await supabase

        .from('order_items')

        .insert(orderItems);






      if (itemsError)
        throw itemsError;





      setOrderId(orderHeader.id);


      setSavedItems(items);


      setSavedTotal(total);



      // NUEVO FLUJO:
      // Después de crear el pedido abre la pasarela visual


      setStep('payment');




    } catch (err:any) {


      console.error(
        'Error al procesar pedido:',
        err
      );


      alert(
        err?.message ||
        JSON.stringify(err)
      );


    } finally {


      setLoading(false);


    }



  };





  if (!isOpen)
    return null;
    return (

    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">


      {/* Overlay */}

      <div

        className="absolute inset-0 bg-stone-950/85"

        onClick={step === 'success' ? onClose : undefined}

      />




      {/* MODAL */}

      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">



        {/* ================= FORMULARIO ================= */}


        {step === 'form' && (


          <>


            <div className="sticky top-0 bg-white px-8 pt-8 pb-5 border-b border-stone-100 flex justify-between items-center z-10">


              <div>


                <h2

                  className="text-2xl font-bold text-stone-900"

                  style={{
                    fontFamily:"'Playfair Display', serif"
                  }}

                >

                  Finalizar pedido

                </h2>


                <p className="text-stone-500 text-sm mt-1">

                  Completa tus datos para continuar al pago

                </p>


              </div>



              <button

                onClick={onClose}

                className="w-9 h-9 rounded-full hover:bg-stone-100"

              >

                <i className="ri-close-line text-xl text-stone-500"/>

              </button>



            </div>





            <div className="px-8 py-6 space-y-8">





              {/* RESUMEN */}


              <div>


                <h3 className="text-sm font-semibold text-stone-700 uppercase mb-4">

                  Resumen del pedido

                </h3>



                <div className="bg-stone-50 rounded-2xl p-4 space-y-3">


                  {items.map(item=>(


                    <div

                      key={item.product.id}

                      className="flex justify-between"

                    >


                      <span className="text-sm text-stone-700">

                        {item.product.name}

                        {" "}x{item.quantity}


                      </span>



                      <span className="font-medium">

                        S/ {(item.product.price * item.quantity).toFixed(2)}

                      </span>


                    </div>


                  ))}





                  <div className="border-t pt-3 flex justify-between">


                    <span className="font-semibold">

                      Total

                    </span>


                    <span className="font-bold text-amber-800 text-lg">

                      S/ {total.toFixed(2)}

                    </span>



                  </div>



                </div>


              </div>







              {/* DATOS CLIENTE */}



              <div>


                <h3 className="text-sm font-semibold text-stone-700 uppercase mb-4">

                  Datos de entrega

                </h3>





                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">





                  {[
                    {
                      name:"name",
                      label:"Nombre completo",
                      placeholder:"Ej: María García"
                    },
                    {
                      name:"email",
                      label:"Correo electrónico",
                      placeholder:"correo@gmail.com"
                    },
                    {
                      name:"phone",
                      label:"Teléfono",
                      placeholder:"+51 999999999"
                    },
                    {
                      name:"city",
                      label:"Ciudad",
                      placeholder:"Lima"
                    },
                    {
                      name:"address",
                      label:"Dirección",
                      placeholder:"Av. Principal 123"
                    }

                  ].map(field=>(



                    <div

                      key={field.name}

                      className={field.name==="address" ? "sm:col-span-2":""}

                    >



                      <label className="text-xs text-stone-600">

                        {field.label}

                      </label>



                      <input


                        name={field.name}

                        value={(form as any)[field.name]}

                        onChange={handleChange}


                        placeholder={field.placeholder}


                        className="
                        w-full
                        mt-1
                        border
                        border-stone-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        outline-none
                        focus:border-amber-500
                        "

                      />



                      {errors[field.name as keyof FormData] &&

                        <p className="text-red-500 text-xs mt-1">

                          {errors[field.name as keyof FormData]}

                        </p>

                      }



                    </div>



                  ))}



                </div>




                <textarea


                  name="notes"

                  value={form.notes}

                  onChange={handleChange}

                  placeholder="Notas del pedido (opcional)"

                  className="
                  w-full
                  mt-4
                  border
                  rounded-xl
                  p-4
                  resize-none
                  "

                  rows={3}


                />



              </div>






              <div className="bg-amber-50 rounded-2xl p-4">


                <p className="text-sm text-amber-800">


                  Selecciona tu método de pago preferido para completar tu compra.


                </p>


              </div>




            </div>







            {/* BOTONES */}


            <div className="sticky bottom-0 bg-white border-t px-8 py-5 flex gap-3">


              <button

                onClick={onClose}

                className="
                flex-1
                border
                rounded-full
                py-3
                "

              >

                Volver


              </button>





              <button

                onClick={handleSubmit}

                disabled={loading}

                className="
                flex-1
                bg-amber-800
                text-white
                rounded-full
                py-3
                "

              >


                {loading ?

                  "Procesando..."

                  :

                  `Continuar al pago — S/ ${total.toFixed(2)}`

                }


              </button>



            </div>



          </>



        )}









        {/* ================= PASARELA ================= */}



        {step === 'payment' && (



         <PaymentGateway

total={savedTotal}

orderId={orderId ?? 0}

onSuccess={()=>{

setStep('success');

onSuccess();

}}

onCancel={()=>{

setStep('form');

}}

/>



        )}









        {/* ================= ÉXITO ================= */}



        {step === 'success' && (



          <div className="flex flex-col items-center text-center px-8 py-14 gap-6">



            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">


              <i className="ri-checkbox-circle-fill text-green-500 text-5xl"/>


            </div>





            <div>



              <h2

                className="text-3xl font-bold text-stone-900"

                style={{
                  fontFamily:"'Playfair Display', serif"
                }}

              >

                ¡Pago confirmado!

              </h2>



              <p className="text-stone-500 mt-3">


                Tu pedido

                <b>

                  {" "}#{orderId}

                </b>


                fue registrado correctamente.



                <br/>


                Nos comunicaremos contigo para coordinar la entrega.


              </p>



            </div>







            <div className="w-full bg-stone-50 rounded-2xl p-5 text-left">


              <p className="text-xs uppercase text-stone-500 mb-3">

                Tu pedido

              </p>




              {savedItems.map(item=>(



                <div

                  key={item.product.id}

                  className="flex justify-between text-sm mb-2"

                >


                  <span>

                    {item.product.name}

                    x{item.quantity}


                  </span>



                  <span>

                    S/ {(item.product.price * item.quantity).toFixed(2)}

                  </span>


                </div>



              ))}





              <div className="border-t pt-3 flex justify-between font-bold">


                <span>

                  Total

                </span>


                <span className="text-amber-800">

                  S/ {savedTotal.toFixed(2)}

                </span>


              </div>




            </div>






            <div className="text-sm text-stone-500">


              📍 {form.address}, {form.city}


            </div>





            <button


              onClick={onClose}


              className="
              w-full
              bg-amber-800
              text-white
              rounded-full
              py-3.5
              "

            >

              Seguir comprando


            </button>





          </div>



        )}






      </div>



    </div>


  );


}