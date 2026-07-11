import { useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  AlertCircle,
  CalendarDays,
  UserRound,
} from "lucide-react";

interface Props {
  total: number;
  onPay: () => void;
}

interface CardErrors {
  cardNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
}

export default function CardPayment({
  total,
  onPay,
}: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<CardErrors>({});

  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardNumber(formatCardNumber(event.target.value));

    if (errors.cardNumber) {
      setErrors((previous) => ({
        ...previous,
        cardNumber: undefined,
      }));
    }
  };

  const handleHolderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
      .replace(/[^a-zA-ZÀ-ÿÑñ\s]/g, "")
      .slice(0, 50);

    setHolderName(value);

    if (errors.holderName) {
      setErrors((previous) => ({
        ...previous,
        holderName: undefined,
      }));
    }
  };

  const handleExpiryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const digits = event.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    const formatted =
      digits.length > 2
        ? `${digits.slice(0, 2)}/${digits.slice(2)}`
        : digits;

    setExpiry(formatted);

    if (errors.expiry) {
      setErrors((previous) => ({
        ...previous,
        expiry: undefined,
      }));
    }
  };

  const handleCvvChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    setCvv(value);

    if (errors.cvv) {
      setErrors((previous) => ({
        ...previous,
        cvv: undefined,
      }));
    }
  };

  const isExpiryValid = (value: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(value)) {
      return false;
    }

    const [monthText, yearText] = value.split("/");
    const month = Number(monthText);
    const year = Number(`20${yearText}`);

    if (month < 1 || month > 12) {
      return false;
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear) {
      return false;
    }

    if (year === currentYear && month < currentMonth) {
      return false;
    }

    return true;
  };

  const validate = (): boolean => {
    const newErrors: CardErrors = {};
    const cardDigits = cardNumber.replace(/\s/g, "");

    if (!cardDigits) {
      newErrors.cardNumber =
        "Ingresa el número de la tarjeta.";
    } else if (!/^\d{16}$/.test(cardDigits)) {
      newErrors.cardNumber =
        "El número debe contener 16 dígitos.";
    }

    if (!holderName.trim()) {
      newErrors.holderName =
        "Ingresa el nombre del titular.";
    } else if (holderName.trim().length < 3) {
      newErrors.holderName =
        "Ingresa un nombre válido.";
    }

    if (!expiry) {
      newErrors.expiry =
        "Ingresa la fecha.";
    } else if (!isExpiryValid(expiry)) {
      newErrors.expiry =
        "La fecha no es válida.";
    }

    if (!cvv) {
      newErrors.cvv =
        "Ingresa el CVV.";
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv =
        "Debe tener 3 o 4 dígitos.";
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

  const displayedNumber =
    cardNumber || "•••• •••• •••• ••••";

  const displayedName =
    holderName.trim().toUpperCase() || "NOMBRE DEL TITULAR";

  const displayedExpiry =
    expiry || "MM/AA";

  return (
    <div className="space-y-5">
      {/* Tarjeta visual */}
      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-slate-700
          rounded-3xl
          p-6
          text-white
          shadow-xl
          min-h-[190px]
        "
      >
        <div
          className="
            absolute
            -right-10
            -top-10
            w-40
            h-40
            rounded-full
            bg-white/5
          "
        />

        <div
          className="
            absolute
            -left-14
            -bottom-20
            w-48
            h-48
            rounded-full
            bg-white/5
          "
        />

        <div className="relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CreditCard
                size={21}
                className="text-amber-300"
              />

              <span className="font-bold tracking-wide">
                TARJETA
              </span>
            </div>

            <span className="text-xs text-white/60">
              CRÉDITO / DÉBITO
            </span>
          </div>

          <div
            className="
              mt-7
              w-11
              h-8
              rounded-md
              bg-gradient-to-br
              from-amber-200
              to-amber-500
              border
              border-amber-100/50
            "
          />

          <p
            className="
              tracking-[3px]
              text-lg
              sm:text-xl
              mt-5
              whitespace-nowrap
            "
          >
            {displayedNumber}
          </p>

          <div className="flex justify-between items-end mt-5">
            <div className="min-w-0 pr-4">
              <p className="text-[10px] text-white/50 uppercase">
                Titular
              </p>

              <p className="text-sm font-medium truncate">
                {displayedName}
              </p>
            </div>

            <div className="shrink-0">
              <p className="text-[10px] text-white/50 uppercase">
                Vence
              </p>

              <p className="text-sm font-medium">
                {displayedExpiry}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Número de tarjeta */}
      <div>
        <label
          htmlFor="card-number"
          className="block text-sm font-medium text-stone-700 mb-1.5"
        >
          Número de tarjeta
        </label>

        <div className="relative">
          <CreditCard
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
            id="card-number"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
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
                errors.cardNumber
                  ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                  : "border-stone-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }
            `}
          />
        </div>

        {errors.cardNumber && (
          <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5">
            <AlertCircle size={14} />
            {errors.cardNumber}
          </p>
        )}
      </div>

      {/* Titular */}
      <div>
        <label
          htmlFor="card-holder"
          className="block text-sm font-medium text-stone-700 mb-1.5"
        >
          Nombre del titular
        </label>

        <div className="relative">
          <UserRound
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
            id="card-holder"
            type="text"
            autoComplete="cc-name"
            value={holderName}
            onChange={handleHolderChange}
            placeholder="Como aparece en la tarjeta"
            className={`
              w-full
              border
              rounded-xl
              pl-11
              pr-4
              py-3
              outline-none
              uppercase
              transition
              ${
                errors.holderName
                  ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                  : "border-stone-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }
            `}
          />
        </div>

        {errors.holderName && (
          <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5">
            <AlertCircle size={14} />
            {errors.holderName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Fecha */}
        <div>
          <label
            htmlFor="card-expiry"
            className="block text-sm font-medium text-stone-700 mb-1.5"
          >
            Vencimiento
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-stone-400
              "
            />

            <input
              id="card-expiry"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/AA"
              maxLength={5}
              className={`
                w-full
                border
                rounded-xl
                pl-10
                pr-3
                py-3
                outline-none
                transition
                ${
                  errors.expiry
                    ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                    : "border-stone-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                }
              `}
            />
          </div>

          {errors.expiry && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.expiry}
            </p>
          )}
        </div>

        {/* CVV */}
        <div>
          <label
            htmlFor="card-cvv"
            className="block text-sm font-medium text-stone-700 mb-1.5"
          >
            CVV
          </label>

          <div className="relative">
            <Lock
              size={17}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-stone-400
              "
            />

            <input
              id="card-cvv"
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="•••"
              maxLength={4}
              className={`
                w-full
                border
                rounded-xl
                pl-10
                pr-3
                py-3
                outline-none
                transition
                ${
                  errors.cvv
                    ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                    : "border-stone-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                }
              `}
            />
          </div>

          {errors.cvv && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.cvv}
            </p>
          )}
        </div>
      </div>

      {/* Botón */}
      <button
        type="button"
        onClick={handlePay}
        className="
          w-full
          bg-gradient-to-r
          from-[#A44B0C]
          to-[#C56A22]
          hover:from-[#8B4513]
          hover:to-[#A44B0C]
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
          gap-2
          items-center
          text-xs
          text-stone-400
        "
      >
        <ShieldCheck
          size={16}
          className="text-green-500"
        />

        Todos los campos son obligatorios
      </div>
    </div>
  );
}