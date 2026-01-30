import VideoPlayer from "../Components/VideoPlayer";


export default function VideoReport() {


  return (

    <div className="h-screen bg-[#0a2661] text-white flex flex-col overflow-hidden">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Мой видео-обзор</h1>
        <VideoPlayer
          src="/report.mp4"
          autoPlay={false}
          className="p-2 bg-[#3169ec]"
        />
      </div>


    </div>
  );
}