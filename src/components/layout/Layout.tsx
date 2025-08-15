import { Header } from "./Header";
import { LeftSidebar } from "./LeftSidebar";
import { Modal } from "../Modal";

export const PreserveScrollAbility = (p: {
  children: React.ReactNode;
  className?: HTMLDivElement["className"];
}) => <div className={`flex h-full flex-col ${p.className ?? ""}`}>{p.children}</div>;

export const Scroll = (p: {
  children: React.ReactNode;
  className?: HTMLDivElement["className"];
}) => <div className={`flex-1 overflow-y-auto ${p.className ?? ""}`}>{p.children}</div>;

export const MainLayout = (p: {
  children: React.ReactNode;
  className?: HTMLDivElement["className"];
}) => {
  return <div className={`p-6 ${p.className ?? ""}`}>{p.children}</div>;
};
export const MainFixedLayout = (p: { children: React.ReactNode }) => {
  return <PreserveScrollAbility>{p.children}</PreserveScrollAbility>;
};

export const Layout = (p: { children: React.ReactNode; showLeftSidebar: boolean }) => {
  return (
    <div className="flex h-screen max-h-screen flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {p.showLeftSidebar && (
          <PreserveScrollAbility className="w-64">
            <LeftSidebar />
          </PreserveScrollAbility>
        )}

        <PreserveScrollAbility className="flex-1 overflow-y-auto">
          {p.children}
        </PreserveScrollAbility>
      </div>
      <Modal />
    </div>
  );
};
