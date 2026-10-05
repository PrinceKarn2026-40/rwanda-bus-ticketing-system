import { CreditCard, Smartphone } from 'lucide-react'
import { Card, CardBody, Button } from '@/components/ui'

type PaymentMethod = 'MOMO' | 'CARD' | 'CASH'

const METHODS: { value: PaymentMethod; label: string; icon: React.ElementType; hint: string }[] = [
  { value: 'MOMO', label: 'Mobile Money', icon: Smartphone, hint: 'Send to: +250 795 919 537' },
  { value: 'CARD', label: 'Bank Card', icon: CreditCard, hint: 'Transfer to account: 1234-5678-9012' },
  { value: 'CASH', label: 'Cash (at office)', icon: CreditCard, hint: 'Pay at our Nyanza or Kigali office' },
]

interface PaymentStepProps {
  price: number
  method: PaymentMethod
  reference: string
  proofUrl: string
  loading: boolean
  onMethodChange: (m: PaymentMethod) => void
  onReferenceChange: (v: string) => void
  onProofUrlChange: (v: string) => void
  onConfirm: () => void
}

export default function PaymentStep({
  price, method, loading,
  onMethodChange, onConfirm,
}: PaymentStepProps) {
  const selectedMethod = METHODS.find((m) => m.value === method)!

  return (
    <Card>
      <CardBody className="space-y-5">
        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-1">Choose Payment Method</p>
          <p className="text-xs text-gray-500">Your seat is reserved. Select a payment method and submit for approval.</p>
        </div>

        {/* Method selector */}
        <div className="grid gap-3 sm:grid-cols-3">
          {METHODS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onMethodChange(value)}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-all ${
                method === value
                  ? 'border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400'
              }`}
            >
              <Icon className="h-6 w-6" />
              {label}
            </button>
          ))}
        </div>

        {/* Payment instructions */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
          <p className="font-semibold mb-0.5">Payment Instructions</p>
          <p>{selectedMethod.hint}</p>
          <p className="mt-1 font-bold">Amount: RWF {Number(price).toLocaleString()}</p>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
          <div>
            <p className="text-xs text-gray-500">Amount due</p>
            <p className="text-lg font-bold text-primary-600">RWF {Number(price).toLocaleString()}</p>
          </div>
          <Button onClick={onConfirm} loading={loading}>
            Submit for Approval
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
