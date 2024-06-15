import ReactSlider from 'react-slider'

function AudioSlider({index, msg, processReceivedAudio, playAudio}) {
    return (
        <div key={index} className="flex p-2 mb-2 border-b border-gray-300 text-black">
            <strong>{msg.from}:</strong>
            <ReactSlider
                className="w-3/4 ml-2 mt-3"
                thumbClassName="rounded-full bg-blue-600 h-6 w-6 -top-3"
                trackClassName="h-1 bg-blue-600"
                thumbActiveClassName="shadow-lg" 
            />
            <button className="ml-auto bg-blue-600 text-white rounded-lg" onClick={() => {processReceivedAudio(msg.audio); playAudio();}}>Play</button>
        </div>
    )
}

export default AudioSlider;