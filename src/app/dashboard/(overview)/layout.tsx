import PageWrapper from "@/components/PageWrapper";

export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
