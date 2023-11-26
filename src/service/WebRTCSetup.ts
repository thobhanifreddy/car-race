// WebRTCSetup.ts

export class WebRTCSetup {
  private configuration: RTCConfiguration;
  private peerConnection: RTCPeerConnection;
  public dataChannel: RTCDataChannel | null = null;

  constructor(config: RTCConfiguration) {
    this.configuration = config;
    this.peerConnection = new RTCPeerConnection(this.configuration);

    // Setup ICE candidate event listener
    this.peerConnection.onicecandidate = this.handleICECandidateEvent;
    // Setup ICE connection state change event listener
    this.peerConnection.oniceconnectionstatechange =
      this.handleICEConnectionStateChangeEvent;
    // Setup signaling state change event listener
    this.peerConnection.onsignalingstatechange =
      this.handleSignalingStateChangeEvent;

    // Create a data channel
    this.dataChannel = this.peerConnection.createDataChannel("gameControls");

    // Setup data channel event listeners
    this.dataChannel.onopen = this.handleDataChannelStatusChange;
    this.dataChannel.onclose = this.handleDataChannelStatusChange;
    this.dataChannel.onerror = this.handleDataChannelError;
    this.dataChannel.onmessage = this.handleDataChannelMessageReceived;
  }

  // Handle ICE Candidate Event
  private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      // Here you would typically send the ICE candidate over your signaling channel to the other peer
    }
  };

  // Handle ICE Connection State Change Event
  private handleICEConnectionStateChangeEvent = () => {
    switch (this.peerConnection.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        // Handle the disconnection or failure here
        break;
      // Other states...
    }
  };

  // Handle Signaling State Change Event
  private handleSignalingStateChangeEvent = () => {
    // Handle signaling state change, if needed
  };

  // Data Channel status change event handler
  private handleDataChannelStatusChange = () => {
    if (this.dataChannel) {
      console.log(`Data Channel Status: ${this.dataChannel.readyState}`);
    }
  };

  // Data Channel error event handler
  private handleDataChannelError = (event: Event) => {
    console.error("Data Channel Error:", event);
  };

  // Data Channel message received event handler
  private handleDataChannelMessageReceived = (event: MessageEvent) => {
    console.log("Data Channel Message:", event.data);
    // Here you can handle incoming messages (e.g., game control data)
  };

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(): Promise<RTCSessionDescriptionInit> {
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(desc: RTCSessionDescriptionInit): Promise<void> {
    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(desc)
    );
  }
}
