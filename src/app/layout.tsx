import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/shared/Navbar";
import { AutoConnect } from "thirdweb/react";
import { client } from "@/consts/client";

export const metadata: Metadata = {
	title: "Marketplace",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body style={{ paddingBottom: "100px" }}>
				<Providers>
					<AutoConnect client={client} />
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
