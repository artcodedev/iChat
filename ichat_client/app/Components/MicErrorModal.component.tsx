import { motion, AnimatePresence } from 'framer-motion';
import { MicOff, X } from 'lucide-react';

export const MicErrorModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-[#1a3675] border border-white/10 p-8 rounded-[24px] max-w-sm w-full shadow-2xl text-center"
          >
            <button onClick={onClose} className="absolute cursor-pointer right-4 top-4 text-white/40 hover:text-white">
              <X size={20} />
            </button>

            <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <MicOff className="text-red-400" size={32} />
            </div>

            <h3 className="text-xl font-bold mb-2">Microphone not available</h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              Please allow access to the microphone in your browser settings to use voice input.
            </p>

            <button 
              onClick={onClose}
              className="w-full bg-[#2552b0] cursor-pointer hover:bg-[#2d62d3] py-3 rounded-xl font-medium transition-colors"
            >
              Ok
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};