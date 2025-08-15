import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";

export default function Home() {
  return (
    <MainLayout>
      <H1>Welcome to pokkit auth-sandbox</H1>
      <br />
      <p className="text-muted-foreground">
        This is your dashboard. Start adding your content here.
      </p>
      {[...Array(100)].map((_, j) => (
        <div key={j}>this is how we scroooooolll</div>
      ))}
    </MainLayout>
  );
}
