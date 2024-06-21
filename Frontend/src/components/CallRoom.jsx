import Peer from 'peerjs';
import { useState, useEffect, useRef } from 'react';

function CallRoom() {
    const [peer, setPeer] = useState(new Peer());
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const handleConnection = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current.srcObject = stream;
                const call = peer.call('another-peers-id', stream);
                call.on('stream', remoteStream => {
                    remoteVideoRef.current.srcObject = remoteStream;
                });
            })
            .catch(error => {
                console.error('Error getting user media:', error);
            });
    }

    useEffect(() => {
        peer.on("call", (call) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    localVideoRef.current.srcObject = stream;
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on("stream", remoteStream => {
                        remoteVideoRef.current.srcObject = remoteStream;
                    });
                })
                .catch(err => {
                    console.error("Failed to get local stream", err);
                });
        });
    }, [peer]);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted style={{ width: '300px', height: '200px' }} />
            <video ref={remoteVideoRef} autoPlay style={{ width: '300px', height: '200px' }} />
            <button onClick={handleConnection}>Call</button>
        </div>
    )
}

export default CallRoom;