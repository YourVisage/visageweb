'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Dropzone from "@/component/Dropzone";
import Generate from "@/component/Generate";

function useHover() {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => setIsHovering(false);

  return { isHovering, onMouseEnter, onMouseLeave };
}

export default function FaceSwap() {
  const [loading, setLoading] = useState(false);

  const { isHovering, onMouseEnter, onMouseLeave } = useHover();
 
  useEffect(() => {
    // Fetch Python API...
  }, []);

  const [files, setFiles] = useState<{ face: File[] | null, bg: File[] | null }>({ face: null, bg: null });
  const [generatedImage, setGeneratedImage] = useState<any | null>(null);
  const [generatedImagesArray, setGeneratedImagesArray] = useState<Array<{ original_images: File[], generated_image: any }>>([]);
  const [shouldRemoveFiles, setShouldRemoveFiles] = useState(false);
  const [generated, setGenerated] = useState<number | null>(0);

  const removeFiles = () => {
    setShouldRemoveFiles(true);
    setFiles({ face: null, bg: null });
    setGeneratedImage(null);
  };

  const handleSetFiles = (type: string, newValue: File[] | null) => {
    setFiles(prev => ({ ...prev, [type]: newValue }));
  };

  const handleGenerateImg = (newValue: any) => {
    setGeneratedImage(newValue);
    setGeneratedImagesArray((prevImages) => [...prevImages, {
      original_images: [...files.face ?? [], ...files.bg ?? []],
      generated_image: newValue
    }]);
  };

  return (
    <main className=" min-h-screen ">
      <main className="mx-auto flex max-w-screen-lg flex-wrap px-4 items-center justify-between flex-col pt-12">
        <div className="grid w-full h-full grid-cols-2 gap-16">
          <div className="w-full">
            <h1 className="mb-8 text-5xl font-extrabold">Урьд өмнө хэзээ ч байгаагүйгээр нүүрээ солихыг мэдрээрэй!</h1>
            <p className="font-medium text-lg">Нүүр солих хөгжилтэй тоглоомууд зөвхөн эхлэл байсан. Технологийн цоо шинэ дэвшлийн ертөнцөд үсрэлт хийцгээе.</p>
          </div>
          {generatedImage == null ? (
            <div className="h-32 relative w-full space-y-2 rounded-xl bg-white">
              {['face', 'bg'].map((type) => (
                <Dropzone key={type} type={type} onChange={(files) => handleSetFiles(type, files)} remove={removeFiles}
                  shouldRemoveFiles={shouldRemoveFiles} />
              ))}
              <Generate face={files.face} bg={files.bg} onChange={handleGenerateImg} style="for_home" />
            </div>
          ) : (
            <div className="flex-col h-96">
              <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="relative max-h-80 h-80 flex items-center justify-center w-full overflow-hidden rounded-xl bg-white p-2 shadow-lg"
              >
                <div className={`absolute top-0 left-0 w-full h-full z-99 p-4 bg-white/70 ${isHovering ? 'opacity-100' : 'opacity-0'}
                 transition-opacity duration-300`}>
                  <a href={generatedImage} download="generated_image.png">
                    <button className="w-full rounded-lg font-bold cursor-pointer text-center bg-black text-green-600 px-4 py-2" >
                      Download</button>
                  </a>
                </div>
                <img src={generatedImage} className="h-full object-cover rounded-lg" alt="Swapped Image" />
              </div>
              <button onClick={removeFiles} className="h-10 hover:border transition-all my-2 rounded-lg w-full
              bg-white text-center font-bold flex items-center justify-center shadow-lg text-black">Clear Generation</button>
            </div>
          )}
        </div>
        <div className="p-12">
          <div className="grid space-y-12 place-items-center items-center">
            <img className="" src="/mark.png" alt="" />
            <img className="" src="/will.png" alt="" />
          </div>
        </div>
        <div className="flex flex-auto gap-4 pt-5">
          <div className="h-20 flex w-full">
            {Array(3).fill(3).map((_, index) => (
              <div key={index}>
                <h4 className="font-medium pb-2">Face Swap like a Pro</h4>
                <p>The largest resolution for face swap on the market: 1024px</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </main>
  );
}
