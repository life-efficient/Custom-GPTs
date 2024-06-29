"use client"
import apiClient from '@/utils/generic/api';
import { useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { registerCall } from '@/utils/client/retell';

const WebCallPage = () => {
	const containerRef = useRef(null);
	const [callId, setCallId] = useState(null);
	const [conversationStarted, setConversationStarted] = useState(false);
	const [transcript, setTranscript] = useState('');
	const [error, setError] = useState(null);

	// init sdk
	const sdk = new RetellWebClient();
	sdk.on('conversationStarted', () => {
		setConversationStarted(true);
		console.log('Conversation started');
	});
	sdk.on('conversationEnded', () => {
		setConversationStarted(false);
		console.log('Conversation ended');
	});
	sdk.on('error', (error) => {
		setError(error);
		console.error('An error occurred:', error);
	});
	sdk.on('update', (update) => {
		setTranscript((prevTranscript) => `${prevTranscript}\n${update.transcript}`);
		console.log('update', update);
	});

	useEffect(() => {
		const setup = async () => {
			console.log('starting call')
			return () => {
				sdk.stopCall();
			};
		}

		setup();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<h1 className="text-2xl font-bold mb-4">Start a Web Call with Retell.ai Agent</h1>
		<div
			id="retell-container"
			ref={containerRef}
			className="w-full max-w-md bg-white shadow-md rounded-lg p-4"
		>
			{/* button to start call */}
			<button
				onClick={async () => {
					// start call
					console.log('starting call')
					const registerCallResponse = await registerCall({
						agent_id: 'a355652343eab572087abc77adfecb34',
						from_number: '+15626693964'
					});
					console.log('registerCallResponse', registerCallResponse);
					const call = await sdk.startCall({
						callId: registerCallResponse.call_id,
						sampleRate: registerCallResponse.sample_rate,
						// enableUpdate: true, // (Optional) You want to receive the update event such as transcript
						// customStream: yourStream, // (Optional) You can use your own MediaStream which might use a different mic
					});

					console.log('call:', call)
					// sdk.startCall();
				}}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Start Call
			</button>
			{/* conversation status */}
			{conversationStarted ? (
			<div>
				<p className="text-green-600">Conversation started</p>
				<p className="text-gray-800">Transcript:</p>
				<pre className="text-sm text-gray-700">{transcript}</pre>
			</div>
			) : (
			<p className="text-red-600">Conversation not started</p>
			)}
			{error && <p className="text-red-600">Error: {error}</p>}
		</div>
		</div>
  );
};

export default WebCallPage;
