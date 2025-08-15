import { MainFixedLayout, Scroll } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";

export default function Page() {
  return (
    <MainFixedLayout>
      <H1>Scrolling page with fixed items</H1>
      <Scroll>
        {[...Array(100)].map((_, j) => (
          <div key={j}>this is how we scroooooolll</div>
        ))}
      </Scroll>
      <H1>Scrolling page with fixed items (footer)</H1>
    </MainFixedLayout>
  );
}
