import { CalendarRoot } from "@/components/CalendarRoot";
import { OnboardingGate } from "@/components/OnboardingGate/OnboardingGate";

export default function Home() {
  return (
    <OnboardingGate>
      <CalendarRoot />
    </OnboardingGate>
  );
}
