import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <head />
      <body style={{
        background: "linear-gradient(45deg, rgba(255, 0, 255, 0.7), rgba(0, 255, 255, 0.7)), radial-gradient(circle at top right, rgba(255, 255, 0, 0.8), rgba(0, 0, 255, 0.8))"
      }}>
        <div>{children}</div>
      </body>
    </html>
  );
}
