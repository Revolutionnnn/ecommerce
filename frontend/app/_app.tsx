import { Providers } from "@/components/Providers";

export default function App({ Component, pageProps }: any) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
