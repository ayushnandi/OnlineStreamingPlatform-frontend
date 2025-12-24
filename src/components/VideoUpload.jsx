import { useState } from "react"

function VideoUpload() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [thumbnail, setThumbnail] = useState(null)

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
    console.log("Uploading:", file.name)
    // backend upload logic will go here
  }

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center space-y-12 animate-fade-in">

        {/* Hero */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
            Upload Your <span className="text-gray-400">Videos</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fast uploads. Secure streaming. Clean experience.
          </p>
        </div>

        {/* Upload Card */}
        <div
          className="
            border border-white/10 rounded-2xl p-8
            bg-black/50 backdrop-blur-xl
            transition
            hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40
          "
        >
          <div className="flex flex-col items-center gap-6">

            {/* Thumbnail */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Video thumbnail"
                className="w-full max-w-md rounded-xl border border-white/10 shadow-lg"
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

            {/* Text */}
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Drag & drop your video</h2>
              <p className="text-gray-500 text-sm">MP4, MKV, MOV • Max 1GB</p>
            </div>

            {/* Select Video */}
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span
                className="
                  px-8 py-3 rounded-xl
                  border border-white/80
                  text-white font-medium
                  hover:bg-white hover:text-black
                  transition
                "
              >
                Select Video
              </span>
            </label>

            {/* File Name */}
            {file && (
              <p className="text-sm text-gray-300">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}

            {/* Upload Button (APPEARS AFTER FILE SELECTED) */}
            {file && !error && (
              <button
                onClick={handleUpload}
                className="
                  mt-2 px-10 py-3 rounded-xl
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
