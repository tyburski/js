document.addEventListener('keydown', onKeyPress);

const KeyToSound = {
    'a': document.getElementById('s1'),
    's': document.getElementById('s2'),
    'd': document.getElementById('s3'),
    'f': document.getElementById('s4')

};
let recording = false;
document.getElementById('recordingButton').addEventListener('click', function () {

    recording = !recording;
    if (recording) {
        toggleRecording();
        this.textContent = 'Zapisz';
    } else {
        saveRecording();
        this.textContent = 'Nagrywanie';
    }   
});
const channels = Array.from({ length: 4 }, () => []);

let recordingChannel = 0;
let recordedNotes = Array.from({ length: 4 }, () => []);
let timeouts = [];

function onKeyPress(event) {
    const sound = KeyToSound[event.key];
    if (sound) {
        playSound(sound);
        if (recording) {
            recordedNotes[recordingChannel].push({ note: event.key, time: Date.now() });
        }
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function toggleRecording() {

    recordingChannel = parseInt(document.getElementById('channelSelect').value);

    if (recording) {
        recordedNotes[recordingChannel] = [];
    }
}

function playChannel(channelIndex) {
    const notes = recordedNotes[channelIndex];
    
    if (notes && notes.length > 0) {
        notes.forEach((note) => {
            const timeoutId = setTimeout(() => playSound(KeyToSound[note.note]), note.time - notes[0].time);
            timeouts.push(timeoutId);
        });
    }
}

function playAllChannels() {
    channels.forEach((channel, index) => playChannel(index));
}

function stopAllChannels() {
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];
}

function saveRecording() {
    localStorage.setItem('recordedNotes', JSON.stringify(recordedNotes));
}

function playSelectedChannel() {
    const selectedChannel = parseInt(document.getElementById('playChannelSelect').value);
    playChannel(selectedChannel);
}
