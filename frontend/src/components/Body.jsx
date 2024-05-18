import Header from "./Header";
import msg1 from "../assets/message1.png"
import msg2 from "../assets/message2.png"
import msg3 from "../assets/message3.png"
import msg4 from "../assets/message4.png"
import msg5 from "../assets/message5.png"
import image1 from "../assets/image-bg1.png"
import heroImage from "../assets/home_message.png"
import heroImage2 from "../assets/home_message2.png"
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
	return (
    <div className="bg-violet-100 h-fit text-black">
        <Header/>
        <div className="mx-10 pb-10">
            <div className="bg-[#3f4654] flex bg-opacity-90 my-8 py-4 rounded-lg ">
                <div className="md:flex items-center justify-between max-w-6xl mx-auto py-10 px-4 md:px-4">
                    <div className="text-white md:w-1/3 pb-20 md:pb-0 pl-4">
                        <h1 className="text-5xl md:text-4xl lg:text-6xl font-medium pb-10">Message Privately</h1>
                        <p className="text-lg">Simple, reliable, private messaging for free*, available all over the world.</p>
                        <Link to={"/signup"}><button className="mt-10 py-1 px-4 rounded-full hover:opacity-80 bg-violet-300 text-black font-medium text-lg">Get Started</button></Link>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="">
                            <img className="h-10" src={msg1} alt="message"/>
                        </div>
                        <div className="">
                            <img className="h-24 rounded-lg" src={msg4} alt="chat"/>
                        </div>
                        <div className="">
                            <img className="h-14 rounded-lg" src={msg5} alt="chat"/>
                        </div>
                        <div className="">
                            <img className="h-56 rounded-lg" src={msg2} alt="chat"/>
                        </div>
                        <div className="">
                            <img className="h-14 rounded-lg" src={msg3} alt="chat"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <img className="py-8 md:px-8" alt="image" src={heroImage}/>
                <div className="text-center max-w-5xl mx-auto py-8 px-2">
                    <h1 className="text-2xl md:text-4xl md:tracking-wide leading-normal">
                        Connect with loved ones effortlessly using private messaging and calling. Share your true self and engage in free, heartfelt conversations, no matter the distance.
                    </h1>
                </div>
                <img className=" py-8 md:px-8" alt="image" src={heroImage2}/>
            </div>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-14 py-4 justify-between items-center">
                <div className="md:w-1/2">
                    <img className="" src={image1} alt="chat"/>
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-2xl md:text-5xl font-medium">Never miss a Moment with loved ones</h1>
                    <p className="text-lg py-4 tracking-wide">Keep connected and cherish every moment with those you love.</p>
                </div>
            </div>
        </div>
        <Footer/>
    </div>)
};

export default Body;
