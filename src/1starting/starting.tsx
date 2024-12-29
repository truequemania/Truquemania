import authRedirectToken from "../components/ts/autRedirectToken";
import Footer from "./components/footer";
import Header from "./components/header";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import Section4 from "./components/section4";

function Starting() {

    authRedirectToken("/explorar");
    return (
        <div className="font-quicksand bg-gradient-to-r from-gray-900 via-black to-gray-900 min-h-screen text-white">
            <Header />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Footer/>
        </div>
    );
}

export default Starting;
