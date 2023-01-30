import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

import * as ga from "../lib/google-analytics";

// const SECRET = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	// console.log('googleAnalyticsId >>>', SECRET);
	useEffect(() => {
		const handleRouteChange = (url) => {
			ga.pageview(url);
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);
	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics-script" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
			</Script>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
