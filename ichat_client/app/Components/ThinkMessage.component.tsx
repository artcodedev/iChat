
const ThinkMessage = () => {
    return (
        <>
            <div className="flex justify-start animate-pulse">
                <div className="flex items-end gap-2">
                    <div className="p-2 rounded-full bg-gray-600">
                        <div className="w-4 h-4 bg-white/20 rounded-full animate-bounce" />
                    </div>
                    <div className="px-4 py-2 rounded-2xl bg-[#163a85] rounded-bl-none text-blue-200 italic shadow-sm">
                        Thinking...
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThinkMessage;