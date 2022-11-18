// _app.tsx

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Toaster } from "react-hot-toast";
import '../styles/global.css'

const App = ({ Component, pageProps: {session, ...pageProps} }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
};

export default App;
