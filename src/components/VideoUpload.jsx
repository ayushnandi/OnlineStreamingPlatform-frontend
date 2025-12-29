import { useState } from "react"

function VideoUpload() {
  const [file, setFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false);
  const [meta,setmeta] = useState(
    {
      title:"",
      description:""
    }
  )

  const MAX_SIZE = 1 * 1024 * 1024 * 1024 // 1GB

  const generateThumbnail = (videoFile) => {
    const video = document.createElement("video")
    const canvas = document.createElement("canvas")
    const url = URL.createObjectURL(videoFile)

    video.src = url
    video.currentTime = 1
    video.muted = true

    video.onloadeddata = () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      setThumbnail(canvas.toDataURL("image/png"))
      URL.revokeObjectURL(url)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    if (selectedFile.size > MAX_SIZE) {
      setError("File size must be less than 1 GB")
      setFile(null)
      setThumbnail(null)
      return
    }

    setError("")
    setFile(selectedFile)
    generateThumbnail(selectedFile)
  }

  const handleUpload = () => {
    if (!file) return
    console.log({ title: meta.title , description:meta.description, file })
    // backend upload logic here
    saveVideoToServer(file,meta);
  }

  async function saveVideoToServer(file,meta){
    setUploading(true);
    try{
      await axios.post('https//localhost:8080/api/v1/videos')
    }catch(error){
      console.log(error);
    }

  }

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center space-y-10 animate-fade-in">

        {/* Hero */}
        <div className="py-12 md:py-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
            Upload Your <span className="text-gray-400">Videos</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fast uploads. Secure streaming. Clean experience.
          </p>
        </div>

        {/* Upload Card */}
        <div className="
          border border-white/10 rounded-2xl py-8 
          bg-black/50 backdrop-blur-xl
          transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40
        ">
          <div className="flex flex-col items-center gap-6 max-w-md mx-auto">

            {/* Thumbnail */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Video thumbnail"
                className="w-full rounded-xl border border-white/10 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                  />
                </svg>
              </div>
            )}

            {/* Select Video */}
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="
                px-6 py-2.5 rounded-lg
                border border-white/70
                text-sm font-medium
                text-white
                hover:bg-white hover:text-black
                transition
              ">
                Select Video
              </span>
            </label>

            {/* File Name */}
            {file && (
              <p className="text-sm text-gray-300 truncate">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}

            {/* Title & Description */}
            {file && (
              <div className="w-full space-y-4 text-left">
                <input
                  type="text"
                  placeholder="Video title"
                  value={meta.title}
                  onChange={(e)=>setmeta({...meta,title: e.target.value})}
                  className="
                    w-full px-4 py-2.5 rounded-lg
                    bg-black border border-white/10
                    text-white placeholder-gray-500
                    focus:outline-none focus:border-white/30
                  "
                />

                <textarea
                  rows={4}
                  placeholder="Video description"
                  value={meta.description}
                  onChange={(e) => setmeta({...meta,description: e.target.value})}
                  className="
                    w-full px-4 py-2.5 rounded-lg
                    bg-black border border-white/10
                    text-white placeholder-gray-500
                    focus:outline-none focus:border-white/30
                    resize-none
                  "
                />
              </div>
            )}

            {/* Upload Button */}
            {file && !error && (
              <button
                onClick={handleUpload}
                className="
                  mt-2 px-8 py-2.5 rounded-lg
                  bg-white text-black font-medium
                  hover:bg-gray-200
                  transition
                "
              >
                Upload Video
              </button>
            )}

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

          </div>
        </div>

        <p className="text-xs text-gray-600">
          By uploading, you agree to our content policies.
        </p>

      </div>
    </section>
  )
}

export default VideoUpload
