const SECRET = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
export const pageview = (url) => {
    window.gtag('config', SECRET, {
        path_url: url,
    })
}