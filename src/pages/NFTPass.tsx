import HeaderCard from "../components/HeaderCard";
import NFTList from "../components/NFTList";
import NFTPage from "../components/NFTPage";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

export default function NFTPass() {
  return (
    <>
     <HeaderCard/>
     <Navbar/>
     {/* <NFTPage/> */}
     <NFTList/>
     <Footer/>
    </>
  );
}
