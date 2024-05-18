import LOGO_URL from "../assets/logo.png";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
	return (
		<div className="bg-gray-800 max-w-full">
			<div className="lg:flex items-start justify-center text-gray-400 py-10 pl-20 gap-36">
				<div className="flex items-center gap-2">
					<img className="h-10" src={LOGO_URL} alt="logo" />
					<h1 className="text-2xl pt-4 pb-3">BudPing</h1>
				</div>
				<div>
					<ul>
						<li className="font-bold text-md py-2 text-gray-200">
							What we do?
						</li>
						<li className="py-2">Connect</li>
						<li className="py-2">Security</li>
						<li className="py-2">For Business</li>
					</ul>
				</div>
				<div>
					<ul>
						<li className="font-bold text-md py-2 text-gray-200">
							Company
						</li>
						<li className="py-2">About</li>
						<li className="py-2">Carrer</li>
						<li className="py-2">Team</li>
						<li className="py-2">Grocery</li>
					</ul>
				</div>
				<div>
					<ul>
						<li className="font-bold text-md py-2 text-gray-200">
							Contact Us
						</li>
						<li className="py-2">Help & Support</li>
						<li className="py-2">Partner with us</li>
					</ul>
				</div>
				<div>
					<ul>
						<li className="font-bold text-md py-2 text-gray-200">
							Legal
						</li>
						<li className="py-2">Privacy Policy</li>
						<li className="py-2">Terms & condition</li>
					</ul>
				</div>
			</div>
			<div className="text-gray-400 flex items-center justify-center gap-10 pb-8">
				<span className="">© 2024 Gourav garg</span>
                <div className="flex items-center gap-6">
                    <a href="https://twitter.com/Gouravgarg094" className="hover:bg-violet-300 hover:text-black border p-2 rounded-full text-sm cursor-pointer hover:border-hidden  transition-all duration-1000 ease-in-out"><FaXTwitter /></a>
                    <a href="https://www.linkedin.com/in/gouravgarg094/" className="hover:bg-violet-300 hover:text-black border p-2 rounded-full text-sm cursor-pointer hover:border-hidden transition-all duration-1000 ease-in-out "><FaLinkedinIn /></a>

                </div>
			</div>
		</div>
	);
};
export default Footer;
