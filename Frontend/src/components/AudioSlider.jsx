import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import ReactSlider from 'react-slider';
import { FaPlay, FaPause } from "react-icons/fa";

function AudioSlider({index, msg}) {
    const [audioUrl, setAudioUrl] = useState(null)
    const [audio, setAudio] = useState(null)
    const [duration, setDuration] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        processReceivedAudio(msg.audio);
    }, [])

    useEffect(() => {
        if (audioUrl) {
            const newAudio = new Howl({
                src: [audioUrl],
                format: ['webm'],
                onload: () => {
                    setDuration(newAudio.duration());
                },
                onplay: () => {
                    setIsPlaying(true);
                },
                onpause: () => {
                    setIsPlaying(false);
                },
                onend: () => {
                    setIsPlaying(false);
                    setProgress(0);
                }
            });
            setAudio(newAudio);
        }
    }, [audioUrl])

    useEffect(() => {
        const interval = setInterval(() => {
            if (audio && audio.playing()) {
                setProgress(audio.seek() || 0);
            }
        }, 100)
        return () => clearInterval(interval);
    }, [audio])    
    
    const processReceivedAudio = (audioData) => {
        try {
            const binaryString = window.atob(audioData);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const audioBlob = new Blob([bytes], { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        } catch (error) {
            console.error('Error handling audio data:', error);
        }
    }

    const handlePlay = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
    }    

    const handleSeek = (value) => {
        if (audio && value<=duration) {
            audio.seek(value);
            setProgress(value);
        }
    }

    if (!audio) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div key={index} className="flex p-2 mb-2 border-b border-gray-300 text-black">
            <strong>{msg.from}:</strong>
            <ReactSlider
                onAfterChange={handleSeek}
                value={progress}
                min={0}
                max={duration}
                className="w-3/4 ml-2 mt-3"
                thumbClassName="rounded-full bg-blue-600 h-6 w-6 -top-3 hover:bg-blue-800 hover:cursor-pointer"
                trackClassName="h-1 bg-blue-600 hover:cursor-pointer"
                thumbActiveClassName="shadow-lg" 
            />
            <button className="ml-auto bg-blue-600 text-white rounded-lg w-1/12 flex justify-center items-center" onClick={handlePlay}>{(isPlaying) ? (<FaPause />) : (<FaPlay />)}</button>
        </div>
    )
}

export default AudioSlider;