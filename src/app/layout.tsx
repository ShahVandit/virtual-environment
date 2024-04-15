import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <head/>
      <body style={{ backgroundColor: "green" }}> {/* Add background color style here */}
        <div>{children}</div>
      </body>
    </html>
  );
}
