import { MessageCircle, MessageSquare } from "lucide-react";
import { motion } from 'framer-motion';

const MainHeader = () => {

    return (
        <>
            <motion.div
                key="landing-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-20 lg:px-32 z-10"
            >
                <div className="bg-[#2b4b8d] p-2 md:p-3 rounded-xl mb-6 md:mb-10 shadow-lg">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                </div>

                <h2 className="text-4xl font-bold mb-3 opacity-90">Hi there!</h2>

                <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 mt-5 tracking-tight leading-[1.2] md:leading-[1.1]">
                    What would you like to know?
                </h1>

                <p className="text-blue-200/70 text-[1.6rem]">
                    Use one of the most common prompts below <br /> or ask your own question
                </p>
            </motion.div>
        </>
    );
}

export default MainHeader;