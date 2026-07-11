import { useState } from "react";
import {
  Smartphone,
  ShieldCheck,
  AlertCircle,
  KeyRound,
} from "lucide-react";

interface Props {
  total: number;
  onPay: () => void;
}

interface YapeErrors {
  phone?: string;
  approvalCode?: string;
}

export default function YapePayment({
  total,
  onPay,
}: Props) {
  const [phone, setPhone] = useState("");
  const [approvalCode, setApprovalCode] = useState("");
  const [errors, setErrors] = useState<YapeErrors>({});

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 9);

    setPhone(value);

    if (errors.phone) {
      setErrors((previous) => ({
        ...previous,
        phone: undefined,
      }));
    }
  };

  const handleCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setApprovalCode(value);

    if (errors.approvalCode) {
      setErrors((previous) => ({
        ...previous,
        approvalCode: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: YapeErrors = {};

    if (!phone) {
      newErrors.phone = "Ingresa tu número de celular.";
    } else if (!/^9\d{8}$/.test(phone)) {
      newErrors.phone = "Ingresa un celular válido de 9 dígitos.";
    }

    if (!approvalCode) {
      newErrors.approvalCode = "Ingresa el código de aprobación.";
    } else if (!/^\d{6}$/.test(approvalCode)) {
      newErrors.approvalCode =
        "El código debe contener 6 dígitos.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePay = () => {
    if (!validate()) {
      return;
    }

    onPay();
  };

  return (
    <div className="space-y-5">
      {/* Encabezado Yape */}
      <div className="text-center">
        <div
          className="
            w-16
            h-16
            rounded-full
            bg-purple-100
            flex
            items-center
            justify-center
            mx-auto
            mb-3
          "
        >
          <Smartphone
            size={32}
            className="text-purple-600"
          />
        </div>

        <h3 className="text-xl font-bold text-purple-700">
          Pago con Yape
        </h3>

        <p className="text-sm text-stone-500 mt-1">
          Ingresa tus datos para continuar
        </p>
      </div>

      {/* Información */}
      <div
        className="
          bg-purple-50
          border
          border-purple-100
          rounded-2xl
          p-4
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            w-12
            h-12
            rounded-full
            bg-purple-600
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Smartphone
            size={24}
            className="text-white"
          />
        </div>

        <div>
          <p className="font-semibold text-purple-800">
            Yape
          </p>

          <p className="text-xs text-purple-600 mt-0.5">
            Simulación de pago móvil
          </p>
        </div>
      </div>

      {/* Número celular */}
      <div>
        <label
          htmlFor="yape-phone"
          className="block text-sm font-medium text-stone-700 mb-1.5"
        >
          Número de celular
        </label>

        <div className="relative">
          <Smartphone
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-stone-400
            "
          />

          <input
            id="yape-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="999 999 999"
            maxLength={9}
            className={`
              w-full
              border
              rounded-xl
              pl-11
              pr-4
              py-3
              outline-none
              transition
              ${
                errors.phone
                  ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                  : "border-stone-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              }
            `}
          />
        </div>

        {errors.phone && (
          <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5">
            <AlertCircle size={14} />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Código de aprobación */}
      <div>
        <label
          htmlFor="yape-code"
          className="block text-sm font-medium text-stone-700 mb-1.5"
        >
          Código de aprobación
        </label>

        <div className="relative">
          <KeyRound
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-stone-400
            "
          />

          <input
            id="yape-code"
            type="password"
            inputMode="numeric"
            value={approvalCode}
            onChange={handleCodeChange}
            placeholder="••••••"
            maxLength={6}
            className={`
              w-full
              border
              rounded-xl
              pl-11
              pr-4
              py-3
              outline-none
              tracking-[6px]
              transition
              ${
                errors.approvalCode
                  ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                  : "border-stone-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              }
            `}
          />
        </div>

        {errors.approvalCode && (
          <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5">
            <AlertCircle size={14} />
            {errors.approvalCode}
          </p>
        )}
      </div>

      {/* Botón */}
      <button
        type="button"
        onClick={handlePay}
        className="
          w-full
          bg-gradient-to-r
          from-purple-600
          to-purple-500
          hover:from-purple-700
          hover:to-purple-600
          text-white
          rounded-xl
          py-3.5
          font-bold
          transition-all
          hover:shadow-lg
          active:scale-[0.98]
        "
      >
        Continuar con el pago — S/ {total.toFixed(2)}
      </button>

      <div
        className="
          flex
          justify-center
          items-center
          gap-2
          text-xs
          text-stone-400
        "
      >
        <ShieldCheck
          size={16}
          className="text-green-500"
        />

        Los campos son obligatorios
      </div>
    </div>
  );
}