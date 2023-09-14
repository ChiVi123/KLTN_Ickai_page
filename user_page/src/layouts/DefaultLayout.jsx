import { Footer, Header } from '~/components_layout';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default DefaultLayout;
