import { Header } from "@/components/shared/Header";
import { PaymentVoucher } from "@/components/shared/payments/PaymentVoucher";

export function Payment() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center bg-accent p-2 md:p-12">
        <PaymentVoucher />
      </main>
    </>
  );
}