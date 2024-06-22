import Peer from 'peerjs';
import { useState, useEffect, useRef } from 'react';

function CallRoom() {

    const [localPeerID, setLocalPeerID] = useState(null);
    const [remotePeerID, setRemotePeerID] = useState(null);
    const remoteVideoRef = useRef(null);
    const localVideoRef = useRef(null);
    const peerInstance = useRef(null);

    useEffect(() => {
        const peer = new Peer();
        peer.on('open', (id) => { setLocalPeerID(id) });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true }, (mediaStream) => {
                call.answer(mediaStream);
                call.on('stream', (mediaStream) => {
                    remoteVideoRef.current.srcObject = mediaStream;
                    remoteVideoRef.current.play();

                    // play your own video
                    localVideoRef.current.srcObject = mediaStream;
                    localVideoRef.current.play();
                });
            });
        });
        peerInstance.current = peer;
    }, [])

    const call = (remotePeerID) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true }, (mediaStream) => {
            localVideoRef.current.srcObject = mediaStream;
            localVideoRef.current.play();

            const call = peerInstance.current.call(remotePeerID, mediaStream);
            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
            });
        });
    };

    return (
        <div className='w-full flex flex-col gap-10'>
            <h1 className='w-full text-center text-2xl'>{`Local: ${localPeerID}`}</h1>
            <div className='flex gap-5 '>
                <div className='flex items-center gap-5 mx-auto'>
                    <input className='border rounded-md p-2 w-[400px]' placeholder="Enter Caller ID:" type='text' onChange={(e) => setRemotePeerID(e.target.value)}/>
                    <button className='border p-2 rounded-lg text-slate-100 bg-slate-700' onClick={() => call(remotePeerID)}>Call</button>
                </div>
            </div>
            <div className='flex gap-5 justify-between'>
                <div>
                    <h1>Local Feed</h1>
                    <video ref={localVideoRef}/>
                </div>
                <div>
                    <h1>Remote Feed</h1>
                    <video ref={remoteVideoRef}/>
                </div>
            </div>
        </div>
    )
}

export default CallRoom;  